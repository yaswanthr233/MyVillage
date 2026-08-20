import  {Routes, Route,useLocation} from 'react-router-dom'
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
import MyProfile from './pages/MyProfile/index.jsx'
import IssuesProvider from './contexts/IssuesProvider/index.jsx'
import DiscussionsProvider from './contexts/DiscussionsProvider/index.jsx'

function App() {
  const location = useLocation()
  const hideLayout = ['/login', '/register'].includes(location.pathname)
  const hideNavbar = ['/myprofile'].includes(location.pathname)

  return (
    <div className="App">
    {!(hideNavbar || hideLayout) && <Navbar />}
    
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <DiscussionsProvider>
            <Home />
            </DiscussionsProvider>
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
            <DiscussionsProvider>
          <Discussions />
          </DiscussionsProvider>
          </ProtectedRoute>
          } /> 
        <Route path="/grampanchayat" element={
          <ProtectedRoute>
            <IssuesProvider>
            <GramPanchayat />
            </IssuesProvider>
          </ProtectedRoute>
        }/>
        <Route path="/issues" element={
          <ProtectedRoute>
            <IssuesProvider >
            <Issues />
            </IssuesProvider>
          </ProtectedRoute>
        } />
        <Route path="/myprofile" element={
          <ProtectedRoute>
            <IssuesProvider >
            <MyProfile />
            </IssuesProvider>
          </ProtectedRoute>
        } />
      </Routes>
      {!hideLayout && <Footer/>}
      </div>
  )
}

export default App
