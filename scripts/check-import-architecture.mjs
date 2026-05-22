import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const bannedPrefixes = [
  "@/components/geneticos",
  "@/lib/geneticos",
  "@/hooks/useLaberintoGA",
  "@/components/laberinto",
];

const files = execSync('rg --files src', { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((f) => /\.(ts|tsx)$/.test(f));

const errors = [];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!line.includes("from")) return;
    for (const prefix of bannedPrefixes) {
      if (line.includes(`"${prefix}`) || line.includes(`'${prefix}`)) {
        errors.push(`${file}:${index + 1} -> import prohibido: ${prefix}`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error("Se encontraron imports fuera de la arquitectura por feature:\n");
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("OK: arquitectura de imports por feature validada.");
