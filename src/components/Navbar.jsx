"use client"

import { useState, useEffect, useRef, useMemo } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { Plane } from "lucide-react"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const navRef = useRef(null)

  const sections = useMemo(() => ["hero", "features", "how-it-works", "signup"], [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section
      const currentScrollPos = window.scrollY + 100
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= currentScrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sections])

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
    }
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  }

  const backdropVariants = {
    closed: { opacity: 0, scale: 0.95 },
    open: { opacity: 1, scale: 1 },
  }

  return (
    <motion.nav
      ref={navRef}
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <Plane className="navbar-logo-icon" />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
          >
            TripNect
          </a>
        </div>

        <div className="navbar-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className="navbar-links">
          <li className={activeSection === "features" ? "active" : ""}>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("features")
              }}
            >
              Benefits
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li className={activeSection === "how-it-works" ? "active" : ""}>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("how-it-works")
              }}
            >
              How It Works
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li>
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("signup")
              }}
              className="nav-cta"
            >
              Join Waitlist
            </a>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <Plane className="navbar-logo-icon" />
                <span>TripNect</span>
              </div>
              <button className="mobile-close" onClick={toggleMobileMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <motion.ul variants={menuVariants}>
              {sections.slice(1).map((section, index) => (
                <motion.li key={section} variants={itemVariants}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section)
                    }}
                    className={activeSection === section ? "active" : ""}
                  >
                    <span className="menu-item-number">0{index + 1}</span>
                    <span className="menu-item-text">
                      {section === "features"
                        ? "Benefits"
                        : section === "how-it-works"
                          ? "How It Works"
                          : section === "signup"
                            ? "Join Waitlist"
                            : section}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mobile-menu-footer">
              <motion.button
                className="mobile-cta-button"
                onClick={() => scrollToSection("signup")}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Journey
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.div className="mobile-social-links" variants={itemVariants}>
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2.5H8C4.96243 2.5 2.5 4.96243 2.5 8V16C2.5 19.0376 4.96243 21.5 8 21.5H16C19.0376 21.5 21.5 19.0376 21.5 16V8C21.5 4.96243 19.0376 2.5 16 2.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M17.5 7C18.0523 7 18.5 6.55228 18.5 6C18.5 5.44772 18.0523 5 17.5 5C16.9477 5 16.5 5.44772 16.5 6C16.5 6.55228 16.9477 7 17.5 7Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

