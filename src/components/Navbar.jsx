// ═══════════════════════════════════════════════════
//  src/components/Navbar.jsx
// ═══════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import { LogoIcon } from './UIComponents'

export default function Navbar({ toggleSidebar }) {
  const [time, setTime] = useState(new Date())
  const [notifs, setNotifs] = useState(4)
  const [showN, setShowN] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const nlist = [
    { icon: '✓', text: 'Sprint #12 milestone reached', time: 'just now', c: '#00ff88' },
    { icon: '⚠', text: 'Mobile App deadline in 2 days', time: '5m', c: '#ff0080' },
    { icon: '◈', text: 'AI detected a project risk', time: '22m', c: '#ffd700' },
    { icon: '⊕', text: 'New member K.Patel joined', time: '1h', c: '#00f5ff' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 70, zIndex: 500,
      background: 'rgba(2,1,12,0.96)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(0,245,255,0.08)', display: 'flex',
      alignItems: 'center', padding: '0 20px', gap: 14,
      boxShadow: '0 4px 40px rgba(0,0,0,0.7)', animation: 'slideDown 0.6s ease'
    }}>

      {/* ── HAMBURGER ── */}
      <button onClick={toggleSidebar} style={{
        background: 'none', border: '1px solid rgba(0,245,255,0.18)', borderRadius: 8,
        width: 38, height: 38, cursor: 'pointer', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 5, transition: 'all 0.3s'
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00f5ff'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,245,255,0.3)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.18)'; e.currentTarget.style.boxShadow = '' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 14, height: 1.5, background: '#00f5ff', borderRadius: 1, boxShadow: '0 0 4px #00f5ff' }} />)}
      </button>

      {/* ── LOGO ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto' }}>
        <LogoIcon size={30} />
        <div>
          <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.95rem', fontWeight: 900, letterSpacing: '3px', lineHeight: 1 }}>
            intterprices level saas<span style={{ color: '#00f5ff', textShadow: '0 0 8px #00f5ff' }}>PM</span>
          </div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.46rem', color: 'rgba(0,245,255,0.28)', letterSpacing: '2px' }}>saas project </div>
        </div>
      </div>

      {/* ── CLOCK ── */}
      <div style={{
        fontFamily: 'Share Tech Mono,monospace', fontSize: '0.82rem',
        color: 'rgba(0,245,255,0.6)', letterSpacing: '2px', padding: '6px 16px',
        border: '1px solid rgba(0,245,255,0.1)', borderRadius: 8, background: 'rgba(0,245,255,0.02)'
      }}>
        {time.toLocaleTimeString('en-US', { hour12: false })}
        <span style={{ color: 'rgba(0,245,255,0.25)', fontSize: '0.6rem' }}> UTC+5:30</span>
      </div>

      {/* ── STATUS INDICATORS ── */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[{ lbl: 'API', v: '12ms', c: '#00ff88' }, { lbl: 'DB', v: '3ms', c: '#00ff88' }, { lbl: 'AI', v: '98ms', c: '#ffd700' }].map(s => (
          <div key={s.lbl} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', letterSpacing: '1px',
            padding: '4px 10px', border: `1px solid ${s.c}20`, borderRadius: 5, background: `${s.c}06`
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.c, boxShadow: `0 0 5px ${s.c}`, animation: 'bpulse 2s ease-in-out infinite' }} />
            <span style={{ color: 'rgba(150,150,200,0.5)' }}>{s.lbl}</span>
            <span style={{ color: s.c }}>{s.v}</span>
          </div>
        ))}
      </div>

      {/* ── NOTIFICATIONS ── */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setShowN(n => !n)} style={{
          background: 'none', border: '1px solid rgba(0,245,255,0.18)', borderRadius: 8,
          width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#00f5ff', fontSize: '1.1rem', position: 'relative', transition: 'all 0.3s'
        }}>
          ◉
          {notifs > 0 && (
            <span style={{
              position: 'absolute', top: -5, right: -5, width: 18, height: 18,
              background: 'linear-gradient(135deg,#ff0080,#ff6b00)', borderRadius: '50%',
              fontSize: '0.55rem', fontFamily: 'Orbitron,sans-serif', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 10px #ff0080'
            }}>{notifs}</span>
          )}
        </button>

        {showN && (
          <div className="glass-card" style={{ position: 'absolute', top: 52, right: 0, width: 310, padding: 18, zIndex: 600, animation: 'fadeInUp 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.62rem', letterSpacing: '2px', color: '#00f5ff' }}>NOTIFICATIONS</span>
              <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', color: 'rgba(100,100,150,0.45)', cursor: 'pointer' }}
                onClick={() => setNotifs(0)}>CLEAR ALL</span>
            </div>
            {nlist.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < nlist.length - 1 ? '1px solid rgba(0,245,255,0.05)' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${n.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.c, fontSize: '0.8rem', flexShrink: 0, border: `1px solid ${n.c}20` }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem', color: '#e8e8ff', marginBottom: 2 }}>{n.text}</div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', color: 'rgba(90,90,140,0.45)' }}>{n.time} ago</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── USER AVATAR ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div>
          <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', color: '#e8e8ff', letterSpacing: '1px', textAlign: 'right' }}>ADMIN</div>
          <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.52rem', color: '#00ff88', letterSpacing: '1px', textAlign: 'right' }}>SUPER_USER</div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg,#00f5ff,#b400ff)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', fontWeight: 900,
          color: '#000', cursor: 'pointer', boxShadow: '0 0 18px rgba(0,245,255,0.4)', flexShrink: 0
        }}>AD</div>
      </div>
    </nav>
  )
}