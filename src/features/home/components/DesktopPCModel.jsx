import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Center } from "@react-three/drei"
import * as THREE from "three"
import { pc3dConfig, resolveCoolerScreenUrl } from "../../../data/pc3d"
import pcModelUrl from "../../../assets/models/PC.glb?url"

const RGB_CORE_NAMES = new Set([
  "RgbLighting",
  "CoolerRGB",
  "NEXUS_Violet",
  "NEXUS_Cyan",
  "PaletteMaterial004",
])

const RGB_COMPONENT_NAMES = new Set([
  "AsusRogThorPlatinum",
  "AsusRogStrixPump",
  "Motherboard_Front",
  "AsusROG4090",
  "PaletteMaterial006",
])

const SCREEN_NODE_NAMES = new Set(["CPU_Cooler_Display"])

const SCREEN_MATERIAL_NAMES = new Set([
  "CPU_COOLER_VIDEO_MATERIAL",
  "PaletteMaterial005",
])

const LOGO_NODE_NAMES = new Set(["CPU_Cooler_Logo", "CPU_Display_Logo"])

const COOLER_RING_MAT_NAMES = new Set(["CoolerRGB", "PaletteMaterial006"])
const COOLER_RING_NODE_NAMES = new Set([
  "CoolerRGB",
  "CPU_Cooler_Display_Bezel",
])

function matName(mat) {
  return (mat?.name || "").trim()
}

function isCoolerRing(matNameStr, nodeName) {
  return (
    COOLER_RING_MAT_NAMES.has(matNameStr) ||
    COOLER_RING_NODE_NAMES.has(nodeName) ||
    /cooler.?rgb|cooler_display_bezel/i.test(matNameStr) ||
    /cooler.?rgb|cooler_display_bezel/i.test(nodeName)
  )
}

function isRgbCore(name) {
  const n = name.toLowerCase()
  return (
    RGB_CORE_NAMES.has(name) ||
    n.includes("rgb") ||
    n.includes("nexus") ||
    n.includes("led")
  )
}

function isRgbComponent(name) {
  return RGB_COMPONENT_NAMES.has(name)
}

function dimCoolerRingMaterial(mat) {
  if (!mat) return
  if (!mat.emissive) mat.emissive = new THREE.Color("#000000")
  mat.emissive.set("#000000")
  mat.emissiveIntensity = 0
  if (mat.emissiveMap) mat.emissiveMap = null
  if (mat.color) mat.color.set("#1a1a1a")
}

function isScreenMat(name, nodeName) {
  return (
    SCREEN_MATERIAL_NAMES.has(name) ||
    SCREEN_NODE_NAMES.has(nodeName) ||
    name.toLowerCase().includes("cooler_video")
  )
}

function remapCoolerDisplayUVs(mesh) {
  const geom = mesh.geometry
  if (!geom?.attributes?.position) return false

  const pos = geom.attributes.position
  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (z < minZ) minZ = z
    if (z > maxZ) maxZ = z
  }

  const cx = (minX + maxX) * 0.5
  const cz = (minZ + maxZ) * 0.5
  const spanX = maxX - minX
  const spanZ = maxZ - minZ
  const diam = Math.max(spanX, spanZ, 1e-6)
  const r = diam * 0.5

  const uvs = new Float32Array(pos.count * 2)
  for (let i = 0; i < pos.count; i++) {
    uvs[i * 2] = (pos.getX(i) - cx) / (2 * r) + 0.5
    uvs[i * 2 + 1] = (pos.getZ(i) - cz) / (2 * r) + 0.5
  }

  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2))
  if (geom.attributes.uv1) {
    geom.setAttribute("uv1", new THREE.BufferAttribute(uvs.slice(), 2))
  }
  geom.attributes.uv.needsUpdate = true
  return true
}

