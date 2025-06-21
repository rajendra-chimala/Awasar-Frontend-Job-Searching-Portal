import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [profileFile, setProfileFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [applications, setApplications] = useState([]);

  const id = localStorage.getItem('userId');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/profile/${id}`)
        .then(res => {
          setUser(res.data);
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
            phone: res.data.phone || ''
          });
        })
        .catch(err => console.error('Failed to load profile:', err));

      axios.get(`http://localhost:5000/api/applications/get-applications-by-job/${id}`)
        .then(res => setApplications(res.data))
        .catch(err => console.error('Failed to fetch applications:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    if (profileFile) data.append('profile', profileFile);
    if (cvFile) data.append('cv', cvFile);

    try {
      const res = await axios.put(`http://localhost:5000/api/update-profile/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data.user);
      setEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile');
    }
  };

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {!editing ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {user.profileUrl ? (
              <img
                src={`http://localhost:5000${user.profileUrl}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-[#6954ff] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
              {user.cvUrl && (
                <a
                  href={`http://localhost:5000${user.cvUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Uploaded CV
                </a>
              )}
            </div>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="bg-[#6954ff] text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border w-full px-3 py-2 rounded"
              type="tel"
            />
          </div>
          <div>
            <label className="block font-medium">Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => setProfileFile(e.target.files[0])} />
          </div>
          <div>
            <label className="block font-medium">Upload CV (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files[0])} />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFormData({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Your Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-600">You haven't applied for any jobs yet.</p>
        ) : (
          <ul className="space-y-3">
            {applications.map((app) => (
              <li key={app._id} className="border rounded p-4">
               {console.log(app)}
                {/* <p className='font-medium'>Job Title : {app.jobTitle}</p> */}
                <p className="font-medium">Company: {app.recruiterId?.companyName || 'N/A'}</p>
                <p>Status: <span className="capitalize">{app.status}</span></p>
                <p>Applied At: {new Date(app.appliedAt).toLocaleDateString()}</p>
                <a
                  href={`http://localhost:5000${app.cvUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View CV Submitted
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
