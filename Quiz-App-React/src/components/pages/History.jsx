import { Award, BookOpen, Check, History, Target } from 'lucide-react';
import StatCard from '../ui/StatCard';
import EmptyState from '../ui/EmptyState';

export default function HistoryPage({history, average, correctCount, attemptedCount, faNumber, setPage, setHistory, STORAGE_KEY, levelLabels}) {
  return (
<section className="page-content">
          <div className="page-title-block"><span className="eyebrow"><History size={14}/> مسیر تو</span><h1>سوابق آزمون</h1><p className="page-subtitle">نتایج قبلی رو ببین و روند پیشرفتت رو دنبال کن.</p></div>
          <div className="history-overview stats-grid"><StatCard icon={<BookOpen size={19}/>} label="تعداد آزمون‌ها" value={faNumber(history.length)} note="آزمون‌های ثبت‌شده" tone="mint"/><StatCard icon={<Target size={19}/>} label="میانگین امتیاز" value={`${faNumber(average)}٪`} note="میانگین همه نتایج" tone="blue"/><StatCard icon={<Check size={19}/>} label="پاسخ درست" value={faNumber(correctCount)} note="در همه آزمون‌ها" tone="amber"/><StatCard icon={<Award size={19}/>} label="بالاترین امتیاز" value={`${faNumber(history.length ? Math.max(...history.map(h => h.score)) : 0)}٪`} note="بهترین رکورد" tone="violet"/></div>
          <div className="panel history-panel"><div className="section-heading compact"><div><h2>همه آزمون‌ها</h2><p>آخرین آزمون‌ها در ابتدای فهرست نمایش داده می‌شن.</p></div><span className="subtle-count">{faNumber(history.length)} مورد</span></div>
          {history.length ? <div className="history-table-wrap"><table className="history-table"><thead><tr><th>دسته‌بندی</th><th>تاریخ</th><th>سطح</th><th>پاسخ درست</th><th>امتیاز</th></tr></thead><tbody>{history.map(h => <tr key={h.id}><td><span className="table-category"><span className="table-dot"/>{h.category}</span></td><td>{h.date}</td><td>{levelLabels[h.difficulty]}</td><td>{faNumber(h.correct)} از {faNumber(h.total)}</td><td><span className={`table-score ${h.score >= 70 ? 'good' : ''}`}>{faNumber(h.score)}٪</span></td></tr>)}</tbody></table></div> : <EmptyState icon={<History size={25}/>} title="هنوز سابقه‌ای نداری" text="بعد از انجام اولین آزمون، نتیجه‌ات اینجا ذخیره می‌شه." action={() => setPage('home')} actionText="رفتن به داشبورد"/>}
          {history.length > 0 && <button className="danger-text-button" onClick={() => {if (window.confirm('همه سوابق آزمون پاک بشن؟')) {localStorage.removeItem(STORAGE_KEY);setHistory([])}}}>پاک کردن سوابق</button>}</div>
        </section>
  );
}
