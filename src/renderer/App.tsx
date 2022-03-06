import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Budget from './pages/Budget'

import './App.scss'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  )
}
