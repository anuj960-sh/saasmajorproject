// ═══════════════════════════════════════════════════
//  src/components/Dashboard.jsx
// ═══════════════════════════════════════════════════
import { AmbientOrbs, Counter, MiniBar, RadialProgress } from './UIComponents'

export default function Dashboard() {
  const stats = [
    { label: 'Active Projects', val: 24,  c: '#00f5ff', icon: '◈', bars: [12,18,15,22,19,24,24], trend: '+8%'  },
    { label: 'Tasks Complete',  val: 847, c: '#00ff88', icon: '✓', bars: [60,75,80,88,82,90,95], trend: '+12%' },
    { label: 'Team Members',    val: 38,  c: '#b400ff', icon: '⊕', bars: [28,30,32,30,33,36,38], trend: '+5%'  },
    { label: 'Avg Velocity',    val: 94,  c: '#ff0080', icon: '◉', bars: [78,82,85,88,86,92,94], trend: '+3%', suf: '%' },
  ]
  const projs = [
    { name: 'NEXUS Backend API',      progress: 78, status: 'active',    team: 5, due: 'Apr 15', c: '#00f5ff' },
    { name: 'Mobile App v3.0',        progress: 45, status: 'critical',  team: 8, due: 'Mar 28', c: '#ff0080' },
    { name: 'Analytics Engine',       progress: 92, status: 'completed', team: 3, due: 'Mar 20', c: '#00ff88' },
    { name: 'Auth System Overhaul',   progress: 30, status: 'pending',   team: 4, due: 'May 01', c: '#b400ff' },
    { name: 'Dashboard 2.0 Redesign', progress: 65, status: 'active',    team: 6, due: 'Apr 30', c: '#ffd700' },
  ]
  const feed = [
    { user: 'S.KUMAR',   action: 'completed task',   target: 'API Integration #23',    time: '2m',  c: '#00ff88', icon: '✓' },
    { user: 'AI.AGENT',  action: 'detected risk in', target: 'Mobile App deadline',    time: '5m',  c: '#ffd700', icon: '◎' },
    { user: 'R.SHARMA',  action: 'created project',  target: 'Mobile Dashboard',       time: '15m', c: '#00f5ff', icon: '◈' },
    { user: 'A.SINGH',   action: 'flagged critical', target: 'Database Migration',     time: '1h',  c: '#ff0080', icon: '⚠' },
    { user: 'P.GUPTA',   action: 'updated status',   target: 'Frontend Sprint #4',     time: '2h',  c: '#b400ff', icon: '◊' },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="grid-bg" style={{ position: 'fixed', opacity: 0.35 }} />
      <AmbientOrbs />

      {/* Page Header */}
      <div style={{ marginBottom: 30, animation: 'fadeInUp 0.5s ease' }}>
        <div className="holo-tag" style={{ marginBottom: 8 }}>◈ CONTROL CENTER</div>
        <h1 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '2.6rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 4 }}>Mission <span className="neon-cyan">Dashboard</span></h1>
        <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', color: 'rgba(110,110,170,0.6)' }}>Real-time overview · All systems nominal · AI monitoring active</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '22px', animation: `fadeInUp 0.5s ease ${i * 0.08}s both`, transition: 'all 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.boxShadow = `0 0 40px ${s.c}15` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'; e.currentTarget.style.boxShadow = '' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '2.2rem', color: s.c, textShadow: `0 0 20px ${s.c}`, lineHeight: 1, letterSpacing: '2px' }}>
                  <Counter to={s.val} suffix={s.suf || ''} />
                </div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.72rem', color: 'rgba(120,120,170,0.5)', marginTop: 3, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${s.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.c}22`, fontSize: '0.95rem', color: s.c }}>{s.icon}</div>
            </div>
            <MiniBar data={s.bars} color={s.c} />
            <div style={{ marginTop: 7, fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: '#00ff88' }}>↑ {s.trend} this week</div>
          </div>
        ))}
      </div>

      {/* Projects + Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: 20, marginBottom: 20 }}>
        <div className="glass-card" style={{ padding: 26, animation: 'fadeInUp 0.6s ease 0.25s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
            <div>
              <div className="holo-tag" style={{ marginBottom: 6, fontSize: '0.58rem' }}>◈ LIVE</div>
              <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.76rem', letterSpacing: '2px', color: '#e8e8ff' }}>ACTIVE PROJECTS</h2>
            </div>
            <button className="btn-ghost" style={{ fontSize: '0.58rem', padding: '6px 14px' }}>VIEW ALL</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projs.map((p, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: 10, background: `${p.c}05`, border: `1px solid ${p.c}12`, transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.c}30`; e.currentTarget.style.background = `${p.c}0d` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${p.c}12`; e.currentTarget.style.background = `${p.c}05` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                  <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#e8e8ff' }}>{p.name}</span>
                  <span className={`badge badge-${p.status}`}>{p.status.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="progress-track" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg,${p.c},${p.c}70)` }} />
                  </div>
                  <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.68rem', color: p.c, fontWeight: 700, minWidth: 30 }}>{p.progress}%</span>
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.56rem', color: 'rgba(90,90,140,0.4)', whiteSpace: 'nowrap' }}>DUE {p.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card" style={{ padding: 20, animation: 'fadeInUp 0.6s ease 0.3s both' }}>
            <div className="holo-tag" style={{ marginBottom: 14, fontSize: '0.55rem' }}>◉ PERFORMANCE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, placeItems: 'center' }}>
              <RadialProgress value={87} color="#00f5ff" sz={90} label="On-Time" />
              <RadialProgress value={94} color="#00ff88" sz={90} label="Quality" />
              <RadialProgress value={72} color="#b400ff" sz={90} label="Capacity" />
              <RadialProgress value={98} color="#ff0080" sz={90} label="Uptime" />
            </div>
          </div>
          <div className="glass-card" style={{ padding: 20, animation: 'fadeInUp 0.6s ease 0.35s both' }}>
            <div className="holo-tag" style={{ marginBottom: 12, fontSize: '0.55rem' }}>⟡ QUICK ACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[['+ NEW PROJECT', '#00f5ff'], ['+ CREATE TASK', '#00ff88'], ['+ ADD MEMBER', '#b400ff'], ['◎ ASK AI AGENT', '#ffd700']].map(([lbl, c], i) => (
                <button key={i} style={{ padding: '9px 12px', background: `${c}06`, border: `1px solid ${c}20`, borderRadius: 8, color: c, fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', letterSpacing: '2px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${c}12`; e.currentTarget.style.boxShadow = `0 0 16px ${c}15` }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${c}06`; e.currentTarget.style.boxShadow = '' }}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-card" style={{ padding: 26, animation: 'fadeInUp 0.6s ease 0.4s both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="holo-tag" style={{ marginBottom: 6, fontSize: '0.55rem' }}>⬡ LIVE FEED</div>
            <h2 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.76rem', letterSpacing: '2px', color: '#e8e8ff' }}>ACTIVITY STREAM</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', animation: 'bpulse 1.5s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: '#00ff88' }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {feed.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 9, background: `${a.c}05`, border: `1px solid ${a.c}10`, animation: `fadeInLeft 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${a.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.c, fontSize: '0.75rem', flexShrink: 0, border: `1px solid ${a.c}25` }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.6rem', color: a.c }}>{a.user}</span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem', color: 'rgba(130,130,180,0.65)' }}> {a.action} </span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem', color: '#e8e8ff', fontWeight: 600 }}>{a.target}</span>
              </div>
              <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', color: 'rgba(80,80,130,0.4)', flexShrink: 0 }}>{a.time} ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 