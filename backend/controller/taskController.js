import Task from "../model/task.js";

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = new Task({
      title,
      description,
      status: "Pending",
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findById(id);
    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      await task.save();
      res.status(200).json(task);
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      await task.deleteOne();
      res.status(200).json({ message: "Task deleted" });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
