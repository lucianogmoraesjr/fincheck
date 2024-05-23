import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon';
import { BankAccount } from '../../../../entities/bank-account';
import { useDashboard } from '../../../../hooks/useDashboard';
import { cn } from '../../../../utils/cn';
import { currencyFormatter } from '../../../../utils/currencyFormatter';

interface AccountCardProps {
  account: BankAccount;
}

export function AccountCard({ account }: AccountCardProps) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  const formattedBalance = currencyFormatter.format(account.currentBalance);

  return (
    <div
      role="button"
      onClick={() => openEditAccountModal(account)}
      onKeyDown={() => {}}
      tabIndex={0}
      className="flex h-[200px] flex-col justify-between rounded-2xl border-b-4 border-teal-950 bg-white p-4"
      style={{
        borderColor: account.color,
      }}
    >
      <div className="font-medium tracking-[-0.5px] text-gray-800">
        <BankAccountTypeIcon type={account.type} />

        <span className="mt-4 block">{account.name}</span>
      </div>

      <div>
        <span className={cn('block', !areValuesVisible && 'blur-md')}>
          {formattedBalance}
        </span>
        <small className="text-sm font-normal text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
