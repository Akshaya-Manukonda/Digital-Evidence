import { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Transactions</h3>
            <p>{transactions.length}</p>
          </div>
          <div className="stat-card">
            <h3>Verified</h3>
            <p>{transactions.filter(t => t.verified).length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{transactions.filter(t => !t.verified).length}</p>
          </div>
        </div>

        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          {loading ? (
            <p>Loading...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx._id}>
                    <td>{tx.transactionId.substring(0, 8)}...</td>
                    <td>{tx.sender}</td>
                    <td>{tx.receiver}</td>
                    <td>${tx.amount}</td>
                    <td><span className={`status ${tx.verified ? 'verified' : 'pending'}`}>{tx.verified ? '✓ Verified' : '⏳ Pending'}</span></td>
                    <td>{new Date(tx.timestamp).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}