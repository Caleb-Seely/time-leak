
import type { ScreenTimeData } from "@/types/screentime";
import { formatDate } from "./time-utils";

// Mock data for demonstration - replace with actual Firestore integration
const mockScreenTimeData: Record<string, ScreenTimeData> = {
  "+1234567890": {
    phoneNumber: "+1234567890",
    date: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // Yesterday
    totalScreenTime: 277, // 4h 37m
    apps: [
      { name: "Instagram", timeSpent: 85, category: "Social Media" },
      { name: "YouTube", timeSpent: 65, category: "Entertainment" },
      { name: "TikTok", timeSpent: 45, category: "Social Media" },
      { name: "WhatsApp", timeSpent: 32, category: "Messaging" },
      { name: "Gmail", timeSpent: 25, category: "Productivity" },
      { name: "Spotify", timeSpent: 15, category: "Entertainment" },
      { name: "Calendar", timeSpent: 10, category: "Productivity" },
    ],
    categoryBreakdown: {
      "Social Media": 130,
      "Entertainment": 80,
      "Productivity": 35,
      "Messaging": 32,
      "Other": 0,
    },
  },
  "5551234567": {
    phoneNumber: "5551234567",
    date: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
    totalScreenTime: 195, // 3h 15m
    apps: [
      { name: "Netflix", timeSpent: 90, category: "Entertainment" },
      { name: "Messages", timeSpent: 45, category: "Messaging" },
      { name: "Safari", timeSpent: 30, category: "Other" },
      { name: "Docs", timeSpent: 20, category: "Productivity" },
      { name: "Snapchat", timeSpent: 10, category: "Social Media" },
    ],
    categoryBreakdown: {
      "Social Media": 10,
      "Entertainment": 90,
      "Productivity": 20,
      "Messaging": 45,
      "Other": 30,
    },
  },
};

export const lookupScreenTime = async (phoneNumber: string): Promise<ScreenTimeData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log("Looking up screen time for:", phoneNumber);
  
  // Clean phone number (remove spaces, dashes, etc.)
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  
  // Try different formats
  const possibleNumbers = [
    phoneNumber,
    cleanNumber,
    `+1${cleanNumber}`,
    `+${cleanNumber}`,
  ];
  
  for (const number of possibleNumbers) {
    if (mockScreenTimeData[number]) {
      console.log("Found data for:", number);
      return mockScreenTimeData[number];
    }
  }
  
  console.log("No data found for phone number:", phoneNumber);
  throw new Error("No screen time data found");
};
