import { FiSearch, FiFilter } from "react-icons/fi"

export const ProjectFilters = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categories = [],
}) => {
  return (
    <div className="mb-8 rounded-lg border border-term-border bg-term-surface p-4 font-mono">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Barra de Filtros por Categoría */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-term-muted mr-1">
            <FiFilter className="text-term-green" />
            <span>Filtro:</span>
          </div>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`term-btn text-xs py-1 px-3 transition-all ${
                  isActive
                    ? "term-btn-primary bg-term-green/20 font-bold border-term-green"
                    : "hover:text-term-green"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Buscador por término */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-term-muted text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="$ grep proyecto..."
            className="w-full rounded border border-term-border bg-term-bg py-1.5 pl-8 pr-3 font-mono text-xs text-term-text placeholder-term-mute focus:border-term-green focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
