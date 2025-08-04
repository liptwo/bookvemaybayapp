import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registered with email/phone: ' + email);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url('https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '600px',
          gap: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        <h2 className="text-2xl font-bold text-center text-blue-800">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Email / Phone */}
          <input
            type="text"
            placeholder="E.g. +84901234567 or yourname@email.com"
            value={email}
            onChange={handleEmailChange}
            className="w-full border rounded px-4 py-2"
            required
          />

          {/* Step 2: Full Registration */}
          <input type="text" placeholder="Full Name" className="w-full border rounded px-4 py-2" required />
          <input type="date" placeholder="Date of Birth" className="w-full border rounded px-4 py-2" required />
          <input type="text" placeholder="Address" className="w-full border rounded px-4 py-2" required />
          <input type="tel" placeholder="Phone Number" className="w-full border rounded px-4 py-2" required />
          <input type="email" placeholder="Email" className="w-full border rounded px-4 py-2" required />
          <input type="text" placeholder="ID Number" className="w-full border rounded px-4 py-2" required />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
