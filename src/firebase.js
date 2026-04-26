// ============================================================
// FIREBASE SETUP
// ============================================================
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (e.g. "pharmatrace")
// 3. Click "Add App" → choose Web (</>)
// 4. Register the app, copy the firebaseConfig object
// 5. Go to Firestore Database → Create Database (Start in test mode)
// 6. Paste your config below, replacing the placeholder values
// ============================================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔧 REPLACE THIS with your actual Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyBqxqsHXLiLm9wL38lIz1zjvfWs5yx7qUw",
  authDomain: "pharmatrace-96790.firebaseapp.com",
  projectId: "pharmatrace-96790",
  storageBucket: "pharmatrace-96790.firebasestorage.app",
  messagingSenderId: "329750027719",
  appId: "1:329750027719:web:23bac4233d4063282d4de2",
  measurementId: "G-1RSPVXDV21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it for use across the app
export const db = getFirestore(app);

// ============================================================
// FIRESTORE DATA STRUCTURE
// ============================================================
// Collection: "shipments"
// Each document:
// {
//   id: "SHP-001",
//   location: "Mumbai Warehouse",
//   temperature: 6.2,
//   history: [5.8, 6.1, 6.2, 7.0, 6.2]
// }
// ============================================================
