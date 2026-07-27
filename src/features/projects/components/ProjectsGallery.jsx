import { projects } from "../../../data/projects"

export const ProjectsGallery = () => {
  const withUi = projects.filter((p) => p.image)

  return (
    <div className="space-y-4">
      <p className="text-[13px] text-term-muted">
        Capturas generales de interfaces y aplicaciones visuales.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {withUi.map((project) => (
          <a
            key={project.id}
            href={`#proyecto-${project.id}`}
            className="group block overflow-hidden rounded-lg border border-term-border bg-term-surface transition-colors hover:bg-[rgba(74,222,128,0.04)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.image}
                alt={`Vista de ${project.title}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-term-bg via-term-bg/25 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-mono text-sm font-semibold text-term-green-bright">
                  {project.id}/
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
