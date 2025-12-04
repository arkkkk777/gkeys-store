import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiDollarSign,
  FiArrowUpRight,
  FiArrowDownRight
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import type { TransactionResult } from '../services/adminApi';

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

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: theme.colors.surfaceLight,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: '8px',
  color: theme.colors.text,
  fontSize: '14px',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s',
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
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
    case 'PROCESSING':
      return theme.colors.info;
    case 'CANCELLED':
    case 'FAILED':
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
};

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionResult['transactions']>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const result = await adminApi.getTransactions({
        method: method || undefined,
        status: status || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        transactionHash: transactionHash || undefined,
        page,
        pageSize: 20,
      });
      setTransactions(result.transactions);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, method, status, startDate, endDate, transactionHash]);

  const clearFilters = () => {
    setMethod('');
    setStatus('');
    setStartDate('');
    setEndDate('');
    setTransactionHash('');
    setPage(1);
  };

  const hasActiveFilters = method || status || startDate || endDate || transactionHash;

  // Calculate totals
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const completedCount = transactions.filter(t => t.status === 'COMPLETED').length;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: theme.colors.text,
            marginBottom: '8px',
          }}>
            Transactions
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            {total} transactions total
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            ...buttonStyle,
            backgroundColor: showFilters ? theme.colors.primary : theme.colors.surface,
            color: showFilters ? theme.colors.background : theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <FiFilter size={18} />
          Filters
          {hasActiveFilters && (
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme.colors.primary,
            }} />
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${theme.colors.border}`,
            marginBottom: '24px',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: theme.colors.textSecondary, 
                fontSize: '13px',
                marginBottom: '8px',
              }}>
                Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => { setMethod(e.target.value); setPage(1); }}
                style={inputStyle}
              >
                <option value="">All Methods</option>
                <option value="STRIPE">Stripe</option>
                <option value="PAYPAL">PayPal</option>
                <option value="MOLLIE">Mollie</option>
                <option value="TERMINAL">Terminal</option>
                <option value="BALANCE">Balance</option>
              </select>
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                color: theme.colors.textSecondary, 
                fontSize: '13px',
                marginBottom: '8px',
              }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                style={inputStyle}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                color: theme.colors.textSecondary, 
                fontSize: '13px',
                marginBottom: '8px',
              }}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                color: theme.colors.textSecondary, 
                fontSize: '13px',
                marginBottom: '8px',
              }}>
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                color: theme.colors.textSecondary, 
                fontSize: '13px',
                marginBottom: '8px',
              }}>
                Transaction Hash
              </label>
              <input
                type="text"
                placeholder="Search by hash..."
                value={transactionHash}
                onChange={(e) => { setTransactionHash(e.target.value); setPage(1); }}
                style={inputStyle}
              />
            </div>
          </div>
          {hasActiveFilters && (
            <div style={{ marginTop: '16px' }}>
              <button
                onClick={clearFilters}
                style={{
                  ...buttonStyle,
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.colors.border}`,
                  color: theme.colors.text,
                  padding: '8px 16px',
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FiDollarSign color={theme.colors.success} />
            <span style={{ color: theme.colors.textSecondary, fontSize: '13px' }}>
              Page Total
            </span>
          </div>
          <p style={{ color: theme.colors.success, fontSize: '24px', fontWeight: '600' }}>
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FiArrowUpRight color={theme.colors.info} />
            <span style={{ color: theme.colors.textSecondary, fontSize: '13px' }}>
              Completed
            </span>
          </div>
          <p style={{ color: theme.colors.text, fontSize: '24px', fontWeight: '600' }}>
            {completedCount}
          </p>
        </div>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FiCalendar color={theme.colors.warning} />
            <span style={{ color: theme.colors.textSecondary, fontSize: '13px' }}>
              On This Page
            </span>
          </div>
          <p style={{ color: theme.colors.text, fontSize: '24px', fontWeight: '600' }}>
            {transactions.length}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '16px',
          border: `1px solid ${theme.colors.border}`,
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '60px',
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
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: theme.colors.surfaceLight }}>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    User
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Type
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Amount
                  </th>
                  <th style={{ 
                    textAlign: 'center', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Method
                  </th>
                  <th style={{ 
                    textAlign: 'center', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Hash
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr 
                    key={tx.id}
                    style={{ borderTop: `1px solid ${theme.colors.border}` }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ color: theme.colors.text, fontWeight: '500' }}>
                          {tx.user.nickname}
                        </p>
                        <p style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                          {tx.user.email}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {tx.type === 'TOP_UP' ? (
                          <FiArrowUpRight color={theme.colors.success} size={16} />
                        ) : (
                          <FiArrowDownRight color={theme.colors.warning} size={16} />
                        )}
                        <span style={{ color: theme.colors.text }}>{tx.type}</span>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      textAlign: 'right',
                      fontWeight: '600',
                      color: tx.type === 'TOP_UP' ? theme.colors.success : theme.colors.text,
                    }}>
                      {tx.type === 'TOP_UP' ? '+' : ''}{formatCurrency(tx.amount)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {tx.method ? (
                        <span style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          backgroundColor: `${theme.colors.info}20`,
                          color: theme.colors.info,
                        }}>
                          {tx.method}
                        </span>
                      ) : (
                        <span style={{ color: theme.colors.textSecondary }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: `${getStatusColor(tx.status)}20`,
                        color: getStatusColor(tx.status),
                      }}>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '16px',
                      color: theme.colors.textSecondary,
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}>
                      {tx.transactionHash ? (
                        <span title={tx.transactionHash}>
                          {tx.transactionHash.slice(0, 12)}...
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ 
                      padding: '16px',
                      textAlign: 'right',
                      color: theme.colors.textSecondary,
                      fontSize: '13px',
                    }}>
                      {formatDate(tx.createdAt)}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ 
                      textAlign: 'center', 
                      padding: '60px',
                      color: theme.colors.textSecondary,
                    }}>
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderTop: `1px solid ${theme.colors.border}`,
          }}>
            <p style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
              Page {page} of {totalPages}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.colors.border}`,
                  backgroundColor: 'transparent',
                  color: page === 1 ? theme.colors.textSecondary : theme.colors.text,
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <FiChevronLeft size={16} />
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.colors.border}`,
                  backgroundColor: 'transparent',
                  color: page === totalPages ? theme.colors.textSecondary : theme.colors.text,
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TransactionsPage;
