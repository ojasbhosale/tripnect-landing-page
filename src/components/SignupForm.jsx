"use client"

import { useState, useEffect, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from "framer-motion"
import "../styles/SignupForm.css"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelLocation: "",
    travelGroup: "",
    travelVibe: "",
    travelPlanning: "",
    dreamDestination: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("https://usebasin.com/f/f561c10a7935", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          travelLocation: "",
          travelGroup: "",
          travelVibe: "",
          travelPlanning: "",
          dreamDestination: "",
        })
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
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

  if (submitted) {
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
            <p>
              🎉 You’re on the early TripNect waitlist! We’ll send you insider
              updates + first access when we launch.
            </p>
            <p>🚀 The first 500 signups will unlock exclusive beta invites + travel perks!</p>
            <motion.button
              className="btn btn-primary"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
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
            Be the <span className="text-gradient">First</span> to Experience
            TripNect!
          </h2>
          <p className="section-subtitle">
            Join our waitlist to get early access and exclusive travel tips.
          </p>
        </motion.div>

        <div className="form-container-wrapper">
          <motion.div
            className="form-container"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="form-decoration top-left"></div>
            <div className="form-decoration bottom-right"></div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
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
              </motion.div>

              {/* Email */}
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
              </motion.div>

              {/* Where do you love to travel */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="travelLocation">Where do you love to travel?</label>
                <select
                  id="travelLocation"
                  name="travelLocation"
                  value={formData.travelLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your favorite type
                  </option>
                  <option value="Mountains">🏔️ Mountains</option>
                  <option value="Beaches">🏖️ Beaches</option>
                  <option value="Cities">🌆 Cities</option>
                  <option value="Adventure">🎒 Adventure</option>
                  <option value="Heritage">🏛️ Heritage</option>
                  <option value="Road trips">🚗 Road Trips</option>
                  <option value="International">🌍 International</option>
                </select>
              </motion.div>

              {/* Solo or Group */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="travelGroup">
                  Do you usually travel solo or in groups?
                </label>
                <select
                  id="travelGroup"
                  name="travelGroup"
                  value={formData.travelGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Solo">👤 Solo</option>
                  <option value="Group">👥 Group</option>
                  <option value="Both">🔀 Both</option>
                </select>
              </motion.div>

              {/* Travel vibe */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="travelVibe">What’s your travel vibe?</label>
                <select
                  id="travelVibe"
                  name="travelVibe"
                  value={formData.travelVibe}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your vibe
                  </option>
                  <option value="Relax & Chill">😌 Relax & Chill</option>
                  <option value="Adventure Seeker">🧗 Adventure Seeker</option>
                  <option value="Culture Explorer">🏯 Culture Explorer</option>
                  <option value="Party & Nightlife">🎉 Party & Nightlife</option>
                  <option value="Food Lover">🍜 Food Lover</option>
                </select>
              </motion.div>

              {/* Travel planning */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="travelPlanning">
                  When do you usually plan your trips?
                </label>
                <select
                  id="travelPlanning"
                  name="travelPlanning"
                  value={formData.travelPlanning}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Spontaneous">⚡ Spontaneous</option>
                  <option value="1–2 weeks before">📅 1–2 weeks before</option>
                  <option value="1–2 months before">🗓️ 1–2 months before</option>
                  <option value="Long-term planner">📖 Long-term planner</option>
                </select>
              </motion.div>

              {/* Fun Question */}
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="dreamDestination">
                  If TripNect matched you with a travel buddy tomorrow, where
                  would you want to go first?
                </label>
                <input
                  id="dreamDestination"
                  type="text"
                  name="dreamDestination"
                  value={formData.dreamDestination}
                  onChange={handleChange}
                  placeholder="e.g., Bali, Ladakh, Paris..."
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn btn-primary form-button"
                disabled={submitting}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {submitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Join the Waitlist"
                )}
              </motion.button>

              {error && <p className="form-error">{error}</p>}
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
            <div>
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
                  <li>
                    <span className="check-icon">✓</span>
                    Connect with like-minded travelers worldwide
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    Chance to join our private beta testing group
                  </li>
                </ul>
              </div>

              {/* Fun fact */}
              <div className="info-card fun-fact-box">
                <h4>🌍 Did You Know?</h4>
                <p>
                  70% of solo travelers say finding the right companion makes trips{" "}
                  <strong>2x more memorable</strong>. With TripNect, you won’t just
                  find a buddy—you’ll find a <em>travel match</em>.
                </p>
              </div>

              {/* Rewards */}
              <div className="info-card highlight-box">
                <h4>🎁 Early Bird Rewards</h4>
                <p>
                  The first <strong>100 signups</strong> will unlock exclusive{" "}
                  <em>TripNect perks</em> — including travel e-guides, community
                  shoutouts, and surprise discounts on future trips.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default SignupForm
