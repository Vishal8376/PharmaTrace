import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#060d1a' }}>
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default App
