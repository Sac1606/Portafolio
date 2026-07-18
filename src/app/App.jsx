import { Background } from "../shared/components/layout/Background"
import { Navbar } from "../shared/components/layout/Navbar"
import { Footer } from "../shared/components/layout/Footer"
import { Hero } from "../features/hero/components/Hero"
import { About } from "../features/about/components/About"
import { Projects } from "../features/projects/components/Projects"
import { Technologies } from "../features/tech/components/Technologies"
import { Contact } from "../features/contact/components/Contact"

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
