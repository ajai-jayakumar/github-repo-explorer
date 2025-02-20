import { render, screen } from '@testing-library/react';

import { Label } from './label';

// NOTE: In production grade project, I would test all the possible states of the component
// and would use snapshot tests in storybook to test the visuals.
describe('Label Component', () => {
  it('renders the component', () => {
    render(<Label data-testid="label">Label</Label>);
    expect(screen.getByTestId('label')).toBeInTheDocument();
  });

  it('renders the component with the correct text', () => {
    render(<Label data-testid="label">Hello World!</Label>);
    expect(screen.getByTestId('label')).toHaveTextContent('Hello World!');
  });
});
