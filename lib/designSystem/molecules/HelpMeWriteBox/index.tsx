'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { AutoFixHigh as AIIcon, Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, useState } from 'react';

export interface HelpMeWriteBoxProps extends BoxProps {
  /**
   * Field label
   */
  label: string;
  /**
   * Current field value
   */
  value: string;
  /**
   * Field placeholder
   */
  placeholder?: string;
  /**
   * Whether the help box is open
   * @default false
   */
  open?: boolean;
  /**
   * Callback when dialog is closed
   */
  onClose?: () => void;
  /**
   * Callback when AI suggestion is requested
   */
  onRequestSuggestion?: (prompt: string) => Promise<string>;
  /**
   * Callback when suggestion is accepted
   */
  onAcceptSuggestion?: (suggestion: string) => void;
  /**
   * Callback when field value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether AI is currently generating
   * @default false
   */
  loading?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Field description
   */
  description?: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    minWidth: 500,
    maxWidth: 700,
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const AIIconContainer = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
}));

const SuggestionBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  position: 'relative',
}));

const SuggestionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
}));

/**
 * HelpMeWriteBox component for AI-assisted text generation
 *
 * @example
 * ```tsx
 * <HelpMeWriteBox
 *   label="Financial Situation"
 *   value={financialSituation}
 *   open={showHelpBox}
 *   onClose={() => setShowHelpBox(false)}
 *   onRequestSuggestion={generateAISuggestion}
 *   onAcceptSuggestion={setFinancialSituation}
 *   loading={isGenerating}
 * />
 * ```
 */
export const HelpMeWriteBox = forwardRef<HTMLDivElement, HelpMeWriteBoxProps>(
  (
    {
      label,
      value,
      placeholder,
      open = false,
      onClose,
      onRequestSuggestion,
      onAcceptSuggestion,
      onChange,
      loading = false,
      error,
      description,
      ...props
    },
    ref,
  ) => {
    const [prompt, setPrompt] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);

    const handleRequestSuggestion = async () => {
      if (!onRequestSuggestion || !prompt.trim()) return;

      try {
        const aiSuggestion = await onRequestSuggestion(prompt);
        setSuggestion(aiSuggestion);
        setShowSuggestion(true);
      } catch (err) {
        console.error('Failed to generate suggestion:', err);
      }
    };

    const handleAcceptSuggestion = () => {
      if (onAcceptSuggestion) {
        onAcceptSuggestion(suggestion);
      }
      if (onChange) {
        onChange(suggestion);
      }
      setShowSuggestion(false);
      setSuggestion('');
      setPrompt('');
      onClose?.();
    };

    const handleDiscardSuggestion = () => {
      setShowSuggestion(false);
      setSuggestion('');
    };

    const handleEditSuggestion = () => {
      if (onChange) {
        onChange(suggestion);
      }
      setShowSuggestion(false);
    };

    return (
      <StyledDialog ref={ref} open={open} onClose={onClose} maxWidth="md" fullWidth {...props}>
        <DialogHeader>
          <AIIconContainer>
            <AIIcon />
          </AIIconContainer>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" color="textPrimary">
              AI Writing Assistant
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {label}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogHeader>

        <DialogContent sx={{ p: 3 }}>
          {description && (
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe what you need help with"
            placeholder="e.g., I am unemployed with no income. Help me describe my financial hardship."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleRequestSuggestion}
            disabled={loading || !prompt.trim()}
            startIcon={loading ? <CircularProgress size={16} /> : <AIIcon />}
            sx={{ mb: 2 }}
          >
            {loading ? 'Generating...' : 'Generate Suggestion'}
          </Button>

          {error && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mb: 2 }}>
              {error}
            </Typography>
          )}

          {showSuggestion && suggestion && (
            <SuggestionBox>
              <SuggestionHeader>
                <Chip label="AI Suggestion" color="primary" size="small" icon={<AIIcon />} />
              </SuggestionHeader>

              <TextField
                fullWidth
                multiline
                rows={6}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <ActionButtons>
                <Button variant="outlined" onClick={handleDiscardSuggestion}>
                  Discard
                </Button>
                <Button variant="outlined" onClick={handleEditSuggestion}>
                  Edit
                </Button>
                <Button variant="contained" onClick={handleAcceptSuggestion}>
                  Accept
                </Button>
              </ActionButtons>
            </SuggestionBox>
          )}
        </DialogContent>
      </StyledDialog>
    );
  },
);

HelpMeWriteBox.displayName = 'HelpMeWriteBox';
