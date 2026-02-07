import React from 'react'
import { About } from '../components/Home/About'
import Search from '../components/Home/search'
import InputSelector from '../components/Home/InputSelector' 
import AudioPlayer from '../components/Home/AudioPlayer'
import TrustedBy from '../components/Home/TrustedBy'
import Features from '../components/Home/Features'
import Pricing from '../components/Home/Pricing'

export const LandingPage = () => {
  return (
    <>
      {/* Centered Hero Section */}
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 mt-8">
        
        {/* 1. Headline */}
        <About/>
        
        {/* 2. New Tabs Section */}
        <div className="w-full my-4">
          <InputSelector />
        </div>

        {/* 3. Search Bar */}
        <Search />

        {/* 4. Audio Player */}
        <AudioPlayer />

        {/* 5. Trusted By Section */}
        <TrustedBy />
        
      </div>

      {/* Full-width Page Sections */}
      <Features />
      <Pricing />
    </>
  )
}