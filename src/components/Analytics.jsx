
import { LineChart, RadialProgress } from './UIComponents'

export default function Analytics() {
  const vel  = [42,58,45,72,65,88,94]
  const comp = [65,70,68,78,82,88,92]
  const burn = [120,108,96,85,74,60,48,35,22,15]
  const team = [
    {name:'S.Kumar', tasks:47,score:96,role:'LEAD DEV', c:'#00f5ff'},
    {name:'A.Singh', tasks:38,score:89,role:'BACKEND',  c:'#00ff88'},
    {name:'R.Sharma',tasks:42,score:92,role:'FRONTEND', c:'#b400ff'},
    {name:'P.Gupta', tasks:29,score:78,role:'UI/UX',    c:'#ffd700'},
    {name:'M.Joshi', tasks:35,score:85,role:'DEVOPS',   c:'#ff6b00'},
  ]
  return (
    <div style={{position:'relative',zIndex:1}}>
      <div style={{marginBottom:30,animation:'fadeInUp 0.5s ease'}}>
        <div className="holo-tag" style={{marginBottom:8}}>◉ DATA INTELLIGENCE</div>
        <h1 style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2.6rem',letterSpacing:'4px',textTransform:'uppercase',marginBottom:4}}>Analytics <span className="neon-pink">Nexus</span></h1>
        <p style={{fontFamily:'Rajdhani,sans-serif',fontSize:'1rem',color:'rgba(110,110,170,0.6)'}}>Deep performance insights · Predictive metrics · AI-driven analysis</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:14,marginBottom:20}}>
        {[{l:'Sprint Score',v:'94.2',u:'/100',c:'#00f5ff',t:'↑ +2.1'},{l:'Bug Rate',v:'2.1',u:'%',c:'#00ff88',t:'↓ -0.8'},{l:'Coverage',v:'87',u:'%',c:'#b400ff',t:'↑ +4'},{l:'Deploy Freq',v:'3.4',u:'/day',c:'#ffd700',t:'↑ +0.6'},{l:'MTTR',v:'12',u:'min',c:'#ff0080',t:'↓ -3min'}].map((m,i)=>(
          <div key={i} className="glass-card" style={{padding:'20px',textAlign:'center',transition:'all 0.3s'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=m.c}
            onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(0,245,255,0.15)'}>
            <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2rem',color:m.c,textShadow:`0 0 16px ${m.c}`,letterSpacing:'2px'}}>{m.v}<span style={{fontSize:'0.85rem',opacity:0.55}}>{m.u}</span></div>
            <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.72rem',color:'rgba(100,100,160,0.5)',letterSpacing:'1px',margin:'4px 0'}}>{m.l}</div>
            <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.58rem',color:'#00ff88'}}>{m.t}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:18}}>
        {[[vel,'#00f5ff','SPRINT VELOCITY TREND',['MON','TUE','WED','THU','FRI','SAT','SUN'],'↑ VELOCITY'],[comp,'#00ff88','TASK COMPLETION RATE',['W1','W2','W3','W4','W5','W6','W7'],'◈ COMPLETION']].map(([d,c,t,labels,tag],i)=>(
          <div key={i} className="glass-card" style={{padding:26}}>
            <div style={{marginBottom:16}}>
              <div className="holo-tag" style={{marginBottom:6,fontSize:'0.56rem'}}>{tag}</div>
              <h3 style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#e8e8ff'}}>{t}</h3>
            </div>
            <LineChart data={d} color={c} h={110}/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
              {labels.map(l=><span key={l} style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.5rem',color:`${c}35`}}>{l}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:18,marginBottom:18}}>
        <div className="glass-card" style={{padding:26}}>
          <div style={{marginBottom:20}}>
            <div className="holo-tag" style={{marginBottom:6,fontSize:'0.56rem'}}>⊕ TEAM INTEL</div>
            <h3 style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#e8e8ff'}}>TEAM PERFORMANCE MATRIX</h3>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:11}}>
            {team.map((m,i)=>(
              <div key={i} style={{padding:'14px',borderRadius:10,background:`${m.c}05`,border:`1px solid ${m.c}12`,display:'flex',alignItems:'center',gap:14,transition:'all 0.3s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=`${m.c}28`}
                onMouseLeave={e=>e.currentTarget.style.borderColor=`${m.c}12`}>
                <div style={{width:38,height:38,borderRadius:'50%',flexShrink:0,background:`linear-gradient(135deg,${m.c},${m.c}45)`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Orbitron,sans-serif',fontSize:'0.6rem',fontWeight:900,color:'#000',boxShadow:`0 0 14px ${m.c}40`}}>
                  {m.name.split('.')[0][0]}{m.name.split('.')[1][0]}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:7}}>
                    <div>
                      <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.65rem',color:'#e8e8ff'}}>{m.name}</span>
                      <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.52rem',color:m.c,marginLeft:8}}>{m.role}</span>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:m.c,letterSpacing:'2px'}}>{m.score}</div>
                      <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.5rem',color:'rgba(80,80,130,0.4)'}}>{m.tasks} tasks</div>
                    </div>
                  </div>
                  <div className="progress-track"><div style={{height:'100%',width:`${m.score}%`,borderRadius:3,background:`linear-gradient(90deg,${m.c},${m.c}60)`,boxShadow:`0 0 7px ${m.c}`}}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card" style={{padding:26}}>
          <div style={{marginBottom:18}}>
            <div className="holo-tag" style={{marginBottom:6,fontSize:'0.56rem'}}>◊ DISTRIBUTION</div>
            <h3 style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#e8e8ff'}}>PROJECT STATUS</h3>
          </div>
          <div style={{position:'relative',width:150,height:150,margin:'0 auto 20px'}}>
            <svg width="150" height="150" style={{transform:'rotate(-90deg)'}}>
              {[[45,'#00f5ff',0],[25,'#ff0080',45],[20,'#00ff88',70],[10,'#b400ff',90]].map(([pct,c,off],i)=>{
                const r=55,circ=2*Math.PI*r,dash=(pct/100)*circ,rotOff=(off/100)*circ
                return <circle key={i} cx="75" cy="75" r={r} fill="none" stroke={c} strokeWidth="18" strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-rotOff} style={{filter:`drop-shadow(0 0 6px ${c})`}}/>
              })}
            </svg>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.8rem',color:'#00f5ff',textShadow:'0 0 16px #00f5ff',lineHeight:1}}>24</div>
              <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.5rem',color:'rgba(80,80,130,0.4)'}}>PROJECTS</div>
            </div>
          </div>
          {[{l:'Active',pct:45,c:'#00f5ff',n:11},{l:'Critical',pct:25,c:'#ff0080',n:6},{l:'Done',pct:20,c:'#00ff88',n:5},{l:'Pending',pct:10,c:'#b400ff',n:2}].map((item,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(0,245,255,0.04)'}}>
              <div style={{display:'flex',alignItems:'center',gap:7}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:item.c,boxShadow:`0 0 5px ${item.c}`}}/>
                <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.9rem',color:'rgba(130,130,180,0.6)'}}>{item.l}</span>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.6rem',color:item.c}}>{item.pct}%</span>
                <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:'rgba(80,80,130,0.4)'}}>{item.n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card" style={{padding:26}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <div>
            <div className="holo-tag" style={{marginBottom:6,fontSize:'0.56rem'}}>↓ BURNDOWN</div>
            <h3 style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#e8e8ff'}}>SPRINT BURNDOWN — SPRINT #12</h3>
          </div>
          <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.62rem',color:'#00ff88'}}>▼ 87.5% COMPLETE</div>
        </div>
        <LineChart data={burn} color="#ff0080" h={120}/>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
          {['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10'].map(d=><span key={d} style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.5rem',color:'rgba(255,0,128,0.25)'}}>{d}</span>)}
        </div>
      </div>
    </div>
  )
}