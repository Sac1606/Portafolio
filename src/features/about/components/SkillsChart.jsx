import { useState } from "react"
import { SkillBar } from "../../../shared/components/ui/SkillBar"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { profile } from "../../../data/profile"
import { FiCode, FiServer, FiSmartphone, FiTool, FiDatabase } from "react-icons/fi"
import { FaJava } from "react-icons/fa6"

const categoryIconMap = {
  "Frontend Web": FiCode,
  "Backend & APIs": FiServer,
  "Lenguajes": FaJava,
  "Bases de Datos": FiDatabase,
  "Móvil & Multiplataforma": FiSmartphone,
  "Herramientas & Entornos": FiTool,
}

export const SkillsChart = () => {
  const [activeTab, setActiveTab] = useState("all")
  const categories = profile.skillCategories || []

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((c) => c.category === activeTab)

  return (
    <TerminalWindow
      title="isaac@portfolio: ~/skills"
      bodyClassName="space-y-6 font-mono p-5 sm:p-6"
    >
      <div>
        <TerminalPrompt command="ls skills/ --grouped" />
        <p className="mt-2 text-[13px] text-term-muted">
          Habilidades clasificadas por área de especialización y nivel técnico.
        </p>

        {/* Pestañas / Filtros de Categorías */}
        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-term-border-soft">
          <button
            onClick={() => setActiveTab("all")}
            className={`term-btn text-xs py-1 px-3 ${
              activeTab === "all"
                ? "term-btn-primary font-bold bg-term-green/15"
                : "hover:text-term-green"
            }`}
          >
            [ Todas las áreas ]
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(cat.category)}
              className={`term-btn text-xs py-1 px-3 ${
                activeTab === cat.category
                  ? "term-btn-primary font-bold bg-term-green/15"
                  : "hover:text-term-green"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Categorías con sus Barras de Nivel */}
      <div className="space-y-6">
        {filteredCategories.map((group) => {
          const IconComp = categoryIconMap[group.category] || FiCode

          return (
            <div
              key={group.category}
              className="rounded-lg border border-term-border bg-term-bg/60 p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-term-border-soft pb-2.5">
                <div className="flex items-center gap-2">
                  <IconComp className="h-4 w-4 text-term-green" />
                  <h3 className="text-sm font-bold text-term-green-bright">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[11px] text-term-mute hidden sm:inline-block">
                  $ {group.command}
                </span>
              </div>

              <div className="space-y-3.5 pt-1">
                {group.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.04}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </TerminalWindow>
  )
}
