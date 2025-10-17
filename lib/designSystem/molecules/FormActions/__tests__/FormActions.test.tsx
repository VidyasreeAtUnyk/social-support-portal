import { fireEvent, render, screen } from '@lib/__tests__/test-utils';
import { FormActions } from '@lib/designSystem/molecules/FormActions';

describe('FormActions Component', () => {
  it('renders with default props', () => {
    render(<FormActions />);
    
    // Should render empty container
    const containers = screen.getAllByRole('generic');
    expect(containers[0]).toBeInTheDocument();
  });

  it('renders with next button', () => {
    const handleNext = jest.fn();
    render(
      <FormActions 
        nextButton={{ 
          text: 'Next', 
          onClick: handleNext 
        }} 
      />
    );
    
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('renders with previous button', () => {
    const handlePrevious = jest.fn();
    render(
      <FormActions 
        previousButton={{ 
          text: 'Previous', 
          onClick: handlePrevious 
        }} 
      />
    );
    
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
  });

  it('renders with submit button', () => {
    const handleSubmit = jest.fn();
    render(
      <FormActions 
        submitButton={{ 
          text: 'Submit', 
          onClick: handleSubmit 
        }} 
      />
    );
    
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles next button click', () => {
    const handleNext = jest.fn();
    render(
      <FormActions 
        nextButton={{ 
          text: 'Next', 
          onClick: handleNext 
        }} 
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it('handles previous button click', () => {
    const handlePrevious = jest.fn();
    render(
      <FormActions 
        previousButton={{ 
          text: 'Previous', 
          onClick: handlePrevious 
        }} 
      />
    );
    
    const previousButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(previousButton);
    
    expect(handlePrevious).toHaveBeenCalledTimes(1);
  });

  it('handles submit button click', () => {
    const handleSubmit = jest.fn();
    render(
      <FormActions 
        submitButton={{ 
          text: 'Submit', 
          onClick: handleSubmit 
        }} 
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders with save button', () => {
    const handleSave = jest.fn();
    render(
      <FormActions 
        saveButton={{ 
          text: 'Save Draft', 
          onClick: handleSave 
        }} 
      />
    );
    
    expect(screen.getByRole('button', { name: /save draft/i })).toBeInTheDocument();
  });

  it('handles save button click', () => {
    const handleSave = jest.fn();
    render(
      <FormActions 
        saveButton={{ 
          text: 'Save Draft', 
          onClick: handleSave 
        }} 
      />
    );
    
    const saveButton = screen.getByRole('button', { name: /save draft/i });
    fireEvent.click(saveButton);
    
    expect(handleSave).toHaveBeenCalledTimes(1);
  });

  it('renders with cancel button', () => {
    const handleCancel = jest.fn();
    render(
      <FormActions 
        cancelButton={{ 
          text: 'Cancel', 
          onClick: handleCancel 
        }} 
      />
    );
    
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('handles cancel button click', () => {
    const handleCancel = jest.fn();
    render(
      <FormActions 
        cancelButton={{ 
          text: 'Cancel', 
          onClick: handleCancel 
        }} 
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when loading', () => {
    render(
      <FormActions 
        nextButton={{ 
          text: 'Next', 
          loading: true 
        }} 
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('disables buttons when disabled', () => {
    render(
      <FormActions 
        nextButton={{ 
          text: 'Next', 
          disabled: true 
        }} 
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('renders with custom className', () => {
    render(<FormActions className="custom-class" />);
    
    const containers = screen.getAllByRole('generic');
    // Find the container with the custom class
    const containerWithClass = containers.find(container => 
      container.classList.contains('custom-class')
    );
    expect(containerWithClass).toBeInTheDocument();
  });

  it('renders with custom sx prop', () => {
    render(
      <FormActions
        sx={{ backgroundColor: 'red', color: 'white' }}
      />
    );

    // Just check that the component renders without errors
    const containers = screen.getAllByRole('generic');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('renders with custom direction', () => {
    render(
      <FormActions 
        direction="column"
        nextButton={{ text: 'Next' }}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('renders with custom justifyContent', () => {
    render(
      <FormActions 
        justifyContent="center"
        nextButton={{ text: 'Next' }}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(
      <FormActions>
        <button>Custom Action</button>
      </FormActions>
    );
    
    expect(screen.getByRole('button', { name: /custom action/i })).toBeInTheDocument();
  });

  it('renders without divider', () => {
    render(
      <FormActions 
        showDivider={false}
        nextButton={{ text: 'Next' }}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('uses default button text when not provided', () => {
    render(
      <FormActions 
        nextButton={{ onClick: jest.fn() }}
        previousButton={{ onClick: jest.fn() }}
        submitButton={{ onClick: jest.fn() }}
        saveButton={{ onClick: jest.fn() }}
        cancelButton={{ onClick: jest.fn() }}
      />
    );
    
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save draft/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
});
