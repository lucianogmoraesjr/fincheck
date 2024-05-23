import { useQuery } from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { LaunchScreen } from '../components/LaunchScreen';
import { localStorageKeys } from '../config/local-storage-keys';
import { User } from '../entities/user';
import { httpClient } from '../services/http-client';
import { usersService } from '../services/users-service';

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | undefined;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    if (storedAccessToken) {
      httpClient.defaults.headers.authorization = `Bearer ${storedAccessToken}`;
    }

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => usersService.me(),
    enabled: isAuthenticated,
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    httpClient.defaults.headers.authorization = `Bearer ${accessToken}`;

    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (isError) {
      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isSuccess && isAuthenticated,
        user: data,
        signIn,
        signOut,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
