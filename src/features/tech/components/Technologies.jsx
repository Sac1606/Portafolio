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
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="npx stack --list"
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
                <Icon className="h-8 w-8 text-term-green" aria-hidden />
                <span className="font-mono text-xs font-medium text-term-muted">
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
