import { Routes, Route } from "react-router-dom"
import { PortfolioLayout } from "../../shared/components/layout/PortfolioLayout.jsx"

/**
 * Layout raíz. Las páginas viven dentro de AnimatedRoutes
 * (con location “congelada” para animar bien la salida).
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PortfolioLayout />} />
    </Routes>
  )
}
