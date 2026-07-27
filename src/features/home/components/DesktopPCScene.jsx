import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, useProgress } from "@react-three/drei"
import { DesktopPCModel } from "./DesktopPCModel"
import { pc3dConfig } from "../../../data/pc3d"
import { usePcBootOptional } from "../context/PcBootContext"

const STABLE_FRAMES = 6
const SETTLE_MS = 180
const DEFAULT_ROTATION_Y = Math.PI * 0.62
const DEFAULT_ROTATION_X = 0
const RESET_INACTIVITY_MS = 5000 // 5 segundos para volver a la posición inicial

function BootProgressReporter() {
  const { progress, active, loaded, total } = useProgress()
  const boot = usePcBootOptional()
  const isReady = boot?.isReady
  const setBootProgress = boot?.setBootProgress
  const currentProgress = boot?.progress ?? 0

  useEffect(() => {
    if (!setBootProgress || isReady) return

    let pct = 0
    if (total > 0) {
      pct = Math.min(92, Math.round((loaded / total) * 92))
    } else if (typeof progress === "number" && progress > 0) {
      pct = Math.min(92, Math.round(progress * 0.92))
    } else if (active) {
      pct = Math.max(currentProgress, 5)
    }

    if (pct > 0) setBootProgress(pct)
  }, [
    progress,
    active,
    loaded,
    total,
    isReady,
    setBootProgress,
    currentProgress,
  ])

  return null
}

function SceneReadyBridge({ modelReady, onReady }) {
  const { gl, scene, camera } = useThree()
  const { active, progress } = useProgress()
  const boot = usePcBootOptional()
  const setBootProgress = boot?.setBootProgress

  const doneRef = useRef(false)
  const compiledRef = useRef(false)
  const stableCount = useRef(0)
  const settleAt = useRef(0)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    if (!modelReady || doneRef.current) return
    if (modelReady && !active) {
      setBootProgress?.(94)
    }
  }, [modelReady, active, setBootProgress])

  useFrame(() => {
    if (doneRef.current || !modelReady) return

    if (active) {
      stableCount.current = 0
      return
    }

    if (!compiledRef.current) {
      try {
        gl.compile?.(scene, camera)
      } catch {
        /* ignore */
      }
      compiledRef.current = true
      settleAt.current = performance.now() + SETTLE_MS
      setBootProgress?.(96)
      stableCount.current = 0
      return
    }

    if (performance.now() < settleAt.current) {
      setBootProgress?.(97)
      return
    }

    stableCount.current += 1
    const frames = stableCount.current
    if (frames < STABLE_FRAMES) {
      setBootProgress?.(
        Math.min(99, 97 + Math.round((frames / STABLE_FRAMES) * 2))
      )
      return
    }

    doneRef.current = true
    setBootProgress?.(100)
    onReadyRef.current?.()
  })

  return null
}

function ModelMountedSignal({ onMounted }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onMounted?.())
    return () => cancelAnimationFrame(id)
  }, [onMounted])
  return null
}

