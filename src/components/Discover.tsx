import React, { useState } from "react";
import { Profile } from "../types";
import { Search, MapPin, School, Bolt, CheckSquare, MessageCircle, Sliders, ChevronDown } from "lucide-react";

interface DiscoverProps {
  profiles: Profile[];
  onNavigateToView: (view: string, targetId?: string) => void;
}

export default function Discover({ profiles, onNavigateToView }: DiscoverProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChip, setActiveChip] = useState("الكل");

  const filterChips = [
    { label: "الكل", value: "الكل" },
    { label: "برمجة", value: "برمجة" },
    { label: "تصميم UI/UX", value: "تصميم" },
    { label: "ذكاء اصطناعي", value: "ذكاء" },
    { label: "لغات", value: "لغات" },
    { label: "إدارة مشاريع", value: "إدارة" }
  ];

  // Dynamic filter
  const filteredProfiles = profiles.filter((p) => {
    // Search filter
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.skillsTaught.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.skillsWanted.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    if (activeChip === "الكل") return matchesSearch;
    const matchesCategory = 
      p.skillsTaught.some(s => s.includes(activeChip)) ||
      p.skillsWanted.some(s => s.includes(activeChip)) ||
      p.title.includes(activeChip);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-8 pb-16">
      
      {/* Search & Filter Header (Screenshot 2 Top) */}
      <div className="space-y-4 text-right">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          اكتشف المتعلمين والخبراء
        </h2>
        <p className="text-sm font-semibold text-gray-500">
          ابحث عن الشريك المثالي لرحلتك التعليمية المدعومة بالذكاء الاصطناعي والمطابقات المتبادلة
        </p>

        {/* Dynamic Search Bar implementation */}
        <div className="relative w-full group">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن مهارات، لغات، أو خبراء مكملين..."
            className="w-full bg-white border border-gray-200/90 rounded-2xl py-4 pr-12 pl-32 focus:ring-4 focus:ring-[#4F46E5]/15 focus:border-[#4F46E5] transition-all outline-none text-sm font-medium shadow-sm text-right"
          />
          <div className="absolute inset-y-1.5 left-1.5">
            <button className="bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-xs px-6 h-full rounded-xl transition-all cursor-pointer active:scale-95 text-center">
              بحث ذكي
            </button>
          </div>
        </div>

        {/* Filter Chips Horizontal scroll element */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar items-center justify-end">
          <button className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer shrink-0">
            <Sliders className="w-4 h-4" />
          </button>
          {filterChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setActiveChip(chip.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeChip === chip.value
                  ? "bg-[#4F46E5] text-white shadow-md shadow-[#4F46E5]/15"
                  : "bg-gray-100 hover:bg-gray-200/80 text-gray-600"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((p) => (
          <div 
            key={p.id}
            className={`ai-border-glow bg-white shadow-sm hover:shadow-xl rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div>
              {/* Profile Top Layout */}
              <div className="flex justify-between items-start mb-4">
                {/* Compatibility Percent Box */}
                <div className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 px-3 py-1.5 rounded-2xl flex flex-col items-center min-w-[62px]">
                  <span className="text-[9px] font-bold opacity-80 uppercase leading-none">توافق AI</span>
                  <span className="text-lg font-black">{p.compatPercent}%</span>
                </div>

                <div className="flex gap-3">
                  <div className="text-right">
                    <h3 className="font-extrabold text-base text-gray-950 flex items-center gap-1.5 justify-end">
                      {p.verified && (
                        <span className="material-symbols-outlined text-[#4F46E5] text-[16px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      )}
                      <span>{p.name}</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold">{p.title}</p>
                    
                    {p.country && (
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold pt-1 justify-end">
                        <span>{p.country}</span>
                        <MapPin className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100"
                  />
                </div>
              </div>

              {/* Status Alert Badge */}
              {p.isActiveNow && (
                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-[10px] font-bold border border-emerald-100 mb-4 self-end">
                  <span>نشط الآن</span>
                  <Bolt className="w-3 h-3 fill-emerald-600" />
                </div>
              )}

              {/* Skills section */}
              <div className="space-y-3 mb-6 pt-2 border-t border-gray-100 text-right">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase mb-1">يُعلّم:</p>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {p.skillsTaught.map((skill, index) => (
                      <span key={index} className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase mb-1">يرغب في تعلّم:</p>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {p.skillsWanted.map((skill, index) => (
                      <span key={index} className="bg-indigo-50 text-[#7C3AED] px-2.5 py-1 rounded-lg text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigateToView("matchDetails", p.id)}
                className="flex-1 bg-gray-100 hover:bg-gray-200/80 text-gray-700 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
              >
                الملف الشخصي
              </button>
              
              <button 
                onClick={() => onNavigateToView("chat", p.id)}
                className="w-12 h-12 bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md shadow-[#4F46E5]/15"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (Bento Bottom Layout - Screenshot 2) */}
      {filteredProfiles.length > 0 && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={() => alert("تم عرض كافة المطابقات ذات الكفاءة العلية المناسبة لملفك الشامل بالذكاء الاصطناعي!")}
            className="flex items-center gap-2 bg-white border border-gray-200/60 px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all group font-bold text-xs text-gray-700 cursor-pointer"
          >
            <ChevronDown className="w-4 h-4 text-[#4F46E5] group-hover:translate-y-1 transition-transform" />
            <span>عرض المزيد من النتائج</span>
          </button>
        </div>
      )}

      {filteredProfiles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 space-y-3">
          <span className="material-symbols-outlined text-[64px] text-gray-300">hourglass_empty</span>
          <h3 className="text-lg font-bold text-gray-700">لم يتم العثور على خبير متوافق</h3>
          <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">حاول تعديل شريط البحث أو اختيار مهارة أخرى للتوصيات بالذكاء الاصطناعي.</p>
        </div>
      )}

    </div>
  );
}
