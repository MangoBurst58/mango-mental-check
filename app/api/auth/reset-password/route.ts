import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { validatePassword, sanitizeInput } from "@/lib/sanitize";

export async function POST(request: Request) {
  try {
    const { token, password: rawPassword } = await request.json();
    const password = sanitizeInput(rawPassword);

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token dan password harus diisi" },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors[0] },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Token tidak valid" },
        { status: 400 }
      );
    }

    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });
      return NextResponse.json(
        { error: "Token sudah kadaluarsa" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek password history (5 password terakhir)
    const lastPasswords = await prisma.passwordHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    for (const old of lastPasswords) {
      const isSame = await bcrypt.compare(password, old.password);
      if (isSame) {
        return NextResponse.json(
          { error: "Password ini pernah digunakan sebelumnya. Gunakan password yang berbeda." },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    await prisma.passwordHistory.create({
      data: {
        userId: user.id,
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return NextResponse.json(
      { message: "Password berhasil direset. Silakan login." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}