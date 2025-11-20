import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import './App.css'

const App = () => (
  <BrowserRouter>
    <div className="app-shell">
      <nav className="top-nav">
        <div className="brand">Snake AI</div>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            How it works
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default App
