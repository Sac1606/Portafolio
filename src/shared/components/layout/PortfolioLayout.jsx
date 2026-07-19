import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { AnimatedRoutes } from "./AnimatedRoutes"

export const PortfolioLayout = () => {
  return (
    <div className="relative min-h-screen text-term-text">
      <Background />
      <Navbar />
      <main className="relative z-10 min-h-[70vh] pt-16">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}
