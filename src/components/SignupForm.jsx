"use client"

import { useState } from "react"
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

  if (submitted) {
    return (
      <section id="signup" className="signup-section">
        <div className="container">
          <div className="signup-success">
            <div className="success-icon">✓</div>
            <h2>Thank You!</h2>
            <p>
              🎉 You’re on the early TripNect waitlist! We’ll send you insider
              updates + first access when we launch.
            </p>
            <p>
              🚀 The first 500 signups will unlock exclusive beta invites + travel perks!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to Top
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup" className="signup-section">
      <div className="signup-bg-decoration"></div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Be the <span className="text-gradient">First</span> to Experience TripNect!
          </h2>
          <p className="section-subtitle">
            Join our waitlist to get early access and exclusive travel tips.
          </p>
        </div>

        <div className="form-container-wrapper">
          {/* Form */}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
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
              </div>

              <div className="form-group">
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
              </div>

              <div className="form-group">
                <label htmlFor="travelLocation">Where do you love to travel?</label>
                <select
                  id="travelLocation"
                  name="travelLocation"
                  value={formData.travelLocation}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your favorite type</option>
                  <option value="Mountains">🏔️ Mountains</option>
                  <option value="Beaches">🏖️ Beaches</option>
                  <option value="Cities">🌆 Cities</option>
                  <option value="Adventure">🎒 Adventure</option>
                  <option value="Heritage">🏛️ Heritage</option>
                  <option value="Road trips">🚗 Road Trips</option>
                  <option value="International">🌍 International</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="travelGroup">Do you usually travel solo or in groups?</label>
                <select
                  id="travelGroup"
                  name="travelGroup"
                  value={formData.travelGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select one</option>
                  <option value="Solo">👤 Solo</option>
                  <option value="Group">👥 Group</option>
                  <option value="Both">🔀 Both</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="travelVibe">What’s your travel vibe?</label>
                <select
                  id="travelVibe"
                  name="travelVibe"
                  value={formData.travelVibe}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your vibe</option>
                  <option value="Relax & Chill">😌 Relax & Chill</option>
                  <option value="Adventure Seeker">🧗 Adventure Seeker</option>
                  <option value="Culture Explorer">🏯 Culture Explorer</option>
                  <option value="Party & Nightlife">🎉 Party & Nightlife</option>
                  <option value="Food Lover">🍜 Food Lover</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="travelPlanning">When do you usually plan your trips?</label>
                <select
                  id="travelPlanning"
                  name="travelPlanning"
                  value={formData.travelPlanning}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select one</option>
                  <option value="Spontaneous">⚡ Spontaneous</option>
                  <option value="1–2 weeks before">📅 1–2 weeks before</option>
                  <option value="1–2 months before">🗓️ 1–2 months before</option>
                  <option value="Long-term planner">📖 Long-term planner</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dreamDestination">
                  If TripNect matched you with a travel buddy tomorrow, where would you want to go first?
                </label>
                <input
                  id="dreamDestination"
                  type="text"
                  name="dreamDestination"
                  value={formData.dreamDestination}
                  onChange={handleChange}
                  placeholder="e.g., Bali, Ladakh, Paris..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-button"
                disabled={submitting}
              >
                {submitting ? <span className="loading-spinner"></span> : "Join the Waitlist"}
              </button>

              {error && <p className="form-error">{error}</p>}
            </form>
          </div>

          {/* Info Side Box */}
          <div className="form-image">
            <div className="image-content">
              <h3>Join Our Community</h3>
              <ul>
                <li><span className="check-icon">✓</span> Early access to the platform</li>
                <li><span className="check-icon">✓</span> Exclusive travel tips and guides</li>
                <li><span className="check-icon">✓</span> Special discounts for early adopters</li>
                <li><span className="check-icon">✓</span> Priority customer support</li>
                <li><span className="check-icon">✓</span> Connect with like-minded travelers worldwide</li>
                <li><span className="check-icon">✓</span> Chance to join our private beta testing group</li>
              </ul>
            </div>

            <div className="info-card fun-fact-box">
              <h4>🌍 Did You Know?</h4>
              <p>
                70% of solo travelers say finding the right companion makes trips{" "}
                <strong>2x more memorable</strong>. With TripNect, you won’t just find a buddy—you’ll find a <em>travel match</em>.
              </p>
            </div>

            <div className="info-card highlight-box">
              <h4>🎁 Early Bird Rewards</h4>
              <p>
                The first <strong>500 signups</strong> will unlock exclusive{" "}
                <em>TripNect perks</em> — including travel e-guides, community shoutouts, and surprise discounts on future trips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm
