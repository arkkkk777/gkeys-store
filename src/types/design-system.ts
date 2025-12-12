/**
 * Design System TypeScript Types
 * 
 * Type definitions for design system components and tokens.
 * Re-exports component interfaces from contracts.
 */

import React from 'react';

// ============ RE-EXPORT DESIGN TOKENS ============

export type { DesignTokens } from '../styles/design-tokens';

// ============ BUTTON ============

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Make button full width */
  fullWidth?: boolean;
  /** Disable button interaction */
  disabled?: boolean;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];

// ============ INPUT ============

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Icon to display before input */
  icon?: React.ReactNode;
  /** Error message or error state */
  error?: string | boolean;
  /** Make input full width */
  fullWidth?: boolean;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

// ============ TEXTAREA ============

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Placeholder text */
  placeholder?: string;
  /** Textarea value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Error message or error state */
  error?: string | boolean;
  /** Make textarea full width */
  fullWidth?: boolean;
  /** Number of rows */
  rows?: number;
  /** Additional CSS classes */
  className?: string;
}

// ============ SELECT ============

export interface SelectOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Disable this option */
  disabled?: boolean;
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disable select */
  disabled?: boolean;
  /** Control open state */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
}

// ============ SWITCH ============

export interface SwitchProps {
  /** Checked state */
  checked?: boolean;
  /** Checked state change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable switch */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// ============ CHECKBOX ============

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Checked state change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable checkbox */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

// ============ CONTAINER ============

export interface ContainerProps {
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Spacing between children */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background variant */
  background?: 'default' | 'surface' | 'surfaceLight' | 'transparent';
  /** Container content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ============ LINK ============

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link URL */
  href: string;
  /** Link content */
  children: React.ReactNode;
  /** Link variant */
  variant?: 'default' | 'primary' | 'muted';
  /** Icon to display */
  icon?: React.ReactNode;
  /** External link (opens in new tab) */
  external?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============ OVERLAY ============

export interface OverlayProps {
  /** Visibility state */
  visible: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Enable backdrop blur */
  blur?: boolean;
  /** Overlay content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ============ LABEL ============

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label content */
  children: React.ReactNode;
  /** Mark as required */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============ EMPTY STATE ============

export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Message text */
  message?: string;
  /** Action button/component */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ============ FEEDBACK ============

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

export interface FeedbackProps {
  /** Feedback type */
  type: FeedbackType;
  /** Message text */
  message: string;
  /** Allow dismissal */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}
