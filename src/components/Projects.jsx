 
// src/components/Projects.jsx
// (Full code — copy-paste ready)
// Yeh file HTML ke Projects component se directly liya gaya hai
// Sirf import aur export add kiye hain

import { useState } from 'react'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('grid')
  const [modal, setModal] = useState(false)
  const [newProj, setNewProj] = useState({ name: '', desc: '', deadline: '', priority: 'HIGH' })
  const [projs, setProjs] = useState([
    { id:1, name:'NEXUS Backend API',      desc:'Core REST API services for enterprise platform',          progress:78, priority:'HIGH',     status:'active',    team:5, due:'Apr 15', c:'#00f5ff', tasks:34, done:26, cat:'Backend'  },
    { id:2, name:'Mobile App v3.0',        desc:'Cross-platform app with biometric authentication',        progress:45, priority:'CRITICAL', status:'critical',  team:8, due:'Mar 28', c:'#ff0080', tasks:56, done:25, cat:'Mobile'   },
    { id:3, name:'Analytics Engine',       desc:'ML-powered analytics and reporting system',               progress:92, priority:'MED',      status:'completed', team:3, due:'Mar 20', c:'#00ff88', tasks:28, done:26, cat:'Data'     },
    { id:4, name:'Auth System Overhaul',   desc:'Zero-trust security architecture implementation',         progress:30, priority:'HIGH',     status:'pending',   team:4, due:'May 01', c:'#b400ff', tasks:42, done:13, cat:'Security' },
    { id:5, name:'Dashboard 2.0 Redesign', desc:'Next-gen UI with 3D visualization components',           progress:65, priority:'MED',      status:'active',    team:6, due:'Apr 30', c:'#ffd700', tasks:39, done:25, cat:'Frontend' },
    { id:6, name:'DevOps Pipeline',        desc:'CI/CD automation with AI-based deployment checks',       progress:55, priority:'LOW',      status:'active',    team:3, due:'May 15', c:'#ff6b00', tasks:22, done:12, cat:'DevOps'   },
  ])

  const filtered = filter === 'all' ? projs : projs.filter(p => p.status === filter)

  const addProject = () => {
    if (!newProj.name.trim()) return
    const colors = ['#00f5ff','#b400ff','#ff0080','#00ff88','#ffd700','#ff6b00']
    setProjs(prev => [...prev, { id: prev.length + 1, ...newProj, progress: 0, status: 'pending', team: 1, done: 0, tasks: 0, cat: 'New', c: colors[prev.length % colors.length] }])
    setNewProj({ name: '', desc: '', deadline: '', priority: 'HIGH' })
    setModal(false)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, animation: 'fadeInUp 0.5s ease' }}>
        <div>
          <div className="holo-tag" style={{ marginBottom: 8 }}>◈ PROJECT REGISTRY</div>
          <h1 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '2.6rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 4 }}>All <span className="neon-purple">Projects</span></h1>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', color: 'rgba(110,110,170,0.6)' }}>{projs.length} projects · {projs.filter(p => p.status === 'active').length} active</p>
        </div>
        <button className="btn-solid" onClick={() => setModal(true)}>+ NEW PROJECT</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {['all','active','critical','pending','completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Orbitron,sans-serif', fontSize: '0.58rem', letterSpacing: '1.5px', textTransform: 'uppercase', background: filter===f ? '#00f5ff' : 'rgba(0,245,255,0.04)', color: filter===f ? '#000' : 'rgba(130,130,180,0.6)', boxShadow: filter===f ? '0 0 20px rgba(0,245,255,0.4)' : 'none', transition: 'all 0.3s' }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['grid','list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ width: 36, height: 36, borderRadius: 8, border: view===v ? '1px solid rgba(0,245,255,0.3)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: view===v ? 'rgba(0,245,255,0.1)' : 'transparent', color: view===v ? '#00f5ff' : 'rgba(130,130,180,0.4)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>{v==='grid' ? '⬡' : '≡'}</button>
          ))}
        </div>
      </div>

      {/* Grid/List */}
      <div style={{ display: view==='grid' ? 'grid' : 'flex', flexDirection: view==='list' ? 'column' : undefined, gridTemplateColumns: view==='grid' ? 'repeat(3,1fr)' : undefined, gap: 18 }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="glass-card" style={{ padding: 24, cursor: 'pointer', animation: `fadeInUp 0.5s ease ${i*0.07}s both`, transition: 'all 0.35s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=p.c; e.currentTarget.style.boxShadow=`0 0 45px ${p.c}10`; e.currentTarget.style.transform='translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,245,255,0.15)'; e.currentTarget.style.boxShadow=''; e.currentTarget.style.transform='' }}>
            <div style={{ height: 3, background: `linear-gradient(90deg,${p.c},${p.c}25)`, borderRadius: 2, marginBottom: 16, boxShadow: `0 0 10px ${p.c}` }} />
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              <span className="holo-tag" style={{ fontSize: '0.52rem' }}>{p.cat}</span>
              <span className={`badge badge-${p.status}`}>{p.status}</span>
            </div>
            <h3 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '1rem', fontWeight: 700, color: '#e8e8ff', marginBottom: 5 }}>{p.name}</h3>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '0.85rem', color: 'rgba(100,100,160,0.6)', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
              {[{v:`${p.done}/${p.tasks}`,l:'TASKS',c:p.c},{v:`${p.team}`,l:'TEAM',c:'#b400ff'},{v:p.due,l:'DUE',c:'#ffd700'},{v:p.priority,l:'PRIORITY',c:p.c}].map((m,j) => (
                <div key={j} style={{ textAlign: 'center', padding: '8px 0', borderRadius: 7, background: `${m.c}06` }}>
                  <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.7rem', fontWeight: 700, color: m.c }}>{m.v}</div>
                  <div style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.48rem', color: 'rgba(80,80,130,0.4)', letterSpacing: '1px', marginTop: 2 }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.56rem', color: 'rgba(80,80,130,0.4)' }}>PROGRESS</span>
                <span style={{ fontFamily: 'Orbitron,sans-serif', fontSize: '0.65rem', color: p.c, fontWeight: 700 }}>{p.progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg,${p.c},${p.c}65)` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,8,0.95)', backdropFilter: 'blur(24px)', animation: 'fadeIn 0.3s ease' }}
          onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="glass-premium" style={{ width: 480, padding: '42px 38px', animation: 'fadeInUp 0.4s ease' }}>
            <div className="holo-tag" style={{ marginBottom: 10 }}>+ INITIALIZE PROJECT</div>
            <h2 style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: '2rem', letterSpacing: '3px', marginBottom: 28, color: '#e8e8ff' }}>New <span className="neon-cyan">Project</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[{lbl:'PROJECT NAME',ph:'e.g. Authentication Service',key:'name'},{lbl:'DESCRIPTION',ph:'Brief project overview...',key:'desc'},{lbl:'DEADLINE',ph:'e.g. Apr 30',key:'deadline'}].map(f => (
                <div key={f.lbl}>
                  <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', letterSpacing: '2px', color: 'rgba(0,245,255,0.55)', display: 'block', marginBottom: 7 }}>{f.lbl} //</label>
                  <input className="input-neon" placeholder={f.ph} value={newProj[f.key]} onChange={e => setNewProj(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'Share Tech Mono,monospace', fontSize: '0.58rem', letterSpacing: '2px', color: 'rgba(0,245,255,0.55)', display: 'block', marginBottom: 7 }}>PRIORITY //</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['CRITICAL','HIGH','MED','LOW'].map(p => (
                    <button key={p} onClick={() => setNewProj(n => ({ ...n, priority: p }))} style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: 'Orbitron,sans-serif', fontSize: '0.54rem', letterSpacing: '1px', background: newProj.priority===p ? 'rgba(0,245,255,0.15)' : 'rgba(0,245,255,0.03)', color: newProj.priority===p ? '#00f5ff' : 'rgba(130,130,180,0.5)', borderBottom: newProj.priority===p ? '2px solid #00f5ff' : '2px solid transparent', transition: 'all 0.2s' }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-solid" style={{ flex: 1 }} onClick={addProject}>INITIALIZE →</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setModal(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
