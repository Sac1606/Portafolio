import { motion } from "framer-motion"

export const SkillBar = ({ name, level, delay = 0 }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-hw-text">{name}</span>
        <span className="tabular-nums text-hw-text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-hw-circuit">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-hw-accent to-hw-matrix"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
