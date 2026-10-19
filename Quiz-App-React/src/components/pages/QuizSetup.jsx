import {
  Activity,
  ArrowLeft,
  Award,
  Check,
  Clock3,
  Code2,
  Compass,
  BookOpen,
  Target,
} from "lucide-react";
import { levelLabels } from "../../data";

const categoryIcon = (id, size = 22) => {
  const props = { size, strokeWidth: 1.8 };
  if (id === "general") return <Compass {...props} />;
  if (id === "science") return <Activity {...props} />;
  if (id === "history") return <BookOpen {...props} />;
  return <Code2 {...props} />;
};

export default function QuizSetup({
  categories,
  questions,
  activeCategory,
  setActiveCategory,
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
  startQuiz,
  goHome,
  faNumber,
}) {
  const category =
    categories.find((item) => item.id === activeCategory) || categories[0];
  const poolSize = (questions[activeCategory] || questions.general || [])
    .length;
  const availableCounts = [5, 10, 15].filter((count) => count <= poolSize);
  return (
    <section className="page-content setup-page">
      <div className="page-title-block setup-heading">
        <span className="eyebrow">
          <Target size={14} /> تنظیم آزمون
        </span>
        <h1>آزمونت را برای خودت بچین.</h1>
        <p className="page-subtitle">
          موضوع، سطح و تعداد سؤال را انتخاب کن؛ بقیه‌اش با توست.
        </p>
      </div>
      <div className="setup-step-label">

        <div>
          <h2>موضوع آزمون</h2>
          <p>حوزه‌ای را انتخاب کن که می‌خواهی در آن محک بخوری.</p>
        </div>
      </div>
      <div className="category-grid setup-category-grid">
        {categories.map((item) => (
          <button
            key={item.id}
            className={`category-card ${activeCategory === item.id ? "selected-category" : ""}`}
            onClick={() => setActiveCategory(item.id)}
          >
            <div className={`category-icon ${item.color}`}>
              {categoryIcon(item.id, 23)}
            </div>
            <div className="category-card-top">
              <span className="category-count">
                {faNumber((questions[item.id] || []).length)} سؤال
              </span>
              {activeCategory === item.id && (
                <span className="selected-check">
                  <Check size={13} />
                </span>
              )}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="category-card-footer">
              <span>
                {activeCategory === item.id ? "انتخاب شده" : "انتخاب این موضوع"}
              </span>
              {activeCategory === item.id ? (
                <Check size={16} />
              ) : (
                <ArrowLeft size={16} />
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="setup-step-label">

        <div>
          <h2>سطح و اندازه آزمون</h2>
          <p>چالش را متناسب با زمان و تجربه‌ات انتخاب کن.</p>
        </div>
      </div>
      <div className="setup-config-grid">
        <div className="panel setup-config-card">
          <div className="setup-config-title">
            <div className="setup-config-icon">
              <Award size={19} />
            </div>
            <div>
              <h3>سطح دشواری</h3>
              <p>ترکیب سؤال‌ها با سطح انتخابی هماهنگ می‌شود.</p>
            </div>
          </div>
          <div className="setup-choice-row setup-level-choices">
            {Object.entries(levelLabels).map(([key, label], index) => (
              <button
                key={key}
                className={`setup-choice ${difficulty === key ? "active" : ""}`}
                onClick={() => setDifficulty(key)}
              >
                <span className={`level-mark level-${key}`} />
                {label}
                {difficulty === key && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
        <div className="panel setup-config-card">
          <div className="setup-config-title">
            <div className="setup-config-icon">
              <BookOpen size={19} />
            </div>
            <div>
              <h3>تعداد سؤال‌ها</h3>
              <p>بانک این موضوع {faNumber(poolSize)} سؤال دارد.</p>
            </div>
          </div>
          <div className="setup-choice-row count-choices">
            {availableCounts.map((count) => (
              <button
                key={count}
                className={`setup-choice ${questionCount === count ? "active" : ""}`}
                onClick={() => setQuestionCount(count)}
              >
                {faNumber(count)} سؤال
                {questionCount === count && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="setup-launch panel">

        <div className="setup-launch-copy">
          <span>آماده شروع؟</span>
          <h2>{category.title}</h2>
          <div className="quiz-meta">
            <span>
              <BookOpen size={15} />
              {faNumber(Math.min(questionCount, poolSize))} سؤال
            </span>
            <span>
              <Clock3 size={15} />
              {faNumber(Math.ceil(questionCount * 1.5))} دقیقه
            </span>
            <span>
              <Award size={15} />
              {levelLabels[difficulty]}
            </span>
          </div>
        </div>
        <button className="primary-button start-button" onClick={startQuiz}>
          شروع آزمون <ArrowLeft size={17} />
        </button>
      </div>

    </section>
  );
}
