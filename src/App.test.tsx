import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the landing hero on the home route', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>,
    )
    expect(screen.getByRole('heading', { name: /train your dog/i })).toBeInTheDocument()
    expect(screen.getByText('Good Dog OS')).toBeInTheDocument() // header wordmark
  })
})
