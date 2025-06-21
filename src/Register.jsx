import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    bio: '',
  });

  const [profile, setProfile] = useState(null);
  const [cvUrl, setCvUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile || !cvUrl) {
      alert("Please upload both profile image and CV file.");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('profile', profile);
    data.append('cvUrl', cvUrl);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/register', data);
      alert('User registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 shadow-md">
       <div className='bg-white rounded-md p-4'> 

      <img src="/awasar.png" alt="Logo" className="h-10 mx-auto mb-4 my-3" />

        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-lg  w-full max-w-lg lg:grid lg:grid-cols-2 gap-4"
        encType="multipart/form-data"
      >

        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'Bio', name: 'bio', type: 'text' },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setProfile)}
            required
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, setCvUrl)}
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6952ff] text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account? <a href="/company-login" className="text-[#6954ff] hover:underline"><Link to="/login">Login here</Link> </a></p>
    </div>
    
    </div>
  );
};

export default Register;
