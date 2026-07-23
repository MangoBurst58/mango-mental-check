export function getPhq9Level(score: number): { level: string; description: string; recommendation: string } {
  if (score <= 4) {
    return {
      level: "minimal",
      description: "Depresi Minimal",
      recommendation: "Tidak diperlukan intervensi khusus. Lanjutkan aktivitas positif dan pantau kondisi Anda."
    };
  } else if (score <= 9) {
    return {
      level: "ringan",
      description: "Depresi Ringan",
      recommendation: "Pertimbangkan konseling ringan. Coba teknik self-help seperti olahraga rutin, mindfulness, dan jurnal harian."
    };
  } else if (score <= 14) {
    return {
      level: "sedang",
      description: "Depresi Sedang",
      recommendation: "Konsultasi dengan psikolog sangat disarankan. Terapi perilaku kognitif (CBT) efektif untuk tingkat keparahan ini."
    };
  } else if (score <= 19) {
    return {
      level: "sedang-berat",
      description: "Depresi Sedang-Berat",
      recommendation: "Segera konsultasi dengan psikolog atau psikiater. Terapi kombinasi (psikoterapi dan farmakologi) mungkin diperlukan."
    };
  } else {
    return {
      level: "berat",
      description: "Depresi Berat",
      recommendation: "WAJIB konsultasi dengan psikiater segera. Jangan menunda mencari bantuan profesional."
    };
  }
}