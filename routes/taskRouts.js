const express = require("express");
const Task = require("../models/taskSchema");
const router = express.Router();
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    const count = await Task.countDocuments({});
    res.status(200).json({
      message: "sucess",
      count,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({ message: "added successfully", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const task = await Task.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({ message: "updated successfully", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
