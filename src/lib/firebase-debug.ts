import { db } from "./firebase";
import { collection, getDocs, limit } from "firebase/firestore";

export const testFirebaseConnection = async (): Promise<{
  isConnected: boolean;
  error?: string;
  sampleData?: any[];
}> => {
  try {
    if (!db) {
      return {
        isConnected: false,
        error: "Firebase database is not initialized. Check your environment variables."
      };
    }

    console.log("Testing Firebase connection...");
    
    // Try to read from the screenTime collection
    const screenTimeRef = collection(db, "usage_data");
    const querySnapshot = await getDocs(screenTimeRef);
    
    const sampleData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Firebase connection successful! Found ${sampleData.length} documents.`);
    
    return {
      isConnected: true,
      sampleData
    };
    
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      if (error.message.includes("permission")) {
        errorMessage = "Firestore security rules are blocking access. Check your rules.";
      } else if (error.message.includes("unavailable")) {
        errorMessage = "Firebase service is unavailable. Check your internet connection.";
      } else if (error.message.includes("project")) {
        errorMessage = "Invalid Firebase project configuration. Check your environment variables.";
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      isConnected: false,
      error: errorMessage
    };
  }
};

export const logFirebaseStatus = async (): Promise<void> => {
  const status = await testFirebaseConnection();
  
  console.group("🔥 Firebase Status Check");
  console.log("Connection:", status.isConnected ? "✅ Connected" : "❌ Failed");
  
  if (status.error) {
    console.error("Error:", status.error);
  }
  
  if (status.sampleData) {
    console.log("Sample data count:", status.sampleData.length);
    if (status.sampleData.length > 0) {
      console.log("Sample document:", status.sampleData[0]);
    }
  }
  
  console.groupEnd();
}; 