import { useState } from 'react';
import './TransactionForm.css';

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: '',
    sender: '',
    receiver: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage('Transaction created successfully!');
        setFormData({ amount: '', sender: '', receiver: '', description: '' });
      }
    } catch (error) {
      setMessage('Error creating transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form-container">
      <h2>Create New Transaction</h2>
      {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={formData.sender}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="receiver"
          placeholder="Receiver Name"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Transaction'}
        </button>
      </form>
    </div>
  );
}