export const TerminalPrompt = ({
  user = "visitor",
  host = "portfolio",
  path = "~",
  command = "",
  className = "",
}) => {
  return (
    <p
      className={`font-mono text-xs sm:text-sm ${className}`}
      aria-hidden={command ? undefined : true}
    >
      <span className="text-term-green">{user}@{host}</span>
      <span className="text-term-muted">:</span>
      <span className="text-term-cyan">{path}</span>
      <span className="text-term-muted">$ </span>
      {command && <span className="text-term-text">{command}</span>}
    </p>
  )
}
