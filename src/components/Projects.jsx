import { CONTENT } from '../content'

export default function Projects() {
  return (
    <section id="projects">
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {CONTENT.projects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
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
