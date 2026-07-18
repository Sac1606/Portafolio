import {
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlineCodeBracket,
  HiOutlineAcademicCap,
} from "react-icons/hi2"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

const items = [
  { icon: HiOutlineUser, label: "Nombre", value: profile.name },
  { icon: HiOutlineCalendarDays, label: "Edad", value: profile.age },
  { icon: HiOutlineMapPin, label: "Ubicación", value: profile.location },
  { icon: HiOutlineEnvelope, label: "Correo", value: profile.email },
  {
    icon: HiOutlineCodeBracket,
    label: "Años desarrollando",
    value: profile.yearsCoding,
  },
  {
    icon: HiOutlineAcademicCap,
    label: "Formación",
    value: profile.studying ? profile.studyingLabel : "Profesional activo",
  },
]

export const GeneralInfo = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, label, value }) => (
        <Card key={label} className="!p-4" hover={false}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hw-border bg-hw-surface text-hw-accent">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-hw-text-muted">
                {label}
              </p>
              <p className="truncate text-sm font-medium text-hw-text">{value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
