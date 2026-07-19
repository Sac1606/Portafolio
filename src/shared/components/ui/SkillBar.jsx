import { motion } from "framer-motion"

export const SkillBar = ({ name, level, delay = 0 }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 font-mono text-sm">
        <span className="font-medium text-term-text">{name}</span>
        <span className="tabular-nums text-term-muted">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-sm bg-term-grid">
        <motion.div
          className="h-full rounded-sm bg-gradient-to-r from-term-green to-term-cyan"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
