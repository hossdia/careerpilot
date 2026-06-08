'use client'
import AppLayout from '@/components/layout/AppLayout'
import { useState } from 'react'

type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  deadline: string
  score: number
  matched: string[]
  missing: string[]
  why: string
  logo: string
}

const MOCK_JOBS: Job[] = [
  {
    id: '1', title: 'Backend Engineer Intern', company: 'Shohoz', location: 'Dhaka, BD', type: 'Internship',
    salary: '20,000–25,000 BDT', deadline: 'Jun 30 2025', score: 91,
    matched: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
    missing: ['Kubernetes'],
    why: 'Your 3-month FastAPI internship and PostgreSQL project work are a direct match for their backend stack.',
    logo: '🚀',
  },
  {
    id: '2', title: 'ML Research Intern', company: 'BrainStation 23', location: 'Dhaka, BD', type: 'Internship',
    salary: 'Negotiable', deadline: 'Jul 15 2025', score: 76,
    matched: ['Python', 'PyTorch', 'ML coursework', 'Data analysis'],
    missing: ['TensorFlow', 'MLOps', 'Cloud (AWS/GCP)'],
    why: 'Strong Python and ML fundamentals. Missing production ML experience — emphasize your projects.',
    logo: '🧪',
  },
  {
    id: '3', title: 'Full-Stack Developer', company: 'SELISE Digital Platforms', location: 'Dhaka, BD', type: 'Full-time',
    salary: '50,000–70,000 BDT', deadline: 'Jun 20 2025', score: 82,
    matched: ['TypeScript', 'Next.js', 'Java', 'Spring Boot', 'PostgreSQL'],
    missing: ['Angular', 'Azure'],
    why: 'Your Next.js and Spring Boot experience covers 82% of their stack. Strong candidate.',
    logo: '💡',
  },
  {
    id: '4', title: 'DevOps Intern', company: 'Pathao', location: 'Remote', type: 'Internship',
    salary: '18,000 BDT', deadline: 'Jul 1 2025', score: 54,
    matched: ['Docker', 'Linux', 'Git'],
    missing: ['Terraform', 'CI/CD pipelines', 'Kubernetes', 'AWS'],
    why: 'Low match — DevOps isn't your primary focus. Consider after gaining infra experience.',
    logo: '⚙️',
  },
]

const scoreColor = (s: number) => s >= 80 ? '#4ade80' : s >= 60 ? 'var(--accent-amber)' : '#f87171'

function ScoreRing({ score }: { score: number }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ
  const color = scoreColor(score)
  return (
    <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
      <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 0.6s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne', fontWeight: 800, fontSize: 13, color }}>
        {score}%
      </div>
    </div>
  )
}


function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass glass-hover" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.2s' }}>
      <div style={{ padding: '22px 26px', display: 'flex', gap: 18, alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{job.logo}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 5 }}>{job.title}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <span>{job.company}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span>{job.location}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span>{job.salary}</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-cyan">{job.type}</span>
            <span className="badge badge-violet">⏰ {job.deadline}</span>
          </div>
        </div>
        <ScoreRing score={job.score} />
      </div>

      {open && (
        <div style={{ padding: '0 26px 24px', borderTop: '1px solid var(--glass-border)' }}>
          {/* Why */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: 18 }}>
            <p className="section-label" style={{ marginBottom: 8 }}>Why you match</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>✦ {job.why}</p>
          </div>

          {/* Skills */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 10 }}>Matched skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {job.matched.map(s => <span key={s} className="badge badge-green">✓ {s}</span>)}
              </div>
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: 10 }}>Missing skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {job.missing.map(s => <span key={s} className="badge badge-amber">✗ {s}</span>)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>Apply now →</button>
            <button className="btn-ghost" style={{ fontSize: 13, padding: '10px 20px' }}>Save job</button>
            <button className="btn-ghost" style={{ fontSize: 13, padding: '10px 20px' }}>Generate cover letter</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HuntPage() {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [filter, setFilter] = useState('All')

  const FILTERS = ['All', 'Internship', 'Full-time', 'Remote']

  const handleSearch = () => {
    if (!query.trim()) return
    setSearching(true)
    setTimeout(() => { setSearching(false) }, 1800)
  }

  const filtered = filter === 'All' ? jobs : jobs.filter(j => filter === 'Remote' ? j.location.includes('Remote') : j.type === filter)

  return (
    <AppLayout>
      <div style={{ padding: '40px 48px' }}>

        <div className="anim-fade-up" style={{ marginBottom: 36 }}>
          <p className="section-label" style={{ marginBottom: 10 }}>Pillar 1</p>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, letterSpacing: '-0.03em', marginBottom: 10 }}>
            Job <span className="grad-text">Hunter</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Describe what you're looking for. AI searches, retrieves your CV skills, and scores each match.
          </p>
        </div>

        {/* Search bar */}
        <div className="anim-fade-up delay-1" style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
            <input
              className="input-field"
              style={{ paddingLeft: 44 }}
              placeholder='Try "ML internships in Dhaka" or "remote backend roles"'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="btn-primary" onClick={handleSearch} style={{ whiteSpace: 'nowrap', minWidth: 120 }}>
            {searching ? '⟳ Searching…' : 'Search jobs'}
          </button>
        </div>

        {/* Filters */}
        <div className="anim-fade-up delay-2" style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '7px 18px', borderRadius: 99, fontSize: 13, fontFamily: 'Syne', fontWeight: 600, cursor: 'pointer',
              background: filter === f ? 'rgba(124,58,237,0.2)' : 'transparent',
              border: `1px solid ${filter === f ? 'rgba(124,58,237,0.4)' : 'var(--glass-border)'}`,
              color: filter === f ? '#a78bfa' : 'var(--text-secondary)',
              transition: 'all 0.18s',
            }}>{f}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13 }}>
            <span>{filtered.length} results</span>
            <span>· Sorted by fit score</span>
          </div>
        </div>

        {/* Job list */}
        {searching ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1,2,3].map(i => (
              <div key={i} className="glass shimmer-loading" style={{ borderRadius: 'var(--radius-lg)', height: 100 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((j, i) => (
              <div key={j.id} className={`anim-fade-up delay-${i + 1}`}>
                <JobCard job={j} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
