import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function hashOtp(otp: string) {
  const secret = process.env.OTP_SECRET ?? "tulsip-otp-secret";
  return crypto.createHash("sha256").update(`${otp}:${secret}`).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = (await request.json()) as {
      email?: string;
      otp?: string;
      newPassword?: string;
    };

    const normalizedEmail = (email ?? "").trim().toLowerCase();
    if (!normalizedEmail || !otp || !newPassword) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ ok: false, error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: latestOtp } = await admin
      .from("password_reset_otps")
      .select("id,auth_user_id,otp_hash,expires_at,used_at")
      .eq("email", normalizedEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!latestOtp || latestOtp.used_at) {
      return NextResponse.json({ ok: false, error: "OTP is invalid" }, { status: 400 });
    }

    const now = new Date();
    if (new Date(latestOtp.expires_at) < now) {
      return NextResponse.json({ ok: false, error: "OTP has expired" }, { status: 400 });
    }

    if (latestOtp.otp_hash !== hashOtp(otp)) {
      return NextResponse.json({ ok: false, error: "OTP is incorrect" }, { status: 400 });
    }

    await admin.auth.admin.updateUserById(latestOtp.auth_user_id, { password: newPassword });
    await admin
      .from("password_reset_otps")
      .update({ used_at: now.toISOString() })
      .eq("id", latestOtp.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to reset password" }, { status: 500 });
  }
}
