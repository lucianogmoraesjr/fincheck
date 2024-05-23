import { PlusIcon } from '@radix-ui/react-icons';

import { DropdownMenu } from '../../../../components/DropdownMenu';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useDashboard } from '../../../../hooks/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            aria-label="Criar novo"
            className="flex items-center justify-center rounded-full bg-teal-900 p-3 text-center text-white"
          >
            <PlusIcon className="size-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-4 mr-4">
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
