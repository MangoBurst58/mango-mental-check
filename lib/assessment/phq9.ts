export const phq9Questions = [
  {
    id: 1,
    text: "Sedikit minat atau kesenangan dalam melakukan sesuatu",
  },
  {
    id: 2,
    text: "Merasa sedih, putus asa, atau tertekan",
  },
  {
    id: 3,
    text: "Sulit tidur atau justru tidur berlebihan",
  },
  {
    id: 4,
    text: "Merasa lelah atau kekurangan energi",
  },
  {
    id: 5,
    text: "Nafsu makan berkurang atau justru makan berlebihan",
  },
  {
    id: 6,
    text: "Merasa buruk tentang diri sendiri—atau merasa Anda gagal atau mengecewakan diri sendiri atau keluarga",
  },
  {
    id: 7,
    text: "Sulit berkonsentrasi pada sesuatu, seperti membaca koran atau menonton televisi",
  },
  {
    id: 8,
    text: "Bergerak atau berbicara sangat lambat sehingga orang lain bisa melihatnya? Atau sebaliknya, merasa gelisah sehingga Anda bergerak lebih sering dari biasanya",
  },
  {
    id: 9,
    text: "Pikiran bahwa Anda lebih baik mati atau menyakiti diri sendiri dengan cara tertentu",
  },
];

export const phq9Options = [
  { value: 0, label: "Tidak sama sekali" },
  { value: 1, label: "Beberapa hari" },
  { value: 2, label: "Lebih dari separuh hari" },
  { value: 3, label: "Hampir setiap hari" },
];

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