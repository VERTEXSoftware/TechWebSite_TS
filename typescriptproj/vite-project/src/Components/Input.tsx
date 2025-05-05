// Input.tsx
import React from "react";

type InputSize = 'small' | 'medium' | 'large';
type InputColor = 'primary' | 'secondary';

interface InputProps {
  size?: InputSize;
  color?: InputColor;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  min?: number;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  placeholder = '', 
  value = '', 
  onChange = () => {},
  type = 'text',
  name = '',
  min,
  disabled = false
}) => {
  const defaultClass = "flex items-center h-[40px] w-full px-4 py-2 border transition-colors duration-200 rounded";

  const classes = {
    colors: {
      primary: {
        input: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
        text: "text-gray-900",
      },
      secondary: {
        input: "border-green-300 focus:border-green-500 focus:ring-green-500",
        text: "text-gray-900",
      },
    },
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-base min-h-[56px]",
    },
    disabled: "opacity-50 cursor-not-allowed bg-gray-100"
  };

  return (
    <input
      type={type}
      name={name}
      min={min}
      disabled={disabled}
      className={
        `${defaultClass} ${classes.sizes[size]} ${classes.colors[color].input} ${disabled ? classes.disabled : ''}`
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};