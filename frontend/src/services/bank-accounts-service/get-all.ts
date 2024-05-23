import { BankAccount } from '../../entities/bank-account';
import { httpClient } from '../http-client';

type GetAllResponse = Array<BankAccount>;

export async function getAll() {
  const { data } = await httpClient.get<GetAllResponse>('/bank-accounts');

  return data;
}
