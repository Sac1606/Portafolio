import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { ProjectsGallery } from "./ProjectsGallery"
import { ProjectsGrid } from "./ProjectsGrid"

export const Projects = () => {
  return (
    <section id="proyectos" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Portafolio"
          title="Proyectos"
          subtitle="Aplicaciones y sitios desarrollados en equipo e individualmente, con enlace a repositorio y demo cuando está disponible."
        />

        <ProjectsGallery />

        <div className="mt-14 space-y-6">
          <h3 className="text-lg font-semibold text-hw-text">
            Proyectos principales
          </h3>
          <ProjectsGrid featuredOnly />
        </div>

        <div className="mt-14 space-y-6">
          <h3 className="text-lg font-semibold text-hw-text">
            Proyectos secundarios
          </h3>
          <ProjectsGrid secondaryOnly />
        </div>
      </div>
    </section>
  )
}
