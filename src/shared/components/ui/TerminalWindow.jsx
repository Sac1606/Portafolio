export const TerminalWindow = ({
  title = "isaac@portfolio:~",
  children,
  className = "",
  bodyClassName = "",
}) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-term-border bg-term-surface ${className}`}
    >
      <div className="flex items-center gap-3.5 border-b border-term-border bg-term-elevated px-3.5 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-term-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-dot-green" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-xs text-term-muted">
          {title}
        </p>
      </div>
      <div className={`p-[18px] sm:px-5 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
