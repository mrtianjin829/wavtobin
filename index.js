#!/usr/bin/node
const { WaveFile } = require("wavefile");
const fs = require("fs");
const file = process.argv[2];
const fd = fs.readFileSync(file);
const wf = new WaveFile();
wf.fromBuffer(fd);
wf.toSampleRate(32000);
wf.toBitDepth("8");
let smp = wf.getSamples()
let n;
// properly interleave the channels
if(wf.fmt.numChannels==2){
let [a,b]=smp
n = a.map((v,i)=>((v+b[i])/2))
} else {
  n = smp
}
n=new Uint8Array(n)
fs.writeFileSync("out.bin",Buffer.from(n))


