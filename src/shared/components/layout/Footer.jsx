import { Link } from "react-router-dom"
import { profile } from "../../../data/profile"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-10 border-t border-term-border-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 font-mono text-xs text-term-mute sm:flex-row sm:px-6 lg:px-8">
        <span>
          isaac@portfolio ~ % _ · {year} {profile.name}
        </span>
        <span className="flex items-center gap-2">
          <Link to="/" className="hover:text-term-green">
            cd ~/
          </Link>
          <span>·</span>
          <span></span>
        </span>
      </div>
    </footer>
  )
}
