// routes/workspaces.js
import express from "express";
import Workspace from "../models/Workspace.js";

const router = express.Router();

// Get workspaces by user ID
router.get("/:userId", async (req, res) => {
  try {
    const workspaces = await Workspace.find({ userId: req.params.userId });
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workspaces" });
  }
});

// Create a new workspace
router.post("/", async (req, res) => {
  const { name, groupId, userId } = req.body;

  if (!name || !groupId || !userId)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const newWorkspace = new Workspace({ name, groupId, userId });
    await newWorkspace.save();
    res.status(201).json(newWorkspace);
  } catch (err) {
    res.status(500).json({ error: "Failed to create workspace" });
  }
});

export default router;
