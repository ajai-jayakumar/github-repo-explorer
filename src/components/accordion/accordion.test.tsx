import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

function TestAccordion() {
  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1" data-testid="accordion-item">
        <AccordionTrigger data-testid="accordion-trigger">
          Item 1
        </AccordionTrigger>
        <AccordionContent data-testid="accordion-content">
          Content 1
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// NOTE: In production grade project, I would test all the possible states of the component
// and would use snapshot tests in storybook to test the visuals.
describe('Accordion Component', () => {
  it('renders the component', () => {
    render(<TestAccordion />);

    expect(screen.getByTestId('accordion-item')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
  });

  it('expands and collapses the accordion item', async () => {
    render(<TestAccordion />);

    const trigger = screen.getByTestId('accordion-trigger');
    const content = screen.getByTestId('accordion-content');

    await userEvent.click(trigger);
    expect(content).toHaveTextContent('Content 1');

    await userEvent.click(trigger);
    expect(content).not.toHaveTextContent('Content 1');
  });
});
