import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './ui/LandingPage'
import Navbar from './components/Home/Navbar'
import Dashboard from './components/Admin/Dashboard' 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Website */}
        <Route path='/' element={
          <>
            <Navbar />
            <LandingPage/>
          </>
        } />

        {/* Admin Dashboard */}
        <Route path='/admin' element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App