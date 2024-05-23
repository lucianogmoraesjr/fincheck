import { ChevronDownIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '../../../../components/DropdownMenu';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon';

interface TransactionTypeDropdownProps {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="flex items-center gap-2">
          {selectedType === 'INCOME' && (
            <>
              <IncomeIcon />
              <span className="text-sm font-medium text-gray-800">
                Receitas
              </span>
            </>
          )}

          {selectedType === 'EXPENSE' && (
            <>
              <ExpensesIcon />
              <span className="text-sm font-medium text-gray-800">
                Despesas
              </span>
            </>
          )}

          {selectedType === undefined && (
            <>
              <TransactionsIcon />
              <span className="text-sm font-medium text-gray-800">
                Transações
              </span>
            </>
          )}
          <ChevronDownIcon className="-mt-1 size-6 text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mt-2 w-64">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect('INCOME')}
        >
          <IncomeIcon />
          Receita
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect('EXPENSE')}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
