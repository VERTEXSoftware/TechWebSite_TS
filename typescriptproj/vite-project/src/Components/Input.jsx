import React from "react";

export const Input = (props) => {
  const { size, color, placeholder, value, onChange } = props;

  const defaultClass =
    "flex items-center h-[40px] w-full px-4 py-2 border transition-colors duration-200";

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
  };

  return (
    <input
      type="text"
      className={
        defaultClass +
        " " +
        classes.sizes[size] +
        " " +
        classes.colors[color].input
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};