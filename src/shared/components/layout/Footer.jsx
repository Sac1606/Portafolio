import { Link } from "react-router-dom"
import { HiOutlineCommandLine } from "react-icons/hi2"
import { profile } from "../../../data/profile"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer border-t border-term-border bg-term-surface/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-mono text-sm text-term-muted">
          <HiOutlineCommandLine className="h-4 w-4 text-term-green" aria-hidden />
          <span>
            © {year} {profile.name}
          </span>
        </div>
        <p className="font-mono text-xs text-term-muted">
          <Link to="/" className="hover:text-term-green">
            cd ~/
          </Link>
          <span className="mx-2 text-term-border">|</span>
          React · JS · Tailwind
        </p>
      </div>
    </footer>
  )
}
