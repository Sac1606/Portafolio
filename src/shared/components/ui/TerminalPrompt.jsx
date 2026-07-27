/**
 * Prompt estilo mock: visitor@portfolio:~$ comando
 * - ps (usuario@host:path$) en cyan
 * - comando en verde brillante
 * - cursor bloque opcional
 */
export const TerminalPrompt = ({
  user = "visitor",
  host = "portfolio",
  path = "~",
  command = "",
  showCursor = false,
  className = "",
}) => {
  return (
    <p className={`font-mono text-[13px] leading-relaxed sm:text-sm ${className}`}>
      <span className="text-term-cyan">
        {user}@{host}:{path}$
      </span>
      {command ? (
        <>
          {" "}
          <span className="font-semibold text-term-green-bright">{command}</span>
        </>
      ) : null}
      {showCursor ? <span className="term-cursor" aria-hidden /> : null}
    </p>
  )
}
