import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const PcBootContext = createContext(null)

/** Timeout de seguridad: no dejar al usuario atrapado si falla la carga */
const BOOT_SAFETY_MS = 15000

/**
 * Estado global del “boot” del PC 3D.
 * Una sola vez por sesión: al marcar ready, el overlay no vuelve a mostrarse.
 */
export function PcBootProvider({ children }) {
  const [isReady, setIsReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState("idle") // idle | loading | ready
  const readyRef = useRef(false)

  const setBootProgress = useCallback((value) => {
    if (readyRef.current) return
    const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)))
    setProgress((prev) => (n > prev ? n : prev))
    setPhase((p) => (p === "ready" ? p : "loading"))
  }, [])

  const markReady = useCallback(() => {
    if (readyRef.current) return
    readyRef.current = true
    setProgress(100)
    setPhase("ready")
    setIsReady(true)
  }, [])

  const markFailed = useCallback(() => {
    if (readyRef.current) return
    readyRef.current = true
    setProgress(100)
    setPhase("ready")
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (isReady) return
    const t = window.setTimeout(() => {
      if (!readyRef.current) {
        console.warn("[PcBoot] Timeout de seguridad: liberando UI")
        markReady()
      }
    }, BOOT_SAFETY_MS)
    return () => clearTimeout(t)
  }, [isReady, markReady])

  const value = useMemo(
    () => ({
      isReady,
      isBooting: !isReady,
      progress,
      phase,
      setBootProgress,
      markReady,
      markFailed,
    }),
    [isReady, progress, phase, setBootProgress, markReady, markFailed]
  )

  return (
    <PcBootContext.Provider value={value}>{children}</PcBootContext.Provider>
  )
}

export function usePcBoot() {
  const ctx = useContext(PcBootContext)
  if (!ctx) {
    throw new Error("usePcBoot debe usarse dentro de PcBootProvider")
  }
  return ctx
}

export function usePcBootOptional() {
  return useContext(PcBootContext)
}
