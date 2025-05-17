import React from 'react';

/**
 * Botón reutilizable con soporte para variantes de Bootstrap y personalización de íconos.
 *
 * @component
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante Bootstrap o personalizada. Ej: `primary`, `danger`, `mi-clase-custom`.
   * @default "primary"
   */
  variant?: string;

  /**
   * Si se usa variante `outline` (por ejemplo, `btn-outline-primary`).
   * @default false
   */
  outline?: boolean;

  /**
   * Ícono Bootstrap (`string`, como `check-circle`) o componente React.
   */
  icon?: string | React.ReactNode;

  /**
   * Tamaño del botón: `sm` o `lg` para tamaños Bootstrap.
   */
  size?: 'sm' | 'lg';

  /**
   * Clases adicionales personalizadas para el botón.
   */
  className?: string;
}

/**
 * Componente `Button` con estilos de Bootstrap y soporte para íconos.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  icon,
  className = '',
  variant = 'primary',
  outline = false,
  disabled = false,
  size,
  ...rest
}) => {
  const btnVariant = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const sizeClass = size ? `btn-${size}` : '';
  const combinedClasses = `btn ${btnVariant} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      {...rest}
    >
      {typeof icon === 'string' ? (
        <i className={`me-2 bi bi-${icon}`}></i>
      ) : (
        icon && <span className="me-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
