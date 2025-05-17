'use client';
import React from 'react';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  className?: {
    container?: string;
    label?: string;
    textarea?: string;
  };
}

/**
 * Componente de área de texto (`TextArea`) reutilizable en React.
 *
 * Este componente renderiza un campo de texto multilinea (`<textarea>`) con una etiqueta opcional.
 * Permite personalizar clases CSS y es accesible mediante `aria-label` y `htmlFor`.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.label] - Etiqueta visible asociada al campo de texto.
 * @param {Object} [props.className] - Clases CSS personalizables para distintos elementos.
 * @param {string} [props.className.container] - Clases para el contenedor del textarea.
 * @param {string} [props.className.label] - Clases para la etiqueta del textarea.
 * @param {string} [props.className.textarea] - Clases para el textarea en sí.
 * @param {string} [props.name] - Nombre del textarea (útil para formularios).
 * @param {string} [props.id] - ID personalizado para el textarea (para accesibilidad).
 * @param {number} [props.rows] - Número de filas visibles inicialmente.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} [rest] - Atributos adicionales compatibles con `<textarea>`.
 */
export default function TextArea(props: TextAreaProps) {
  const { className, label, name, id, rows, ...rest } = props;

  const textareaId =
    id ||
    name ||
    (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={className?.container || 'mb-3'}>
      {label && textareaId && (
        <label
          htmlFor={textareaId}
          className={`form-label ${className?.label || ''}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows || 3}
        className={`form-control ${className?.textarea || ''}`}
        {...rest}
      />
    </div>
  );
}
