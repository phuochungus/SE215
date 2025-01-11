import React, { FC, MouseEventHandler } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-6 py-3 rounded-md font-medium text-white bg-indigo-950 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;