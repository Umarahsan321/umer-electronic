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
  MapPin,
  Trash2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Order, OrderStatus } from '../../../../packages/shared/src/types/index';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cancellation / Deletion Modal State
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

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
    if (newStatus === 'cancelled') {
      const ord = orders.find(o => o.id === orderId);
      if (ord) {
        setOrderToCancel(ord);
        return;
      }
    }

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
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
      }
    }
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;
    setIsCancelling(true);
    try {
      await fetch(`http://localhost:5000/api/orders/${orderToCancel.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
    } catch (err) {
      console.warn('Failed to update status on server:', err);
    }
    setOrders(prev => prev.map(o => o.id === orderToCancel.id ? { ...o, orderStatus: 'cancelled' } : o));
    if (selectedOrder && selectedOrder.id === orderToCancel.id) {
      setSelectedOrder(prev => prev ? { ...prev, orderStatus: 'cancelled' } : null);
    }
    setIsCancelling(false);
    setOrderToCancel(null);
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
    <div style={{ padding: '16px 16px 32px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShoppingBag size={22} color="var(--primary)" />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Orders ({filteredOrders.length})
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Track customer purchases, fulfillment status, and receipts
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', flex: 1, minWidth: '220px', justifyContent: 'flex-end' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px 14px',
            flex: 1,
            maxWidth: '320px'
          }}>
            <Search size={16} color="var(--text-secondary)" />
            <input
              type="text"
              placeholder="Search by order #, customer, phone..."
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
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table (Desktop View >= 769px) */}
      <div className="admin-desktop-table" style={{
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
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
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
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye size={15} />
                            <span>View</span>
                          </button>
                          {order.orderStatus !== 'cancelled' && (
                            <button
                              onClick={() => setOrderToCancel(order)}
                              title="Cancel Order"
                              style={{
                                padding: '6px 10px',
                                backgroundColor: 'var(--danger-light)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                color: 'var(--danger)',
                                cursor: 'pointer'
                              }}
                            >
                              <XCircle size={15} />
                            </button>
                          )}
                        </div>
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

      {/* Orders Mobile Card Stack (< 768px) */}
      <div className="admin-mobile-cards">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const badge = getStatusBadge(order.orderStatus);
            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {order.orderNumber}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    backgroundColor: badge.bg,
                    color: badge.color
                  }}>
                    {order.orderStatus}
                  </span>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{order.customer.fullName}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{order.customer.phone} • {order.customer.city}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {order.items.reduce((s, i) => s + i.quantity, 0)} items ({order.paymentMethod.toUpperCase()})
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      ${order.total.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={15} />
                      <span>Receipt</span>
                    </button>
                    {order.orderStatus !== 'cancelled' && (
                      <button
                        onClick={() => setOrderToCancel(order)}
                        title="Cancel Order"
                        style={{
                          padding: '8px 10px',
                          backgroundColor: 'var(--danger-light)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          color: 'var(--danger)',
                          cursor: 'pointer'
                        }}
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            No orders found.
          </div>
        )}
      </div>

      {/* Order Detail / Receipt Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          padding: '16px'
        }}
        onClick={() => setSelectedOrder(null)}
        >
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Order #{selectedOrder.orderNumber}
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Information Card */}
            <div style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Customer & Shipping
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Payment: {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                <strong>Recipient:</strong> {selectedOrder.customer.fullName}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem' }}>
                <a
                  href={`tel:${selectedOrder.customer.phone}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  <Phone size={14} /> {selectedOrder.customer.phone}
                </a>
                <a
                  href={`https://wa.me/${selectedOrder.customer.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a', textDecoration: 'none', fontWeight: 600 }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
                <a
                  href={`mailto:${selectedOrder.customer.email}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  <Mail size={14} /> {selectedOrder.customer.email}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{selectedOrder.customer.address}, {selectedOrder.customer.city} ({selectedOrder.customer.postalCode})</span>
              </div>
            </div>

            {/* Items Purchased */}
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Purchased Electronics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'contain', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '2px' }}
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

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
              <div>
                {selectedOrder.orderStatus !== 'cancelled' && (
                  <button
                    onClick={() => {
                      setOrderToCancel(selectedOrder);
                    }}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'var(--danger-light)',
                      color: 'var(--danger)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: '9px 20px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(orderToCancel)}
        title="Cancel Customer Order"
        message={`Are you sure you want to cancel order #${orderToCancel?.orderNumber} placed by ${orderToCancel?.customer.fullName}? The order status will be changed to Cancelled.`}
        itemDetails={
          orderToCancel
            ? {
                name: `Order #${orderToCancel.orderNumber}`,
                type: `${orderToCancel.items.length} electronic products`,
                sku: orderToCancel.customer.fullName,
                price: orderToCancel.total
              }
            : undefined
        }
        confirmButtonText="Confirm Cancellation"
        isLoading={isCancelling}
        onConfirm={confirmCancelOrder}
        onClose={() => setOrderToCancel(null)}
      />
    </div>
  );
};
