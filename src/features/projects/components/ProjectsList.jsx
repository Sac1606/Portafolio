import { projects as defaultProjects } from "../../../data/projects"

/**
 * Listado estilo `ls -la` del mock terminal.
 */
export const ProjectsList = ({ items = defaultProjects }) => {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-term-border p-6 text-center font-mono text-sm text-term-muted">
        $ no se encontraron proyectos que coincidan con la búsqueda.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-term-border">
      {items.map((project, i) => (
        <div
          key={project.id}
          className={`grid grid-cols-1 items-center gap-3 px-4 py-4 sm:grid-cols-[110px_1fr_auto] sm:gap-4 sm:px-5 ${
            i < items.length - 1 ? "border-b border-term-border-soft" : ""
          } transition-colors hover:bg-[rgba(74,222,128,0.04)]`}
        >
          <div className="font-mono text-xs text-term-mute">drwxr-xr-x</div>
          <div className="min-w-0">
            <p className="font-mono text-sm font-semibold text-term-green-bright">
              {project.id}/
            </p>
            <p className="mt-1 text-[12.5px] text-term-muted">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-term-border px-2 py-0.5 font-mono text-[11px] text-term-cyan"
                >
                  {tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-xs text-term-muted sm:flex-col sm:items-end sm:gap-1">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-term-green"
              >
                → ver repo
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-term-green"
              >
                → demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
