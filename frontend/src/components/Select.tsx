import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import * as RadixSelect from '@radix-ui/react-select';
import { useState } from 'react';

import { cn } from '../utils/cn';

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          htmlFor="bank-account"
          className={cn(
            'pointer-events-none absolute left-[0.8125rem] top-1/2 z-10 -translate-y-1/2 text-gray-700',
            selectedValue && 'top-2 translate-y-0 text-sm transition-all',
          )}
        >
          {placeholder}
        </label>

        <RadixSelect.Root onValueChange={handleSelect} value={value}>
          <RadixSelect.Trigger
            className={cn(
              'relative h-[3.25rem] w-full rounded-lg border border-gray-500 bg-white px-3 text-left text-sm text-gray-800 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900 text-red-900',
              selectedValue && 'pt-[1.125rem]',
              className,
            )}
          >
            <RadixSelect.Value />

            <RadixSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="size-6 text-gray-800" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content className="z-[99] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_rgba(0,0,0,0.1)]">
              <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    className="cursor-default rounded-lg p-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 data-[state=checked]:font-bold"
                    value={option.value}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>

              <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon className="size-4" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
