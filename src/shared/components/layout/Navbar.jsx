import { useEffect, useState } from "react"
import { HiOutlineCpuChip, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2"

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#contacto", label: "Contacto" },
]

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-hw-border/80 bg-hw-bg/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="group flex items-center gap-2 text-hw-text transition-colors hover:text-hw-accent"
          onClick={handleNav}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hw-border bg-hw-surface text-hw-accent shadow-[0_0_20px_-6px_var(--color-hw-accent)] transition-colors group-hover:border-hw-accent/40">
            <HiOutlineCpuChip className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            Isaac T. V.
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`circuit-line px-3 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "active text-hw-accent"
                    : "text-hw-text-muted hover:text-hw-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hw-border bg-hw-surface text-hw-text md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <HiOutlineXMark className="h-5 w-5" aria-hidden />
          ) : (
            <HiOutlineBars3 className="h-5 w-5" aria-hidden />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hw-border bg-hw-bg/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNav}
                  className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    active === link.href
                      ? "bg-hw-surface text-hw-accent"
                      : "text-hw-text-muted hover:bg-hw-surface hover:text-hw-text"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
