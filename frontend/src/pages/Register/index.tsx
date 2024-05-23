import { Link } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { useRegisterController } from './useRegisterController';

export function Register() {
  const { handleSubmit, register, errors, isPending } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px] text-gray-900">
          Crie sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">Já possui uma conta?</span>
          <Link to="/login" className="font-bold text-teal-900">
            Fazer login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

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

        <Button type="submit" className="mt-2" isLoading={isPending}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
