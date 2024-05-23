import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Transaction } from '../../../../entities/transaction';
import { useBankAccounts } from '../../../../hooks/useBankAccounts';
import { useCategories } from '../../../../hooks/useCategories';
import { transactionsService } from '../../../../services/transactions-service';
import { currencyFormatter } from '../../../../utils/currencyFormatter';

const editTransactionSchema = z.object({
  value: z.string().min(1, 'Valor é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatório'),
  bankAccountId: z.string().min(1, 'Conta é obrigatório'),
  date: z.date(),
});

type EditTransactionData = z.infer<typeof editTransactionSchema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const incomeCategories = useMemo(() => {
    return categories.filter((category) => category.type === transaction?.type);
  }, [categories, transaction?.type]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors },
  } = useForm<EditTransactionData>({
    resolver: zodResolver(editTransactionSchema),
    values: {
      bankAccountId: transaction?.bankAccountId ?? '',
      categoryId: transaction?.category?.id ?? '',
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      name: transaction?.name ?? '',
      value: transaction?.value.toString() ?? '',
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  const {
    isPending: isPendingDelete,
    mutateAsync: removeTransactionMutateAsync,
  } = useMutation({
    mutationFn: (id: string) => transactionsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (!transaction) return;

    try {
      await mutateAsync({
        ...data,
        id: transaction.id,
        type: transaction.type,
        value: currencyFormatter.parse(data.value),
        date: data.date.toISOString(),
      });

      toast.success(
        transaction.type === 'INCOME'
          ? 'Receita editada com sucesso'
          : 'Despesa editada com sucesso',
      );
      onClose();
    } catch {
      toast.error(
        transaction.type === 'INCOME'
          ? 'Erro ao editar a receita'
          : 'Erro ao editar a despesa',
      );
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    if (!transaction) {
      return;
    }

    try {
      await removeTransactionMutateAsync(transaction.id);
      toast.success(
        transaction.type === 'INCOME'
          ? 'Receita deletada com sucesso'
          : 'Despesa deletada com sucesso',
      );
      handleCloseDeleteModal();
      onClose();
    } catch {
      toast.error(
        transaction.type === 'INCOME'
          ? 'Erro ao deletar a receita'
          : 'Erro ao deletar a despesa',
      );
    }
  }

  return {
    control,
    errors,
    accounts,
    incomeCategories,
    isPending,
    isDeleteModalOpen,
    isPendingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    register,
    handleSubmit,
  };
}
