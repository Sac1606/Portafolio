import { HiOutlineCpuChip } from "react-icons/hi2"
import { profile } from "../../../data/profile"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hw-border bg-hw-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-hw-text-muted">
          <HiOutlineCpuChip className="h-4 w-4 text-hw-accent" aria-hidden />
          <span>
            © {year} {profile.name}
          </span>
        </div>
        <p className="text-xs text-hw-text-muted">
          Desarrollado con React, JavaScript y Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
