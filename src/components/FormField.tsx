import React from 'react';

interface FormFieldProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error = false,
  disabled = false,
  maxLength,
  className = ''
}) => {
  return (
    <div className={`form-field ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        className={`form-input ${error ? 'error' : ''}`}
      />
    </div>
  );
};
