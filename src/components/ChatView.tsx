import React, { useState, useEffect, useRef } from "react";
import { Profile, ChatSession, MessageLine } from "../types";
import { 
  Send, Phone, Info, Paperclip, Download, ChevronLeft, 
  Sparkles, BookOpen, Clock, CheckCircle2, ArrowRight, CornerDownLeft, Loader2
} from "lucide-react";

interface ChatViewProps {
  partnerProfile: Profile;
  onBack: () => void;
  onNavigateToView: (view: string) => void;
}

export default function ChatView({ partnerProfile, onBack, onNavigateToView }: ChatViewProps) {
  const [messages, setMessages] = useState<MessageLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize conversations
  useEffect(() => {
    // Standard conversation according to screenshot 9
    setMessages([
      {
        id: "m1",
        sender: "partner",
        text: `مرحباً! لقد قمت بمراجعة خطة التعلم المقترحة من قبل الذكاء الاصطناعي. هل أنت مستعد للبدء في وحدة "هندسة الأوامر" (Prompt Engineering) اليوم؟`,
        time: "09:41 ص",
        status: "read"
      },
      {
        id: "m2",
        sender: "user",
        text: "أهلاً. نعم، تبدو الخطة رائعة جداً للتطبيق. لقد انتهيت للتو من المراجعة التمهيدية للمصطلحات الأساسية. هل ننتقل للتطبيق الفعلي؟",
        time: "09:43 ص",
        status: "read"
      },
      {
        id: "m3",
        sender: "partner",
        text: `بالتأكيد! لتأسيس التفاهم المشترك، إليك تمرين هندسة الأوامر التدريبي. حاوِل العمل عليه وسنناقشه بالجلسة المخصصة القادمة.`,
        time: "09:45 ص",
        status: "read",
        attachment: {
          name: "قالب_تمرين_المطالب_الذكي.pdf",
          size: "1.2 ميجابايت",
          type: "PDF"
        }
      }
    ]);
  }, [partnerProfile]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    const userMsg: MessageLine = {
      id: "u_" + Date.now(),
      sender: "user",
      text: inputVal,
      time: "الآن",
      status: "sent"
    };

    setMessages(prev => [...prev, userMsg]);
    const originalText = inputVal;
    setInputVal("");
    setTyping(true);

    // Call server API for real/simulated Gemini chat response
    try {
      const response = await fetch("/api/ai/chat-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          partnerId: partnerProfile.id
        })
      });
      const data = await response.json();
      
      setTyping(false);
      setMessages(prev => [...prev, {
        id: "p_" + Date.now(),
        sender: "partner",
        text: data.response,
        time: "الآن",
        status: "read"
      }]);
    } catch (e) {
      console.error(e);
      setTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 h-[80vh] flex flex-col justify-between bg-white border border-gray-200/60 rounded-[32px] overflow-hidden shadow-sm relative text-right">
      
      {/* Top Session Header Navigation (Screenshot 9) */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex-row-reverse">
        <div className="flex items-center gap-3 flex-row-reverse">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-200 text-gray-500 rounded-xl cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <img 
            src={partnerProfile.avatar} 
            alt={partnerProfile.name} 
            className="w-10 h-10 rounded-xl object-cover shadow-sm"
          />
          <div className="text-right">
            <h3 className="font-extrabold text-sm text-gray-950 flex items-center gap-1 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{partnerProfile.name}</span>
            </h3>
            <p className="text-[11px] text-gray-400 font-bold">{partnerProfile.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigateToView("booking")} 
            className="p-2 text-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-xl cursor-pointer"
            title="جدول المواعيد"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[#fbfcff]">
        
        {/* Dynamic Shared Learning Plan Card Widget at the very top (Screenshot 9 list item) */}
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white p-6 rounded-3xl space-y-4 max-w-2xl mx-auto md:mr-0 text-right shadow-lg shadow-[#4F46E5]/10">
          <div className="flex justify-between items-start flex-row-reverse">
            <div className="space-y-1 text-right">
              <span className="text-[10px] font-black tracking-widest bg-white/20 px-2.5 py-1 rounded-full uppercase">خطة تعلم ذكية مخصصة</span>
              <h4 className="font-black text-base text-white pt-1">
                منهج هندسة الأوامر (Prompt Engineering) التكاملي
              </h4>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
          </div>
          
          <p className="text-xs opacity-85 leading-relaxed font-bold">
            أنصحك بالتركيز الكامل على كتابة بضعة تدريبات عملية وتجربتها مع الشريك. الساعات المتتالية ستثبت مهاراتك بشكل احترافي رائع.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 justify-end">
            <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold">Few-Shot Prompting</span>
            <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold">Chain-of-Thought</span>
            <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold">إتقان 65%</span>
          </div>

          <button 
            onClick={() => onNavigateToView("learningPlan")}
            className="w-full bg-white text-[#4F46E5] hover:bg-white/90 py-3 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-sm text-center"
          >
            عرض الخطة التعليمية والتفاصيل الكاملة
          </button>
        </div>

        {/* Message Bubble Feed */}
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div 
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2 flex-row-reverse`}
            >
              {!isUser && (
                <img 
                  src={partnerProfile.avatar} 
                  alt={partnerProfile.name} 
                  className="w-8 h-8 rounded-lg object-cover shadow-sm pointer-events-none"
                />
              )}

              <div className="max-w-[70%] space-y-1.5 text-right">
                <div className={`p-4 rounded-3xl text-right ${
                  isUser 
                    ? "bg-[#4F46E5] text-white rounded-bl-none" 
                    : "bg-gray-100 text-[#141b2b] rounded-br-none"
                }`}>
                  <p className="text-xs md:text-sm font-semibold leading-relaxed whitespace-pre-wrap">
                    {m.text}
                  </p>

                  {/* Optional File Attachment widget inside message (Screenshot 9) */}
                  {m.attachment && (
                    <div className="mt-3 bg-white/15 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-white/20 flex-row-reverse">
                      <div className="flex items-center gap-2.5 flex-row-reverse">
                        <div className="bg-red-500/20 text-red-100 p-2 rounded-xl">
                          <span className="material-symbols-outlined text-sm font-bold">picture_as_pdf</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white leading-tight truncate max-w-[130px]" title={m.attachment.name}>{m.attachment.name}</p>
                          <p className="text-[10px] text-white/70 font-semibold">{m.attachment.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert(`بدء تحميل دونه من المزامنة: ${m.attachment?.name}`)}
                        className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 justify-end px-2 text-[10px] text-gray-400 font-bold">
                  <span>{m.time}</span>
                  {isUser && (
                    <span className="material-symbols-outlined text-[12px] text-blue-500">done_all</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing simulator indicator */}
        {typing && (
          <div className="flex justify-start items-center gap-2 flex-row-reverse">
            <img 
              src={partnerProfile.avatar} 
              alt="avatar" 
              className="w-8 h-8 rounded-lg object-cover shadow-sm"
            />
            <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl rounded-br-none flex items-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin text-[#4F46E5]" />
              <span className="text-xs font-semibold">تكتب الآن...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
        <button className="p-2 hover:bg-gray-200 text-gray-500 rounded-xl transition-all cursor-pointer">
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Input box */}
        <input 
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="اكتب رساله ذكية، أو شارك تقدماً..."
          className="flex-1 bg-white border border-gray-200 text-sm font-medium rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] text-right"
        />

        <button 
          onClick={handleSend}
          disabled={!inputVal.trim()}
          className={`p-3.5 rounded-2xl font-bold flex items-center justify-center transition-all ${
            inputVal.trim() 
              ? "bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white cursor-pointer hover:scale-105 active:scale-95" 
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5 rotate-180" />
        </button>
      </div>

    </div>
  );
}
