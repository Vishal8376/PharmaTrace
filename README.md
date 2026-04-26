# 🧪 PharmaTrace — AI-Powered Cold-Chain Intelligence Dashboard

A hackathon-ready MVP for pharmaceutical cold-chain monitoring.
Built with React (Vite) + Firebase Firestore + Google Gemini Pro.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase (Required)

**Step 1:** Go to https://console.firebase.google.com/
**Step 2:** Create a new project → Click "Add App" → Web (`</>`)
**Step 3:** Copy your `firebaseConfig` object
**Step 4:** Open `src/firebase.js` and replace the placeholder config:

```js
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**Step 5:** In Firebase Console → Firestore Database → Create Database
→ Start in **Test Mode** (for development)

### 3. Add Sample Data to Firestore

In Firebase Console → Firestore → **Create Collection** named `shipments`

Add these 6 documents (use **Auto ID** for each):

**Document 1:**
```
id: "SHP-001"
location: "Mumbai Cold Warehouse"
temperature: 6.2
history: [5.8, 6.1, 6.2, 6.0, 6.2]
```

**Document 2:**
```
id: "SHP-002"
location: "Delhi Distribution Hub"
temperature: 9.1
history: [7.8, 8.2, 8.9, 9.0, 9.1]
```

**Document 3:**
```
id: "SHP-003"
location: "Chennai Port Facility"
temperature: 11.4
history: [8.5, 9.2, 10.1, 10.8, 11.4]
```

**Document 4:**
```
id: "SHP-004"
location: "Bengaluru BioPharma Hub"
temperature: 4.8
history: [4.5, 4.6, 4.8, 4.7, 4.8]
```

**Document 5:**
```
id: "SHP-005"
location: "Hyderabad Vaccine Center"
temperature: 7.5
history: [7.0, 7.1, 7.3, 7.4, 7.5]
```

**Document 6:**
```
id: "SHP-006"
location: "Kolkata Transit Hub"
temperature: 10.8
history: [9.1, 9.6, 10.0, 10.4, 10.8]
```

### 4. Configure Gemini API Key (Required for AI Insights)

**Step 1:** Go to https://aistudio.google.com/app/apikey
**Step 2:** Click "Create API Key"
**Step 3:** Copy the key
**Step 4:** Open `src/components/AIInsights.jsx` and replace:

```js
const GEMINI_API_KEY = "YOUR_ACTUAL_GEMINI_KEY"
```

### 5. Run Locally

```bash
npm run dev
```

Open http://localhost:5173

---

## 🌡️ Temperature Logic

| Range     | Status   | Color  |
|-----------|----------|--------|
| ≤ 8°C     | Safe     | 🟢 Green  |
| 8–10°C    | Warning  | 🟠 Orange |
| > 10°C    | Critical | 🔴 Red    |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main page — fetches Firestore data
│   ├── ShipmentCard.jsx   # Individual shipment card
│   ├── TemperatureChart.jsx  # Recharts line graph
│   ├── AIInsights.jsx     # Gemini API integration
│   ├── AlertBanner.jsx    # Critical alert bar
│   └── Navbar.jsx         # Top navigation
├── firebase.js            # Firebase initialization
├── App.jsx
├── main.jsx
└── index.css
```

---

## ☁️ Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting
# Choose: build (dist) as public dir, SPA: yes

# Build
npm run build

# Deploy
firebase deploy
```

---

## 🔑 Environment Variables (Optional — for production)

Create a `.env` file:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project
VITE_GEMINI_API_KEY=your_gemini_key
```

Then update `firebase.js` and `AIInsights.jsx` to use `import.meta.env.VITE_*`.

> ⚠️ Never commit API keys to git. Add `.env` to `.gitignore`.

---

## 🏆 Built for Hackathons

- No backend required (100% frontend)
- Firebase Firestore as the database
- Gemini Pro for AI-powered risk analysis
- Clean SaaS-style dark UI
- Production-ready code structure
