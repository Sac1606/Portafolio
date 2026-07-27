import { HiOutlineArrowTopRightOnSquare, HiOutlineCodeBracket } from "react-icons/hi2"
import { FaGithub } from "react-icons/fa"

/**
 * Card de proyecto con marco terminal.
 * Sin h-full forzado ni overflow que recorte botones.
 */
export const ProjectCard = ({ project }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-term-border bg-term-surface">
      {/* Header tipo ventana */}
      <div className="flex shrink-0 items-center gap-3.5 border-b border-term-border bg-term-elevated px-3.5 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-term-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-dot-green" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-xs text-term-muted">
          ~/proyectos/{project.id}
        </p>
      </div>

      {/* Imagen: único bloque con overflow hidden */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-term-grid">
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

      {/* Contenido: crece con el texto, sin recortar botones */}
      <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
        <div className="space-y-2">
          <h3 className="font-mono text-lg font-semibold text-term-green-bright sm:text-xl">
            {project.title}/
          </h3>
          <p className="text-sm leading-relaxed text-term-muted">
            {project.description}
          </p>
        </div>

        <div className="rounded-md border border-term-border-soft bg-term-bg/60 p-3.5">
          <p className="font-mono text-[11px] font-semibold text-term-cyan">
            // habilidades_aprendidas
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-term-muted">
            {project.skillsLearned}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded border border-term-border px-2.5 py-1 font-mono text-[11px] text-term-cyan"
            >
              {tag.toLowerCase()}
            </span>
          ))}
        </div>

        {/* Botones siempre visibles, con espacio al borde */}
        <div className="mt-1 flex flex-wrap items-center gap-2.5 border-t border-term-border-soft pt-4">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="term-btn shrink-0 whitespace-nowrap"
            >
              <FaGithub className="mr-1.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              repositorio
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="term-btn term-btn-primary shrink-0 whitespace-nowrap"
            >
              demo
              <HiOutlineArrowTopRightOnSquare
                className="ml-1.5 h-3.5 w-3.5 shrink-0"
                aria-hidden
              />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
