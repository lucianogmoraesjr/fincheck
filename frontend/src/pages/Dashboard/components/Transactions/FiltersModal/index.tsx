import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import { cn } from '../../../../../utils/cn';

import { useFiltersModalController } from './useFiltersModalController';

interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    bankAccountId: string | undefined;
    year: number;
  }) => void;
}

export function FiltersModal({
  onClose,
  open,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    handleChangeYear,
    selectedBankAccountId,
    selectedYear,
    accounts,
  } = useFiltersModalController();

  return (
    <Modal title="Filtros" open={open} onClose={onClose}>
      <div>
        <span className="text-lg font-bold">Conta</span>

        <div className="mt-2 space-y-2">
          {accounts.map((bankAccount) => (
            <button
              key={bankAccount.id}
              type="button"
              onClick={() => handleSelectBankAccount(bankAccount.id)}
              className={cn(
                'w-full rounded-2xl p-2 text-left hover:bg-gray-50',
                bankAccount.id === selectedBankAccountId && '!bg-gray-200',
              )}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <span className="text-lg font-bold">Ano</span>

        <div className="mt-2 flex w-52 items-center justify-between">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => handleChangeYear(-1)}
          >
            <ChevronLeftIcon className="size-6" />
          </button>

          <span className="flex-1 text-center text-sm font-medium">
            {selectedYear}
          </span>

          <button
            type="button"
            aria-label="Próximo"
            onClick={() => handleChangeYear(+1)}
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>
      </div>

      <Button
        className="mt-10 w-full"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
