import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

interface DatePickerProps {
  value: Date;
  onChange?: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      mode="single"
      selected={value}
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        caption: 'flex items-center justify-between',
        nav: 'flex gap-2',
        nav_icon: 'size-[1.125rem] text-teal-800 ',
        head_cell: 'uppercase text-xs text-gray-500 font-medium py-2',
        day: 'text-gray-700 cursor-pointer size-10 hover:bg-teal-100 rounded-full',
        day_today: 'bg-gray-100 font-bold text-gray-900',
        day_selected: '!bg-teal-900 text-white font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <span className="font-medium text-gray-800">
              {capitalizeFirstLetter(format(date, 'LLLL yyyy', options))}
            </span>
          );
        },
      }}
    />
  );
}
