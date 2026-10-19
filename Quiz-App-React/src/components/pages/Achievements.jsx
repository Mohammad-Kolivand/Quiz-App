import {
  Award,
  BookOpen,
  Check,
  Medal,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

export default function AchievementsPage({ history, average, faNumber }) {
  return (
    <section className="page-content">
      <div className="page-title-block">
        <span className="eyebrow">
          <Trophy size={14} /> مسیر رشد
        </span>
        <h1>دستاوردهای تو</h1>
        <p className="page-subtitle">هر قدم کوچیک، بخشی از مسیر یادگیریته.</p>
      </div>
      <div className="achievement-grid">
        {[
          {
            icon: <Zap size={23} />,
            title: "شروع مسیر",
            text: "اولین آزمونت رو کامل کن.",
            unlocked: history.length >= 1,
            progress: history.length ? 1 : 0,
            total: 1,
          },
          {
            icon: <Medal size={23} />,
            title: "نتیجه درخشان",
            text: "در یک آزمون امتیاز ۸۰٪ یا بیشتر بگیر.",
            unlocked: history.some((h) => h.score >= 80),
            progress: history.some((h) => h.score >= 80) ? 1 : 0,
            total: 1,
          },
          {
            icon: <BookOpen size={23} />,
            title: "یادگیرنده پیگیر",
            text: "پنج آزمون مختلف انجام بده.",
            unlocked: history.length >= 5,
            progress: Math.min(history.length, 5),
            total: 5,
          },
          {
            icon: <Target size={23} />,
            title: "دقت بالا",
            text: "میانگین امتیازت به ۷۰٪ برسد.",
            unlocked: average >= 70,
            progress: Math.min(average, 70),
            total: 70,
          },
        ].map((a) => (
          <div
            className={`achievement-card panel ${a.unlocked ? "unlocked" : ""}`}
            key={a.title}
          >
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-status">
              {a.unlocked ? (
                <>
                  <Check size={13} /> باز شده
                </>
              ) : (
                "قفل"
              )}
            </div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
            <div className="achievement-progress">
              <span style={{ width: `${(a.progress / a.total) * 100}%` }} />
            </div>
            <small>
              {a.unlocked
                ? "تبریک! این دستاورد برای تو ثبت شد."
                : `${faNumber(a.progress)} از ${faNumber(a.total)}`}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
