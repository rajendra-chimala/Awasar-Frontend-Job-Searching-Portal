import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseURL = "https://awasar.onrender.com"

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    email: '',
    password: '',
    noOfEmployee: '',
    bio: '',
    websiteURL: ''
  });

  const [profileFile, setProfileFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (profileFile) {
      data.append('profile', profileFile);
    }

    try {
      const res = await axios.post(`${baseURL}/api/company/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Company registered successfully!');
      console.log(res.data);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register company');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className="max-w-xl mx-auto p-6 shadow-xl mb-2 border-t-4 border-[#6954ff] bg-white rounded-lg mt-10">
      <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src="/awasar.png" alt="Logo" className="h-10 p-2 rounded-full" />
              </Link>
      <h2 className="text-2xl font-bold text-center mb-4">Company Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4 lg:grid lg:grid-cols-2 gap-2" encType="multipart/form-data">
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border w-full px-3 py-2 rounded"
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
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">No. of Employees</label>
          <input
            type="number"
            name="noOfEmployee"
            value={formData.noOfEmployee}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Company Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Website URL</label>
          <input
            type="url"
            name="websiteURL"
            value={formData.websiteURL}
            onChange={handleChange}
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border w-full px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-[#6954ff] text-white px-4 py-2 rounded w-full hover:bg-indigo-700"
        >
          Register Company
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account? <a href="/company-login" className="text-[#6954ff] hover:underline"><Link to="/login-company">Login here</Link> </a></p>
    </div>

    </div>
  );
};

export default RegisterCompany;
