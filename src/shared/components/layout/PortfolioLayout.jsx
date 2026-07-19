import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export const PortfolioLayout = () => {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-screen text-term-text">
      <Background />
      <Navbar />
      <main className="page-content relative z-10 min-h-[70vh] pt-16">
        {/*
          Contenedor relativo: la vista que sale se posiciona absolute
          para que entre y salga a la vez (sin hueco en blanco).
        */}
        <div className="relative w-full">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={location.pathname}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 22, scale: 0.985 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -16,
                      scale: 0.99,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                    }
              }
              transition={{
                duration: reduceMotion ? 0.15 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full will-change-transform"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
}
