import { projects } from "../../../data/projects"
import { ProjectCard } from "./ProjectCard"

export const ProjectsGrid = ({ featuredOnly = false, secondaryOnly = false }) => {
  let list = projects
  if (featuredOnly) list = projects.filter((p) => p.featured)
  if (secondaryOnly) list = projects.filter((p) => !p.featured)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((project) => (
        <div key={project.id} id={`proyecto-${project.id}`} className="scroll-mt-28">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
