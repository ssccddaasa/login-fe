import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Switch } from './components/Switch'
import { Dashboard } from './components/Dashboard'
import { SignUp } from './components/SignUp'
import { AuthenticationTitle } from './components/AuthenticationTitle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Switch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<AuthenticationTitle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
