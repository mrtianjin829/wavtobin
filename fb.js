let fs = require("fs")
let d1 = fs.readFileSync(process.argv[2])
.toString("base64")
let d2 = `javascript:eval(atob("${d1}"))`
fs.writeFileSync("fb.txt",d2)
