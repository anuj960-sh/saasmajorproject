// ═══════════════════════════════════════════════════
//  src/components/Sidebar.jsx
// ═══════════════════════════════════════════════════

export default function Sidebar({ active, setActive, open }) {
  const items = [
    { id: 'dashboard', icon: '⬡', label: 'DASHBOARD', c: '#00f5ff' },
    { id: 'projects',  icon: '◈', label: 'PROJECTS',  c: '#b400ff' },
    { id: 'tasks',     icon: '◊', label: 'TASKS',     c: '#00ff88' },
    { id: 'analytics', icon: '◉', label: 'ANALYTICS', c: '#ff0080' },
    { id: 'calendar',  icon: '▣', label: 'CALENDAR',  c: '#ffd700' },
    { id: 'aicommand', icon: '◎', label: 'AI COMMAND',c: '#ff6b00', badge: 'AI' },
  ]
  const sys = [
    { id: 'team',     icon: '⊕', label: 'TEAM'     },
    { id: 'settings', icon: '⟡', label: 'SETTINGS' },
  ]

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 70, bottom: 0, width: 258,
      background: 'rgba(2,1,12,0.97)', backdropFilter: 'blur(24px)',
      borderRight: '1px solid rgba(0,245,255,0.07)', padding: '22px 12px',
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
      zIndex: 400, display: 'flex', flexDirection: 'column', overflowY: 'auto'
    }}>

      {/* ── SECTION LABEL ── */}
      <div style={{ marginBottom: 16, padding: '0 8px' }}>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', letterSpacing: '3px', color: 'rgba(0,245,255,0.28)', marginBottom: 6 }}>NAVIGATION //</div>
        <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(0,245,255,0.2),transparent)' }} />
      </div>

      {/* ── NAV ITEMS ── */}
      {items.map((item, i) => (
        <button key={item.id} onClick={() => setActive(item.id)} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
          borderRadius: 10, cursor: 'pointer', border: 'none', textAlign: 'left',
          background: active === item.id ? `linear-gradient(135deg,${item.c}12,${item.c}05)` : 'transparent',
          borderLeft: active === item.id ? `2px solid ${item.c}` : '2px solid transparent',
          boxShadow: active === item.id ? `0 0 25px ${item.c}10` : 'none',
          transition: 'all 0.3s', animation: `fadeInLeft 0.4s ease ${i * 0.07}s both`, marginBottom: 4
        }}
          onMouseEnter={e => { if (active !== item.id) { e.currentTarget.style.background = `${item.c}06`; e.currentTarget.style.borderLeftColor = `${item.c}35` } }}
          onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderLeftColor = 'transparent' } }}>

          <span style={{ fontSize: '1.05rem', color: active === item.id ? item.c : 'rgba(120,120,180,0.35)', textShadow: active === item.id ? `0 0 12px ${item.c}` : 'none', transition: 'all 0.3s' }}>{item.icon}</span>
          <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.62rem', letterSpacing: '2px', color: active === item.id ? item.c : 'rgba(120,120,170,0.5)', fontWeight: active === item.id ? 700 : 400, transition: 'all 0.3s', flex: 1 }}>{item.label}</span>

          {item.badge && (
            <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.48rem', letterSpacing: '1px', padding: '2px 6px', borderRadius: 3, background: `${item.c}18`, border: `1px solid ${item.c}35`, color: item.c }}>{item.badge}</span>
          )}
          {active === item.id && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.c, boxShadow: `0 0 7px ${item.c}`, animation: 'bpulse 2s ease-in-out infinite', flexShrink: 0 }} />
          )}
        </button>
      ))}

      {/* ── DIVIDER ── */}
      <div style={{ margin: '14px 8px' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.14),transparent)' }} />
      </div>

      {/* ── SYSTEM SECTION ── */}
      <div style={{ padding: '0 8px', marginBottom: 8 }}>
        <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', letterSpacing: '3px', color: 'rgba(0,245,255,0.22)' }}>SYSTEM //</div>
      </div>
      {sys.map(item => (
        <button key={item.id} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10,
          cursor: 'pointer', border: 'none', background: 'transparent',
          borderLeft: '2px solid transparent', transition: 'all 0.3s', marginBottom: 3
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,245,255,0.03)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ fontSize: '0.95rem', color: 'rgba(100,100,160,0.3)' }}>{item.icon}</span>
          <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(100,100,155,0.4)' }}>{item.label}</span>
        </button>
      ))}

      {/* ── USER PROFILE (bottom) ── */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.14),transparent)', marginBottom: 14 }} />
        <div className="glass-card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#00f5ff,#b400ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', fontWeight: 900, color: '#000', flexShrink: 0, boxShadow: '0 0 14px rgba(0,245,255,0.4)' }}>AD</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', letterSpacing: '1px', color: '#e8e8ff', marginBottom: 2 }}>ADMIN</div>
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', color: '#00ff88', letterSpacing: '1px' }}>● SUPER_USER</div>
          </div>
        </div>
      </div>
    </aside>
  )
}