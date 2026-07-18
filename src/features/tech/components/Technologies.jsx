import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiDotnet,
  SiPython,
  SiOpencv,
  SiGithub,
  SiVite,
} from "react-icons/si"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

const iconMap = {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiDotnet,
  SiPython,
  SiOpencv,
  SiGithub,
  SiVite,
}

export const Technologies = () => {
  return (
    <section id="tecnologias" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Stack"
          title="Tecnologías"
          subtitle="Herramientas y lenguajes con los que construyo interfaces, APIs y prototipos."
          align="center"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {profile.technologies.map((tech) => {
            const Icon = iconMap[tech.icon] || SiJavascript
            return (
              <Card
                key={tech.name}
                className="flex flex-col items-center justify-center gap-3 !p-4 text-center"
              >
                <Icon
                  className="h-8 w-8 text-hw-accent transition group-hover:text-hw-matrix"
                  aria-hidden
                />
                <span className="text-xs font-medium text-hw-text-muted">
                  {tech.name}
                </span>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
