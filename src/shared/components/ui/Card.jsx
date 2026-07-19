export const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`rounded-lg border border-term-border bg-term-elevated/90 p-5 transition-all duration-300 sm:p-6 ${
        hover ? "card-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
