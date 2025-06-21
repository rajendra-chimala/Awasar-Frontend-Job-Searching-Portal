import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CompanyHeader = () => {
    const navigate = useNavigate();
  const [company, setCompany] = useState(null);

   const handleLogout = () => {
   
    setCompany(null);
    navigate('/login-company');
    localStorage.removeItem('CompanyId');
    localStorage.removeItem('CompanyToken');
  };
  useEffect(() => {
    const fetchCompany = async () => {
      const companyId = localStorage.getItem('CompanyId');
      try {
        const res = await axios.get(`http://localhost:5000/api/recruiter/company/profile/${companyId}`);
        setCompany(res.data);
      } catch (err) {
        console.error('Failed to fetch company profile:', err);
      }
    };

    fetchCompany();
  }, []);

  if (!company) {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/awasar.png" alt="Logo" className="h-7 rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-800">{company.companyName}</h1>
            <p className="text-sm text-gray-600">{company.address}</p>
          </div>
          <img
            src={`http://localhost:5000${company.profileUrl}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
