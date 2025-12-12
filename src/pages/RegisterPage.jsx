// Register Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Using design tokens from design-tokens.ts
// Colors: background #121212, surface #242424, surfaceLight #2A2A2A, border #333333
const theme = {
  colors: {
    primary: '#00C8C2',
    primaryDark: '#00CC52',
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
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Google: () => <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,
  Discord: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Loader: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" opacity="1"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nickname) {
      newErrors.nickname = 'Nickname is required';
    } else if (formData.nickname.length < 3) {
      newErrors.nickname = 'Nickname must be at least 3 characters';
    } else if (formData.nickname.length > 20) {
      newErrors.nickname = 'Nickname must be less than 20 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      await register(formData.email, formData.password, formData.nickname);
      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch (error) {
      setErrors({
        general: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // TODO: Implement social registration
    console.log(`Register with ${provider}`);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    if (strength <= 2) return { strength: 33, label: 'Weak', color: theme.colors.error };
    if (strength <= 4) return { strength: 66, label: 'Good', color: '#FFA500' };
    return { strength: 100, label: 'Strong', color: theme.colors.success };
  };

  const passwordStrength = getPasswordStrength();

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
      transition: 'color 0.2s',
    },
    card: {
      background: theme.colors.surface,
      borderRadius: '24px',
      padding: '40px',
      width: '100%',
      maxWidth: '480px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
      maxHeight: '90vh',
      overflowY: 'auto',
    },
    logo: {
      fontSize: '32px',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '8px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '8px',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: '15px',
      color: theme.colors.textMuted,
      textAlign: 'center',
      marginBottom: '28px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
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
      padding: '14px 14px 14px 48px',
      color: theme.colors.text,
      fontSize: '15px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      background: 'none',
      border: 'none',
      color: theme.colors.textMuted,
      cursor: 'pointer',
      padding: '4px',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: '13px',
    },
    generalError: {
      background: `${theme.colors.error}15`,
      border: `1px solid ${theme.colors.error}30`,
      borderRadius: '10px',
      padding: '12px 16px',
      color: theme.colors.error,
      fontSize: '14px',
    },
    successMessage: {
      background: `${theme.colors.success}15`,
      border: `1px solid ${theme.colors.success}30`,
      borderRadius: '10px',
      padding: '12px 16px',
      color: theme.colors.success,
      fontSize: '14px',
    },
    passwordStrength: {
      marginTop: '8px',
    },
    strengthBar: {
      height: '4px',
      background: theme.colors.surfaceLight,
      borderRadius: '2px',
      overflow: 'hidden',
    },
    strengthFill: {
      height: '100%',
      transition: 'width 0.3s, background 0.3s',
    },
    strengthLabel: {
      fontSize: '12px',
      marginTop: '4px',
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    checkbox: {
      width: '18px',
      height: '18px',
      marginTop: '2px',
      accentColor: theme.colors.primary,
      cursor: 'pointer',
      flexShrink: 0,
    },
    checkboxLabel: {
      fontSize: '13px',
      color: theme.colors.textSecondary,
      lineHeight: '1.5',
    },
    link: {
      color: theme.colors.primary,
      textDecoration: 'none',
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
      transition: 'background 0.2s, transform 0.1s, box-shadow 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '8px',
    },
    submitBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      margin: '20px 0',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: theme.colors.border,
    },
    dividerText: {
      color: theme.colors.textMuted,
      fontSize: '13px',
    },
    socialBtns: {
      display: 'flex',
      gap: '12px',
    },
    socialBtn: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      background: theme.colors.surfaceLight,
      border: `2px solid ${theme.colors.border}`,
      borderRadius: '12px',
      padding: '14px',
      color: theme.colors.text,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'border-color 0.2s, background 0.2s',
    },
    switchMode: {
      textAlign: 'center',
      marginTop: '24px',
      fontSize: '15px',
      color: theme.colors.textSecondary,
    },
    switchLink: {
      color: theme.colors.primary,
      fontWeight: '600',
      textDecoration: 'none',
      marginLeft: '4px',
    },
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={{ color: theme.colors.text }}>Loading...</div>
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
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Join GKEYS and start gaming today</p>

        {errors.general && (
          <div style={styles.generalError}>{errors.general}</div>
        )}
        
        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nickname</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}><Icons.User /></span>
              <input
                type="text"
                name="nickname"
                placeholder="Choose a nickname"
                value={formData.nickname}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.nickname ? styles.inputError : {}),
                }}
                disabled={isSubmitting}
              />
            </div>
            {errors.nickname && <p style={styles.errorText}>{errors.nickname}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}><Icons.Mail /></span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}><Icons.Lock /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  paddingRight: '48px',
                  ...(errors.password ? styles.inputError : {}),
                }}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
            {formData.password && (
              <div style={styles.passwordStrength}>
                <div style={styles.strengthBar}>
                  <div
                    style={{
                      ...styles.strengthFill,
                      width: `${passwordStrength.strength}%`,
                      background: passwordStrength.color,
                    }}
                  />
                </div>
                <p style={{ ...styles.strengthLabel, color: passwordStrength.color }}>
                  {passwordStrength.label}
                </p>
              </div>
            )}
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}><Icons.Lock /></span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.confirmPassword ? styles.inputError : {}),
                }}
                disabled={isSubmitting}
              />
            </div>
            {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <label htmlFor="agreeTerms" style={styles.checkboxLabel}>
              I agree to the <Link to="/terms" style={styles.link}>Terms of Service</Link> and <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
            </label>
          </div>
          {errors.agreeTerms && <p style={styles.errorText}>{errors.agreeTerms}</p>}

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="agreeMarketing"
              name="agreeMarketing"
              checked={formData.agreeMarketing}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <label htmlFor="agreeMarketing" style={styles.checkboxLabel}>
              Send me news, promotions and special offers
            </label>
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
                <Icons.Loader /> Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine} />
        </div>

        <div style={styles.socialBtns}>
          <button
            style={styles.socialBtn}
            onClick={() => handleSocialRegister('google')}
          >
            <Icons.Google /> Google
          </button>
          <button
            style={styles.socialBtn}
            onClick={() => handleSocialRegister('discord')}
          >
            <Icons.Discord /> Discord
          </button>
        </div>

        <p style={styles.switchMode}>
          Already have an account?
          <Link to="/login" style={styles.switchLink}>Sign in</Link>
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

