import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

// ─── AlertBanner ──────────────────────────────────────────────────────────────
// Displays a dismissible banner at the top of the dashboard when there are
// any shipments with CRITICAL temperature status (> 10°C)
// Props:
//   criticalShipments: array of shipment objects with status "Critical"
// ──────────────────────────────────────────────────────────────────────────────

function AlertBanner({ criticalShipments, onDismiss }) {
  if (!criticalShipments || criticalShipments.length === 0) return null

  return (
    <div
      className="animate-slide-in rounded-2xl px-6 py-5 flex items-center justify-between bg-red-900/20 backdrop-blur-lg border border-red-500/30 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#ff3d3d22' }}
        >
          <AlertTriangle size={16} style={{ color: '#ff3d3d' }} />
        </div>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#ff3d3d', fontFamily: 'Space Grotesk' }}>
            ⚠ CRITICAL TEMPERATURE BREACH DETECTED
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#ff3d3d99' }}>
            {criticalShipments.length} shipment{criticalShipments.length > 1 ? 's' : ''} exceeding safe threshold:{' '}
            {criticalShipments.map(s => s.id).join(', ')}
          </div>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 p-1.5 rounded-lg transition-colors hover:bg-red-900/30"
        style={{ color: '#ff3d3d77', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default AlertBanner
