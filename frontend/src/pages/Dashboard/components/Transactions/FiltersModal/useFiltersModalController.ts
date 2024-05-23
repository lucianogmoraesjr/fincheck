import { useState } from 'react';

import { useBankAccounts } from '../../../../../hooks/useBankAccounts';

export function useFiltersModalController() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined);

  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    selectedYear,
    accounts,
    handleSelectBankAccount,
    handleChangeYear,
  };
}
