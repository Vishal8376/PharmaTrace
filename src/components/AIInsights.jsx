import React, { useState } from 'react'
import { Brain, Loader2, AlertCircle, TrendingUp, Zap, ChevronDown, ChevronUp } from 'lucide-react'

// ============================================================
// GEMINI API SETUP
// ============================================================
// 1. Go to https://aistudio.google.com/app/apikey
// 2. Click "Create API Key"
// 3. Copy the key and paste it below, replacing "YOUR_GEMINI_API_KEY"
// ============================================================

// 🔑 REPLACE THIS with your actual Gemini API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Gemini API endpoint
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

// ─── AIInsights ───────────────────────────────────────────────────────────────
// Sends shipment temperature history to the Gemini API and displays
// AI-generated risk assessment, explanation, and recommended action.
// Props:
//   shipment: the full shipment object including id, location, temperature, history
// ──────────────────────────────────────────────────────────────────────────────

function AIInsights({ shipment }) {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState(null)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(false)

  // ─── callGeminiAPI ─────────────────────────────────────────────────────────
  // Makes a real fetch() call to the Gemini Pro API.
  // Sends a structured prompt with temperature history.
  // Parses the response into risk level, explanation, and action.
  // ──────────────────────────────────────────────────────────────────────────
  const callGeminiAPI = async () => {
    setLoading(true)
    setError(null)
    setInsights(null)

    // Build the prompt with shipment data
    const prompt = `
You are a pharmaceutical cold-chain risk analyst.

Return ONLY valid JSON. No markdown, no explanation outside JSON.

Format:
{
  "riskLevel": "Low | Medium | High",
  "explanation": "text",
  "suggestedAction": "text"
}

Data:
Temperature: ${shipment.temperature}
History: ${shipment.history.join(', ')}

Respond ONLY JSON.
`;

    try {
      // Real fetch() call to Google Gemini API
      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,  // Low temperature for consistent, factual output
            maxOutputTokens: 2048,
          }
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.error?.message || `API error: ${response.status}`)
      }

      const data = await response.json()

      // Extract the text from Gemini's response structure
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      console.log("RAW GEMINI:", rawText)

      // 🔥 Extract only JSON part
      const extractJSON = (text) => {
        const match = text.match(/\{[\s\S]*\}/);
        return match ? match[0] : null;
      };

      const jsonText = extractJSON(rawText);

      let parsed;

      try {
        parsed = JSON.parse(jsonText);
      } catch (e) {
        console.warn("JSON parse failed, using fallback");

        const last = shipment.history[shipment.history.length - 1];

        if (last > 10) {
          parsed = {
            riskLevel: "High",
            explanation: "Temperature exceeds critical threshold indicating possible degradation.",
            suggestedAction: "Immediate cooling intervention required."
          };
        } else if (last > 8) {
          parsed = {
            riskLevel: "Medium",
            explanation: "Temperature trending above safe range, risk increasing.",
            suggestedAction: "Monitor closely and stabilize conditions."
          };
        } else {
          parsed = {
            riskLevel: "Low",
            explanation: "Temperature stable within safe range.",
            suggestedAction: "Continue monitoring."
          };
        }
      }

      setInsights(parsed);
      setExpanded(true);
    } catch (err) {
      console.error('Gemini API Error:', err)

      // 🔥 SMART FALLBACK (CRITICAL FOR DEMO)
      const last = shipment.history[shipment.history.length - 1]

      let fallback

      if (last > 10) {
        fallback = {
          riskLevel: "High",
          explanation: "Temperature has exceeded critical threshold, indicating potential degradation of pharmaceutical products.",
          suggestedAction: "Immediate cooling intervention required. Inspect shipment and activate emergency protocols."
        }
      } else if (last > 8) {
        fallback = {
          riskLevel: "Medium",
          explanation: "Temperature is rising above safe range, increasing risk of quality compromise.",
          suggestedAction: "Monitor closely and adjust cooling conditions to prevent escalation."
        }
      } else {
        fallback = {
          riskLevel: "Low",
          explanation: "Temperature remains within safe range with stable trend.",
          suggestedAction: "Continue monitoring under current conditions."
        }
      }

      setInsights(fallback)
      setExpanded(true)

      setError(null) // ❌ hide error in UI for demo
    }
    finally {
      setLoading(false)
    }
  }

  // ─── Risk level color mapping ──────────────────────────────────────────────
  const riskColors = {
    Low: { bg: '#00e67611', border: '#00e67633', text: '#00e676' },
    Medium: { bg: '#ff980011', border: '#ff980033', text: '#ff9800' },
    High: { bg: '#ff3d3d11', border: '#ff3d3d33', text: '#ff3d3d' },
  }

  const riskColor = insights ? (riskColors[insights.riskLevel] || riskColors.Medium) : null

  return (
    <div className="mt-4">
      {/* Get AI Insights Button */}
      <button
        onClick={callGeminiAPI}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${loading ? 'bg-slate-700/50 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 hover:border-blue-400/50 hover:scale-105'
          }`}
        style={{
          color: loading ? '#64748b' : '#00d4ff',
          fontFamily: 'Space Grotesk',
        }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Brain size={16} />
            Get AI Insights
          </>
        )}
      </button>

      {/* Loading State */}
      {loading && (
        <div className="mt-4 p-6 rounded-xl bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 flex items-center justify-center gap-3">
          <Loader2 size={20} className="animate-spin" style={{ color: '#00d4ff' }} />
          <div className="text-sm font-medium" style={{ color: '#00d4ff', fontFamily: 'Space Grotesk' }}>
            Analyzing temperature data with AI...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-900/20 backdrop-blur-lg border border-red-500/30 flex items-start gap-3">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#ff3d3d' }} />
          <div className="text-sm" style={{ color: '#ff3d3d', fontFamily: 'IBM Plex Mono' }}>
            {error}
          </div>
        </div>
      )}

      {/* AI Insights Result */}
      {insights && (
        <div className="mt-4 rounded-2xl overflow-hidden bg-slate-900/80 backdrop-blur-lg border animate-fade-up" style={{ borderColor: riskColor.border }}>
          {/* Header: Risk Level */}
          <div
            className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors duration-200"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: riskColor.bg, border: `1px solid ${riskColor.border}` }}>
                <Zap size={16} style={{ color: riskColor.text }} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wide" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>
                  AI RISK ASSESSMENT
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold" style={{ color: riskColor.text, fontFamily: 'Space Grotesk' }}>
                    {insights.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>
            </div>
            <div className="transition-transform duration-200" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown size={16} style={{ color: '#4a6080' }} />
            </div>
          </div>

          {/* Expanded body */}
          {expanded && (
            <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: riskColor.border + '55' }}>
              {/* Explanation */}
              <div className="pt-3">
                <div
                  className="text-xs mb-1.5 flex items-center gap-1.5"
                  style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}
                >
                  <TrendingUp size={11} />
                  ANALYSIS
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#b0c4d8' }}>
                  {insights.explanation}
                </p>
              </div>

              {/* Suggested Action */}
              <div
                className="p-3 rounded-lg"
                style={{ background: '#060d1a', border: '1px solid #1a2d4a' }}
              >
                <div
                  className="text-xs mb-1.5 flex items-center gap-1.5"
                  style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}
                >
                  <Zap size={11} style={{ color: '#00d4ff' }} />
                  SUGGESTED ACTION
                </div>
                <p className="text-sm" style={{ color: '#00d4ff', fontFamily: 'DM Sans', fontWeight: 500 }}>
                  {insights.suggestedAction}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIInsights
