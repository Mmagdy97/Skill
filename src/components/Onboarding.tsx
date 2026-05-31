import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Cpu, ShieldCheck, ArrowLeft, ArrowRight, UserCheck } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
  onSkipToDashboard: () => void;
}

export default function Onboarding({ onComplete, onSkipToDashboard }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const screens = [
    {
      title: "تعلم. علّم. تطور باستمرار.",
      description: "اكتشف قوة التبادل المعرفي المدعوم بالذكاء الاصطناعي. نصلك بالخبراء الذين يحتاجون لمهاراتك، ونمنحك فرصة تعلم ما تطمح إليه في بيئة احترافية.",
      badge: "الجيل القادم من التعليم الذكي",
      icon: <Cpu className="w-14 h-14 text-[#4F46E5]" />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdifBfIZDkSrGZXl_Yfip3dy8N8t7kv3pX6JzC5tjd-aDC4n_O9vrhqpzfyCDRL0gD1FT_NtMPQCbZyNcn2p3OwB8DdPcJapyEvEfLlKsBZXQAl8_lQ2PRUDUsiFp1KVptsp7Pro7vXFUiIpKgvFwjtS9zr7b67amNDNaOTWHV7xRAQd1jEAojGtIjX2nS33TmMzdZneeB6f8TmxMTewBbp3Z55aeZ2v0BAbGqeIW0EVcJQr7Sq2Pj6S3GultDku0s_XSMPEr5Fh3J",
      chips: [
        { label: "توصيات مخصصة", icon: "psychology" },
        { label: "مجتمع نشط", icon: "groups" },
        { label: "تتبع المهارات", icon: "auto_graph" }
      ]
    },
    {
      title: "تطابق ذكي بنسبة 98% للتكامل التام",
      description: "نظام التقييم الذكي يحلل مهاراتك والمهارات التي تريد اكتسابها ويمنحك نقاط توافق (Compatibility Score) فورية مع أشخاص مكملين لاهتماماتك دون عناء البحث التقليدي.",
      badge: "مطابقة فورية مدعومة بالذكاء الاصطناعي",
      icon: <UserCheck className="w-14 h-14 text-[#7C3AED]" />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHjwtmts69E_Y81-EVAySRpUrtJlyNVCjxA9SKaYBTfvfv-8YQ2MNKxQxaMYv7B66xtGl5CpOPwVowztwhNQMtPl4fnQ709orvqbkIE4sXzOhfxEydvzEnHrz_gnd6y35eo6rI-DmRSb3zzNm7Ht-5OV162c-N6wVotYPIFXMXtiWnMXugZLyXQOOHyMJ3IeAKkSvJi7O3SDP-omlohCBrjkQukiUJdmjOz5DHINOY6kWQxdnBmd8QieJ4Y-sM2Uj1H14LMMh5OvMR",
      chips: [
        { label: "درجة توافق دقيقة", icon: "percent" },
        { label: "مواعيد متوافقة", icon: "schedule" },
        { label: "تحليل ذكي فوري", icon: "analytics" }
      ]
    },
    {
      title: "خارطة طريق تعليمية مخصصة ومولدة بالكامل",
      description: "بمجرد تحديد هدفك، يقوم محرك الذكاء الاصطناعي بتصميم منهج ووحدات تدريبية مفصلة وتفاعلية مقسمة زمنياً ومتبوعة بنصائح وتوجيهات أسبوعية.",
      badge: "خطة مخصصة تلائم إمكانياتك",
      icon: <BookOpen className="w-14 h-14 text-emerald-600" />,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      chips: [
        { label: "وحدات تفاعلية", icon: "map" },
        { label: "نصائح ذكية مرافقة", icon: "tips_and_updates" },
        { label: "مشاريع عملية متكاملة", icon: "architecture" }
      ]
    }
  ];

  const current = screens[step];

  const handleNext = () => {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between py-8 px-4 md:px-12 max-w-7xl mx-auto">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] -z-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[150px]"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-row-reverse text-right">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl text-[#4F46E5]">SkillSync AI</span>
          <span className="material-symbols-outlined text-[#4F46E5] text-3xl font-bold">auto_awesome</span>
        </div>
        <button 
          onClick={onSkipToDashboard}
          className="text-sm font-semibold text-gray-500 hover:text-[#4F46E5] transition-colors cursor-pointer"
        >
          تخطي للرئيسية
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto text-right">
        {/* Image / Graphic with Floating Card */}
        <div className="relative flex justify-center items-center h-full order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-sm aspect-[4/4] rounded-[42px] overflow-hidden shadow-2xl border border-white/20"
            >
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Interaction widget matching image 8 */}
              {step === 0 && (
                <div className="absolute bottom-6 left-6 right-6 glass-ai p-5 rounded-3xl ai-border-glow shadow-xl text-right">
                  <div className="flex items-center gap-3 justify-end flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#4F46E5]">hub</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#4F46E5]">مطابقة ذكية</p>
                      <p className="text-xs text-gray-600">يتم الآن العثور على شريكك التعليمي الأمثل...</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="absolute bottom-6 left-6 right-6 glass-ai p-5 rounded-3xl ai-border-glow shadow-xl text-right">
                  <div className="flex items-center gap-3 justify-end flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#7C3AED]">verified</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#7C3AED]">درجة التوافق</p>
                      <p className="text-xs text-gray-600">طرح مهارات متكاملة بنسبة 98% ومواعيد مناسبة!</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="absolute bottom-6 left-6 right-6 glass-ai p-5 rounded-3xl ai-border-glow shadow-xl text-right">
                  <div className="flex items-center gap-3 justify-end flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-emerald-600">map</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-700">خطة ذكية مولدة</p>
                      <p className="text-xs text-gray-600">3 وحدات رئيسية جاهزة تلخص خطوتك القادمة.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Details & Buttons */}
        <div className="space-y-6 text-right order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4F46E5]/10 text-[#7C3AED] rounded-full border border-[#4F46E5]/20 text-xs font-semibold justify-end flex-row-reverse">
                <span className="material-symbols-outlined text-sm font-bold">verified</span>
                <span>{current.badge}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                {step === 0 ? "تعلم. علّم." : step === 1 ? "مطابقة وتكامل" : "خارطة طريق"}{" "}
                <br />
                <span className="text-[#4F46E5]">{step === 0 ? "تطور باستمرار." : step === 1 ? "بلمسة واحدة." : "بثوان معدودة."}</span>
              </h1>

              <p className="text-base text-gray-600 max-w-xl leading-relaxed">
                {current.description}
              </p>

              {/* Chips / Action Badges */}
              <div className="flex flex-wrap gap-2 pt-2 justify-end">
                {current.chips.map((chip, idx) => (
                  <div 
                    key={idx}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200/80 transition-colors rounded-xl flex items-center gap-1.5 text-xs font-semibold text-gray-700 flex-row-reverse"
                  >
                    <span className="material-symbols-outlined text-sm text-[#4F46E5]">{chip.icon}</span>
                    <span>{chip.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Dot Indicators & Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pt-6 flex-row-reverse">
            <button 
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-3.5 bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 transition-all rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4F46E5]/25 cursor-pointer active:scale-95"
            >
              <span>{step === screens.length - 1 ? "ابدأ التقييم الفوري" : "ابدأ الرحلة الآن"}</span>
              <ArrowLeft className="w-5 h-5 animate-pulse" />
            </button>

            {step > 0 && (
              <button 
                onClick={handlePrev}
                className="w-full sm:w-auto px-6 py-3.5 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 transition-all rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
                <span>السابق</span>
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 justify-end pt-4">
            {screens.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === step ? "w-6 bg-[#4F46E5]" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer social profile avatars mock */}
      <div className="border-t border-gray-200/50 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 flex-row-reverse text-right">
        <div className="flex -space-x-2 space-x-reverse flex-row-reverse">
          <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYO8n6B1LszLk8aSuaYUNexsBOGOFjiY6Yt3tEtalZC_94gtrj7hSIAUcCa3jiMCUkKUlivR0nEU00ZvpQuaeBZR67CpN1O5SnZfAgLWouk44DuolwLJ8nY_VblXzspd8UvRU0XCUdB4QiDNnGJulq6HUKtg2q6GA2cKhtFQejmdaaT_wJjMqzCTm9MxwpCN66b72Cmqe0_CZiCi5gbJ7ej8W1E4w9FRf910YCv_OYnjj3ua9V5yTZ7IN03Srq7ASq09Pst7tHCPOK" alt="avatar" />
          <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Ze2b89Y-5whJv3gc8afZU_ty75ZF3VR5m9kQOOQpKQRYZZWCZzur6QmEODKS-JUeT5U3J6LGyAQcWsuaxOtfppgpi5KutLLvFJ7xCFAogSFJyc-2YD7p9mVYqJUpXfPA8Sb1yPmYfd7qaJvDCAlcdu6s6-iavFmgjDLp1AYqaHRU_UG_BrsTWkhmaRk1IqiX4aO44568sd7-9EwjZZRonhH8TEZ7ipfyKUImESDgB-E8HC5OuNHbudk8SUCEyPAvl30Sjs5NV1GS" alt="avatar" />
          <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6OCJfA8K4WV_r1ZUxi5V6ERNCsYwrJ4vDmDGJLN45wDWpUtIi-t1GegOi6QNlcLnxWwhOjx5rQiCLuRsAlOF_R65j1LTUlC1d5UX7obi_rr8sU_ZiVsASc8nFcBZ17-b7KT3EylHWjDsEd24YL3XE3aps5Zro2gHg-egcI3dclF2yQ_CgPl8RLd0xfnJvM4sAmim_wFlPLjstagD2e4cua2Q0mKcatBmjAnAV1FlLkiJywv5Iwyfrw2JpiVBvPJCMvFj5XzUXxjW-" alt="avatar" />
          <div className="w-9 h-9 rounded-full border-2 border-white bg-[#4F46E5] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
            +10k
          </div>
        </div>
        <p className="text-xs text-gray-500 font-medium">انضم إلى آلاف المتعلمين والمعلمين اليوم في منصتنا المستديمة.</p>
      </div>
    </div>
  );
}
