import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { cn } from '../utils/cn';

import { DropdownMenu } from './DropdownMenu';
import { ColorIcon } from './icons/ColorIcon';

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' },
];

interface ColorsDropdownInputProps {
  className?: string;
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function ColorsDropdownInput({
  className,
  error,
  onChange,
  value,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(() => {
    if (!value) return null;

    return colors.find((c) => c.color === value) ?? null;
  });

  function handleSelectColor(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className={cn(
              'relative h-[3.25rem] w-full rounded-lg border border-gray-500 bg-white px-3 text-left text-gray-700 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900 text-red-900',
              className,
            )}
          >
            Cor
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="size-6 text-gray-800" />
              )}

              {selectedColor && (
                <ColorIcon bg={selectedColor.bg} color={selectedColor.color} />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="grid grid-cols-4">
          {colors.map(({ color, bg }) => (
            <DropdownMenu.Item
              key={color}
              onSelect={() => handleSelectColor({ color, bg })}
            >
              <ColorIcon bg={bg} color={color} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon className="size-4" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
