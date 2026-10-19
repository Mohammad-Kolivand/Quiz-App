export function buildSpecialtyAnalysis(
  result,
  profile,
  categories,
  specialties,
) {
  const specialty = result.specialty || profile?.specialty || "general";
  const specialtyName =
    specialties.find((item) => item.id === specialty)?.title || "دانش عمومی";
  const category = categories.find((item) => item.id === result.categoryId);
  const matchesSpecialty =
    (["frontend", "backend", "fullstack"].includes(specialty) &&
      result.categoryId === "tech") ||
    (["science", "data"].includes(specialty) &&
      result.categoryId === "science") ||
    (specialty === "history" && result.categoryId === "history") ||
    (specialty === "general" && result.categoryId === "general");
  const assessment =
    result.score >= 80
      ? "تسلط فعلی‌ات در این مجموعه قوی است"
      : result.score >= 60
        ? "درک قابل قبولی داری، اما چند شکاف دانشی باقی مانده"
        : result.score >= 40
          ? "مفاهیم پایه را تا حدی می‌شناسی و به تمرین هدفمند نیاز داری"
          : "بهتر است از مفاهیم پایه شروع کنی و بعد سراغ سؤال‌های دشوارتر بروی";

  return `با توجه به حوزه تخصصی «${specialtyName}»، در آزمون «${category?.title || result.category}» ${matchesSpecialty ? "که به مسیر تخصصی‌ات نزدیک است" : "که مهارت عمومی و گستره دانشت را می‌سنجد"}، ${assessment}. این گزارش بر اساس ${result.total} سؤال همین آزمون است و ارزیابی قطعی مهارت حرفه‌ای تو نیست.`;
}
