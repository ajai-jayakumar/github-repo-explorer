import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/api/getUsers';
import { ApiResponse, GithubUser } from '@/lib/types';

interface UseGetUsersResult extends ApiResponse<GithubUser[]> {
  isLoading: boolean;
}

export const useGetUsers = (username: string): UseGetUsersResult => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users', username],
    queryFn: () => getUsers(username),
    enabled: Boolean(username),
  });

  return {
    isLoading,
    data: data?.data ?? [],
    error: error ? (error as Error).message : (data?.error ?? null),
  };
};
