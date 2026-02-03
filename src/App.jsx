// Modern Agency Website is a responsive web platform designed for digital agencies to showcase their services, highlight work, and capture leads through a built-in contact form so businesses can attract clients and collect inquiries efficiently.
// Optional addition (if asked about your role):
// You focused on designing the user experience and implementing core features like animated sections and the contact submission workflow.

// GreatStack - yt link - https://youtu.be/sbMHR9K60NY?list=PLjwm_8O3suyMMs7kfDD-p-yIhlmEgJkDj



import React, { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/ourWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { motion } from "motion/react" //https://motion.dev/

const App = () => {
  // const [theme, setTheme] = useState('light')
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  //Refs for custom cursor position tracking
  const mouse = useRef({x:0, y:0})
  const position = useRef({x:0, y:0})

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.8
      position.current.y += (mouse.current.y - position.current.y) * 0.8

      if(dotRef.current && outlineRef.current){
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
      }

      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })

  
  return (
    <div className = 'dark:bg-black relative'>
      <Toaster/>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Hero/>
      <TrustedBy/>
      <Services/>
      <OurWork/>
      <Teams/>
      <ContactUs/>
      <Footer theme={theme}/>

      {/* Custom Cursor Ring */}
      <div ref={outlineRef} className='fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]' style={{transition : `transform 0.1s ease-out`}}></div>
      
      {/* Custom Cursor Dot */}
      <div ref={dotRef} className='fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]' ></div>

    </div>
  )
}

export default App
