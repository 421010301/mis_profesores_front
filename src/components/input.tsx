'use client';
import React, { useState } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
}

/**
 * Componente de entrada (`Input`) reutilizable en React.
 *
 * Este componente renderiza un campo de entrada (`<input>`) con una etiqueta opcional y
 * funcionalidad para mostrar u ocultar contraseñas cuando el tipo es `password`.
 * También permite personalizar clases CSS y es accesible mediante `aria-label` y `htmlFor`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.label] - Etiqueta visible asociada al campo de entrada.
 * @param {Object} [props.className] - Clases CSS personalizables para distintos elementos.
 * @param {string} [props.className.container] - Clases para el contenedor del input.
 * @param {string} [props.className.label] - Clases para la etiqueta del input.
 * @param {string} [props.className.input] - Clases para el input en sí.
 * @param {string} [props.type] - Tipo del input (`text`, `password`, `email`, etc.).
 * @param {string} [props.name] - Nombre del input (útil para formularios).
 * @param {string} [props.id] - ID personalizado para el input (para accesibilidad).
 * @param {string} [props.value] - Valor del input (para uso controlado).
 * @param {function} [props.onChange] - Manejador del cambio de valor del input.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [rest] - Atributos adicionales compatibles con `<input>`.
 */
export default function Input(props: InputProps) {
  const { className, label, type, name, id, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const inputId =
    id || name || (label ? `input-${label.replace(/\s+/g, "-")}` : undefined);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={className?.container || "mb-3"}>
      {label && inputId && (
        <label
          htmlFor={inputId}
          className={`form-label ${className?.label || ""}`}
        >
          {label}
        </label>
      )}
      <div className="input-group">
        <input
          id={inputId}
          name={name}
          type={inputType}
          className={`form-control ${className?.input || ""}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="btn btn-light border"
            onClick={togglePasswordVisibility}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        )}
      </div>
    </div>
  );
}
