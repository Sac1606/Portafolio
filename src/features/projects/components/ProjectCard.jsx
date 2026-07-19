import { HiOutlineArrowTopRightOnSquare, HiOutlineCodeBracket } from "react-icons/hi2"
import { FaGithub } from "react-icons/fa"
import { Card } from "../../../shared/components/ui/Card"

export const ProjectCard = ({ project }) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-term-grid">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura del proyecto ${project.title}`}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-term-muted">
            <HiOutlineCodeBracket className="h-10 w-10" aria-hidden />
          </div>
        )}
        {project.featured && (
          <span className="absolute left-3 top-3 rounded border border-term-green/40 bg-term-bg/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-term-green backdrop-blur">
            principal
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="font-mono text-xl font-semibold text-term-text">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-term-muted">
            {project.description}
          </p>
        </div>

        <div className="rounded-md border border-term-border/80 bg-term-surface/80 p-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-term-green">
            habilidades_aprendidas
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-term-muted">
            {project.skillsLearned}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded border border-term-border bg-term-bg px-2 py-1 font-mono text-xs text-term-muted"
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
              className="inline-flex items-center gap-2 rounded-md border border-term-border bg-term-bg px-3 py-2 font-mono text-xs font-semibold text-term-text transition hover:border-term-green/40 hover:text-term-green"
            >
              <FaGithub className="h-3.5 w-3.5" aria-hidden />
              repositorio
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-term-green/15 px-3 py-2 font-mono text-xs font-semibold text-term-green transition hover:bg-term-green/25"
            >
              demo
              <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
