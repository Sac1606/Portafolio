import { Link } from "react-router-dom"
import { profile } from "../../../data/profile"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { HERO_PC_SLOT_ID } from "./PersistentDesktopPC"

export const Hero = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-10">
        <div className="min-w-0 lg:pr-2">
          <TerminalWindow
            title="isaac@portfolio: ~/welcome"
            bodyClassName="space-y-0 font-mono text-sm"
          >
            <div className="space-y-1">
              <TerminalPrompt command="git" />
              <p className="mb-3.5 text-term-text">{profile.name}</p>

              <TerminalPrompt command="pnpm role.txt" />
              <p className="mb-3.5 text-term-text">{profile.title}</p>

              <TerminalPrompt command="echo $TAGLINE" />
              <p className="mb-3.5 font-semibold text-term-green-bright">
                &quot;{profile.tagline}&quot;
              </p>

              <TerminalPrompt showCursor />

              <p className="mt-3 text-[13px] text-term-muted">
                <span className="text-term-mute"># </span>
                {profile.welcome}
              </p>
            </div>

            <div className="mt-[18px] flex flex-wrap gap-2.5">
              <Link to="/proyectos" className="term-btn term-btn-primary">
                [ proyectos ]
              </Link>
              <Link to="/contacto" className="term-btn">
                [ contacto ]
              </Link>
              <Link to="/sobre-mi" className="term-btn">
                [ sobre-mi ]
              </Link>
            </div>
          </TerminalWindow>
        </div>

        <div
          id={HERO_PC_SLOT_ID}
          className="relative min-w-0 lg:-mr-4 lg:min-h-[680px] xl:min-h-[720px]"
          style={{ minHeight: 520 }}
        />
      </div>
    </section>
  )
}
