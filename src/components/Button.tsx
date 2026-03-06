import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all rounded-lg';

  const variantClasses = {
    primary: 'bg-brand-gold-600 hover:bg-brand-gold-500 text-brand-maroon-950 hover:scale-105',
    secondary: 'bg-brand-maroon-700 hover:bg-brand-maroon-600 text-brand-cream-100 hover:scale-105',
    outline: 'border-2 border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-maroon-950',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
