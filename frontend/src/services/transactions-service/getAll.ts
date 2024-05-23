import { Transaction } from '../../entities/transaction';
import { httpClient } from '../http-client';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
};

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters,
  });

  return data;
}
