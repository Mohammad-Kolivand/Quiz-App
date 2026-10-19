import { useState } from "react";
import {
  Target,
  ShieldCheck,
  UserRound,
  Mail,
  BriefcaseBusiness,
  ChevronDown,
  ArrowLeft,
  Check,
  Zap,
  Award,
} from "lucide-react";

import { specialties } from "../../data";

export default function Onboarding({ onCreateAccount }) {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    specialty: "frontend",
  });
  return (
    <div className="onboarding-shell">
      <form
        className="onboarding-card"
        onSubmit={(event) => {
          event.preventDefault();
          onCreateAccount(signup);
        }}
      >


        <p className="onboarding-copy">
          برای شروع، فقط چند اطلاعات ساده ازت می‌گیریم. نتیجه‌ها و روند پیشرفتت
          روی همین دستگاه ذخیره می‌شن.
        </p>
        <label className="field-label" htmlFor="user-name">
          نام و نام خانوادگی
        </label>
        <div className="input-wrap">
          <UserRound size={18} />
          <input
            id="user-name"
            value={signup.name}
            onChange={(e) => setSignup((v) => ({ ...v, name: e.target.value }))}
            placeholder="مثلاً مریم احمدی"
            autoComplete="name"
            required
            maxLength={70}
          />
        </div>
        <label className="field-label" htmlFor="user-email">
          ایمیل
        </label>
        <div className="input-wrap">
          <Mail size={18} />
          <input
            id="user-email"
            type="email"
            value={signup.email}
            onChange={(e) =>
              setSignup((v) => ({ ...v, email: e.target.value }))
            }
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={120}
          />
        </div>
        <label className="field-label" htmlFor="user-specialty">
          حوزه تخصصی تو
        </label>
        <div className="input-wrap select-wrap">
          <BriefcaseBusiness size={18} />
          <select
            id="user-specialty"
            value={signup.specialty}
            onChange={(e) =>
              setSignup((v) => ({ ...v, specialty: e.target.value }))
            }
          >
            {specialties.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <ChevronDown size={16} />
        </div>
        <button className="primary-button onboarding-submit" type="submit">
          ساخت فضای شخصی <ArrowLeft size={18} />
        </button>

      </form>
      <div className="onboarding-side">
        <div className="side-glow glow-one" />
        <div className="side-glow glow-two" />
        <div className="onboarding-side-content">

          <div className="big-orbit">
            <div className="orbit-ring ring-a" />
            <div className="orbit-ring ring-b" />
            <div className="orbit-center">
              <Target size={43} />
            </div>

          </div>
          <h2>
            دانستن کافی نیست.
            <br />
            <span>پیشرفتت را بسنج.</span>
          </h2>
          <p>
            آزمون‌های متنوع، بازخورد روشن و گزارشی که به حوزه تخصصی تو نگاه
            می‌کند.
          </p>
          <div className="side-proof">
            <span>
              <Check size={15} /> آزمون متنوع
            </span>
            <span>
              <Check size={15} /> تحلیل عملکرد
            </span>
            <span>
              <Check size={15} /> سابقه شخصی
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
