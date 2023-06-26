import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  }).populate("user");
  res.json({ data: tasks });
};
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
  });
  const savedTask = await newTask.save();
  res.json({ savedTask });
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).json({ message: "Task not found" });
    res.json({ task });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task) res.status(404).json({ message: "Task not found" });
    res.json({ task });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
