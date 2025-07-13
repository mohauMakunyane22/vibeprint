const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple health check
app.get("/", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date().toISOString() });
});

app.post("/api/generate-vibe", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Generating vibe for prompt:", prompt.substring(0, 50) + "...");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Successfully generated response");
    res.json({ text });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ 
      error: "Failed to generate vibe",
      details: error.message 
    });
  }
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🔗 Test at: http://localhost:${port}`);
});