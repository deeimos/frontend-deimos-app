import { encryptFields } from "@/shared/server-utils/encryptor";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const encrypted = encryptFields(body);

  return NextResponse.json(encrypted ?? { error: "Encryption failed" }, { status: encrypted ? 200 : 500 });
}