function prepareScene(root) {
  const rgbCore = []
  const rgbComponents = []
  const screens = []
  const screenMeshes = []
  const fanNodes = []
  const fanNameSet = new Set(
    (pc3dConfig.fanNodeNames || []).map((n) => n.toLowerCase())
  )
  const hideLogo = pc3dConfig.coolerScreenHideLogo !== false
  const ringGlow = pc3dConfig.coolerRingGlow === true

  root.traverse((obj) => {
    // Desactivar raycasting en todos los nodos 3D para máximo rendimiento
    obj.raycast = () => null

    const nodeName = obj.name || ""
    const nodeKey = nodeName.toLowerCase()

    if (
      nodeName &&
      (fanNameSet.has(nodeKey) ||
        /^(fan|blade|propeller|ventilador)/i.test(nodeName) ||
        /_blades?$/i.test(nodeName))
    ) {
      if (!fanNodes.includes(obj)) fanNodes.push(obj)
    }

    if (!obj.isMesh) return

    if (
      hideLogo &&
      (LOGO_NODE_NAMES.has(nodeName) || /cpu_cooler_logo|cpu_display_logo/i.test(nodeName))
    ) {
      obj.visible = false
      return
    }

    const isScreenNode =
      SCREEN_NODE_NAMES.has(nodeName) ||
      /^cpu_cooler_display$/i.test(nodeName)

    if (isScreenNode) {
      remapCoolerDisplayUVs(obj)
    }

    const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
    const next = mats.map((mat) => {
      if (!mat) return mat
      const cloned = mat.clone()
      const name = matName(cloned) || matName(mat)

      cloned.userData.baseEmissiveIntensity =
        typeof cloned.emissiveIntensity === "number"
          ? cloned.emissiveIntensity
          : 1

      if (!cloned.emissive) cloned.emissive = new THREE.Color("#000000")

      if (isCoolerRing(name, nodeName)) {
        if (!ringGlow) {
          dimCoolerRingMaterial(cloned)
          cloned.userData.coolerRingLocked = true
        } else if (isRgbCore(name) || name === "CoolerRGB") {
          rgbCore.push(cloned)
        } else {
          rgbComponents.push(cloned)
        }
        return cloned
      }

      if (isScreenMat(name, nodeName) || isScreenNode) {
        cloned.metalness = 0
        cloned.roughness = 0.35
        if ("metalnessMap" in cloned) cloned.metalnessMap = null
        if ("roughnessMap" in cloned) cloned.roughnessMap = null
        if ("normalMap" in cloned) cloned.normalMap = null
        if ("aoMap" in cloned) cloned.aoMap = null
        screens.push(cloned)
      } else if (isRgbCore(name)) {
        rgbCore.push(cloned)
      } else if (isRgbComponent(name)) {
        rgbComponents.push(cloned)
      }

      return cloned
    })

    obj.material = next.length === 1 ? next[0] : next
    obj.castShadow = false
    obj.receiveShadow = false

    if (isScreenNode) {
      screenMeshes.push(obj)
    }
  })

  return { rgbCore, rgbComponents, screens, screenMeshes, fanNodes }
}

/**
 * Aplica colores RGB de forma ultrarrápida modificando uniforms directamente
 * sin gatillar recompilaciones de shaders (needsUpdate = true eliminado).
 */
function applyRgbColor(mats, color, lightsOn, mode) {
  const c = new THREE.Color(color)
  mats.forEach((mat) => {
    if (mat.userData?.coolerRingLocked) {
      dimCoolerRingMaterial(mat)
      return
    }
    const baseI = mat.userData.baseEmissiveIntensity ?? 1
    if (mode === "core") {
      mat.color.copy(c)
      mat.emissive.copy(c)
      mat.emissiveIntensity = lightsOn ? Math.max(baseI, 1) * 2.2 : 0
    } else {
      mat.emissive.copy(c)
      mat.emissiveIntensity = lightsOn ? Math.max(baseI, 1) * 1.35 : 0
    }
  })
}

const PREPARE_VERSION = 5

const preparedCache = {
  version: 0,
  source: null,
  root: null,
  rgbCore: [],
  rgbComponents: [],
  screens: [],
  screenMeshes: [],
  fanNodes: [],
  screenKey: "",
}

