import { httpClient } from '../http-client';

export interface CreateTransactionRequest {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function create(params: CreateTransactionRequest) {
  return httpClient.post('/transactions', params);
}
