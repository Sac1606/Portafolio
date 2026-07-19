import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Center } from "@react-three/drei"
import * as THREE from "three"
import { pc3dConfig } from "../../../data/pc3d"

const RGB_MATERIAL_NAMES = new Set([
  "RgbLighting",
  "CoolerRGB",
  "NEXUS_Violet",
  "NEXUS_Cyan",
])

const SCREEN_MATERIAL_NAMES = new Set([
  "CPU_COOLER_VIDEO_MATERIAL",
  "CPU_DISPLAY_LOGO",
])

function collectMaterials(root) {
  const rgb = []
  const screens = []

  root.traverse((obj) => {
    if (!obj.isMesh) return

    const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
    const next = mats.map((mat) => {
      if (!mat) return mat
      const cloned = mat.clone()
      const name = cloned.name || mat.name || ""

      if (
        RGB_MATERIAL_NAMES.has(name) ||
        name.toLowerCase().includes("rgb") ||
        name.toLowerCase().includes("nexus")
      ) {
        if (!cloned.emissive) cloned.emissive = new THREE.Color("#000000")
        rgb.push(cloned)
      }

      if (
        SCREEN_MATERIAL_NAMES.has(name) ||
        obj.name === "CPU_Cooler_Display"
      ) {
        screens.push(cloned)
      }

      return cloned
    })

    obj.material = next.length === 1 ? next[0] : next
    obj.castShadow = true
    obj.receiveShadow = true
  })

  return { rgb, screens }
}

export function DesktopPCModel({
  color = "#3DDC84",
  lightsOn = true,
  onInteractStart,
  onInteractEnd,
}) {
  const { scene } = useGLTF(pc3dConfig.modelUrl)
  const groupRef = useRef(null)
  const rgbMats = useRef([])
  const screenMats = useRef([])
  const videoRef = useRef(null)
  const textureRef = useRef(null)

  const clonedScene = useMemo(() => {
    const root = scene.clone(true)
    const { rgb, screens } = collectMaterials(root)
    rgbMats.current = rgb
    screenMats.current = screens
    return root
  }, [scene])

  // Textura de pantallita del cooler (imagen o video)
  useEffect(() => {
    let disposed = false
    const screenUrl = pc3dConfig.coolerScreen
    const isVideo =
      pc3dConfig.coolerScreenIsVideo ||
      /\.(mp4|webm|ogg)(\?|$)/i.test(screenUrl)

    const applyMap = (texture) => {
      if (disposed) return
      texture.colorSpace = THREE.SRGBColorSpace
      texture.flipY = false
      texture.needsUpdate = true
      textureRef.current = texture
      screenMats.current.forEach((mat) => {
        mat.map = texture
        mat.emissiveMap = texture
        mat.emissive = new THREE.Color("#ffffff")
        mat.emissiveIntensity = 0.55
        mat.needsUpdate = true
      })
    }

    if (isVideo) {
      const video = document.createElement("video")
      video.src = screenUrl
      video.crossOrigin = "anonymous"
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      videoRef.current = video
      video.play().catch(() => {})
      const tex = new THREE.VideoTexture(video)
      applyMap(tex)
    } else {
      const loader = new THREE.TextureLoader()
      loader.load(screenUrl, (tex) => applyMap(tex))
    }

    return () => {
      disposed = true
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
        videoRef.current = null
      }
      if (textureRef.current) {
        textureRef.current.dispose()
        textureRef.current = null
      }
    }
  }, [clonedScene])

  // Color e intensidad de luces RGB
  useEffect(() => {
    const c = new THREE.Color(color)
    rgbMats.current.forEach((mat) => {
      mat.color = c.clone()
      mat.emissive = c.clone()
      mat.emissiveIntensity = lightsOn ? 2.4 : 0
      mat.needsUpdate = true
    })
  }, [color, lightsOn, clonedScene])

  // Ligera flotación / idle
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.03
  })

  return (
    <group ref={groupRef}>
      <Center top>
        <group
          // Ajuste de orientación del modelo hacia la cámara
          rotation={[0, Math.PI * 0.15, 0]}
          onPointerDown={(e) => {
            e.stopPropagation()
            onInteractStart?.(e)
          }}
          onPointerUp={(e) => {
            e.stopPropagation()
            onInteractEnd?.(e)
          }}
          onPointerLeave={(e) => {
            onInteractEnd?.(e)
          }}
        >
          <primitive object={clonedScene} />
        </group>
      </Center>
    </group>
  )
}

useGLTF.preload(pc3dConfig.modelUrl)
