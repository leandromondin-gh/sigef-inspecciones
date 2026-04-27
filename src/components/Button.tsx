'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
}

const VARIANTS = {
  primary:   'bg-[#0072BC] text-white hover:bg-[#005f9e] active:bg-[#004f85] shadow-sm',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 shadow-sm',
  ghost:     'text-[#0072BC] hover:bg-blue-50 active:bg-blue-100',
  danger:    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  success:   'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 font-medium',
  md: 'text-sm px-4 py-2 font-semibold',
  lg: 'text-sm px-5 py-2.5 font-semibold',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0072BC] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
