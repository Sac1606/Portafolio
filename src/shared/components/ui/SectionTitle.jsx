import { TerminalPrompt } from "./TerminalPrompt"

export const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  command,
}) => {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`mb-10 flex flex-col gap-3 ${alignment}`}>
      {(command || eyebrow) && (
        <TerminalPrompt
          command={command || `cat ${String(eyebrow).toLowerCase().replace(/\s+/g, "-")}.md`}
          className={align === "center" ? "w-full text-center" : ""}
        />
      )}
      <h1 className="font-mono text-2xl font-bold tracking-tight text-term-text sm:text-3xl md:text-4xl">
        <span className="text-term-green"># </span>
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-term-muted sm:text-base">
          {subtitle}
        </p>
      )}
      <div
        className={`h-px w-28 bg-gradient-to-r from-term-green via-term-cyan to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  )
}
