// src/components/UpdateProject.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProject() {
        const { id } = useParams();
        const navigate = useNavigate();
        const [project, setProject] = useState({
            projectName: '',
            description: '',
            startDate: '',
            endDate: '',
            status: 'ongoing',
            estimatedValue: '0.0',
            teamMembers: '',
            technologies: '',
            category: '',
        });
    
        useEffect(() => {
            fetchProject();
        }, []);
    
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/projects/${id}`);
                const fetchedProject = response.data;
                setProject({
                    ...fetchedProject,
                    technologies: Array.isArray(fetchedProject.technologies)
                        ? fetchedProject.technologies.join(', ')
                        : '',
                    teamMembers: Array.isArray(fetchedProject.teamMembers)
                        ? fetchedProject.teamMembers.join(', ')
                        : '',
                });
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            const updatedProject = {
                ...project,
                technologies: typeof project.technologies === 'string'
                    ? project.technologies.split(',').map((tech) => tech.trim())
                    : project.technologies,
                teamMembers: typeof project.teamMembers === 'string'
                    ? project.teamMembers.split(',').map((member) => member.trim())
                    : project.teamMembers,
            };
            try {
                await axios.put(`http://localhost:3001/projects/${id}`, updatedProject);
                navigate('/');
            } catch (error) {
                console.error('Error updating project:', error);
            }
        };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProject((prevProject) => ({
            ...prevProject,
            [name]: name === "estimatedValue" || name === "finalValue" ? parseFloat(value) : value,
        }));
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Project Name</label>
                    <input
                        type="text"
                        name="projectName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.projectName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select
                        name="status"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Estimated Value</label>
                    <input
                        type="number"
                        name="estimatedValue"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.estimatedValue}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Technologies Used</label>
                    <input
                        type="text"
                        name="technologies"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.technologies}
                        onChange={handleChange}
                        placeholder="Enter technologies separated by commas"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Team Members</label>
                    <input
                        type="text"
                        name="teamMembers"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.teamMembers}
                        onChange={handleChange}
                        placeholder="Enter team members separated by commas"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={project.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="DB">Database</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Networking">Networking</option>
                        <option value="AI">Artificial Intelligence</option>
                        <option value="Display">Display</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
                    Update Project
                </button>
            </form>
        </div>
    );
}

export default UpdateProject;
