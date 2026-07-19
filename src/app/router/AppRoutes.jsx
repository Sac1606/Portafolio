import { Routes, Route, Navigate } from "react-router-dom"
import { PortfolioLayout } from "../../shared/components/layout/PortfolioLayout.jsx"
import { HomePage } from "../../features/home/pages/HomePage.jsx"
import { AboutPage } from "../../features/about/pages/AboutPage.jsx"
import { ProjectsPage } from "../../features/projects/pages/ProjectsPage.jsx"
import { TechnologiesPage } from "../../features/tech/pages/TechnologiesPage.jsx"
import { ContactPage } from "../../features/contact/pages/ContactPage.jsx"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PortfolioLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-mi" element={<AboutPage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/tecnologias" element={<TechnologiesPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
