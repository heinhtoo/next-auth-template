import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(req: NextRequest) {
  const { email, url } = await req.json();

  const options: SMTPTransport.Options = {
    host: process.env.AUTH_MAIL_HOST ?? "",
    port: process.env.AUTH_MAIL_PORT
      ? parseInt(process.env.AUTH_MAIL_PORT)
      : undefined,
    secure: false,
    auth: {
      user: process.env.AUTH_MAIL_FROM,
      pass: process.env.AUTH_MAIL_PWD,
    },
  };

  const transporter = nodemailer.createTransport(options);

  const message = {
    to: email,
    from: process.env.AUTH_MAIL_FROM,
    subject: "Sign in to your account",
    text: `Sign in by clicking this link: ${url}`,
    html: `<p>Sign in by clicking <a href="${url}">here</a></p>`,
  };

  try {
    await transporter.sendMail(message);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to send email" },
      {
        status: 500,
      }
    );
  }
}
