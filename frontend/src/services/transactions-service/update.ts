import { httpClient } from '../http-client';

export interface UpdateTransactionRequest {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...data }: UpdateTransactionRequest) {
  return httpClient.put(`/transactions/${id}`, data);
}
