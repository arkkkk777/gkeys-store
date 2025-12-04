import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import BlogPostsPage from './pages/BlogPostsPage';
import TransactionsPage from './pages/TransactionsPage';
import G2ASyncPage from './pages/G2ASyncPage';

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="blog" element={<BlogPostsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="g2a" element={<G2ASyncPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;

