const express = require("express");
const { Task } = require("../models");
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Create a task
router.post("/", async (req, res) => {
    const { title, description, tag, columnId, position } = req.body;
    const task = await Task.create({ title, description, tag, columnId, position });
    res.json(task);
});

// Update a task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    await Task.update(req.body, { where: { id } });
    res.send("Task updated");
});

// Delete a task
router.delete("/:id", async (req, res) => {
    await Task.destroy({ where: { id: req.params.id } });
    res.send("Task deleted");
});

module.exports = router;
