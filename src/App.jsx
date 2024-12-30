import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import { AuthProvider } from './context/AuthPrivider'
import NavPage from './pages/NavPage'

function App() {
  

  return (
   <>
   <NavPage/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/notes' element={ <AuthProvider> <Notes/></AuthProvider>} />
   </Routes>

   </>
  )
}

export default App
