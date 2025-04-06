"use client"

import { useState, useEffect, useRef, useMemo } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { Plane } from "lucide-react"  // Changed to Plane icon
import "../styles/Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const navRef = useRef(null)
  
  // Fix ESLint warning by using useMemo for sections array
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
  }, [sections])  // Now sections won't change between renders

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
      y: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
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
    closed: { opacity: 0 },
    open: { opacity: 1 }
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
            transition={{ duration: 0.2 }}
          >
            <motion.ul variants={menuVariants}>
              <motion.li variants={itemVariants}>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("features")
                  }}
                >
                  Benefits
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("how-it-works")
                  }}
                >
                  How It Works
                </a>
              </motion.li>
              <motion.li className="mobile-menu-cta" variants={itemVariants}>
                <a
                  href="#signup"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("signup")
                  }}
                >
                  Join Waitlist
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar