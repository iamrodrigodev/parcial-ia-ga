import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const shouldWrite = process.argv.includes("--write");
const backupDir = ".comment-backup";

const files = execSync("rg --files src", { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));

function stripCommentsSafely(source) {
  const lines = source.split(/\r?\n/);
  const result = [];
  let inBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (inBlock) {
      if (trimmed.includes("*/")) inBlock = false;
      continue;
    }

    if (trimmed.startsWith("/*")) {
      if (!trimmed.includes("*/")) inBlock = true;
      continue;
    }

    if (trimmed.startsWith("//")) continue;
    result.push(line);
  }

  return result.join("\n");
}

let changedCount = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const next = stripCommentsSafely(source);
  if (next === source) continue;
  changedCount++;
  if (shouldWrite) {
    const backupPath = join(backupDir, file);
    mkdirSync(dirname(backupPath), { recursive: true });
    writeFileSync(backupPath, source, "utf8");
    writeFileSync(file, next, "utf8");
  }
}

if (!shouldWrite) {
  console.log(`Simulación: ${changedCount} archivo(s) tendrían cambios.`);
  console.log("Usa --write para aplicar.");
  process.exit(0);
}

console.log(`Listo: comentarios eliminados en ${changedCount} archivo(s).`);
console.log(`Backup generado en: ${backupDir}/`);
