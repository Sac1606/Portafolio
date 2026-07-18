import {
  HiOutlineEnvelope,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdWorkOutline } from "react-icons/md"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

const socialLinks = [
  {
    name: "LinkedIn",
    href: profile.social.linkedin,
    description: "Perfil profesional para oportunidades y networking.",
    icon: FaLinkedin,
    accent: "text-[#0A66C2]",
  },
  {
    name: "CompuTrabajo",
    href: profile.social.computrabajo,
    description: "Perfil en plataforma de empleo y búsqueda de talento.",
    icon: MdWorkOutline,
    accent: "text-hw-matrix",
  },
  {
    name: "GitHub",
    href: profile.social.github,
    description: "Repositorios, código y proyectos abiertos.",
    icon: FaGithub,
    accent: "text-hw-text",
  },
]

export const Contact = () => {
  return (
    <section id="contacto" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Contacto"
          title="Conectemos"
          subtitle="Estoy abierto a prácticas, proyectos y oportunidades. Puedes escribirme o visitar mis perfiles profesionales."
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {socialLinks.map(({ name, href, description, icon: Icon, accent }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <Card className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Icon className={`h-7 w-7 ${accent}`} aria-hidden />
                  <HiOutlineArrowTopRightOnSquare
                    className="h-4 w-4 text-hw-text-muted"
                    aria-hidden
                  />
                </div>
                <h3 className="text-base font-semibold text-hw-text">{name}</h3>
                <p className="text-sm leading-relaxed text-hw-text-muted">
                  {description}
                </p>
              </Card>
            </a>
          ))}
        </div>

        <Card
          hover={false}
          className="mx-auto mt-8 flex max-w-4xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-hw-border bg-hw-surface text-hw-accent">
              <HiOutlineEnvelope className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-hw-text">Correo</p>
              <p className="text-sm text-hw-text-muted">
                Edita tu email en <code className="text-hw-accent">src/data/profile.js</code>
              </p>
            </div>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-hw-accent px-5 py-2.5 text-sm font-semibold text-hw-bg transition hover:brightness-110"
          >
            {profile.email}
          </a>
        </Card>
      </div>
    </section>
  )
}
