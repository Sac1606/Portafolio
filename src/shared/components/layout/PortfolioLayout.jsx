import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { PageTransition } from "../ui/PageTransition"

export const PortfolioLayout = () => {
  const location = useLocation()

  return (
    <div className="relative min-h-screen text-term-text">
      <Background />
      <Navbar />
      <main className="relative z-10 min-h-[70vh] pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
