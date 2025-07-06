import './App.css';
import { useState } from 'react';
import gambitLogo from './assets/gambit-logo.svg'; // Adjust the path as necessary

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
  const [popupType, setPopupType] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!form.idNumber) {
        console.error("ID Number is missing!");
        setPopupType('failure');
        setShowPopup(true);
        return;
      }
      
      const url = `https://gambit-api-ilham-rizkys-projects.vercel.app/online_gambler_eq?id_value=${form.idNumber}`;
      console.log("Fetching from URL:", url);
      
      const response = await fetch(url);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.exists === false) {
        setPopupType('success');
        setSubmitted(true);
      } else {
        setPopupType('failure');
      }
    } catch (err) {
      console.error("API call failed:", err);
      setPopupType('failure'); // ini lebih logis
    }
    
    setShowPopup(true);
    setLoading(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={gambitLogo} alt="Gambit Logo" className="navbar-logo" />
          <span className="navbar-title">Gambit</span>
          <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#promo">Promosi</a></li>
            <li><a href="#news">Berita</a></li>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#help">Bantuan</a></li>
          </ul>
        </div>
      </nav>
      <header className="App-header">
        <div className="site-title main-title-centered">Gambit Account Registration</div>
        <div className="form-center-wrapper">
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
        </div>
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
