
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium rounded-md transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
