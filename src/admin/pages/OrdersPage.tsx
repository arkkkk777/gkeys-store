import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX,
  FiPackage,
  FiCheck,
  FiClock,
  FiXCircle
} from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import type { OrderItem } from '../services/adminApi';

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
    case 'REFUNDED':
      return theme.colors.error;
    default:
      return theme.colors.textSecondary;
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case 'COMPLETED':
      return <FiCheck size={14} />;
    case 'PENDING':
      return <FiClock size={14} />;
    case 'PROCESSING':
      return <FiPackage size={14} />;
    case 'CANCELLED':
    case 'REFUNDED':
      return <FiXCircle size={14} />;
    default:
      return null;
  }
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await adminApi.getOrders(page, 20, statusFilter || undefined);
      setOrders(result.orders);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      await adminApi.updateOrderStatus(orderId, newStatus);
      fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Calculate stats
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const completedCount = orders.filter(o => o.status === 'COMPLETED').length;
  const totalRevenue = orders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.total, 0);

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
            Orders
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            {total} orders total
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '8px' }}>
            Pending
          </p>
          <p style={{ color: theme.colors.warning, fontSize: '24px', fontWeight: '600' }}>
            {pendingCount}
          </p>
        </div>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '8px' }}>
            Completed
          </p>
          <p style={{ color: theme.colors.success, fontSize: '24px', fontWeight: '600' }}>
            {completedCount}
          </p>
        </div>
        <div style={{
          backgroundColor: theme.colors.surface,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${theme.colors.border}`,
        }}>
          <p style={{ color: theme.colors.textSecondary, fontSize: '13px', marginBottom: '8px' }}>
            Page Revenue
          </p>
          <p style={{ color: theme.colors.success, fontSize: '24px', fontWeight: '600' }}>
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ ...inputStyle, maxWidth: '200px' }}
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>
        {statusFilter && (
          <button
            onClick={() => { setStatusFilter(''); setPage(1); }}
            style={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '8px 16px',
            }}
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Orders Table */}
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
                    Order ID
                  </th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Customer
                  </th>
                  <th style={{ 
                    textAlign: 'center', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Items
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Total
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
                    Date
                  </th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '16px', 
                    color: theme.colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr 
                    key={order.id}
                    style={{ borderTop: `1px solid ${theme.colors.border}` }}
                  >
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        color: theme.colors.text, 
                        fontFamily: 'monospace',
                        fontSize: '13px',
                      }}>
                        #{order.id.slice(0, 8)}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <p style={{ color: theme.colors.text, fontWeight: '500' }}>
                          {order.userNickname}
                        </p>
                        <p style={{ color: theme.colors.textSecondary, fontSize: '12px' }}>
                          {order.userEmail}
                        </p>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      textAlign: 'center',
                      color: theme.colors.text,
                    }}>
                      {order.itemsCount}
                    </td>
                    <td style={{ 
                      padding: '16px', 
                      textAlign: 'right',
                      fontWeight: '600',
                      color: theme.colors.success,
                    }}>
                      {formatCurrency(order.total)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '16px',
                      color: theme.colors.textSecondary,
                      fontSize: '13px',
                    }}>
                      {formatDate(order.createdAt)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          padding: '8px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: theme.colors.surfaceLight,
                          color: theme.colors.text,
                          cursor: 'pointer',
                        }}
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ 
                      textAlign: 'center', 
                      padding: '60px',
                      color: theme.colors.textSecondary,
                    }}>
                      No orders found
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

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: '16px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
            >
              <div style={{
                padding: '24px',
                borderBottom: `1px solid ${theme.colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <h2 style={{ color: theme.colors.text, fontSize: '20px', fontWeight: '600' }}>
                    Order #{selectedOrder.id.slice(0, 8)}
                  </h2>
                  <p style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: theme.colors.textSecondary,
                    cursor: 'pointer',
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Customer Info */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ 
                    color: theme.colors.textSecondary, 
                    fontSize: '12px', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    Customer
                  </h4>
                  <div style={{
                    backgroundColor: theme.colors.surfaceLight,
                    borderRadius: '12px',
                    padding: '16px',
                  }}>
                    <p style={{ color: theme.colors.text, fontWeight: '500' }}>
                      {selectedOrder.userNickname}
                    </p>
                    <p style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
                      {selectedOrder.userEmail}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ 
                    color: theme.colors.textSecondary, 
                    fontSize: '12px', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    Status
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                        disabled={updatingStatus || selectedOrder.status === status}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: `1px solid ${selectedOrder.status === status ? getStatusColor(status) : theme.colors.border}`,
                          backgroundColor: selectedOrder.status === status ? `${getStatusColor(status)}20` : 'transparent',
                          color: selectedOrder.status === status ? getStatusColor(status) : theme.colors.text,
                          cursor: selectedOrder.status === status ? 'default' : 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          opacity: updatingStatus ? 0.5 : 1,
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ 
                    color: theme.colors.textSecondary, 
                    fontSize: '12px', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    Items ({selectedOrder.itemsCount})
                  </h4>
                  <div style={{
                    backgroundColor: theme.colors.surfaceLight,
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}>
                    {selectedOrder.items.map((item, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px',
                          borderTop: index > 0 ? `1px solid ${theme.colors.border}` : 'none',
                        }}
                      >
                        <div>
                          <p style={{ color: theme.colors.text, fontWeight: '500' }}>
                            {item.gameTitle}
                          </p>
                          {item.key && (
                            <p style={{ 
                              color: theme.colors.textSecondary, 
                              fontSize: '12px',
                              fontFamily: 'monospace',
                              marginTop: '4px',
                            }}>
                              Key: {item.key}
                            </p>
                          )}
                        </div>
                        <p style={{ color: theme.colors.success, fontWeight: '600' }}>
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: theme.colors.surfaceLight,
                  borderRadius: '12px',
                }}>
                  <span style={{ color: theme.colors.text, fontWeight: '600', fontSize: '16px' }}>
                    Total
                  </span>
                  <span style={{ color: theme.colors.success, fontWeight: '700', fontSize: '20px' }}>
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;
