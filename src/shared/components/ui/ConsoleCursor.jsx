import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { usePcBootOptional } from "../../../features/home/context/PcBootContext"

/** Cantidad de “fantasmas” en la estela */
const TRAIL_LENGTH = 12
/** Intervalo mínimo entre muestras de la estela (ms) */
const SAMPLE_MS = 18

/**
 * Cursor consola (bloque █) + estela fantasma.
 * En Inicio solo se activa cuando el boot del PC 3D terminó.
 * En el resto de rutas está disponible de inmediato.
 */
export function ConsoleCursor() {
  const boot = usePcBootOptional()
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  // Durante boot en Inicio: sin cursor custom. Fuera de Inicio o ya ready: sí.
  const bootAllows =
    boot == null || boot.isReady || !isHome

  const [enabled, setEnabled] = useState(false)
  const layerRef = useRef(null)
  const mainRef = useRef(null)
  const trailRefs = useRef([])
  const trail = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0, a: 0 }))
  )
  const lastSample = useRef(0)
  const raf = useRef(0)
  const hovering = useRef(false)

  useEffect(() => {
    if (!bootAllows) {
      setEnabled(false)
      document.documentElement.classList.remove("console-cursor-on")
      return
    }

    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) {
      setEnabled(false)
      return
    }
    setEnabled(true)
    document.documentElement.classList.add("console-cursor-on")

    const moveMain = (x, y) => {
      const main = mainRef.current
      if (main) {
        main.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const paintTrail = () => {
      trail.current.forEach((p, i) => {
        const el = trailRefs.current[i]
        if (!el) return
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        el.style.opacity = String(p.a)
      })
      raf.current = requestAnimationFrame(paintTrail)
    }
    raf.current = requestAnimationFrame(paintTrail)

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      moveMain(x, y)

      if (layerRef.current) {
        layerRef.current.style.opacity = "1"
      }

      const now = performance.now()
      if (now - lastSample.current < SAMPLE_MS) return
      lastSample.current = now

      const next = trail.current
      for (let i = next.length - 1; i > 0; i--) {
        next[i].x = next[i - 1].x
        next[i].y = next[i - 1].y
        next[i].a = next[i - 1].a * 0.82
      }
      next[0].x = x
      next[0].y = y
      next[0].a = 0.55
    }

    const onLeave = () => {
      if (layerRef.current) layerRef.current.style.opacity = "0"
    }

    const onEnter = () => {
      if (layerRef.current) layerRef.current.style.opacity = "1"
    }

    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const interactive = Boolean(
        t.closest(
          "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
        )
      )
      if (interactive === hovering.current) return
      hovering.current = interactive
      mainRef.current?.classList.toggle("is-hover", interactive)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    return () => {
      cancelAnimationFrame(raf.current)
      document.documentElement.classList.remove("console-cursor-on")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
    }
  }, [bootAllows])

  useEffect(() => {
    if (!enabled) return
    const id = setInterval(() => {
      trail.current.forEach((p) => {
        p.a *= 0.88
        if (p.a < 0.02) p.a = 0
      })
    }, 40)
    return () => clearInterval(id)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={layerRef}
      className="console-cursor-layer"
      aria-hidden
      style={{ opacity: 0 }}
    >
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className="console-cursor-ghost"
          style={{
            width: `${Math.max(6, 10 - i * 0.25)}px`,
            height: `${Math.max(10, 16 - i * 0.35)}px`,
          }}
        />
      ))}
      <span ref={mainRef} className="console-cursor-main" />
    </div>
  )
}
