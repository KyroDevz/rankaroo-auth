import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
// Middleware
app.use(express.json()); // parses incoming JSON requests

// Routes
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
