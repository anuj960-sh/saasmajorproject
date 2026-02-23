// ═══════════════════════════════════════════════════
//  src/App.jsx  — MAIN APP
// ═══════════════════════════════════════════════════

import { useState } from 'react'
import './styles/globals.css'

import Navbar    from './components/Navbar'
import Sidebar   from './components/Sidebar'
import Landing   from './components/Landing'
import Dashboard from './components/Dashboard'
import Projects  from './components/Projects'
import Tasks     from './components/Tasks'
import Analytics from './components/Analytics'
import Calendar  from './components/Calendar'
import AICommand from './components/AICommand'
import { AmbientOrbs } from './components/UIComponents'

const PAGES = {
  dashboard: Dashboard,
  projects:  Projects,
  tasks:     Tasks,
  analytics: Analytics,
  calendar:  Calendar,
  aicommand: AICommand,
}

export default function App() {
  const [loggedIn,    setLoggedIn]    = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage,  setActivePage]  = useState('dashboard')

  // ── Landing page (not logged in) ──
  if (!loggedIn) return <Landing onLogin={() => setLoggedIn(true)} />

  const PageComponent = PAGES[activePage] || Dashboard

  return (
    <div style={{ minHeight: '100vh', background: '#00000a' }}>
      {/* Background effects */}
      <div className="grid-bg" />
      <div className="scanlines" />
      <div className="noise" />
      <AmbientOrbs />

      {/* Fixed nav + sidebar */}
      <Navbar toggleSidebar={() => setSidebarOpen(o => !o)} />
      <Sidebar
        active={activePage}
        setActive={setActivePage}
        open={sidebarOpen}
      />

      {/* Page content */}
      <main style={{
        marginLeft: sidebarOpen ? 258 : 0,
        paddingTop: 70,
        padding: '86px 26px 40px',
        transition: 'margin-left 0.4s cubic-bezier(0.4,0,0.2,1)',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        <PageComponent />
      </main>
    </div>
  )
}