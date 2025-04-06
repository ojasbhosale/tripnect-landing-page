"use client"

import { useEffect, useState } from "react"
import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import Features from "./components/Features.jsx"
import HowItWorks from "./components/HowItWorks.jsx"
import SignupForm from "./components/SignupForm.jsx"
import Footer from "./components/Footer.jsx"
import Cursor from "./components/Cursor.jsx"
import Loader from "./components/Loader.jsx"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add loaded class to body when component mounts
    document.body.classList.add("loading")

    // Simulate loading time and then remove loader
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.classList.remove("loading")
      document.body.classList.add("loaded")
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.classList.remove("loading", "loaded")
    }
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="App">
          <div className="noise"></div>
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Features />
            <HowItWorks />
            <SignupForm />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App

