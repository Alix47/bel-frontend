// src/components/AddProject.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddProject() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('ongoing');
    const [estimatedValue, setEstimatedValue] = useState('0.0');
    const [technologies, setTechnologies] = useState('');
    const [teamMembers, setTeamMembers] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = {
            projectName,
            description,
            startDate,
            endDate,
            status,
            estimatedValue: parseFloat(estimatedValue),
            technologies: technologies.split(',').map(tech => tech.trim()),
            teamMembers: teamMembers.split(',').map(team => team.trim()),
            category,
        };

        try {
            await axios.post('http://localhost:3001/projects', newProject);
            navigate('/');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <button className='bg-blue-300 p-2 rounded-xl border border-blue-600 left-2 absolute'><Link to="/">View Project List</Link></button>
            <div className='flex justify-center'>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Add New Project</h2>
            </div>
            <div className=' border-2 p-5 rounded-lg shadow-xl'>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Project Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                    <select
                        name="status"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        required
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Estimated Value</label>
                    <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Team Members</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(e.target.value)}
                        placeholder="Separate team members with commas"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Technologies</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        placeholder="Separate technologies with commas"
                        />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        >
                        <option value="DB">Database</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Networking">Networking</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Display">Display</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
                    Add Project
                </button>
            </form>
            </div>
        </div>
    );
}

export default AddProject;
