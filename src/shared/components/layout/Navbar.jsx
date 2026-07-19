import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { HiOutlineCommandLine, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2"

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/tecnologias", label: "Tecnologías" },
  { to: "/contacto", label: "Contacto" },
]

const linkClass = ({ isActive }) =>
  `relative px-3 py-2 font-mono text-sm transition-colors ${
    isActive
      ? "nav-link-active text-term-green"
      : "text-term-muted hover:text-term-text"
  }`

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-term-border/90 bg-term-bg/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={close}
          className="group flex items-center gap-2 font-mono text-term-text transition-colors hover:text-term-green"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-term-border bg-term-surface text-term-green">
            <HiOutlineCommandLine className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden text-sm sm:inline">
            <span className="text-term-muted">~/</span>isaac
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-term-border bg-term-surface text-term-text md:hidden"
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
        <div className="border-t border-term-border bg-term-bg/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={close}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 font-mono text-sm transition-colors ${
                      isActive
                        ? "bg-term-surface text-term-green"
                        : "text-term-muted hover:bg-term-surface hover:text-term-text"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
