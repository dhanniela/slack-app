import { useState } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './components/Dashboard'
import { PrivateRoutes } from './components/PrivateRoutes';
import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>{Dashboard}</Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App