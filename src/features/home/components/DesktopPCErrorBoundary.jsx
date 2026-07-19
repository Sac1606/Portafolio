import { Component } from "react"

/**
 * Evita que un fallo del Canvas 3D deje toda la página en negro.
 */
export class DesktopPCErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: "" }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Error al cargar el modelo 3D",
    }
  }

  componentDidCatch(error) {
    console.error("[DesktopPC]", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[320px] flex-col items-center justify-center gap-2 px-4 text-center sm:h-[380px] lg:h-[440px]">
          <p className="font-mono text-sm text-term-green">// pc_offline</p>
          <p className="max-w-sm text-xs text-term-muted">
            No se pudo cargar el modelo 3D. El resto del portafolio sigue
            disponible. Revisa la consola o recarga la página.
          </p>
          <button
            type="button"
            className="mt-2 rounded-md border border-term-border px-3 py-1.5 font-mono text-xs text-term-text hover:border-term-green hover:text-term-green"
            onClick={() => this.setState({ hasError: false, message: "" })}
          >
            reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
