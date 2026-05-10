'use client'

import { CONTENT } from '../../content'

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--bg-border)', borderBottom: '1px solid var(--bg-border)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'start',
      }} id="about-inner">
        <div>
          <span className="section-label">// about me</span>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
          }}>
            {CONTENT.about.bio}
          </p>
        </div>

        <div>
          <span className="section-label">// skills</span>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            {CONTENT.about.skills.map(skill => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about-inner {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}

function Chip({ children }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        padding: '0.3rem 0.7rem',
        background: 'var(--bg)',
        border: '1px solid var(--bg-border)',
        borderRadius: 'var(--radius)',
        color: 'var(--text-muted)',
        transition: 'border-color 0.15s, box-shadow 0.15s, color 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 0 8px var(--accent-glow)'
        e.currentTarget.style.color = 'var(--accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg-border)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.color = 'var(--text-muted)'
      }}
    >
      {children}
    </span>
  )
}
