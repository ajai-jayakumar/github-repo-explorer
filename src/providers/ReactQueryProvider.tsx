import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  children: ReactNode;
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
