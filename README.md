# 🚀 PharmaTrace – AI-Powered Cold Chain Monitoring

PharmaTrace is a smart supply chain platform designed to ensure the integrity of temperature-sensitive pharmaceutical shipments. It leverages real-time monitoring and AI-driven insights to prevent temperature excursions and reduce vaccine/drug wastage.

---

## 🌍 Problem Statement

Pharmaceutical companies face major losses due to temperature deviations during transportation of vaccines and biologics.

* ❌ 70–80% monitoring is still manual
* ❌ Temperature breaches detected too late
* ❌ High compliance and documentation overhead

---

## 💡 Solution

PharmaTrace provides:

* 📡 Real-time shipment monitoring (temperature, location)
* 🤖 AI-powered risk prediction using Google Gemini
* 🚨 Instant alerts for temperature excursions
* 📊 Interactive dashboard for complete visibility
* 📁 Automated compliance-ready insights

---

## 🧠 Key Features

* ✅ Live dashboard with shipment status (Safe / Warning / Critical)
* 📈 Temperature trend visualization
* 🤖 AI Insights (risk analysis + recommendations)
* 🔔 Alert system for critical shipments
* 🔄 Real-time data from Firebase Firestore

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Chart.js

### Backend / Cloud

* Firebase Firestore (Database)
* Firebase Hosting (optional deployment)

### AI

* Google Gemini API (via AI Studio)

---

## ☁️ Google Technologies Used

* **Firebase Firestore** – Real-time database for shipment data
* **Google Gemini API** – AI-based prediction and insights

---

## 🧪 How It Works

1. Shipment data is stored in Firebase Firestore
2. Dashboard fetches and displays real-time data
3. Temperature trends are analyzed
4. Gemini API generates:

   * Risk level
   * Explanation
   * Suggested actions

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Vishal8376/PharmaTrace.git
cd pharmatrace
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

---

### 4. Firebase Setup

* Create a Firebase project
* Enable Firestore Database
* Create collection: `shipments`
* Add documents with fields:

  * id
  * location
  * temperature
  * history (array)

Add your Firebase config in `firebase.js`

---

### 5. Run Project

```bash
npm run dev
```

---

## 📸 Demo

🔗 Live Demo: *Add your Vercel link here*
🎥 Demo Video: *Add your YouTube/Drive link here*

---

## 📊 Future Scope

* 🔗 Blockchain integration for tamper-proof logs
* 📍 IoT sensor integration for real-time hardware data
* 🌐 Global supply chain analytics
* 📦 Route optimization using AI

---

## 🏷️ Team Name

**CodeByte**

---

## 👥 Team – CodeByte

| Name        | Role      |
| ----------- | --------- |
| Vishal      | Team Lead |
| Kshira K    | Developer |
| Mushafina R | Developer |

---

## 📌 Theme

**Smart Supply Chains – Resilient Logistics and Dynamic Optimization**

---

## 🏆 Why PharmaTrace?

PharmaTrace shifts supply chain monitoring from **reactive → predictive**, ensuring:

* Reduced pharmaceutical wastage
* Improved patient safety
* Scalable and intelligent logistics

---

## 📄 License

This project is built for the **GDG Solution Challenge**.
