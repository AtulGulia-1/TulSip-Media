import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPasswordResetOtpEmail } from "@/lib/notifications/email";

function hashOtp(otp: string) {
  const secret = process.env.OTP_SECRET ?? "tulsip-otp-secret";
  return crypto.createHash("sha256").update(`${otp}:${secret}`).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    const normalizedEmail = (email ?? "").trim().toLowerCase();
    if (!normalizedEmail) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const usersRes = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const authUser = usersRes.data.users.find(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );

    if (!authUser) {
      return NextResponse.json({ ok: true });
    }

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await admin
      .from("password_reset_otps")
      .update({ used_at: new Date().toISOString() })
      .eq("email", normalizedEmail)
      .is("used_at", null);

    await admin.from("password_reset_otps").insert({
      auth_user_id: authUser.id,
      email: normalizedEmail,
      otp_hash: otpHash,
      expires_at: expiresAt
    });

    await sendPasswordResetOtpEmail({ email: normalizedEmail, otp });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to send OTP" }, { status: 500 });
  }
}
