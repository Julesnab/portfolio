import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../Projects'
import { CONTENT } from '../../../content'

describe('Projects', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByText("Things I've built")).toBeInTheDocument()
  })

  it('renders the section label', () => {
    render(<Projects />)
    expect(screen.getByText('// projects')).toBeInTheDocument()
  })

  it('renders a card for each unique project title', () => {
    render(<Projects />)
    const uniqueTitles = [...new Set(CONTENT.projects.map(p => p.title))]
    uniqueTitles.forEach(title => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0)
    })
  })

  it('renders all project descriptions', () => {
    render(<Projects />)
    const uniqueDescs = [...new Set(CONTENT.projects.map(p => p.description))]
    uniqueDescs.forEach(desc => {
      expect(screen.getAllByText(desc).length).toBeGreaterThan(0)
    })
  })

  it('renders stack tech tags for each project', () => {
    render(<Projects />)
    const allTechs = [...new Set(CONTENT.projects.flatMap(p => p.stack))]
    allTechs.forEach(tech => {
      expect(screen.getAllByText(tech).length).toBeGreaterThan(0)
    })
  })

  it('renders GitHub links only for projects with github set', () => {
    render(<Projects />)
    const withGithub = CONTENT.projects.filter(p => p.github)
    const githubLinks = screen.getAllByRole('link', { name: /github/i })
    expect(githubLinks.length).toBe(withGithub.length)
    githubLinks.forEach((link, i) => {
      expect(link).toHaveAttribute('href', withGithub[i].github)
    })
  })

  it('renders Live Demo links only for projects with demo set', () => {
    render(<Projects />)
    const withDemo = CONTENT.projects.filter(p => p.demo)
    const demoLinks = screen.getAllByRole('link', { name: /live demo/i })
    expect(demoLinks.length).toBe(withDemo.length)
  })

  it('renders the projects section element', () => {
    render(<Projects />)
    expect(document.getElementById('projects')).toBeInTheDocument()
  })
})
