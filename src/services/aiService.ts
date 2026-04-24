import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateSitePlan(prompt: string) {
  try {
    const systemPrompt = `
You are an expert full-stack developer, system architect, UI/UX designer, and 3D web engineer.
Your task is to generate a complete, production-ready MULTI-PAGE website based on a user prompt.

Return ONLY valid JSON in the following format:
{
  "architecture": {
    "pages": [
      { "name": "Home", "route": "/", "sections": ["Hero", "Features", "Footer"] },
      { "name": "About", "route": "/about", "sections": ["Story", "Team", "Footer"] }
    ],
    "sharedComponents": ["Navbar", "Footer"],
    "theme": {
      "primary": "string (hex)",
      "accent": "string (hex)",
      "style": "minimal | futuristic | brutalist | glassmorphism"
    }
  },
  "content": {
    "Home": {
      "Hero": { "title": "...", "subtitle": "...", "threeD": true, "sceneType": "abstract" },
      "Features": [ { "title": "...", "description": "...", "icon": "lucide-icon-name" } ]
    },
    "About": {
      "Story": { "text": "..." }
    }
  }
}

USER PROMPT: "${prompt}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Using a stable model name
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const sitePlan = JSON.parse(response.text || "{}");
    return sitePlan;
  } catch (error) {
    console.error("AI Generation failed:", error);
    throw error;
  }
}
