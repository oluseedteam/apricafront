import React from 'react'
import { About } from '../components/Home/About'
import Search from '../components/Home/search'
// Import the new component
import InputSelector from '../components/Home/InputSelector' 

export const LandingPage = () => {
  return (
    // Use flex-col and items-center to center everything horizontally
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 mt-8">
      
      {/* 1. Headline */}
      <About/>
      
      {/* 2. New Tabs Section */}
      <div className="w-full my-4">
        <InputSelector />
      </div>

      {/* 3. Search Bar */}
      <Search />
      
    </div>
  )
}