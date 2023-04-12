import path from "node:path";

export const storageDir =
  process.env.STORAGE_DIR ||
  path.resolve(process.cwd(), "./.storage/answers_files");
