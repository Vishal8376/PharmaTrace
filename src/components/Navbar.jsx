import React from 'react'
import { Activity, Thermometer, Shield } from 'lucide-react'

// ─── Navbar ───────────────────────────────────────────────────────────────────
// Top navigation bar for PharmaTrace
// Shows branding, live indicator, and nav links
// ──────────────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b bg-slate-900/90 backdrop-blur-xl border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #00d4ff22, #00d4ff44)', border: '1px solid #00d4ff55' }}
          >
            <Thermometer size={20} style={{ color: '#00d4ff' }} />
          </div>
          <div>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'Space Grotesk', color: '#e0eaf5' }}
            >
              Pharma<span style={{ color: '#00d4ff' }}>Trace</span>
            </span>
            <div className="text-xs font-medium" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>
              Cold-Chain Intelligence
            </div>
          </div>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-2">
          {['Dashboard', 'Shipments', 'Analytics', 'Reports'].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                item === 'Dashboard'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30 shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-600/50'
              }`}
              style={{
                fontFamily: 'DM Sans',
                background: item === 'Dashboard' ? undefined : 'none',
                border: item === 'Dashboard' ? undefined : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: live indicator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/30">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                background: '#00e676',
                boxShadow: '0 0 8px #00e676',
              }}
            />
            <span className="text-sm font-medium" style={{ color: '#4a6080', fontFamily: 'IBM Plex Mono' }}>
              LIVE
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-700/50 text-sm font-medium"
            style={{
              color: '#00d4ff',
              fontFamily: 'IBM Plex Mono',
            }}
          >
            <Shield size={14} style={{ color: '#00d4ff' }} />
            GMP Compliant
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
