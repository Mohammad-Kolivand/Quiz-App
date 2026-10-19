import { useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Code2,
  Compass,
  History,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { categories, questions, levelLabels, specialties } from "./data";
import { selectQuestions } from "./utils/quizEngine";
import { buildSpecialtyAnalysis } from "./utils/specialtyAnalysis";
import Onboarding from "./components/pages/Onboarding";
import QuizSetup from "./components/pages/QuizSetup";
import DashboardPage from "./components/pages/Dashboard";
import QuizPage from "./components/pages/Quiz";
import ResultPage from "./components/pages/Result";
import HistoryPage from "./components/pages/History";
import AchievementsPage from "./components/pages/Achievements";

const STORAGE_KEY = "quiz-fa-history-v1";
const PROFILE_KEY = "quiz-fa-profile-v1";
const readProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch {
    return null;
  }
};
const readHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};
const faNumber = (n) => new Intl.NumberFormat("fa-IR").format(n);
const formatTime = (s) =>
  `${faNumber(Math.floor(s / 60))}:${String(s % 60)
    .padStart(2, "0")
    .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])}`;

function App() {
  const [profile, setProfile] = useState(readProfile);
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("general");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [timed, setTimed] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState(readHistory);
  const [result, setResult] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const category =
    categories.find((c) => c.id === activeCategory) || categories[0];

  useEffect(() => {
    if (page !== "quiz" || !timed) return undefined;
    if (secondsLeft <= 0) {
      finishQuiz();
      return undefined;
    }
    const timer = window.setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearInterval(timer);
  }, [page, timed, secondsLeft]);

  const createAccount = (signup) => {
    const nextProfile = {
      ...signup,
      name: signup.name.trim(),
      email: signup.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    if (!nextProfile.name || !nextProfile.email) return;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    setProfile(nextProfile);
  };

  const startQuiz = () => {
    const picked = selectQuestions(
      questions[activeCategory] || questions.general,
      activeCategory,
      questionCount,
      difficulty,
    );
    if (!picked.length) return;
    setQuizQuestions(picked);
    setQuestionIndex(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
    setSecondsLeft(picked.length * 90);
    setPage("quiz");
  };

  const finishQuiz = () => {
    const finalAnswers = { ...answers };
    if (selected !== null && quizQuestions[questionIndex])
      finalAnswers[questionIndex] = selected;
    const correct = quizQuestions.reduce(
      (sum, q, i) => sum + (finalAnswers[i] === q.answer ? 1 : 0),
      0,
    );
    const entry = {
      id: Date.now(),
      category: category.title,
      categoryId: activeCategory,
      difficulty,
      total: quizQuestions.length,
      correct,
      specialty: profile?.specialty || "general",
      userName: profile?.name || "",
      score: Math.round((correct / Math.max(quizQuestions.length, 1)) * 100),
      date: new Date().toLocaleDateString("fa-IR"),
      answers: finalAnswers,
      questions: quizQuestions,
      duration: quizQuestions.length * 90 - secondsLeft,
    };
    const nextHistory = [entry, ...history].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
    setHistory(nextHistory);
    setResult(entry);
    setAnswers(finalAnswers);
    setPage("result");
  };

  const chooseAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setAnswers((prev) => ({ ...prev, [questionIndex]: index }));
  };
  const nextQuestion = () => {
    if (selected === null) return;
    if (questionIndex === quizQuestions.length - 1) {
      finishQuiz();
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelected(null);
  };
  const goHome = () => {
    setPage("home");
    setMobileNav(false);
  };

  if (!profile) return <Onboarding onCreateAccount={createAccount} />;
  const correctCount = history.reduce((sum, item) => sum + item.correct, 0);
  const attemptedCount = history.reduce((sum, item) => sum + item.total, 0);
  const average = history.length
    ? Math.round(
        history.reduce((sum, item) => sum + item.score, 0) / history.length,
      )
    : 0;
  const currentQuestion = quizQuestions[questionIndex];
  const displayedSelected = selected ?? answers[questionIndex] ?? null;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">

          <div>
            <strong>کوئیز</strong>

          </div>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileNav(false)}
            aria-label="بستن منو"
          >
            <X size={19} />
          </button>
        </div>
        <div className="workspace-label">فضای شخصی</div>
        <nav className="nav-list">
          <button
            className={`nav-item ${page === "home" ? "active" : ""}`}
            onClick={goHome}
          >
            <LayoutDashboard size={18} />
            <span>داشبورد</span>
            {page === "home" && <span className="nav-dot" />}
          </button>
          <button
            className={`nav-item ${page === "history" ? "active" : ""}`}
            onClick={() => {
              setPage("history");
              setMobileNav(false);
            }}
          >
            <History size={18} />
            <span>سوابق آزمون</span>
          </button>
          <button
            className={`nav-item ${page === "achievements" ? "active" : ""}`}
            onClick={() => {
              setPage("achievements");
              setMobileNav(false);
            }}
          >
            <Trophy size={18} />
            <span>دستاوردها</span>
          </button>
        </nav>
        <div className="workspace-label category-label">دسته‌بندی‌ها</div>
        <div className="category-nav">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`category-nav-item ${activeCategory === c.id ? "chosen" : ""}`}
              onClick={() => {
                setActiveCategory(c.id);
                setPage("home");
                setMobileNav(false);
              }}
            >
              <span className={`mini-category ${c.color}`}>
                {c.id === "general" ? (
                  <Compass size={15} />
                ) : c.id === "science" ? (
                  <Activity size={15} />
                ) : c.id === "history" ? (
                  <BookOpen size={15} />
                ) : (
                  <Code2 size={15} />
                )}
              </span>
              <span>{c.title}</span>
              <span className="category-chevron">‹</span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">

          <div className="profile">
            <div className="avatar">{profile.name?.trim()?.[0] || "ک"}</div>
            <div className="profile-info">
              <strong>{profile.name}</strong>
              <span>
                {specialties.find((item) => item.id === profile.specialty)
                  ?.title || "یادگیرنده"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {mobileNav && (
        <button
          className="mobile-scrim"
          onClick={() => setMobileNav(false)}
          aria-label="بستن منو"
        />
      )}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-right">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileNav(true)}
              aria-label="باز کردن منو"
            >
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              <span>فضای یادگیری</span>
              <span className="crumb-separator">/</span>
              <strong>
                {page === "home"
                  ? "داشبورد"
                  : page === "setup"
                    ? "طراحی آزمون"
                    : page === "quiz"
                      ? "آزمون"
                      : page === "result"
                        ? "نتیجه آزمون"
                        : page === "history"
                          ? "سوابق آزمون"
                          : "دستاوردها"}
              </strong>
            </div>
          </div>
        </header>

        {page === "home" && (
          <DashboardPage
            profile={profile}
            history={history}
            average={average}
            correctCount={correctCount}
            attemptedCount={attemptedCount}
            faNumber={faNumber}
            categories={categories}
            questions={questions}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setPage={setPage}
          />
        )}

        {page === "setup" && (
          <QuizSetup
            categories={categories}
            questions={questions}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            startQuiz={startQuiz}
            goHome={goHome}
            faNumber={faNumber}
          />
        )}

        {page === "quiz" && currentQuestion && (
          <QuizPage
            category={category}
            setPage={setPage}
            faNumber={faNumber}
            questionIndex={questionIndex}
            quizQuestions={quizQuestions}
            currentQuestion={currentQuestion}
            displayedSelected={displayedSelected}
            selected={selected}
            chooseAnswer={chooseAnswer}
            nextQuestion={nextQuestion}
            timed={timed}
            formatTime={formatTime}
            secondsLeft={secondsLeft}
            questionCount={questionCount}
            answers={answers}
            setQuestionIndex={setQuestionIndex}
            setSelected={setSelected}
          />
        )}

        {page === "result" && result && (
          <ResultPage
            result={result}
            faNumber={faNumber}
            levelLabels={levelLabels}
            profile={profile}
            categories={categories}
            specialties={specialties}
            buildSpecialtyAnalysis={buildSpecialtyAnalysis}
            setPage={setPage}
            startQuiz={startQuiz}
            goHome={goHome}
          />
        )}

        {page === "history" && (
          <HistoryPage
            history={history}
            average={average}
            correctCount={correctCount}
            attemptedCount={attemptedCount}
            faNumber={faNumber}
            setPage={setPage}
            setHistory={setHistory}
            STORAGE_KEY={STORAGE_KEY}
            levelLabels={levelLabels}
          />
        )}

        {page === "achievements" && (
          <AchievementsPage
            history={history}
            average={average}
            faNumber={faNumber}
          />
        )}
        <footer className="footer">
          <span>ساخته‌شده توسط محمدرضا</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
