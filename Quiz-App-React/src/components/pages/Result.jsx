import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  Home,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";

export default function ResultPage({
  result,
  faNumber,
  levelLabels,
  profile,
  categories,
  specialties,
  buildSpecialtyAnalysis,
  setPage,
  startQuiz,
  goHome,
}) {
  const specialtyTitle =
    specialties.find(
      (item) => item.id === (result.specialty || profile?.specialty),
    )?.title || "دانش عمومی";

  const scoreLabel =
    result.score >= 80
      ? "تسلط قوی"
      : result.score >= 60
        ? "پایه مناسب، جای رشد دارد"
        : result.score >= 40
          ? "نیازمند تمرین هدفمند"
          : "پیشنهاد: مرور مفاهیم پایه";

  return (
    <section className="page-content result-page">
      <div className="result-heading">
        <div className="result-medal">
          <Trophy size={28} />
        </div>
        <h1 className="result-title">نتیجه آزمونت</h1>
      </div>

      <div className="result-summary panel">
        <div className="score-ring" style={{ "--score": `${result.score}%` }}>
          <div>
            <strong>{faNumber(result.score)}٪</strong>
            <span>امتیاز نهایی</span>
          </div>
        </div>

        <div className="result-details">
          <span className="eyebrow small-eyebrow">گزارش عملکرد</span>

          <h2>{result.category}</h2>

          <p>
            سطح {levelLabels[result.difficulty]} · {faNumber(result.total)} سؤال
            · {result.date}
          </p>

          <div className="result-stat-row">
            <div>
              <span className="result-stat-number correct-text">
                {faNumber(result.correct)}
              </span>
              <span>پاسخ درست</span>
            </div>

            <div>
              <span className="result-stat-number wrong-text">
                {faNumber(result.total - result.correct)}
              </span>
              <span>پاسخ نادرست</span>
            </div>

            <div>
              <span className="result-stat-number">
                {faNumber(result.total)}
              </span>
              <span>کل سؤال‌ها</span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel specialty-analysis">
        <div className="analysis-heading">
          <div className="analysis-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span className="eyebrow small-eyebrow">
              تحلیل متناسب با مسیر تو
            </span>
            <h2>عملکردت در آینه تخصص</h2>
          </div>

          <span className="analysis-score">{faNumber(result.score)}٪</span>
        </div>

        <p>
          {buildSpecialtyAnalysis(result, profile, categories, specialties)}
        </p>

        <div className="analysis-meter">
          <span style={{ width: `${result.score}%` }} />
        </div>

        <div className="analysis-foot">
          <span>حوزه تخصصی: {specialtyTitle}</span>
          <span>{scoreLabel}</span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>مرور پاسخ‌ها</h2>
          <p>جواب‌ها رو مرور کن تا نکته‌ها بهتر یادت بمونن.</p>
        </div>

        <button className="text-link" onClick={() => setPage("history")}>
          سوابق آزمون <ArrowLeft size={15} />
        </button>
      </div>

      <div className="review-list">
        {result.questions.map((question, index) => {
          const userAnswer = result.answers[index];
          const isCorrect = userAnswer === question.answer;

          return (
            <article
              className="review-card panel"
              key={`${index}-${question.q}`}
            >
              <div
                className={`review-status ${
                  isCorrect ? "review-good" : "review-bad"
                }`}
              >
                {isCorrect ? <Check size={17} /> : <X size={17} />}
              </div>

              <div className="review-content">
                <span className="review-index">سؤال {faNumber(index + 1)}</span>

                <h3>{question.q}</h3>

                <p className="review-answer">
                  پاسخ تو:{" "}
                  <strong>
                    {userAnswer === undefined
                      ? "بدون پاسخ"
                      : question.options[userAnswer]}
                  </strong>
                </p>

                <p className="review-correct">
                  پاسخ درست:{" "}
                  <strong>{question.options[question.answer]}</strong>
                </p>

                <p className="review-explanation">{question.explanation}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="result-actions">
        <button className="primary-button" onClick={startQuiz}>
          <RotateCcw size={17} />
          آزمون دوباره
        </button>

        <button className="secondary-button" onClick={goHome}>
          <Home size={17} />
          بازگشت به داشبورد
        </button>
      </div>
    </section>
  );
}
