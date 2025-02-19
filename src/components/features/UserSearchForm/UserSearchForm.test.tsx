import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserSearchForm from './UserSearchForm';

const setSearchParamsMock = vi.fn();

vi.mock('react-router', () => {
  const actual = vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), setSearchParamsMock],
    MemoryRouter: vi.fn().mockImplementation(({ children }) => children),
  };
});

function UserSearchFormWrapper() {
  return (
    <MemoryRouter>
      <UserSearchForm />
    </MemoryRouter>
  );
}

describe('UserSearchForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the gihub user search form', () => {
    render(<UserSearchFormWrapper />);

    const input = screen.getByTestId('username-input');
    const button = screen.getByTestId('submit-form');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call setSearchParams when form is submitted', async () => {
    render(<UserSearchFormWrapper />);

    const input = screen.getByTestId('username-input');
    const button = screen.getByTestId('submit-form');

    await userEvent.type(input, 'testuser');
    await userEvent.click(button);

    expect(input).toHaveValue('testuser');
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
  });

  it('should call setSearchParams when form is cleared', async () => {
    render(<UserSearchFormWrapper />);

    const input = screen.getByTestId('username-input');
    await userEvent.type(input, 'testuser');

    const clearButton = screen.getByTestId('clear-input-button');
    await userEvent.click(clearButton);

    expect(input).toHaveValue('');
    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);
  });
});
