import { useEffect, useState } from 'react';
import Swiper from 'swiper';

import { Transaction } from '../../../../entities/transaction';
import { useDashboard } from '../../../../hooks/useDashboard';
import { useTransactions } from '../../../../hooks/useTransactions';
import { TransactionsFilters } from '../../../../services/transactions-service/getAll';

export function useTransactionsController() {
  const [isFiltersModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null);
  const [slideState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { areValuesVisible } = useDashboard();

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleOpenFiltersModal() {
    setIsFilterModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFilterModalOpen(false);
  }

  function handleChangeFilters<T extends keyof TransactionsFilters>(filter: T) {
    return (value: TransactionsFilters[T]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    setIsFilterModalOpen(false);
  }

  function handleIndexChange(swiper: Swiper) {
    setSlideState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  return {
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleIndexChange,
    handleChangeFilters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    slideState,
    areValuesVisible,
    isLoading,
    isInitialLoading,
    isFiltersModalOpen,
    transactions,
    filters,
    isEditModalOpen,
    transactionBeingEdited,
  };
}
