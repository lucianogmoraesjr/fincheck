import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useDashboard } from '../../../../hooks/useDashboard';
import { bankAccountsService } from '../../../../services/bank-accounts-service';
import { UpdateBankAccountRequest } from '../../../../services/bank-accounts-service/update';
import { currencyFormatter } from '../../../../utils/currencyFormatter';

const createAccountSchema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória '),
});

type CreateAccountData = z.infer<typeof createAccountSchema>;

export function useEditAccountModalController() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema),
    values: {
      color: accountBeingEdited?.color ?? '',
      initialBalance: accountBeingEdited?.initialBalance.toString() ?? '',
      name: accountBeingEdited?.name ?? '',
      type: accountBeingEdited?.type ?? 'CASH',
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: UpdateBankAccountRequest) =>
      bankAccountsService.update(data),
  });

  const { isPending: isPendingDelete, mutateAsync: removeAccountMutateAsync } =
    useMutation({
      mutationFn: (id: string) => bankAccountsService.remove(id),
    });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (!accountBeingEdited) {
      return;
    }

    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyFormatter.parse(data.initialBalance),
        id: accountBeingEdited.id,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta atualizada com sucesso');
      closeEditAccountModal();
      reset();
    } catch {
      toast.error('Ocorreu um erro ao salvar as alterações');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    if (!accountBeingEdited) {
      return;
    }

    try {
      await removeAccountMutateAsync(accountBeingEdited.id);
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta deletada com sucesso');
      handleCloseDeleteModal();
      closeEditAccountModal();
    } catch {
      toast.error('Ocorreu um erro ao deletar a conta');
    }
  }

  return {
    isEditAccountModalOpen,
    errors,
    control,
    isPending,
    isDeleteModalOpen,
    isPendingDelete,
    closeEditAccountModal,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
  };
}
