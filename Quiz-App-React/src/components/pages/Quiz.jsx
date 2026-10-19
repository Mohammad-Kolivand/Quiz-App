import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Lightbulb, ListChecks, X } from 'lucide-react';

export default function QuizPage({category, setPage, faNumber, questionIndex, quizQuestions, currentQuestion, displayedSelected, selected, chooseAnswer, nextQuestion, timed, formatTime, secondsLeft, questionCount, answers, setQuestionIndex, setSelected}) {
  return (
<section className="page-content quiz-page">
          <div className="quiz-topline"><button className="back-link" onClick={() => setPage('home')}><ArrowRight size={16}/> خروج از آزمون</button><span className="quiz-category-pill"><span className={`mini-dot ${category.color}`}/>{category.title}</span></div>
          <div className="quiz-layout">
            <div className="quiz-main panel">
              <div className="question-progress-row"><span>سؤال <strong>{faNumber(questionIndex + 1)}</strong> از {faNumber(quizQuestions.length)}</span><span className="question-percent">{faNumber(Math.round((questionIndex + 1) / quizQuestions.length * 100))}٪</span></div>
              <div className="progress-track"><div className="progress-fill" style={{width: `${(questionIndex + 1) / quizQuestions.length * 100}%`}}/></div>
              <div className="question-kicker">پرسش شماره {faNumber(questionIndex + 1)}</div>
              <h1 className="question-title">{currentQuestion.q}</h1>
              <p className="answer-instruction">یکی از گزینه‌های زیر رو انتخاب کن.</p>
              <div className="answer-list">{currentQuestion.options.map((option, i) => {
                const isChosen = displayedSelected === i;
                const isCorrect = selected !== null && i === currentQuestion.answer;
                const isWrong = selected !== null && isChosen && i !== currentQuestion.answer;
                return <button key={option} className={`answer-option ${isChosen ? 'answer-selected' : ''} ${isCorrect ? 'answer-correct' : ''} ${isWrong ? 'answer-wrong' : ''}`} onClick={() => chooseAnswer(i)} disabled={selected !== null}>
                  <span className="answer-letter">{['الف','ب','ج','د'][i]}</span><span className="answer-text">{option}</span><span className="answer-indicator">{isCorrect ? <Check size={18}/> : isWrong ? <X size={18}/> : isChosen ? <span/> : null}</span>
                </button>;
              })}</div>
              {selected !== null && <div className={`explanation ${selected === currentQuestion.answer ? 'explanation-correct' : 'explanation-wrong'}`}><div className="explanation-icon">{selected === currentQuestion.answer ? <Check size={17}/> : <Lightbulb size={17}/>}</div><div><strong>{selected === currentQuestion.answer ? 'آفرین، پاسخ درسته!' : 'این بار نشد؛ یاد می‌گیریم.'}</strong><p>{currentQuestion.explanation}</p></div></div>}
              <div className="quiz-actions"><span className="autosave-note"><Check size={14}/> پاسخ‌ها خودکار ثبت می‌شن</span><button className="primary-button" disabled={selected === null} onClick={nextQuestion}>{questionIndex === quizQuestions.length - 1 ? 'دیدن نتیجه' : 'سؤال بعدی'} <ArrowLeft size={17}/></button></div>
            </div>
            <aside className="quiz-side">
              <div className="panel timer-panel"><div className="side-card-label"><Clock3 size={17}/> زمان باقی‌مانده</div><div className={`timer-value ${secondsLeft < 60 ? 'timer-warning' : ''}`}>{timed ? formatTime(secondsLeft) : 'بدون محدودیت'}</div><div className="timer-caption">{timed ? 'با آرامش و تمرکز ادامه بده' : 'زمان‌سنج غیرفعال است'}</div><div className="timer-line"><span style={{width: `${timed ? Math.max(0, secondsLeft / (questionCount * 90) * 100) : 100}%`}}/></div></div>
              <div className="panel question-map-panel"><div className="side-card-label"><ListChecks size={17}/> نقشه سؤال‌ها</div><div className="question-map">{quizQuestions.map((q, i) => <button key={i} onClick={() => {if (i <= questionIndex) {setQuestionIndex(i);setSelected(answers[i] ?? null)}}} className={`map-number ${i === questionIndex ? 'map-current' : answers[i] !== undefined ? 'map-answered' : ''}`} disabled={i > questionIndex}>{faNumber(i + 1)}</button>)}</div><div className="map-legend"><span><i className="legend-current"/> سؤال فعلی</span><span><i className="legend-done"/> پاسخ داده‌شده</span></div></div>
              <div className="panel focus-tip"><div className="tip-icon"><Lightbulb size={17}/></div><strong>نکته کوچیک</strong><p>لازم نیست عجله کنی؛ سؤال رو با دقت بخون و بعد انتخاب کن.</p></div>
            </aside>
          </div>
        </section>
  );
}
