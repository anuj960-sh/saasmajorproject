
// src/components/Calendar.jsx
import { useState } from 'react'

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(22)
  const [currentMonth] = useState({name:'FEBRUARY',year:2030})
  const events = {
    3:[{title:'Sprint #12 Start',c:'#00f5ff',time:'09:00'}],
    8:[{title:'API Review',c:'#b400ff',time:'14:00'},{title:'Team Standup',c:'#00ff88',time:'10:00'}],
    12:[{title:'Mobile App Deadline',c:'#ff0080',time:'EOD'}],
    15:[{title:'Analytics Demo',c:'#ffd700',time:'15:30'}],
    18:[{title:'Client Presentation',c:'#ff6b00',time:'11:00'},{title:'Code Review',c:'#00f5ff',time:'16:00'}],
    22:[{title:'Sprint Planning',c:'#00f5ff',time:'09:00'},{title:'Auth System Review',c:'#b400ff',time:'14:00'},{title:'1:1 with Team Lead',c:'#00ff88',time:'17:00'}],
    25:[{title:'Dashboard 2.0 Demo',c:'#ffd700',time:'13:00'}],
    28:[{title:'Sprint #12 End',c:'#ff0080',time:'EOD'},{title:'Monthly Review',c:'#b400ff',time:'15:00'}],
  }
  const days = Array.from({length:28},(_,i)=>i+1)
  const weekDays = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const firstDay = 2
  const todayEvents = events[selectedDay] || []
  const milestones = [
    {title:'Mobile App v3.0 Launch',date:'Mar 28',days:34,c:'#ff0080',priority:'CRITICAL'},
    {title:'Analytics Engine Release',date:'Mar 20',days:26,c:'#00ff88',priority:'HIGH'},
    {title:'Sprint #13 Kickoff',date:'Mar 01',days:7,c:'#00f5ff',priority:'MED'},
    {title:'Q1 Performance Review',date:'Apr 01',days:38,c:'#ffd700',priority:'MED'},
  ]
  return (
    <div style={{position:'relative',zIndex:1}}>
      <div style={{marginBottom:30,animation:'fadeInUp 0.5s ease'}}>
        <div className="holo-tag" style={{marginBottom:8}}>▣ SPRINT CALENDAR</div>
        <h1 style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2.6rem',letterSpacing:'4px',textTransform:'uppercase',marginBottom:4}}>Project <span className="neon-gold">Calendar</span></h1>
        <p style={{fontFamily:'Rajdhani,sans-serif',fontSize:'1rem',color:'rgba(110,110,170,0.6)'}}>Deadlines, milestones, and sprint scheduling</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
        <div>
          <div className="glass-card" style={{padding:28,marginBottom:18}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.8rem',letterSpacing:'4px',color:'#ffd700',textShadow:'0 0 16px #ffd700'}}>{currentMonth.name} <span style={{color:'rgba(255,215,0,0.5)'}}>{currentMonth.year}</span></h2>
              <div style={{display:'flex',gap:8}}>
                <button className="btn-ghost" style={{padding:'6px 12px',fontSize:'0.6rem'}}>◄ PREV</button>
                <button className="btn-ghost" style={{padding:'6px 12px',fontSize:'0.6rem'}}>NEXT ►</button>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:8}}>
              {weekDays.map(d=><div key={d} style={{textAlign:'center',fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',letterSpacing:'1px',color:'rgba(0,245,255,0.35)',padding:'8px 0'}}>{d}</div>)}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
              {Array.from({length:firstDay},(_,i)=><div key={`e${i}`}/>)}
              {days.map(d=>{
                const dayEvents=events[d]||[]
                const isSelected=d===selectedDay
                const isToday=d===22
                return(
                  <div key={d} onClick={()=>setSelectedDay(d)} style={{minHeight:64,padding:'6px 5px',borderRadius:10,cursor:'pointer',border:'1px solid',borderColor:isSelected?'#ffd700':isToday?'rgba(0,245,255,0.3)':'rgba(0,245,255,0.06)',background:isSelected?'rgba(255,215,0,0.08)':isToday?'rgba(0,245,255,0.04)':'rgba(0,0,0,0.2)',transition:'all 0.2s'}}>
                    <div style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',fontWeight:700,color:isSelected?'#ffd700':isToday?'#00f5ff':'rgba(140,140,190,0.5)',marginBottom:4}}>{d}</div>
                    {dayEvents.slice(0,2).map((ev,i)=>(
                      <div key={i} style={{fontSize:'0.5rem',fontFamily:'Share Tech Mono,monospace',padding:'1px 4px',borderRadius:3,marginBottom:2,background:`${ev.c}18`,color:ev.c,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ev.title}</div>
                    ))}
                    {dayEvents.length>2&&<div style={{fontSize:'0.47rem',fontFamily:'Share Tech Mono,monospace',color:'rgba(0,245,255,0.35)',marginTop:1}}>+{dayEvents.length-2} more</div>}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="glass-card" style={{padding:26}}>
            <div className="holo-tag" style={{marginBottom:14,fontSize:'0.56rem'}}>◎ UPCOMING MILESTONES</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {milestones.map((m,i)=>(
                <div key={i} style={{padding:'14px',borderRadius:10,background:`${m.c}05`,border:`1px solid ${m.c}12`,display:'flex',alignItems:'center',gap:16,transition:'all 0.3s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=`${m.c}28`}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=`${m.c}12`}>
                  <div style={{width:44,height:44,borderRadius:10,background:`${m.c}10`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:`1px solid ${m.c}20`,flexShrink:0}}>
                    <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'1.1rem',color:m.c,lineHeight:1}}>{m.days}</div>
                    <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.45rem',color:`${m.c}70`,letterSpacing:'1px'}}>DAYS</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.95rem',fontWeight:700,color:'#e8e8ff',marginBottom:3}}>{m.title}</div>
                    <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.56rem',color:'rgba(90,90,140,0.45)'}}>DUE {m.date}</div>
                  </div>
                  <span className={`badge badge-${m.priority==='CRITICAL'?'critical':m.priority==='HIGH'?'pending':'active'}`}>{m.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="glass-card" style={{padding:24,marginBottom:16}}>
            <div style={{marginBottom:18}}>
              <div className="holo-tag" style={{marginBottom:8,fontSize:'0.55rem'}}>▣ DAY VIEW</div>
              <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2rem',letterSpacing:'3px',color:'#ffd700'}}>{currentMonth.name.slice(0,3)} {selectedDay}</div>
              <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.58rem',color:'rgba(0,245,255,0.35)'}}>FEB {selectedDay}, 2030</div>
            </div>
            {todayEvents.length===0?(
              <div style={{textAlign:'center',padding:24,fontFamily:'Share Tech Mono,monospace',fontSize:'0.6rem',color:'rgba(0,245,255,0.18)',letterSpacing:'2px'}}>NO EVENTS<br/>THIS DAY</div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {todayEvents.map((ev,i)=>(
                  <div key={i} style={{padding:'14px',borderRadius:10,background:`${ev.c}07`,border:`1px solid ${ev.c}18`,borderLeft:`3px solid ${ev.c}`}}>
                    <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:ev.c,marginBottom:5,letterSpacing:'1px'}}>{ev.time}</div>
                    <div style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.92rem',fontWeight:700,color:'#e8e8ff'}}>{ev.title}</div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn-ghost" style={{width:'100%',marginTop:14,fontSize:'0.58rem',padding:'10px'}}>+ ADD EVENT</button>
          </div>
          <div className="glass-card" style={{padding:24}}>
            <div className="holo-tag" style={{marginBottom:14,fontSize:'0.55rem'}}>◈ ACTIVE SPRINT</div>
            <div style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#e8e8ff',marginBottom:6}}>SPRINT #12</div>
            <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.58rem',color:'rgba(90,90,140,0.45)',marginBottom:16}}>Feb 03 → Feb 28, 2030</div>
            {[{l:'Story Points',v:87,t:120,c:'#00f5ff'},{l:'Tasks Done',v:34,t:48,c:'#00ff88'},{l:'Bugs Fixed',v:12,t:15,c:'#b400ff'}].map((s,i)=>(
              <div key={i} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.8rem',color:'rgba(130,130,180,0.55)'}}>{s.l}</span>
                  <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.65rem',color:s.c,fontWeight:700}}>{s.v}/{s.t}</span>
                </div>
                <div className="progress-track" style={{height:6}}>
                  <div style={{height:'100%',width:`${(s.v/s.t)*100}%`,borderRadius:3,background:`linear-gradient(90deg,${s.c},${s.c}60)`,boxShadow:`0 0 7px ${s.c}`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
// CEOF
// echo "Calendar.jsx done"
// Output

// Calendar.jsx done

// Create AICommand.jsx

// Script

// Verify all files are created

// Script

// Create README

// Script

// Create ZIP of the complete React project

// Script

// Copy to outputs

// Script

// Presented file
// Done
// Poora React project download ke liye ready hai! 🎉

// 📦 ZIP ke andar kya hai:
// nexuspm/
// ├── index.html          ← Vite entry point
// ├── package.json        ← Dependencies
// ├── vite.config.js      ← Vite config
// └── src/
//     ├── main.jsx         ← App start hota hai yahan se
//     ├── App.jsx          ← Routes + layout
//     ├── styles/
//     │   └── globals.css  ← Saari CSS (fonts, animations, buttons)
//     └── components/
//         ├── UIComponents.jsx  ← Shared: Particles, Counter, Charts, Logo
//         ├── Navbar.jsx
//         ├── Sidebar.jsx
//         ├── Landing.jsx
//         ├── Dashboard.jsx
//         ├── Projects.jsx
//         ├── Tasks.jsx
//         ├── Analytics.jsx
//         ├── Calendar.jsx
//         └── AICommand.jsx
// 🚀 Sirf 3 Commands chalao:
// bash
// # 1. ZIP extract karo, folder mein jao
// cd nexuspm

// # 2. Dependencies install karo
// npm install

// # 3. Run karo
// npm run dev
// Browser mein http://localhost:5173 khulega — bas ho gaya! ✅

// Har file mein kya hai:

// UIComponents.jsx → Particles, LogoIcon, TypeWriter, Counter, MiniBar, LineChart, HoloCube — ye sab shared components hain jo baaki pages use karte hain
// App.jsx → Decide karta hai kaun sa page dikhana hai, sidebar + navbar wire up karta hai
// globals.css → HTML wali saari CSS yahan hai — animations, glass cards, buttons, badges sab
// Nexuspm react project
// ZIP 
// # 1. ZIP extract karo, folder mein jao
// cd nexuspm
// # 2. Dependencies install karo
// npm install
// # 3. Run karo
// npm run dev  isame depnedencee kya install karni hia

// 2:13 PM
// npm install chalane ke baad automatically ye sab install ho jaata hai — alag se kuch nahi karna:

// ✅ Jo package.json mein already hai:
// json
// "dependencies": {
//   "react": "^18.2.0",        ← React core
//   "react-dom": "^18.2.0"     ← React DOM rendering
// },
// "devDependencies": {
//   "@vitejs/plugin-react": "^4.2.1",  ← JSX support
//   "vite": "^5.0.8"                   ← Dev server + build tool
// }
// 📋 Puri process step-by-step:
// Step 1 — Node.js installed hai ya nahi check karo:

// bash
// node -v
// Agar version aaya (jaise v18.x.x) toh theek hai. Agar nahi aaya → nodejs.org se download karo (LTS version)

// Step 2 — ZIP extract karke folder mein jao:

// bash
// cd nexuspm
// Step 3 — Ek baar npm install:

// bash
// npm install
// Ye command khud node_modules folder banayega aur saari dependencies download karega. Internet chahiye sirf is ek baar ke liye.

// Step 4 — Chalao:

// bash
// npm run dev
// ⚠️ Common errors aur fix:
// Error	Fix
// node not found	Node.js install karo from nodejs.org
// npm not recognized	Node.js dobara install karo (npm saath aata hai)
// port 5173 already in use	npm run dev -- --port 3000 try karo
// Cannot find module	npm install dobara run karo
// Bas itna hi — koi aur package manually install nahi karna! 🎯

// white screen aa rahi code paste karne baad sare components me

// 2:18 PM
// White screen ka matlab hai koi JavaScript error hai. Console check karte hain pehle!

// 🔍 Step 1 — Error dekho
// Browser mein F12 dabao → Console tab kholo → Red error copy karo aur batao

// 🔧 Sabse Common Reasons:
// 1. Import path galat hai
// App.jsx mein check karo — har component ka path sahi hona chahiye:

// jsx
// // ✅ Sahi
// import Dashboard from './components/Dashboard'
// import { AmbientOrbs } from './components/UIComponents'

// // ❌ Galat  
// import Dashboard from './Dashboard'  // components/ missing
// 2. globals.css import missing
// App.jsx ke top mein ye line honi chahiye:

// jsx
// import './styles/globals.css'
// 3. Export galat hai
// Har component file mein check karo:

// jsx
// // ✅ Sahi — default export
// export default function Dashboard() { ... }

// // ✅ Sahi — named export (UIComponents mein)
// export const AmbientOrbs = () => { ... }

// // ❌ Galat — export hi nahi hai
// function Dashboard() { ... }
// ```

// ### 4. `src/styles/` folder banana bhool gaye
// ```
// src/
//   styles/
//     globals.css   ← ye folder aur file dono chahiye
// ✅ Quick Fix — main.jsx check karo
// Ye exactly aisa hona chahiye:

// jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// Console mein jo red error aaye wo paste karo — exact fix batata hoon! 🎯

// Uncaught SyntaxError: The requested module '/src/components/Analytics.jsx' does not provide an export named 'default' (at App.jsx:14:8)Understand this error

// 2:20 PM
// Ye error simple hai! Analytics.jsx mein export default missing hai ya galat hai.

// 🔍 Problem
// jsx
// // ❌ Analytics.jsx mein ye hai (galat)
// function Analytics() { ... }
// // export default nahi likha!
// jsx
// // ✅ Ye hona chahiye
// export default function Analytics() { ... }
// ✅ Fix — Analytics.jsx kholo aur pehli line check karo
// Bilkul exactly aisa hona chahiye:

// jsx
// export default function Analytics() {
// 🔧 Saare files ek baar check karo — har file mein export default hona chahiye:
// File	Pehli function line kaisi honi chahiye
// Analytics.jsx	export default function Analytics() {
// Dashboard.jsx	export default function Dashboard() {
// Projects.jsx	export default function Projects() {
// Tasks.jsx	export default function Tasks() {
// Calendar.jsx	export default function Calendar() {
// AICommand.jsx	export default function AICommand() {
// Navbar.jsx	export default function Navbar({...}) {
// Sidebar.jsx	export default function Sidebar({...}) {
// Landing.jsx	export default function Landing({...}) {
