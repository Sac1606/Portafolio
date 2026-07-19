import { profile } from "../../../data/profile"
import heroPc from "../../../assets/img/hero-pc.jpg"
import { TerminalWindow } from "../../../shared/components/ui/TerminalWindow"
import { TerminalPrompt } from "../../../shared/components/ui/TerminalPrompt"
import { TransitionLink } from "../../../shared/components/ui/TransitionLink"

const bootLines = [
  { type: "prompt", command: "whoami" },
  { type: "out", text: profile.name },
  { type: "prompt", command: "cat role.txt" },
  { type: "out", text: profile.title },
  { type: "prompt", command: "echo $TAGLINE" },
  { type: "out", text: `"${profile.tagline}"` },
]

export const Hero = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <TerminalWindow
            title="isaac@portfolio:~/welcome"
            bodyClassName="space-y-4 font-mono text-sm"
          >
            <div className="space-y-1.5">
              {bootLines.map((line, i) =>
                line.type === "prompt" ? (
                  <TerminalPrompt key={i} command={line.command} />
                ) : (
                  <p key={i} className="pl-1 text-term-text">
                    {line.text}
                  </p>
                )
              )}
              <TerminalPrompt command="" />
              <p className="pl-1 text-term-muted">
                <span className="text-term-green-dim"># </span>
                {profile.welcome}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-term-border pt-4">
              <TransitionLink
                to="/proyectos"
                className="inline-flex items-center rounded-md bg-term-green px-4 py-2 font-mono text-xs font-semibold text-term-bg transition hover:brightness-110 sm:text-sm"
              >
                [ proyectos ]
              </TransitionLink>
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center rounded-md border border-term-border bg-term-elevated px-4 py-2 font-mono text-xs font-semibold text-term-text transition hover:border-term-green/40 hover:text-term-green sm:text-sm"
              >
                [ contacto ]
              </TransitionLink>
              <TransitionLink
                to="/sobre-mi"
                className="inline-flex items-center rounded-md border border-term-border bg-term-elevated px-4 py-2 font-mono text-xs font-semibold text-term-muted transition hover:text-term-text sm:text-sm"
              >
                [ sobre-mi ]
              </TransitionLink>
            </div>
          </TerminalWindow>
        </div>

        <div>
          <TerminalWindow title="preview — hardware.img" bodyClassName="!p-0">
            <img
              src={heroPc}
              alt="Case de PC abierto con placa madre y ventiladores"
              className="aspect-[16/10] w-full object-cover"
            />
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}
