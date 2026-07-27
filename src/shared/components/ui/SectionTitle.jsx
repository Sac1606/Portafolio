/**
 * Etiqueta de sección del mock: $ comando ────────
 * + título y subtítulo opcionales debajo.
 */
export const SectionTitle = ({
  title,
  subtitle,
  align = "left",
  command,
  eyebrow,
}) => {
  const label =
    command ||
    (eyebrow
      ? `pnpm ${String(eyebrow).toLowerCase().replace(/\s+/g, "-")}.md`
      : null)

  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`mb-8 flex w-full flex-col gap-3 ${alignment}`}>
      {label && (
        <div
          className={`section-label w-full ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="tag">$</span>
          <span>{label}</span>
        </div>
      )}
      {title && (
        <h1 className="font-mono text-xl font-semibold tracking-tight text-term-text sm:text-2xl md:text-3xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="max-w-2xl text-[13px] leading-relaxed text-term-muted sm:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  )
}
