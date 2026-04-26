import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

// ─── TemperatureChart ─────────────────────────────────────────────────────────
// Displays the temperature history for a single shipment using Recharts.
// Props:
//   history: array of temperature numbers (last 5 readings)
//   shipmentId: string - used for labeling
// ──────────────────────────────────────────────────────────────────────────────

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value
    const color = temp <= 8 ? '#00e676' : temp <= 10 ? '#ff9800' : '#ff3d3d'
    return (
      <div
        className="px-3 py-2 rounded-lg text-xs"
        style={{
          background: '#0b1629',
          border: `1px solid ${color}55`,
          fontFamily: 'IBM Plex Mono',
        }}
      >
        <div style={{ color: '#4a6080' }}>Reading {label}</div>
        <div style={{ color }} className="font-semibold text-sm mt-0.5">
          {temp.toFixed(1)}°C
        </div>
      </div>
    )
  }
  return null
}

function TemperatureChart({ history }) {
  // Convert raw history array to recharts-compatible data format
  const data = (history || []).map((temp, idx) => ({
    reading: idx + 1,
    temp: parseFloat(temp.toFixed(2)),
  }))

  // Determine chart line color based on max temperature in history
  const maxTemp = Math.max(...(history || [0]))
  const lineColor = maxTemp <= 8 ? '#00e676' : maxTemp <= 10 ? '#ff9800' : '#ff3d3d'

  return (
    <div className="w-full" style={{ height: 140 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4a" vertical={false} />

          {/* X Axis: reading number */}
          <XAxis
            dataKey="reading"
            tick={{ fill: '#4a6080', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Reading', position: 'insideBottom', fill: '#4a6080', fontSize: 9 }}
          />

          {/* Y Axis: temperature */}
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: '#4a6080', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}°`}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Reference lines for safe (8°C) and warning (10°C) thresholds */}
          <ReferenceLine y={8} stroke="#00e67644" strokeDasharray="4 4" />
          <ReferenceLine y={10} stroke="#ff980044" strokeDasharray="4 4" />

          {/* Temperature line */}
          <Line
            type="monotone"
            dataKey="temp"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: lineColor, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TemperatureChart
