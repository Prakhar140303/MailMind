import express from "express";
import { google } from "googleapis";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.get("/mails", authenticateToken, async (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    // console.log(req);
    oauth2Client.setCredentials({
      access_token: req.google_tokens.access_token,
      refresh_token: req.google_tokens.refresh_token,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const listResponse = await gmail.users.messages.list({
      userId: "me",
      maxResults: req.query.maxResults || 10,
    });

    const messages = listResponse.data.messages || [];
    const detailedMessages = await Promise.all(
      messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = message.data.payload.headers;
        const subject =
          headers.find((h) => h.name === "Subject")?.value || "(No Subject)";
        const from = headers.find((h) => h.name === "From")?.value || "(Unknown)";
        const date = headers.find((h) => h.name === "Date")?.value || "(No Date)";
        const content = message.data.snippet || "";

        return {
          id: msg.id,
          subject,
          from,
          date,
          content,
        };
      })
    );

    res.status(200).json({ mails : detailedMessages});
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch email details" });
  }
});

export default router;
