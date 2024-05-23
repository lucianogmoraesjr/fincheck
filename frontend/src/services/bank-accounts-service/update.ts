import { httpClient } from '../http-client';

export interface UpdateBankAccountRequest {
  id: string;
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
}

export async function update({ id, ...data }: UpdateBankAccountRequest) {
  return httpClient.put(`/bank-accounts/${id}`, data);
}
