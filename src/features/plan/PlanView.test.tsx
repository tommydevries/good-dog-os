import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import { PlanView } from './PlanView'
import { useAppStore } from '../../store/useAppStore'
import type { DogProfile } from '../../types'

const profile: DogProfile = {
  name: 'Tracker',
  breedId: 'golden',
  ageMonths: 7,
  householdSize: 4,
  problems: ['counter-surfing'],
  minutesPerDay: 15,
  experience: 'beginner',
}

describe('PlanView', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('renders the generated plan sections', () => {
    useAppStore.getState().generate(profile)
    render(
      <MemoryRouter>
        <PlanView />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: /training plan/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /-week program/i })).toBeInTheDocument()
    expect(screen.getByText('Why this plan')).toBeInTheDocument()
    expect(screen.getByText('Your commands')).toBeInTheDocument()
    // young large breed -> growth-plate safety note
    expect(screen.getAllByText(/growth plate/i).length).toBeGreaterThan(0)
  })

  it('redirects away when no plan exists', () => {
    render(
      <MemoryRouter initialEntries={['/plan']}>
        <PlanView />
      </MemoryRouter>,
    )
    expect(screen.queryByText('Why this plan')).not.toBeInTheDocument()
  })
})
