import "./index.css";
import { useProductsListingLogic } from './logic';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import Navbar from "../../components/Shared/Adminnavbar";

const ProductsListing = () => {
  const navigate = useNavigate();
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

  const {
    orders,
    analytics,
    isLoading,
    error,
    successMessage,
    handleStatusChange,
    refreshData,
  } = useProductsListingLogic();

  // Initialize Pie Chart
  useEffect(() => {
    if (pieChartRef.current && analytics) {
      // Destroy existing chart
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const ctx = pieChartRef.current.getContext('2d');
      pieChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [25, 75], // 25% filled, 75% empty
            backgroundColor: ['#17a2b8', '#e9ecef'],
            borderWidth: 0,
            cutout: '70%',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            }
          }
        }
      });
    }

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [analytics]);

  // Initialize Line Chart
  useEffect(() => {
    if (lineChartRef.current && analytics) {
      // Destroy existing chart
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const ctx = lineChartRef.current.getContext('2d');
      lineChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['0', '1', '2', '3', '4', '5'],
          datasets: [{
            data: [120, 80, 140, 200, 180, 60],
            borderColor: '#17a2b8',
            backgroundColor: 'rgba(23, 162, 184, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                color: '#666',
              }
            },
            y: {
              display: true,
              grid: {
                color: 'rgba(0,0,0,0.1)',
              },
              ticks: {
                color: '#666',
                stepSize: 50,
                max: 250,
                min: 0,
              }
            }
          }
        }
      });
    }

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, [analytics]);

  return (
    <div>

        <Navbar/>

      {/* Main Content */}
      <main className="pl-main-content">
        {error && (
          <div className="pl-error">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="pl-success">
            {successMessage}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="pl-dashboard-grid">
          {/* Revenue Card */}
          <div className="pl-revenue-card">
            <div className="pl-revenue-header">
              <div className="pl-revenue-info">
                <div className="pl-revenue-title">Total Revenue:</div>
                <div className="pl-revenue-amount">
                  {analytics?.totalRevenue ? `${analytics.totalRevenue.toLocaleString()}$` : '100,568$'}
                </div>
              </div>
              <div className="pl-chart-container">
                <canvas ref={pieChartRef}></canvas>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#17a2b8'
                }}>
                  25%
                </div>
              </div>
            </div>
          </div>

          {/* Orders Chart Card */}
          <div className="pl-orders-card">
            <div className="pl-orders-header">
              <div className="pl-orders-title">Orders</div>
              <div className="pl-orders-period">Per Hour</div>
            </div>
            <div className="pl-orders-chart">
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="pl-orders-table-container">
          {isLoading ? (
            <div className="pl-loading">Loading orders...</div>
          ) : orders && orders.length > 0 ? (
            <table className="pl-orders-table">
              <thead className="pl-table-header">
                <tr>
                  <th>Order Id</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="pl-table-row">
                    <td className="pl-order-id">{order.id}</td>
                    <td>{order.user || order.userName || 'John Doe'}</td>
                    <td>{order.total ? `${order.total}$` : '100$'}</td>
                    <td>
                      <select
                        className="pl-status-dropdown"
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="pl-empty-state">
              <h3>No orders found</h3>
              <p>Orders will appear here once customers start placing them.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsListing;