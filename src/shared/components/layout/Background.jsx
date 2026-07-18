export const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-hw-bg">
      <div className="circuit-pattern absolute inset-0" />

      {/* Subtle SVG circuit traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="pcb" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M10 10h40v20h20v40h-30M70 0v30h30M0 80h50v30M90 60v40h20"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="2" fill="#00BFFF" opacity="0.5" />
            <circle cx="50" cy="70" r="2" fill="#39FF14" opacity="0.4" />
            <circle cx="100" cy="30" r="1.5" fill="#00BFFF" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb)" />
      </svg>

      <div className="animate-pulse-soft absolute -left-24 top-0 h-[40vw] w-[40vw] rounded-full bg-hw-accent/10 blur-[120px]" />
      <div className="animate-pulse-soft absolute -right-16 bottom-0 h-[45vw] w-[45vw] rounded-full bg-hw-matrix/8 blur-[130px]" />
    </div>
  )
}
