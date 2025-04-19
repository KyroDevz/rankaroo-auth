import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import freePlanRoute from "./routes/freePlan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "", {
    dbName: "test",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(express.json()); // parses incoming JSON requests

// Routes
app.use("/", authRoutes);
app.use("/", freePlanRoute); // mounts the POST /api/free-plan route

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
