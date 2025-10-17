import { fireEvent, render, screen } from '@lib/__tests__/test-utils';
import { Input } from '@lib/designSystem/atoms/Input';
import React from 'react';

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('MuiInputBase-input');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outlined" placeholder="Outlined" />);
    expect(screen.getByPlaceholderText('Outlined')).toHaveClass('MuiOutlinedInput-input');

    rerender(<Input variant="filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveClass('MuiFilledInput-input');

    rerender(<Input variant="standard" placeholder="Standard" />);
    expect(screen.getByPlaceholderText('Standard')).toHaveClass('MuiInput-input');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="small" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toBeInTheDocument();

    rerender(<Input size="medium" placeholder="Medium" />);
    expect(screen.getByPlaceholderText('Medium')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Hello World');
  });

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled" />);
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('can be read only', () => {
    render(<Input InputProps={{ readOnly: true }} placeholder="Read Only" />);
    
    const input = screen.getByPlaceholderText('Read Only');
    expect(input).toHaveAttribute('readonly');
  });

  it('renders with label', () => {
    render(<Input label="Test Label" placeholder="Test" />);
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Input helperText="Helper text" placeholder="Test" />);
    
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Input error helperText="Error message" placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Error message')).toHaveClass('MuiFormHelperText-root');
  });

  it('renders with start adornment', () => {
    render(
      <Input
        InputProps={{
          startAdornment: <span data-testid="start-adornment">$</span>
        }}
        placeholder="Test"
      />
    );
    
    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
  });

  it('renders with end adornment', () => {
    render(
      <Input
        InputProps={{
          endAdornment: <span data-testid="end-adornment">%</span>
        }}
        placeholder="Test"
      />
    );
    
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
  });

  it('renders with multiline', () => {
    render(<Input multiline placeholder="Multiline" />);
    
    const textarea = screen.getByPlaceholderText('Multiline');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Test"
      />
    );
    
    const input = screen.getByPlaceholderText('Test');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies custom className to TextField', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    const textField = screen.getByPlaceholderText('Custom').closest('.MuiTextField-root');
    expect(textField).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Input ref={ref} placeholder="Ref" />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with full width by default', () => {
    render(<Input placeholder="Full Width" />);
    const textField = screen.getByPlaceholderText('Full Width').closest('.MuiTextField-root');
    expect(textField).toHaveClass('MuiFormControl-fullWidth');
  });

  it('renders with custom sx prop', () => {
    render(
      <Input
        sx={{ backgroundColor: 'red', color: 'white' }}
        placeholder="Custom Styled"
      />
    );
    
    const textField = screen.getByPlaceholderText('Custom Styled').closest('.MuiTextField-root');
    expect(textField).toHaveStyle({
      color: 'rgb(255, 255, 255)',
    });
  });
});
