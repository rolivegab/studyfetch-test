import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";

export async function POST(req: Request) {
  const formData = await req.formData();

  const username = z.string().nonempty().parse(formData.get("username"));
  const password = z.string().parse(formData.get("password"));

  const identity = crypto
    .createHash("sha256")
    .update(`${username}.${password}`)
    .digest("hex");

  return NextResponse.json({ success: true, identity });
}
