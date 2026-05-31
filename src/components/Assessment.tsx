import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, School, Compass, HelpCircle, Loader2, Sparkles, AlertCircle } from "lucide-react";

interface AssessmentProps {
  onComplete: (userSkill: string, userLevel: string) => void;
  onBack: () => void;
}

export default function Assessment({ onComplete, onBack }: AssessmentProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  const options = [
    {
      id: "beginner",
      label: "مبتدئ",
      description: "أنا أتعلم الأساسيات والأدوات مثل Figma و Sketch.",
      icon: <School className="w-8 h-8 text-[#4F46E5]" />,
      badge: null
    },
    {
      id: "intermediate",
      label: "متوسط",
      description: "لقد صممت عدة مشاريع وأفهم مبادئ التصميم جيدا.",
      icon: <Compass className="w-8 h-8 text-[#7C3AED]" />,
      badge: "متناسق مع مهاراتك"
    },
    {
      id: "advanced",
      label: "متقدم / خبير",
      description: "أقود فرق التصميم وأنشئ أنظمة تصميم (Design Systems) معقدة.",
      icon: <Award className="w-8 h-8 text-amber-600" />,
      badge: "موصى به بالذكاء الاصطناعي",
      featured: true
    },
    {
      id: "other",
      label: "أخرى",
      description: "لدي خلفية مختلفة أو أرغب في تحديد مستوى مخصص.",
      icon: <HelpCircle className="w-8 h-8 text-gray-500" />,
      badge: null
    }
  ];

  const handleOptionSelect = (optId: string) => {
    setSelectedOption(optId);
  };

  const handleNext = async () => {
    if (!selectedOption) return;
    const selectedObj = options.find(o => o.id === selectedOption);
    const label = selectedObj ? selectedObj.label : "متوسط";

    setLoadingAdvice(true);
    try {
      const response = await fetch("/api/ai/onboarding-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentSkill: "تصميم واجهة المستخدم (UI/UX)",
          chosenLevel: label
        })
      });
      const data = await response.json();
      setAiAdvice(data.advice);
      setLoadingAdvice(false);

      // Show advice for 4 seconds then advance to main dashboard
      setTimeout(() => {
        onComplete("تصميم واجهة المستخدم (UI/UX)", label);
      }, 4200);
    } catch (e) {
      console.error(e);
      setLoadingAdvice(false);
      onComplete("تصميم واجهة المستخدم (UI/UX)", label);
    }
  };

  return (
    <div className="relative min-h-[90vh] py-8 px-4 md:px-12 max-w-5xl mx-auto flex flex-col justify-between text-right">
      {/* Top Banner */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-150 flex-row-reverse">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl text-[#4F46E5]">SkillSync AI</span>
          <span className="material-symbols-outlined text-[#4F46E5] text-3xl font-bold">auto_awesome</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-row-reverse">
          <span className="material-symbols-outlined">help_outline</span>
          <span>مساعدة التقييم</span>
        </div>
      </div>

      {/* Progress Header Indicator */}
      <div className="max-w-2xl w-full mx-auto mb-10 text-right">
        <div className="flex justify-between items-baseline mb-2 flex-row-reverse">
          <div className="text-right">
            <p className="text-xs font-bold text-[#4F46E5] tracking-wider uppercase mb-1">التقييم المستمر</p>
            <h2 className="text-2xl font-black text-gray-900">إعداد ملف مهاراتك بالكامل</h2>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            خطوة 3 من 10
          </span>
        </div>
        
        {/* Customized Progress Bar */}
        <div className="h-2 w-full bg-gray-200/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-l from-[#4F46E5] to-[#7C3AED] w-[30%] rounded-full transition-all duration-700 ease-out" />
        </div>
      </div>

      {/* Main Canvas Title */}
      <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full border border-[#4F46E5]/20 text-xs font-bold">
          <span>تحليل الذكاء الاصطناعي الفوري</span>
          <span className="material-symbols-outlined text-sm">psychology</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-[#141b2b] leading-snug">
          ما هو مستواك الحالي في تصميم واجهة المستخدم (UI Design)؟
        </h1>
      </div>

      {/* Bento Grid Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full mx-auto">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleOptionSelect(opt.id)}
            className={`option-card group relative p-6 rounded-[28px] bg-white border-2 text-right flex items-start gap-4 transition-all duration-300 hover:shadow-xl cursor-pointer ${
              selectedOption === opt.id
                ? "border-[#4F46E5] ring-4 ring-[#4F46E5]/10 bg-[#4F46E5]/[0.01]"
                : opt.featured
                ? "border-purple-200 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Left-side/RTL Icon representation */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              selectedOption === opt.id
                ? "bg-[#4F46E5] text-white"
                : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
            }`}>
              {opt.icon}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-row-reverse">
                <span className="font-extrabold text-lg text-[#141b2b]">{opt.label}</span>
                {opt.badge && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    opt.featured ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                  }`}>
                    {opt.badge}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-500 leading-relaxed text-right">
                {opt.description}
              </p>
            </div>

            {/* Checkmark icon on selected */}
            <div className={`absolute top-4 left-4 transition-all duration-300 ${
              selectedOption === opt.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}>
              <span className="material-symbols-outlined text-[#4F46E5] font-bold text-2xl">check_circle</span>
            </div>
          </button>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="max-w-4xl w-full mx-auto mt-12 pt-6 border-t border-gray-150 flex items-center justify-between flex-row-reverse">
        <button
          onClick={handleNext}
          disabled={!selectedOption || loadingAdvice}
          className={`px-10 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all ${
            selectedOption 
              ? "bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 active:scale-95 cursor-pointer shadow-[#4F46E5]/25" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          {loadingAdvice ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري التحليل...</span>
            </>
          ) : (
            <>
              <span>التالي</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </>
          )}
        </button>

        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
          <span>السابق</span>
        </button>
      </div>

      {/* Floating AI Insight Toast (AI smart hint bubble on corner) */}
      <AnimatePresence>
        {aiAdvice ? (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md bg-white border-2 border-[#4F46E5]/20 shadow-2xl p-5 rounded-3xl z-50 glass-ai flex gap-3 animate-pulse"
          >
            <div className="p-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl self-start">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div className="text-right space-y-1">
              <h4 className="font-bold text-sm text-[#4F46E5] flex items-center gap-1">
                <span>توجيه مخصص من الذكاء الاصطناعي</span>
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                {aiAdvice}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md bg-white/90 border border-[#4F46E5]/10 shadow-xl p-4 rounded-3xl z-40 glass-ai flex gap-3 text-right">
            <div className="p-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-xl self-start">
              <span className="material-symbols-outlined">tips_and_updates</span>
            </div>
            <div className="text-right space-y-1">
              <h4 className="font-bold text-xs text-[#4F46E5]">نصيحة ذكية</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
                بناءً على اهتماماتك السابقة، قد يكون مستوى "المتقدم / خبير" هو نقطة البداية المثالية لك للمطابقة!
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
