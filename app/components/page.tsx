'use client';

import {
  Button,
  CardContainer,
  FormActions,
  FormField,
  FormStep,
  FormWizardTemplate,
  HelpMeWriteBox,
  IconButton,
  Input,
  Select,
  StepProgressBar,
  TextArea,
  Toast,
  ToastProvider,
  Typography,
} from '@lib/designSystem';
import {
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`component-tabpanel-${index}`}
      aria-labelledby={`component-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ComponentDocumentation() {
  const [tabValue, setTabValue] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'warning' | 'info'>(
    'info',
  );
  const [showHelpBox, setShowHelpBox] = useState(false);
  const [helpBoxValue, setHelpBoxValue] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const showToastExample = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info',
  ) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setShowToast(true);
  };

  const handleAISuggestion = async (prompt: string): Promise<string> => {
    // Mock AI suggestion
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `AI-generated suggestion based on: "${prompt}". This is a sample response that would come from the OpenAI API.`;
  };

  return (
    <ToastProvider>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h2" gutterBottom>
          Design System Components
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          A comprehensive collection of reusable UI components built with Material-UI and
          styled-components.
        </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="component tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Atoms" />
            <Tab label="Molecules" />
            <Tab label="Templates" />
            <Tab label="Theme" />
          </Tabs>

          {/* Atoms Tab */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h4" gutterBottom>
              Atoms
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Basic building blocks of the design system.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {/* Button */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Button" subtitle="Various button variants and states">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button variant="contained">Primary</Button>
                      <Button variant="outlined">Outlined</Button>
                      <Button variant="text">Text</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button size="small">Small</Button>
                      <Button size="medium">Medium</Button>
                      <Button size="large">Large</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button color="success">Success</Button>
                      <Button color="warning">Warning</Button>
                      <Button color="error">Error</Button>
                    </Box>
                    <Button loading>Loading</Button>
                  </Box>
                </CardContainer>
              </Box>

              {/* IconButton */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="IconButton" subtitle="Icon-only buttons">
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <IconButton variant="text">
                      <EditIcon />
                    </IconButton>
                    <IconButton variant="contained">
                      <SaveIcon />
                    </IconButton>
                    <IconButton variant="outlined">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton loading>
                      <CheckIcon />
                    </IconButton>
                  </Box>
                </CardContainer>
              </Box>

              {/* Input */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Input" subtitle="Text input fields">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Input label="Email" placeholder="Enter your email" type="email" />
                    <Input label="Password" type="password" />
                    <Input label="Error State" error helperText="This field is required" />
                    <Input label="Disabled" disabled value="Disabled input" />
                  </Box>
                </CardContainer>
              </Box>

              {/* Select */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Select" subtitle="Dropdown selection">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Select
                      label="Country"
                      options={[
                        { value: 'us', label: 'United States' },
                        { value: 'ca', label: 'Canada' },
                        { value: 'uk', label: 'United Kingdom' },
                      ]}
                    />
                    <Select
                      label="Status"
                      error
                      helperText="Please select a status"
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                  </Box>
                </CardContainer>
              </Box>

              {/* TextArea */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="TextArea" subtitle="Multi-line text input">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextArea label="Description" placeholder="Enter your description" rows={4} />
                    <TextArea label="Comments" rows={6} resizable={false} />
                  </Box>
                </CardContainer>
              </Box>

              {/* Typography */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Typography" subtitle="Text styling variants">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h1">Heading 1</Typography>
                    <Typography variant="h2">Heading 2</Typography>
                    <Typography variant="h3">Heading 3</Typography>
                    <Typography variant="body1">Body text</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Secondary text
                    </Typography>
                    <Typography variant="caption">Caption text</Typography>
                    <Typography variant="overline">Overline text</Typography>
                  </Box>
                </CardContainer>
              </Box>

              {/* Toast */}
              <Box sx={{ flex: '1 1 100%', minWidth: '100%' }}>
                <CardContainer title="Toast" subtitle="Notification messages">
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => showToastExample('Success message!', 'success')}
                    >
                      Success Toast
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => showToastExample('Error message!', 'error')}
                    >
                      Error Toast
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => showToastExample('Warning message!', 'warning')}
                    >
                      Warning Toast
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => showToastExample('Info message!', 'info')}
                    >
                      Info Toast
                    </Button>
                  </Box>
                </CardContainer>
              </Box>
            </Box>
          </TabPanel>

          {/* Molecules Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h4" gutterBottom>
              Molecules
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Combinations of atoms that form functional components.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {/* FormField */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="FormField" subtitle="Form field with label and validation">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormField
                      label="Email Address"
                      required
                      description="We'll never share your email"
                    >
                      <Input type="email" placeholder="Enter your email" />
                    </FormField>
                    <FormField label="Name" error="Name is required" direction="row">
                      <Input placeholder="Enter your name" />
                    </FormField>
                  </Box>
                </CardContainer>
              </Box>

              {/* FormStep */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="FormStep" subtitle="Multi-step form layout">
                  <FormStep
                    title="Personal Information"
                    description="Please provide your basic details"
                    stepNumber={1}
                    totalSteps={3}
                    active
                  >
                    <Input label="Name" />
                    <Input label="Email" />
                  </FormStep>
                </CardContainer>
              </Box>

              {/* StepProgressBar */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="StepProgressBar" subtitle="Progress indicator">
                  <StepProgressBar
                    currentStep={2}
                    totalSteps={3}
                    stepLabels={['Personal', 'Financial', 'Situation']}
                  />
                </CardContainer>
              </Box>

              {/* HelpMeWriteBox */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="HelpMeWriteBox" subtitle="AI writing assistant">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextArea
                      label="Financial Situation"
                      value={helpBoxValue}
                      onChange={(e) => setHelpBoxValue(e.target.value)}
                      placeholder="Describe your financial situation..."
                    />
                    <Button
                      variant="outlined"
                      onClick={() => setShowHelpBox(true)}
                      startIcon={<PersonIcon />}
                    >
                      Help Me Write
                    </Button>
                  </Box>
                </CardContainer>
              </Box>

              {/* FormActions */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="FormActions" subtitle="Form action buttons">
                  <FormActions
                    previousButton={{
                      text: 'Previous',
                      onClick: () => console.log('Previous clicked'),
                    }}
                    nextButton={{
                      text: 'Next',
                      onClick: () => console.log('Next clicked'),
                    }}
                  />
                </CardContainer>
              </Box>

              {/* CardContainer */}
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="CardContainer" subtitle="Card layout component">
                  <Typography variant="body1">
                    This is a card container with consistent styling and layout options.
                  </Typography>
                </CardContainer>
              </Box>
            </Box>
          </TabPanel>

          {/* Templates Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h4" gutterBottom>
              Templates
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Complete page layouts and complex component compositions.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {/* FormWizardTemplate */}
              <Box sx={{ flex: '1 1 100%', minWidth: '100%' }}>
                <CardContainer>
                  <FormWizardTemplate
                    title="Social Support Application"
                    subtitle="Apply for financial assistance"
                    currentStep={2}
                    totalSteps={3}
                    stepLabels={['Personal', 'Financial', 'Situation']}
                    maxWidth="sm"
                    previousButton={{
                      text: 'Previous',
                      onClick: () => console.log('Previous clicked'),
                    }}
                    nextButton={{
                      text: 'Next',
                      onClick: () => console.log('Next clicked'),
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Input label="Monthly Income" type="number" />
                      <Input label="Employment Status" />
                      <TextArea label="Additional Information" rows={3} />
                    </Box>
                  </FormWizardTemplate>
                </CardContainer>
              </Box>
            </Box>
          </TabPanel>

          {/* Theme Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h4" gutterBottom>
              Theme System
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Design tokens, color palettes, and theme configuration.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Color Palette" subtitle="Light theme colors">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Box
                        sx={{ width: 60, height: 60, bgcolor: 'primary.main', borderRadius: 1 }}
                      />
                      <Box
                        sx={{ width: 60, height: 60, bgcolor: 'secondary.main', borderRadius: 1 }}
                      />
                      <Box
                        sx={{ width: 60, height: 60, bgcolor: 'success.main', borderRadius: 1 }}
                      />
                      <Box
                        sx={{ width: 60, height: 60, bgcolor: 'warning.main', borderRadius: 1 }}
                      />
                      <Box sx={{ width: 60, height: 60, bgcolor: 'error.main', borderRadius: 1 }} />
                      <Box sx={{ width: 60, height: 60, bgcolor: 'info.main', borderRadius: 1 }} />
                    </Box>
                  </Box>
                </CardContainer>
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <CardContainer title="Typography Scale" subtitle="Font sizes and weights">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h1">Heading 1</Typography>
                    <Typography variant="h2">Heading 2</Typography>
                    <Typography variant="h3">Heading 3</Typography>
                    <Typography variant="h4">Heading 4</Typography>
                    <Typography variant="h5">Heading 5</Typography>
                    <Typography variant="h6">Heading 6</Typography>
                    <Typography variant="body1">Body 1</Typography>
                    <Typography variant="body2">Body 2</Typography>
                    <Typography variant="caption">Caption</Typography>
                  </Box>
                </CardContainer>
              </Box>
            </Box>
          </TabPanel>
        </Paper>

        {/* Toast Example */}
        <Toast
          open={showToast}
          message={toastMessage}
          severity={toastSeverity}
          onClose={() => setShowToast(false)}
        />

        {/* Help Me Write Box Example */}
        <HelpMeWriteBox
          label="Financial Situation"
          value={helpBoxValue}
          open={showHelpBox}
          onClose={() => setShowHelpBox(false)}
          onRequestSuggestion={handleAISuggestion}
          onAcceptSuggestion={setHelpBoxValue}
          description="Describe your current financial situation to help us understand your needs."
        />
      </Container>
    </ToastProvider>
  );
}
