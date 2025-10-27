import express from "express";
import { google } from "googleapis";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback" 
);

router.get("/google", (req, res) => {
  console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID == "1094421700031-bkim4hams11rh4io94aqvnjmvbl4n7bd.apps.googleusercontent.com");
  console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
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
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);

    res.redirect(`http://localhost:3000/dashboard?access_token=${tokens.access_token}`);
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("Authentication Failed");
  }
});

export default router;