import { Routes, Route } from 'react-router-dom'
import { Home } from './routes/Home'
import { Wizard } from './features/onboarding/Wizard'
import { PlanView } from './features/plan/PlanView'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Wizard />} />
      <Route path="/plan" element={<PlanView />} />
    </Routes>
  )
}
