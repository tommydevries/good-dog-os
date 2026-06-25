import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  it('renders the app name on the home route', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Good Dog OS' })).toBeInTheDocument()
  })
})
