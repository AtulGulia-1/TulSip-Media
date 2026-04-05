import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const sourceDir = resolve(root, "lib", "public", "images");
const targetDir = resolve(root, "public", "images");

function copyRecursive(sourcePath, destinationPath) {
  const stats = statSync(sourcePath);

  if (stats.isDirectory()) {
    mkdirSync(destinationPath, { recursive: true });
    const entries = readdirSync(sourcePath);
    for (const entry of entries) {
      copyRecursive(join(sourcePath, entry), join(destinationPath, entry));
    }
    return;
  }

  mkdirSync(dirname(destinationPath), { recursive: true });
  copyFileSync(sourcePath, destinationPath);
}

mkdirSync(targetDir, { recursive: true });

if (!existsSync(sourceDir)) {
  console.log("No lib/public/images folder found. Skipping image sync.");
  process.exit(0);
}

copyRecursive(sourceDir, targetDir);
console.log("Synced images: lib/public/images -> public/images");
