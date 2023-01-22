#!/usr/bin/node
const fs = require("fs")
const {WaveFile} = require("wavefile")
const param = process.argv[2]
const wf = new WaveFile()
let s = console.log
s("[*] Reading file")
wf.fromBuffer(fs.readFileSync(param))
s("[*] Temporarily change bitdepth to floatbeat")
const origBit = wf.bitDepth
wf.toBitDepth("32f")
s("[*] Getting sound data")
const smp = wf.getSamples()
let n;
function hpf(x){
   let y = [x[0]]
   let a = 0.25
   for(let i = 1; i < x.length; i++){
      y.push(a*(y[i-1]+(x[i]-x[i-1])))
   }
   return y
}
s("[*] Applying high pass filter")
if(wf.fmt.numChannels == 2){
   n = [hpf(smp[0]),hpf(smp[1])]
} else {
   n = hpf(smp)
}
s("[*] Creating result wav file")
wf.fromScratch(wf.fmt.numChannels,wf.fmt.sampleRate,"32f",n)
s("[*] Changing to original bitdepth")
wf.toBitDepth(origBit)
s("[*] Saving")
fs.writeFileSync(param,wf.toBuffer())
