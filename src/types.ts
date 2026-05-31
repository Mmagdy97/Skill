export interface Profile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  verified: boolean;
  compatPercent: number; // e.g. 98
  matchTags: string[];
  schedule: string;
  learningStyle: string;
  bio: string;
  skillsTaught: string[];
  skillsWanted: string[];
  mentorshipHours: number;
  ratingValue: number;
  ratingCount: number;
  publishedResearch: number;
  country: string;
  joinDate: string;
  isActiveNow?: boolean;
  label?: string; // e.g. "NEW" (جديد)
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "in_progress" | "locked";
  percent?: number; // e.g., 65
}

export interface LearningPlan {
  id: string;
  expertName: string;
  skills: string[];
  units: Unit[];
  advice: string;
}

export interface MessageLine {
  id: string;
  sender: "user" | "partner" | "system";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
  learningPlanProgressChange?: number; // percent indicating progress
}

export interface ChatSession {
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  online: boolean;
  messages: MessageLine[];
}

export interface Booking {
  id: string;
  expertId: string;
  expertName: string;
  expertAvatar: string;
  expertTitle: string;
  date: string;
  timeSlot: string;
  durationMin: number;
  costPoints: number;
  goal: string;
  status: "pending" | "confirmed";
}

export interface Activity {
  id: string;
  type: "school" | "chat_bubble" | "verified";
  title: string;
  time: string;
  points: string;
}
