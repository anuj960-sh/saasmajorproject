import { useState } from 'react'

export default function Tasks() {
  const [view, setView] = useState('kanban')
  const [filter, setFilter] = useState('all')
  const [tasks, setTasks] = useState([
    {id:'T-001',title:'Design REST API endpoints',    proj:'NEXUS Backend', assignee:'A.Singh', priority:'HIGH',     status:'completed',due:'Mar 15',pts:8, c:'#00f5ff'},
    {id:'T-002',title:'Implement JWT authentication', proj:'Auth System',   assignee:'S.Kumar', priority:'CRITICAL', status:'active',   due:'Mar 28',pts:13,c:'#ff0080'},
    {id:'T-003',title:'Set up PostgreSQL schemas',    proj:'NEXUS Backend', assignee:'R.Sharma',priority:'HIGH',     status:'active',   due:'Mar 20',pts:5, c:'#00f5ff'},
    {id:'T-004',title:'Create React component library',proj:'Dashboard 2.0',assignee:'P.Gupta', priority:'MED',      status:'pending',  due:'Apr 10',pts:8, c:'#ffd700'},
    {id:'T-005',title:'Configure CI/CD pipeline',    proj:'DevOps Pipeline',assignee:'M.Joshi', priority:'MED',      status:'active',   due:'Apr 15',pts:5, c:'#ff6b00'},
    {id:'T-006',title:'ML model integration',         proj:'Analytics Engine',assignee:'A.Singh',priority:'CRITICAL',status:'completed',due:'Mar 10',pts:21,c:'#00ff88'},
    {id:'T-007',title:'Mobile push notifications',   proj:'Mobile App v3.0',assignee:'S.Kumar', priority:'HIGH',     status:'pending',  due:'Mar 25',pts:5, c:'#ff0080'},
    {id:'T-008',title:'Write unit tests for auth',   proj:'Auth System',   assignee:'R.Sharma',priority:'LOW',      status:'pending',  due:'May 01',pts:3, c:'#b400ff'},
    {id:'T-009',title:'Deploy AI recommendation model',proj:'Analytics Engine',assignee:'A.Singh',priority:'CRITICAL',status:'active', due:'Apr 05',pts:13,c:'#00ff88'},
  ])
  const [dragId, setDragId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)

  const filtered = filter==='all' ? tasks : tasks.filter(t=>t.priority===filter)
  const cols = ['pending','active','completed']
  const colCfg = {
    pending:   {label:'BACKLOG',     c:'#ff6b00', icon:'○'},
    active:    {label:'IN PROGRESS', c:'#00f5ff', icon:'◉'},
    completed: {label:'DONE',        c:'#00ff88', icon:'✓'},
  }

  const handleDrop = (status) => {
    if (dragId) { setTasks(prev => prev.map(t => t.id===dragId ? {...t, status} : t)); setDragId(null); setDragOverCol(null) }
  }

  return (
    <div style={{position:'relative',zIndex:1}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:28,animation:'fadeInUp 0.5s ease'}}>
        <div>
          <div className="holo-tag" style={{marginBottom:8}}>◊ TASK MATRIX</div>
          <h1 style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2.6rem',letterSpacing:'4px',textTransform:'uppercase',marginBottom:4}}>Task <span className="neon-green">Control</span></h1>
          <p style={{fontFamily:'Rajdhani,sans-serif',fontSize:'1rem',color:'rgba(110,110,170,0.6)'}}>{tasks.length} tasks · Drag & drop to update status</p>
        </div>
        <button className="btn-solid">+ NEW TASK</button>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:10}}>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {['all','CRITICAL','HIGH','MED','LOW'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:'7px 14px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:'Orbitron,sans-serif',fontSize:'0.57rem',letterSpacing:'1px',background:filter===f?'#00f5ff':'rgba(0,245,255,0.04)',color:filter===f?'#000':'rgba(130,130,180,0.55)',boxShadow:filter===f?'0 0 18px rgba(0,245,255,0.4)':'none',transition:'all 0.3s'}}>{f}</button>
          ))}
        </div>
        <div style={{display:'flex',gap:6}}>
          {['kanban','list'].map(v=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:'7px 14px',borderRadius:8,border:view===v?'1px solid rgba(0,245,255,0.3)':'1px solid rgba(255,255,255,0.05)',cursor:'pointer',fontFamily:'Orbitron,sans-serif',fontSize:'0.57rem',letterSpacing:'1px',background:view===v?'rgba(0,245,255,0.1)':'transparent',color:view===v?'#00f5ff':'rgba(130,130,180,0.4)',transition:'all 0.3s'}}>{v.toUpperCase()}</button>
          ))}
        </div>
      </div>
      {view==='kanban'&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {cols.map(col=>{
            const colTasks=filtered.filter(t=>t.status===col)
            const cfg=colCfg[col]
            return(
              <div key={col} onDragOver={e=>{e.preventDefault();setDragOverCol(col)}} onDrop={()=>handleDrop(col)}>
                <div style={{padding:'10px 14px',borderRadius:10,marginBottom:12,background:dragOverCol===col?`${cfg.c}12`:`${cfg.c}07`,border:`1px solid ${dragOverCol===col?cfg.c:`${cfg.c}22`}`,display:'flex',justifyContent:'space-between',alignItems:'center',transition:'all 0.2s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:7}}>
                    <span style={{color:cfg.c,fontSize:'0.9rem'}}>{cfg.icon}</span>
                    <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.6rem',letterSpacing:'2px',color:cfg.c}}>{cfg.label}</span>
                  </div>
                  <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.68rem',color:cfg.c,background:`${cfg.c}14`,padding:'2px 10px',borderRadius:20,border:`1px solid ${cfg.c}28`}}>{colTasks.length}</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {colTasks.map((t,i)=>(
                    <div key={t.id} className="glass-card" style={{padding:'14px',cursor:'grab',animation:`fadeInUp 0.4s ease ${i*0.06}s both`,borderLeft:`3px solid ${t.c}`,transition:'all 0.3s',opacity:dragId===t.id?0.5:1}}
                      draggable onDragStart={()=>setDragId(t.id)} onDragEnd={()=>{setDragId(null);setDragOverCol(null)}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateX(4px)';e.currentTarget.style.boxShadow=`0 0 22px ${t.c}12`}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
                        <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.57rem',color:t.c,letterSpacing:'1px'}}>{t.id}</span>
                        <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.5rem',padding:'2px 7px',borderRadius:4,background:t.priority==='CRITICAL'?'rgba(255,0,128,0.1)':'rgba(255,107,0,0.1)',color:t.priority==='CRITICAL'?'#ff0080':'#ff6b00'}}>{t.priority}</span>
                      </div>
                      <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.92rem',fontWeight:600,color:'#e8e8ff',marginBottom:5,lineHeight:1.4}}>{t.title}</div>
                      <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:'rgba(80,80,160,0.45)',marginBottom:10}}>{t.proj}</div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div style={{display:'flex',alignItems:'center',gap:5}}>
                          <div style={{width:18,height:18,borderRadius:'50%',background:`linear-gradient(135deg,${t.c},${t.c}50)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.47rem',fontFamily:'Orbitron,sans-serif',color:'#000',fontWeight:700}}>{t.assignee[0]}{t.assignee.includes('.')?t.assignee.split('.')[1][0]:''}</div>
                          <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:'rgba(100,100,160,0.5)'}}>{t.assignee}</span>
                        </div>
                        <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.5rem',padding:'1px 6px',background:'rgba(180,0,255,0.1)',color:'#b400ff',borderRadius:3,border:'1px solid rgba(180,0,255,0.18)'}}>{t.pts}pt</span>
                      </div>
                    </div>
                  ))}
                  <div style={{padding:16,border:'1px dashed rgba(0,245,255,0.08)',borderRadius:10,textAlign:'center',fontFamily:'Share Tech Mono,monospace',fontSize:'0.56rem',color:'rgba(0,245,255,0.18)',letterSpacing:'2px',background:dragOverCol===col?'rgba(0,245,255,0.04)':'transparent',transition:'all 0.2s'}}>
                    {dragOverCol===col?'▼ DROP HERE':'+ DRAG TASKS HERE'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {view==='list'&&(
        <div className="glass-card" style={{overflow:'hidden'}}>
          <div style={{padding:'14px 22px',borderBottom:'1px solid rgba(0,245,255,0.06)',display:'grid',gridTemplateColumns:'70px 1fr 140px 100px 85px 90px 85px',gap:14}}>
            {['ID','TASK','PROJECT','ASSIGNEE','PRIORITY','DUE','STATUS'].map(h=>(
              <span key={h} style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.56rem',color:'rgba(0,245,255,0.4)',letterSpacing:'2px'}}>{h}</span>
            ))}
          </div>
          {filtered.map((t,i)=>(
            <div key={t.id} style={{padding:'12px 22px',borderBottom:'1px solid rgba(0,245,255,0.04)',display:'grid',gridTemplateColumns:'70px 1fr 140px 100px 85px 90px 85px',gap:14,alignItems:'center',transition:'all 0.2s',cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.background=`${t.c}04`}
              onMouseLeave={e=>e.currentTarget.style.background=''}>
              <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.6rem',color:t.c}}>{t.id}</span>
              <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.92rem',fontWeight:600,color:'#e8e8ff'}}>{t.title}</span>
              <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:'rgba(100,100,160,0.4)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.proj}</span>
              <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.6rem',color:'rgba(130,130,180,0.55)'}}>{t.assignee}</span>
              <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.52rem',padding:'2px 7px',borderRadius:4,display:'inline-block',background:'rgba(255,0,128,0.1)',color:t.priority==='CRITICAL'?'#ff0080':'#ff6b00'}}>{t.priority}</span>
              <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.6rem',color:'#ffd700'}}>{t.due}</span>
              <span className={`badge badge-${t.status}`} style={{fontSize:'0.5rem',padding:'2px 8px'}}>{t.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
