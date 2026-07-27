import { useEffect, useRef, useState } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { HomePage } from "../../../features/home/pages/HomePage.jsx"
import { AboutPage } from "../../../features/about/pages/AboutPage.jsx"
import { ProjectsPage } from "../../../features/projects/pages/ProjectsPage.jsx"
import { TechnologiesPage } from "../../../features/tech/pages/TechnologiesPage.jsx"
import { ContactPage } from "../../../features/contact/pages/ContactPage.jsx"

/** Duración exit/enter (ms) — debe coincidir con el CSS */
const EXIT_MS = 180
const ENTER_MS = 220

/**
 * Transición corta solo con opacity (sin blur).
 * El blur + animaciones largas provocaban la pantalla gris/trabada
 * al ir a Inicio (PC 3D) u otras rutas.
 */
export const AnimatedRoutes = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState("page-enter")
  const stageRef = useRef(stage)
  const timerRef = useRef(null)

  stageRef.current = stage

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return

    clearTimer()
    setStage("page-exit")

    // Fallback por si animationend no dispara (WebGL, pestaña oculta, etc.)
    timerRef.current = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      // Un frame en opacity 0, luego enter
      requestAnimationFrame(() => {
        setStage("page-enter")
      })
    }, EXIT_MS)

    return clearTimer
  }, [location, displayLocation.pathname])

  const handleAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return
    if (stageRef.current !== "page-exit") return

    // Si el timeout ya avanzó la ruta, no duplicar
    clearTimer()
    setDisplayLocation(location)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    requestAnimationFrame(() => {
      setStage("page-enter")
    })
  }

  return (
    <div
      className={`page-stage ${stage}`}
      onAnimationEnd={handleAnimationEnd}
      style={{
        // evita “flash” gris: fondo transparente sobre el layout
        background: "transparent",
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-mi" element={<AboutPage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/tecnologias" element={<TechnologiesPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
