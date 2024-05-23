import { Category } from '../../entities/category';
import { httpClient } from '../http-client';

export async function getAll() {
  const { data } = await httpClient.get<Category[]>('/categories');

  return data;
}
