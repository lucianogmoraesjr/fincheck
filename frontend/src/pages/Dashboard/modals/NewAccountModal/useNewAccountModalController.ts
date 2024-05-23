import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useDashboard } from '../../../../hooks/useDashboard';
import { bankAccountsService } from '../../../../services/bank-accounts-service';
import { BankAccountRequest } from '../../../../services/bank-accounts-service/create';
import { currencyFormatter } from '../../../../utils/currencyFormatter';

const createAccountSchema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória '),
});

type CreateAccountData = z.infer<typeof createAccountSchema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      initialBalance: '0',
      color: '',
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: BankAccountRequest) => bankAccountsService.create(data),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyFormatter.parse(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta cadastrada com sucesso');
      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Ocorreu um erro ao cadastrar a conta');
    }
  });

  return {
    isNewAccountModalOpen,
    errors,
    control,
    isPending,
    closeNewAccountModal,
    register,
    handleSubmit,
  };
}
