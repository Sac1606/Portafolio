import { useEffect, useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { DesktopPC } from "./DesktopPC"

const SLOT_ID = "hero-pc-slot"

function scheduleIdle(fn, timeout = 2000) {
  if (typeof window === "undefined") return () => {}
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout })
    return () => window.cancelIdleCallback?.(id)
  }
  const t = window.setTimeout(fn, Math.min(timeout, 400))
  return () => clearTimeout(t)
}

/**
 * PC 3D montado UNA sola vez fuera de las rutas.
 *
 * Importante: la visibilidad sigue al SLOT del hero (no solo a la URL),
 * porque AnimatedRoutes “congela” la página saliente y la URL ya cambió.
 * Así el PC no desaparece a mitad de la animación de salida de Inicio.
 */
export function PersistentDesktopPC() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"
  const [mounted, setMounted] = useState(false)
  const [box, setBox] = useState(null)

  // Montar al entrar a Inicio o en idle (precarga mientras ves otras páginas)
  useEffect(() => {
    if (isHome) {
      setMounted(true)
      return
    }
    return scheduleIdle(() => setMounted(true), 1600)
  }, [isHome])

  // Seguir el hueco #hero-pc-slot mientras exista en el DOM
  useLayoutEffect(() => {
    let raf = 0
    let alive = true

    const measure = () => {
      if (!alive) return
      const el = document.getElementById(SLOT_ID)
      if (!el) {
        setBox((prev) => (prev == null ? prev : null))
        return
      }
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) {
        raf = requestAnimationFrame(measure)
        return
      }
      setBox((prev) => {
        if (
          prev &&
          Math.abs(prev.top - r.top) < 0.5 &&
          Math.abs(prev.left - r.left) < 0.5 &&
          Math.abs(prev.width - r.width) < 0.5 &&
          Math.abs(prev.height - r.height) < 0.5
        ) {
          return prev
        }
        return {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
        }
      })
    }

    measure()
    // Re-medir en scroll/resize y un rato tras cambiar de ruta (transiciones)
    const onWin = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    window.addEventListener("resize", onWin)
    window.addEventListener("scroll", onWin, true)

    // Poll corto tras cambio de ruta: el slot aparece/desaparece con la animación
    const poll = window.setInterval(measure, 100)
    const stopPoll = window.setTimeout(() => clearInterval(poll), 1200)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      clearInterval(poll)
      clearTimeout(stopPoll)
      window.removeEventListener("resize", onWin)
      window.removeEventListener("scroll", onWin, true)
    }
  }, [pathname])

  if (!mounted) return null

  const active = box != null

  return (
    <div
      className={
        active
          ? "persistent-pc persistent-pc--active"
          : "persistent-pc persistent-pc--idle"
      }
      style={
        active
          ? {
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }
          : undefined
      }
      aria-hidden={!active}
    >
      <DesktopPC active={active} />
    </div>
  )
}

export const HERO_PC_SLOT_ID = SLOT_ID
