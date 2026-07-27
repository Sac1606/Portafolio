import { projects as defaultProjects } from "../../../data/projects"
import { ProjectCard } from "./ProjectCard"

export const ProjectsGrid = ({ items, featuredOnly = false, secondaryOnly = false }) => {
  let list = items || defaultProjects
  if (featuredOnly) list = list.filter((p) => p.featured)
  if (secondaryOnly) list = list.filter((p) => !p.featured)

  if (!list.length) return null

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-8">
      {list.map((project) => (
        <div
          key={project.id}
          id={`proyecto-${project.id}`}
          className="min-w-0 scroll-mt-28"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
