export interface AppUsage {
  name: string;
  timeSpent: number; // in minutes
  category: string;
}

// Backend data structure (what's actually stored in Firebase)
export interface UsageData {
  userId: string;
  phoneNumber: string;
  date: Date | string;
  totalScreenTime: number; // in milliseconds
  appUsage: Record<string, number>; // packageName -> usageTimeMillis
  socialMediaTime: number; // in milliseconds
  entertainmentTime: number; // in milliseconds
  goalTime?: number; // in minutes, optional for backward compatibility
}

// Frontend data structure (processed for display)
export interface ScreenTimeData {
  phoneNumber: string;
  date: string;
  totalScreenTime: number; // in minutes
  goalTime?: number; // in minutes, optional for backward compatibility
  apps: AppUsage[];
  categoryBreakdown: {
    "Social Media": number;
    "Entertainment": number;
    "Productivity": number;
    "Messaging": number;
    "Other": number;
  };
}
