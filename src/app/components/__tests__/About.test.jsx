import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '../About'
import { CONTENT } from '../../../content'

describe('About', () => {
  it('renders the bio text', () => {
    render(<About />)
    expect(screen.getByText(CONTENT.about.bio)).toBeInTheDocument()
  })

  it('renders all skills as chips', () => {
    render(<About />)
    CONTENT.about.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('renders the about section label', () => {
    render(<About />)
    expect(screen.getByText('// about me')).toBeInTheDocument()
  })

  it('renders the skills section label', () => {
    render(<About />)
    expect(screen.getByText('// skills')).toBeInTheDocument()
  })

  it('renders the about section element', () => {
    render(<About />)
    expect(document.getElementById('about')).toBeInTheDocument()
  })
})
