// ═══════════════════════════════════════════════════
//  src/components/UIComponents.jsx
//  Shared reusable components — Particles, LogoIcon,
//  TypeWriter, Counter, MiniBar, RadialProgress, LineChart
// ═══════════════════════════════════════════════════

import { useState, useEffect, useMemo } from 'react'

/* ── PARTICLES ── */
export const Particles = () => {
  const pts = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 15 + 8,
    del: Math.random() * 10,
    c: ['#00f5ff', '#b400ff', '#ff0080', '#00ff88', '#ffd700'][i % 5]
  })), [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {pts.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.s}px`, height: `${p.s}px`, borderRadius: '50%',
          background: p.c, boxShadow: `0 0 ${p.s * 5}px ${p.c}`, opacity: 0.4,
          animation: `float ${p.dur}s ease-in-out ${p.del}s infinite`
        }} />
      ))}
    </div>
  )
}

/* ── AMBIENT ORBS ── */
export const AmbientOrbs = () => (
  <>
    <div style={{ position: 'fixed', width: 700, height: 700, background: 'radial-gradient(circle,rgba(180,0,255,0.12),transparent)', top: -300, left: -200, filter: 'blur(140px)', animation: 'orb 10s ease-in-out infinite alternate', pointerEvents: 'none', zIndex: 0, borderRadius: '50%' }} />
    <div style={{ position: 'fixed', width: 600, height: 600, background: 'radial-gradient(circle,rgba(0,245,255,0.1),transparent)', bottom: -200, right: -100, filter: 'blur(120px)', animation: 'orb 8s ease-in-out 5s infinite alternate', pointerEvents: 'none', zIndex: 0, borderRadius: '50%' }} />
    <div style={{ position: 'fixed', width: 400, height: 400, background: 'radial-gradient(circle,rgba(255,0,128,0.07),transparent)', top: '35%', left: '35%', filter: 'blur(90px)', animation: 'orb 12s ease-in-out 2s infinite alternate', pointerEvents: 'none', zIndex: 0, borderRadius: '50%' }} />
    <div style={{ position: 'fixed', width: 300, height: 300, background: 'radial-gradient(circle,rgba(255,215,0,0.05),transparent)', top: '60%', left: '15%', filter: 'blur(80px)', animation: 'orb 7s ease-in-out 3s infinite alternate', pointerEvents: 'none', zIndex: 0, borderRadius: '50%' }} />
  </>
)

/* ── LOGO ICON ── */
export const LogoIcon = ({ size = 36 }) => (
  <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <div style={{ position: 'absolute', inset: 0, border: '2px solid #00f5ff', borderRadius: '8px', animation: 'spin 6s linear infinite', boxShadow: '0 0 14px rgba(0,245,255,0.45)' }} />
    <div style={{ position: 'absolute', inset: '5px', border: '1px solid #b400ff', borderRadius: '4px', animation: 'spinR 4s linear infinite' }} />
    <div style={{ width: '8px', height: '8px', background: 'linear-gradient(135deg,#00f5ff,#b400ff)', borderRadius: '2px', boxShadow: '0 0 12px #00f5ff' }} />
  </div>
)

/* ── TYPEWRITER ── */
export const TypeWriter = ({ texts }) => {
  const [cur, setCur] = useState(0)
  const [disp, setDisp] = useState('')
  const [typing, setTyping] = useState(true)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const text = texts[cur]
    if (typing) {
      if (idx < text.length) {
        const t = setTimeout(() => { setDisp(text.slice(0, idx + 1)); setIdx(i => i + 1) }, 60)
        return () => clearTimeout(t)
      } else {
        setTimeout(() => setTyping(false), 2500)
      }
    } else {
      if (idx > 0) {
        const t = setTimeout(() => { setDisp(text.slice(0, idx - 1)); setIdx(i => i - 1) }, 28)
        return () => clearTimeout(t)
      } else {
        setCur(c => (c + 1) % texts.length)
        setTyping(true)
      }
    }
  }, [idx, typing, cur, texts])

  return (
    <span style={{ color: '#00f5ff', textShadow: '0 0 18px #00f5ff' }}>
      {disp}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
    </span>
  )
}

/* ── ANIMATED COUNTER ── */
export const Counter = ({ to, suffix = '', dur = 2000 }) => {
  const [n, setN] = useState(0)
  useEffect(() => {
    let s = null
    const fn = (ts) => {
      if (!s) s = ts
      const p = Math.min((ts - s) / dur, 1)
      const e = 1 - Math.pow(1 - p, 4)
      setN(Math.floor(e * to))
      if (p < 1) requestAnimationFrame(fn)
    }
    requestAnimationFrame(fn)
  }, [to, dur])
  return <span>{n.toLocaleString()}{suffix}</span>
}

/* ── MINI BAR CHART ── */
export const MiniBar = ({ data, color }) => {
  const mx = Math.max(...data)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '44px' }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, background: `linear-gradient(180deg,${color},${color}40)`,
          borderRadius: '2px 2px 0 0', height: `${(v / mx) * 100}%`,
          boxShadow: `0 0 6px ${color}50`, minHeight: '3px',
          animation: `barRise 0.8s ease ${i * 0.07}s both`, transformOrigin: 'bottom'
        }} />
      ))}
    </div>
  )
}

/* ── RADIAL PROGRESS ── */
export const RadialProgress = ({ value, color, sz = 96, label }) => {
  const r = 36, circ = 2 * Math.PI * r, offset = circ - (value / 100) * circ
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width={sz} height={sz} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
          <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.88rem', fontWeight: '700', color, textShadow: `0 0 8px ${color}` }}>{value}%</span>
        </div>
      </div>
      <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.7rem', color: 'rgba(130,130,190,0.5)', letterSpacing: '1px', marginTop: 5 }}>{label}</div>
    </div>
  )
}

/* ── LINE CHART ── */
export const LineChart = ({ data, color, h = 120 }) => {
  const W = 400, PH = 20, PV = 12, w = W - PH * 2, ht = h - PV * 2
  const mx = Math.max(...data), mn = Math.min(...data), rng = mx - mn || 1
  const pts = data.map((v, i) => ({ x: PH + (i / (data.length - 1)) * w, y: PV + ht - ((v - mn) / rng) * ht }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const area = `${path} L${pts[pts.length - 1].x},${PV + ht} L${PH},${PV + ht} Z`
  const gid = `grad_${color.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      ))}
    </svg>
  )
}

