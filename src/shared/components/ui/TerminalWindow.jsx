export const TerminalWindow = ({
  title = "isaac@portfolio:~",
  children,
  className = "",
  bodyClassName = "",
}) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-term-border bg-term-surface shadow-[0_16px_48px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-term-border bg-term-elevated px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-term-red/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-term-green/80" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-xs text-term-muted">
          {title}
        </p>
      </div>
      <div className={`p-4 sm:p-5 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
