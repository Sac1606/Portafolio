import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiDotnet,
  SiPython,
  SiGithub,
  SiVite,
  SiMysql,
  SiPostgresql,
} from "react-icons/si"
import { FaJava } from "react-icons/fa6"
import { motion } from "framer-motion"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { SkillsChart } from "../../about/components/SkillsChart"
import { profile } from "../../../data/profile"

const iconMap = {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiDotnet,
  SiPython,
  SiGithub,
  SiVite,
  SiJava: FaJava,
  SiMysql,
  SiPostgresql,
}

const ASCII_PC = `    ▄▄▄▄▄▄▄▄
  ▄█████████▄
 ██▀▀▀▀▀▀▀▀██
 ██  ▄▄▄▄  ██
 ██  ████  ██
 ██  ▀▀▀▀  ██
 ██████████
  ▀▀▀▀▀▀▀▀`

const stackGroups = [
  {
    key: "frontend",
    value: "React · JavaScript · HTML/CSS · Tailwind · Vite",
  },
  {
    key: "backend",
    value: ".NET · Node.js · Express · MongoDB · Python",
  },
  {
    key: "mobile",
    value: "React Native",
  },
  {
    key: "lenguajes",
    value: "JavaScript · C# · Java · Python",
  },
  {
    key: "bases de datos",
    value: "MongoDB · MySQL · PostgreSQL",
  },
  {
    key: "tools",
    value: "GitHub · Git · Vite",
  },
]

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
}

export const Technologies = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="neofetch"
          title="Tecnologías & Habilidades"
          subtitle="Stack tecnológico, lenguajes, bases de datos y nivel de dominio por área de especialización."
          align="center"
        />

        {/* Bloque Neofetch — stack resumido tipo terminal */}
        <TerminalWindow
          title="isaac@portfolio: ~/stack"
          bodyClassName="!p-0"
        >
          <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-7">
            <pre className="select-none font-mono text-[11px] leading-[1.3] text-term-green">
              {ASCII_PC}
            </pre>
            <div className="min-w-0">
              {stackGroups.map((row) => (
                <div
                  key={row.key}
                  className="mb-1.5 grid grid-cols-1 gap-1 font-mono text-[12.5px] sm:grid-cols-[110px_1fr] sm:gap-2"
                >
                  <span className="font-semibold text-term-green-bright">
                    {row.key}
                  </span>
                  <span className="text-term-text">{row.value}</span>
                </div>
              ))}
              <div className="mt-3.5 flex gap-1">
                <span className="h-4 w-4 rounded-sm bg-term-green" />
                <span className="h-4 w-4 rounded-sm bg-term-cyan" />
                <span className="h-4 w-4 rounded-sm bg-term-border" />
                <span className="h-4 w-4 rounded-sm bg-term-green-bright" />
                <span className="h-4 w-4 rounded-sm bg-term-border" />
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Habilidades por Categoría con barras de nivel */}
        <div className="mt-10">
          <div className="section-label">
            <span className="tag">$</span>
            <span>ls skills/ --grouped --level</span>
          </div>
          <SkillsChart />
        </div>

        {/* Grid de Íconos Animados */}
        <div className="mt-10">
          <div className="section-label">
            <span className="tag">$</span>
            <span>ls ./icons --grid</span>
          </div>
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {profile.technologies.map((tech) => {
              const Icon = iconMap[tech.icon] || SiJavascript
              return (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.06,
                    boxShadow: "0 0 0 1px rgba(74,222,128,0.35), 0 12px 28px -12px rgba(74,222,128,0.35)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="flex cursor-default flex-col items-center justify-center gap-3 rounded-lg border border-term-border bg-term-surface p-4 text-center"
                >
                  <motion.span
                    className="inline-flex text-term-green"
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-8 w-8" aria-hidden />
                  </motion.span>
                  <span className="font-mono text-xs font-medium text-term-muted">
                    {tech.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
