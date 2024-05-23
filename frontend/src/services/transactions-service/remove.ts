import { httpClient } from '../http-client';

export async function remove(id: string) {
  return httpClient.delete(`/transactions/${id}`);
}