function FixedCamera() {
  const { camera } = useThree()
  useLayoutEffect(() => {
    camera.position.set(3.85, 1.55, 1.35)
    camera.lookAt(0, 1.08, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

export function DesktopPCScene({ active = true }) {
  const [colorIndex, setColorIndex] = useState(0)
  const [lightsOn, setLightsOn] = useState(true)
  const [ready, setReady] = useState(false)
  const [modelReady, setModelReady] = useState(false)

  // Estado de rotación suave por arrastre en HTML
  const [targetRotationY, setTargetRotationY] = useState(DEFAULT_ROTATION_Y)
  const [targetRotationX, setTargetRotationX] = useState(DEFAULT_ROTATION_X)

  const isDraggingRef = useRef(false)
  const startPointerRef = useRef({ x: 0, y: 0 })
  const startRotationRef = useRef({ y: DEFAULT_ROTATION_Y, x: DEFAULT_ROTATION_X })
  const totalMovedRef = useRef(0)
  const pointerDownTimeRef = useRef(0)
  const holdTimerRef = useRef(null)
  const resetTimerRef = useRef(null)
  const heldRef = useRef(false)

  const boot = usePcBootOptional()
  const markReady = boot?.markReady
  const isBooting = boot?.isBooting

  const color = pc3dConfig.colors[colorIndex % pc3dConfig.colors.length]

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }

  const scheduleResetTimer = () => {
    clearResetTimer()
    resetTimerRef.current = setTimeout(() => {
      setTargetRotationY(DEFAULT_ROTATION_Y)
      setTargetRotationX(DEFAULT_ROTATION_X)
    }, RESET_INACTIVITY_MS)
  }

  useEffect(() => {
    return () => clearResetTimer()
  }, [])

  const handleModelMounted = useCallback(() => {
    setModelReady(true)
  }, [])

  const handleReady = useCallback(() => {
    setReady(true)
    markReady?.()
  }, [markReady])

  useEffect(() => {
    if (active && ready) {
      window.dispatchEvent(new Event("resize"))
      const t = window.setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
      }, 100)
      return () => clearTimeout(t)
    }
  }, [active, ready])

  // Manejadores de puntero en contenedor HTML (sin 3D Raycasting = ultra fluido a 60-120fps)
  const handlePointerDown = (e) => {
    if (!ready || !active || isBooting) return
    clearResetTimer()

    isDraggingRef.current = true
    heldRef.current = false
    pointerDownTimeRef.current = performance.now()
    totalMovedRef.current = 0
    startPointerRef.current = { x: e.clientX, y: e.clientY }
    startRotationRef.current = { y: targetRotationY, x: targetRotationX }

    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    holdTimerRef.current = setTimeout(() => {
      heldRef.current = true
      setLightsOn((prev) => !prev)
    }, 450)
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - startPointerRef.current.x
    const dy = e.clientY - startPointerRef.current.y
    const dist = Math.hypot(dx, dy)
    totalMovedRef.current = dist

    if (dist > 5 && holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }

    const newY = Math.max(
      Math.PI * 0.15,
      Math.min(Math.PI * 1.15, startRotationRef.current.y + dx * 0.008)
    )
    const newX = Math.max(
      -0.2,
      Math.min(0.2, startRotationRef.current.x + dy * 0.004)
    )

    setTargetRotationY(newY)
    setTargetRotationX(newX)
  }

  const handlePointerUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    const elapsed = performance.now() - pointerDownTimeRef.current

    // Clic rápido sin arrastre (< 220ms y < 6px de movimiento) → Cambiar color instantáneo
    if (!heldRef.current && totalMovedRef.current < 6 && elapsed < 220) {
      setLightsOn(true)
      setColorIndex((i) => (i + 1) % pc3dConfig.colors.length)
    }

    isDraggingRef.current = false
    heldRef.current = false

    // Programar retorno automático a la posición inicial tras 5 segundos de inactividad
    scheduleResetTimer()
  }

  const interactive = ready && active && !isBooting
  const canvasVisible = ready

  const dpr =
    typeof window !== "undefined"
      ? [1, Math.min(window.devicePixelRatio || 1, 1.25)]
      : [1, 1.25]

  return (
    <div
      className="relative h-full min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[440px] cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows={false}
        dpr={active ? dpr : [1, 1]}
        events={() => ({})}
        camera={{ fov: 30, near: 0.1, far: 100, position: [3.85, 1.55, 1.35] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        className="h-full w-full transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: canvasVisible ? 1 : 0,
        }}
      >
        <BootProgressReporter />
        <FixedCamera />

        {/* Luces sutiles y optimizadas */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 6, 3]} intensity={1.3} color="#e8fff0" />
        <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#38d9c9" />
        <pointLight
          position={[1.5, 1.8, 2.5]}
          intensity={lightsOn ? 1.6 : 0.1}
          color={color}
          distance={8}
          decay={2}
        />

        <Suspense fallback={null}>
          <DesktopPCModel
            color={color}
            lightsOn={lightsOn}
            targetRotationY={targetRotationY}
            targetRotationX={targetRotationX}
          />

          <Environment preset="city" environmentIntensity={0.35} />
          <ContactShadows
            position={[0, 0.49, 0]}
            opacity={0.45}
            scale={12}
            blur={2.4}
            far={5}
          />
          <ModelMountedSignal onMounted={handleModelMounted} />
          <SceneReadyBridge modelReady={modelReady} onReady={handleReady} />
        </Suspense>
      </Canvas>

      {/* Insignia de Ayuda */}
      <div
        className={`pointer-events-none absolute bottom-2 left-2 right-2 z-20 flex flex-wrap items-end justify-between gap-2 transition-opacity sm:bottom-3 sm:left-3 sm:right-3 ${
          interactive ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="rounded border border-term-border/80 bg-term-bg/85 backdrop-blur-xs px-2.5 py-1.5 font-mono text-[10px] text-term-muted sm:text-xs shadow-md">
          <span className="text-term-green font-bold">&gt;</span> clic: cambiar color · arrastrar: rotar 3D · mantener: apagar luces
        </p>
      </div>
    </div>
  )
}
