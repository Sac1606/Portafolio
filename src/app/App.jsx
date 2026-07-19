import { useEffect } from "react"
import { BrowserRouter, useLocation } from "react-router-dom"
import { AppRoutes } from "./router/AppRoutes.jsx"

function RouteScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <RouteScrollReset />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
