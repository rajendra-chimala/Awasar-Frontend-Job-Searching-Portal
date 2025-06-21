import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'; // or useParams if you're using route params
import CompanyHeader from './Components/CompanyHeader';
import axios from 'axios';

const ApplicationPage = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const {id} = useParams(); // e.g., /application?jobId=xxxxx
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/applications/get-application-by-jobid/${id}`);
        setApplications(res.data);
        
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplications();
    }
  }, [id]);

  console.log(applications);

  return (  
    <div>
      <CompanyHeader />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Applicants for Job ID: {id}</h2>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">CV</th>
                <th className="border px-4 py-2">Applied At</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{app.applicantId.name}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={`http://localhost:5000${app.cvUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="border px-4 py-2">{new Date(app.appliedAt).toLocaleString()}</td>
                  <td className="border px-4 py-2 capitalize">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
