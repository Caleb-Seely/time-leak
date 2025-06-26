
export interface AppUsage {
  name: string;
  timeSpent: number; // in minutes
  category: string;
}

export interface ScreenTimeData {
  phoneNumber: string;
  date: string;
  totalScreenTime: number; // in minutes
  apps: AppUsage[];
  categoryBreakdown: {
    "Social Media": number;
    "Entertainment": number;
    "Productivity": number;
    "Messaging": number;
    "Other": number;
  };
}
