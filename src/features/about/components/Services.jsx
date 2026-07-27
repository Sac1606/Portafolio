import { profile } from "../../../data/profile"
import { FiCode, FiSmartphone, FiServer, FiCpu } from "react-icons/fi"

const iconMap = {
  fullstack: FiCode,
  mobile: FiSmartphone,
  "backend-db": FiServer,
  "ai-vision": FiCpu,
}

export const Services = () => {
  const services = profile.services || []

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service) => {
        const IconComponent = iconMap[service.id] || FiCode

        return (
          <div
            key={service.id}
            className="group relative overflow-hidden rounded-lg border border-term-border bg-term-surface p-5 transition-all duration-300 hover:border-term-green/60 hover:bg-[rgba(74,222,128,0.03)]"
          >
            {/* Header con icono y comando */}
            <div className="flex items-center justify-between gap-3 border-b border-term-border-soft pb-3.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-term-border bg-term-bg text-term-green group-hover:border-term-green/50">
                  <IconComponent className="h-4 w-4" />
                </div>
                <h3 className="font-mono text-sm sm:text-base font-bold text-term-text group-hover:text-term-green-bright transition-colors">
                  {service.title}
                </h3>
              </div>
              <span className="font-mono text-[11px] text-term-mute hidden sm:inline-block">
                [ service_active ]
              </span>
            </div>

            {/* Comando ficticio de ejecución */}
            <div className="mb-3 font-mono text-[12px] text-term-muted bg-term-bg/60 px-3 py-1.5 rounded border border-term-border-soft flex items-center gap-2">
              <span className="text-term-green font-bold">$</span>
              <span className="text-term-text/90">{service.command}</span>
            </div>

            {/* Descripción */}
            <p className="font-mono text-[12.5px] leading-relaxed text-term-muted mb-4">
              {service.description}
            </p>

            {/* Tags de Tecnologías */}
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-term-border/80 bg-term-bg px-2 py-0.5 font-mono text-[11px] text-term-cyan"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
