import { ComponentProps } from 'react';

import { cn } from '../utils/cn';

import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'flex h-12 items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="size-6" />}
    </button>
  );
}
