// Forgot Password Page - GKEYS Gaming Store
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Using design tokens from design-tokens.ts
// Colors: background #121212, surface #242424, surfaceLight #2A2A2A, border #333333
const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#121212',
    surface: '#242424',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#E5E7EB',
    textMuted: '#9CA3AF',
    border: '#333333',
    error: '#FF4444',
    success: '#00C8C2',
  },
};

const Icons = {
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Loader: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" opacity="1"/></svg>,
  CheckCircle: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: theme.colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
    },
    backLink: {
      position: 'absolute',
      top: '24px',
      left: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.colors.textSecondary,
      textDecoration: 'none',
      fontSize: '14px',
    },
    card: {
      background: theme.colors.surface,
      borderRadius: '24px',
      padding: '48px 40px',
      width: '100%',
      maxWidth: '460px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
      textAlign: 'center',
    },
    logo: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '8px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '8px',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: '15px',
      color: theme.colors.textMuted,
      marginBottom: '32px',
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      textAlign: 'left',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: theme.colors.textSecondary,
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      color: theme.colors.textMuted,
      pointerEvents: 'none',
    },
    input: {
      width: '100%',
      background: theme.colors.surfaceLight,
      border: `1.5px solid ${theme.colors.border}`,
      borderRadius: '16px',
      padding: '16px 16px 16px 48px',
      color: theme.colors.text,
      fontSize: '15px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: '13px',
      textAlign: 'left',
    },
    submitBtn: {
      width: '100%',
      background: theme.colors.primary,
      color: '#000',
      border: 'none',
      padding: '16px',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
    },
    submitBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    backToLogin: {
      marginTop: '24px',
      fontSize: '15px',
      color: theme.colors.textSecondary,
    },
    loginLink: {
      color: theme.colors.primary,
      fontWeight: '600',
      textDecoration: 'none',
      marginLeft: '4px',
    },
    successIcon: {
      color: theme.colors.success,
      marginBottom: '16px',
    },
    successTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: '12px',
    },
    successText: {
      fontSize: '15px',
      color: theme.colors.textSecondary,
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    emailHighlight: {
      color: theme.colors.text,
      fontWeight: '600',
    },
  };

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          <Icons.ArrowLeft /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={styles.card}
        >
          <div style={styles.successIcon}>
            <Icons.CheckCircle />
          </div>
          <h1 style={styles.successTitle}>Check your email</h1>
          <p style={styles.successText}>
            We've sent a password reset link to<br />
            <span style={styles.emailHighlight}>{email}</span>
          </p>
          <p style={{ ...styles.successText, fontSize: '13px', color: theme.colors.textMuted }}>
            Didn't receive the email? Check your spam folder or try again with a different email address.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            style={{ ...styles.submitBtn, background: theme.colors.surfaceLight, color: theme.colors.text }}
          >
            Try different email
          </button>
          <p style={styles.backToLogin}>
            Remember your password?
            <Link to="/login" style={styles.loginLink}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backLink}>
        <Icons.ArrowLeft /> Back to Home
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={styles.card}
      >
        <div style={styles.logo}>
          <span style={{ color: theme.colors.primary }}>G</span>KEYS
        </div>
        <h1 style={styles.title}>Forgot password?</h1>
        <p style={styles.subtitle}>
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}><Icons.Mail /></span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                style={{
                  ...styles.input,
                  ...(error ? styles.inputError : {}),
                }}
                disabled={isSubmitting}
              />
            </div>
            {error && <p style={styles.errorText}>{error}</p>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              ...(isSubmitting ? styles.submitBtnDisabled : {}),
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icons.Loader /> Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <p style={styles.backToLogin}>
          Remember your password?
          <Link to="/login" style={styles.loginLink}>Sign in</Link>
        </p>
      </motion.div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

