import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { createProject, getProject, updateProject } from '../lib/api';

function ProjectForm() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const isEditMode = !!projectId;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    async function fetchProject() {
      if (!projectId) return;
      
      try {
        const project = await getProject(projectId);
        setTitle(project.title);
        setDescription(project.description);
      } catch (err) {
        setError('Failed to load project');
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    if (isEditMode) {
      fetchProject();
    }
  }, [projectId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isEditMode && projectId) {
        await updateProject(projectId, title, description);
      } else {
        await createProject(title, description);
      }
      navigate('/');
    } catch (err) {
      const apiError = err;
      setError(apiError.message || 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Project' : 'Create Project'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter project description"
            />
          </div>

          <div className="flex pt-4 justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              {isLoading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;