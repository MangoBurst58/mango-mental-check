import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import { sanitizeEmail, validateEmail } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const { email: rawEmail } = await request.json();
    const email = sanitizeEmail(rawEmail);

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Email tidak valid" },
        { status: 400 }
      );
    }

    // Rate limit check untuk forgot password
    const rateCheck = await rateLimit.forgot.check(email);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Terlalu banyak permintaan. Coba lagi dalam ${rateCheck.blockMinutes} menit.` },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Jika email terdaftar, link reset akan dikirim" },
        { status: 200 }
      );
    }

    // Record attempt
    await rateLimit.forgot.record(email);

    // Hapus token lama
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Mango Mental Check" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password - Mango Mental Check",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; border: 1px solid #2a2a2a; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #F97316, #3B82F6); padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0;">Mango Mental Check</h1>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: white;">Reset Password</h2>
            <p style="color: #9CA3AF;">Halo ${user.name || "User"},</p>
            <p style="color: #9CA3AF;">Kami menerima permintaan untuk mereset password akun Anda.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #F97316, #EA580C); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px;">
                Reset Password
              </a>
            </div>
            <p style="color: #9CA3AF;">Link ini akan kadaluarsa dalam 1 jam.</p>
            <hr style="border-color: #2a2a2a; margin: 24px 0;" />
            <p style="color: #6B7280; font-size: 12px; text-align: center;">Mango Mental Check</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Jika email terdaftar, link reset akan dikirim" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}