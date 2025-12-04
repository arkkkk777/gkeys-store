// Profile Edit Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const theme = {
  colors: {
    primary: '#00FF66',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    error: '#FF4444',
    success: '#00FF66',
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
};

const Icons = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  AlertCircle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
};

const sidebarItems = [
  { id: 'profile', label: 'Profile', path: '/profile/orders' },
  { id: 'orders', label: 'Orders', path: '/profile/orders' },
  { id: 'wishlist', label: 'Wishlist', path: '/wishlist' },
  { id: 'balance', label: 'Balance', path: '/profile/balance' },
  { id: 'edit-profile', label: 'Edit Profile', path: '/profile/edit' },
];

const responsiveCSS = `
  @media (max-width: 768px) {
    .profile-layout { flex-direction: column !important; }
    .profile-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto !important; gap: 8px !important; padding-bottom: 16px !important; }
    .sidebar-item { white-space: nowrap !important; padding: 12px 16px !important; }
    .edit-content { padding: 24px !important; }
    .form-row { flex-direction: column !important; }
  }
`;

export default function ProfileEditPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Profile form state
  const [nickname, setNickname] = useState('Newbie Guy');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI state
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || 'Newbie Guy');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const countEmptyFields = () => {
    let count = 0;
    if (!firstName) count++;
    if (!lastName) count++;
    if (nickname === 'Newbie Guy') count++;
    return count;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    setProfileSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      setProfileError('Failed to update profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      setPasswordLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const emptyFieldsCount = countEmptyFields();

  const styles = {
    main: {
      flex: 1,
      padding: '48px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
    },
    profileLayout: {
      display: 'flex',
      gap: '48px',
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      minWidth: '220px',
    },
    sidebarItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      backgroundColor: isActive ? theme.colors.surface : 'transparent',
      borderRadius: '8px',
      color: isActive ? theme.colors.text : theme.colors.textSecondary,
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
    }),
    sidebarBadge: {
      backgroundColor: theme.colors.primary,
      color: '#000',
      padding: '2px 8px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '600',
    },
    logoutButton: {
      padding: '16px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.colors.error,
      fontSize: '16px',
      textAlign: 'left',
      cursor: 'pointer',
      marginTop: '16px',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    section: {
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      padding: '32px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
    },
    formGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
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
    input: {
      width: '100%',
      padding: '14px 16px',
      backgroundColor: theme.colors.surfaceLight,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '10px',
      color: theme.colors.text,
      fontSize: '15px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    },
    inputDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    passwordToggle: {
      position: 'absolute',
      right: '14px',
      background: 'none',
      border: 'none',
      color: theme.colors.textMuted,
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButton: {
      padding: '14px 32px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      alignSelf: 'flex-start',
      transition: 'all 0.2s ease',
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    message: (type) => ({
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: type === 'success' ? 'rgba(0, 255, 102, 0.1)' : 'rgba(255, 68, 68, 0.1)',
      color: type === 'success' ? theme.colors.success : theme.colors.error,
      border: `1px solid ${type === 'success' ? theme.colors.success : theme.colors.error}`,
    }),
    hint: {
      fontSize: '13px',
      color: theme.colors.textMuted,
      marginTop: '4px',
    },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <main style={styles.main}>
        <div style={styles.profileLayout} className="profile-layout">
          {/* Sidebar */}
          <aside style={styles.sidebar} className="profile-sidebar">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                style={styles.sidebarItem(item.id === 'edit-profile')}
                className="sidebar-item"
              >
                {item.label}
                {item.id === 'edit-profile' && emptyFieldsCount > 0 && (
                  <span style={styles.sidebarBadge}>+{emptyFieldsCount}</span>
                )}
              </Link>
            ))}
            <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
          </aside>

          {/* Edit Content */}
          <div style={styles.content} className="edit-content">
            {/* Profile Information */}
            <motion.section
              style={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 style={styles.sectionTitle}>
                <Icons.User />
                Profile Information
              </h2>
              
              <form style={styles.form} onSubmit={handleProfileSubmit}>
                {profileSuccess && (
                  <div style={styles.message('success')}>
                    <Icons.Check />
                    Profile updated successfully!
                  </div>
                )}
                
                {profileError && (
                  <div style={styles.message('error')}>
                    <Icons.AlertCircle />
                    {profileError}
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>Nickname</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter your nickname"
                  />
                  <span style={styles.hint}>This will be displayed on your profile</span>
                </div>

                <div style={styles.formRow} className="form-row">
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    style={{ ...styles.input, ...styles.inputDisabled }}
                    value={email}
                    disabled
                    readOnly
                  />
                  <span style={styles.hint}>Email cannot be changed</span>
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(profileLoading ? styles.submitButtonDisabled : {}),
                  }}
                  disabled={profileLoading}
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.section>

            {/* Change Password */}
            <motion.section
              style={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 style={styles.sectionTitle}>
                <Icons.Lock />
                Change Password
              </h2>
              
              <form style={styles.form} onSubmit={handlePasswordSubmit}>
                {passwordSuccess && (
                  <div style={styles.message('success')}>
                    <Icons.Check />
                    Password changed successfully!
                  </div>
                )}
                
                {passwordError && (
                  <div style={styles.message('error')}>
                    <Icons.AlertCircle />
                    {passwordError}
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>Current Password</label>
                  <div style={styles.inputWrapper}>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      style={{ ...styles.input, paddingRight: '48px' }}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      style={styles.passwordToggle}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                    </button>
                  </div>
                </div>

                <div style={styles.formRow} className="form-row">
                  <div style={styles.formGroup}>
                    <label style={styles.label}>New Password</label>
                    <div style={styles.inputWrapper}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        style={{ ...styles.input, paddingRight: '48px' }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        style={styles.passwordToggle}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                      </button>
                    </div>
                    <span style={styles.hint}>Minimum 8 characters</span>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Confirm New Password</label>
                    <div style={styles.inputWrapper}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        style={{ ...styles.input, paddingRight: '48px' }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        style={styles.passwordToggle}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(passwordLoading || !currentPassword || !newPassword || !confirmPassword ? styles.submitButtonDisabled : {}),
                  }}
                  disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </motion.section>
          </div>
        </div>
      </main>
    </>
  );
}

