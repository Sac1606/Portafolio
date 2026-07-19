import { HiOutlineAcademicCap, HiOutlineBriefcase } from "react-icons/hi2"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

const Timeline = ({ icon: Icon, title, items }) => (
  <Card hover={false} className="space-y-5">
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-md border border-term-border bg-term-surface text-term-green">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h2 className="font-mono text-lg font-semibold text-term-text">{title}</h2>
    </div>

    <ol className="relative space-y-6 border-l border-term-border pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative">
          <span className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full border border-term-green bg-term-bg shadow-[0_0_8px_var(--color-term-green)]" />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-term-green">
            {item.period}
          </p>
          <h3 className="mt-1 text-base font-semibold text-term-text">
            {item.title}
          </h3>
          <p className="font-mono text-sm text-term-cyan/90">{item.place}</p>
          <p className="mt-2 text-sm leading-relaxed text-term-muted">
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
