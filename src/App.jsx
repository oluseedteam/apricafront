import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './ui/LandingPage'
import Navbar from './components/Home/Navbar' 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App