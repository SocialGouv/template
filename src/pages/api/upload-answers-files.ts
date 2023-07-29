// https://chadalen.com/blog/how-to-use-a-multipart-form-in-nextjs-using-api-routes

import { fileMetadataSchema } from "@socialgouv/e2esdk-crypto";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises";
import path from "node:path";

import { storageDir } from "../../config";

export const config = {
  api: {
    bodyParser: false,
  },
};

// SHA-512 hex output
const validFileName = fileMetadataSchema.shape.hash;

const form = formidable({
  multiples: true,
  maxFileSize: 10 * 1024 * 1024, // 10Mb
  uploadDir: storageDir,
  hashAlgorithm: "sha512",
  filename(name, ext, part, form) {
    if (!part.originalFilename) {
      throw new Error("Missing file name (should be hash of content)");
    }
    return validFileName.parse(part.originalFilename);
  },
});

form.on("file", (_formName, file) => {
  if (!file.hash) {
    console.error(`Skip file ${file.filepath}, no hash`);
    return;
  }
  if (file.newFilename === file.hash) {
    console.info(`Saved file ${file.filepath}`);
    return;
  }
  console.error(`Invalid file name (does not match SHA-512 hash)
  Received: ${file.newFilename}
  Hashed:   ${file.hash}`);
  fs.rm(path.resolve(storageDir, file.newFilename));
});

export default async function storageEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // todo: Add authentication
  await fs.mkdir(storageDir, { recursive: true }).catch(() => {});
  if (
    !req.headers["content-type"] ||
    req.headers["content-type"].indexOf("multipart/form-data") === -1
  ) {
    return res
      .status(415)
      .send("Invalid content-type, only multipart/form-data is accepted");
  }
  await new Promise<void>((resolve, reject) =>
    form.parse(req, (err, _, files) => {
      if (err) {
        res.status(400).json({
          error: "Invalid request",
          message: "Failed to parse multipart body",
          reason: err,
        });
        reject(err);
      }
      resolve();
    })
  );
  res.status(201).send(null);
}
