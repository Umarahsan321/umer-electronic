import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle,
  Eye,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Order, OrderStatus } from '../../../../packages/shared/src/types/index';

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setOrders(data.data);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch orders from server:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      // local update fallback
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
      }
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const matchesSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
                          o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          o.customer.phone.includes(search);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return { bg: 'var(--success-light)', color: 'var(--success)', icon: CheckCircle };
      case 'shipped':
        return { bg: 'var(--primary-light)', color: 'var(--primary)', icon: Truck };
      case 'processing':
        return { bg: 'var(--warning-light)', color: 'var(--warning)', icon: Clock };
      case 'cancelled':
        return { bg: 'var(--danger-light)', color: 'var(--danger)', icon: XCircle };
      case 'pending':
      default:
        return { bg: 'var(--bg-elevated)', color: 'var(--text-secondary)', icon: Clock };
    }
  };

  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: 'var(--bg-surface)',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '8px 14px',
          flex: 1,
          maxWidth: '450px'
        }}>
          <Search size={16} color="var(--text-secondary)" />
          <input
            type="text"
            placeholder="Search order #, customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Order #</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Customer Info</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Items Count</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Total Value</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Payment</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Fulfillment Status</th>
                <th style={{ padding: '14px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => {
                  const badge = getStatusBadge(order.orderStatus);
                  const Icon = badge.icon;
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--primary)' }}>
                        {order.orderNumber}
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{order.customer.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.customer.phone}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.customer.city}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {order.items.reduce((s, i) => s + i.quantity, 0)} items
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ${order.total.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor: order.paymentStatus === 'paid' ? 'var(--success-light)' : 'var(--warning-light)',
                          color: order.paymentStatus === 'paid' ? 'var(--success)' : 'var(--warning)'
                        }}>
                          {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: badge.bg,
                            color: badge.color,
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            textTransform: 'uppercase'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--bg-elevated)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: 600,
                            fontSize: '0.8rem'
                          }}
                        >
                          <Eye size={15} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Order Details: {selectedOrder.orderNumber}
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Information Card */}
            <div style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Customer & Shipping
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <strong>Name:</strong> {selectedOrder.customer.fullName}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <Phone size={14} color="var(--primary)" /> {selectedOrder.customer.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <Mail size={14} color="var(--primary)" /> {selectedOrder.customer.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <MapPin size={14} color="var(--primary)" /> {selectedOrder.customer.address}, {selectedOrder.customer.city} ({selectedOrder.customer.postalCode})
              </div>
            </div>

            {/* Items Purchased */}
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
              Purchased Electronics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity} × ${item.price}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    ${(item.quantity * item.price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>${selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping:</span>
                <span style={{ fontWeight: 600 }}>${selectedOrder.shippingFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sales Tax:</span>
                <span style={{ fontWeight: 600 }}>${selectedOrder.tax}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '1.05rem',
                fontWeight: 900,
                color: 'var(--primary)'
              }}>
                <span>Total Amount:</span>
                <span>${selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700
                }}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
