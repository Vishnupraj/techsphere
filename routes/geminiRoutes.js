const router = require("express").Router();
const axios = require("axios");

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

   const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
contents: [
{
parts: [
{text: `
You are TechSphere AI assistant.

Answer the user's question clearly in bullet points.
Keep answers short and structured.
Use points instead of long paragraphs.

User Question: ${message}
`}
]
}
]
}
);
    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not generate response.";

    res.json({ reply });

  } catch (error) {

    console.log("Gemini error:", error.response?.data || error.message);

    res.status(500).json({
      reply: "⚠️ Gemini AI failed"
    });

  }

});

module.exports = router;