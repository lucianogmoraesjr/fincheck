import { useQuery } from '@tanstack/react-query';

import { transactionsService } from '../services/transactions-service';
import { TransactionsFilters } from '../services/transactions-service/getAll';

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchTransactions: refetch,
  };
}
