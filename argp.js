function gen(args) {
  let cf = {
     file: "",
     sampleRate: 32000,
     output: "out.bin",
     useFFmpeg: false,
     help: false
  };
  args.forEach((v,i)=>{
     if(i <= 1) return
     
     if(v == "--sampleRate" || v == "-r"){
        cf.sampleRate = parseInt(args[i+1]);
     }  else if(v == "--help" || v == "-h") {
	cf.help = true
     }  else if(v == "--output" || v == "-o"){
        cf.output = args[i+1]
     } else if(v == "--ffmpeg"){
        cf.useFFmpeg = true
     } else {
        cf.file = v
     }
  })
  return cf;
}

module.exports = gen;
