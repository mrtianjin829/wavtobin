#!/usr/bin/node
console.log("WaveBin");
try {
  const { WaveFile } = require("wavefile");
  const fs = require("fs");
  const wf = new WaveFile();
  const cf = require("./argp")(process.argv)
  const fd = fs.readFileSync(cf.file);
  wf.fromBuffer(fd);
  wf.toSampleRate(cf.sampleRate);
  wf.toBitDepth("8");
  let smp = wf.getSamples();
  let n;
  // properly interleave the channels
  if (wf.fmt.numChannels == 2) {
    let [a, b] = smp;
    n = a.map((v, i) => (v + b[i]) / 2);
  } else {
    n = smp;
  }
  n = new Uint8Array(n);
  fs.writeFileSync(cf.output, Buffer.from(n));
} catch (err) {
  console.log("[wtb] an error occurred:");
  throw err
  process.exit(1);
}
