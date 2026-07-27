import { lazy, Suspense, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import pcModelUrl from "../../../assets/models/PC.glb?url"
import { DesktopPCErrorBoundary } from "./DesktopPCErrorBoundary"
import { usePcBootOptional } from "../context/PcBootContext"

const sceneImport = () =>
  import("./DesktopPCScene").then((m) => ({ default: m.DesktopPCScene }))

const DesktopPCScene = lazy(sceneImport)

/** Fallback mínimo: el progreso real lo muestra BootScreen a pantalla completa */
function PCFallback() {
  return (
    <div
      className="relative h-full min-h-[320px] w-full bg-term-bg/20"
      aria-hidden
    />
  )
}

/**
 * @param {{ active?: boolean }} props
 * active=false → canvas en pausa (sigue montado, no vuelve a cargar el GLB)
 */
export function DesktopPC({ active = true }) {
  const boot = usePcBootOptional()
  const setBootProgress = boot?.setBootProgress
  const markFailed = boot?.markFailed

  useEffect(() => {
    setBootProgress?.(3)
    sceneImport()
      .then(() => setBootProgress?.(8))
      .catch(() => markFailed?.())
    try {
      useGLTF.preload(pcModelUrl, true)
    } catch {
      /* ignore */
    }
    // Solo al montar el PC (callbacks del context son estables)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-full min-h-[320px] w-full min-w-0">
      <DesktopPCErrorBoundary onError={() => markFailed?.()}>
        <Suspense fallback={<PCFallback />}>
          <DesktopPCScene active={active} />
        </Suspense>
      </DesktopPCErrorBoundary>
    </div>
  )
}
