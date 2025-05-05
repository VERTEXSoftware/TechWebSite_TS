import React from "react";

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary';

interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  size = 'medium', 
  color = 'primary', 
  title, 
  onClick,
  type = 'button',
  disabled = false
}) => {
  const defaultClass = "flex items-center h-[40px] w-[max-content] px-4 py-2 transition-colors duration-200 rounded";

  const classes = {
    colors: {
      primary: {
        button: "bg-red-600 hover:bg-red-900 active:bg-green-700",
        text: "text-white",
      },
      secondary: {
        button: "bg-green-600 hover:bg-green-900 active:bg-green-700",
        text: "text-white",
      },
    },
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-base min-h-[56px]",
    },
    disabled: "opacity-50 cursor-not-allowed"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={
        `${defaultClass} ${classes.sizes[size]} ${classes.colors[color].button} ${disabled ? classes.disabled : ''}`
      }
      onClick={onClick}
    >
      <div className={classes.colors[color].text}>{title}</div>
    </button>
  );
};