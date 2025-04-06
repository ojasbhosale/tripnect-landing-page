"use client"

import { useEffect, useState } from "react"
import "../styles/Loader.css"

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Slower progress increment for better experience
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 100%
        const increment = prev < 70 ? Math.floor(Math.random() * 8) : Math.floor(Math.random() * 3)
        const newProgress = prev + increment
        
        if (newProgress >= 100) {
          clearInterval(interval)
          
          // Add delay before starting fade out
          setTimeout(() => {
            setIsVisible(false)
            
            // Notify parent component after fade out animation completes
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete()
            }, 1000) // Match this with your CSS transition time
          }, 500) // Delay before fade out starts
          
          return 100
        }
        
        return newProgress
      })
    }, 120) // Slightly slower interval

    return () => clearInterval(interval)
  }, [onLoadComplete])

  if (!isVisible) return null

  return (
    <div className={`loader-container ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <span className="gradient-text">TripNect</span>
        </div>
        <div className="loader-progress-container">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loader-text">
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}

export default Loader