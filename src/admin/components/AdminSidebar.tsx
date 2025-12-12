import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    error: '#FF4444',
  },
};

const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  Games: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="6" x2="18" y2="6"/><line x1="6" y1="18" x2="18" y2="18"/><polygon points="2 4 2 8 6 12 2 16 2 20 6 16 10 20 10 16 14 12 10 8 10 4 6 8 2 4"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  Blog: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Transactions: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Sync: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: Icons.Dashboard },
  { id: 'games', label: 'Games', path: '/admin/games', icon: Icons.Games },
  { id: 'users', label: 'Users', path: '/admin/users', icon: Icons.Users },
  { id: 'orders', label: 'Orders', path: '/admin/orders', icon: Icons.Orders },
  { id: 'blog', label: 'Blog Posts', path: '/admin/blog', icon: Icons.Blog },
  { id: 'transactions', label: 'Transactions', path: '/admin/transactions', icon: Icons.Transactions },
  { id: 'g2a', label: 'G2A Sync', path: '/admin/g2a', icon: Icons.Sync },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const styles = {
    sidebar: {
      width: '260px',
      height: '100vh',
      backgroundColor: theme.colors.surface,
      borderRight: `1px solid ${theme.colors.border}`,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'fixed' as const,
      left: 0,
      top: 0,
    },
    header: {
      padding: '24px',
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '20px',
      fontWeight: '700',
      color: theme.colors.text,
    },
    adminBadge: {
      backgroundColor: theme.colors.primary,
      color: '#000',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600',
    },
    nav: {
      flex: 1,
      padding: '16px 12px',
      overflowY: 'auto' as const,
    },
    navItem: (active: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      color: active ? theme.colors.text : theme.colors.textSecondary,
      backgroundColor: active ? theme.colors.surfaceLight : 'transparent',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      marginBottom: '4px',
      transition: 'all 0.2s ease',
    }),
    footer: {
      padding: '16px 12px',
      borderTop: `1px solid ${theme.colors.border}`,
    },
    backLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      color: theme.colors.textSecondary,
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={{ color: theme.colors.primary }}>G</span>KEYS
          <span style={styles.adminBadge}>ADMIN</span>
        </div>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            style={styles.navItem(isActive(item.path))}
          >
            <item.icon />
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={styles.footer}>
        <Link to="/" style={styles.backLink}>
          <Icons.Home />
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;

