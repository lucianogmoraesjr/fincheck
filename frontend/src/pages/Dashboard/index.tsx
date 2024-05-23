import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { DashboardProvider } from '../../contexts/dashboard-context';

import { Accounts } from './components/Accounts';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="flex h-full w-full flex-col gap-4 p-4 lg:px-8 lg:pb-8 lg:pt-6">
        <header className="flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>

        <main className="flex max-h-full flex-1 flex-col gap-4 lg:flex-row">
          <section className="w-full lg:w-1/2">
            <Accounts />
          </section>

          <section className="w-full lg:w-1/2">
            <Transactions />
          </section>
        </main>

        <Fab />
        <NewAccountModal />
        <EditAccountModal />
        <NewTransactionModal />
      </div>
    </DashboardProvider>
  );
}
