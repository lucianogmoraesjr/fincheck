import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { cn } from '../utils/cn';
import { dateFormatter } from '../utils/dateFormatter';

import { DatePicker } from './DatePicker';
import { Popover } from './Popover';

interface DatePickerInputProps {
  className?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({
  className,
  error,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'relative h-[3.25rem] w-full rounded-lg border border-gray-500 bg-white px-3 pt-5 text-left text-gray-700 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900 text-red-900',
              className,
            )}
          >
            <span className="absolute top-2 text-sm text-gray-700">Data</span>

            <span>{dateFormatter(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content className="shadow-all-sides">
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon className="size-4" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
