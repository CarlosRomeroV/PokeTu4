import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import OffertList from './pages/OfferList'
import OffertForm from './pages/OfferForm'
import OfferDetail from './pages/OfferDetail'
import { Toaster } from 'react-hot-toast'
import GuessGame from './pages/GuessGame'
import TCGgame from './pages/TCGgame'

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
            <Route path="/offers" element={<OffertList/>} />
            <Route path="/offers/:id" element={<OfferDetail/>} />
            <Route path="/offers/new" element={<OffertForm/>} />
            <Route path="/offers/edit/:id" element={<OffertForm/>} />
            <Route path='/TCGgame' element={<TCGgame/>}/>
          </Routes>
        </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
