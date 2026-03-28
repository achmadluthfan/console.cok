// to get argument from CLI
import { allowedNodeEnvironmentFlags, argv } from "node:process";
// to get information about path for argument
import path from "node:path";
// read all file inside of directory, file, check is directory / file, open specific file
import { readdir, readFile, stat } from "fs/promises";
// libs for parser
import parseToAST from "./libs/parser";

// // use forEach because not return new array
argv.forEach(async (val, index) => {
  const isScan = val.includes("scan");

  // ======= 📂 Phase 2 — File System Exploration =======
  // ======= ⚡ Phase 3 — Non-blocking IO & Event Loop =======
  if (isScan) {
    for (let i = index; i <= index; i++) {
      // 1. resolve path from argument first
      const targetPath = path.resolve(argv[i + 1]);

      // 2. check the arg is file or directory
      const isFile = (await stat(targetPath)).isFile();
      if (isFile) {
        // ===== fileHandle approach (use open from fs) ===== -> "buka file dulu → pegang aksesnya → nanti gue baca sendiri"
        // const fileHandle = await open(targetPath);
        // console.log("fileHandle", fileHandle);
        // const dataFromFileHandle = await fileHandle.readFile({
        //   encoding: "utf-8",
        // });

        // ======= 📦 Phase 4 — Buffer & Encoding =======
        // ===== readFile approach (use readFile from fs) ==== -> "Bro, buka file ini → baca → kasih gue isinya"
        const dataFile = await readFile(targetPath, "utf8");
        if (dataFile.includes("console.log")) {
          console.log("ada conggg");
        } else {
          console.log("hell nahhh broww");
        }
      } else {
        // read all file inside of directory
        const allFiles = await readdir(targetPath);

        const filteredFiles = allFiles.filter(
          (file) =>
            !file.startsWith(".") &&
            file !== "node_modules" &&
            !file.endsWith(".json")
        );

        // use forEach because not need to return or edit the targetPath variable

        filteredFiles.forEach(async (file) => {
          const data = await readFile(file, "utf8");

          parseToAST(data);

          // if (data.includes("console.log")) {
          //   console.log("ada cokkkk, ", `File : ${file}`);
          // } else {
          //   console.log("hell nah");
          // }
        });
      }

      // if doenst -> use readdir to get information about file at the directory

      //   argv[i + 1];
    }
  }
});

// ======= 🔍 Phase 5 — Analyzer (Core Logic) =======

// 🧠 Phase 6 — Improve Accuracy (Optional Advanced)

// 🖨️ Phase 7 — Output System

// ⚙️ Phase 8 — CLI UX (Real Tool Feel)

// 🚀 Phase 9 — Packaging jadi CLI Tool

// 🔥 Phase 10 — Real World Upgrade
