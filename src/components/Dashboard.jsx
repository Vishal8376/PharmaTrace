import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import ShipmentCard from './ShipmentCard'
import AlertBanner from './AlertBanner'
import { RefreshCw, Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

// ─── Dashboard ────────────────────────────────────────────────────────────────
// Main dashboard page. Fetches shipment data from Firebase Firestore,
// computes summary stats, and renders cards + alert banner.
// ──────────────────────────────────────────────────────────────────────────────

function Dashboard() {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAlert, setShowAlert] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // ─── fetchShipments ──────────────────────────────────────────────────────
  // Fetches all documents from the Firestore "shipments" collection.
  // Each doc must have: id, location, temperature, history[]
  // ─────────────────────────────────────────────────────────────────────────
  const fetchShipments = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get all documents from the "shipments" collection in Firestore
      const querySnapshot = await getDocs(collection(db, 'shipments'))

      const data = []
      querySnapshot.forEach((doc) => {
        // Merge Firestore doc id with the document data
        data.push({ docId: doc.id, ...doc.data() })
      })

      setShipments(data)
      setLastRefresh(new Date())
      setShowAlert(true) // Re-show alert banner on refresh
    } catch (err) {
      console.error('Firestore fetch error:', err)
      setError('Failed to connect to Firebase. Please check your firebase.js config.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount
  useEffect(() => {
    fetchShipments()
  }, [])

  // ─── Compute stats ────────────────────────────────────────────────────────
  const getStatus = (temp) => {
    if (temp <= 8)  return 'Safe'
    if (temp <= 10) return 'Warning'
    return 'Critical'
  }

  const stats = {
    total:    shipments.length,
    safe:     shipments.filter(s => getStatus(s.temperature) === 'Safe').length,
    warning:  shipments.filter(s => getStatus(s.temperature) === 'Warning').length,
    critical: shipments.filter(s => getStatus(s.temperature) === 'Critical').length,
  }

  const criticalShipments = shipments.filter(s => getStatus(s.temperature) === 'Critical')

  // ─── Stat cards config ────────────────────────────────────────────────────
  const statCards = [
    { label: 'Total Shipments', value: stats.total,    icon: Package,       color: '#00d4ff' },
    { label: 'Safe',            value: stats.safe,     icon: CheckCircle,   color: '#00e676' },
    { label: 'Warning',         value: stats.warning,  icon: TrendingUp,    color: '#ff9800' },
    { label: 'Critical',        value: stats.critical, icon: AlertTriangle, color: '#ff3d3d' },
  ]

  // ─── Loading skeleton ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header skeleton */}
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 animate-pulse"></div>
                <div>
                  <div className="h-8 w-48 bg-slate-800/50 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-slate-800/30 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="w-32 h-12 bg-slate-800/50 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-800/50"></div>
                  <div>
                    <div className="h-8 w-12 bg-slate-800/50 rounded mb-2"></div>
                    <div className="h-4 w-20 bg-slate-800/30 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="p-6">
                  <div className="h-4 w-3/4 bg-slate-800/50 rounded mb-4"></div>
                  <div className="h-6 w-1/2 bg-slate-800/50 rounded mb-3"></div>
                  <div className="h-2 w-full bg-slate-800/30 rounded mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-8 bg-slate-800/30 rounded"></div>
                    <div className="h-3 w-8 bg-slate-800/30 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-lg border border-slate-700/50">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span style={{ color: '#64748b', fontFamily: 'IBM Plex Mono' }}>
                Connecting to Firebase Firestore...
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Error state ─────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="rounded-2xl p-12 text-center bg-slate-900/90 backdrop-blur-xl border border-red-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} style={{ color: '#ff3d3d' }} />
              </div>
              <div className="text-2xl font-semibold mb-3" style={{ color: '#ff3d3d', fontFamily: 'Space Grotesk' }}>
                Firebase Connection Error
              </div>
              <div className="text-sm mb-8 max-w-md mx-auto" style={{ color: '#94a3b8' }}>{error}</div>

              <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700/50">
                <div className="text-left text-sm" style={{ color: '#00d4ff', fontFamily: 'IBM Plex Mono', marginBottom: 12 }}>
                  📋 Setup checklist:
                </div>
                <div className="space-y-2 text-sm" style={{ color: '#94a3b8', fontFamily: 'IBM Plex Mono' }}>
                  <div>1. Go to firebase.js → paste your firebaseConfig</div>
                  <div>2. Enable Firestore in Firebase Console</div>
                  <div>3. Create "shipments" collection with sample documents</div>
                  <div>4. See README.md for the exact data structure</div>
                </div>
              </div>

              <button
                onClick={fetchShipments}
                className="px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/40 hover:border-blue-400/60"
                style={{ color: '#00d4ff', fontFamily: 'Space Grotesk' }}
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Main Dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

      {/* Page header */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                <Package size={24} style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <h1
                  className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  PharmaTrace
                </h1>
                <div className="text-sm font-medium" style={{ color: '#00d4ff', fontFamily: 'IBM Plex Mono' }}>
                  Cold-Chain Intelligence Platform
                </div>
              </div>
            </div>
            <div className="text-sm mt-3 pl-15" style={{ color: '#64748b', fontFamily: 'IBM Plex Mono' }}>
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchShipments}
            className="flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/40 hover:border-blue-400/60 group"
            style={{
              color: '#00d4ff',
              fontFamily: 'Space Grotesk',
            }}
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-300" />
            <span className="font-semibold">Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {showAlert && (
        <AlertBanner
          criticalShipments={criticalShipments}
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map(({ label, value, icon: Icon, color }, index) => (
          <div
            key={label}
            className="rounded-2xl p-6 flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl border hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden"
            style={{
              borderColor: `${color}40`,
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}></div>

            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              style={{ background: `${color}20`, border: `1px solid ${color}40` }}
            >
              <Icon size={24} style={{ color }} />
            </div>
            <div className="relative z-10">
              <div
                className="text-4xl font-bold mb-1"
                style={{ color, fontFamily: 'Space Grotesk', lineHeight: 1 }}
              >
                {value}
              </div>
              <div className="text-sm font-medium" style={{ color: '#94a3b8' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Shipment Cards Grid ───────────────────────────────────────────── */}
      {shipments.length === 0 ? (
        <div className="rounded-2xl p-16 text-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/30 flex items-center justify-center mx-auto mb-6">
              <Package size={40} style={{ color: '#64748b' }} />
            </div>
            <div className="text-xl font-semibold mb-3" style={{ color: '#94a3b8', fontFamily: 'Space Grotesk' }}>
              No shipments found
            </div>
            <div className="text-sm max-w-md mx-auto" style={{ color: '#64748b', fontFamily: 'IBM Plex Mono' }}>
              Add documents to the Firestore "shipments" collection to see your cold-chain data
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {shipments.map((shipment, index) => (
            <div
              key={shipment.docId || shipment.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ShipmentCard
                shipment={shipment}
                index={index}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-sm" style={{ color: '#64748b', fontFamily: 'IBM Plex Mono' }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Firebase Firestore
          </div>
          <div className="w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#64748b', fontFamily: 'IBM Plex Mono' }}>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            Google Gemini AI
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
export default Dashboard