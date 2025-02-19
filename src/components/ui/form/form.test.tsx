import { useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form, FormControl, FormField, FormItem } from './form';

// NOTE: In production grade project, I would test all the possible states of the component
// and would use snapshot tests in storybook to test the visuals.
function TestForm() {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  });

  return (
    <Form {...form}>
      <form data-testid="test-form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input {...field} data-testid="username-input" />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    </Form>
  );
}

describe('Form Component', () => {
  it('renders the form with all necessary elements', () => {
    render(<TestForm />);

    expect(screen.getByTestId('test-form')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('updates form value on input change', async () => {
    render(<TestForm />);

    const input = screen.getByTestId('username-input');
    await userEvent.type(input, 'testuser');

    expect(input).toHaveValue('testuser');
  });
});
