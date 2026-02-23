
import { useState, useEffect, useRef } from 'react'

export default function AICommand() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {role:'ai',text:"NEXUS AI initialized. I'm your project intelligence assistant. Ask me to create tasks, analyze performance, summarize projects, or query team data.",time:'SYSTEM',c:'#ffd700'},
  ])
  const [thinking, setThinking] = useState(false)
  const chatRef = useRef(null)

  const aiResponses = {
    'create task': () => `TASK CREATED ✓\n\nID: T-${Math.floor(Math.random()*900+100)}\nTitle: "${input.replace(/create task/i,'').trim()||'New Task'}"\nStatus: PENDING\nPriority: AUTO-ASSIGNED: HIGH\nSprint: #12\n\nTask has been added to the NEXUS Backend API project and assigned to the next available team member.`,
    'project status': () => `PROJECT STATUS REPORT\n━━━━━━━━━━━━━━━━━━━━\n◈ Active: 14 projects\n⚠ Critical: 1 (Mobile App v3.0 — DUE IN 2 DAYS)\n✓ Completed: 5 (this sprint)\n○ Pending: 4\n\nOverall health: 78% ▲\nRisk score: MEDIUM\nRecommendation: Prioritize Mobile App v3.0 immediately.`,
    'team performance': () => `TEAM PERFORMANCE MATRIX\n━━━━━━━━━━━━━━━━━━━━━━\n1. S.Kumar — 96/100 (47 tasks)\n2. R.Sharma — 92/100 (42 tasks)\n3. A.Singh — 89/100 (38 tasks)\n4. M.Joshi — 85/100 (35 tasks)\n5. P.Gupta — 78/100 (29 tasks)\n\nTeam avg velocity: 94%\nCapacity utilization: 72%\nSuggestion: P.Gupta has bandwidth for 2 more tasks.`,
    'analytics': () => `SPRINT #12 ANALYTICS\n━━━━━━━━━━━━━━━━━━━\nVelocity: 94 pts (↑ from 82 last sprint)\nBurndown: 87.5% complete\nBug rate: 2.1% (below 5% threshold ✓)\nCode coverage: 87%\nDeploy frequency: 3.4/day\n\nPrediction: Sprint #12 will complete ON TIME with 94% confidence.`,
    'risks': () => `RISK RADAR ALERT\n━━━━━━━━━━━━━━━\n🔴 CRITICAL: Mobile App v3.0 — 2 days to deadline, 55% incomplete\n🟡 HIGH: Auth System — 30% progress, dependency on Backend API\n🟡 HIGH: 2 team members at 95%+ capacity\n🟢 LOW: DevOps pipeline — minor config drift detected\n\nRecommended actions:\n1. Reallocate 2 devs to Mobile App immediately\n2. Unblock Auth System dependency chain`,
    'help': () => `NEXUS AI COMMANDS\n━━━━━━━━━━━━━━━━\n◈ "create task [name]" — Create new task\n◉ "project status" — Full project overview\n⊕ "team performance" — Team metrics\n◊ "analytics" — Sprint analytics\n⚠ "risks" — Risk assessment\n▣ "suggest" — AI recommendations\n⬡ "summarize sprint" — Sprint summary`,
    'summarize sprint': () => `SPRINT #12 EXECUTIVE SUMMARY\n━━━━━━━━━━━━━━━━━━━━━━━━━━\nPeriod: Feb 03 – Feb 28, 2030\nStatus: ON TRACK ✓\n\nCompleted: 34/48 tasks (71%)\nStory points: 87/120 (73%)\nRemaining time: 6 days\n\nTop wins: Analytics Engine completed ahead of schedule.\n\nBlockers: Mobile App push notifications delayed.\n\nAI Forecast: 89% probability of sprint completion.`,
    'suggest': () => `AI RECOMMENDATIONS\n━━━━━━━━━━━━━━━━━━\n1. 🎯 Rebalance workload — assign 3 tasks from S.Kumar to P.Gupta\n2. ⚡ Auto-close 4 stale tasks older than 14 days\n3. 📊 Dashboard 2.0 at 65% — increase team from 6 to 8\n4. 🔄 Set up automated daily standups for Mobile App\n5. 🛡 Schedule security audit for Auth System\n\nEstimated impact: +12% velocity, risk ↓ MEDIUM → LOW`,
  }

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = {role:'user',text:input,time:new Date().toLocaleTimeString('en',{hour12:false,hour:'2-digit',minute:'2-digit'}),c:'#00f5ff'}
    setMessages(m=>[...m,userMsg])
    const q = input.toLowerCase()
    setInput('')
    setThinking(true)
    setTimeout(()=>{
      let resp = `I understand your query: "${q}"\n\nTry commands like: 'project status', 'team performance', 'analytics', 'risks', 'create task', 'summarize sprint', or 'suggest'. Type 'help' for all commands.`
      for (const [key,fn] of Object.entries(aiResponses)) {
        if (q.includes(key)) { resp=fn(); break }
      }
      setMessages(m=>[...m,{role:'ai',text:resp,time:new Date().toLocaleTimeString('en',{hour12:false,hour:'2-digit',minute:'2-digit'}),c:'#ffd700'}])
      setThinking(false)
    }, 1200+Math.random()*800)
  }

  useEffect(()=>{ if(chatRef.current) chatRef.current.scrollTop=chatRef.current.scrollHeight },[messages,thinking])

  const suggestions = ['project status','team performance','risks','summarize sprint','suggest improvements','analytics']

  return (
    <div style={{position:'relative',zIndex:1}}>
      <div style={{marginBottom:30,animation:'fadeInUp 0.5s ease'}}>
        <div style={{display:'flex',gap:8,marginBottom:8,alignItems:'center'}}>
          <div className="holo-tag">◎ NEURAL INTERFACE</div>
          <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.58rem',letterSpacing:'2px',padding:'4px 12px',borderRadius:4,background:'rgba(255,107,0,0.1)',border:'1px solid rgba(255,107,0,0.3)',color:'#ff6b00',display:'inline-flex',alignItems:'center',gap:5}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#ff6b00',animation:'bpulse 1.5s infinite',display:'inline-block'}}/>AI ONLINE
          </div>
        </div>
        <h1 style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'2.6rem',letterSpacing:'4px',textTransform:'uppercase',marginBottom:4}}>AI <span style={{color:'#ff6b00',textShadow:'0 0 10px #ff6b00'}}>Command Center</span></h1>
        <p style={{fontFamily:'Rajdhani,sans-serif',fontSize:'1rem',color:'rgba(110,110,170,0.6)'}}>Natural language project intelligence · Powered by NEXUS Neural Engine v3</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:20}}>
        <div className="glass-premium" style={{display:'flex',flexDirection:'column',height:'calc(100vh - 280px)',minHeight:520}}>
          <div style={{padding:'18px 24px',borderBottom:'1px solid rgba(0,245,255,0.08)',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
            <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,rgba(255,107,0,0.2),rgba(255,215,0,0.1))',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,107,0,0.3)',fontSize:'1.1rem',color:'#ff6b00'}}>◎</div>
            <div>
              <div style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.7rem',letterSpacing:'2px',color:'#ff6b00'}}>NEXUS NEURAL ENGINE</div>
              <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',color:'rgba(90,90,140,0.45)'}}>v3.0 · {messages.length-1} exchanges</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'#00ff88',boxShadow:'0 0 8px #00ff88',animation:'bpulse 1.5s infinite',display:'inline-block'}}/>
              <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.58rem',color:'#00ff88'}}>ACTIVE</span>
            </div>
          </div>
          <div ref={chatRef} style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:14}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',flexDirection:m.role==='user'?'row-reverse':'row',animation:'fadeInUp 0.3s ease'}}>
                <div style={{width:32,height:32,borderRadius:9,flexShrink:0,background:m.role==='ai'?'linear-gradient(135deg,rgba(255,107,0,0.3),rgba(255,215,0,0.15))':'linear-gradient(135deg,#00f5ff,#b400ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:m.role==='ai'?'0.9rem':'0.55rem',color:m.role==='ai'?'#ff6b00':'#000',fontFamily:'Orbitron,sans-serif',fontWeight:900}}>
                  {m.role==='ai'?'◎':'AD'}
                </div>
                <div style={{maxWidth:'80%'}}>
                  <div style={{padding:'12px 16px',borderRadius:m.role==='user'?'14px 4px 14px 14px':'4px 14px 14px 14px',background:m.role==='ai'?'rgba(255,107,0,0.05)':'rgba(0,245,255,0.06)',border:`1px solid ${m.role==='ai'?'rgba(255,107,0,0.15)':'rgba(0,245,255,0.15)'}`}}>
                    <pre style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.72rem',color:'#e8e8ff',lineHeight:1.7,whiteSpace:'pre-wrap',margin:0}}>{m.text}</pre>
                  </div>
                  <div style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.52rem',color:'rgba(80,80,130,0.35)',marginTop:4,textAlign:m.role==='user'?'right':'left'}}>{m.time}</div>
                </div>
              </div>
            ))}
            {thinking&&(
              <div style={{display:'flex',gap:12,alignItems:'center',animation:'fadeIn 0.3s ease'}}>
                <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,rgba(255,107,0,0.3),rgba(255,215,0,0.15))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',color:'#ff6b00'}}>◎</div>
                <div style={{padding:'12px 16px',borderRadius:'4px 14px 14px 14px',background:'rgba(255,107,0,0.04)',border:'1px solid rgba(255,107,0,0.12)',display:'flex',gap:5,alignItems:'center'}}>
                  {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#ff6b00',animation:`bpulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                  <span style={{fontFamily:'Share Tech Mono,monospace',fontSize:'0.65rem',color:'rgba(255,107,0,0.55)',marginLeft:6}}>PROCESSING...</span>
                </div>
              </div>
            )}
          </div>
          <div style={{padding:'16px 20px',borderTop:'1px solid rgba(0,245,255,0.07)',flexShrink:0}}>
            <div style={{display:'flex',gap:8,marginBottom:10,flexWrap:'wrap'}}>
              {suggestions.map((s,i)=>(
                <button key={i} onClick={()=>setInput(s)} style={{padding:'4px 10px',borderRadius:5,border:'1px solid rgba(255,107,0,0.2)',background:'rgba(255,107,0,0.05)',color:'rgba(255,107,0,0.65)',fontFamily:'Share Tech Mono,monospace',fontSize:'0.55rem',cursor:'pointer',transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,107,0,0.5)';e.currentTarget.style.color='#ff6b00'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,107,0,0.2)';e.currentTarget.style.color='rgba(255,107,0,0.65)'}}>{s}</button>
              ))}
            </div>
            <div style={{display:'flex',gap:10}}>
              <input className="input-neon" placeholder="Ask NEXUS AI... e.g. 'project status' or 'create task fix login bug'" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&!thinking&&sendMessage()} style={{flex:1,borderColor:'rgba(255,107,0,0.2)'}}/>
              <button onClick={sendMessage} disabled={thinking||!input.trim()} style={{padding:'12px 20px',borderRadius:9,border:'none',cursor:thinking||!input.trim()?'not-allowed':'pointer',background:thinking||!input.trim()?'rgba(255,107,0,0.08)':'linear-gradient(135deg,#ff6b00,#ffd700)',color:thinking||!input.trim()?'rgba(255,107,0,0.3)':'#000',fontFamily:'Orbitron,sans-serif',fontSize:'0.65rem',letterSpacing:'1px',fontWeight:700,transition:'all 0.3s',flexShrink:0}}>
                SEND ▶
              </button>
            </div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="glass-card" style={{padding:20}}>
            <div className="holo-tag" style={{marginBottom:14,fontSize:'0.55rem'}}>◉ AI METRICS</div>
            {[{l:'Response Time',v:'1.2s',c:'#00ff88'},{l:'Accuracy',v:'97.4%',c:'#00f5ff'},{l:'Queries Today',v:'48',c:'#b400ff'},{l:'Model Version',v:'v3.0',c:'#ffd700'}].map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(0,245,255,0.04)'}}>
                <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.85rem',color:'rgba(120,120,170,0.55)'}}>{m.l}</span>
                <span style={{fontFamily:'Orbitron,sans-serif',fontSize:'0.65rem',color:m.c,fontWeight:700}}>{m.v}</span>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{padding:20}}>
            <div className="holo-tag" style={{marginBottom:14,fontSize:'0.55rem'}}>▣ AI CAPABILITIES</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[['◈ Project Analysis','#00f5ff'],['◊ Task Management','#00ff88'],['⊕ Team Insights','#b400ff'],['⚠ Risk Detection','#ff0080'],['◉ Sprint Forecasting','#ffd700'],['⬡ Report Generation','#ff6b00']].map(([cap,c],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:7,background:`${c}06`,border:`1px solid ${c}12`}}>
                  <span style={{width:5,height:5,borderRadius:'50%',background:'#00ff88',flexShrink:0,animation:'bpulse 2s infinite'}}/>
                  <span style={{fontFamily:'Rajdhani,sans-serif',fontSize:'0.82rem',color:`${c}99`}}>{cap}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card" style={{padding:20}}>
            <div className="holo-tag" style={{marginBottom:14,fontSize:'0.55rem'}}>⟡ QUICK ACTIONS</div>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {[['Generate Sprint Report','#00f5ff'],['Optimize Team Load','#00ff88'],['Identify Blockers','#ff0080'],['Forecast Deadline','#ffd700']].map(([a,c],i)=>(
                <button key={i} onClick={()=>setInput(a.toLowerCase())} style={{padding:'9px 12px',background:`${c}06`,border:`1px solid ${c}18`,borderRadius:8,color:c,fontFamily:'Rajdhani,sans-serif',fontSize:'0.85rem',cursor:'pointer',textAlign:'left',transition:'all 0.25s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${c}10`;e.currentTarget.style.borderColor=`${c}30`}}
                  onMouseLeave={e=>{e.currentTarget.style.background=`${c}06`;e.currentTarget.style.borderColor=`${c}18`}}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// AIEOF
// echo "AICommand.jsx done"
// Output

// AICommand.jsx done

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
// ⚡ Sabse Fast Fix
// Agar manually dhundhna nahi hai — main saari files dobara generate kar deta hoon, guaranteed working. Batao?



// You've used 90% of your session limit
// Upgrade
