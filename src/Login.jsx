import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/login', form);
      const { token,id } = res.data;

      // Save token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId',id );
      alert('Login successful');
      
      navigate('/'); // or your protected route
    } catch (err) {
      console.error(err);
      alert('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign in</h1>
            <form className="mt-12 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter user email"
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              <p className="text-slate-900 text-sm mt-6 text-center">
                Don't have an account?
                <Link to="/register" className="text-blue-600 hover:underline ml-1 font-semibold">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
