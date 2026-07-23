export function getGad7Level(score: number): { level: string; description: string; recommendation: string } {
  if (score <= 4) {
    return {
      level: "minimal",
      description: "Kecemasan Minimal",
      recommendation: "Tidak diperlukan intervensi khusus. Lanjutkan aktivitas positif dan praktikkan teknik relaksasi sederhana seperti pernapasan dalam."
    };
  } else if (score <= 9) {
    return {
      level: "ringan",
      description: "Kecemasan Ringan",
      recommendation: "Pertimbangkan konseling ringan. Coba teknik relaksasi, mindfulness, olahraga teratur, dan kurangi konsumsi kafein."
    };
  } else if (score <= 14) {
    return {
      level: "sedang",
      description: "Kecemasan Sedang",
      recommendation: "Konsultasi dengan psikolog sangat disarankan. Terapi perilaku kognitif (CBT) efektif untuk mengelola kecemasan. Pertimbangkan teknik manajemen stres."
    };
  } else {
    return {
      level: "berat",
      description: "Kecemasan Berat",
      recommendation: "SEGERA konsultasi dengan psikolog atau psikiater. Kecemasan berat dapat mengganggu fungsi sehari-hari dan mungkin memerlukan terapi kombinasi."
    };
  }
}