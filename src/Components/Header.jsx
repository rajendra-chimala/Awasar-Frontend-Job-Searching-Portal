import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://awasar.onrender.com"

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  // Fetch user data using the token
  useEffect(() => {
    const id = localStorage.getItem('userId');
    // console.log(id)
    if (id) {
      axios.get(`${baseURL}/api/profile/${id}` )
      .then(res => {
        
        setUser(res.data);
        
      })
      .catch(() => {

        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        console.log('Error fetching user data');        
        setUser(null);

      });
    }
  }, []);

  const handleLogout = () => {
   
    setUser(null);
    navigate('/');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };
  // console.log(user)
              // console.log(baseURL+user.profileUrl);


  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="/awasar.png" alt="Logo" className="h-10 p-2 rounded-full" />
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-[#6954ff]">Home</Link>
          <Link to="/jobs" className="mr-5 hover:text-[#6954ff]">Jobs</Link>
          <Link to="/about" className="mr-5 hover:text-[#6954ff]">About</Link>
          <Link to="/contact" className="mr-5 hover:text-[#6954ff]">Contact</Link>
          <Link to="/company" className="mr-5 hover:text-[#6954ff]">Company</Link>
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile" >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            </Link>
            {user.profileUrl ? (
              <Link to="/profile">
                <img src={baseURL+user.profileUrl} alt="profile" className="w-10 h-10 rounded-full" />
              </Link>
            ) : (
              <Link to="/profile">
                <div className="w-10 h-10 bg-[#6954ff] text-white rounded-full flex items-center justify-center font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="gap-4 flex">
            <Link to="/login">
              <button className="bg-[#6954ff] text-white font-bold px-4 py-2 rounded hover:bg-indigo-700">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[#6954ff] text-white font-bold px-4 py-2 rounded hover:bg-indigo-700">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
