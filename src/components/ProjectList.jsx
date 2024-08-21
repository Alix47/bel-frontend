// src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

function ProjectList() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        setFilteredProjects(
            projects.filter((project) =>
                project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, projects]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3001/projects');
            setProjects(response.data);
            setFilteredProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/projects/${id}`);
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-project/${id}`);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseCard = () => {
        setSelectedProject(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/add-project" className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700">
                    Add Project
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-600">
                            <th className="px-6 py-3">Project Name</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Team Members</th>
                            <th className="px-6 py-3">Estimated Value</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {filteredProjects.map((project) => (
                            <tr key={project.id} className="border-b" onClick={() => handleProjectClick(project)}>
                                <td className="px-6 py-4">{project.projectName}</td>
                                <td className="px-6 py-4">{project.description}</td>
                                <td className="px-6 py-4">{project.status}</td>
                                <td className="px-6 py-4">{project.teamMembers.map((teamMember) => teamMember).join(', ')}</td>
                                <td className="px-6 py-4">{project.estimatedValue}</td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <button
                                        onClick={() => handleUpdate(project.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {selectedProject && (
                        <ProjectCard project={selectedProject} onClose={handleCloseCard} />
                    )}
                </table>
            </div>
        </div>
    );
}


export default ProjectList;
