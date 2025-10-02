const express = require("express");
const router = express.Router();
const db = require("./db");

// Create Task
router.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, status || "pending"],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, title, description, status });
    }
  );
});

// Get All Tasks
router.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get Single Task
router.get("/tasks/:id", (req, res) => {
  db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Task not found");
    res.json(result[0]);
  });
});

// Update Task
router.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;
  db.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Task updated successfully" });
    }
  );
});

// Delete Task
router.delete("/tasks/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;
