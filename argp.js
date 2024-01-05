function gen(args) {
  let cf = {
    file: "",
    sampleRate: 32000,
    output: "out.bin",
    useFFmpeg: false,
    ffmpegArg: ["", ""],
    help: false,
    plugin: false,
    pluginPath: "",
    verbose: false
  };
  let parami = []
   function check(i){
       for(let j = 0; j < parami.length; j++){
	   if(parami[j] == i) return true;
       };
   }
  args.forEach((v, i) => {
    if (i <= 1) return;
    if (check(i)) return;
    if (v == "--sampleRate" || v == "-r") {
      cf.sampleRate = parseInt(args[i + 1]);
      parami.push(i+1)
    } else if (v == "--help" || v == "-h") {
      cf.help = true;
    } else if (v == "--output" || v == "-o") {
      cf.output = args[i + 1];
      parami.push(i+1)
    } else if (v == "--ffmpeg") {
      cf.useFFmpeg = true;
    } else if (v == "-fi") {
      cf.ffmpegArg[0] = args[i + 1];
      parami.push(i+1)
    } else if (v == "-fo") {
      cf.ffmpegArg[1] = args[i + 1];
      parami.push(i+1)
    } else if(v == "-p"){
      cf.plugin = true
      cf.pluginPath = args[i+1]
      parami.push(i+1)
    } else if(v == "-v"){
        cf.verbose = true;
    }
    else {
      cf.file = v;
    }
  });
  return cf;
}

module.exports = gen;
