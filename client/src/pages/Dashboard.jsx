import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { getProjects, deleteProject } from "../lib/api";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  // const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== id)
        );
      } catch (err) {
        setError("Failed to delete project");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <Link to="/projects/new" className="btn btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          New Project
        </Link>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first project to get started!
          </p>
          <Link
            to="/projects/new"
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}

          {projects.length < 4 && (
            <Link
              to="/projects/new"
              className="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-gray-500 hover:text-primary-600 hover:border-primary-400 transition-colors duration-200"
            >
              <Plus className="h-10 w-10 mb-2" />
              <span className="font-medium">New Project</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
