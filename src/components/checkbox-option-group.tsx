import React from "react";

export interface CheckboxOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface CheckboxOptionGroupProps<T = unknown> {
  name: string;
  options: CheckboxOption<T>[];
  selectedValues: T[];
  onChange: (option: CheckboxOption<T>) => void;
  maxSelected?: number;
  disabled?: boolean;
  className?: string;
}

export default function CheckboxOptionGroup<T = unknown>({
  name,
  options,
  selectedValues,
  onChange,
  maxSelected,
  disabled = false,
  className = "",
}: CheckboxOptionGroupProps<T>) {
  const isSelected = (value: T) => selectedValues.includes(value);

  return (
    <div className={`d-flex flex-column gap-2 mb-3 ${className}`}>
      {options.map((option, index) => {
        const checked = isSelected(option.value);
        const limitReached =
          maxSelected !== undefined &&
          selectedValues.length >= maxSelected &&
          !checked;

        return (
          <label
            key={index}
            className="option list-group-item-action d-flex align-items-center"
          >
            <input
              type="checkbox"
              name={name}
              className="form-check-input me-2"
              disabled={disabled || option.disabled || limitReached}
              checked={checked}
              onChange={() => onChange(option)}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
