import { useState } from "react"
import { FiDownload, FiMail, FiUser } from "react-icons/fi"
import { profile } from "../../../data/profile"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"

function resolveMediaUrl(path, fallback) {
  if (!path || typeof path !== "string") return fallback
  let u = path.trim().replace(/\\/g, "/")
  u = u.replace(/^(\.\.\/)+/, "")
  u = u.replace(/^public\//i, "")
  if (!u.startsWith("/") && !u.startsWith("http://") && !u.startsWith("https://")) {
    u = `/${u}`
  }
  return u
}

export const ProfileAvatar = () => {
  const [imgError, setImgError] = useState(false)
  const avatarPath = resolveMediaUrl(profile.avatar, "/media/profile-avatar.jpg")
  const resumePath = resolveMediaUrl(profile.resumeUrl, "/media/Isaac_Tiguila_CV.pdf")

  return (
    <TerminalWindow title="avatar.png" bodyClassName="flex flex-col items-center p-4">
      {/* Contenedor de la Imagen con Marco Terminal Glow */}
      <div className="relative group w-full max-w-[220px] aspect-square rounded-lg overflow-hidden border border-term-border bg-term-surface p-1.5 shadow-lg shadow-term-green/5 transition-all duration-300 hover:border-term-green/60">
        
       

        {/* Imagen del Perfil o Fallback Icon */}
        <div className="relative w-full h-full rounded overflow-hidden bg-term-bg flex items-center justify-center">
          {!imgError ? (
            <img
              src={avatarPath}
              alt={`Foto de ${profile.name}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top filter brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-term-muted">
              <FiUser className="w-16 h-16 text-term-green mb-2 opacity-80" />
            </div>
          )}

          {/* Overlay de Líneas de Escaneo CRT (Scanlines) en hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-term-green/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
        </div>

      </div>

      {/* Pie de foto / info rápida */}
      <div className="mt-3.5 text-center w-full">
        <h3 className="font-mono font-bold text-term-text text-sm sm:text-base">
          {profile.name}
        </h3>
        <p className="text-[11px] font-mono text-term-muted mt-0.5">
          {profile.title}
        </p>
      </div>

      {/* Botones de Acción */}
      <div className="mt-4 flex flex-col sm:flex-row w-full gap-2 font-mono text-xs">
        <a
          href={resumePath}
          download="Isaac_Tiguila_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="term-btn term-btn-primary flex-1 py-2 text-center flex items-center justify-center gap-1.5"
          title="Descargar Curriculum Vitae"
        >
          <FiDownload className="w-3.5 h-3.5" />
          <span>CV.pdf</span>
        </a>
        <a
          href="/contacto"
          className="term-btn flex-1 py-2 text-center flex items-center justify-center gap-1.5"
        >
          <FiMail className="w-3.5 h-3.5" />
          <span>Contacto</span>
        </a>
      </div>
    </TerminalWindow>
  )
}
