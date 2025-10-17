import { render, screen } from '@lib/__tests__/test-utils';
import { StepProgressBar } from '@lib/designSystem/molecules/StepProgressBar';
import React from 'react';

describe('StepProgressBar Component', () => {
  const mockStepLabels = ['Step 1', 'Step 2', 'Step 3'];

  it('renders with default props', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} />);
    
    expect(screen.getByText('common:progress')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('shows correct current step', () => {
    render(<StepProgressBar currentStep={2} totalSteps={3} stepLabels={mockStepLabels} />);
    
    expect(screen.getByText('common:progress')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    // Step 2 should be active
    const step2 = screen.getByText('Step 2');
    expect(step2).toBeInTheDocument();
  });

  it('shows completed steps', () => {
    render(<StepProgressBar currentStep={2} totalSteps={3} stepLabels={mockStepLabels} />);
    
    // Step 1 should be completed
    const step1 = screen.getByText('Step 1');
    expect(step1).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} variant="compact" />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} color="secondary" />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} variant="detailed" />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders with showLabels false', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} showLabels={false} />);
    
    // Labels should not be visible
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  it('renders with showPercentage false', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} showPercentage={false} />);
    
    expect(screen.getByText('common:progress')).toBeInTheDocument();
    // Percentage should not be visible
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('renders with showPercentage true', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} showPercentage={true} />);
    
    expect(screen.getByText('common:progress')).toBeInTheDocument();
    // Should show percentage
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <StepProgressBar 
        currentStep={1} 
        totalSteps={3} 
        stepLabels={mockStepLabels}
        className="custom-class" 
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders with custom sx prop', () => {
    render(
      <StepProgressBar 
        currentStep={1} 
        totalSteps={3}
        stepLabels={mockStepLabels}
        sx={{ backgroundColor: 'red', color: 'white' }}
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('handles empty step labels array', () => {
    render(<StepProgressBar currentStep={1} totalSteps={3} stepLabels={[]} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('handles single step', () => {
    const singleStepLabels = ['Step 1'];
    render(<StepProgressBar currentStep={1} totalSteps={1} stepLabels={singleStepLabels} />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('handles currentStep out of bounds', () => {
    render(<StepProgressBar currentStep={10} totalSteps={3} stepLabels={mockStepLabels} />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('handles negative currentStep', () => {
    render(<StepProgressBar currentStep={-1} totalSteps={3} stepLabels={mockStepLabels} />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('calculates progress correctly', () => {
    render(<StepProgressBar currentStep={2} totalSteps={3} stepLabels={mockStepLabels} showPercentage={true} />);
    
    expect(screen.getByText('common:progress')).toBeInTheDocument();
    // Should show 50% for step 2 of 3
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  it('renders progress bar with correct value', () => {
    render(<StepProgressBar currentStep={2} totalSteps={3} stepLabels={mockStepLabels} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders step indicators', () => {
    render(<StepProgressBar currentStep={2} totalSteps={3} stepLabels={mockStepLabels} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} variant="default" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();

    rerender(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} variant="compact" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();

    rerender(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} variant="detailed" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const { rerender } = render(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} color="primary" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();

    rerender(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} color="secondary" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();

    rerender(
      <StepProgressBar currentStep={1} totalSteps={3} stepLabels={mockStepLabels} color="success" />
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<StepProgressBar ref={ref} currentStep={1} totalSteps={3} stepLabels={mockStepLabels} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
