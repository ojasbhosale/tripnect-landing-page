"use client"

import React from "react"
import ReactDOM from "react-dom/client"
import { AnimatePresence } from "framer-motion"
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </React.StrictMode>,
)

