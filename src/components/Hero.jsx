"use client"

import { useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import "../styles/Hero.css"
// Import videos directly
import clip1 from "../assets/clip1.mp4"
import clip2 from "../assets/clip2.mp4"
import clip3 from "../assets/clip3.mp4"

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  // Use imported video variables
  const videos = [clip1, clip2, clip3]

  // Handle video rotation
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length)
    }, 10000) // Change video every 10 seconds

    return () => clearInterval(videoInterval)
  }, [videos.length])

  const scrollToSignup = () => {
    const signupSection = document.getElementById("signup")
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.4,
      },
    },
    hover: {
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  }

  const taglineWords = [
    { text: "Adventure", color: "var(--primary)" },
    { text: "Connection", color: "var(--secondary)" },
    { text: "Discovery", color: "var(--accent)" }
  ]

  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % taglineWords.length)
    }, 3000)

    return () => clearInterval(taglineInterval)
  }, [taglineWords.length])

  return (
    <section id="hero" className="hero-section">
      <div className="video-background">
        <div className="video-container">
          <video
            key={currentVideoIndex}
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
            src={videos[currentVideoIndex]}
          />
        </div>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">
        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 className="hero-title" variants={itemVariants}>
            Embark on <span className="text-gradient">Extraordinary</span> Journeys
          </motion.h1>

          <motion.div className="hero-tagline" variants={itemVariants}>
            <span className="tagline-prefix">Where </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTagline}
                className="tagline-word"
                style={{ color: taglineWords[currentTagline].color }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {taglineWords[currentTagline].text}
              </motion.span>
            </AnimatePresence>
            <span className="tagline-suffix"> Begins</span>
          </motion.div>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Connect with like-minded explorers who share your wanderlust. Create unforgettable 
            memories as you discover the world's most breathtaking destinations together.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              onClick={scrollToSignup}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Start Your Journey
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Features
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll</div>
      </div>
    </section>
  )
}

export default Hero