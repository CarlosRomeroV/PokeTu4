import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import GuessGame from './pages/GuessGame'
import TCGgame from './pages/TCGgame'
import GuessGameGif from './pages/GuessGameGif'
import PaginaBriant from './pages/PaginaBriant'

function App() {

  return (
    <>
      <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false}/>
        <div className='container mx-auto flex grow justify-center items-center'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/guessGame" element={<GuessGame/>} />
            <Route path='/TCGgame' element={<TCGgame/>}/>
            <Route path='/guessGameGif' element={<GuessGameGif/>}/>
            <Route path='/felizcumple' element={<PaginaBriant/>}/>

          </Routes>
        </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
