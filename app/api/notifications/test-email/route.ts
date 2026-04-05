import { NextResponse } from "next/server";
import { sendNewClientRegistrationEmail } from "@/lib/notifications/email";

function isAuthorized(request: Request) {
  const token = process.env.TEST_EMAIL_TOKEN?.trim();
  if (!token) {
    return process.env.NODE_ENV !== "production";
  }

  const bearer = request.headers.get("authorization")?.replace("Bearer ", "").trim();
  const custom = request.headers.get("x-test-email-token")?.trim();
  return bearer === token || custom === token;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const debug = {
    smtpHost: !!process.env.SMTP_HOST,
    smtpPort: !!process.env.SMTP_PORT,
    smtpUser: !!process.env.SMTP_USER,
    smtpPass: !!process.env.SMTP_PASS,
    smtpFrom: !!process.env.SMTP_FROM,
    adminNotifyEmail: !!process.env.ADMIN_NOTIFY_EMAIL,
    mailProvider: process.env.MAIL_PROVIDER ?? "smtp"
  };

  try {
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL?.trim();
    if (!adminEmail) {
      return NextResponse.json(
        { ok: false, error: "ADMIN_NOTIFY_EMAIL is missing.", debug },
        { status: 400 }
      );
    }

    await sendNewClientRegistrationEmail({
      clientName: "SMTP Test Lead",
      email: adminEmail,
      website: "https://tulsipmedia.com"
    });

    return NextResponse.json({ ok: true, message: "Test email sent.", debug });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown mail error",
        debug
      },
      { status: 500 }
    );
  }
}
