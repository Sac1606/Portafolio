import { motion } from "framer-motion"
import { HiArrowDown, HiOutlineSparkles } from "react-icons/hi2"
import { profile } from "../../../data/profile"
import heroPc from "../../../assets/img/hero-pc.jpg"

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-hw-border bg-hw-surface px-3 py-1.5 text-xs font-medium text-hw-accent">
            <HiOutlineSparkles className="h-3.5 w-3.5" aria-hidden />
            Portafolio de desarrollador
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-hw-text-muted">
              Bienvenido
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-hw-text text-glow sm:text-5xl lg:text-[3.25rem]">
              {profile.name}
            </h1>
            <p className="text-lg font-medium text-hw-accent sm:text-xl">
              {profile.title}
            </p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-hw-text-muted">
            {profile.welcome}
          </p>

          <p className="border-l-2 border-hw-matrix pl-4 text-sm italic text-hw-text/90 sm:text-base">
            “{profile.tagline}”
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-xl bg-hw-accent px-5 py-2.5 text-sm font-semibold text-hw-bg transition hover:brightness-110"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl border border-hw-border bg-hw-surface px-5 py-2.5 text-sm font-semibold text-hw-text transition hover:border-hw-accent/40 hover:text-hw-accent"
            >
              Contacto
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-hw-accent/20 via-transparent to-hw-matrix/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-hw-border bg-hw-surface shadow-[0_0_60px_-20px_rgba(0,191,255,0.35)]">
            <img
              src={heroPc}
              alt="Case de PC abierto con placa madre, CPU y ventiladores RGB"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hw-bg/70 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      <a
        href="#sobre-mi"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.25em] text-hw-text-muted transition hover:text-hw-accent sm:inline-flex"
      >
        Explorar
        <HiArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a>
    </section>
  )
}
