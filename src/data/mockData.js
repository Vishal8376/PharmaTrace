/**
 * mockData.js
 * ─────────────────────────────────────────────────────────────
 * Simulated cold-chain shipment data for PharmaTrace MVP.
 *
 * Temperature thresholds:
 *   SAFE     ≤ 8°C   → green
 *   WARNING  8–10°C  → orange
 *   CRITICAL > 10°C  → red
 *
 * AI Prediction logic (see getAIPrediction helper below):
 *   Compares last two values in history[].
 *   Increasing trend → "High Risk"
 *   Stable / decreasing → "Stable"
 * ─────────────────────────────────────────────────────────────
 */

export const shipments = [
  {
    id: "PT-2024-001",
    product: "Insulin — Rapid Acting",
    location: "Mumbai Cold Hub",
    origin: "Delhi Pharma Depot",
    temperature: 6.2,
    humidity: 42,
    history: [5.8, 6.0, 6.1, 6.0, 6.2],   // steady/safe
    carrier: "ColdEx Logistics",
    eta: "2h 14m",
  },
  {
    id: "PT-2024-002",
    product: "Vaccine — MMR Combo",
    location: "Chennai Port Terminal",
    origin: "Hyderabad BioLab",
    temperature: 9.1,
    humidity: 55,
    history: [7.2, 7.8, 8.3, 8.7, 9.1],   // rising → warning
    carrier: "BlueDart Cold",
    eta: "5h 30m",
  },
  {
    id: "PT-2024-003",
    product: "Blood Plasma — Type O",
    location: "Bengaluru Airport",
    origin: "Pune Blood Bank",
    temperature: 11.4,
    humidity: 61,
    history: [8.5, 9.2, 9.9, 10.6, 11.4], // critical & rising fast
    carrier: "AirFreight Med",
    eta: "1h 05m",
  },
  {
    id: "PT-2024-004",
    product: "Monoclonal Antibody",
    location: "Kolkata Distribution",
    origin: "Ahmedabad BioLabs",
    temperature: 4.5,
    humidity: 38,
    history: [6.1, 5.8, 5.5, 5.0, 4.5],   // improving/stable
    carrier: "Snowman Logistics",
    eta: "8h 45m",
  },
  {
    id: "PT-2024-005",
    product: "Immunoglobulin — IV",
    location: "Jaipur Transit Hub",
    origin: "Mumbai Pharma Park",
    temperature: 8.8,
    humidity: 49,
    history: [7.9, 8.1, 8.3, 8.6, 8.8],   // creeping upward → warning
    carrier: "PolarRoute Express",
    eta: "3h 20m",
  },
  {
    id: "PT-2024-006",
    product: "Hepatitis B Vaccine",
    location: "Ahmedabad Depot",
    origin: "Surat Pharma Hub",
    temperature: 12.7,
    humidity: 70,
    history: [9.8, 10.5, 11.2, 12.0, 12.7], // critical & accelerating
    carrier: "QuickFreeze Ltd",
    eta: "45m",
  },
  {
    id: "PT-2024-007",
    product: "Erythropoietin",
    location: "Hyderabad MedCity",
    origin: "Bengaluru BioPark",
    temperature: 3.8,
    humidity: 35,
    history: [4.2, 4.0, 4.1, 3.9, 3.8],   // very stable/safe
    carrier: "ColdEx Logistics",
    eta: "6h 00m",
  },
  {
    id: "PT-2024-008",
    product: "Pegfilgrastim",
    location: "Lucknow Medical Hub",
    origin: "Delhi Pharma Depot",
    temperature: 10.3,
    humidity: 58,
    history: [8.9, 9.3, 9.7, 10.0, 10.3],  // just crossed critical
    carrier: "ArcticMove Pro",
    eta: "4h 10m",
  },
];

// ─────────────────────────────────────────────────────────────
// Helper: derive status string from a temperature value
// ─────────────────────────────────────────────────────────────
export function getStatus(temp) {
  if (temp <= 8)  return "Safe";
  if (temp <= 10) return "Warning";
  return "Critical";
}

// ─────────────────────────────────────────────────────────────
// Helper: simple AI prediction from temperature trend
// Compares first vs last value in the history array.
// If the last value is higher than the first → "High Risk"
// ─────────────────────────────────────────────────────────────
export function getAIPrediction(history) {
  if (!history || history.length < 2) return "Stable";
  const first = history[0];
  const last  = history[history.length - 1];
  return last > first ? "High Risk" : "Stable";
}
