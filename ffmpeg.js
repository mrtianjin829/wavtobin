let cp = require("child_process"); // sussy variable name o_O
const pth = require("path");
const os = require("os");
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
async function ffmpeg(input, args) {
  let ret = {
    path: "",
    exitcode: 0,
  };
  let path = pth.resolve(os.tmpdir(), makeid(16) + ".wav");
  let proc = cp.exec(`ffmpeg ${args[0]} -i "${input}" ${args[1]} ${ret.path}`);
  proc.stdout.pipe(process.stdout);
  let get_code = () => new Promise((res) => proc.on("close", res));
  ret.exitcode = await get_code();
  ret.path = path;
  console.log("[wtb.ffmpeg] exit code is " + ret.exitcode);
  return ret;
}

module.exports = ffmpeg;
