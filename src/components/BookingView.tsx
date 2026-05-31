import React, { useState } from "react";
import { Profile } from "../types";
import { 
  Calendar, Clock, Star, Sparkles, ChevronLeft, ChevronRight, 
  ArrowRight, ShieldCheck, HelpCircle, CheckCircle2, Loader2 
} from "lucide-react";

interface BookingViewProps {
  expertProfile: Profile;
  onBack: () => void;
  onBookingSuccess: () => void;
}

export default function BookingView({ expertProfile, onBack, onBookingSuccess }: BookingViewProps) {
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("01:00 م - 02:00 م");
  const [goalText, setGoalText] = useState("أريد مراجعة تمرين هندسة الأوامر المولد والمطابق بالذكاء الاصطناعي مع سارة ومواءمة الأهداف التعليمية المشتركة...");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const timeSlots = [
    "01:00 م - 02:00 م",
    "04:00 م - 05:00 م",
    "07:00 م - 08:00 م"
  ];

  const handleConfirmBooking = async () => {
    setBookingLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId: expertProfile.id,
          expertName: expertProfile.name,
          expertAvatar: expertProfile.avatar,
          expertTitle: expertProfile.title,
          date: `2023-12-${selectedDay < 10 ? "0" + selectedDay : selectedDay}`,
          timeSlot: selectedTimeSlot,
          goal: goalText
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setBookingLoading(false);
        setTimeout(() => {
          onBookingSuccess();
        }, 2200);
      }
    } catch (e) {
      console.error(e);
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 space-y-8 text-right">
      
      {/* Header back navigation */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-150 flex-row-reverse">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لملف الخبير</span>
        </button>

        <h2 className="text-xl font-extrabold text-gray-950 flex items-center gap-1.5">
          <span>حجز جلسة ومطابقة المواعيد</span>
          <Calendar className="w-5 h-5 text-[#4F46E5]" />
        </h2>
      </div>

      {success ? (
        <div className="bg-white border border-gray-100 p-12 rounded-[32px] text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-white animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900">تم حجز الجلسة بنجاح!</h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              لقد تم إرسال وتأكيد الطلب مع الشريك {expertProfile.name}. تمت إضافة الموعد إلى خطتك ومخطط الأنشطة بنجاح.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl inline-flex flex-col items-center min-w-[200px]">
            <span className="text-[10px] font-bold text-gray-400">تاريخ الجلسة المحجوزة</span>
            <span className="text-sm font-black text-gray-900">3 ديسمبر، الساعة {selectedTimeSlot}</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Selectors Left Form - 8 Cols */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Calendar Widget panel (Screenshot 10) */}
            <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-6">
              
              <div className="flex justify-between items-center flex-row-reverse">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-gray-950">ديسمبر 2023</span>
                  <span className="material-symbols-outlined text-gray-500">calendar_today</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
                  <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Symmetrical Grid Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-gray-400 pb-2 border-b border-gray-150 flex-row-reverse">
                <span>جمعة</span>
                <span>خميس</span>
                <span>أربعاء</span>
                <span>ثلاثاء</span>
                <span>اثنين</span>
                <span>أحد</span>
                <span>سبت</span>
              </div>

              {/* Symmetrical Days picker */}
              <div className="grid grid-cols-7 gap-2 flex-row-reverse">
                {/* Gray out offset past days */}
                <div className="text-center p-3 text-xs font-semibold text-gray-300 pointer-events-none">29</div>
                <div className="text-center p-3 text-xs font-semibold text-gray-300 pointer-events-none">30</div>
                
                {days.map((day) => {
                  const isSelected = selectedDay === day;
                  const isPast = day < 3; // Mocking current day is 3
                  
                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => setSelectedDay(day)}
                      className={`text-center p-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/15" 
                          : isPast 
                          ? "text-gray-300 pointer-events-none" 
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Time Slots layout */}
            <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-4 text-right">
              <h3 className="font-extrabold text-sm text-gray-950 flex items-center justify-end gap-1.5">
                <span>اختر التوقيت المتاح والمطابق</span>
                <Clock className="w-4 h-4 text-[#4F46E5]" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-3.5 px-4 text-xs font-bold rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected 
                          ? "border-[#4F46E5] bg-[#4F46E5]/[0.02] text-[#4F46E5] font-black ring-2 ring-[#4F46E5]/15" 
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal Text-area Form (Screenshot 10 text box) */}
            <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-3 text-right">
              <h3 className="font-extrabold text-sm text-gray-950">
                ما هو هدفك الأساسي من هذه الجلسة الاستكشافية؟
              </h3>
              <p className="text-[11px] text-gray-400 font-bold leading-relaxed">
                اكتب بإيجاز أهدافك ليقوم الذكاء الاصطناعي بمواءمتها وتحديث خارطة الطريق تلقائياً بمجرد تأكيد الموعد.
              </p>
              <textarea
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="مثال: مراجعة تمرين هندسة الأوامر مع سارة ومواءمة الأهداف التعليمة..."
                rows={4}
                className="w-full text-xs font-semibold leading-relaxed border border-gray-200 rounded-2xl p-4 focus:ring-4 focus:ring-[#4F46E5]/15 focus:border-[#4F46E5] outline-none bg-gray-50/50 text-right"
              />
            </div>

          </div>

          {/* Sidebar Info Right Panel - 4 Cols */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Selected Mentor details */}
            <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm text-center space-y-4">
              <img 
                src={expertProfile.avatar} 
                alt={expertProfile.name} 
                className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-sm"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-[#141b2b] flex items-center justify-center gap-1">
                  {expertProfile.verified && (
                    <span className="material-symbols-outlined text-[#4F46E5] text-base font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  )}
                  <span>{expertProfile.name}</span>
                </h3>
                <p className="text-xs text-gray-500 font-semibold">{expertProfile.title}</p>
              </div>

              <div className="flex justify-center items-center gap-1 bg-[#7C3AED]/10 text-[#7C3AED] py-1 border border-[#7C3AED]/20 rounded-xl max-w-[140px] mx-auto text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>توافق {expertProfile.compatPercent}%</span>
              </div>
            </div>

            {/* Checkout Pricing Details */}
            <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-4 text-right">
              <h4 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3">تفاصيل التوافق المالي</h4>
              
              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-bold">60 دقيقة</span>
                  <span className="text-gray-400">مدة الجلسة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4F46E5] font-bold">0 نقطة (مجاني تكاملي)</span>
                  <span className="text-gray-400">تكلفة التبادل للجهد</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3 text-sm">
                  <span className="text-emerald-600 font-black">150 نقطة</span>
                  <span className="text-gray-900 font-extrabold">الرصيد الكلي</span>
                </div>
              </div>

              <button 
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
                className="w-full bg-[#4F46E5] text-white py-4 rounded-2xl font-bold text-xs hover:bg-[#4F46E5]/90 cursor-pointer active:scale-95 transition-all shadow-lg shadow-[#4F46E5]/25 flex items-center justify-center gap-2 mt-4"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري جدولة الموعد الأكاديمي...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 fill-white" />
                    <span>تأكيد الموعد والجدولة بالتقويم</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 leading-relaxed font-semibold text-center pt-2">
                بموجب التكامل، لن يتم خصم أي نقاط من محفظتك الفعالة لتوافق الجلسة في المساء.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
