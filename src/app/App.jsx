import { Background } from "../shared/components/layout/Background"
import { Navbar } from "../shared/components/layout/Navbar"
import { Footer } from "../shared/components/layout/Footer"
import { Hero } from "../features/hero/components/Hero"
import { About } from "../features/about/components/About"

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
