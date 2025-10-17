import { render, screen } from '@lib/__tests__/test-utils';
import { Typography } from '@lib/designSystem/atoms/Typography';
import React from 'react';

describe('Typography Component', () => {
  it('renders with default props', () => {
    render(<Typography>Hello World</Typography>);
    
    const text = screen.getByText('Hello World');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('MuiTypography-root');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1')).toHaveClass('MuiTypography-h1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2')).toHaveClass('MuiTypography-h2');

    rerender(<Typography variant="body1">Body 1</Typography>);
    expect(screen.getByText('Body 1')).toHaveClass('MuiTypography-body1');

    rerender(<Typography variant="body2">Body 2</Typography>);
    expect(screen.getByText('Body 2')).toHaveClass('MuiTypography-body2');

    rerender(<Typography variant="subtitle1">Subtitle 1</Typography>);
    expect(screen.getByText('Subtitle 1')).toHaveClass('MuiTypography-subtitle1');

    rerender(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption')).toHaveClass('MuiTypography-caption');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Typography color="primary">Primary</Typography>);
    expect(screen.getByText('Primary')).toBeInTheDocument();

    rerender(<Typography color="secondary">Secondary</Typography>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();

    rerender(<Typography color="error">Error</Typography>);
    expect(screen.getByText('Error')).toBeInTheDocument();

    rerender(<Typography color="textPrimary">Text Primary</Typography>);
    expect(screen.getByText('Text Primary')).toBeInTheDocument();
  });

  it('renders with different alignments', () => {
    const { rerender } = render(<Typography align="left">Left</Typography>);
    expect(screen.getByText('Left')).toHaveClass('MuiTypography-alignLeft');

    rerender(<Typography align="center">Center</Typography>);
    expect(screen.getByText('Center')).toHaveClass('MuiTypography-alignCenter');

    rerender(<Typography align="right">Right</Typography>);
    expect(screen.getByText('Right')).toHaveClass('MuiTypography-alignRight');

    rerender(<Typography align="justify">Justify</Typography>);
    expect(screen.getByText('Justify')).toHaveClass('MuiTypography-alignJustify');
  });

  it('handles noWrap prop', () => {
    render(<Typography noWrap>No Wrap Text</Typography>);
    expect(screen.getByText('No Wrap Text')).toHaveClass('MuiTypography-noWrap');
  });

  it('handles bold prop', () => {
    render(<Typography bold>Bold Text</Typography>);
    const element = screen.getByText('Bold Text');
    expect(element).toHaveStyle('font-weight: 700');
  });

  it('handles italic prop', () => {
    render(<Typography italic>Italic Text</Typography>);
    const element = screen.getByText('Italic Text');
    expect(element).toHaveStyle('font-style: italic');
  });

  it('handles underline prop', () => {
    render(<Typography underline>Underlined Text</Typography>);
    const element = screen.getByText('Underlined Text');
    expect(element).toHaveStyle('text-decoration: underline');
  });

  it('combines multiple style props', () => {
    render(
      <Typography bold italic underline>
        Styled Text
      </Typography>
    );
    
    const element = screen.getByText('Styled Text');
    expect(element).toHaveStyle({
      'font-weight': '700',
      'font-style': 'italic',
      'text-decoration': 'underline',
    });
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(<Typography component="div">Div</Typography>);
    expect(screen.getByText('Div').tagName).toBe('DIV');

    rerender(<Typography component="span">Span</Typography>);
    expect(screen.getByText('Span').tagName).toBe('SPAN');

    rerender(<Typography component="p">Paragraph</Typography>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Custom</Typography>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Typography ref={ref}>Ref Text</Typography>);
    
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe('Ref Text');
  });

  it('renders with custom sx prop', () => {
    render(
      <Typography sx={{ backgroundColor: 'red', color: 'white' }}>
        Custom Styled
      </Typography>
    );
    
    const element = screen.getByText('Custom Styled');
    expect(element).toHaveStyle({
      color: 'rgb(255, 255, 255)',
    });
  });
});
