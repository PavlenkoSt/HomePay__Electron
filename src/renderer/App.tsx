import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Budget from './pages/Budget'
import Statistics from './pages/Statistics'
import Stock from './pages/Stock'
import { ToastContainer } from 'react-toastify'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
