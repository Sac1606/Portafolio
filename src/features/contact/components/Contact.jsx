import { useState } from "react"
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FiCopy, FiCheck, FiSend, FiMail, FiMessageSquare } from "react-icons/fi"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { profile } from "../../../data/profile"
import emailjs from "@emailjs/browser"

const socialLinks = [
  {
    name: "LinkedIn",
    href: profile.social.linkedin,
    description: "Perfil profesional para oportunidades y networking.",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: profile.social.github,
    description: "Repositorios, código y proyectos abiertos.",
    icon: FaGithub,
  },
]

const SUBJECT_OPTIONS = [
  "Oportunidad Laboral / Oferta de Empleo",
  "Proyecto Freelance / Desarrollo Web",
  "Consulta General / Networking",
  "Otro Asunto",
]

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECT_OPTIONS[0],
    message: "",
  })
  const [status, setStatus] = useState("idle") // 'idle' | 'sending' | 'success' | 'error'
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage("Por favor, completa todos los campos requeridos.")
      setStatus("error")
      return
    }

    setStatus("sending")
    setErrorMessage("")

    // Credenciales EmailJS (Tomadas de variables de entorno o valores por defecto)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_portfolio"
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_portfolio"
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""

    try {
      if (publicKey && publicKey !== "") {
        // Envio mediante SDK EmailJS con aliases universales para cualquier plantilla
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            reply_to: form.email,
            subject: form.subject,
            message: form.message,
            to_email: profile.email,
            to_name: profile.name,
            name: form.name,
            email: form.email,
            user_name: form.name,
            user_email: form.email,
            date: new Date().toLocaleString("es-GT"),
            time: new Date().toLocaleString("es-GT"),
          },
          publicKey
        )
      } else {
        // Fallback simulado / Mailto directo si no se han configurado llaves EmailJS aún
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mailtoSubject = encodeURIComponent(`[${form.subject}] — ${form.name}`)
        const mailtoBody = encodeURIComponent(
          `De: ${form.name} (${form.email})\nAsunto: ${form.subject}\n\nMensaje:\n${form.message}`
        )
        window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`
      }

      setStatus("success")
      setForm({
        name: "",
        email: "",
        subject: SUBJECT_OPTIONS[0],
        message: "",
      })
    } catch (err) {
      console.error("[EmailJS Error]:", err)
      setStatus("error")
      setErrorMessage("No se pudo enviar el correo mediante la API. Abriendo cliente de correo alternativo...")
      
      // Intentar abrir cliente de correo por defecto como salvaguarda
      const mailtoSubject = encodeURIComponent(`[${form.subject}] — ${form.name}`)
      const mailtoBody = encodeURIComponent(
        `De: ${form.name} (${form.email})\nAsunto: ${form.subject}\n\nMensaje:\n${form.message}`
      )
      window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`
    }
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="ssh contacto@isaac"
          title="Conectemos"
          subtitle="Estoy abierto a prácticas, proyectos y oportunidades laborales. Envíame un mensaje directo."
          align="center"
        />

        {/* Notificación Flotante de Correo Copiado */}
        {copied && (
          <div className="fixed top-20 right-4 z-50 rounded-lg border border-term-green/60 bg-term-surface/95 px-4 py-2.5 font-mono text-xs text-term-green shadow-xl backdrop-blur-xs flex items-center gap-2 animate-bounce">
            <FiCheck className="h-4 w-4 text-term-green-bright" />
            <span>¡Correo ({profile.email}) copiado al portapapeles!</span>
          </div>
        )}

        <TerminalWindow
          title="isaac@portfolio: ~/contacto"
          className="mx-auto max-w-4xl"
          bodyClassName="!p-0"
        >
          <div className="grid gap-0 md:grid-cols-2">
            {/* Columna Izquierda: Información de contacto + Acción Rápida de Copiar Correo */}
            <div className="border-b border-term-border-soft p-5 md:border-b-0 md:border-r md:p-6 flex flex-col justify-between">
              <div>
                <TerminalPrompt command="cat contact.env" />
                <div className="mt-4 space-y-3 font-mono text-[13px]">
                  <div className="flex flex-col">
                    <span className="text-term-muted text-xs">// Correo electrónico</span>
                    <div className="flex items-center gap-2 mt-1">
                      <FiMail className="text-term-green" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-term-text hover:text-term-green-bright transition-colors font-semibold"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-term-muted text-xs">// Redes y perfiles</span>
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-term-text hover:text-term-green transition-colors mt-1"
                    >
                      github.com/Sac1606
                    </a>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-term-muted text-xs">// Estado del sistema</span>
                    <span className="text-term-green font-bold">● ONLINE / DISPONIBLE</span>
                  </div>
                </div>
              </div>

              {/* Bloque de Acción Rápida: Copiar Correo */}
              <div className="mt-8 pt-4 border-t border-term-border-soft">
                <p className="font-mono text-xs text-term-muted mb-2">
                  &gt; Acción rápida:
                </p>
                <button
                  onClick={handleCopyEmail}
                  className={`w-full term-btn ${
                    copied ? "term-btn-primary bg-term-green/20" : ""
                  } py-2.5 flex items-center justify-center gap-2 font-mono text-xs`}
                >
                  {copied ? (
                    <>
                      <FiCheck className="h-4 w-4 text-term-green" />
                      <span>¡Correo copiado!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="h-4 w-4" />
                      <span>Copiar correo ({profile.email})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Columna Derecha: Formulario de Contacto Completo */}
            <form onSubmit={onSubmit} className="p-5 md:p-6 font-mono">
              <div className="flex items-center gap-2 mb-4 border-b border-term-border-soft pb-2">
                <FiMessageSquare className="text-term-green h-4 w-4" />
                <span className="text-xs text-term-text font-bold">send_message.sh</span>
              </div>

              {/* Campo Nombre */}
              <label className="mb-1 block text-xs text-term-muted">
                // Nombre completo *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Ej. Juan Pérez"
                required
                className="mb-3 w-full rounded border border-term-border bg-term-bg px-3 py-2 text-[13px] text-term-text outline-none placeholder:text-term-mute focus:border-term-green/60"
              />

              {/* Campo Correo */}
              <label className="mb-1 block text-xs text-term-muted">
                // Tu correo de contacto *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="tu@correo.com"
                required
                className="mb-3 w-full rounded border border-term-border bg-term-bg px-3 py-2 text-[13px] text-term-text outline-none placeholder:text-term-mute focus:border-term-green/60"
              />

              {/* Campo Asunto */}
              <label className="mb-1 block text-xs text-term-muted">
                // Asunto del mensaje *
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="mb-3 w-full rounded border border-term-border bg-term-bg px-3 py-2 text-[13px] text-term-text outline-none focus:border-term-green/60"
              >
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-term-surface text-term-text">
                    {opt}
                  </option>
                ))}
              </select>

              {/* Campo Mensaje */}
              <label className="mb-1 block text-xs text-term-muted">
                // Mensaje *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Escribe tu mensaje o propuesta aquí..."
                rows={4}
                required
                className="mb-4 w-full resize-y rounded border border-term-border bg-term-bg px-3 py-2 text-[13px] text-term-text outline-none placeholder:text-term-mute focus:border-term-green/60"
              />

              {/* Mensajes de Estado */}
              {status === "sending" && (
                <div className="mb-3 text-xs text-term-amber animate-pulse">
                  $ enviando mensaje por EmailJS API... [========&gt;]
                </div>
              )}

              {status === "success" && (
                <div className="mb-3 text-xs text-term-green border border-term-green/30 bg-term-green/10 p-2.5 rounded">
                  ✓ [SUCCESS] ¡Mensaje enviado con éxito! Te responderé pronto a tu correo.
                </div>
              )}

              {status === "error" && (
                <div className="mb-3 text-xs text-term-red border border-term-red/30 bg-term-red/10 p-2.5 rounded">
                  ✕ {errorMessage}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="term-btn term-btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-xs"
              >
                <FiSend className="h-3.5 w-3.5" />
                <span>[ {status === "sending" ? "enviando..." : "enviar_mensaje"} ]</span>
              </button>
            </form>
          </div>
        </TerminalWindow>

        {/* Enlaces Profesionales */}
        <div className="mx-auto mt-8 grid max-w-2xl gap-3 md:grid-cols-2">
          {socialLinks.map(({ name, href, description, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-3 rounded-lg border border-term-border bg-term-surface p-4 transition-all duration-300 hover:border-term-green/50 hover:bg-[rgba(74,222,128,0.04)]"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-term-green" aria-hidden />
                <HiOutlineArrowTopRightOnSquare
                  className="h-4 w-4 text-term-muted"
                  aria-hidden
                />
              </div>
              <h3 className="font-mono text-sm font-semibold text-term-green-bright">
                {name}
              </h3>
              <p className="text-[12.5px] leading-relaxed text-term-muted font-mono">
                {description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
