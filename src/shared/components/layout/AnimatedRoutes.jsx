import { useEffect, useRef, useState } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { HomePage } from "../../../features/home/pages/HomePage.jsx"
import { AboutPage } from "../../../features/about/pages/AboutPage.jsx"
import { ProjectsPage } from "../../../features/projects/pages/ProjectsPage.jsx"
import { TechnologiesPage } from "../../../features/tech/pages/TechnologiesPage.jsx"
import { ContactPage } from "../../../features/contact/pages/ContactPage.jsx"

/**
 * Animación de vistas fiable en todos los navegadores:
 * 1) fade-out de la vista actual
 * 2) cambio de ruta “congelada” (displayLocation)
 * 3) fade-in de la nueva vista
 *
 * No usa Outlet durante la transición (Outlet siempre pinta la ruta nueva
 * y rompe la animación de salida).
 */
export const AnimatedRoutes = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState("page-enter")
  const pendingPath = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return
    pendingPath.current = location.pathname
    setStage("page-exit")
  }, [location, displayLocation.pathname])

  const handleAnimationEnd = (event) => {
    // Solo reaccionar a la animación del contenedor, no de hijos
    if (event.target !== event.currentTarget) return

    if (stage === "page-exit") {
      setDisplayLocation(location)
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      // Doble rAF: asegura que el browser pinte opacity:0 antes del enter
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage("page-enter")
        })
      })
    }
  }

  return (
    <div
      className={`page-stage ${stage}`}
      onAnimationEnd={handleAnimationEnd}
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
