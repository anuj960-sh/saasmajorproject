// ═══════════════════════════════════════════════════
//  src/components/Landing.jsx
// ═══════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import { Particles, AmbientOrbs, LogoIcon, TypeWriter, Counter, HoloCube } from './UIComponents'

export default function Landing({ onLogin }) {
  const [showModal, setShowModal] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [email,     setEmail]     = useState('')
  const [pass,      setPass]      = useState('')
  const [mouseX,    setMouseX]    = useState(0.5)
  const [mouseY,    setMouseY]    = useState(0.5)
  const [loadPct,   setLoadPct]   = useState(0)

  useEffect(() => {
    const h = e => { setMouseX(e.clientX / window.innerWidth); setMouseY(e.clientY / window.innerHeight) }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const doLogin = () => {
    setLoading(true)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 12
      setLoadPct(Math.min(p, 100))
      if (p >= 100) { clearInterval(iv); setTimeout(() => { setLoading(false); onLogin() }, 300) }
    }, 120)
  }

  const features = [
    { icon: '◈', title: 'Neural Task Engine',     desc: 'AI-powered task distribution with predictive deadline & risk analysis', c: '#00f5ff', tag: 'AI CORE' },
    { icon: '⬡', title: 'Holographic Dashboard',  desc: 'Real-time 3D metrics, live team activity, and smart KPI cards',        c: '#b400ff', tag: 'VISUALIZATION' },
    { icon: '◊', title: 'Quantum Analytics',       desc: 'Pattern recognition, burndown charts, and velocity forecasting',        c: '#00ff88', tag: 'INTELLIGENCE' },
    { icon: '⊕', title: 'Live Sync Protocol',      desc: 'Zero-latency collaboration with presence indicators and threads',       c: '#ff0080', tag: 'REALTIME' },
    { icon: '◉', title: 'AI Command Center',       desc: 'Natural language commands to create tasks, assign, and query data',     c: '#ffd700', tag: 'NEW' },
    { icon: '⟡', title: 'Sprint Calendar',         desc: 'Smart sprint planning with drag-drop scheduling and Gantt view',        c: '#ff6b00', tag: 'NEW' },
    { icon: '▣', title: 'Resource Matrix',         desc: 'Team capacity planning with workload heatmaps and skill matching',      c: '#0099ff', tag: 'ENTERPRISE' },
    { icon: '◎', title: 'Risk Radar',              desc: 'Automated risk scoring, blocker detection, and escalation workflows',   c: '#b400ff', tag: 'AI CORE' },
    { icon: '⊡', title: 'Audit Vault',             desc: 'Full activity audit trail with role-based controls and compliance',     c: '#00ff88', tag: 'SECURITY' },
  ]

  const stats = [
    { label: 'Active Projects',  val: 18492, suf: '',  c: '#00f5ff' },
    { label: 'Tasks Completed',  val: 99,    suf: '%', c: '#00ff88' },
    { label: 'Team Members',     val: 8200,  suf: '+', c: '#b400ff' },
    { label: 'Enterprises',      val: 520,   suf: '+', c: '#ffd700' },
  ]

  const plans = [
    { name: 'STARTER',    price: '$49',    per: '/mo', features: ['5 Projects', '10 Members', 'Basic Analytics', 'Email Support'],                              c: '#00f5ff', popular: false },
    { name: 'PRO',        price: '$149',   per: '/mo', features: ['Unlimited Projects', '50 Members', 'AI Analytics', 'Priority Support', 'API Access'],        c: '#b400ff', popular: true  },
    { name: 'ENTERPRISE', price: 'Custom', per: '',    features: ['Unlimited Everything', 'Dedicated Instance', 'SLA Guarantee', 'White Label', '24/7 Support'], c: '#ffd700', popular: false },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#00000a', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg" /><div className="scanlines" /><div className="noise" />
      <Particles /><AmbientOrbs />

      {/* Mouse light follow */}
      <div style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 0,
        left: `${mouseX * 100}%`, top: `${mouseY * 100}%`,
        width: 800, height: 800, marginLeft: -400, marginTop: -400,
        background: 'radial-gradient(circle,rgba(0,245,255,0.045) 0%,transparent 70%)',
        filter: 'blur(60px)', transition: 'left 0.5s ease,top 0.5s ease', borderRadius: '50%'
      }} />
 
      {/* Moving scanline */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.08),transparent)', animation: 'scanline 8s linear infinite', top: 0 }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', background: 'rgba(0,0,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(0,245,255,0.09)', animation: 'slideDown 0.7s ease', boxShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoIcon size={38} />
          <div>
            <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.15rem', fontWeight: 900, letterSpacing: '4px', color: '#e8e8ff', lineHeight: 1 }}>interprice  lavel saas project workforce managment systam<span className="neon-cyan">PM</span></div>
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.52rem', color: 'rgba(0,245,255,0.35)', letterSpacing: '3px' }}>ENTERPRISE </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Platform', 'Features', 'Pricing', 'Enterprise'].map(x => (
            <span key={x} style={{ fontFamily: 'Rajdhani,sans-serif', color: 'rgba(160,160,210,0.5)', cursor: 'pointer', fontSize: '0.95rem', letterSpacing: '1px', transition: 'color 0.3s', fontWeight: 600 }}
              onMouseEnter={e => e.target.style.color = '#00f5ff'} onMouseLeave={e => e.target.style.color = 'rgba(160,160,210,0.5)'}>{x}</span>
          ))}
          <button className="btn-solid" style={{ padding: '9px 22px', fontSize: '0.65rem' }} onClick={() => setShowModal(true)}>ACCESS SYSTEM →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '110px 6% 70px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '620px', animation: 'fadeInLeft 1s ease' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <div className="holo-tag">◈ ENTERPRISE SAAS </div>
            <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', letterSpacing: '2px', padding: '4px 12px', borderRadius: 4, background: 'linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,107,0,0.08))', border: '1px solid rgba(255,215,0,0.3)', color: '#ffd700', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ animation: 'bpulse 1.5s infinite', width: 5, height: 5, borderRadius: '50%', background: '#ffd700', display: 'inline-block' }} />
              AI-POWERED
            </div>
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 'clamp(3.5rem,7vw,6.5rem)', lineHeight: 0.9, marginBottom: 18, letterSpacing: '3px', textTransform: 'uppercase' }}>
            THE FUTURE<br />
            <span className="shimmer-text">OF PROJECT</span><br />
            MANAGEMENT
          </h1>
          <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '1.1rem', marginBottom: 22, color: 'rgba(200,200,255,0.65)', minHeight: '2rem', letterSpacing: '1px' }}>
            <TypeWriter texts={['Manage Projects with Neural AI', 'Track Tasks in Real-Time', 'Analyze Team Performance', 'Scale to Enterprise Level', 'Command via Natural Language']} />
          </div>
          <p style={{ fontSize: '1.1rem', color: 'rgba(140,140,190,0.7)', lineHeight: 2, marginBottom: 38, fontFamily: 'Rajdhani,sans-serif', fontWeight: 400, maxWidth: 520 }}>
            Next-generation SaaS platform for elite teams. AI command center, quantum analytics, and real-time collaboration — engineered for 2030.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
            <button className="btn-solid" style={{ padding: '14px 32px', fontSize: '0.72rem' }} onClick={() => setShowModal(true)}>LAUNCH PLATFORM →</button>
            <button className="btn-outline" style={{ padding: '14px 32px', fontSize: '0.72rem' }}>WATCH DEMO ▶</button>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            {['SOC 2 Certified', '99.99% Uptime', 'GDPR Compliant'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#00ff88', fontSize: '0.7rem' }}>✓</span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.82rem', color: 'rgba(130,130,180,0.55)', letterSpacing: '1px' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <HoloCube />
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '40px 6%', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,245,255,0.06)', borderBottom: '1px solid rgba(0,245,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '26px', textAlign: 'center', animation: `fadeInUp 0.6s ease ${i * 0.1}s both`, transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.boxShadow = `0 0 35px ${s.c}18` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'; e.currentTarget.style.boxShadow = '' }}>
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '2.2rem', fontWeight: 900, color: s.c, textShadow: `0 0 25px ${s.c}`, marginBottom: 6 }}><Counter to={s.val} suffix={s.suf} /></div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', color: 'rgba(130,130,180,0.55)', fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '90px 6%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="holo-tag" style={{ marginBottom: 16, justifyContent: 'center' }}>⬡ CAPABILITIES</div>
          <h2 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '3rem', letterSpacing: '4px', marginBottom: 10 }}>Core <span className="neon-cyan">Modules</span></h2>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', color: 'rgba(120,120,180,0.55)', fontSize: '1.05rem' }}>9 enterprise-grade modules, fully integrated</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: 28, cursor: 'pointer', animation: `fadeInUp 0.5s ease ${i * 0.07}s both`, transition: 'all 0.35s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = f.c; e.currentTarget.style.boxShadow = `0 0 45px ${f.c}14`; e.currentTarget.style.transform = 'translateY(-5px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.15)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}>
              <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'Share Tech Mono,monospace', fontSize: '0.52rem', letterSpacing: '2px', padding: '2px 8px', borderRadius: 3, background: `${f.c}12`, border: `1px solid ${f.c}25`, color: f.c }}>{f.tag}</div>
              <div style={{ height: 3, width: 40, background: `linear-gradient(90deg,${f.c},${f.c}40)`, borderRadius: 2, marginBottom: 16, boxShadow: `0 0 8px ${f.c}` }} />
              <div style={{ fontSize: '1.8rem', marginBottom: 12, color: f.c, textShadow: `0 0 16px ${f.c}` }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.75rem', letterSpacing: '2px', color: f.c, marginBottom: 9, textTransform: 'uppercase' }}>{f.title}</h3>
              <p style={{ fontFamily: 'Rajdhani,sans-serif', color: 'rgba(130,130,180,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '80px 6%', position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <div className="holo-tag" style={{ marginBottom: 16, justifyContent: 'center' }}>◈ PRICING</div>
          <h2 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '3rem', letterSpacing: '4px' }}>Choose Your <span className="neon-gold">Plan</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, maxWidth: '1000px', margin: '0 auto' }}>
          {plans.map((p, i) => (
            <div key={i} style={{ padding: '34px 28px', borderRadius: 20, position: 'relative', transition: 'all 0.35s', cursor: 'pointer', background: p.popular ? 'linear-gradient(135deg,rgba(180,0,255,0.08),rgba(0,245,255,0.05))' : 'rgba(8,4,28,0.9)', border: p.popular ? `1px solid ${p.c}` : '1px solid rgba(0,245,255,0.12)', boxShadow: p.popular ? `0 0 50px ${p.c}18,0 30px 80px rgba(0,0,0,0.7)` : '0 20px 60px rgba(0,0,0,0.5)', animation: `fadeInUp 0.5s ease ${i * 0.1}s both`, backdropFilter: 'blur(24px)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 0 60px ${p.c}25,0 40px 90px rgba(0,0,0,0.8)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = p.popular ? `0 0 50px ${p.c}18,0 30px 80px rgba(0,0,0,0.7)` : '0 20px 60px rgba(0,0,0,0.5)' }}>
              {p.popular && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', letterSpacing: '3px', padding: '5px 16px', borderRadius: 20, background: `linear-gradient(135deg,${p.c},${p.c}80)`, color: '#000', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: `0 0 20px ${p.c}50` }}>MOST POPULAR</div>}
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', letterSpacing: '4px', color: p.c, marginBottom: 14 }}>{p.name}</div>
              <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '3.5rem', color: '#e8e8ff', lineHeight: 1, marginBottom: 4 }}>{p.price}<span style={{ fontSize: '1.2rem', color: 'rgba(140,140,190,0.5)' }}>{p.per}</span></div>
              <div style={{ height: 1, background: `linear-gradient(90deg,${p.c}40,transparent)`, margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 26 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: p.c, fontSize: '0.75rem', fontWeight: 700 }}>✓</span>
                    <span style={{ fontFamily: 'Rajdhani,sans-serif', color: 'rgba(160,160,200,0.75)', fontSize: '0.95rem' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '12px', borderRadius: 9, border: `1px solid ${p.c}`, cursor: 'pointer', fontFamily: 'Orbitron,sans-serif', fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase', background: p.popular ? p.c : 'transparent', color: p.popular ? '#000' : p.c, boxShadow: p.popular ? `0 0 25px ${p.c}50` : 'none', transition: 'all 0.3s' }}
                onClick={() => setShowModal(true)}>
                {p.price === 'Custom' ? 'CONTACT SALES' : 'GET STARTED →'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '30px 6%', borderTop: '1px solid rgba(0,245,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoIcon size={28} />
          <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.85rem', color: 'rgba(80,80,130,0.55)', letterSpacing: '2px' }}>NEXUSPM © 2030</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Security', 'Status'].map(x => (
            <span key={x} style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.85rem', color: 'rgba(100,100,150,0.4)', cursor: 'pointer', letterSpacing: '1px', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#00f5ff'} onMouseLeave={e => e.target.style.color = 'rgba(100,100,150,0.4)'}>{x}</span>
          ))}
        </div>
        <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,245,255,0.25)' }}>v3.0.0 · BUILD 2030.06</span>
      </footer>

      {/* ── LOGIN MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,8,0.95)', backdropFilter: 'blur(28px)', animation: 'fadeIn 0.3s ease' }}
          onClick={e => e.target === e.currentTarget && !loading && setShowModal(false)}>
          <div className="glass-premium" style={{ width: 440, padding: '48px 42px', animation: 'fadeInUp 0.45s ease', position: 'relative' }}>
            {/* Corner decorations */}
            {[{ t: 14, l: 14 }, { t: 14, r: 14 }, { b: 14, l: 14 }, { b: 14, r: 14 }].map((c, i) => (
              <div key={i} style={{ position: 'absolute', width: 20, height: 20, top: c.t ?? 'auto', bottom: c.b ?? 'auto', left: c.l ?? 'auto', right: c.r ?? 'auto', borderTop: c.t !== undefined ? '2px solid rgba(0,245,255,0.6)' : 'none', borderBottom: c.b !== undefined ? '2px solid rgba(0,245,255,0.6)' : 'none', borderLeft: c.l !== undefined ? '2px solid rgba(0,245,255,0.6)' : 'none', borderRight: c.r !== undefined ? '2px solid rgba(0,245,255,0.6)' : 'none' }} />
            ))}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}><LogoIcon size={44} /></div>
              <div className="holo-tag" style={{ justifyContent: 'center', margin: '0 auto 10px' }}>◈ SECURE GATEWAY</div>
              <h2 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '2.2rem', letterSpacing: '4px', marginTop: 10 }}>System <span className="neon-cyan">Login</span></h2>
              <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.9rem', color: 'rgba(120,120,170,0.5)', marginTop: 4 }}>Enterprise Authentication Protocol v3</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 26 }}>
              {[{ lbl: 'USER_IDENTIFIER //', ph: 'agent@nexuspm.io', val: email, set: setEmail, type: 'email' }, { lbl: 'ACCESS_CREDENTIAL //', ph: '••••••••••••', val: pass, set: setPass, type: 'password' }].map(f => (
                <div key={f.lbl}>
                  <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(0,245,255,0.55)', display: 'block', marginBottom: 8 }}>{f.lbl}</label>
                  <input className="input-neon" type={f.type} placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} disabled={loading} />
                </div>
              ))}
            </div>
            {loading && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: 'rgba(0,245,255,0.5)' }}>AUTHENTICATING...</span>
                  <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.6rem', color: '#00ff88' }}>{Math.round(loadPct)}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(0,245,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${loadPct}%`, background: 'linear-gradient(90deg,#00f5ff,#b400ff)', borderRadius: 2, transition: 'width 0.15s', boxShadow: '0 0 10px #00f5ff' }} />
                </div>
              </div>
            )}
            <button className="btn-solid" style={{ width: '100%', padding: 16, fontSize: '0.72rem', letterSpacing: '3px' }} onClick={doLogin} disabled={loading}>
              {loading ? 'PROCESSING...' : 'INITIATE SESSION →'}
            </button>
            <p style={{ textAlign: 'center', marginTop: 14, fontFamily: 'Rajdhani,sans-serif', fontSize: '0.88rem', color: 'rgba(110,110,160,0.4)' }}>Demo mode — any credentials accepted</p>
          </div>
        </div>
      )}
    </div>
  )
}