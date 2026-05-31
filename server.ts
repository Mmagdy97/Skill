import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize GenAI safely so it doesn't crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// In-memory sessions
let sessionsMockData = [
  {
    id: "s1",
    partnerId: "p1",
    partnerName: "أليكس ريفرز",
    partnerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn6QT6od9EO2wGFvBoUx6K6haB4kQf8mDBs2gm2ZLiBahJLltyWFPXyv9WaZoHZcFGvakRlwgmJQeLM4grOkqUl82uv3VMnDiAhhLd8u-W3vPg5i6jCGFGr3MCJAIMPFnOqI70a9GiQ7CmjrKyd7s5MdSC4-5VnPL6pLDinBgxLOGl8aqsv_cq7gj_CJcpiPL4o0NKTqXeeMnJckW90xA0QUi9BjnLfzkkGTnyVejK-gnp6F8PC0kf6oH3jPLO1rcm3A3X4E1mj3lM",
    online: true,
    messages: [
      {
        id: "m1",
        sender: "partner",
        text: "مرحباً! لقد قمت بمراجعة خطة التعلم المقترحة من قبل الذكاء الاصطناعي. هل أنت مستعد للبدء في وحدة \"هندسة الأوامر\" (Prompt Engineering) اليوم؟",
        time: "09:41 ص",
        status: "read"
      },
      {
        id: "m2",
        sender: "user",
        text: "أهلاً أليكس. نعم، تبدو الخطة رائعة. لقد انتهيت للتو من القراءات التمهيدية. هل يمكننا البدء بالتطبيق العملي مباشرة؟",
        time: "09:43 ص",
        status: "read"
      },
      {
        id: "m3",
        sender: "partner",
        text: "بالتأكيد. إليك أول تدريب عملي. حاوِل تحسين هذا النص البرمجي باستخدام أسلوب Few-shot prompting.",
        time: "09:45 ص",
        status: "read",
        attachment: {
          name: "تمرين_الذكاء_الاصطناعي.pdf",
          size: "1.2 ميجابايت",
          type: "PDF"
        }
      }
    ]
  }
];

let bookingsMockData = [
  {
    id: "b1",
    expertId: "p2",
    expertName: "سارة أحمد",
    expertAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq2Y2MFAsWfDWVqPJ6I0ueaGYNvQ4dKLDw5_khK7thjByiQY9qpu1-R-VoJsAmBVwhGiU75aVN4jNsu0qXP4Umn7kJDdMzOSFzcy49X_7C22vS1acmRrfvXhYRjjMjfkny7VRfJ_5UeMMJllju8-9Tgn36PAWChx1UGv8epiPCOqEjouz-jJHRbLPcE34muYWCyVgmLp4kArNmAU87BIz8D_OihFiVqojmSMq-YQv83hSY-RAgW_ymTrtl5MspetNf8DcXMU0kakhP",
    expertTitle: "كبيرة مهندسي البرمجيات",
    date: "2023-12-03",
    timeSlot: "01:00 م - 02:00 م",
    durationMin: 60,
    costPoints: 150,
    goal: "أريد إتقان أساسيات React Hooks وتطبيقها في مشروع عملي...",
    status: "confirmed"
  }
];

