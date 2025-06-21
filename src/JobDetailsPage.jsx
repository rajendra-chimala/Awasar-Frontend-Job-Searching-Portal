import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyButton = ({ jobId }) => {
  const navigate = useNavigate();

  const handleApply = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications/",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Applied successfully!");
    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to apply.");
    }
  };

  return (
    <button
      onClick={handleApply}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
    >
      Apply Now
    </button>
  );
};

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/get-job-by-id/${id}`);
        setJob(res.data);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading job details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!job) return <p className="text-center mt-10 text-gray-500">No job found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4 mb-6">
        {job.companyProfile && (
          <img
            src={`http://localhost:5000${job.companyProfile}`}
            alt="Company"
            className="w-20 h-20 object-cover rounded-md"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
          <p className="text-gray-600">{job.companyId?.companyName}</p>
          <p className="text-sm text-gray-500">Posted on: {new Date(job.postedAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
        <p><span className="font-medium">Type:</span> {job.type}</p>
        <p><span className="font-medium">Location:</span> {job.location}</p>
        <p><span className="font-medium">Salary:</span> {job.salary}</p>
        <p><span className="font-medium">Contact:</span> {job.contact}</p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      {/* Responsibilities */}
      {job.responsibility?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.responsibility.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {job.requirement?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.requirement.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}

      {job.tags?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <ApplyButton jobId={job._id} />
      </div>
    </div>
  );
};

export default JobDetailsPage;
