export const gad7Questions = [
  {
    id: 1,
    text: "Merasa gugup, cemas, atau gelisah",
  },
  {
    id: 2,
    text: "Tidak bisa berhenti atau mengendalikan kekhawatiran",
  },
  {
    id: 3,
    text: "Terlalu khawatir tentang berbagai hal",
  },
  {
    id: 4,
    text: "Sulit rileks",
  },
  {
    id: 5,
    text: "Gelisah sehingga sulit diam",
  },
  {
    id: 6,
    text: "Mudah marah atau tersinggung",
  },
  {
    id: 7,
    text: "Merasa takut seolah-olah ada hal buruk terjadi",
  },
];

export const gad7Options = [
  { value: 0, label: "Tidak sama sekali" },
  { value: 1, label: "Beberapa hari" },
  { value: 2, label: "Lebih dari separuh hari" },
  { value: 3, label: "Hampir setiap hari" },
];

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