import { SkillBar } from "../../../shared/components/ui/SkillBar"
import { Card } from "../../../shared/components/ui/Card"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { profile } from "../../../data/profile"

export const SkillsChart = () => {
  return (
    <Card hover={false} className="space-y-5">
      <div>
        <TerminalPrompt command="ls skills/" />
        <h2 className="mt-2 font-mono text-lg font-semibold text-term-text">
          Habilidades
        </h2>
        <p className="mt-1 text-sm text-term-muted">
          Nivel aproximado en lenguajes, frameworks y herramientas que uso con
          más frecuencia.
        </p>
      </div>
      <div className="space-y-4">
        {profile.skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={index * 0.05}
          />
        ))}
      </div>
    </Card>
  )
}
