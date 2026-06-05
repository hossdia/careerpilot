use client'
import AppLayout from '@/components/layout/AppLayout'
import { useState, useRef } from 'react'
 
type Stage = 'idle' | 'uploading' | 'processing' | 'done'
 
const SECTIONS = [
  { key: 'education',   icon: '🎓', label: 'Education',       chunks: 3, preview: 'BSc Computer Science — BUET, 2021–2025. GPA 3.78. Relevant coursework: Algorithms, ML, Distributed Systems.' },
  { key: 'experience',  icon: '💼', label: 'Experience',       chunks: 7, preview: 'Software Engineering Intern — Shohoz (Jun–Sep 2024). Built real-time ride tracking with WebSockets. Reduced API latency by 34%.' },
  { key: 'skills',      icon: '⚙️',  label: 'Skills',           chunks: 2, preview: 'Languages: Python, Java, TypeScript, SQL. Frameworks: FastAPI, Spring Boot, Next.js, PyTorch. Tools: Docker, Git, PostgreSQL.' },
  { key: 'projects',    icon: '🚀', label: 'Projects',         chunks: 5, preview: 'CareerPilot — AI career OS. RAG pipeline using ChromaDB + LangChain. Fit scoring with cosine similarity.' },
  { key: 'achievements',icon: '🏆', label: 'Achievements',     chunks: 2, preview: 'Dean\'s List 4× semesters. 1st place — BUET CSE Fest hackathon 2024. Google DSC Lead 2023–24.' },
]
 
const STEPS = ['Extracting text', 'Detecting sections', 'Creating embeddings', 'Indexing vectors']
 
export default function CVPage() {
  const [stage, setStage] = useState<Stage>('idle')
  const [step, setStep]   = useState(0)
  const [active, setActive] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
 
  const runSimulation = (name: string) => {
    setFileName(name)
    setStage('uploading')
    setTimeout(() => { setStage('processing'); setStep(0) }, 800)
    setTimeout(() => setStep(1), 1800)
    setTimeout(() => setStep(2), 2800)
    setTimeout(() => setStep(3), 3600)
    setTimeout(() => { setStage('done'); setStep(4) }, 4400)
  }
 
  const handleFile = (f: File) => { if (f) runSimulation(f.name) }
 
  return (
    <AppLayout>
      <div style={{ padding: '40px 48px', maxWidth: 860 }}>
 
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 40 }}>
          <p className="section-label" style={{ marginBottom: 10 }}>Pillar 2</p>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, letterSpacing: '-0.03em', marginBottom: 10 }}>
            CV <span className="grad-text">Intelligence</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
            Upload your CV once. It becomes the memory behind every AI response — jobs, coaching, cover letters.
          </p>
        </div>
 
        {stage === 'idle' && (
          <div
            className={`glass anim-fade-up delay-1`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
            onClick={() => inputRef.current?.click()}
            style={{
              borderRadius: 'var(--radius-xl)',
              padding: '64px 40px',
              textAlign: 'center',
              cursor: 'pointer',
              border: dragOver ? '1.5px dashed var(--accent-violet)' : '1.5px dashed var(--glass-border)',
              background: dragOver ? 'rgba(124,58,237,0.06)' : 'var(--glass-bg)',
              transition: 'all 0.2s',
            }}
          >
            <input ref={inputRef} type="file" accept=".pdf,.docx" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
            <div style={{ fontSize: 48, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>📄</div>
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>Drop your CV here</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>PDF or DOCX · Max 10 MB</div>
            <button className="btn-primary">Browse files</button>
          </div>
        )}
 
        {(stage === 'uploading' || stage === 'processing') && (
          <div className="glass anim-fade-in" style={{ borderRadius: 'var(--radius-xl)', padding: 48, textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', margin: '0 auto 28px',
              border: '2px solid var(--glass-border)',
              borderTop: '2px solid var(--accent-violet)',
              animation: 'spin-slow 1s linear infinite',
            }} />
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
              {stage === 'uploading' ? 'Uploading…' : STEPS[step] + '…'}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{fileName}</div>
 
            {stage === 'processing' && (
              <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '36px auto 0' }}>
                {STEPS.map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: i < step ? 'rgba(74,222,128,0.2)' : i === step ? 'rgba(124,58,237,0.3)' : 'var(--glass-bg)',
                      border: `1px solid ${i < step ? '#4ade80' : i === step ? 'var(--accent-violet)' : 'var(--glass-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11,
                    }}>
                      {i < step ? '✓' : i === step ? '⟳' : ''}
                    </div>
                    <span style={{ fontSize: 13, color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
 
        {stage === 'done' && (
          <div className="anim-fade-in">
            {/* Success banner */}
            <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '20px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, borderColor: 'rgba(74,222,128,0.25)' }}>
              <div style={{ fontSize: 28 }}>✅</div>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 2 }}>CV processed successfully</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{fileName} · 19 chunks · 5 sections detected</div>
              </div>
              <button className="btn-ghost" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: 13 }} onClick={() => setStage('idle')}>Re-upload</button>
            </div>
 
            {/* Sections */}
            <p className="section-label" style={{ marginBottom: 16 }}>Detected sections</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SECTIONS.map((s, i) => (
                <div
                  key={s.key}
                  className={`glass glass-hover anim-fade-up delay-${i + 1}`}
                  style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setActive(active === s.key ? null : s.key)}
                >
                  <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <span style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 15, flex: 1 }}>{s.label}</span>
                    <span className="badge badge-violet">{s.chunks} chunks</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14, transition: 'transform 0.2s', transform: active === s.key ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </div>
                  {active === s.key && (
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--glass-border)' }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, paddingTop: 16 }}>{s.preview}</p>
                      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span className="badge badge-cyan">Retrieved for job matching</span>
                        <span className="badge badge-violet">Used in chat context</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
