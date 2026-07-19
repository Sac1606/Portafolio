import { Outlet } from "react-router-dom"
import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export const PortfolioLayout = () => {
  return (
    <div className="relative min-h-screen text-term-text">
      <Background />
      <Navbar />
      <main className="page-content relative z-10 min-h-[70vh] pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
