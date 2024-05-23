import { httpClient } from '../http-client';

export interface BankAccountRequest {
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
}

export async function create(params: BankAccountRequest) {
  return httpClient.post('/bank-accounts', params);
}
