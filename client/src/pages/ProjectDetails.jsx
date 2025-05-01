import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, ArrowLeft, Edit } from "lucide-react";
import { getProject, getTasks, updateTask, deleteTask } from "../lib/api";
import TaskCard from "../components/TaskCard";

function ProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjectAndTasks() {
      if (!projectId) return;

      try {
        const [projectData, tasksData] = await Promise.all([
          getProject(projectId),
          getTasks(projectId),
        ]);

        setProject(projectData);
        setTasks(tasksData);
      } catch (err) {
        setError("Failed to load project data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjectAndTasks();
  }, [projectId]);

  const handleEditTask = (taskId) => {
    navigate(`/projects/${projectId}/tasks/${taskId}/edit`);
  };

  const handleDeleteTask = async (taskId) => {
    if (!projectId) return;

    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(projectId, taskId);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } catch (err) {
        setError("Failed to delete task");
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    if (!projectId) return;

    try {
      const updatedTask = await updateTask(projectId, taskId, {
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError("Failed to update task status");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded">
        Project not found
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <Link
            to={`/projects/${projectId}/edit`}
            className="btn btn-outline flex items-center justify-center"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Project
          </Link>
          <Link
            to={`/projects/${projectId}/tasks/new`}
            className="btn btn-primary flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first task to get started!
          </p>
          <Link
            to={`/projects/${projectId}/tasks/new`}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Task
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
