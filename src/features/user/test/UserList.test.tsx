import React from 'react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import * as api from '@/api/getUsers';
import { mockUsers } from '@/lib/__mock__/apiResponse';

import UserList from '../component/UserList';

function UserListWrapper({ initialPath = '/' }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>
        <UserList />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('UserList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should not render list when no username is provided', () => {
    render(<UserListWrapper />);

    expect(screen.queryByTestId('show-result-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-list')).not.toBeInTheDocument();
  });

  it('should show loading state', async () => {
    vi.spyOn(api, 'getUsers').mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<UserListWrapper initialPath="/?username=alex" />);

    expect(screen.getByTestId('user-list-skeleton')).toBeInTheDocument();
  });

  it('should show error message when API fails', async () => {
    vi.spyOn(api, 'getUsers').mockResolvedValue({
      data: [],
      error: 'Invalid API response',
    });

    render(<UserListWrapper initialPath="/?username=alex" />);

    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toBeInTheDocument();
    });
    expect(
      screen.getByText('Error fetching the user data')
    ).toBeInTheDocument();
  });

  it('should show no users available message for empty results', async () => {
    vi.spyOn(api, 'getUsers').mockResolvedValue({
      data: [],
      error: null,
    });

    render(<UserListWrapper initialPath="/?username=nonexistentuser" />);

    await waitFor(() => {
      expect(screen.getByTestId('no-user-msg')).toBeInTheDocument();
    });
    expect(
      screen.getByText('No users available with username "nonexistentuser"')
    ).toBeInTheDocument();
  });

  it('should render users list when API returns results', async () => {
    vi.spyOn(api, 'getUsers').mockResolvedValue({
      data: mockUsers,
      error: null,
    });

    render(<UserListWrapper initialPath="/?username=john" />);

    await waitFor(() => {
      expect(screen.getByTestId('show-result-info')).toBeInTheDocument();
    });

    expect(screen.getByText('Showing users for "john"')).toBeInTheDocument();
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
    expect(screen.getByText('john')).toBeInTheDocument();
    expect(screen.getByText('john-smilga')).toBeInTheDocument();
  });
});
