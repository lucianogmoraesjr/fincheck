import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth-service';
import { SignInRequest } from '../../services/auth-service/sign-in';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 dígitos'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInRequest) => {
      return authService.signIn(data);
    },
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isPending,
  };
}
