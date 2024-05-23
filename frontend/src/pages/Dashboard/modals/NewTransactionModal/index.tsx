import { Controller } from 'react-hook-form';

import { Button } from '../../../../components/Button';
import { CurrencyInput } from '../../../../components/CurrencyInput';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';

import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    accounts,
    incomeCategories,
    isPending,
    closeNewTransactionModal,
    handleSubmit,
    register,
  } = useNewTransactionModalController();

  const isIncome = newTransactionType === 'INCOME';

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs text-gray-600">
            {isIncome ? 'Valor da receita' : 'Valor da despesa'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            error={errors.name?.message}
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                options={incomeCategories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                error={errors.categoryId?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isIncome ? 'Receber com' : 'Pagar com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                error={errors.bankAccountId?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" isLoading={isPending} className="mt-6 w-full">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
