import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { profile } from "../../../data/profile"

const TimelineBlock = ({ title, command, items }) => (
  <TerminalWindow
    title={`isaac@portfolio: ~/${title.toLowerCase()}`}
    bodyClassName="space-y-4 font-mono text-sm"
  >
    <TerminalPrompt command={command} />
    <ol className="space-y-5">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="space-y-1">
          <p className="text-xs font-semibold text-term-green-bright">
            {item.period}
          </p>
          <p className="font-semibold text-term-text">{item.title}</p>
          <p className="text-[13px] text-term-cyan">{item.place}</p>
          <p className="text-[13px] leading-relaxed text-term-muted">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  </TerminalWindow>
)

export const EducationExperience = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TimelineBlock
        title="educacion"
        command="pnpm education.log"
        items={profile.education}
      />
      <TimelineBlock
        title="experiencia"
        command="pnpm experience.log"
        items={profile.experience}
      />
    </div>
  )
}
