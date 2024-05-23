import { httpClient } from '../http-client';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export async function signUp(params: SignUpRequest) {
  const { data } = await httpClient.post<SignUpResponse>(
    '/auth/signup',
    params,
  );

  return data;
}
