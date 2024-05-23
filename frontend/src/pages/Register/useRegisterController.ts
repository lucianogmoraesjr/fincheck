import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth-service';
import { SignUpRequest } from '../../services/auth-service/sign-up';

const registerFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 dígitos'),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      return authService.signUp(data);
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta!');
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending,
  };
}
