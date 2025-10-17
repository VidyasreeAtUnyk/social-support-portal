import { fireEvent, render, screen, waitFor } from '@lib/__tests__/test-utils';
import { HelpTooltip } from '@lib/designSystem/atoms/HelpTooltip';
import React from 'react';

describe('HelpTooltip Component', () => {
  it('renders with default props', () => {
    render(<HelpTooltip translationKey="help.selectCountryFirst" />);
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(<HelpTooltip translationKey="help.selectCountryFirst" />);
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    
    fireEvent.mouseOver(helpIcon);
    
    await waitFor(() => {
      expect(screen.getByText('help.selectCountryFirst')).toBeInTheDocument();
    });
  });

  it('renders with custom icon', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        icon={<span data-testid="custom-icon">?</span>} 
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with custom placement', () => {
    render(<HelpTooltip translationKey="help.selectCountryFirst" placement="bottom" />);
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<HelpTooltip translationKey="help.selectCountryFirst" iconSize="medium" />);
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<HelpTooltip translationKey="help.selectCountryFirst" iconColor="primary" />);
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        onClick={handleClick}
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    fireEvent.click(helpIcon);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        disabled
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        className="custom-class"
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with custom sx prop', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        sx={{ backgroundColor: 'red', color: 'white' }}
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with translation params', () => {
    render(
      <HelpTooltip 
        translationKey="help.fieldRequired"
        translationParams={{ field: 'email' }}
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders with custom namespace', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        namespace="custom"
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('renders without icon when showIcon is false', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        showIcon={false}
      >
        <span>Custom trigger</span>
      </HelpTooltip>
    );
    
    expect(screen.getByText('Custom trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('HelpOutlineIcon')).not.toBeInTheDocument();
  });

  it('renders with children when showIcon is false', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        showIcon={false}
      >
        <button>Custom Button</button>
      </HelpTooltip>
    );
    
    expect(screen.getByRole('button', { name: /custom button/i })).toBeInTheDocument();
  });

  it('renders with custom tooltip props', () => {
    render(
      <HelpTooltip 
        translationKey="help.selectCountryFirst"
        arrow={true}
        enterDelay={500}
        leaveDelay={200}
      />
    );
    
    const helpIcon = screen.getByTestId('HelpOutlineIcon');
    expect(helpIcon).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <HelpTooltip 
        ref={ref}
        translationKey="help.selectCountryFirst"
      />
    );
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
