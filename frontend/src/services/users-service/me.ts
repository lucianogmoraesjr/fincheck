import { User } from '../../entities/user';
import { httpClient } from '../http-client';

export async function me() {
  const { data } = await httpClient.get<User>('/users/me');

  return data;
}
