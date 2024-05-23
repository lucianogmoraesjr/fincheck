import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useBankAccounts } from '../../../../hooks/useBankAccounts';
import { useCategories } from '../../../../hooks/useCategories';
import { useDashboard } from '../../../../hooks/useDashboard';
import { transactionsService } from '../../../../services/transactions-service';
import { CreateTransactionRequest } from '../../../../services/transactions-service/create';
import { currencyFormatter } from '../../../../utils/currencyFormatter';

const createTransactionSchema = z.object({
  value: z.string().min(1, 'Valor é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatório'),
  bankAccountId: z.string().min(1, 'Conta é obrigatório'),
  date: z.date(),
});

type CreateTransactionData = z.infer<typeof createTransactionSchema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const incomeCategories = useMemo(() => {
    return categories.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categories, newTransactionType]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateTransactionData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      transactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (!newTransactionType) {
      return;
    }

    try {
      await mutateAsync({
        ...data,
        value: currencyFormatter.parse(data.value),
        type: newTransactionType,
        date: data.date.toISOString(),
      });

      toast.success(
        newTransactionType === 'INCOME'
          ? 'Receita cadastrada com sucesso'
          : 'Despesa cadastrada com sucesso',
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'INCOME'
          ? 'Erro ao cadastrar a receita'
          : 'Erro ao cadastrar a despesa',
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    accounts,
    incomeCategories,
    isPending,
    closeNewTransactionModal,
    register,
    handleSubmit,
  };
}
