// models/Workspace.js
import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Roblox User ID
  name: { type: String, required: true },
  groupId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Workspace", WorkspaceSchema);
