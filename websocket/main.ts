import { Database } from "@hocuspocus/extension-database";
import { Hocuspocus } from "@hocuspocus/server";

import * as Minio from "minio";
import { Readable } from "stream";

const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "root",
  secretKey: "studyfetch123",
});

const bucketExists = await minioClient.bucketExists("studyfetch");
if (!bucketExists) {
  minioClient.makeBucket("studyfetch");
}

async function readableToUint8Array(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return new Uint8Array(buffer);
}

// Configure the server …
const server = new Hocuspocus({
  port: 3001,
  extensions: [
    new Database({
      async store(data) {
        await minioClient.putObject(
          "studyfetch",
          data.documentName,
          data.state
        );
      },
      async fetch(data) {
        try {
          const response = await minioClient.getObject(
            "studyfetch",
            data.documentName
          );

          return readableToUint8Array(response);
        } catch {
          return null;
        }
      },
    }),
  ],
});

// … and run it!
server.listen();
