// https://chadalen.com/blog/how-to-use-a-multipart-form-in-nextjs-using-api-routes

import { fileMetadataSchema } from "@socialgouv/e2esdk-crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

import { storageDir } from "../../config";

const validFileName = fileMetadataSchema.shape.hash;

export default async function storageEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // todo: Add authentication

  const hash = validFileName.parse([req.query["hash"]].flat()[0]);
  if (!hash) {
    return res.status(400).send("Expected hash query string");
  }
  const filePath = path.resolve(storageDir, hash);
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    return res.status(404).send("Not found");
  }
  return res
    .setHeader("content-type", "application/octet-stream")
    .setHeader("content-disposition", "inline")
    .send(createReadStream(filePath));
}