function getPreparedScene(scene) {
  if (
    preparedCache.version === PREPARE_VERSION &&
    preparedCache.source === scene &&
    preparedCache.root
  ) {
    return preparedCache
  }
  const root = scene
  const data = prepareScene(root)
  preparedCache.version = PREPARE_VERSION
  preparedCache.source = scene
  preparedCache.root = root
  preparedCache.rgbCore = data.rgbCore
  preparedCache.rgbComponents = data.rgbComponents
  preparedCache.screens = data.screens
  preparedCache.screenMeshes = data.screenMeshes
  preparedCache.fanNodes = data.fanNodes
  preparedCache.screenKey = ""

  return preparedCache
}

function fitImageToSquareCanvas(
  source,
  size = 512,
  fit = "cover",
  zoom = 1,
  offsetX = 0,
  offsetY = 0
) {
  const imgW = source.videoWidth || source.naturalWidth || source.width
  const imgH = source.videoHeight || source.naturalHeight || source.height
  if (!imgW || !imgH) return null

  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, size, size)

  const z = Math.max(0.1, Number(zoom) || 1)
  const ox = Math.max(-1, Math.min(1, Number(offsetX) || 0))
  const oy = Math.max(-1, Math.min(1, Number(offsetY) || 0))

  let drawW
  let drawH

  if (fit === "contain") {
    const scale = Math.min(size / imgW, size / imgH) * z
    drawW = imgW * scale
    drawH = imgH * scale
  } else if (fit === "stretch") {
    drawW = size
    drawH = size
  } else {
    const scale = Math.max(size / imgW, size / imgH) * z
    drawW = imgW * scale
    drawH = imgH * scale
  }

  const maxShiftX = Math.max(0, (drawW - size) / 2)
  const maxShiftY = Math.max(0, (drawH - size) / 2)
  const dx = (size - drawW) / 2 + ox * maxShiftX
  const dy = (size - drawH) / 2 + oy * maxShiftY

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(source, dx, dy, drawW, drawH)
  return canvas
}

function applyTextureToScreenMaterials(texture, mats, meshes) {
  const brightness = pc3dConfig.coolerScreenBrightness ?? 1.15
  const rotationDeg = Number(pc3dConfig.coolerScreenRotation) || 0

  texture.colorSpace = THREE.SRGBColorSpace
  texture.flipY = Boolean(pc3dConfig.coolerScreenFlipY)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.center.set(0.5, 0.5)
  texture.rotation = (rotationDeg * Math.PI) / 180
  texture.needsUpdate = true

  const paintMat = (mat) => {
    if (!mat) return
    mat.map = texture
    mat.emissiveMap = texture
    mat.emissive = new THREE.Color("#ffffff")
    mat.emissiveIntensity = brightness
    mat.color = new THREE.Color("#ffffff")
    mat.metalness = 0
    mat.roughness = 0.35
    if ("metalnessMap" in mat) mat.metalnessMap = null
    if ("roughnessMap" in mat) mat.roughnessMap = null
    if ("normalMap" in mat) mat.normalMap = null
    if ("aoMap" in mat) mat.aoMap = null
    mat.transparent = false
    mat.depthWrite = true
    mat.toneMapped = true
  }

  mats.forEach(paintMat)
  meshes.forEach((mesh) => {
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    list.forEach(paintMat)
  })
}

