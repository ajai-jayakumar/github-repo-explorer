import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '../input';

describe('Input Component', () => {
  it('renders the component', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    render(<Input data-testid="input" onChange={onChange} />);

    const input = screen.getByTestId('input');
    const user = userEvent.setup();

    await user.type(input, 'hello');

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue('hello');
  });
});
