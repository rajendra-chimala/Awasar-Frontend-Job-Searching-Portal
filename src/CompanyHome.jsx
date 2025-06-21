import React, { useEffect, useState } from 'react';
import { FiPlus, FiEye } from 'react-icons/fi';
import axios from 'axios';
import CompanyHeader from './Components/CompanyHeader';
import { Link, useNavigate } from 'react-router-dom';

const CompanyHome = () => {
    const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    contact: '',
    salary: '',
    location: '',
    type: '',
    requirement: [''],
    responsibility: [''],
    deadline: '',
    tags: [''],
  });

  useEffect(() => {
      const token = localStorage.getItem('CompanyToken');
  const companyId = localStorage.getItem('CompanyId');

  if(!token || !companyId) {
    navigate('/login-company');

  }

    const fetchCompany = async () => {
      const companyId = localStorage.getItem('CompanyId');
      try {
        const res = await axios.get(`http://localhost:5000/api/recruiter/company/profile/${companyId}`);
        setCompany(res.data);

        const jobres = await axios.get(`http://localhost:5000/api/jobs/get-job-by-id/${companyId}`);
        setJobs(jobres.data);
      } catch (err) {
        console.error('Failed to fetch company profile:', err);
      }
    };

    fetchCompany();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const companyId = localStorage.getItem('CompanyId');
    const token = localStorage.getItem('CompanyToken');
    try {
      const res = await axios.post('http://localhost:5000/api/jobs/jobs', {
        ...formData,
        
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setJobs([...jobs, res.data]);
      await fetchCompany()
      setShowModal(false);
      setFormData({
        jobTitle: '',
        description: '',
        contact: '',
        salary: '',
        location: '',
        type: '',
        requirement: [''],
        responsibility: [''],
        deadline: '',
        tags: [''],
      });

    } catch (err) {
      console.error('Job creation failed:', err);
    }
  };

  if (!company) {
    return <div className="text-center mt-10 text-gray-600">Loading company profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     
<CompanyHeader/>
      {/* Create Job Button */}
      <div className="m-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#6952ff] text-white py-3 rounded flex justify-center items-center gap-2 transition cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Create Job
        </button>
      </div>

      {/* Job List */}
      <div className="space-y-4 mx-4 pb-10">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={`http://localhost:5000${company.profileUrl}`} alt="Company Icon" className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                <p className="text-sm text-gray-500">Created at: {new Date(job.postedAt).toLocaleDateString()}</p>
              </div>
            </div>
           <Link to={`/applicatnts/${job._id}`} className="flex items-center gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2">
              <FiEye className="w-4 h-4" />
              View Applicants
            </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Job Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            <form onSubmit={handleJobSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Contact</label>
                <input
                  type="email"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value.split(',').map((tag) => tag.trim()) })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Requirements</label>
                <textarea
                  name="requirement"
                  onChange={(e) =>
                    setFormData({ ...formData, requirement: e.target.value.split(',').map((r) => r.trim()) })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  placeholder="e.g. Bachelor's degree, experience"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Responsibilities</label>
                <textarea
                  name="responsibility"
                  onChange={(e) =>
                    setFormData({ ...formData, responsibility: e.target.value.split(',').map((r) => r.trim()) })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  placeholder="e.g. Design UI, Lead team"
                ></textarea>
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyHome;
