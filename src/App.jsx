import { useState,useEffect } from 'react'
import  {Routes, Route,useLocation} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/index.jsx'
import Register from './pages/Register/index.jsx'
import Home from './pages/Home/index.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Discussions from './pages/Discussions/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import Footer from './components/Footer/index.jsx'
import GramPanchayat from './pages/GramPanchayat/index.jsx'
import Issues from './pages/Issues/index.jsx'

function App() {
  const location = useLocation()
  const hideLayout = ['/login', '/register'].includes(location.pathname)
  
  return (
    <div className="App">
      
    {!hideLayout && <Navbar />}
    
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <Login />
          } />
        <Route path="/register" element={
            <Register />
        } />
        <Route path="/discussions" element={
          <ProtectedRoute>
          <Discussions />
          </ProtectedRoute>
          } /> 
        <Route path="/grampanchayat" element={
          <ProtectedRoute>
            <GramPanchayat />
          </ProtectedRoute>
        }/>
        <Route path="/issues" element={
          <ProtectedRoute>
            <Issues />
          </ProtectedRoute>
        } />
      </Routes>
      {!hideLayout && <Footer/>}
      </div>
  )
}

export default App
