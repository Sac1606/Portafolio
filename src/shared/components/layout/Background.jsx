export const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-term-bg term-scanlines">
      {/* Grid de líneas del mock terminal */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(#0d1310 1px, transparent 1px),
            linear-gradient(90deg, #0d1310 1px, transparent 1px)
          `,
          backgroundSize: "100% 28px, 28px 100%",
        }}
      />
      <div className="animate-pulse-soft absolute -left-24 top-10 h-[36vw] w-[36vw] rounded-full bg-term-green/6 blur-[120px]" />
      <div className="animate-pulse-soft absolute -right-20 bottom-0 h-[40vw] w-[40vw] rounded-full bg-term-cyan/4 blur-[130px]" />
    </div>
  )
}
