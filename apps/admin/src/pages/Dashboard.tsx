import React, { useEffect, useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { DashboardStats } from '../../../../packages/shared/src/types/index';

interface DashboardProps {
  onNavigate: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch server stats, displaying defaults:', err);
        // default fallback stats
        setStats({
          totalRevenue: 4731,
          totalOrders: 3,
          totalProducts: 24,
          lowStockCount: 4,
          recentOrders: [],
          categoryBreakdown: [],
          orderStatusCounts: []
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const kpis = [
    {
      title: 'Gross Revenue',
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '$0',
      icon: DollarSign,
      color: 'var(--primary)',
      subtext: '+18.4% from last month',
      badgeColor: 'var(--primary-light)'
    },
    {
      title: 'Customer Orders',
      value: stats ? stats.totalOrders.toString() : '0',
      icon: ShoppingBag,
      color: 'var(--success)',
      subtext: '100% fulfillment rate',
      badgeColor: 'var(--success-light)'
    },
    {
      title: 'Catalog Items',
      value: stats ? stats.totalProducts.toString() : '0',
      icon: Package,
      color: '#8B5CF6',
      subtext: 'Across 8 electronics categories',
      badgeColor: 'var(--bg-elevated)'
    },
    {
      title: 'Low Stock Alerts',
      value: stats ? stats.lowStockCount.toString() : '0',
      icon: AlertTriangle,
      color: 'var(--warning)',
      subtext: 'Requires restock soon',
      badgeColor: 'var(--warning-light)'
    }
  ];

  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {kpi.title}
                </p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  {kpi.value}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {kpi.subtext}
                </span>
              </div>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: kpi.badgeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={22} color={kpi.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Orders & Quick Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Orders Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Recent Customer Orders
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Live orders received through storefront
              </p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Order #</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Customer</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                        {order.orderNumber}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{order.customer.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.customer.city}</div>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${order.total.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor: order.orderStatus === 'delivered' ? 'var(--success-light)' :
                                           order.orderStatus === 'shipped' ? 'var(--primary-light)' : 'var(--warning-light)',
                          color: order.orderStatus === 'delivered' ? 'var(--success)' :
                                 order.orderStatus === 'shipped' ? 'var(--primary)' : 'var(--warning)'
                        }}>
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No orders yet recorded. Place an order on the user storefront to see it here live!
            </div>
          )}
        </div>

        {/* Quick Operations & Store Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Quick Management
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onNavigate('products')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <span>Add / Manage Products</span>
                <Package size={16} />
              </button>

              <button
                onClick={() => onNavigate('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <span>Fulfill Customer Orders</span>
                <ShoppingBag size={16} />
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Umer Electronics Core
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Monorepo architecture with live synchronized Express backend and responsive solid-color design.
            </p>
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div><strong>Port 5000:</strong> Express REST Server</div>
              <div><strong>Port 3000:</strong> Next.js User Storefront</div>
              <div><strong>Port 3001:</strong> Admin Portal</div>
              <div><strong>Theme:</strong> Solid Colors (Zero Gradients)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
