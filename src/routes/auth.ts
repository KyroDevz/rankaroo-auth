import { Router } from "express";
import fetch from "node-fetch";
import crypto from "crypto";

const router = Router();

const CLIENT_ID = process.env.ROBLOX_CLIENT_ID!;
const CLIENT_SECRET = process.env.ROBLOX_CLIENT_SECRET!;
const REDIRECT_URI = process.env.ROBLOX_REDIRECT_URI!;

router.get("/auth/roblox", (req, res) => {
  const state = crypto.randomUUID();
  const authUrl = `https://apis.roblox.com/oauth/v1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid`;
  res.redirect(authUrl);
});

router.get("/auth/callback", async (req, res) => {
    const code = req.query.code as string;
  
    const tokenResponse = await fetch("https://apis.roblox.com/oauth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
  
    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
    };
  
    const accessToken = tokenData.access_token;
  
    const userRes = await fetch("https://apis.roblox.com/oauth/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const user = await userRes.json();
  
    res.json({
      accessToken,
      user,
    });
  });
  

export default router;
