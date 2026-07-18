export const SectionTitle = ({ eyebrow, title, subtitle, align = "left" }) => {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`mb-10 flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-hw-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-hw-text sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-hw-text-muted sm:text-base">
          {subtitle}
        </p>
      )}
      <div
        className={`h-px w-24 bg-gradient-to-r from-hw-accent via-hw-matrix to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  )
}
