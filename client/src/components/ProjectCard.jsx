import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Edit, Trash } from 'lucide-react';


function ProjectCard({ project, onDelete }) {
  return (
    <div className="card animate-fadeIn">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 truncate">{project.title}</h3>
          <div className="flex space-x-2">
            <Link
              to={`/projects/${project._id}/edit`}
              className="text-gray-400 hover:text-primary-500"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={() => onDelete(project._id)}
              className="text-gray-400 hover:text-error-500"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{project.description}</p>
        
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <Link
          to={`/projects/${project._id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;