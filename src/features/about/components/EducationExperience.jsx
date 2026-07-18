import { HiOutlineAcademicCap, HiOutlineBriefcase } from "react-icons/hi2"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

const Timeline = ({ icon: Icon, title, items }) => (
  <Card hover={false} className="space-y-5">
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hw-border bg-hw-surface text-hw-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="text-lg font-semibold text-hw-text">{title}</h3>
    </div>

    <ol className="relative space-y-6 border-l border-hw-border pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative">
          <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-hw-accent bg-hw-bg shadow-[0_0_10px_var(--color-hw-accent)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hw-accent">
            {item.period}
          </p>
          <h4 className="mt-1 text-base font-semibold text-hw-text">
            {item.title}
          </h4>
          <p className="text-sm text-hw-matrix/90">{item.place}</p>
          <p className="mt-2 text-sm leading-relaxed text-hw-text-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  </Card>
)

export const EducationExperience = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Timeline
        icon={HiOutlineAcademicCap}
        title="Educación"
        items={profile.education}
      />
      <Timeline
        icon={HiOutlineBriefcase}
        title="Experiencia"
        items={profile.experience}
      />
    </div>
  )
}