// Mock database profile matches with real details matching images and user text input request.
const PROFILES = [
  {
    id: "p2",
    name: "سارة أحمد",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq2Y2MFAsWfDWVqPJ6I0ueaGYNvQ4dKLDw5_khK7thjByiQY9qpu1-R-VoJsAmBVwhGiU75aVN4jNsu0qXP4Umn7kJDdMzOSFzcy49X_7C22vS1acmRrfvXhYRjjMjfkny7VRfJ_5UeMMJllju8-9Tgn36PAWChx1UGv8epiPCOqEjouz-jJHRbLPcE34muYWCyVgmLp4kArNmAU87BIz8D_OihFiVqojmSMq-YQv83hSY-RAgW_ymTrtl5MspetNf8DcXMU0kakhP",
    title: "خبير هندسة البرمجيات",
    verified: true,
    compatPercent: 98,
    matchTags: ["مهارات مكملة لبعضها", "متاح في المساء", "شغف مشترك بـ AI"],
    schedule: "تتوفر نافذة زمنية مشتركة يومياً بين الساعة 6 و 9 مساءً بتوقيتك.",
    learningStyle: "سارة تفضل التعلم القائم على المشاريع، وهو ما يتوافق مع نمطك العملي.",
    bio: "شغوفة بنقل الخبرات التقنية وتطوير المواعد الناشئة. أركز بشكل خاص على هندسة البيانات والذكاء الاصطناعي التوليدي. ساعدت أكثر من 50 متدرباً في الوصول إلى مراكز قيادية في كبرى الشركات التقنية.",
    skillsTaught: ["هندسة البرمجيات", "الذكاء الاصطناعي", "قيادة الفرق"],
    skillsWanted: ["Python", "Cloud Architect"],
    mentorshipHours: 450,
    ratingValue: 4.9,
    ratingCount: 120,
    publishedResearch: 15,
    country: "دبي، الإمارات",
    joinDate: "مارس 2023",
    isActiveNow: true
  },
  {
    id: "p3",
    name: "سارة العامري",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIqCNHB1Bb7-UpAW3wEdbkrstcpIHN2tNkRa68LPzUoG0YZSQPeHWzAcgpT0tS2zb4-pgOZJUU7pliKMaSgVB6NRttZuO-bFrQMqeOYkCl9qxcxD4ARa3239pwI0EVcAClhI_4QHkowvimHJsdX_sccgsmAolwMQXa2t-46uC46jw-lMD8q3_PGoG4UDK8oZ5uItIsh23scpHrQPXQ7hSqUq8Mr3edVvQKQg6jP14pG1ufeB623jG66IrX6K_UyEYRoZXtyZoRwJyC",
    title: "خبير معتمد",
    verified: true,
    compatPercent: 98,
    matchTags: ["برمجة", "تطبيقات جوال", "منهجية Agile"],
    schedule: "متاحة في فترات الصباح والمساء المبكر.",
    learningStyle: "تفضل الشرح النظري المتبوع بتدريبات مكثفة.",
    bio: "أعمل على هندسة التطبيقات الحديثة باستخدام React Native و iOS. أبحث عن تبادل معرفي لتطوير مهاراتي في الذكاء الاصطناعي وهندسة البيانات.",
    skillsTaught: ["React Native", "Typescript", "iOS Development"],
    skillsWanted: ["Machine Learning", "Python"],
    mentorshipHours: 320,
    ratingValue: 4.8,
    ratingCount: 94,
    publishedResearch: 4,
    country: "أبوظبي، الإمارات",
    joinDate: "يونيو 2023",
    isActiveNow: true
  },
  {
    id: "p4",
    name: "عمر خالد",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKiqZd7kyOA3ZW4T2QBjUYGkgN4FrUxxP49ZgB62M1Pai5ffSI3lF-uPHGMkKXVcThfrWfEz_RDtGnWfIDonEU0MiguvxSWGXEyZUZJWm7IIiwqzISqkVXFJOY_0EInl8Su6_8EAXKiECtvgqyjnZpHmK2uIZJRnr3VJUzda9UD0yxNnUX0DwBMnVV4xSm7JuOgpXnjk94hwIjFV9ozYMJImPiZo5hSD1KaWf_dUnPAPjQK4AdKp5cEe1-dMCMN1cJbwHPNl9PSYG8",
    title: "مصمم منتجات أول",
    verified: false,
    compatPercent: 85,
    matchTags: ["تصميم واجهات", "Figma AI", "أبحاث تجربة المستخدم"],
    schedule: "متاح خلال أيام عطلة نهاية الأسبوع.",
    learningStyle: "التعلم التفاعلي عن طريق مكالمات مباشرة ومراجعة الملفات.",
    bio: "مصمم منتجات أول شغوف بإنشاء أنظمة تصميم متطورة واختبار تجربة المستخدم. أبحث عن تعلم أساسيات بايثون وعلوم البيانات للتصميم التوليدي.",
    skillsTaught: ["Figma AI", "User Research", "Interaction Design"],
    skillsWanted: ["Python", "Machine Learning"],
    mentorshipHours: 190,
    ratingValue: 4.7,
    ratingCount: 52,
    publishedResearch: 2,
    country: "الرياض، السعودية",
    joinDate: "يناير 2024",
    isActiveNow: true
  },
  {
    id: "p5",
    name: "ليلى حسن",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAne5cHHXCk9hONwJLhnem6IcG-EPzM_8tPZPmv0j6zBKIjV-Os3h__M1C0aUYZhlNaI2-kdBjT0avihEOeN2lLRvrwdNUbeOf8kWJAnNOSHky7pkjlv3M8xCEkdkqbq8ohILrBPOCbYmVwrqQiFEhXmaXHg-Ub35pjUCRw8CE6cYvBqNz6cd10boYqvbcbUYNKQCc4x2wDyrNnNsMkvuoidVW5yNBMUAryuqNK9i7htQXRUfl6pt9_L847h3fQUVIE2SEg-UO6UbPY",
    title: "مستشارة قيادة تكنولوجية",
    verified: true,
    compatPercent: 92,
    matchTags: ["إدارة فرق", "التخطيط الاستراتيجي", "إدارة المنتجات"],
    schedule: "متاحة مساءً أيام الاثنين والأربعاء والجمعة.",
    learningStyle: "تفضل التوجيه الاستراتيجي ودراسة الحالات الإدارية كأدوات تعلم أساسية.",
    bio: "مهتمة بتطوير المهارات القيادية وتطبيقات الذكاء الاصطناعي في إدارة الأعمال والمنظمات التقنية الناشئة.",
    skillsTaught: ["القيادة", "Strategic Planning", "Project Management"],
    skillsWanted: ["AI Integration", "Prompt Engineering"],
    mentorshipHours: 620,
    ratingValue: 4.9,
    ratingCount: 154,
    publishedResearch: 12,
    country: "دبي، الإمارات",
    joinDate: "نوفمبر 2022",
    isActiveNow: false
  },
  {
    id: "p6",
    name: "أحمد يوسف",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoFwFgSl-PfPP8Te433x63VyRGdcgy37ArTruVr452ahPWmiZjutmHeXFrX4dAAa7x4iERClwgyxz7_4aBM5o5MMOCuW3qRGVppZ1D57yKahJJwwF1DXGjxy9Ocxj8i4v1TsrSOKrwgZKXfFeJb9zJjzBzmZBycbpqzrfvRya9b_1bZjKqd_IhBE10IuVEdMjv5pxat_WBCEXml-guEyxth4Pt8hpdzlLVnUt-fVKJxp8Za6PJ24ZnGHZx5BVcztayTtwogvjKGAGy",
    title: "مطور Full-stack",
    verified: false,
    compatPercent: 88,
    matchTags: ["تطوير ويب", "AWS سحابي", "بيئات Node.js"],
    schedule: "متاح طوال اليوم تقريباً للتنسيق القير المباشر.",
    learningStyle: "تفضل المراجعات السريعة والحلول البرمجية العملية.",
    bio: "أنا مطور متكامل محترف في تطوير الويب والأنظمة السحابية. أريد تطوير معرفتي في هندسة الأوامر (Prompt Engineering) لدمجها بمشاريعي القادمة.",
    skillsTaught: ["Node.js", "AWS Cloud", "Full-stack Web Development"],
    skillsWanted: ["Prompt Engineering", "Figma Design"],
    mentorshipHours: 110,
    ratingValue: 4.6,
    ratingCount: 38,
    publishedResearch: 1,
    country: "القاهرة، مصر",
    joinDate: "فبراير 2024",
    isActiveNow: false,
    label: "جديد"
  },
  {
    id: "p7",
    name: "نورة العتيبي",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt1su_nm93_t8gGjbAW1GfZe6SjGT7OKtTMhWSpHkYUbW9UbesUKbkGZX7Dv6MiU5_K3Lzeg4nH8qWQ947goxFtiDfYAI1-YNEjx_Zr4X8eQHBfCVbywAp76Cu-O_k1PbgykV80GnJxEZkQVP2T2nT8rTHgmA8lGKJuDq9tHngGAxMgn0Cx53_9pWg0bBffeBLySqgd3X5ZBOnbNDo2OwmGGyBvFHFrX_SL5JvU_dZTClU-TF5ZGXBxK7nhavBaTVcgpgcVLIwASFZ",
    title: "كبيرة خبراء أبحاث بيانات",
    verified: true,
    compatPercent: 91,
    matchTags: ["قواعد بيانات SQL", "تحليل وتصوير البيانات PowerBI", "تنقيب البيانات"],
    schedule: "متاحة يومياً بعد الظهر.",
    learningStyle: "التركيز الكامل على التمارين التطبيقية المعقدة (Deep Dive).",
    bio: "أبحث عن شخص نتبادل معه مهارات تحليل البيانات وتصويرها باستخدام SQL و Power BI، مقابل تعلم أساسيات التسويق الرقمي وبناء الاستراتيجيات الإعلانية.",
    skillsTaught: ["SQL Database", "Power BI", "Data Mining"],
    skillsWanted: ["Digital Marketing", "SEO"],
    mentorshipHours: 280,
    ratingValue: 4.8,
    ratingCount: 75,
    publishedResearch: 8,
    country: "جدة، السعودية",
    joinDate: "أغسطس 2023",
    isActiveNow: false
  }
];

