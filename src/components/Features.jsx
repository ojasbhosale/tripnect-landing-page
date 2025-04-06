"use client"

import { useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion"
import "../styles/Features.css"

const Features = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const features = [
    {
      icon: "👥",
      title: "Perfect Matchmaking",
      description:
        "No more canceled plans! Our smart algorithm connects you with travelers who share your interests, budget, and travel dates.",
      color: "var(--primary)",
    },
    {
      icon: "🛡️",
      title: "Safe and Verified Travel",
      description:
        "Travel with peace of mind. Verified profiles and in-app chat ensure secure communication before your trip.",
      color: "var(--secondary)",
    },
    {
      icon: "👪",
      title: "Shared Experiences",
      description:
        "Experience more by traveling together. Save costs on accommodations, transport, and activities by sharing expenses.",
      color: "var(--accent)",
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
    <section id="features" className="features-section" ref={ref}>
      <div className="features-bg-decoration"></div>

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
           Why Choose <span className="text-gradient">TripNect</span>?
          </h2>
          <p className="section-subtitle">
            We've designed TripNect to make finding travel companions easy, safe, and enjoyable.
          </p>
        </motion.div>

        <motion.div className="features-grid" variants={containerVariants} initial="hidden" animate={controls}>
          {features.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="feature-icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-decoration"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.8,
                duration: 0.6,
              },
            },
          }}
        >
          <p>Ready to find your perfect travel companion?</p>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("signup").scrollIntoView({ behavior: "smooth" })}
          >
            Join the Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Features

