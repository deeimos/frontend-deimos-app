import fs from "fs";
import path from "path";

let publicKey: string | null = null;
let privateKey: string | null = null;

function readKey(filePath: string): string | null {
  try {
    return fs.readFileSync(path.join(process.cwd(), filePath), "utf8").trim();
  } catch (err) {
    console.error(`Failed to read key at ${filePath}:`, err);
    return null;
  }
}

publicKey = readKey("keys/public.pem");
privateKey = readKey("keys/private.pem");

export function getPublicKey(): string | null {
  return publicKey;
}

export function getPrivateKey(): string | null {
  return privateKey;
}
