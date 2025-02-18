import { render, screen } from '@testing-library/react';

import { Button } from '../button';

describe('Button Component', () => {
  it('renders the component', () => {
    render(<Button data-testid="button">Submit</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    render(
      <Button data-testid="button" disabled>
        Disabled
      </Button>
    );

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });
});
