import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getProjectsData = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const projectCount = await Project.countUserProjects(req.userId);
    if (projectCount >= 4) {
      return res
        .status(400)
        .json({ message: "You can only have up to 4 projects" });
    }

    const project = new Project({
      title,
      description,
      userId: req.userId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (description !== undefined) updates.description = description;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Task.deleteMany({ projectId: req.params.id });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//Task Controller

export const getProjectAllTask = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({
      projectId: req.params.projectId,
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createProjectTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      title,
      description,
      projectId: req.params.projectId,
      userId: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getProjectTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      projectId: req.params.projectId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateProjectTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status) updates.status = status;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.taskId,
        projectId: req.params.projectId,
        userId: req.userId,
      },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteProjectTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      projectId: req.params.projectId,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
