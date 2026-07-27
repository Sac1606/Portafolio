import { Background } from "./Background"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { AnimatedRoutes } from "./AnimatedRoutes"
import { ConsoleCursor } from "../ui/ConsoleCursor"
import { BootScreen } from "../ui/BootScreen"
import { PersistentDesktopPC } from "../../../features/home/components/PersistentDesktopPC"
import { PcBootProvider } from "../../../features/home/context/PcBootContext"

export const PortfolioLayout = () => {
  return (
    <PcBootProvider>
      <div className="relative min-h-screen text-term-text">
        <Background />
        <Navbar />
        <main className="relative z-10 min-h-[70vh] pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
        {/* PC 3D persistente: no se destruye al salir de Inicio */}
        <PersistentDesktopPC />
        {/* Boot full-screen hasta que el PC 3D esté listo */}
        <BootScreen />
        {/* Cursor consola + estela (solo tras boot, solo ratón fino) */}
        <ConsoleCursor />
      </div>
    </PcBootProvider>
  )
}
