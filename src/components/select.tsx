import React, { useId } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  className?: {
    container?: string;
    label?: string;
    input?: string;
  };
  options: Option[];
  placeholder?: string;
}

/**
 * Componente `Select` reutilizable en React.
 *
 * Este componente renderiza un elemento `<select>` con una etiqueta visible,
 * opciones personalizadas y estilos configurables por clase. Es compatible
 * con el uso controlado (`value`) o no controlado (`defaultValue`).
 *
 * Además, genera automáticamente un `id` si no se proporciona, manteniendo
 * buenas prácticas de accesibilidad.
 *
 * @component
 * @example
 * // Uso básico
 * <Select
 *   label="País"
 *   name="pais"
 *   options={[
 *     { value: 'mx', label: 'México' },
 *     { value: 'us', label: 'Estados Unidos' },
 *     { value: 'ca', label: 'Canadá' }
 *   ]}
 *   placeholder="Selecciona un país"
 *   defaultValue=""
 * />
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta visible asociada al campo.
 * @param {Array<{ value: string | number, label: string }>} props.options - Lista de opciones disponibles en el select.
 * @param {string} [props.placeholder] - Opción deshabilitada inicial que actúa como guía o título (si se proporciona).
 * @param {string} [props.name] - Nombre del campo (útil en formularios).
 * @param {string} [props.id] - ID del campo; si no se proporciona, se genera automáticamente.
 * @param {string | number} [props.defaultValue] - Valor por defecto del select (modo no controlado).
 * @param {string | number} [props.value] - Valor actual del select (modo controlado).
 * @param {Object} [props.className] - Objeto para aplicar clases CSS personalizadas.
 * @param {string} [props.className.container] - Clases del contenedor principal.
 * @param {string} [props.className.label] - Clases de la etiqueta.
 * @param {string} [props.className.input] - Clases del `<select>`.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} [rest] - Cualquier otra prop válida para `<select>`.
 *
 * @returns {JSX.Element} Un elemento `<select>` con sus opciones y etiqueta asociada.
 */
const Select: React.FC<SelectProps> = ({
  label,
  className,
  options,
  placeholder,
  id,
  name,
  defaultValue,
  value,
  ...rest
}) => {
  const generatedId = useId();
  const selectId = id || name || generatedId;

  return (
    <div className={`mb-3 ${className?.container ?? ''}`}>
      <label htmlFor={selectId} className={`form-label ${className?.label ?? ''}`}>
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className={`form-select bg-white ${className?.input ?? ''}`}
        defaultValue={defaultValue ?? (value === undefined ? '' : undefined)}
        value={value}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
