import { SkillBar } from "../../../shared/components/ui/SkillBar"
import { Card } from "../../../shared/components/ui/Card"
import { profile } from "../../../data/profile"

export const SkillsChart = () => {
  return (
    <Card hover={false} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-hw-text">Habilidades</h3>
        <p className="mt-1 text-sm text-hw-text-muted">
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
