export const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-term-bg term-scanlines">
      <div className="term-grid absolute inset-0" />

      <div className="animate-pulse-soft absolute -left-24 top-10 h-[36vw] w-[36vw] rounded-full bg-term-green/8 blur-[120px]" />
      <div className="animate-pulse-soft absolute -right-20 bottom-0 h-[40vw] w-[40vw] rounded-full bg-term-cyan/6 blur-[130px]" />
    </div>
  )
}