// Profile list endpoint
app.get("/api/profiles", (req, res) => {
  res.json({ profiles: PROFILES });
});

// Mock/Real AI assessment continuous evaluation advice
app.post("/api/ai/onboarding-advice", async (req, res) => {
  const { currentSkill, chosenLevel } = req.body;
  const systemPrompt = `أنت مرشد أكاديمي ومستشار مهني ذكي في منصة SkillSync AI لتبادل المهارات والتعلم. 
المستخدم يقوم بإعداد ملفه وذكر مستواه الحالي كـ (${chosenLevel}) في مهارة (${currentSkill}).
قدّم نصيحة ذكية وجذابة باللغة العربية بأسلوب SaaS ذكي وحديث (بحدود سطرين أو ثلاثة فقط)، توضح له أين يبدأ بالتحديد وكيف يمكن لمنصة SkillSync مساعدته في المطابقة مع الخبراء. 
اجعل الرد مشجعاً ومهنياً للغاية.`;

  const client = getGenAI();
  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `currentSkill: ${currentSkill}, chosenLevel: ${chosenLevel}`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });
      return res.json({ advice: response.text?.trim() });
    } catch (e: any) {
      console.error("Gemini on-boarding advice fails, fallback to custom message", e);
    }
  }

  // Fallback if AI not set up/fails
  res.json({
    advice: `بناءً على اهتماماتك ومستواك الحالي كـ (${chosenLevel}) في (${currentSkill})، نقترح البدء فوراً بإنشاء مشروع تبادلي تظبيطي مع خبير في مهارة مكملة مثل تصميم UI/UX للبدء بالتطبيق العملي السليم.`
  });
});

