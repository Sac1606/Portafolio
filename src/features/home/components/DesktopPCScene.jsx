import { Suspense, useCallback, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useProgress,
} from "@react-three/drei"
import { DesktopPCModel } from "./DesktopPCModel"
import { pc3dConfig } from "../../../data/pc3d"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="rounded-md border border-term-border bg-term-surface/95 px-4 py-3 font-mono text-xs text-term-green shadow-lg backdrop-blur">
        cargando_pc… {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

export function DesktopPCScene() {
  const [colorIndex, setColorIndex] = useState(0)
  const [lightsOn, setLightsOn] = useState(true)
  const holdTimer = useRef(null)
  const held = useRef(false)
  const pointerDownAt = useRef(0)

  const color = pc3dConfig.colors[colorIndex % pc3dConfig.colors.length]

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }

  const onInteractStart = useCallback(() => {
    held.current = false
    pointerDownAt.current = performance.now()
    clearHold()
    holdTimer.current = setTimeout(() => {
      held.current = true
      setLightsOn(false)
    }, pc3dConfig.holdMs)
  }, [])

  const onInteractEnd = useCallback(() => {
    clearHold()
    const elapsed = performance.now() - pointerDownAt.current
    // Click corto: siguiente color (y re-encender si estaban apagadas)
    if (!held.current && elapsed < pc3dConfig.holdMs + 80) {
      setLightsOn(true)
      setColorIndex((i) => (i + 1) % pc3dConfig.colors.length)
    }
    held.current = false
  }, [])

  return (
    <div className="relative h-full min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[440px]">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [2.4, 1.2, 3.2], fov: 35, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full touch-none"
      >
        <color attach="background" args={["#0B0F0C"]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          position={[4, 6, 3]}
          intensity={1.1}
          color="#e8fff0"
        />
        <pointLight
          position={[-2, 2, 2]}
          intensity={lightsOn ? 1.2 : 0.15}
          color={color}
        />
        <Suspense fallback={<Loader />}>
          <DesktopPCModel
            color={color}
            lightsOn={lightsOn}
            onInteractStart={onInteractStart}
            onInteractEnd={onInteractEnd}
          />
          <Environment preset="city" environmentIntensity={0.35} />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.45}
            scale={8}
            blur={2.2}
            far={4}
          />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={1.6}
          maxDistance={6}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 0.55, 0]}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2">
        <p className="rounded border border-term-border/80 bg-term-bg/80 px-2.5 py-1.5 font-mono text-[10px] text-term-muted backdrop-blur sm:text-xs">
          click: color · mantener: apagar luces · arrastra: orbitar
        </p>
        <span
          className="inline-flex items-center gap-1.5 rounded border border-term-border/80 bg-term-bg/80 px-2.5 py-1.5 font-mono text-[10px] text-term-text backdrop-blur sm:text-xs"
          style={{ boxShadow: lightsOn ? `0 0 12px ${color}55` : "none" }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: lightsOn ? color : "#3a3a3a",
            }}
          />
          {lightsOn ? color : "off"}
        </span>
      </div>
    </div>
  )
}
