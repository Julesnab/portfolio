'use client'

import { useState, useRef, useEffect } from 'react'
import { CONTENT } from '../../content'

function usePageSize() {
  const [pageSize, setPageSize] = useState(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  })
  useEffect(() => {
    const getSize = () => {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    const handler = () => setPageSize(getSize())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return pageSize
}

const SLIDE_STYLES = `
  @keyframes slideFromRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideFromLeft {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-projects-grid] { animation: none !important; }
  }
`

export default function Projects() {
  const pageSize = usePageSize()
  const [page, setPage] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [animDir, setAnimDir] = useState(0)
  const [gridMinHeight, setGridMinHeight] = useState(0)
  const gridRef = useRef(null)

  const projects = CONTENT.projects
  const totalPages = Math.ceil(projects.length / pageSize)
  const visible = projects.slice(page * pageSize, page * pageSize + pageSize)
  const hasPrev = page > 0
  const hasNext = page < totalPages - 1

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGridMinHeight(0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimKey(0)
  }, [pageSize])

  useEffect(() => {
    if (gridRef.current) {
      const h = gridRef.current.offsetHeight
      setGridMinHeight(prev => Math.max(prev, h))
    }
  })

  const navigate = (dir) => {
    setAnimDir(dir)
    setPage(p => p + dir)
    setAnimKey(k => k + 1)
  }

  const animation = animKey === 0
    ? 'none'
    : `${animDir > 0 ? 'slideFromRight' : 'slideFromLeft'} 0.3s ease`

  return (
    <section id="projects">
      <style>{SLIDE_STYLES}</style>
      <div className="container">
        <span className="section-label">// projects</span>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '2.5rem',
          lineHeight: 1.2,
        }}>
          Things I've built
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <NavArrow direction="left" onClick={() => navigate(-1)} disabled={!hasPrev} />

          <div style={{ flex: 1, minHeight: gridMinHeight }}>
            <div
              ref={gridRef}
              key={animKey}
              data-projects-grid
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${pageSize}, 1fr)`,
                gap: '1.5rem',
                animation,
              }}
            >
              {visible.map((project, i) => (
                <ProjectCard key={project.title + i} project={project} />
              ))}
            </div>
          </div>

          <NavArrow direction="right" onClick={() => navigate(1)} disabled={!hasNext} />
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setAnimDir(i > page ? 1 : -1); setPage(i); setAnimKey(k => k + 1) }}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page ? 'true' : undefined}
                style={{
                  width: i === page ? '1.5rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: i === page ? 'var(--accent)' : 'var(--bg-border)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function NavArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous projects' : 'Next projects'}
      style={{
        flexShrink: 0,
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        border: '1px solid var(--bg-border)',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        transition: 'border-color 0.2s ease, color 0.2s ease',
        visibility: disabled ? 'hidden' : 'visible',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  )
}

function SitePreview({ url }) {
  const [blocked, setBlocked] = useState(false)

  if (!url) return null

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '160px',
      overflow: 'hidden',
      borderRadius: '4px',
      background: 'var(--bg)',
      border: '1px solid var(--bg-border)',
      marginBottom: '0.25rem',
    }}>
      {blocked ? (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          preview blocked
        </div>
      ) : (
        <>
          <iframe
            src={url}
            title="site preview"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts"
            onError={() => setBlocked(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '400%',
              height: '720px',
              transform: 'scale(0.25)',
              transformOrigin: 'top left',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
          {/* click-through shield so the card hover still works */}
          <div style={{ position: 'absolute', inset: 0 }} />
        </>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  const cardStyle = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--bg-border)',
    borderRadius: 'var(--radius)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
    cursor: 'default',
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg-border)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <SitePreview url={project.demo || project.github} />
      <div>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
        }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.stack.map(tech => (
          <span key={tech} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            padding: '0.2rem 0.55rem',
            background: 'var(--bg)',
            border: '1px solid var(--bg-border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-muted)',
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{
        display: 'flex',
        gap: '1.25rem',
        marginTop: 'auto',
        paddingTop: '0.25rem',
      }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            GitHub ↗
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  )
}
