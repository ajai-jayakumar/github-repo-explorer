import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/api/getUsers';

export const useGetUsers = (username: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users', username],
    queryFn: () => getUsers(username),
    enabled: Boolean(username),
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error: error ?? data?.error,
  };
};
