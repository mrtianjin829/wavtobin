let cp = require("child_process") // sussy variable name o_O

async function ffmpeg(input){
   let ret = {
       path: ""
       exitcode: 0
   };
   let path = input+".wav" 
   let proc = cp.spawn("ffmpeg",["-i",input,path])
   proc.stdout.pipe(process.stdout),
   let get_code = ()=>new Promise(res=>proc.on("close",res))
   ret.exitcode = await get_code();
   ret.path = path
   console.log("[wtb.ffmpeg] exit code is "+ret.exitcode)
   return ret
}

module.exports = ffmpeg
