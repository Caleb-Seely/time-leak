import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  const missingKeys = requiredKeys.filter(key => !import.meta.env[key]);
  
  if (missingKeys.length > 0) {
    console.error("🔥 Firebase Configuration Error:");
    console.error("Missing environment variables:", missingKeys);
    return false;
  }
  
  // Check if values are not just placeholders
  const hasPlaceholders = Object.values(firebaseConfig).some(value => 
    value && (value.includes('your_') || value.includes('here'))
  );
  
  if (hasPlaceholders) {
    console.error("🔥 Firebase Configuration Error:");
    console.error("Environment variables contain placeholder values. Please replace with actual Firebase configuration.");
    return false;
  }
  
  return true;
};

let app;
let db;

try {
  if (validateFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
    console.log("📊 Project ID:", firebaseConfig.projectId);
  } else {
    console.error("❌ Firebase not properly configured. Please check your environment variables.");
    db = null;
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase:", error);
  db = null;
}

export { db }; 