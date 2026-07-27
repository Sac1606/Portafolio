import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { usePcBoot } from "../../../features/home/context/PcBootContext"
import { TerminalWindow } from "./TerminalWindow"
import { TerminalPrompt } from "./TerminalPrompt"

/**
 * Barra ASCII estilo terminal: [=====>········] 42%
 */
function AsciiProgress({ percent }) {
  const total = 22
  const filled = Math.round((Math.min(100, Math.max(0, percent)) / 100) * total)
  const bar =
    "=".repeat(Math.max(0, filled - 1)) +
    (filled > 0 ? ">" : "") +
    "·".repeat(Math.max(0, total - filled))
  return (
    <p className="font-mono text-sm text-term-green-bright sm:text-base">
      <span className="text-term-muted">[</span>
      {bar}
      <span className="text-term-muted">]</span>{" "}
      <span className="tabular-nums text-term-text">
        {String(Math.round(percent)).padStart(3, " ")}%
      </span>
    </p>
  )
}

function bootLines(progress, showReadyLine) {
  const lines = []

  if (progress >= 1 || showReadyLine) {
    lines.push({
      key: "gpu",
      kind: progress >= 15 || showReadyLine ? "ok" : "run",
      text:
        progress >= 15 || showReadyLine
          ? "inicializando_gpu………… OK"
          : "inicializando_gpu…………",
    })
  }

  if (progress >= 5 || showReadyLine) {
    const pct = Math.min(100, Math.max(0, progress))
    lines.push({
      key: "glb",
      kind: pct >= 92 || showReadyLine ? "ok" : "run",
      text:
        pct >= 92 || showReadyLine
          ? "cargando_modelo_pc……… OK"
          : `cargando_modelo_pc……… ${Math.round(pct)}%`,
    })
  }

  if (progress >= 70 || showReadyLine) {
    lines.push({
      key: "scene",
      kind: progress >= 96 || showReadyLine ? "ok" : "run",
      text:
        progress >= 96 || showReadyLine
          ? "montando_escena…………… OK"
          : "montando_escena……………",
    })
  }

  if (progress >= 94 || showReadyLine) {
    lines.push({
      key: "shaders",
      kind: progress >= 99 || showReadyLine ? "ok" : "run",
      text:
        progress >= 99 || showReadyLine
          ? "compilando_shaders……… OK"
          : "compilando_shaders………",
    })
  }

  if (showReadyLine || progress >= 100) {
    lines.push({
      key: "ready",
      kind: "ok",
      text: "sistema_listo",
    })
  }

  return lines
}

/**
 * Overlay full-screen de boot (estilo terminal).
 * Solo en Inicio (/) mientras el PC 3D no esté listo.
 * En otras rutas el PC puede precargar en idle sin bloquear la UI.
 */
export function BootScreen() {
  const { pathname } = useLocation()
  const { isReady, progress } = usePcBoot()
  const isHome = pathname === "/"
  const shouldBlock = isHome && !isReady

  const [visible, setVisible] = useState(shouldBlock)
  const [exiting, setExiting] = useState(false)
  const [showReadyLine, setShowReadyLine] = useState(false)
  const exitTimer = useRef(null)

  useEffect(() => {
    if (exitTimer.current) {
      clearTimeout(exitTimer.current)
      exitTimer.current = null
    }

    if (shouldBlock) {
      setVisible(true)
      setExiting(false)
      setShowReadyLine(false)
      return
    }

    // PC listo al 100% en Inicio → mensaje final, breve hold, luego fade-out
    if (isReady && isHome && visible) {
      setShowReadyLine(true)
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      // Hold en 100% para que se vea “sistema_listo” y el canvas ya esté estable
      const holdMs = reduce ? 120 : 450
      const fadeMs = reduce ? 80 : 380

      exitTimer.current = window.setTimeout(() => {
        setExiting(true)
        exitTimer.current = window.setTimeout(() => {
          setVisible(false)
          setExiting(false)
          exitTimer.current = null
        }, fadeMs)
      }, holdMs)

      return () => {
        if (exitTimer.current) clearTimeout(exitTimer.current)
      }
    }

    // Salimos de Inicio o no hay que bloquear → ocultar al momento
    if (!shouldBlock) {
      setVisible(false)
      setExiting(false)
      setShowReadyLine(false)
    }
  }, [shouldBlock, isReady, isHome, visible])

  // Mantener pc-booting (sin cursor / overflow) hasta que el overlay desaparezca del todo
  useEffect(() => {
    const root = document.documentElement
    if (visible) root.classList.add("pc-booting")
    else root.classList.remove("pc-booting")
    return () => root.classList.remove("pc-booting")
  }, [visible])

  const lines = useMemo(
    () => bootLines(progress, showReadyLine),
    [progress, showReadyLine]
  )

  if (!visible) return null

  return (
    <div
      className={`boot-screen fixed inset-0 z-[10000] flex items-center justify-center bg-term-bg/95 px-4 ${
        exiting ? "boot-screen--exit" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-busy={!isReady}
      aria-label="Cargando PC 3D del portafolio"
    >
      <div
        className="pointer-events-none absolute inset-0 term-grid opacity-40"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 term-scanlines" aria-hidden />

      <div className="relative w-full max-w-lg">
        <TerminalWindow
          title="isaac@portfolio: ~/system"
          className="shadow-[0_0_40px_rgba(74,222,128,0.08)]"
          bodyClassName="space-y-3 font-mono text-sm"
        >
          <TerminalPrompt user="isaac" command="boot --pc-3d" />

          <div className="mt-2 space-y-1.5 pl-0.5">
            {lines.length === 0 ? (
              <p className="text-term-green">
                <span className="text-term-mute">&gt; </span>
                esperando_recursos…
                <span className="term-cursor ml-0.5" aria-hidden />
              </p>
            ) : (
              lines.map((line) => (
                <p
                  key={line.key}
                  className={
                    line.kind === "ok" ? "text-term-muted" : "text-term-green"
                  }
                >
                  <span className="text-term-mute">&gt; </span>
                  {line.text}
                  {line.kind === "run" ? (
                    <span className="term-cursor ml-0.5" aria-hidden />
                  ) : null}
                </p>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-term-border-soft pt-4">
            <AsciiProgress
              percent={showReadyLine ? 100 : Math.max(progress, 2)}
            />
            <p className="mt-2 text-[11px] text-term-mute">
              # preparando escena 3D · mouse desactivado
            </p>
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}
