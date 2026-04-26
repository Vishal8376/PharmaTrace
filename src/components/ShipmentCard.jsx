import React, { useState } from 'react'
import { MapPin, Thermometer, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import TemperatureChart from './TemperatureChart'
import AIInsights from './AIInsights'

// ─── getStatusConfig ──────────────────────────────────────────────────────────
// Returns color, label, and styling config based on temperature value.
// Temperature rules:
//   Safe     = ≤ 8°C   → green
//   Warning  = 8–10°C  → orange
//   Critical = > 10°C  → red
// ──────────────────────────────────────────────────────────────────────────────
function getStatusConfig(temp) {
  if (temp <= 8)  return { label: 'SAFE',     color: '#00e676', bg: '#00e67611', border: '#00e67633', dot: '#00e676' }
  if (temp <= 10) return { label: 'WARNING',  color: '#ff9800', bg: '#ff980011', border: '#ff980033', dot: '#ff9800' }
  return              { label: 'CRITICAL', color: '#ff3d3d', bg: '#ff3d3d11', border: '#ff3d3d33', dot: '#ff3d3d' }
}

// ─── ShipmentCard ─────────────────────────────────────────────────────────────
// Displays a single shipment with status, temperature, location, chart, and AI.
// Props:
//   shipment: { id, location, temperature, history }
//   index: number for staggered animation
// ──────────────────────────────────────────────────────────────────────────────
function ShipmentCard({ shipment, index }) {
  const [expanded, setExpanded] = useState(false)
  const status = getStatusConfig(shipment.temperature)

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 animate-fade-up bg-slate-900/80 backdrop-blur-lg border hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
      style={{
        borderColor: expanded ? status.border : 'rgba(113, 128, 150, 0.3)',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* ── Card Header ─────────────────────────────────────────────────────── */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          {/* Left: ID + Location */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold"
                style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}
              >
                {shipment.id}
              </span>
              {/* Status badge */}
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  color: status.color,
                  background: status.bg,
                  borderColor: status.border,
                  fontFamily: 'Space Grotesk',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: status.dot }}
                ></div>
                {status.label}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: '#4a6080' }} />
              <span className="text-sm font-medium" style={{ color: '#b0c4d8' }}>
                {shipment.location}
              </span>
            </div>
          </div>

          {/* Right: Temperature display */}
          <div className="text-right">
            <div
              className="text-3xl font-bold"
              style={{ color: status.color, fontFamily: 'Space Grotesk', lineHeight: 1 }}
            >
              {shipment.temperature.toFixed(1)}
              <span className="text-lg">°C</span>
            </div>
            <div className="text-xs mt-1" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>
              current
            </div>
          </div>
        </div>

        {/* Status indicator bar */}
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: '#1a2d4a' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((shipment.temperature / 15) * 100, 100)}%`,
              background: `linear-gradient(90deg, #00e676, ${status.color})`,
            }}
          />
        </div>

        {/* Threshold labels */}
        <div className="flex justify-between mt-1">
          <span className="text-xs" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>0°C</span>
          <span className="text-xs" style={{ color: '#00e67666', fontFamily: 'IBM Plex Mono' }}>8° safe</span>
          <span className="text-xs" style={{ color: '#ff980066', fontFamily: 'IBM Plex Mono' }}>10° warn</span>
          <span className="text-xs" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>15°C</span>
        </div>
      </div>

      {/* ── Expand Toggle ───────────────────────────────────────────────────── */}
      <button
        className="w-full px-5 py-3 flex items-center justify-between text-xs transition-all duration-200 hover:bg-slate-800/50 border-t border-slate-700/50"
        onClick={() => setExpanded(!expanded)}
        style={{
          color: '#4a6080',
          fontFamily: 'IBM Plex Mono',
          cursor: 'pointer',
          background: expanded ? 'rgba(15, 23, 42, 0.8)' : 'transparent',
        }}
      >
        <span className="flex items-center gap-2">
          <Clock size={11} />
          {expanded ? 'Hide' : 'Show'} temperature history & AI insights
        </span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* ── Expanded Body: Chart + AI ────────────────────────────────────────── */}
      {expanded && (
        <div className="px-5 pb-5 bg-slate-900/60 backdrop-blur-sm">
          <div
            className="pt-4 pb-2 text-xs flex items-center gap-1.5 font-semibold tracking-wide"
            style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}
          >
            <Thermometer size={11} />
            TEMPERATURE HISTORY (LAST 5 READINGS)
          </div>

          {/* Recharts temperature graph */}
          <TemperatureChart history={shipment.history} shipmentId={shipment.id} />

          {/* AI Insights section (Gemini API call) */}
          <AIInsights shipment={shipment} />
        </div>
      )}
    </div>
  )
}

export default ShipmentCard
