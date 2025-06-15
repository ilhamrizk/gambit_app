import './App.css';
import { useState } from 'react';
import gambitLogo from './assets/gambit-logo.svg'; // Add new logo import

function App() {
  const [form, setForm] = useState({
    idNumber: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    accountType: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success'); // 'success' or 'failure'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    try {
      const response = await fetch('https://external-api.example.com/check-blacklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idNumber: form.idNumber,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          accountType: form.accountType,
        }),
      });
      const data = await response.json();
      if (data.blacklisted) {
        setPopupType('failure');
      } else {
        setPopupType('success');
        setSubmitted(true);
      }
      setShowPopup(true);
    } catch (err) {
      setPopupType('failure');
      setShowPopup(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={gambitLogo} alt="Gambit Logo" className="site-logo" />
        <h1 className="site-title">Gambit Bank Registration</h1>
        <h2>Bank Account Registration</h2>
        <form className="bank-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={form.idNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
            <option value="business">Business</option>
          </select>
          <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        {submitted && (
          <div className="confirmation">
            <h3>Registration Successful!</h3>
            <p>ID Number: {form.idNumber}</p>
            <p>Name: {form.name}</p>
            <p>Email: {form.email}</p>
            <p>Phone: {form.phone}</p>
            <p>Address: {form.address}</p>
            <p>Account Type: {form.accountType}</p>
          </div>
        )}
      </header>
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            {popupType === 'success' ? (
              <>
                <h2>Application Success!</h2>
                <p>Your bank account registration was successful.</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </>
            ) : (
              <>
                <h2>Registration Failed</h2>
                <p>Sorry, your ID number is blacklisted. Registration cannot proceed.</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
