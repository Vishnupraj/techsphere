import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (message) => {

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: message }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {

    console.log("Gemini error:", error.response?.data);

    return "Gemini failed.";

  }

};