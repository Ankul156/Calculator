import React from 'react';

type ButtonVariant = 'default' | 'operator' | 'equals' | 'function' | 'memory';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  className = '',
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'operator':
        return 'bg-blue-600 hover:bg-blue-500 text-white';
      case 'equals':
        return 'bg-blue-700 hover:bg-blue-600 text-white';
      case 'function':
        return 'bg-gray-700 hover:bg-gray-600 text-white';
      case 'memory':
        return 'bg-gray-800 hover:bg-gray-700 text-gray-300';
      default:
        return 'bg-gray-800 hover:bg-gray-700 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        h-14 rounded-xl
        font-medium text-xl
        transition-all duration-150 ease-in-out
        transform active:scale-95 active:brightness-90
        ${getVariantClasses()}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;