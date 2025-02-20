import React from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import * as api from '@/api/getUserRepositories';
import { mockUserRespositories } from '@/lib/__mock__/apiResponse';

import UserRepositoriesList from '../component/UserRepositoriesList';

function UserRespositoryWrapper({ username = '' }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <UserRepositoriesList username={username} />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('UserRepositoriesList', () => {
  it('should show loading state', async () => {
    vi.spyOn(api, 'getUserRepositories').mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<UserRespositoryWrapper username="alex" />);

    expect(
      screen.getByTestId('repositories-list-skeleton')
    ).toBeInTheDocument();
  });

  it('should show error message when API fails', async () => {
    vi.spyOn(api, 'getUserRepositories').mockResolvedValue({
      data: [],
      error: 'Invalid API response',
    });

    render(<UserRespositoryWrapper username="alex" />);

    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toBeInTheDocument();
    });
    expect(
      screen.getByText('Error fetching the user repositories data')
    ).toBeInTheDocument();
  });

  it('should show no repositories available message for empty results', async () => {
    vi.spyOn(api, 'getUserRepositories').mockResolvedValue({
      data: [],
      error: null,
    });

    render(<UserRespositoryWrapper username="alex" />);

    await waitFor(() => {
      expect(screen.getByTestId('no-repositories-msg')).toBeInTheDocument();
    });
    expect(
      screen.getByText('No repositories available for "alex"')
    ).toBeInTheDocument();
  });

  it('should render repositories list when API returns results', async () => {
    vi.spyOn(api, 'getUserRepositories').mockResolvedValue({
      data: mockUserRespositories,
      error: null,
    });

    render(<UserRespositoryWrapper username="alex" />);

    await waitFor(() => {
      expect(screen.getByTestId('repository-list-wrapper')).toBeInTheDocument();
    });

    expect(screen.getByText('0days-in-the-wild')).toBeInTheDocument();
    expect(screen.getByText('abscissa')).toBeInTheDocument();
  });
});
