import { useState, useMemo } from "react"
import { SectionTitle } from "../../../shared/components/ui/SectionTitle"
import { ProjectsGallery } from "./ProjectsGallery"
import { ProjectsGrid } from "./ProjectsGrid"
import { ProjectsList } from "./ProjectsList"
import { ProjectFilters } from "./ProjectFilters"
import { projects } from "../../../data/projects"

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack (.NET / MERN)" },
  { id: "mobile", label: "Móvil (React Native)" },
  { id: "ai", label: "Python & IA" },
  { id: "basic", label: "HTML / CSS" },
]

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Filtro por búsqueda de texto
      const matchesSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      if (!matchesSearch) return false

      // Filtro por categoría
      if (activeCategory === "all") return true
      if (activeCategory === "fullstack") {
        return project.tech.some((t) =>
          [".NET", "React", "MERN", "Node.js", "Express"].includes(t)
        )
      }
      if (activeCategory === "mobile") {
        return project.tech.includes("React Native")
      }
      if (activeCategory === "ai") {
        return project.tech.some((t) =>
          ["Python", "OpenCV", "CUDA", "YOLO"].includes(t)
        )
      }
      if (activeCategory === "basic") {
        return project.tech.some((t) => ["HTML", "CSS"].includes(t))
      }

      return true
    })
  }, [activeCategory, searchQuery])

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          command="ls -la ~/proyectos"
          title="Proyectos"
          subtitle="Aplicaciones y sitios desarrollados en equipo e individualmente, con enlace a repositorio y demo cuando está disponible."
        />

        {/* Filtros dinámicos de Proyectos */}
        <ProjectFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={CATEGORIES}
        />

        {/* Listado tipo terminal ls -la */}
        <div className="space-y-4">
          <div className="section-label">
            <span className="tag">$</span>
            <span>ls -la --filter={activeCategory} ({filteredProjects.length})</span>
          </div>
          <ProjectsList items={filteredProjects} />
        </div>

        {/* Galería de vistas previas */}
        <div className="mt-12">
          <div className="section-label">
            <span className="tag">$</span>
            <span>preview --gallery</span>
          </div>
          <ProjectsGallery />
        </div>

        {/* Grid detallado de Tarjetas */}
        <div className="mt-12 space-y-6">
          <div className="section-label">
            <span className="tag">$</span>
            <span>pnpm proyectos/tarjetas/*</span>
          </div>
          <ProjectsGrid items={filteredProjects} />
        </div>
      </div>
    </section>
  )
}
