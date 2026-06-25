import { Routes, Route } from 'react-router-dom'
import { Home } from './routes/Home'
import { Wizard } from './features/onboarding/Wizard'
import { PlanView } from './features/plan/PlanView'
import { CardsView } from './features/cards/CardsView'
import { ProgressView } from './features/progress/ProgressView'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Wizard />} />
      <Route path="/plan" element={<PlanView />} />
      <Route path="/cards" element={<CardsView />} />
      <Route path="/progress" element={<ProgressView />} />
    </Routes>
  )
}
