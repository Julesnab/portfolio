import { describe, it, expect } from 'vitest'
import { CONTENT } from '../content'

describe('CONTENT', () => {
  it('has required top-level fields', () => {
    expect(CONTENT.name).toBeTruthy()
    expect(CONTENT.title).toBeTruthy()
    expect(CONTENT.tagline).toBeTruthy()
    expect(CONTENT.github).toMatch(/^https?:\/\//)
    expect(CONTENT.linkedin).toMatch(/^https?:\/\//)
    expect(CONTENT.email).toMatch(/@/)
  })

  it('about has bio and skills array', () => {
    expect(typeof CONTENT.about.bio).toBe('string')
    expect(CONTENT.about.bio.length).toBeGreaterThan(0)
    expect(Array.isArray(CONTENT.about.skills)).toBe(true)
    expect(CONTENT.about.skills.length).toBeGreaterThan(0)
  })

  it('all skills are non-empty strings', () => {
    CONTENT.about.skills.forEach(skill => {
      expect(typeof skill).toBe('string')
      expect(skill.length).toBeGreaterThan(0)
    })
  })

  it('projects is a non-empty array', () => {
    expect(Array.isArray(CONTENT.projects)).toBe(true)
    expect(CONTENT.projects.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    CONTENT.projects.forEach(project => {
      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.stack)).toBe(true)
      expect(project.stack.length).toBeGreaterThan(0)
      expect('github' in project).toBe(true)
      expect('demo' in project).toBe(true)
    })
  })

  it('project links are valid URLs or null', () => {
    CONTENT.projects.forEach(project => {
      if (project.github !== null) {
        expect(project.github).toMatch(/^https?:\/\//)
      }
      if (project.demo !== null) {
        expect(project.demo).toMatch(/^https?:\/\//)
      }
    })
  })
})