/* ── 3D HOLO CUBE (Landing page mein use hota hai) ── */
export const HoloCube = () => {
  const faces = [
    { tr: 'translateZ(150px)', bg: 'rgba(0,245,255,0.05)', bd: '1px solid rgba(0,245,255,0.4)' },
    { tr: 'translateZ(-150px) rotateY(180deg)', bg: 'rgba(180,0,255,0.05)', bd: '1px solid rgba(180,0,255,0.4)' },
    { tr: 'rotateY(90deg) translateZ(150px)', bg: 'rgba(255,0,128,0.04)', bd: '1px solid rgba(255,0,128,0.35)' },
    { tr: 'rotateY(-90deg) translateZ(150px)', bg: 'rgba(0,255,136,0.04)', bd: '1px solid rgba(0,255,136,0.35)' },
    { tr: 'rotateX(90deg) translateZ(150px)', bg: 'rgba(0,245,255,0.03)', bd: '1px solid rgba(0,245,255,0.25)' },
    { tr: 'rotateX(-90deg) translateZ(150px)', bg: 'rgba(255,215,0,0.03)', bd: '1px solid rgba(255,215,0,0.25)' },
  ]
  return (
    <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', perspective: '1000px', pointerEvents: 'none' }}>
      <div style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', animation: 'rotateCube 16s linear infinite' }}>
        {faces.map((f, i) => (
          <div key={i} style={{
            position: 'absolute', width: '300px', height: '300px', left: '50%', top: '50%',
            marginLeft: '-150px', marginTop: '-150px', transform: f.tr,
            background: f.bg, border: f.bd, backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {i === 0 && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', color: '#00f5ff', letterSpacing: '4px', marginBottom: 14, textShadow: '0 0 12px #00f5ff' }}>NEXUS PM</div>
                {['PROJECT.sys', 'TASK.api', 'TEAM.net', 'ANALYTICS.io', 'AI.core'].map(t => (
                  <div key={t} style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.55rem', color: 'rgba(0,245,255,0.45)', lineHeight: '2.2', letterSpacing: '1px' }}>{t}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        {[[380, '#00f5ff', '8s', '0deg', '0deg'], [320, '#b400ff', '5.5s', '72deg', '0deg'], [350, '#ff0080', '10s', '0deg', '48deg'], [400, 'rgba(255,215,0,0.3)', '14s', '35deg', '60deg']].map(([s, c, d, rx, ry], i) => (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%', marginLeft: `-${s / 2}px`, marginTop: `-${s / 2}px`,
            width: `${s}px`, height: `${s}px`, border: `1px solid ${c}`, borderRadius: '50%',
            boxShadow: `0 0 18px ${c}35,inset 0 0 18px ${c}10`,
            transform: `rotateX(${rx}) rotateY(${ry})`, animation: `spin ${d} linear infinite`
          }} />
        ))}
      </div>
    </div>
  )
}