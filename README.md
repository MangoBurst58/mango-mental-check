# 🧠 Mango Mental Check

> Platform screening kesehatan mental berbasis kuesioner ilmiah PHQ-9 & GAD-7

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Tentang Project

**Mango Mental Check** adalah platform screening kesehatan mental yang membantu pengguna mengenali gejala depresi dan kecemasan sejak dini menggunakan kuesioner ilmiah yang diakui secara global:

- **PHQ-9** (Patient Health Questionnaire-9) - Screening depresi dengan 9 pertanyaan
- **GAD-7** (Generalized Anxiety Disorder-7) - Screening kecemasan dengan 7 pertanyaan

Website ini dirancang untuk memberikan akses screening kesehatan mental yang **gratis**, **privat**, dan **mudah** digunakan, dengan hasil yang informatif dan rekomendasi tindak lanjut.

## ✨ Fitur Utama

### 🔐 Autentikasi
- Register dengan email dan password
- Login dengan email/password
- Login dengan Google OAuth
- Lupa password (reset via email)

### 🛡️ Keamanan
- Password minimal 8 karakter (huruf besar, huruf kecil, angka, simbol)
- Rate limiting: 5x login gagal → blokir 15 menit
- Password history: tidak boleh menggunakan 5 password terakhir
- Security headers (CSP, HSTS, X-Frame-Options)

### 📊 Screening
- **PHQ-9**: 9 pertanyaan screening depresi (skor 0-27)
- **GAD-7**: 7 pertanyaan screening kecemasan (skor 0-21)
- Progress bar saat mengisi kuesioner
- Hasil: skor, kategori (minimal/ringan/sedang/berat), dan rekomendasi
- Riwayat screening di dashboard

### 🌐 Multi-language
- Bahasa Indonesia
- Bahasa Inggris
- Tombol toggle ID/EN, preferensi tersimpan di localStorage

### 📱 Responsive Design
- Optimal di mobile, tablet, dan desktop

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
|----------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Next.js API Routes, NextAuth.js |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Authentication** | NextAuth.js (Email/Password, Google OAuth) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Deployment** | Vercel |

## 🚀 Demo

Website sudah live dan dapat diakses di:
