import { fireEvent, render, screen } from '@lib/__tests__/test-utils';
import { Button } from '@lib/designSystem/atoms/Button';
import React from 'react';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-root');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="contained">Contained</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');

    rerender(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined');

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeMedium');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders with custom color', () => {
    render(<Button color="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorPrimary');
  });

  it('renders with full width', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-fullWidth');
  });

  it('renders with start icon', () => {
    render(
      <Button startIcon={<span data-testid="start-icon">🚀</span>}>
        With Icon
      </Button>
    );
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders with end icon', () => {
    render(
      <Button endIcon={<span data-testid="end-icon">🎯</span>}>
        With Icon
      </Button>
    );
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('Ref Button');
  });
});
