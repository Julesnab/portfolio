import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'
import { CONTENT } from '../../../content'

describe('Hero', () => {
  it('renders the developer name', () => {
    render(<Hero />)
    expect(screen.getByText(CONTENT.name)).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Hero />)
    expect(screen.getByText(new RegExp(CONTENT.title))).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(CONTENT.tagline)).toBeInTheDocument()
  })

  it('renders a GitHub link with correct href', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', CONTENT.github)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders a LinkedIn link with correct href', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', CONTENT.linkedin)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders an Email link', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', `mailto:${CONTENT.email}`)
  })

  it('renders the hero section', () => {
    render(<Hero />)
    expect(document.getElementById('hero')).toBeInTheDocument()
  })
})
