import React from "react";

export interface RadioOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface RadioOptionGroupProps<T = unknown> {
  name: string;
  options: RadioOption<T>[];
  selectedValue?: T;
  onChange: (option: RadioOption<T>) => void;
  disabled?: boolean;
  className?: string;
}

export default function RadioOptionGroup<T>({
  name,
  options,
  selectedValue,
  onChange,
  disabled = false,
  className = "",
}: RadioOptionGroupProps<T>) {
  return (
    <div className={`d-flex flex-column gap-2 mb-3 ${className}`}>
      {options.map((option, index) => (
        <label
          key={index}
          className="option list-group-item-action d-flex align-items-center"
        >
          <input
            type="radio"
            name={name}
            className="form-check-input me-2"
            disabled={disabled || option.disabled}
            checked={option.value === selectedValue}
            onChange={() => onChange(option)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
