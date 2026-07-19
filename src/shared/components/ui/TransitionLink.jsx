import { NavLink, Link } from "react-router-dom"

/**
 * Enlaces de navegación del portafolio.
 * La animación de cambio de vista vive en PortfolioLayout (Framer Motion).
 */
export const TransitionLink = ({
  to,
  children,
  className,
  onClick,
  end,
  replace,
  nav = false,
  ...rest
}) => {
  if (nav) {
    return (
      <NavLink
        to={to}
        end={end}
        replace={replace}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
      </NavLink>
    )
  }

  return (
    <Link to={to} replace={replace} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
}
