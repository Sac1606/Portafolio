import { projects } from "../../../data/projects"
import { Card } from "../../../shared/components/ui/Card"

export const ProjectsGallery = () => {
  const withUi = projects.filter((p) => p.image)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-mono text-lg font-semibold text-term-text">
          <span className="text-term-green">// </span>Vista de proyectos
        </h2>
        <p className="mt-1 text-sm text-term-muted">
          Capturas generales de interfaces y aplicaciones visuales.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {withUi.map((project) => (
          <a key={project.id} href={`#proyecto-${project.id}`} className="group block">
            <Card className="!overflow-hidden !p-0">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={`Vista de ${project.title}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-term-bg via-term-bg/25 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-sm font-semibold text-term-text">
                    {project.title}
                  </p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
