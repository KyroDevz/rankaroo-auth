import { Router, Request, Response } from "express";
import mongoose, { Schema, model } from "mongoose";

const router = Router();

interface IUserMembership {
  robloxUsername: string;
  discordId: string;
  plan?: string;
  createdAt?: Date;
}

const userMembershipSchema = new Schema<IUserMembership>({
  robloxUsername: { type: String, required: true },
  discordId: { type: String, required: true },
  plan: { type: String, default: "Free" },
  createdAt: { type: Date, default: Date.now },
});

const UserMembership = model<IUserMembership>("usermemberships", userMembershipSchema, "usermemberships");

router.post("/api/free-plan", async (req: Request, res: Response) => {
  const { robloxUsername, discordId } = req.body;

  if (!robloxUsername || !discordId) {
    return res.status(400).json({ error: "Missing robloxUsername or discordId" });
  }

  try {
    const newUser = new UserMembership({ robloxUsername, discordId });
    await newUser.save();
    res.status(201).json({ message: "User added to Free Plan successfully!" });
  } catch (error) {
    console.error("MongoDB insert error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
