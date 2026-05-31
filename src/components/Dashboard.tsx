import React, { useState, useEffect } from "react";
import { Profile, Activity } from "../types";
import { 
  Sparkles, Award, TrendingUp, BookOpen, Clock, Users, Flame, 
  ArrowLeft, FileText, ChevronLeft, ChevronRight, CheckCircle2, Lock, MessageSquare
} from "lucide-react";

interface DashboardProps {
  onNavigateToView: (view: string, targetId?: string) => void;
  profiles: Profile[];
  userSelection: { skill: string; level: string };
  onStartAIGeneration: (goal: string) => void;
}

export default function Dashboard({ onNavigateToView, profiles, userSelection, onStartAIGeneration }: DashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "analytics">("overview");
  const [customGoal, setCustomGoal] = useState("");
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    // Check local bookings
    fetch("/api/bookings")
      .then(r => r.json())
      .then(data => {
        if (data.bookings) setBookingsCount(data.bookings.length);
      })
      .catch(console.error);
  }, []);

  const activities: Activity[] = [
    {
      id: "a1",
      type: "school",
      title: "أكملت وحدة \"الشبكات العصبية\"",
      time: "منذ ساعتين",
      points: "+50 نقطة"
    },
    {
      id: "a2",
      type: "chat_bubble",
      title: "قمت بالرد على استفسار سارة البرمجي",
      time: "منذ 5 ساعات",
      points: "+12 نقطة تأثير"
    }
  ];

  const handleGenerateRoadmap = () => {
    if (!customGoal.trim()) return;
    onStartAIGeneration(customGoal);
    onNavigateToView("learningPlan");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-8 pb-16 text-right font-sans">
      {/* Welcome & Switch Tab Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-5 border-b border-gray-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-[11px] font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نطاق التعلم للمستوى 4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">
            مرحباً أليكس، إليك تقدّمك التعليمي
          </h1>
          <p className="text-xs font-semibold text-gray-500">
            لقد اخترت البدء في <span className="text-[#4F46E5] font-bold">{userSelection.skill}</span> بالمستوى <span className="text-[#7C3AED] font-black">{userSelection.level}</span>.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl self-start">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "overview"
                ? "bg-white text-[#4F46E5] shadow-sm font-extrabold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            نظرة عامة والتوصيات
          </button>
          <button
            onClick={() => setActiveSubTab("analytics")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "analytics"
                ? "bg-white text-[#4F46E5] shadow-sm font-extrabold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            لوحة الإحصائيات والأداء
          </button>
        </div>
      </div>

      {activeSubTab === "overview" ? (
        /* HIGH DENSITY 3-COLUMN LAYOUT CONFORMING TO THEME */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1 - PROGRESS STATS (Symmetrical Left - Col span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Progress Stats Card */}
            <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-sm text-right">
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">إحصائيات التقدم</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-end justify-between mb-1.5 direction-ltr">
                    <span className="text-xs font-medium text-gray-700">ساعات التعلم الكلية</span>
                    <span className="text-lg font-black text-[#4F46E5]">24.5 ساعة</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4F46E5] h-full rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-end justify-between mb-1.5 direction-ltr">
                    <span className="text-xs font-medium text-gray-700">تطابق المهارات الشريك</span>
                    <span className="text-lg font-black text-[#7C3AED]">88%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#7C3AED] h-full rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#EEF2FF] rounded-2xl border border-[#C7D2FE]">
                <p className="text-xs text-[#4338CA] font-bold mb-1 flex items-center gap-1 justify-end">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>تأكيد الذكاء الاصطناعي</span>
                </p>
                <p className="text-[11px] leading-relaxed text-[#4338CA] opacity-90 font-medium">
                  سارة أحمد هي الشريك الأمثل لتعلم هندسة الأوامر مقابل ميزتك في الـ UI/UX. ابدأ الجدولة الآن!
                </p>
              </div>
            </div>

            {/* Next Session Card */}
            <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">الجلسة القادمة المجدولة</h3>
              <div className="flex gap-3 items-start justify-end">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 leading-tight">موازنة هندسة الأوامر</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">مع سارة أحمد • 08:00 م</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg text-[#4F46E5] text-center min-w-[54px] ml-1">
                  <p className="text-[10px] font-bold">السبت</p>
                  <p className="text-lg font-black">12</p>
                </div>
              </div>
            </div>

            {/* Custom AI Roadmap Constructor Card */}
            <div className="ai-border-glow p-5 rounded-3xl shadow-sm bg-white flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-gray-950 flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-[#7C3AED] text-sm">psychology</span>
                <span>توليد مسار تعلّم فوري</span>
              </h3>
              <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                أدخل المهارة المطلوبة ليصمم معالج الذكاء الاصطناعي ووحداته خارطة طريق مخلصة.
              </p>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="مثال: Next.js مع Tailwind"
                  className="w-full text-xs font-medium border border-gray-200/90 rounded-xl px-3.5 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4F46E5]/20 focus:outline-none text-right"
                />
              </div>
              <button 
                onClick={handleGenerateRoadmap}
                className="w-full bg-[#4F46E5] text-white py-2.5 rounded-xl text-[11px] font-bold hover:bg-[#4F46E5]/90 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                توليد خارطة الطريق الذكية
              </button>
            </div>

          </div>

          {/* COLUMN 2 - CENTRAL MATCH RECOMMENDATIONS (Col span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => onNavigateToView("discover")}
                className="text-[11px] text-[#4F46E5] font-bold px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors cursor-pointer"
              >
                تصفح كافة الشركاء
              </button>
              <h2 className="text-lg font-black text-gray-950">ترشيحات المطابقة الذكية</h2>
            </div>

            {/* Promoted Match Card - Ahmad Kamal style */}
            <div className="grid grid-cols-1 gap-4">
              
              {profiles.slice(0, 3).map((p, idx) => {
                const isPremiumHighlight = idx === 0;
                return (
                  <div 
                    key={p.id}
                    className={`bg-white p-5 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                      isPremiumHighlight 
                        ? "border-2 border-[#4F46E5] shadow-md" 
                        : "border-[#E5E7EB] hover:border-gray-300 shadow-sm"
                    }`}
                  >
                    {isPremiumHighlight && (
                      <div className="absolute top-0 left-0 bg-[#4F46E5] text-white px-4 py-1.5 rounded-br-2xl font-black text-[10px] tracking-wide uppercase">
                        {p.compatPercent}% توافق تام
                      </div>
                    )}

                    {!isPremiumHighlight && (
                      <div className="absolute top-3 left-4 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        {p.compatPercent}% توافق
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4 text-right justify-end">
                      <div className="flex-1 space-y-1">
                        <h4 className="text-base font-bold text-gray-900 flex items-center gap-1 justify-end">
                          {p.verified && (
                            <span className="material-symbols-outlined text-xs text-[#4F46E5] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                          )}
                          <span>{p.name}</span>
                        </h4>
                        <p className="text-xs text-gray-500 font-semibold">{p.title} • {p.country}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1.5 justify-end">
                          {p.skillsTaught.slice(0, 3).map((skill, si) => (
                            <span key={si} className="text-[10px] px-2.5 py-1 bg-[#4F46E5]/10 text-[#4F46E5] rounded-md font-bold">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <img 
                        src={p.avatar}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-sm border border-gray-100"
                        alt={p.name}
                      />
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium mb-4 text-right">
                      {p.bio} يمكنني تبادل المعارف الممتدة مقابل الاستفادة من {userSelection.skill} لديك.
                    </p>

                    <div className="flex gap-2.5 border-t border-gray-100 pt-4">
                      <button 
                        onClick={() => onNavigateToView("booking", p.id)}
                        className="flex-1 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm shadow-[#4F46E5]/10 cursor-pointer active:scale-95 text-center"
                      >
                        طلب حجز وجدولة
                      </button>
                      <button 
                        onClick={() => onNavigateToView("matchDetails", p.id)}
                        className="px-5 py-2.5 border border-gray-250 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                      >
                        معاينة الملف
                      </button>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Guides and Live events (Screenshot 5 bottom section) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Recommended Guide banner */}
              <div className="bg-gray-100/80 hover:bg-gray-200 border border-gray-200/60 p-5 rounded-[24px] relative overflow-hidden flex items-center group cursor-pointer transition-all">
                <div className="z-10 w-2/3 space-y-1.5 text-right">
                  <h3 className="text-xs font-black text-gray-950">دليل تصميم وهندسة الأوامر</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-bold">
                    تعلم مهارة صياغة مدخلات الـ AI والـ Few-Shot بسهولة وعمق.
                  </p>
                  <span className="inline-flex items-center text-[10px] font-bold text-[#4F46E5] transition-all group-hover:gap-1.5">
                    الذهاب للدليل
                    <span className="material-symbols-outlined text-xs mr-1">arrow_back</span>
                  </span>
                </div>
                <div className="absolute left-[-15px] bottom-[-15px] w-1/3 opacity-15 pointer-events-none text-[#4F46E5]">
                  <span className="material-symbols-outlined text-[72px]">auto_fix_high</span>
                </div>
              </div>

              {/* Live Event Banner */}
              <div className="bg-slate-900 hover:bg-slate-950 p-5 rounded-[24px] text-white flex flex-col justify-between transition-all">
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-300 justify-end">
                    <span>حدث مجتمعي غداً</span>
                    <span className="material-symbols-outlined text-xs">event</span>
                  </div>
                  <h3 className="text-xs font-black leading-tight">مستقبل هندسة الأوامر لعام 2026</h3>
                  <p className="text-[9px] opacity-75 leading-relaxed font-semibold">
                    جلسة رصد وتحليل غنية بحضور سارة ونخبة من الخبراء.
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <button 
                    onClick={() => alert("تم تسجيل اهتمامك بالحدث بنجاح!")}
                    className="bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer active:scale-95 transition-all text-center"
                  >
                    سجّل الآن
                  </button>
                  <div className="flex -space-x-2 space-x-reverse shrink-0">
                    <img className="w-6 h-6 rounded-full border border-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHjwtmts69E_Y81-EVAySRpUrtJlyNVCjxA9SKaYBTfvfv-8YQ2MNKxQxaMYv7B66xtGl5CpOPwVowztwhNQMtPl4fnQ709orvqbkIE4sXzOhfxEydvzEnHrz_gnd6y35eo6rI-DmRSb3zzNm7Ht-5OV162c-N6wVotYPIFXMXtiWnMXugZLyXQOOHyMJ3IeAKkSvJi7O3SDP-omlohCBrjkQukiUJdmjOz5DHINOY6kWQxdnBmd8QieJ4Y-sM2Uj1H14LMMh5OvMR" alt="m1" />
                    <img className="w-6 h-6 rounded-full border border-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmkTu0PNW5GJmQK0UJr96fhSFEk9hAXsifVPh47eRnKOPLVnCG20PKWyuY-EChh6VLq-Nd1oix203snhzauS4x4IitkG1wfPRdlAQG17ozlqNf9zHLx5rA2It144o5_aHIQKid3s4LgggljEYJ6tWNsNrKawmm7eMvn1ie9OkeMwrlV0Ds0jW5N9QGyLXh5zpSEckTl-CM4VXXjJg4BUh2O0OSxT37WChwPb6pMdqrZhq5cE92N8Kyh2FvjSu6f6gWtEM4NIOuxTfM" alt="m2" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* COLUMN 3 - LEARNING PLAN TIMELINE ROADMAP & PROMO (Col span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 font-sans text-right">
            
            {/* Learning Plan timeline widgets */}
            <div className="bg-white p-5 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col">
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider text-right">خطة مسار التعلم الذكية</h3>
              
              <div className="space-y-4 flex-1 text-right">
                
                <div className="relative pr-6 border-r-2 border-indigo-100 pb-2">
                  <div className="absolute -right-[5px] top-0 w-2 h-2 bg-green-500 rounded-full ring-4 ring-green-100"></div>
                  <p className="text-[10px] font-bold text-green-600 mb-0.5">مكتمل وموثّق</p>
                  <h5 className="text-xs font-bold text-gray-900">أساسيات صياغة الأقسام (Core Basics)</h5>
                </div>

                <div className="relative pr-6 border-r-2 border-[#4F46E5] pb-2">
                  <div className="absolute -right-[5px] top-0 w-2 h-2 bg-[#4F46E5] rounded-full ring-4 ring-indigo-100"></div>
                  <p className="text-[10px] font-bold text-[#4F46E5] mb-0.5">قيد التنفيذ الآن</p>
                  <h5 className="text-xs font-bold text-gray-900">التعمق الاستراتيجي وكتابة الـ Few-Shot</h5>
                  <p className="text-[9px] text-gray-400 mt-1">تحتاج لجلسة عملية إضافية للمطابقة</p>
                </div>

                <div className="relative pr-6 border-r-2 border-gray-100 pb-2 opacity-60">
                  <div className="absolute -right-[5px] top-0 w-2 h-2 bg-gray-200 rounded-full"></div>
                  <p className="text-[10px] font-bold text-gray-400 mb-0.5">مقفلة حتى إنهاء الجلسة</p>
                  <h5 className="text-xs font-bold text-gray-800">مشروع التخرج التجريبي المتكامل</h5>
                </div>

              </div>

              <button 
                onClick={() => onNavigateToView("learningPlan")}
                className="w-full py-3 mt-4 bg-gray-950 hover:bg-black text-white rounded-xl text-[10px] font-black tracking-widest uppercase cursor-pointer transition-colors"
              >
                توسيع واستعراض الخطة بالكامل
              </button>
            </div>

            {/* Invite Promotion Card */}
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] p-5 rounded-3xl text-white shadow-sm flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block font-black">دعوة حصرية</span>
                <h4 className="text-sm font-black mb-1.5 leading-tight">احصل على 50 نقطة تبادل إضافية</h4>
                <p className="text-[10px] opacity-85 leading-relaxed font-semibold">
                  ادعو أصدقائك المطورين للمنصة ليرتفع رصيدك ومعدل الجلسات الممكنة فورياً!
                </p>
              </div>
              <button 
                onClick={() => alert("نسخ كود الدعوة المخصص لك: SYNC-ALEX-2026")}
                className="w-full py-2.5 mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-[11px] font-bold text-white cursor-pointer active:scale-95 transition-all text-center"
              >
                احصل على رابط الدعوة الخاص بك
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* ANALYTICS VIEW - PROGRESS DASHBOARD CHANNELS */
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Hours learned chart (Screenshot 5 span 8) */}
            <div className="lg:col-span-8 bg-white border border-gray-200/60 p-6 md:p-8 rounded-[28px] shadow-sm flex flex-col justify-between gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#141b2b]">مخطط ساعات التعلم</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                  <span>هذا الأسبوع</span>
                </div>
              </div>

              {/* Responsive SVG Chart of weeks */}
              <div className="h-64 w-full flex items-end justify-between gap-2 md:gap-4 pt-4 border-b border-gray-100 relative">
                {/* Visual grid indicators */}
                <div className="absolute inset-x-0 bottom-1/4 border-b border-gray-100/60 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-2/4 border-b border-gray-100/60 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-3/4 border-b border-gray-100/60 pointer-events-none" />

                {/* Bars - Weeks */}
                {[
                  { day: "سبت", hours: "4h", percent: "h-[45%]", active: false },
                  { day: "أحد", hours: "6.5h", percent: "h-[65%]", active: false },
                  { day: "اثنين", hours: "9h", percent: "h-[90%]", active: true },
                  { day: "ثلاثاء", hours: "5h", percent: "h-[50%]", active: false },
                  { day: "أربعاء", hours: "7.5h", percent: "h-[75%]", active: false },
                  { day: "خميس", hours: "6h", percent: "h-[60%]", active: false },
                  { day: "جمعة", hours: "8.5h", percent: "h-[85%]", active: false }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                    {/* Tooltip */}
                    <div className="absolute -top-8 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.hours}
                    </div>
                    {/* Bar */}
                    <div className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                      item.active 
                        ? "bg-[#4F46E5] shadow-lg shadow-[#4F46E5]/20" 
                        : "bg-gray-100 group-hover:bg-[#4F46E5]/20"
                    } ${item.percent}`} />
                  </div>
                ))}
              </div>

              {/* Days display */}
              <div className="flex justify-between text-xs font-bold text-gray-400 px-1">
                <span>سبت</span>
                <span>أحد</span>
                <span>اثنين</span>
                <span>ثلاثاء</span>
                <span>أربعاء</span>
                <span>خميس</span>
                <span>جمعة</span>
              </div>
            </div>

            {/* Mastered Skills Side (Screenshot 5 span 4) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] text-white p-6 md:p-8 rounded-[28px] shadow-lg flex flex-col justify-between relative overflow-hidden group">
              <div>
                <h3 className="text-xl font-bold mb-1">المهارات والخبرات المكتسبة</h3>
                <p className="text-xs opacity-80 mb-6 font-semibold">معدل الإنجاز لمهاراتك الفعالة بالذكاء الاصطناعي</p>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>تحليل البيانات بالذكاء الاصطناعي</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: "92%" }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>تصميم واجهة المستخدم UI/UX</span>
                      <span>78%</span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: "78%" }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>هندسة الأوامر (Prompting)</span>
                      <span>64%</span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: "64%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating abstract ornament */}
              <div className="absolute -bottom-6 -left-6 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[140px] text-white">auto_awesome</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Community Impact Statistics Widget (Screenshot 5 span 4) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white p-6 md:p-8 rounded-[28px] shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-2 text-right">
                <h3 className="text-xl font-bold">تأثير مجتمع سكيل سينك</h3>
                <p className="text-xs opacity-80 font-medium font-semibold">لقد ساعدت وتفاعلت مع 12 طالباً هذا الأسبوع</p>
              </div>

              <div className="py-6 text-right">
                <div className="text-6xl font-black leading-tight flex items-baseline gap-1 font-sans justify-end">
                  128
                  <span className="text-xs font-semibold opacity-80">نقطة تأثير</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm self-start flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="text-xs font-bold">+15% عن الشهر الماضي</span>
              </div>

              {/* Decorative backgrounds */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Achievement Badges & Awards (Screenshot 5 span 8) */}
            <div className="lg:col-span-8 bg-white border border-gray-200/60 p-6 md:p-8 rounded-[28px] shadow-sm space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer">
                  عرض الكل
                </span>
                <h3 className="text-xl font-bold text-gray-900">أوسمة وجوائز المنصة</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                
                <div className="flex flex-col items-center text-center gap-1.5 group cursor-pointer animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-100 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-purple-600 text-xl font-bold">military_tech</span>
                  </div>
                  <span className="text-xs font-bold text-gray-950">متعلم سريع</span>
                  <span className="text-[10px] text-gray-400 font-semibold">دورة كاملة في يوم</span>
                </div>

                <div className="flex flex-col items-center text-center gap-1.5 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border-2 border-emerald-100 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-emerald-600 text-xl font-bold">groups</span>
                  </div>
                  <span className="text-xs font-bold text-gray-950">مرشد ملهم</span>
                  <span className="text-[10px] text-gray-400 font-semibold">مساعدة 10 مبتدئين</span>
                </div>

                <div className="flex flex-col items-center text-center gap-1.5 group cursor-pointer animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center border-2 border-indigo-100 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#4F46E5] text-xl font-bold">workspace_premium</span>
                  </div>
                  <span className="text-xs font-bold text-gray-950">خبير المحتوى</span>
                  <span className="text-[10px] text-gray-400 font-semibold">دقة إجابة 100%</span>
                </div>

                <div className="flex flex-col items-center text-center gap-1.5 opacity-45 cursor-not-allowed">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-xs font-bold text-gray-500">مبتكر الغد</span>
                  <span className="text-[10px] text-gray-400 font-semibold">لم يكتمل بعد</span>
                </div>

              </div>
            </div>

          </div>

          {/* Recent Activity (Screenshot 5 bottom) */}
          <div className="space-y-4 text-right">
            <h3 className="text-lg font-bold text-gray-950">النشاط الأخير</h3>
            <div className="flex flex-col gap-4">
              {activities.map((act) => (
                <div 
                  key={act.id}
                  className="glass-ai p-5 rounded-2xl flex items-center justify-between border-r-4 border-r-[#4F46E5]"
                >
                  <span className="text-[11px] font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {act.points}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <h4 className="text-sm font-bold text-gray-950">{act.title}</h4>
                      <p className="text-[11px] text-gray-400 font-bold">{act.time}</p>
                    </div>
                    <div className="bg-[#4F46E5]/15 p-2 rounded-xl text-[#4F46E5]">
                      {act.type === "school" ? (
                        <span className="material-symbols-outlined text-sm">school</span>
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
