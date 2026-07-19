import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { ProjectsGallery } from "./ProjectsGallery"
import { ProjectsGrid } from "./ProjectsGrid"

export const Projects = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="ls ./projects"
          title="Proyectos"
          subtitle="Aplicaciones y sitios desarrollados en equipo e individualmente, con enlace a repositorio y demo cuando está disponible."
        />

        <ProjectsGallery />

        <div className="mt-14 space-y-6">
          <h2 className="font-mono text-lg font-semibold text-term-text">
            <span className="text-term-green">// </span>Proyectos principales
          </h2>
          <ProjectsGrid featuredOnly />
        </div>

        <div className="mt-14 space-y-6">
          <h2 className="font-mono text-lg font-semibold text-term-text">
            <span className="text-term-green">// </span>Proyectos secundarios
          </h2>
          <ProjectsGrid secondaryOnly />
        </div>
      </div>
    </section>
  )
}
