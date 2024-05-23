import { Controller } from 'react-hook-form';

import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { CurrencyInput } from '../../../../components/CurrencyInput';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';

import { useEditAccountModalController } from './useEditAccountModalController';

const options = [
  {
    value: 'CHECKING',
    label: 'Conta Corrente',
  },
  {
    value: 'CASH',
    label: 'Dinheiro físico',
  },
  {
    value: 'INVESTMENTS',
    label: 'Investimentos',
  },
];

export function EditAccountModal() {
  const {
    errors,
    control,
    isPending,
    isEditAccountModalOpen,
    isDeleteModalOpen,
    isPendingDelete,
    handleSubmit,
    register,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button aria-label="Excluir" onClick={handleOpenDeleteModal}>
          <TrashIcon className="size-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs text-gray-600">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <CurrencyInput
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={options}
                onChange={onChange}
                value={value}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button className="mt-6 w-full" isLoading={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
