import { profile } from "../../../data/profile"

const rows = [
  { k: "nombre", v: profile.name },
  { k: "edad", v: profile.age },
  { k: "ubicacion", v: profile.location },
  { k: "rol", v: profile.title },
  { k: "correo", v: profile.email },
  { k: "años_dev", v: profile.yearsCoding },
  {
    k: "formacion",
    v: profile.studying ? profile.studyingLabel : "Profesional activo",
  },
  { k: "status", v: "online", online: true },
]

export const GeneralInfo = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-[13px]">
      {rows.map(({ k, v, online }) => (
        <div key={k} className="contents">
          <span className="text-term-muted">{k}</span>
          <span className={online ? "text-term-green" : "text-term-text"}>
            {online ? "● " : ""}
            {v}
          </span>
        </div>
      ))}
    </div>
  )
}
