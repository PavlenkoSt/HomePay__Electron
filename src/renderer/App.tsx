import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react-lite'

import { useStore } from './store'

import Home from './pages/Home'
import Budget from './pages/Budget'
import Statistics from './pages/Statistics'
import Stock from './pages/Stock'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@djthoms/pretty-checkbox'

const App = () => {
  const { historyStore, moneyStore, productsStore } = useStore()

  useEffect(() => {
    historyStore.init()
    moneyStore.init()
    productsStore.init()
  }, [])

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

export default observer(App)
