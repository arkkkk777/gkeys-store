import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';

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
  },
};

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Check if user is admin
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // For now, allow all authenticated users (in production, check user.role === 'ADMIN')
  // if (user?.role !== 'ADMIN') {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '24px',
        overflowY: 'auto',
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

