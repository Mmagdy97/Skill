import React, { useState, useEffect } from "react";
import { Profile, LearningPlan } from "./types";
import Onboarding from "./components/Onboarding";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";
import Discover from "./components/Discover";
import MatchDetails from "./components/MatchDetails";
import ChatView from "./components/ChatView";
import LearningPlanView from "./components/LearningPlanView";
import BookingView from "./components/BookingView";
import ProfileView from "./components/ProfileView";

import { 
  Sparkles, Home, Search, BookOpen, MessageSquare, User, 
  MapPin, Bell, Globe, Compass, Cpu, HelpCircle, Loader2, ArrowLeft
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("onboarding");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("p2"); // Defaults to Sarah Ahmed
  const [userSelection, setUserSelection] = useState({
    skill: "تصميم واجهة المستخدم (UI/UX)",
    level: "متوسط"
  });

  const [activePlan, setActivePlan] = useState<LearningPlan>({
    id: "plan1",
    expertName: "سارة أحمد",
    skills: ["Prompt Engineering", "Few-shot Prompting", "كتابة الأوامر"],
    units: [
      {
        id: "u1",
        title: "أساسيات صياغة الأوامر (Core Basics)",
        description: "مقدمة شاملة تمكنك من فهم المكونات الأساسية لبدء الموائم العملي لهندسة الأوامر الذكية.",
        duration: "4 ساعات",
        status: "completed",
        percent: 100
      },
      {
        id: "u2",
        title: "التعمق الاستراتيجي وكتابة الأقسام والـ Few-Shot",
        description: "تطبيق وتكوينات دقيقة ومفاهيم مكملة تمكنك من جني أقصى فعالية بدمج النماذج اللغوية.",
        duration: "8 ساعات",
        status: "in_progress",
        percent: 65
      },
      {
        id: "u3",
        title: "مشروع التخرج التجريبي المتكامل",
        description: "تطوير وبناء مشروع مستخدم حقيقي يدمج مخرجات الخطوات السابقة كلياً لإثبات الإتقان الوفير.",
        duration: "12 ساعة",
        status: "locked",
        percent: 0
      }
    ],
    advice: "الممارسة المقارنة والتبادل الميداني مع الشريك يرسخ 85% من المعرفة مقارنة بالقراءة الفردية المتقطعة."
  });

  const [loadingPlan, setLoadingPlan] = useState<boolean>(false);

  // Fetch profiles on startup
  useEffect(() => {
    fetch("/api/profiles")
      .then(res => res.json())
      .then(data => {
        if (data.profiles && data.profiles.length > 0) {
          setProfiles(data.profiles);
          // Auto choose first profile to keep it safe
          setSelectedProfileId(data.profiles[0].id);
        }
      })
      .catch(e => console.error("Error fetching initial matchmaking profiles from server", e));
  }, []);

  const handleAssessmentComplete = (skill: string, level: string) => {
    setUserSelection({ skill, level });
    setCurrentView("dashboard");
  };

  const handleNavigateToView = (view: string, targetId?: string) => {
    if (targetId) {
      setSelectedProfileId(targetId);
    }
    setCurrentView(view);
  };

  // Generate dynamic AI Roadmap using our Express endpoint!
  const handleAIGeneration = async (goal: string) => {
    setLoadingPlan(true);
    try {
      const response = await fetch("/api/ai/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalSkill: goal })
      });
      const data = await response.json();
      
      setActivePlan({
        id: "plan_" + Date.now(),
        expertName: data.expertName || "سارة أحمد",
        skills: data.skills || [goal, "التطبيقات الذكية"],
        units: data.units || [],
        advice: data.advice || ""
      });
      setLoadingPlan(false);
    } catch (e) {
      console.error(e);
      setLoadingPlan(false);
    }
  };

  // Find currently selected profile
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0] || {
    id: "p2",
    name: "سارة أحمد",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq2Y2MFAsWfDWVqPJ6I0ueaGYNvQ4dKLDw5_khK7thjByiQY9qpu1-R-VoJsAmBVwhGiU75aVN4jNsu0qXP4Umn7kJDdMzOSFzcy49X_7C22vS1acmRrfvXhYRjjMjfkny7VRfJ_5UeMMJllju8-9Tgn36PAWChx1UGv8epiPCOqEjouz-jJHRbLPcE34muYWCyVgmLp4kArNmAU87BIz8D_OihFiVqojmSMq-YQv83hSY-RAgW_ymTrtl5MspetNf8DcXMU0kakhP",
    title: "خبير هندسة برمجيات",
    verified: true,
    compatPercent: 98,
    matchTags: ["مهارات مكملة", "متاح في المساء"],
    schedule: "مواعيد المساء",
    learningStyle: "التعلم القائم على المشاريع",
    bio: "خبير معتمد",
    skillsTaught: ["هندسة البرمجيات"],
    skillsWanted: ["UI/UX design"],
    mentorshipHours: 450,
    ratingValue: 4.9,
    ratingCount: 120,
    publishedResearch: 15,
    country: "الإمارات",
    joinDate: "مارس 2023"
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans select-none pb-24 antialiased">
      
      {/* Dynamic View Routing Render block */}
      {currentView === "onboarding" ? (
        <Onboarding 
          onComplete={() => setCurrentView("assessment")} 
          onSkipToDashboard={() => setCurrentView("dashboard")}
        />
      ) : currentView === "assessment" ? (
        <Assessment 
          onBack={() => setCurrentView("onboarding")}
          onComplete={handleAssessmentComplete}
        />
      ) : (
        <>
          {/* Main Global Top Header (Screenshot 5 context standard - High Density Card Styled) */}
          <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-40 px-6 py-4 max-w-7xl w-full mx-auto flex items-center justify-between rounded-b-3xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl font-bold">auto_awesome</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                SkillSync <span className="text-[#4F46E5]">AI</span>
              </h1>
              <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase leading-none">نشط فوري</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 font-bold bg-white border border-gray-150 py-1.5 px-3 rounded-full shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>محفظتك: 128 نقطة متبادلة</span>
              </div>
              <button className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 rounded-full cursor-pointer relative shadow-sm">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
            </div>
          </header>

          <main className="flex-1 pt-6">
            {currentView === "dashboard" && (
              <Dashboard 
                onNavigateToView={handleNavigateToView}
                profiles={profiles}
                userSelection={userSelection}
                onStartAIGeneration={handleAIGeneration}
              />
            )}

            {currentView === "discover" && (
              <Discover 
                profiles={profiles}
                onNavigateToView={handleNavigateToView}
              />
            )}

            {currentView === "matchDetails" && (
              <MatchDetails 
                profile={selectedProfile as Profile}
                onBack={() => setCurrentView("discover")}
                onNavigateToView={handleNavigateToView}
              />
            )}

            {currentView === "chat" && (
              <ChatView 
                partnerProfile={selectedProfile as Profile}
                onBack={() => setCurrentView("discover")}
                onNavigateToView={handleNavigateToView}
              />
            )}

            {currentView === "learningPlan" && (
              <LearningPlanView 
                plan={activePlan}
                onNavigateToView={setCurrentView}
                onRegenerate={() => handleAIGeneration(userSelection.skill)}
                loading={loadingPlan}
              />
            )}

            {currentView === "booking" && (
              <BookingView 
                expertProfile={selectedProfile as Profile}
                onBack={() => setCurrentView("matchDetails")}
                onBookingSuccess={() => setCurrentView("dashboard")}
              />
            )}

            {currentView === "profile" && (
              <ProfileView 
                userSelection={userSelection}
              />
            )}
          </main>

          {/* Sticky Responsive Bottom Navigation Bar (Visual SaaS Style) */}
          <nav className="fixed bottom-6 inset-x-4 md:max-w-2xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200/80 p-2.5 z-50 flex items-center justify-around">
            
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 px-2.5 transition-all cursor-pointer rounded-2xl ${
                currentView === "dashboard"
                  ? "text-[#4F46E5] bg-indigo-50/60 font-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-black leading-none">الرئيسية</span>
            </button>

            <button
              onClick={() => setCurrentView("discover")}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 px-2.5 transition-all cursor-pointer rounded-2xl ${
                currentView === "discover" || currentView === "matchDetails" || currentView === "booking"
                  ? "text-[#4F46E5] bg-indigo-50/60 font-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-[10px] font-black leading-none">اكتشف</span>
            </button>

            <button
              onClick={() => setCurrentView("learningPlan")}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 px-2.5 transition-all cursor-pointer rounded-2xl ${
                currentView === "learningPlan"
                  ? "text-[#4F46E5] bg-indigo-50/60 font-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-black leading-none">الخطة الذكية</span>
            </button>

            <button
              onClick={() => setCurrentView("chat")}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 px-2.5 transition-all cursor-pointer rounded-2xl ${
                currentView === "chat"
                  ? "text-[#4F46E5] bg-indigo-50/60 font-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[10px] font-black leading-none">الدردشة</span>
            </button>

            <button
              onClick={() => setCurrentView("profile")}
              className={`flex flex-col items-center gap-1.5 flex-1 py-1 px-2.5 transition-all cursor-pointer rounded-2xl ${
                currentView === "profile"
                  ? "text-[#4F46E5] bg-indigo-50/60 font-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-black leading-none font-sans">حسابي</span>
            </button>

          </nav>
        </>
      )}

    </div>
  );
}
