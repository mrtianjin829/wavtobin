(function () {
  let win = window.open(location.href, Math.random().toString());
  let doc = win.document;
  doc.write(`
   <h1>File Loader</h1>
   PUT: <input type="file"><br>
   <button>Save to function</button>
   `);
  let input = doc.querySelector("input");
  let submit = doc.querySelector("button");
  submit.addEventListener("click", async (_) => {
    let fn = win.prompt("Select function name","fli") ?? "fli"
    let fc = await input.files[0].arrayBuffer();
    fc = new Uint8Array(fc);
    let ff = (t) => fc[t % fc.length];
    top[fn] = ff
  });
})();
