import React, { useState } from "react";
import { Profile } from "../types";
import { 
  ArrowRight, ShieldCheck, Clock, Star, BookOpen, MapPin, 
  Sparkles, Calendar, MessageSquare, Briefcase, CalendarCheck 
} from "lucide-react";

interface MatchDetailsProps {
  profile: Profile;
  onBack: () => void;
  onNavigateToView: (view: string, targetId?: string) => void;
}

export default function MatchDetails({ profile, onBack, onNavigateToView }: MatchDetailsProps) {
  const [activeTab, setActiveTab ] = useState<"ai_match" | "about">("ai_match");

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 space-y-8">
      {/* Back button header (Screenshot 6 template style) */}
      <div className="flex justify-between items-center text-right">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع للمطابقات</span>
        </button>

        <span className="text-xs font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1 rounded-full border border-[#7C3AED]/20">
          تحليل المطابقة الفوري بالذكاء الاصطناعي
        </span>
      </div>

      {/* Covered SaaS-style Background Header Panel */}
      <div className="relative h-44 w-full bg-gradient-to-r from-[#4F46E5] via-[#4F46E5]/90 to-[#7C3AED] rounded-[32px] overflow-hidden shadow-sm">
        {/* Abstract shapes matching modern portfolio style */}
        <div className="absolute -top-24 -left-12 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-6 right-12 text-white text-right space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md">
              التوافق المتكامل {profile.compatPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Info Card (Screenshot 6 top layout) */}
      <div className="bg-white border border-gray-200/60 p-6 md:p-8 rounded-[32px] shadow-sm -mt-16 relative z-10 space-y-6">
        
        <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-6">
          <div className="flex gap-4 items-center flex-row-reverse">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md relative -mt-10 md:-mt-12 bg-white"
            />
            <div className="text-right self-center">
              <h1 className="text-2xl font-extrabold text-gray-950 flex items-center gap-1.5 justify-end">
                {profile.verified && (
                  <span className="material-symbols-outlined text-[#4F46E5] text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                )}
                <span>{profile.name}</span>
              </h1>
              <p className="text-sm text-gray-500 font-semibold">{profile.title}</p>
              
              {profile.country && (
                <div className="flex items-center gap-1 text-xs text-gray-400 font-bold pt-1 justify-end">
                  <span>{profile.country}</span>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>

          {/* Core Action Call triggers */}
          <div className="flex gap-2.5 w-full md:w-auto pt-4 md:pt-0 border-t border-gray-100 md:border-t-0">
            <button 
              onClick={() => onNavigateToView("chat", profile.id)}
              className="flex-1 md:flex-none px-6 py-3.5 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
              <span>بدء محادثة</span>
            </button>

            <button 
              onClick={() => onNavigateToView("booking", profile.id)}
              className="flex-1 md:flex-none px-8 py-3.5 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#4F46E5]/25 transition-all cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 fill-white" />
              <span>حجز جلسة عمل</span>
            </button>
          </div>
        </div>

        {/* Quick Statistics metrics layout (Screenshot 6 icons metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3.5 text-right justify-between">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">ساعات الإرشاد</p>
              <p className="text-base font-black text-gray-900">{profile.mentorshipHours}+ ساعة</p>
            </div>
            <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-3 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3.5 text-right justify-between">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">التقييم المستمر</p>
              <p className="text-base font-black text-gray-900">{profile.ratingValue} / 5.0</p>
            </div>
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3.5 text-right justify-between">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">الأبحاث المنشورة</p>
              <p className="text-base font-black text-gray-900">{profile.publishedResearch} ورقة بحثية</p>
            </div>
            <div className="bg-[#7C3AED]/10 text-[#7C3AED] p-3 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Selector Navigation */}
      <div className="flex border-b border-gray-200 justify-end">
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-4 px-6 text-xs font-black relative transition-all cursor-pointer ${
            activeTab === "about"
              ? "text-[#4F46E5]"
              : "text-gray-400 hover:text-gray-900"
          }`}
        >
          <span>حول الخبير والمهارات</span>
          {activeTab === "about" && (
            <span className="absolute bottom-0 inset-x-4 h-1 bg-[#4F46E5] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("ai_match")}
          className={`pb-4 px-6 text-xs font-black relative transition-all cursor-pointer ${
            activeTab === "ai_match"
              ? "text-[#4F46E5]"
              : "text-gray-400 hover:text-gray-900"
          }`}
        >
          <span>التطابق الذكي</span>
          {activeTab === "ai_match" && (
            <span className="absolute bottom-0 inset-x-4 h-1 bg-[#4F46E5] rounded-full" />
          )}
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === "ai_match" ? (
        <div className="space-y-6">
          {/* AI Compatibility Analysis Details */}
          <div className="bg-white border border-gray-200/60 p-6 md:p-8 rounded-[32px] shadow-sm space-y-6 text-right">
            <div className="flex items-center gap-2 text-gray-900 justify-end">
              <h3 className="text-lg font-extrabold">تحليل التوافق بالتكامل</h3>
              <Sparkles className="w-5 h-5 text-[#7C3AED]" />
            </div>

            <div className="grid grid-cols-1 gap-4 text-right">
              {profile.matchTags.map((tag, idx) => (
                <div key={idx} className="bg-[#fcfcff] p-4 rounded-2xl border border-gray-100 flex items-start gap-3.5 text-right justify-end flex-row-reverse">
                  <div className="bg-[#4F46E5]/10 text-[#4F46E5] font-black text-xs w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-right">
                    <h4 className="font-extrabold text-sm text-gray-900 mb-1">{tag}</h4>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                      {idx === 0 
                        ? `سعة توافقية بالمهارات: ${profile.name} تتمتع بخلفية واسعة في ${profile.skillsTaught.join(" و ")} وتطمح لتعلم معيناتك في ${profile.skillsWanted.join(" و ")} مما يحقق التكامل التام.`
                        : idx === 1 
                        ? `توافق المواعيد الأسبوعية: ${profile.schedule}`
                        : `نمط وجاذبية التعلم: ${profile.learningStyle}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Alignment reasoning (Screenshot 6 bottom highlight box) */}
          <div className="bg-[#4F46E5]/[0.02] border-2 border-[#4F46E5]/15 p-6 md:p-8 rounded-[32px] flex gap-4 text-right justify-end flex-row-reverse">
            <div className="w-12 h-12 bg-white border border-indigo-100 rounded-2xl flex items-center justify-center text-[#4F46E5] shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 self-center text-right">
              <h4 className="font-black text-sm text-[#4F46E5]">تحليل الذكاء الاصطناعي للتطابق التام</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-bold">
                {profile.name} تعتبر شريكاً مثالياً للتبادل التعليمي؛ لقدرتها على ملاءمة خلفيتها بمجال {profile.skillsTaught[0]} لمتمتلكات مهاراتك بشكل متسق، وتعلمك الاستراتيجي للمشاريع. نقترح حجز جلسة استكشافية فورية مدتها ساعة واحدة.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-right">
          
          {/* Bio card */}
          <div className="bg-white border border-gray-200/60 p-6 md:p-8 rounded-[32px] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 justify-end">
              <span>نبذة عن الخبير</span>
              <Briefcase className="w-5 h-5 text-gray-700" />
            </h3>
            <p className="text-sm font-semibold text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Mentorship skills tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200/60 p-6 rounded-3xl shadow-sm space-y-3">
              <h4 className="text-xs font-black text-emerald-800 tracking-wider">المهارات المتاح تدريسها:</h4>
              <div className="flex flex-wrap gap-2 justify-end">
                {profile.skillsTaught.map((s, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-950 border border-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200/60 p-6 rounded-3xl shadow-sm space-y-3">
              <h4 className="text-xs font-black text-purple-800 tracking-wider">يرغب في تعلمها مجهوراً:</h4>
              <div className="flex flex-wrap gap-2 justify-end">
                {profile.skillsWanted.map((s, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-950 border border-indigo-100 px-3 py-1.5 rounded-xl text-xs font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
