import React, { useState } from "react";
import Directory from "../components/Directory";
import axios from "axios";

// const dummyData = [
//   {
//     id: 1,
//     name: "John Doe",
//     profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   {
//     id: 3,
//     name: "Mark Johnson",
//     profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
// ];

const DirectoryPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    batch: "",
    branch: "",
    company: "",
    location: "",
    jobTitle: "",
    tags: "",
  });
  const [sortBy, setSortBy] = useState("");

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/search",
        {
          params: {
            name: searchQuery,
            ...filters,
            sortBy,
          },
        }
      );
      console.log("Fetched data:", response.data);
      setUsers(response.data.users); 
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4'>
        <h1 className='text-3xl font-bold text-center mb-4'>Directory</h1>

        <input
          type='text'
          placeholder='Search by name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />

        {/* Filters */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <input
            type='text'
            name='batch'
            placeholder='Batch'
            value={filters.batch}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
          <input
            type='text'
            name='branch'
            placeholder='Branch'
            value={filters.branch}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
          <input
            type='text'
            name='company'
            placeholder='Company'
            value={filters.company}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
          <input
            type='text'
            name='location'
            placeholder='Location'
            value={filters.location}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
          <input
            type='text'
            name='jobTitle'
            placeholder='Job Title'
            value={filters.jobTitle}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
          <input
            type='text'
            name='tags'
            placeholder='Tags (comma separated)'
            value={filters.tags}
            onChange={handleInputChange}
            className='px-3 py-2 border rounded'
          />
        </div>

        {/* Sorting */}
        <div className='flex justify-between items-center mt-2'>
          <label className='font-medium'>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='px-3 py-2 border rounded'
          >
            <option value=''>None</option>
            <option value='batch'>Batch</option>
            <option value='branch'>Branch</option>
            <option value='company'>Company</option>
            <option value='location'>Location</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        >
          Search
        </button>

        <Directory users={users} />
      </div>
    </div>
  );
};

export default DirectoryPage;
