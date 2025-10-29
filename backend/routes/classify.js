import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/classify", authenticateToken, async (req, res) => {
  try {
    const { emails, gemini_key } = req.body;
    if (!gemini_key) return res.status(400).json({ error: "Missing Gemini API key" });

    const genAI = new GoogleGenerativeAI(gemini_key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an intelligent email classification assistant.
Classify each email into one of these categories:
[Important, Promotions, Social, Marketing, Spam, General].
Return ONLY a valid JSON array (no extra text or formatting),
with objects having fields: "subject", "from", "content", "data", and "category".
Emails:
${JSON.stringify(emails.slice(0, 15), null, 2)}
`;

    const result = await model.generateContent(prompt);
    let textResponse = result.response.text().trim();
    textResponse = textResponse
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "");

    let classification;
    try {
      classification = JSON.parse(textResponse);
    } catch (err) {
      classification = { error: "Failed to parse Gemini output", raw: textResponse };
    }

    res.json({ classifiedMails: classification });
  } catch (err) {
    console.error("Gemini Classification Error:", err);
    res.status(500).json({ error: "Classification failed" });
  }
});

export default router;