export function DesktopPCModel({
  color = "#3DDC84",
  lightsOn = true,
  targetRotationY = Math.PI * 0.62,
  targetRotationX = 0,
}) {
  const { scene } = useGLTF(pcModelUrl, true)
  const rgbCoreRef = useRef([])
  const rgbCompRef = useRef([])
  const screenMats = useRef([])
  const screenMeshesRef = useRef([])
  const fanNodesRef = useRef([])
  const videoRef = useRef(null)
  const textureRef = useRef(null)
  const lightsOnRef = useRef(lightsOn)
  const modelGroupRef = useRef(null)

  lightsOnRef.current = lightsOn
  const modelScale = pc3dConfig.modelScale ?? 2.65

  const preparedRoot = useMemo(() => {
    const cache = getPreparedScene(scene)
    rgbCoreRef.current = cache.rgbCore
    rgbCompRef.current = cache.rgbComponents
    screenMats.current = cache.screens
    screenMeshesRef.current = cache.screenMeshes
    fanNodesRef.current = cache.fanNodes
    return cache.root
  }, [scene])

  // Carga de imagen del cooler
  useEffect(() => {
    const screenUrl = resolveCoolerScreenUrl(pc3dConfig.coolerScreen)
    if (!screenUrl) return

    const fit = pc3dConfig.coolerScreenFit || "cover"
    const texSize = pc3dConfig.coolerScreenTextureSize ?? 512
    const zoom = pc3dConfig.coolerScreenZoom ?? 1
    const offsetX = pc3dConfig.coolerScreenOffsetX ?? 0
    const offsetY = pc3dConfig.coolerScreenOffsetY ?? 0

    const key = [
      screenUrl,
      pc3dConfig.coolerScreenIsVideo,
      pc3dConfig.coolerScreenFlipY,
      pc3dConfig.coolerScreenBrightness,
      pc3dConfig.coolerScreenRotation,
      fit,
      texSize,
      zoom,
      offsetX,
      offsetY,
    ].join("|")

    if (preparedCache.screenKey === key && textureRef.current) return

    let disposed = false
    const isVideo =
      pc3dConfig.coolerScreenIsVideo ||
      /\.(mp4|webm|ogg)(\?|$)/i.test(screenUrl)

    const applyMap = (texture) => {
      if (disposed) return
      if (textureRef.current && textureRef.current !== texture) {
        textureRef.current.dispose?.()
      }
      textureRef.current = texture
      applyTextureToScreenMaterials(
        texture,
        screenMats.current,
        screenMeshesRef.current
      )
      preparedCache.screenKey = key
    }

    const textureFromImageSource = (source) => {
      if (fit === "stretch") {
        if (source instanceof HTMLImageElement) {
          const tex = new THREE.Texture(source)
          tex.colorSpace = THREE.SRGBColorSpace
          tex.needsUpdate = true
          return tex
        }
        return new THREE.CanvasTexture(source)
      }

      const canvas = fitImageToSquareCanvas(
        source,
        texSize,
        fit,
        zoom,
        offsetX,
        offsetY
      )
      if (!canvas) return null
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true
      return tex
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
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (disposed) return
        const tex = textureFromImageSource(img)
        if (tex) applyMap(tex)
      }
      img.src = screenUrl
    }

    return () => {
      disposed = true
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.removeAttribute("src")
        videoRef.current.load()
        videoRef.current = null
      }
    }
  }, [preparedRoot])

  // Cambio de color e intensidad de luces instantáneo
  useEffect(() => {
    applyRgbColor(rgbCoreRef.current, color, lightsOn, "core")
    applyRgbColor(rgbCompRef.current, color, lightsOn, "component")
  }, [color, lightsOn, preparedRoot])

  // Rotación suave con Lerp + giro de ventiladores en cada frame
  useFrame((_, delta) => {
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        modelGroupRef.current.rotation.y,
        targetRotationY,
        Math.min(1, delta * 14)
      )
      modelGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        modelGroupRef.current.rotation.x,
        targetRotationX,
        Math.min(1, delta * 14)
      )
    }

    const speed = lightsOnRef.current
      ? pc3dConfig.fanSpeed ?? 18
      : pc3dConfig.fanSpeedOff ?? 0
    if (speed && fanNodesRef.current.length > 0) {
      const axis = (pc3dConfig.fanAxis || "z").toLowerCase()
      const step = speed * delta
      fanNodesRef.current.forEach((node) => {
        if (!node) return
        if (axis === "x") node.rotation.x += step
        else if (axis === "y") node.rotation.y += step
        else node.rotation.z += step
      })
    }
  })

  return (
    <group raycast={() => null}>
      <group position={[0, 0.55, 0]} raycast={() => null}>
        <Center top raycast={() => null}>
          <group
            ref={modelGroupRef}
            scale={modelScale}
            rotation={[0, Math.PI * 0.62, 0]}
            raycast={() => null}
          >
            <primitive object={preparedRoot} raycast={() => null} />
          </group>
        </Center>
      </group>
    </group>
  )
}

useGLTF.preload(pcModelUrl, true)
