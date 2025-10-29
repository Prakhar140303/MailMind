import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();
import { authenticateToken } from "../middlewares/auth.middleware.js";
import mailRoutes from './mail.js';
const router = express.Router();


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.use('/google',mailRoutes);
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
  // console.log("Generated OAuth URL:", url);
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });
    console.log({oauth2});
    const {data: userInfo} = await oauth2.userinfo.get();

    const payLoad = {
      user: {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      },
      google_tokens:{
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      }

    }
    const jwtToken = jwt.sign(payLoad, process.env.JWT_sECRET,{expiresIn: '2h'});
    const isProd = process.env.NODE_ENV === 'production';
    const sameSite = isProd ? 'None' : 'Lax';
    const secure = isProd ? true : false;
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure,
      sameSite,
      maxAge: 2 * 60 * 60 * 1000,
    });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/dashboard`);
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("Authentication Failed");
  }
});

router.get("/me", authenticateToken, (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Fetch Session Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;