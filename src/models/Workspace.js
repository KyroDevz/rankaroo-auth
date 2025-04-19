// models/Workspace.js
const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Roblox User ID
  name: { type: String, required: true },
  groupId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
