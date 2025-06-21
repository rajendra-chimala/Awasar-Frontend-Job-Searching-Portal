import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/recruiter/login', formData);
      const { token, id } = res.data;

      // Save token and company ID in localStorage
      localStorage.setItem('CompanyToken', token);
      localStorage.setItem('CompanyId', id);

      alert('Login successful!');
      navigate('/company'); // Redirect to company dashboard or home page
      // You can redirect here, e.g., window.location.href = "/company-dashboard";
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className="max-w-lg w-[500px] mx-auto p-6 mt-10 bg-white rounded shadow border-[#6954ff] border-t-4">
      <img src="/awasar.png" alt="Logo" className="h-10 mx-auto mb-4 my-3" />
      <h2 className="text-2xl font-bold mb-4 text-center">Company Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-[#6954ff] text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <a href="/register-company" className="text-blue-600 hover:underline"><Link to="/register-company">Register here</Link></a>
          </p>
      </form>
    </div>
    </div>
  );
};

export default CompanyLogin;
