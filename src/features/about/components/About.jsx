import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { profile } from "../../../data/profile"
import { GeneralInfo } from "./GeneralInfo"
import { EducationExperience } from "./EducationExperience"
import { ProfileAvatar } from "./ProfileAvatar"
import { Services } from "./Services"
import { Certificates } from "./Certificates"

export const About = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="pnpm about.md"
          title={profile.title}
          subtitle="Información relevante sobre mi perfil como desarrollador, habilidades y trayectoria."
        />

        {/* Grid Principal con Avatar, Sobre Mí y Stats */}
        <div className="grid gap-6 lg:grid-cols-[270px_1fr_290px] items-start">
          {/* Columna 1: Foto / Avatar de Perfil */}
          <ProfileAvatar />

          {/* Columna 2: Descripción y Habilidades Clave */}
          <TerminalWindow
            title="isaac@portfolio: ~/about"
            bodyClassName="space-y-1 font-mono text-sm"
          >
            <TerminalPrompt command="pnpm about.md" />
            <p className="mb-3.5 text-[13px] leading-relaxed text-term-text sm:text-sm">
              {profile.about}
            </p>

            <TerminalPrompt command="pnpm focus.md" />
            <ul className="mb-1 space-y-1 text-[13px] text-term-muted">
              {profile.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-term-green select-none">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalWindow>

          {/* Columna 3: Stats e Información General */}
          <TerminalWindow title="stats.json" bodyClassName="font-mono text-sm">
            <GeneralInfo />
          </TerminalWindow>
        </div>

        {/* Servicios / Soluciones Tecnológicas */}
        <div className="mt-12">
          <div className="section-label">
            <span className="tag">$</span>
            <span>pnpm services.list --all</span>
          </div>
          <Services />
        </div>

        {/* Certificaciones y Reconocimientos */}
        <div className="mt-12">
          <div className="section-label">
            <span className="tag">$</span>
            <span>ls certificates/</span>
          </div>
          <Certificates />
        </div>

        {/* Educación y Experiencia */}
        <div className="mt-12">
          <div className="section-label">
            <span className="tag">$</span>
            <span>pnpm education.log experience.log</span>
          </div>
          <EducationExperience />
        </div>
      </div>
    </section>
  )
}
