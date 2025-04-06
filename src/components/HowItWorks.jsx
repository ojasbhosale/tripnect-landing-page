"use client"

import { useEffect, useRef, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion"
import "../styles/HowItWorks.css"
import pic1 from "../assets/pic1.jpg"
import pic2 from "../assets/pic2.jpg"
import pic3 from "../assets/pic3.jpg"
import pic4 from "../assets/pic4.jpg"


const HowItWorks = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Background images array
  const backgroundImages = [pic1, pic2, pic3, pic4]

  // Auto slideshow for background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // Change image every 3 seconds
    
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const steps = [
    {
      icon: "👤",
      title: "Create Your Profile",
      description: "Tell us about your travel interests, preferred destinations, and budget.",
      color: "var(--primary)",
    },
    {
      icon: "🔍",
      title: "Find Your Match",
      description: "Our algorithm recommends compatible travel companions based on your preferences.",
      color: "var(--secondary)",
    },
    {
      icon: "💬",
      title: "Plan Together",
      description: "Chat, collaborate, and finalize your trip details directly on the platform.",
      color: "var(--accent)",
    },
    {
      icon: "✈️",
      title: "Enjoy Your Journey",
      description: "Meet your new travel companions and explore the world together!",
      color: "var(--primary-dark)",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <section id="how-it-works" className="how-it-works-section" ref={ref}>
      {/* Background slideshow */}
      <div className="background-slideshow-container">
        {backgroundImages.map((image, index) => (
          <div 
            key={image}
            className={`background-slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="background-overlay"></div>
      </div>
      
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="section-title">
            How <span className="text-gradient">TripNect</span> Works
          </h2>
          <p className="section-subtitle">
            Our simple 4-step process makes finding travel companions and planning trips together effortless.
          </p>
        </motion.div>

        <div className="steps-wrapper">
          <div className="steps-timeline"></div>

          <motion.div className="steps-container" variants={containerVariants} initial="hidden" animate={controls}>
            {steps.map((step, index) => (
              <motion.div
                className="step-card"
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="step-number">{index + 1}</div>
                <div
                  className="step-icon-wrapper"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}80)`,
                  }}
                >
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <div className="step-decoration"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks