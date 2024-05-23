import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { useLoginController } from './useLoginController';

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px] text-gray-900">
          Entre em sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">Novo por aqui?</span>
          <Link to="/register" className="font-bold text-teal-900">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-4" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </>
  );
}
