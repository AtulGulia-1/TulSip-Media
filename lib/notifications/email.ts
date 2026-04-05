import { Resend } from "resend";

type MailOptions = {
  from?: string;
  to: string;
  subject: string;
  text: string;
};

type MailTransport = {
  sendMail: (options: MailOptions) => Promise<unknown>;
};

async function createSmtpTransporter(): Promise<MailTransport> {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const hostIp = process.env.SMTP_HOST_IP?.trim() || "";
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_USER or SMTP_PASS is missing.");
  }

  const nodemailerModule = await import("nodemailer");
  const nodemailer = nodemailerModule.default ?? nodemailerModule;
  const transporter = nodemailer.createTransport({
    host: hostIp || host,
    port,
    secure: port === 465,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: {
      servername: host
    },
    auth: { user, pass }
  });
  return transporter;
}

async function sendViaResend(options: MailOptions) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  const resend = new Resend(apiKey);
  const from = options.from ?? process.env.RESEND_FROM ?? process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) {
    throw new Error("RESEND_FROM (or SMTP_FROM/SMTP_USER) is missing.");
  }

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;white-space:pre-wrap">${String(
    options.text
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</div>`;

  const { error } = await resend.emails.send({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

async function sendMailSafely(options: MailOptions) {
  const preferResend = (process.env.MAIL_PROVIDER ?? "resend").toLowerCase() === "resend";

  if (preferResend) {
    try {
      await sendViaResend(options);
      return;
    } catch (error) {
      const smtpEnabled = !!process.env.SMTP_USER && !!process.env.SMTP_PASS;
      if (!smtpEnabled) {
        const reason = error instanceof Error ? error.message : "Unknown mail error";
        throw new Error(reason);
      }
      const smtp = await createSmtpTransporter();
      await smtp.sendMail({
        from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
        ...options
      });
      return;
    }
  }

  const smtp = await createSmtpTransporter();
  await smtp.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    ...options
  });
}

export async function sendNewClientRegistrationEmail(params: {
  clientName: string;
  email: string;
  website?: string;
}) {
  const to = process.env.ADMIN_NOTIFY_EMAIL;
  if (!to) return;

  await sendMailSafely({
    to,
    subject: "New client registered - TulSip Media",
    text: `New client registered.\n\nName: ${params.clientName}\nEmail: ${params.email}\nWebsite: ${
      params.website ?? "N/A"
    }`
  });
}

export async function sendPasswordResetOtpEmail(params: { email: string; otp: string }) {
  await sendMailSafely({
    to: params.email,
    subject: "TulSip Media password reset OTP",
    text: `Your OTP is ${params.otp}. It expires in 10 minutes.`
  });
}

export async function sendPurchaseConfirmationEmail(params: {
  email: string;
  clientName?: string;
  planName: string;
  amountInr: number;
}) {
  await sendMailSafely({
    to: params.email,
    subject: `Subscription confirmed: ${params.planName} | TulSip Media`,
    text: `Hi ${params.clientName ?? "there"},

Thank you for choosing TulSip Media.
Your subscription is confirmed.

Plan: ${params.planName}
Amount: INR ${params.amountInr.toLocaleString("en-IN")}

Our team will begin your onboarding shortly.

TulSip Media
Local brands. Global Voices.`
  });
}

export async function sendRenewalReminderEmail(params: {
  email: string;
  planName: string;
  daysLeft: number;
}) {
  await sendMailSafely({
    to: params.email,
    subject: `Renewal reminder: ${params.planName} plan`,
    text: `Your TulSip subscription is nearing expiry.

Plan: ${params.planName}
Days left: ${params.daysLeft}

Please renew to continue uninterrupted campaign delivery and reporting access.`
  });
}

export async function sendDailyMotivationEmail(params: { email: string; quote: string }) {
  await sendMailSafely({
    to: params.email,
    subject: "TulSip Daily Business Boost",
    text: `Daily motivation for your business:

"${params.quote}"

Stay consistent. Small daily actions compound into market leadership.

TulSip Media`
  });
}

export async function sendFeedbackReceiptEmail(params: { email: string; name?: string }) {
  await sendMailSafely({
    to: params.email,
    subject: "We received your feedback - TulSip Media",
    text: `Hi ${params.name ?? "there"},

Thank you for sharing your feedback with TulSip Media.
Our team has received it and will review it shortly.`
  });
}

export async function sendContactInquiryEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  const adminTo = process.env.ADMIN_NOTIFY_EMAIL;
  if (!adminTo) return;

  await sendMailSafely({
    to: adminTo,
    subject: "New contact inquiry - TulSip Media",
    text: `New inquiry received from website contact form.

Name: ${params.name}
Email: ${params.email}

Message:
${params.message}`
  });

  await sendMailSafely({
    to: params.email,
    subject: "We received your inquiry - TulSip Media",
    text: `Hi ${params.name},

Thanks for reaching out to TulSip Media. Our team has received your message and will contact you shortly.

Your message:
${params.message}

TulSip Media
Local brands. Global Voices.`
  });
}
