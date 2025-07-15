import type { ScreenTimeData, AppUsage } from "@/types/screentime";
import { formatDate, isValidPhoneNumber } from "./time-utils";
import { db } from "./firebase";
import { collection, query, where, getDocs, getCountFromServer, doc, getDoc } from "firebase/firestore";

// Helper to convert Firestore Timestamp, JS Date, or string to a display string
function getDateString(date: any): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };

  if (!date) return "";
  if (typeof date === "object" && "seconds" in date) {
    // Firestore Timestamp
    return new Date(date.seconds * 1000).toLocaleString(undefined, options);
  }
  if (typeof date === "string") return date;
  if (date instanceof Date) return date.toLocaleString(undefined, options);
  return String(date);
}

// Transform backend UsageData to frontend ScreenTimeData
function transformUsageData(data: any): ScreenTimeData {
  // Convert ms to minutes
  const msToMin = (ms: number) => Math.round(ms / 60000);

  // Map appUsage to apps array
  const apps: AppUsage[] = data.appUsage
    ? Object.entries(data.appUsage).map(([pkg, ms]) => ({
        name: pkg, // You may want to map package names to friendly names
        timeSpent: msToMin(ms as number),
        category: "Other", // You can improve this if you have category info
      }))
    : [];

  // Build category breakdown
  const categoryBreakdown = {
    "Social Media": msToMin(data.socialMediaTime || 0),
    "Entertainment": msToMin(data.entertainmentTime || 0),
    "Productivity": 0,
    "Messaging": 0,
    "Other": msToMin((data.totalScreenTime || 0)) -
      msToMin(data.socialMediaTime || 0) -
      msToMin(data.entertainmentTime || 0),
  };

  // Handle goalTime - it could be stored in minutes or milliseconds
  let goalTime: number | undefined;
  if (data.goalTime !== undefined) {
    // If goalTime is greater than 1440 (24 hours in minutes), assume it's in milliseconds
    goalTime = data.goalTime > 1440 ? msToMin(data.goalTime) : data.goalTime;
  }

  return {
    phoneNumber: data.phoneNumber,
    date: getDateString(data.date),
    totalScreenTime: msToMin(data.totalScreenTime || 0),
    goalTime,
    apps,
    categoryBreakdown,
  };
}

export const lookupScreenTime = async (phoneNumber: string): Promise<ScreenTimeData> => {
  console.log("Looking up screen time for:", phoneNumber);

  // Validate phone number before querying
  if (!isValidPhoneNumber(phoneNumber)) {
    throw new Error("Invalid phone number format.");
  }

  // Check if Firebase is properly configured
  if (!db) {
    console.error("Firebase database is not initialized");
    throw new Error("Database connection not available. Please check Firebase configuration.");
  }

  try {
    // Query Firestore for the exact phone number
    const screenTimeRef = collection(db, "usage_data");
    const q = query(
      screenTimeRef,
      where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log("Found data for:", phoneNumber);
      // Transform backend data to frontend format
      return transformUsageData(data);
    }
    console.log("No data found for phone number:", phoneNumber);
    throw new Error("No screen time data found for this phone number. Make sure you've shared your data recently.");
  } catch (error) {
    console.error("Firebase lookup error:", error);
    throw error;
  }
};

/**
 * Fetches a random tagline from the 'subtitle' collection in Firestore.
 * Each document should have a 'tag_line' field.
 * Returns the tagline string, or a fallback if none found.
 */
export const fetchRandomTagline = async (): Promise<string> => {
  if (!db) {
    console.error("Firebase database is not initialized");
    return "Call them out. Log them off.";
  }
  try {
    const subtitleRef = collection(db, "subtitles");
    // Get all taglines (could be optimized for large collections)
    const snapshot = await getDocs(subtitleRef);
    const taglines: string[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data && typeof data.tag_line === 'string') {
        taglines.push(data.tag_line);
      }
    });
    if (taglines.length === 0) {
      return "Call them out. Log them off.";
    }
    // Pick one at random
    const randomIndex = Math.floor(Math.random() * taglines.length);
    return taglines[randomIndex];
  } catch (error) {
    console.error("Error fetching taglines:", error);
    return "Call them out. Log them off.";
  }
};
