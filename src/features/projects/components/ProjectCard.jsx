import { HiOutlineArrowTopRightOnSquare, HiOutlineCodeBracket } from "react-icons/hi2"
import { FaGithub } from "react-icons/fa"
import { Card } from "../../../shared/components/ui/Card"

export const ProjectCard = ({ project }) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-hw-circuit">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura del proyecto ${project.title}`}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-hw-text-muted">
            <HiOutlineCodeBracket className="h-10 w-10" aria-hidden />
          </div>
        )}
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full border border-hw-accent/40 bg-hw-bg/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-hw-accent backdrop-blur">
            Principal
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-hw-text">{project.title}</h3>
          <p className="text-sm leading-relaxed text-hw-text-muted">
            {project.description}
          </p>
        </div>

        <div className="rounded-xl border border-hw-border/80 bg-hw-surface/70 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-hw-accent">
            Habilidades aprendidas
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-hw-text-muted">
            {project.skillsLearned}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-hw-border bg-hw-bg px-2 py-1 text-xs text-hw-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-hw-border bg-hw-bg px-3 py-2 text-xs font-semibold text-hw-text transition hover:border-hw-accent/40 hover:text-hw-accent"
            >
              <FaGithub className="h-3.5 w-3.5" aria-hidden />
              Repositorio
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-hw-accent/15 px-3 py-2 text-xs font-semibold text-hw-accent transition hover:bg-hw-accent/25"
            >
              Demo
              <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
