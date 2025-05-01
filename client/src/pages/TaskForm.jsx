import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X } from "lucide-react";
import { createTask, getTask, updateTask } from "../lib/api";


function TaskForm() {
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const isEditMode = !!taskId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    async function fetchTask() {
      if (!projectId || !taskId) return;

      try {
        const task = await getTask(projectId, taskId);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch (err) {
        setError("Failed to load task");
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    }

    if (isEditMode) {
      fetchTask();
    }
  }, [projectId, taskId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;

    setError(null);
    setIsLoading(true);

    try {
      if (isEditMode && taskId) {
        await updateTask(projectId, taskId, { title, description, status });
      } else {
        await createTask(projectId, title, description);
      }
      navigate(`/projects/${projectId}`);
    } catch (err) {
      const apiError = err;
      setError(apiError.message || "Failed to save task");
    } finally {
      setIsLoading(false);
    }
  };

  if (!projectId) {
    return <div>Project ID is required</div>;
  }

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
            {isEditMode ? "Edit Task" : "Create Task"}
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter task description"
            />
          </div>

          {isEditMode && (
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex pt-4 justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}`)}
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
              {isLoading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
