import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '../utils/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div>
        <div className="relative h-[52px]">
          <input
            {...props}
            id={inputId}
            name={name}
            ref={ref}
            placeholder=" "
            className={cn(
              'peer h-full w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-sm text-gray-800 outline-none transition-all placeholder-shown:pt-0 focus:border-gray-800',
              error && '!border-red-900 text-red-900',
              className,
            )}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-[0.8125rem] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
          >
            {placeholder}
          </label>
        </div>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-900">
            <CrossCircledIcon className="size-4" />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
