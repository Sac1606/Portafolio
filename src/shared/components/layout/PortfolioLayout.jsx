import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export const PortfolioLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen text-term-text">
      <Background />
      <Navbar />
      <main className="relative z-10 min-h-[70vh] pt-16">{children}</main>
      <Footer />
    </div>
  )
}
