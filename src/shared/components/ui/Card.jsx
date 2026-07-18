export const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`rounded-2xl border border-hw-border bg-hw-surface-elevated/80 p-5 backdrop-blur-sm transition-all duration-300 sm:p-6 ${
        hover ? "card-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
