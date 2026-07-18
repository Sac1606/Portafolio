import { Background } from "../shared/components/layout/Background"
import { Navbar } from "../shared/components/layout/Navbar"
import { Footer } from "../shared/components/layout/Footer"

function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main className="min-h-[50vh]" />
      <Footer />
    </div>
  )
}

export default App
