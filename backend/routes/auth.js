import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback" 
);

router.get("/google", (req, res) => {

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
  });
  console.log("Generated OAuth URL:", url);
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  console.log("Authorization Code:", req.query);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    // console.log("Obtained Tokens:", tokens);
    res.redirect(`http://localhost:5173/dashboard?access_token=${tokens.access_token}`);
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("Authentication Failed");
  }
});

export default router;