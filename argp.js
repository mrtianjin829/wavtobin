function gen(args) {
  let cf = {
     file: "",
     sampleRate: 32000,
     output: "out.bin"
  };
  args.forEach((v,i)=>{
     if(v == "-r"){
        cf.sampleRate = parseInt(args[i+1]);
     } else if(v == "-o"){
        cf.output = args[i+1]
     } else if(v.endsWith(".wav")){
        cf.file = v
     }
  })
  console.log("Received arguments as: ")
  console.log(cf)
  return cf;
}

module.exports = gen;