// Mock/Real AI generated chat responder
app.post("/api/ai/chat-response", async (req, res) => {
  const { messages, partnerId } = req.body;
  const partner = PROFILES.find(p => p.id === partnerId) || PROFILES[0];
  
  const historyString = messages
    .map((m: any) => `${m.sender === "user" ? "أليكس" : partner.name}: ${m.text}`)
    .join("\n");

  const systemInstructions = `أنت تلعب دور شريك التبادل في منصة SkillSync AI.
اسمك هو (${partner.name}) وصفتك المهنية هي (${partner.title}). سيرتك الذاتية: ${partner.bio}.
المستخدم الذي تتحدث معه اسمه (أليكس)، هو زميلك في التبادل وتتحدثان باللغة العربية.
أجب باختصار وأدب واحترافية عالية تناسب شخصية (${partner.name}) وجدد حماسه للتطبيق العملي.
ردك يجب أن يكون قصيراً جداً (بحدود سطر أو سطرين بحد أقصى) ليتناسب مع نافذة محادثة دردشة فورية سريعة.`;

  const client = getGenAI();
  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `سياق المحادثة الأخيرة:\n${historyString}\n\nرد كـ (${partner.name}):`,
        config: {
          systemInstruction: systemInstructions,
          temperature: 0.8,
        },
      });
      return res.json({ response: response.text?.trim() });
    } catch (e) {
      console.error("Gemini chat fails, fallback to simple simulator", e);
    }
  }

  // Fallback simulator response
  const fallbacks = [
    "هذا عظيم جداً! أنا متحمس جداً لبدء الجلسة القادمة معك لإتقان مفاصل هذا التحدي العملي.",
    "رائع، قرأت ملخص أهدافك المقترحة للتعلم وسنبدأ فوراً بالتطبيق خطوة بخطوة.",
    "بالتأكيد! ما رأيك أن نجدول الموعد القادم ليكون مخصصاً للرد على استفساراتك البرمجية؟"
  ];
  const randomMsg = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  res.json({ response: randomMsg });
});

