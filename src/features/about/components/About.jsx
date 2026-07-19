import { HiCheckCircle } from "react-icons/hi2"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"
import { GeneralInfo } from "./GeneralInfo"
import { SkillsChart } from "./SkillsChart"
import { EducationExperience } from "./EducationExperience"

export const About = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="cat about.md"
          title={profile.title}
          subtitle="Información relevante sobre mi perfil como desarrollador, habilidades y trayectoria."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover={false} className="space-y-5">
            <h2 className="font-mono text-lg font-semibold text-term-text">
              <span className="text-term-green">// </span>Quién soy
            </h2>
            <p className="text-sm leading-relaxed text-term-muted sm:text-base">
              {profile.about}
            </p>
            <ul className="space-y-2.5">
              {profile.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-term-text"
                >
                  <HiCheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-term-green"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-4">
            <h2 className="font-mono text-lg font-semibold text-term-text">
              <span className="text-term-green">// </span>Datos generales
            </h2>
            <GeneralInfo />
          </div>
        </div>

        <div className="mt-10">
          <SkillsChart />
        </div>

        <div className="mt-10">
          <EducationExperience />
        </div>
      </div>
    </section>
  )
}
