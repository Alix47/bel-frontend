import React from 'react';

function ProjectCard({ project, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{project.projectName}</h2>
                <div className="mb-4">
                    <strong>Description:</strong>
                    <p className="text-gray-600">{project.description}</p>
                </div>
                <div className="mb-4">
                    <strong>Start Date:</strong>
                    <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                    <strong>End Date:</strong>
                    <p className="text-gray-600">{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <strong>Status:</strong>
                    <p className="text-gray-600">{project.status}</p>
                </div>
                <div className="mb-4">
                    <strong>Estimated Value:</strong>
                    <p className="text-gray-600">${project.estimatedValue}</p>
                </div>
                <div className="mb-4">
                    <strong>Technologies Used:</strong>
                    <p className="text-gray-600">{project.technologies}</p>
                </div>
                <div className="mb-4">
                    <strong>Team Members</strong>
                    <p className="text-gray-600">{project.teamMembers}</p>
                </div>
                <div className="mb-4">
                    <strong>Category:</strong>
                    <p className="text-gray-600">{project.category}</p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;
