import { useState } from "react"
import { profile } from "../../../data/profile"
import {
  FiAward,
  FiCheckCircle,
  FiClock,
  FiX,
  FiImage,
  FiExternalLink,
  FiEye,
} from "react-icons/fi"

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null)
  const [imgError, setImgError] = useState(false)
  const certificates = profile.certificates || []

  const handleOpenModal = (cert) => {
    setSelectedCert(cert)
    setImgError(false)
  }

  return (
    <div>
      {/* Grid de Certificaciones */}
      <div className="grid gap-4 sm:grid-cols-3">
        {certificates.map((cert) => {
          const isCompleted = cert.status === "Completado"

          return (
            <div
              key={cert.id}
              onClick={() => handleOpenModal(cert)}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-term-border bg-term-surface p-4.5 transition-all duration-300 hover:border-term-green/60 hover:bg-[rgba(74,222,128,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <FiAward className="h-4 w-4 text-term-green flex-shrink-0" />
                    <h3 className="font-mono text-sm font-bold text-term-text group-hover:text-term-green-bright transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border flex-shrink-0 ${
                      isCompleted
                        ? "border-term-green/40 bg-term-green/10 text-term-green"
                        : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                    }`}
                  >
                    {isCompleted ? <FiCheckCircle className="w-3 h-3" /> : <FiClock className="w-3 h-3" />}
                    {cert.status}
                  </span>
                </div>

                <div className="font-mono text-[12px] text-term-muted mb-2">
                  <span>{cert.issuer}</span> • <span className="text-term-mute">{cert.period}</span>
                </div>

                <p className="font-mono text-[12px] text-term-muted line-clamp-2 mb-3">
                  {cert.description}
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-term-muted pt-2 border-t border-term-border-soft mt-3">
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="text-term-mute">
                      #{skill}
                    </span>
                  ))}
                </div>
                <span className="text-term-green group-hover:underline flex items-center gap-1 font-semibold">
                  [ ver detalle ]
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Detalle de Certificado e Imagen */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-term-border bg-term-surface p-6 font-mono shadow-2xl shadow-term-green/10 my-8">
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-term-border-soft pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <FiAward className="h-5 w-5 text-term-green" />
                <span className="text-xs text-term-muted font-bold">
                  cert_{selectedCert.id}.json
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-term-muted hover:text-term-red transition-colors p-1"
                aria-label="Cerrar modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-term-text">{selectedCert.title}</h3>
                <p className="text-xs text-term-muted mt-1">
                  Emitido por: <span className="text-term-text font-semibold">{selectedCert.issuer}</span> ({selectedCert.period})
                </p>
              </div>

              {/* Visualizador de la Imagen del Certificado */}
              <div className="relative rounded-lg border border-term-border bg-term-bg p-2 overflow-hidden">
                <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-term-border-soft text-[11px] text-term-muted">
                  <span className="flex items-center gap-1.5">
                    <FiImage className="text-term-green" />
                    <span>Vista previa del documento</span>
                  </span>
                  {selectedCert.image && !imgError && (
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-term-green hover:underline flex items-center gap-1"
                    >
                      <FiExternalLink />
                      <span>Abrir imagen</span>
                    </a>
                  )}
                </div>

                <div className="relative min-h-[200px] max-h-[360px] flex items-center justify-center overflow-hidden rounded bg-term-surface/80 p-1">
                  {selectedCert.image && !imgError ? (
                    <img
                      src={selectedCert.image}
                      alt={`Certificado ${selectedCert.title}`}
                      onError={() => setImgError(true)}
                      className="max-h-[340px] w-auto object-contain rounded border border-term-border/50 shadow-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-term-muted space-y-2">
                      <FiImage className="h-12 w-12 text-term-green/60 mb-1" />
                      <p className="text-xs text-term-text font-bold">
                        [ Vista previa de certificado disponible ]
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="rounded border border-term-border bg-term-bg p-3 text-xs text-term-muted leading-relaxed">
                <p>{selectedCert.description}</p>
              </div>

              {/* Competencias Certificadas */}
              <div>
                <h4 className="text-xs font-bold text-term-green mb-2">&gt; Competencias Certificadas:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-term-border px-2 py-1 text-xs text-term-cyan bg-term-bg"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="mt-6 pt-4 border-t border-term-border-soft flex justify-between items-center">
              <span className="text-[11px] text-term-mute">
                status: {selectedCert.status.toLowerCase()}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="term-btn term-btn-primary text-xs px-4 py-2"
              >
                [ Cerrar ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
