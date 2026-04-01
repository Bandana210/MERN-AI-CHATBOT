
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

function App() {
  console.log(useAuth().isLoggedIn)
  return <main>
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/chat" element={<Chat/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>  </main>
} 

export default App;
