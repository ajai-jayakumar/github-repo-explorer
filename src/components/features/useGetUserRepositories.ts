import { useQuery } from '@tanstack/react-query';

import { getUserRepositories } from '@/api/getUserRepositories';
import { ApiResponse, GithubRepositoryItem } from '@/lib/types';

interface UseGetUserRepositoriesResult
  extends ApiResponse<GithubRepositoryItem[]> {
  isLoading: boolean;
}

export const useGetUserRepositories = (
  username: string
): UseGetUserRepositoriesResult => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repositories', username],
    queryFn: () => getUserRepositories(username),
    enabled: Boolean(username),
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error: error ? (error as Error).message : (data?.error ?? null),
  };
};
