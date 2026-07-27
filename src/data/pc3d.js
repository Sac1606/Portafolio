
export const pc3dConfig = {

  coolerScreen: "../../public/media/realmadrid.jpg",

  coolerScreenIsVideo: false,
  coolerScreenFit: "cover",
  coolerScreenTextureSize: 1024,
  coolerScreenZoom: 1,

  coolerScreenOffsetX: 0,
  coolerScreenOffsetY: 0,
  coolerScreenRotation: -90,

  coolerScreenBrightness: 1.6,
  coolerScreenFlipY: false,
  coolerScreenHideLogo: true,
  coolerRingGlow: false,
  modelScale: 2.65,

  colors: [
    "#3DDC84",
    "#00BFFF",
    "#FF2D95",
    "#A855F7",
    "#F59E0B",
    "#22D3EE",
    "#EF4444",
  ],
  holdMs: 450,

  fanNodeNames: [],
  fanAxis: "z",
  fanSpeed: 18,
  fanSpeedOff: 0,
}

export function resolveCoolerScreenUrl(input) {
  if (!input || typeof input !== "string") return "/media/cooler-screen.jpg"
  let u = input.trim().replace(/\\/g, "/")

  u = u.replace(/^(\.\.\/)+/, "")
  u = u.replace(/^public\//i, "")

  if (/^[a-zA-Z]:\//.test(u) || u.startsWith("file:")) {
    console.warn(
      "[pc3d] Ruta de disco no válida. Usa /media/archivo.ext o ../../public/media/archivo.ext — recibido:",
      input
    )
    return "/media/cooler-screen.jpg"
  }

  if (
    !u.startsWith("/") &&
    !u.startsWith("http://") &&
    !u.startsWith("https://") &&
    !u.startsWith("blob:")
  ) {
    u = `/${u}`
  }

  if (import.meta.env.DEV) {
    console.info("[pc3d] coolerScreen resuelto:", input, "→", u)
  }

  return u
}
