import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiShoppingCart, 
  FiDollarSign, 
  FiPackage,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import type { DashboardStats } from '../services/adminApi';
;

const theme = {
  colors: {
    primary: '#10B981',
    primaryDark: '#059669',
    background: '#0a0a0a',
    surface: '#141414',
    surfaceLight: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#2a2a2a',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}> = ({ title, value, icon, change, changeType = 'neutral', color = theme.colors.primary }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${theme.colors.border}`,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ color: theme.colors.textSecondary, fontSize: '14px', marginBottom: '8px' }}>
          {title}
        </p>
        <p style={{ color: theme.colors.text, fontSize: '32px', fontWeight: '700' }}>
          {value}
        </p>
        {change && (
          <p style={{ 
            color: changeType === 'positive' ? theme.colors.success : 
                   changeType === 'negative' ? theme.colors.error : 
                   theme.colors.textSecondary,
            fontSize: '13px',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {changeType === 'positive' && <FiTrendingUp size={14} />}
            {change}
          </p>
        )}
      </div>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
      }}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
      return theme.colors.success;
    case 'PENDING':
      return theme.colors.warning;
    case 'CANCELLED':
    case 'FAILED':
      return theme.colors.error;
    default:
      return theme.colors.info;
  }
};

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getDashboard();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: theme.colors.textSecondary,
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${theme.colors.border}`,
            borderTopColor: theme.colors.primary,
            borderRadius: '50%',
          }}
        />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        color: theme.colors.error,
      }}>
        <FiAlertCircle size={48} style={{ marginBottom: '16px' }} />
        <p>{error || 'No data available'}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: theme.colors.text,
          marginBottom: '8px',
        }}>
          Dashboard
        </h1>
        <p style={{ color: theme.colors.textSecondary }}>
          Overview of your store performance
        </p>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<FiUsers size={24} />}
          change={`+${stats.newUsersToday} today`}
          changeType={stats.newUsersToday > 0 ? 'positive' : 'neutral'}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<FiShoppingCart size={24} />}
          change={`${stats.pendingOrders} pending`}
          changeType="neutral"
          color={theme.colors.info}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<FiDollarSign size={24} />}
          change={`+${formatCurrency(stats.revenueToday)} today`}
          changeType="positive"
          color={theme.colors.success}
        />
        <StatCard
          title="Total Games"
          value={stats.totalGames.toLocaleString()}
          icon={<FiPackage size={24} />}
          color={theme.colors.warning}
        />
      </div>

      {/* Revenue Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '4px' }}>
            Today's Revenue
          </p>
          <p style={{ color: theme.colors.success, fontSize: '24px', fontWeight: '600' }}>
            {formatCurrency(stats.revenueToday)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '4px' }}>
            This Week
          </p>
          <p style={{ color: theme.colors.info, fontSize: '24px', fontWeight: '600' }}>
            {formatCurrency(stats.revenueThisWeek)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '4px' }}>
            This Month
          </p>
          <p style={{ color: theme.colors.warning, fontSize: '24px', fontWeight: '600' }}>
            {formatCurrency(stats.revenueThisMonth)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '4px' }}>
            Transactions Today
          </p>
          <p style={{ color: theme.colors.text, fontSize: '24px', fontWeight: '600' }}>
            {stats.transactionsToday}
          </p>
        </motion.div>
      </div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${theme.colors.border}`,
          marginBottom: '32px',
        }}
      >
        <h3 style={{ color: theme.colors.text, fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Sales Last 7 Days
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px' }}>
          {stats.salesByDay.map((day, index) => {
            const maxRevenue = Math.max(...stats.salesByDay.map(d => d.revenue), 1);
            const height = Math.max((day.revenue / maxRevenue) * 140, 8);
            return (
              <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  style={{
                    width: '100%',
                    maxWidth: '60px',
                    backgroundColor: theme.colors.primary,
                    borderRadius: '8px 8px 0 0',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '11px',
                    color: theme.colors.textSecondary,
                    whiteSpace: 'nowrap',
                  }}>
                    {day.count} orders
                  </div>
                </motion.div>
                <p style={{ 
                  color: theme.colors.textSecondary, 
                  fontSize: '12px', 
                  marginTop: '8px',
                  textAlign: 'center',
                }}>
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
      }}>
        {/* Top Selling Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <h3 style={{ color: theme.colors.text, fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            Top Selling Games
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.topSellingGames.length > 0 ? (
              stats.topSellingGames.map((game, index) => (
                <div 
                  key={game.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: theme.colors.surfaceLight,
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.background,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {index + 1}
                    </span>
                    <div>
                      <p style={{ color: theme.colors.text, fontSize: '14px', fontWeight: '500' }}>
                        {game.title}
                      </p>
                      <p style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                        {game.salesCount} sales
                      </p>
                    </div>
                  </div>
                  <p style={{ color: theme.colors.success, fontWeight: '600' }}>
                    {formatCurrency(game.revenue)}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: '20px' }}>
                No sales data yet
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <h3 style={{ color: theme.colors.text, fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            Recent Orders
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.slice(0, 5).map((order) => (
                <div 
                  key={order.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: theme.colors.surfaceLight,
                    borderRadius: '8px',
                  }}
                >
                  <div>
                    <p style={{ color: theme.colors.text, fontSize: '14px' }}>
                      {order.userEmail}
                    </p>
                    <p style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: theme.colors.text, fontWeight: '600' }}>
                      {formatCurrency(order.total)}
                    </p>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: '20px' }}>
                No orders yet
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${theme.colors.border}`,
            gridColumn: 'span 2',
          }}
        >
          <h3 style={{ color: theme.colors.text, fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
            Recent Transactions
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '12px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '500',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}>
                    User
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '12px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '500',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}>
                    Type
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '12px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '500',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}>
                    Amount
                  </th>
                  <th style={{ 
                    textAlign: 'center', 
                    padding: '12px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '500',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '12px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '500',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTransactions.length > 0 ? (
                  stats.recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td style={{ padding: '12px', color: theme.colors.text }}>
                        {tx.userEmail}
                      </td>
                      <td style={{ padding: '12px', color: theme.colors.textSecondary }}>
                        {tx.type}
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        textAlign: 'right',
                        color: tx.type === 'TOP_UP' ? theme.colors.success : theme.colors.text,
                        fontWeight: '600',
                      }}>
                        {tx.type === 'TOP_UP' ? '+' : ''}{formatCurrency(tx.amount)}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '12px',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          backgroundColor: `${getStatusColor(tx.status)}20`,
                          color: getStatusColor(tx.status),
                        }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '12px', 
                        textAlign: 'right',
                        color: theme.colors.textSecondary,
                        fontSize: '13px',
                      }}>
                        {formatDate(tx.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ 
                      textAlign: 'center', 
                      padding: '40px',
                      color: theme.colors.textSecondary,
                    }}>
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
