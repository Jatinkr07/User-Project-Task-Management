import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, Edit, Trash } from 'lucide-react';




function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800';
      case 'completed':
        return 'bg-success-100 text-success-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'todo':
        return 'in-progress';
      case 'in-progress':
        return 'completed';
      case 'completed':
        return 'todo';
      default:
        return 'todo';
    }
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 animate-fadeIn">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{task.title}</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task._id)}
              className="text-gray-400 hover:text-primary-500"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-gray-400 hover:text-error-500"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">{task.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
          </div>
          
          <button
            onClick={() => onStatusChange(task._id, nextStatus(task.status))}
            className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;