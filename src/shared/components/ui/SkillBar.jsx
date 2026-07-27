import { motion } from "framer-motion"

export const SkillBar = ({ name, level, delay = 0 }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 font-mono text-[13px]">
        <span className="font-semibold text-term-green-bright">{name}</span>
        <span className="tabular-nums text-term-muted">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-sm bg-term-border-soft">
        <motion.div
          className="h-full rounded-sm bg-gradient-to-r from-term-green to-term-green-bright"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
