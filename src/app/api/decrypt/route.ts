import { decryptFields } from "@/shared/server-utils/decryptor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const decrypted = decryptFields(body);

  return NextResponse.json(decrypted ?? { error: "Decryption failed" }, { status: decrypted ? 200 : 500 });
}
