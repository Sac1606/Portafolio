/**
 * Configuración del PC 3D del inicio.
 * Cambia coolerScreen para usar tu imagen o video en la pantallita del cooler.
 * Formatos: .jpg .png .webp .mp4 .webm
 * Coloca el archivo en public/media/ y actualiza la ruta.
 *
 * El modelo se importa desde src/assets (ver DesktopPCModel) para que Vite
 * resuelva la URL real y no caiga en el index.html del SPA.
 */
export const pc3dConfig = {
  /** Imagen o video que se muestra en la pantallita del cooler */
  coolerScreen: "/media/cooler-screen.jpg",
  /** true si coolerScreen es video */
  coolerScreenIsVideo: false,
  /** Colores RGB al hacer click */
  colors: [
    "#3DDC84", // verde terminal
    "#00BFFF", // azul eléctrico
    "#FF2D95", // rosa
    "#A855F7", // violeta
    "#F59E0B", // ámbar
    "#22D3EE", // cian
    "#EF4444", // rojo
  ],
  /** ms para considerar "mantener apretado" y apagar luces */
  holdMs: 450,
}
