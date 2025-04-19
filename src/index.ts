import express from "express";
import dotenv from "dotenv";
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/", authRoutes);
app.use(cors());
app.use(express.json)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const workspaceRoutes = require('./routes/workspaces');
app.use('/api/workspaces', workspaceRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
