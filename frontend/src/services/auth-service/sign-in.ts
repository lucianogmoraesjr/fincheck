import { httpClient } from '../http-client';

export interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

export async function signIn(params: SignInRequest) {
  const { data } = await httpClient.post<SignInResponse>(
    '/auth/signin',
    params,
  );

  return data;
}
