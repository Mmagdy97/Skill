import React, { useState } from "react";
import { LearningPlan, Unit } from "../types";
import { 
  Sparkles, CheckCircle2, Circle, Lock, PlayCircle, Star, 
  MessageSquare, Calendar, RefreshCcw, BookOpen, Clock, AlertCircle 
} from "lucide-react";

interface LearningPlanViewProps {
  plan: LearningPlan;
  onNavigateToView: (view: string) => void;
  onRegenerate: () => void;
  loading: boolean;
}

export default function LearningPlanView({ plan, onNavigateToView, onRegenerate, loading }: LearningPlanViewProps) {
  const [tasks, setTasks] = useState({
    t1: true,
    t2: false,
    t3: false
  });

  const toggleTask = (key: "t1" | "t2" | "t3") => {
    setTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate matching dynamic progress parameter for Unit 2
  const completedTasksCount = Object.values(tasks).filter(Boolean).length;
  const unit2Percent = Math.round((completedTasksCount / 3) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 space-y-8">
      
      {/* Header roadmap block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-150">
        <div className="space-y-1 text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#7C3AED] rounded-full text-[10px] font-bold border border-purple-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خارطة طريق تعليمية ذكية ومخصصة</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            خطة التعلّم المولدّة بواسطة الذكاء الاصطناعي
          </h2>
          <p className="text-xs text-gray-500 font-semibold">
            منهج معد لمطابقة أهدافك مع المعلم المعتمد <span className="text-[#4F46E5] font-bold">{plan.expertName}</span>
          </p>
        </div>

        <button 
          onClick={onRegenerate}
          disabled={loading}
          className="px-5 py-3 border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/5 font-bold text-xs rounded-2xl flex items-center gap-2 transition-all cursor-pointer bg-white"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>توليد وتحديث الخطة</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 border-4 border-t-[#4F46E5] border-r-[#7C3AED] border-b-gray-100 border-l-gray-100 rounded-full animate-spin mx-auto" />
          <h3 className="font-extrabold text-base text-gray-800">جاري تحليل الأهداف وتصميم المنهج بالتكامل...</h3>
          <p className="text-xs text-gray-400 font-medium">نقوم بمزامنة تفضيلاتك وتوليد 3 وحدات تدريبية متكاملة عبر Gemini API.</p>
        </div>
      ) : (
        <div className="space-y-8 text-right">
          
          {/* Progress Header Analytics Cards (Screenshot 8) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-sm text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">الوحدات التعليمية</span>
              <p className="text-xl font-black text-gray-950">3 وحدات تدريبية</p>
              <p className="text-[10px] text-gray-500 font-semibold pt-1">مقسمة حسب عمق ومحاور الأهداف</p>
            </div>

            <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-sm text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">معدل الإنجاز الإجمالي</span>
              <div className="flex items-baseline gap-1 pt-0.5 justify-end">
                <span className="text-xs font-semibold text-gray-400">للوحدات والتدريبات</span>
                <span className="text-2xl font-black text-emerald-600">65%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="bg-white border border-gray-200/60 p-5 rounded-2xl shadow-sm text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">المهارات المحددة</span>
              <div className="flex flex-wrap gap-1.5 pt-1 justify-end">
                {plan.skills.map((s, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[9px] font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Core Timeline units list (Screenshot 8 list of units) */}
          <div className="space-y-6 relative border-r-2 border-r-gray-200/80 mr-4 md:mr-6 pr-6 py-2">
            
            {/* Unit 1 card (Completed 100%) */}
            <div className="relative group">
              {/* Dot decoration */}
              <div className="absolute top-1/2 -right-[35px] -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>

              <div className="bg-white border border-gray-200/60 p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 hover:shadow-md transition-all">
                <div className="space-y-1 flex-1 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {plan.units[0]?.duration || "4 ساعات"}
                    </span>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">الوحدة الأولى • مكتمل</span>
                  </div>
                  <h3 className="text-lg font-black text-[#141b2b]">{plan.units[0]?.title || "مقدمة وفهم موجه"}</h3>
                  <p className="text-xs text-gray-500 font-semibold">{plan.units[0]?.description || "أساسيات صب المطالب ومقاولة التكرارات"}</p>
                </div>
              </div>
            </div>

            {/* Unit 2 card (In progress with dynamic tasks checklists) */}
            <div className="relative group">
              {/* Dot decoration */}
              <div className="absolute top-10 -right-[35px] w-6 h-6 rounded-full bg-[#4F46E5] border-4 border-white shadow-md flex items-center justify-center text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </div>

              <div className="bg-white border-2 border-[#4F46E5] p-6 rounded-[28px] shadow-lg space-y-6">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="space-y-1 flex-1 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {plan.units[1]?.duration || "8 ساعات"}
                      </span>
                      <span className="text-xs font-black text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full">الوحدة الثانية • جارية الآن</span>
                    </div>
                    <h3 className="text-lg font-black text-[#141b2b]">{plan.units[1]?.title || "التعمق الاستراتيجي وإنشاء المشاريع"}</h3>
                    <p className="text-xs text-gray-500 font-semibold">{plan.units[1]?.description || "تطبيقات وتكوينات دقيقة ومفاهيم مكملة"}</p>
                  </div>

                  {/* Percentage chart display */}
                  <div className="text-right font-black text-[#4F46E5] text-3xl">
                    {unit2Percent}%
                    <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pt-0.5 text-right">درجة الإتمام</span>
                  </div>
                </div>

                {/* Checklist (Screenshot 8 interactive tasks) */}
                <div className="space-y-3 bg-[#fcfcff] p-5 rounded-2xl border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 block mb-2 text-right">تدريبات وتحديات الوحدة العملية:</h4>
                  
                  <button 
                    onClick={() => toggleTask("t1")}
                    className="w-full flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-all text-right justify-end flex-row-reverse"
                  >
                    <div className="pt-0.5">
                      {tasks.t1 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <p className={`text-xs font-black ${tasks.t1 ? "line-through text-gray-400" : "text-gray-800"}`}>
                        قراءة ملخص المبادئ وتصميم واجهة المستخدم الأساسية
                      </p>
                    </div>
                  </button>

                  <button 
                    onClick={() => toggleTask("t2")}
                    className="w-full flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-all text-right justify-end flex-row-reverse"
                  >
                    <div className="pt-0.5">
                      {tasks.t2 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <p className={`text-xs font-black ${tasks.t2 ? "line-through text-gray-400" : "text-gray-800"}`}>
                        تطبيق تمرين_معايرة_الذكاء_الاصطناعي مع الشريك والمراجعة الميدانية
                      </p>
                    </div>
                  </button>

                  <button 
                    onClick={() => toggleTask("t3")}
                    className="w-full flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-all text-right justify-end flex-row-reverse"
                  >
                    <div className="pt-0.5">
                      {tasks.t3 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <p className={`text-xs font-black ${tasks.t3 ? "line-through text-gray-400" : "text-gray-800"}`}>
                        مكالمة عمل مباشرة لتقييم المخرجات وإثبات الجودة الوفيرة
                      </p>
                    </div>
                  </button>

                </div>

                {/* Sub Action buttons (Screenshot 8) */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => onNavigateToView("booking")}
                    className="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>الجدولة وعمل المواعيد</span>
                  </button>

                  <button 
                    onClick={() => onNavigateToView("chat")}
                    className="flex-1 py-3 bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-md shadow-[#4F46E5]/15"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>مناقشة الوحدة بالدردشة</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Unit 3 card (Locked) */}
            <div className="relative group">
              {/* Dot decoration */}
              <div className="absolute top-1/2 -right-[35px] -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-gray-400">
                <Lock className="w-3 h-3" />
              </div>

              <div className="bg-white border border-gray-200/40 p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-60">
                <div className="space-y-1 flex-1 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {plan.units[2]?.duration || "12 ساعة"}
                    </span>
                    <span className="text-xs font-black text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">الوحدة الثالثة • مغلقة</span>
                  </div>
                  <h3 className="text-lg font-black text-[#141b2b]">{plan.units[2]?.title || "مشروع التخرج التجريبي المتكامل"}</h3>
                  <p className="text-xs text-gray-500 font-semibold">{plan.units[2]?.description || "بناء وتطوير نموذج مستخدم مبني على متطلبات حقيقية لإثبات الإتقان"}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Advice bubble bottom footer (Screenshot 8 bottom tips_and_updates) */}
          <div className="bg-purple-50 border border-purple-100 p-6 rounded-3xl flex gap-3.5 shadow-sm justify-end flex-row-reverse text-right">
            <div className="bg-[#7C3AED]/10 text-[#7C3AED] p-2.5 rounded-xl self-start">
              <span className="material-symbols-outlined text-xl">tips_and_updates</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#7C3AED] mb-1">نصائح وملاحظات الذكاء الاصطناعي للمنهج</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                {plan.advice}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
