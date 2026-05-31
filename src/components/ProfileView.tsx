import React, { useState } from "react";
import { Profile } from "../types";
import { 
  User, ShieldCheck, Mail, Globe, MapPin, Award, BookOpen, 
  Settings, CheckSquare, PlusCircle, LogOut 
} from "lucide-react";

interface ProfileViewProps {
  userSelection: { skill: string; level: string };
}

export default function ProfileView({ userSelection }: ProfileViewProps) {
  const [userProfile, setUserProfile] = useState({
    name: "أليكس ريفرز",
    title: "مطور واجهات المستخدم ومتحمس للذكاء الاصطناعي",
    email: "alex.rivers@skillsync.ai",
    country: "القاهرة، مصر",
    points: 128,
    hoursLearned: 32,
    level: 4,
    skills: ["Figma Design", "React.js", "Javascript", "CSS Grid", "Tailwind CSS"],
    languages: ["العربية (الأم)", "الانجليزية (طلاقة)"]
  });

  const [newSkill, setNewSkill ] = useState("");

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setUserProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16 space-y-8 text-right">
      
      {/* Covered Header */}
      <div className="relative h-48 bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] rounded-[32px] overflow-hidden shadow-sm flex items-end p-6 justify-end">
        <div className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 p-2 text-white rounded-xl cursor-pointer">
          <Settings className="w-5 h-5" />
        </div>

        <div className="flex gap-4 items-center z-10 text-white flex-row-reverse">
          <div className="w-20 h-20 bg-white rounded-2xl p-1 flex items-center justify-center shadow-md relative">
            <span className="material-symbols-outlined text-[64px] text-[#4F46E5]">face</span>
            <span className="absolute bottom-1 left-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black">{userProfile.name}</h2>
            <p className="text-xs opacity-90 font-medium">{userProfile.title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
        
        {/* Left/Right Main statistics details - 8 Cols */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Certificates & Achievements list */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-gray-950 flex items-center gap-2 justify-end">
              <span>الشهادات والأوسمة الموثقة</span>
              <Award className="w-5 h-5 text-[#4F46E5]" />
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <span className="material-symbols-outlined text-amber-500 text-3xl font-bold">workspace_premium</span>
                  <div className="text-right">
                    <h4 className="text-xs font-black text-gray-950">شهادة أساسيات هندسة الأوامر (AI Prompting)</h4>
                    <span className="text-[10px] text-gray-400 font-bold block">ممنوحة بواسطة جامعة سكيل سينك الأكاديمية • 2023</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">
                  تكامل تام
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3 flex-row-reverse">
                  <span className="material-symbols-outlined text-blue-500 text-3xl font-bold">verified</span>
                  <div className="text-right">
                    <h4 className="text-xs font-black text-gray-950">شهادة تصميم تجربة ومطابقة المواجهات البرمجية</h4>
                    <span className="text-[10px] text-gray-400 font-bold block">ممنوحة بواسطة Google AI Developer • 2024</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">
                  موثقة وسحابية
                </span>
              </div>
            </div>
          </div>

          {/* User Skills list management */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2 justify-end">
              <span>المهارات الفعالة بملف التبادل</span>
              <CheckSquare className="w-5 h-5 text-[#4F46E5]" />
            </h3>

            <div className="flex flex-wrap gap-2 justify-end">
              {userProfile.skills.map((skill, idx) => (
                <span key={idx} className="bg-indigo-50 text-[#4F46E5] px-3.5 py-1.5 rounded-xl text-xs font-bold border border-indigo-100">
                  {skill}
                </span>
              ))}
            </div>

            {/* Add new skill inline */}
            <div className="flex gap-2 pt-2">
              <input 
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="أضف مهارة جديدة..."
                className="flex-1 text-xs border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/15 text-right"
              />
              <button 
                onClick={handleAddSkill}
                className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 px-4 rounded-xl text-xs font-bold cursor-pointer transition-colors active:scale-95 flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>أضف</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar credentials - 4 Cols */}
        <div className="md:col-span-4 space-y-6">
          
          {/* User credentials list metadata */}
          <div className="bg-white border border-gray-200/60 p-6 rounded-[28px] shadow-sm space-y-4 text-xs font-semibold">
            <h4 className="font-extrabold text-sm text-gray-950 border-b border-gray-100 pb-3">المعلومات الأساسية</h4>
            
            <div className="space-y-4 text-right">
              <div className="flex items-center gap-2 text-gray-600 justify-end">
                <span className="truncate">{userProfile.email}</span>
                <Mail className="w-4 h-4 text-[#4F46E5]" />
              </div>

              <div className="flex items-center gap-2 text-gray-600 justify-end">
                <span>{userProfile.country}</span>
                <MapPin className="w-4 h-4 text-[#4F46E5]" />
              </div>

              <div className="flex items-center gap-2 text-gray-600 justify-end">
                <span>اللغات: {userProfile.languages.join(" ، ")}</span>
                <Globe className="w-4 h-4 text-[#4F46E5]" />
              </div>
            </div>
          </div>

          {/* Points summary details (Screenshot 5 top-right layout style) */}
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white p-6 rounded-[28px] shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="space-y-3 relative z-10 text-right">
              <span className="text-[9px] font-black uppercase bg-white/20 px-2.5 py-1 rounded-full">محفظتك الفعالة</span>
              <div className="text-4xl font-black">128 نقطة</div>
              <p className="text-[10px] opacity-90 font-semibold leading-relaxed">
                اكتسبت المزيج من تبادل المهارات التكاملي ومساعدة الأعضاء.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
