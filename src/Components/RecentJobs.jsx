import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL)
const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/jobs/jobs`);
        const sortedJobs = res.data
          .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
          .slice(0, 10);
        setJobs(sortedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-left w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
            Recent Jobs
          </h1>
          <p className="lg:w-2/3 leading-relaxed text-base">
            Explore the latest job opportunities tailored for you.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {jobs.map((job) => (
            <div className="p-4 w-full" key={job._id}>
              <div className="h-full border border-gray-200 flex rounded-lg overflow-hidden">
                <div className="w-48">
                  <img
                    src={`http://localhost:5000${job.companyProfile}`}
                    alt="Company"
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <div className="p-6 w-full">
                  <h2 className="text-lg font-medium title-font mb-2 text-gray-900">
                    {job.jobTitle}
                  </h2>
                  <p className="leading-relaxed mb-3">
                    {job.description}
                  </p>
                  <div className="flex items-between w-full flex-wrap">
                    <span className="text-gray-500 inline-flex items-center md:mb-2 lg:mb-0">
                      {job.type}
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-[#6954ff] font-bold cursor-pointer inline-flex items-center md:mb-2 lg:mb-0 ml-auto">
                      Job Details
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentJobs;
