"use client"

import { useState, useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion"
import { useForm, ValidationError } from "@formspree/react"
import "../styles/SignupForm.css"

const SignupForm = () => {
  // Replace with your actual Formspree form ID
  const [state, handleSubmit] = useForm("mnnppdag")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelInterest: "",
  })

  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  if (state.succeeded) {
    return (
      <section id="signup" className="signup-section" ref={ref}>
        <div className="container">
          <motion.div
            className="signup-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          >
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>You've been added to our waitlist. We'll notify you when TripNect launches!</p>
            <motion.button
              className="btn btn-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Top
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="signup-section" ref={ref}>
      <div className="signup-bg-decoration"></div>

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
            Be the <span className="text-gradient">First</span> to Experience TripNect!
          </h2>
          <p className="section-subtitle">Join our waitlist to get early access and exclusive travel tips.</p>
        </motion.div>

        <div className="form-container-wrapper">
          <motion.div className="form-container" variants={containerVariants} initial="hidden" animate={controls}>
            <div className="form-decoration top-left"></div>
            <div className="form-decoration bottom-right"></div>

            <form onSubmit={handleSubmit}>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="travelInterest">Travel Interest</label>
                <select
                  id="travelInterest"
                  name="travelInterest"
                  value={formData.travelInterest}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your interest
                  </option>
                  <option value="Solo Travel">Solo Travel</option>
                  <option value="Group Travel">Group Travel</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural Experience">Cultural Experience</option>
                  <option value="Budget Travel">Budget Travel</option>
                  <option value="Luxury Travel">Luxury Travel</option>
                </select>
                <ValidationError prefix="Travel Interest" field="travelInterest" errors={state.errors} />
              </motion.div>

              <motion.button
                type="submit"
                className="btn btn-primary form-button"
                disabled={state.submitting}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {state.submitting ? <span className="loading-spinner"></span> : "Join the Waitlist"}
              </motion.button>
              <ValidationError errors={state.errors} />
            </form>
          </motion.div>

          <motion.div
            className="form-image"
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            <div className="image-content">
              <h3>Join Our Community</h3>
              <ul>
                <li>
                  <span className="check-icon">✓</span>
                  Early access to the platform
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  Exclusive travel tips and guides
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  Special discounts for early adopters
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  Priority customer support
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm

