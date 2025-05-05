import React from "react";

export const Text = (props) => {
  const { size, color, weight, children } = props;

  const defaultClass = "font-sans";

  const classes = {
    colors: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      error: "text-red-600",
    },
    sizes: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
    weights: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  };

  return (
    <p
      className={
        defaultClass +
        " " +
        classes.sizes[size] +
        " " +
        classes.colors[color] +
        " " +
        classes.weights[weight]
      }
    >
      {children}
    </p>
  );
};