import { useQuery } from '@tanstack/react-query';

import { getUserRepositories } from '@/api/getUserRepositories';

export const useGetUserRepositories = (username: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repositories', username],
    queryFn: () => getUserRepositories(username),
    enabled: Boolean(username),
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error: error ?? data?.error,
  };
};
