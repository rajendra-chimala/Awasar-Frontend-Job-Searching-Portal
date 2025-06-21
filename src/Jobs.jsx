import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const baseURL = "https://awasar.onrender.com"

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Helper: extract 'search' query param from URL
  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };

  // Fetch jobs on page load or when search query changes
  useEffect(() => {
    const query = getQuery();
    setSearch(query);

    axios
      .get(`${baseURL}/api/jobs/jobs/`, {
        params: query ? { search: query } : {}, // adds ?search= only if needed
      })
      .then((res) => {
        setJobs(res.data.jobs || res.data); // adapt to backend shape
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
      });
  }, [location.search]);

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${search}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="border px-3 py-2 w-full rounded"
        />
        <button type="submit" className="bg-[#6954ff] text-white px-4 py-2 rounded hover:bg-indigo-700">
          Search
        </button>
      </form>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
           <Link to={`/job/${job._id}`} key={job._id}>
           
            <li key={job._id} className="p-4 my-2 border rounded shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
             <div className='flex items-center gap-4'>
                <img src={`${baseURL+job.companyProfile}`} alt="Company Logo" className="w-16 h-16 object-cover rounded-md mb-2" />
                <div>
             <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.companyId.companyName}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="mt-2">{job.salary}</p>
                </div>
             </div>
             <Link to={`/job/${job._id}`} className="text-[#6954ff] hover:underline cursor-pointer"><button className='bg-[#6954ff] text-white font-medium p-2 rounded-md'>Apply Now</button></Link>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Jobs;
