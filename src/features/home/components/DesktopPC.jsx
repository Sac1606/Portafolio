import { lazy, Suspense } from "react"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"

const DesktopPCScene = lazy(() =>
  import("./DesktopPCScene").then((m) => ({ default: m.DesktopPCScene }))
)

function PCFallback() {
  return (
    <div className="flex h-[320px] items-center justify-center sm:h-[380px] lg:h-[440px]">
      <p className="font-mono text-xs text-term-green">inicializando_gpu…</p>
    </div>
  )
}

/** PC 3D interactiva para el hero (lazy + ventana terminal). */
export function DesktopPC() {
  return (
    <TerminalWindow title="isaac@portfolio:~/desktop-pc" bodyClassName="!p-0 overflow-hidden">
      <Suspense fallback={<PCFallback />}>
        <DesktopPCScene />
      </Suspense>
    </TerminalWindow>
  )
}
