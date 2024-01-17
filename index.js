#!/usr/bin/node
console.log("[wtb] WaveToBin");
const ffmpeg = require("./ffmpeg");
const pth = require("path");
(async function () {
  try {
    if(process.argv.length <= 2){
       return console.log("No argument given. Try -h")
    }
    // Import library for handling wav files.
    const { WaveFile } = require("wavefile");
    // Load filesystem API
    const fs = require("fs");
    // Initialize output file as an wave file
    const wf = new WaveFile();
    // Procure argyments
    const cf = require("./argp")(process.argv);

    function vprint(...data){
        if(cf.verbose)
            console.log(...data)
    }
    // Read the file.
    if (cf.help) {
        vprint("[wtb] Reading file...")
      console.log(fs.readFileSync(pth.resolve(__dirname,"help.txt")).toString("utf8"));
      return;
    }
    let inputFilePath = cf.file;
    if(!(cf.useFFmpeg && inputFilePath.endsWith(".wav"))){
        console.log("[wtb] Warning: --ffmpeg isn't implicitly specified")
        cf.useFFmpeg = true
    }
    if (cf.useFFmpeg) {
      vprint("[wtb] Waiting for FFmpeg");
      inputFilePath = (await ffmpeg(inputFilePath,cf.ffmpegArg,process.stdout,cf)).path;
    }
    vprint(cf.useFFmpeg?"[wtb] Reading file converted by ffmpeg":"[wtb] Reading file")
    const fd = fs.readFileSync(inputFilePath);
    // Load input file into wf.
    wf.fromBuffer(fd);
    /*do important conversions
     *this will convert the sample-type into PCM u8
     *changes the sample rate to the desired rate otherwise 32 Khz (good for html5bytebeat)
     * */
    if (wf.fmt.sampleRate != cf.sampleRate) wf.toSampleRate(cf.sampleRate);
    if (wf.bitDepth !== "8") wf.toBitDepth("8");
    // Obtain "samples" from audio
    let smp = wf.getSamples();
    let n; // contains the PCM buffer for output file
    // properly interleave the channels
    if(cf.plugin == false){
    if (wf.fmt.numChannels == 2) {
      vprint("[wtb] Using average based stereo mixer")
      let [a, b] = smp;
      // Use average to mix stereo channels.
      n = a.map((v, i) => (v + b[i]) / 2);
    } else {
      n = smp;
    }
    } else {
        vprint("[wtb] Using plugin")
        n = require(pth.resolve(process.cwd(),cf.pluginPath))(smp,wf)
    }
    smp = undefined;
    n = new Uint8Array(n);
    vprint("[wtb] Writing file")
    fs.writeFileSync(cf.output, Buffer.from(n)); // Write output.
  } catch (err) {
    // Definitely helpful error handling.
    console.log("[wtb] an error occurred:");
    throw err;
    process.exit(1);
  }
})();