// Mock/Real AI generated learning roadmaps
app.post("/api/ai/generate-roadmap", async (req, res) => {
  const { goalSkill } = req.body;
  const prompt = `أنت مهندس مناهج تعليمية ومبرمج فذ في منصة SkillSync AI.
المستخدم يريد تعلم مهارة أو تحقيق هدف: "${goalSkill}".
قم بتوليد خارطة طريق مكونة من 3 وحدات (Units) مصممة بالذكاء الاصطناعي مع نسبة تقدم ومؤقت ساعات، بالإضافة إلى نصيحة مدرب ذكية (AI Mentor Tip).
أنت مُجبر على إعطاء الرد بتنسيق JSON متوافق مع نظام الترميز العريض UTF-8 وباللغة العربية الفصحى الجميلة وبشكل مباشر على الهيكل التالي تماماً (بدون أي علامات تنصيص خارجية مثل \`\`\`json):

{
  "expertName": "سارة أحمد",
  "skills": ["React Hooks", "State Management", "Tailwind CSS"],
  "units": [
    {
      "id": "u1",
      "title": "الأساسيات والمبادئ",
      "description": "مقدمة شاملة تمكنك من فهم المكونات الأساسية لبدء المعيار العملي لـ ${goalSkill}",
      "duration": "5 ساعات",
      "status": "completed",
      "percent": 100
    },
    {
      "id": "u2",
      "title": "التقنيات والتطبيقات المتقدمة",
      "description": "تعمّق استراتيجي في تقنيات التطبيق العملي الفعلي وحل المشكلات المعاصرة لـ ${goalSkill}",
      "duration": "8 ساعات",
      "status": "in_progress",
      "percent": 35
    },
    {
      "id": "u3",
      "title": "مشروع التخرج التجريبي المتكامل",
      "description": "تطوير وبناء مشروع مستخدم حقيقي يدمج مخرجات الخطوات السابقة كلياً لإثبات الإتقان الوفير",
      "duration": "12 ساعة",
      "status": "locked",
      "percent": 0
    }
  ],
  "advice": "أنصحك بالتركيز الشديد على التطبيق العملي اليومي لمدة 20 دقيقة بدلاً من الدراسة المتقطعة الطويلة. الساعات القادمة ستكون حاسمة لتأسيس فهمك العميق للتقنيات المتقدمة!"
}`;

  const client = getGenAI();
  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generating roadmap for goal: "${goalSkill}"`,
        config: {
          systemInstruction: prompt,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });
      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (e) {
      console.error("Gemini roadmap generation fails, fallback to standard mock structure", e);
    }
  }

  // Fallback response with beautiful Arabic layout
  res.json({
    expertName: "سارة أحمد",
    skills: [goalSkill, "تخطيط المشاريع", "المطابقة الذكية"],
    units: [
      {
        id: "u1",
        title: "أساسيات وفهم " + goalSkill,
        description: "فهم المفاهيم الأساسية والأدوات الأولية للبدء الفعلي في مسارك التعليمي المخصص.",
        duration: "4 ساعات",
        status: "completed",
        percent: 100
      },
      {
        id: "u2",
        title: "التجربة المتقدمة في " + goalSkill,
        description: "التعمق في استراتيجيات متطورة وتطبيقات سيناريوهات حقيقية مستدامة.",
        duration: "10 ساعات",
        status: "in_progress",
        percent: 65
      },
      {
        id: "u3",
        title: "بناء مشروع تخرج متكامل",
        description: "تطبيق عملي فردي أو جماعي لإثبات مستوى إتقانك لهذه المهارة بكفاءة ممتازة.",
        duration: "16 ساعة",
        status: "locked",
        percent: 0
      }
    ],
    advice: "الممارسة العملية اليومية هي المفتاح الأساسي. حاول تخصيص وقت محدد لمراجعة وبناء سيناريوهات حقيقية للتعامل مع " + goalSkill + "، سيسهّل ذلك عليك الانتقال المريح للوحدة التالية."
  });
});

// Dynamic booking management
app.get("/api/bookings", (req, res) => {
  res.json({ bookings: bookingsMockData });
});

app.post("/api/bookings", (req, res) => {
  const { expertId, expertName, expertAvatar, expertTitle, date, timeSlot, goal } = req.body;
  const newBooking = {
    id: "b_" + Date.now(),
    expertId,
    expertName,
    expertAvatar,
    expertTitle,
    date,
    timeSlot,
    durationMin: 60,
    costPoints: 150,
    goal: goal || "تعلم مهارات تبادل متبادلة",
    status: "confirmed" as const
  };
  bookingsMockData.unshift(newBooking);
  res.json({ success: true, booking: newBooking });
});

// Dynamic session messagings
app.get("/api/chats", (req, res) => {
  res.json({ chats: sessionsMockData });
});

app.post("/api/chats/message", (req, res) => {
  const { text, sender } = req.body;
  const mainSession = sessionsMockData[0];
  const newMsg = {
    id: "m_" + Date.now(),
    sender,
    text,
    time: "الآن",
    status: "sent" as const
  };
  mainSession.messages.push(newMsg);
  res.json({ success: true, message: newMsg });
});

// Vite middleware flow for fullstack development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running beautifully on http://localhost:${PORT}`);
  });
}

startServer();
