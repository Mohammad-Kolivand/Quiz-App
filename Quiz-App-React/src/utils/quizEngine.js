const USED_QUESTIONS_KEY = "quiz-fa-used-questions-v1";

export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function readUsedQuestions() {
  try {
    return JSON.parse(localStorage.getItem(USED_QUESTIONS_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Selects a fresh set per category until the available bank has been exhausted. */
export function selectQuestions(pool, categoryId, count, difficulty) {
  const used = readUsedQuestions();
  const key = categoryId;
  const usedIds = new Set(used[key] || []);
  let available = pool.filter((question) => !usedIds.has(question.id));

  // Difficulty changes the mix: harder modes prioritize challenge questions.
  const rank = { easy: 0, medium: 1, hard: 2 };
  const targetRank = rank[difficulty] ?? 1;
  const orderByDifficulty = (items) =>
    shuffle(items).sort((a, b) => {
      const aDistance = Math.abs((rank[a.difficulty] ?? 1) - targetRank);
      const bDistance = Math.abs((rank[b.difficulty] ?? 1) - targetRank);
      return aDistance - bDistance;
    });
  available = orderByDifficulty(available);
  let picked = available.slice(0, Math.min(count, pool.length));
  // If only a few unseen questions remain, finish the current cycle with unseen-first questions
  // and fill the rest from the already-seen pool without duplicating within this quiz.
  if (picked.length < Math.min(count, pool.length)) {
    const pickedIds = new Set(picked.map((q) => q.id));
    const fillers = orderByDifficulty(pool.filter((q) => !pickedIds.has(q.id)));
    picked = [
      ...picked,
      ...fillers.slice(0, Math.min(count, pool.length) - picked.length),
    ];
  }
  const nextUsed = new Set([...(used[key] || []), ...picked.map((q) => q.id)]);
  used[key] = nextUsed.size >= pool.length ? [] : [...nextUsed];
  try {
    localStorage.setItem(USED_QUESTIONS_KEY, JSON.stringify(used));
  } catch {
    /* private browsing may block storage */
  }

  return picked.map((question) => {
    const options = question.options.map((text, index) => ({
      text,
      correct: index === question.answer,
    }));
    const mixed = shuffle(options);
    return {
      ...question,
      options: mixed.map((option) => option.text),
      answer: mixed.findIndex((option) => option.correct),
    };
  });
}
