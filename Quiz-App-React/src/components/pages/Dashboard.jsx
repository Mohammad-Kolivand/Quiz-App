import {
  Activity,
  ArrowLeft,
  Award,
  BookOpen,
  Check,
  Code2,
  Compass,
  Flame,
  History,
  ListChecks,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import StatCard from "../ui/StatCard";

export default function DashboardPage({
  profile,
  history,
  average,
  correctCount,
  attemptedCount,
  faNumber,
  categories,
  questions,
  activeCategory,
  setActiveCategory,
  setPage,
}) {
  return (
    <section className="page-content">
      <div className="welcome-row">
        <div>
          <h1>
            سلام {profile?.name?.split(" ")[0] || "رفیق"}، آماده‌ای{" "}
            <span>پیشرفت کنی؟</span>
          </h1>
        </div>

      </div>

      <div className="stats-grid">
        <StatCard
          icon={<ListChecks size={19} />}
          label="آزمون‌های انجام‌شده"
          value={faNumber(history.length)}
          note="در تمام دسته‌ها"
          tone="mint"
        />
        <StatCard
          icon={<Target size={19} />}
          label="میانگین امتیاز"
          value={`${faNumber(average)}٪`}
          note={history.length ? "بر اساس سوابق تو" : "هنوز آزمونی ثبت نشده"}
          tone="blue"
        />
        <StatCard
          icon={<Check size={19} />}
          label="پاسخ‌های درست"
          value={faNumber(correctCount)}
          note={`${faNumber(attemptedCount)} پاسخ ثبت‌شده`}
          tone="amber"
        />
        <StatCard
          icon={<Flame size={19} />}
          label="بهترین نتیجه"
          value={`${faNumber(history.length ? Math.max(...history.map((h) => h.score)) : 0)}٪`}
          note="رکورد شخصی تو"
          tone="violet"
        />
      </div>

      <div className="section-heading">
        <div>
          <h2>از کجا شروع کنیم؟</h2>
          <p>موضوعی رو انتخاب کن که دوست داری بیشتر بدونی.</p>
        </div>

      </div>
      <div className="category-grid">
        {categories.map((c, index) => (
          <button
            key={c.id}
            className={`category-card ${activeCategory === c.id ? "selected-category" : ""}`}
            onClick={() => {
              setActiveCategory(c.id);
              setPage("setup");
            }}
          >
            <div className={`category-icon ${c.color}`}>
              {c.id === "general" ? (
                <Compass size={23} />
              ) : c.id === "science" ? (
                <Activity size={23} />
              ) : c.id === "history" ? (
                <BookOpen size={23} />
              ) : (
                <Code2 size={23} />
              )}
            </div>
            <div className="category-card-top">
              <span className="category-count">
                {faNumber((questions[c.id] || []).length)} سؤال
              </span>
              {activeCategory === c.id && (
                <span className="selected-check">
                  <Check size={13} />
                </span>
              )}
            </div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <div className="category-card-footer">
              <span>مشاهده آزمون</span>
              <ArrowLeft size={16} />
            </div>
          </button>
        ))}
      </div>


    </section>
  );
}
