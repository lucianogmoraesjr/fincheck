import { Outlet } from 'react-router-dom';

import illustrationImg from '../assets/illustration.png';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 lg:w-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="relative hidden h-full w-1/2 items-center justify-center pb-8 pr-8 pt-8 lg:flex">
        <img
          src={illustrationImg}
          alt=""
          className="h-full max-h-[960px] w-full max-w-[656px] select-none rounded-[32px] object-cover"
        />

        <div className="absolute bottom-8 max-w-[656px] rounded-b-[32px] bg-white px-10 py-12">
          <Logo className="h-8 text-teal-900" />

          <p className="mt-6 text-xl font-medium text-gray-700">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
