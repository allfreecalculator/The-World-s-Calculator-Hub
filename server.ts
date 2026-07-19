import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";

// Lazy-initialized Gemini client with telemetry headers and safety checks
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please add it to your Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Coach query proxy route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, profile } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      const clientProfile = profile || {
        weight: 58,
        goalWeight: 70,
        height: 172,
        age: 24,
        gender: "male",
        activity: "moderate",
        dietPreference: "balanced"
      };

      // Construct powerful, dynamic coach system instruction containing biometric context
      const systemInstruction = `You are a professional, authoritative, but highly empathetic and motivating human Nutrition & Strength Coach for WeightGain AI. Your client wants to gain high-quality muscle mass (bulking).

YOUR CURRENT CLIENT PROFILE:
- Current Weight: ${clientProfile.weight} kg
- Goal Weight: ${clientProfile.goalWeight} kg
- Height: ${clientProfile.height} cm
- Age: ${clientProfile.age} years
- Gender: ${clientProfile.gender}
- Activity Level: ${clientProfile.activity}
- Diet Preference: ${clientProfile.dietPreference}

Guidelines for your tone and communication style:
1. Work like a coach, not a bot. Never use robotic, generic assistant phrases like "As an AI...", "I am programmed to...", or "Based on my algorithms...". Speak directly, confidently, and with athletic passion. Use direct coaching commands (e.g., "Blend your oats to make drinking them easy!", "Consistently overload your bench press!", "Never skip breakfast!").
2. Show genuine empathy for the struggles of hardgainers (low appetite, fast metabolism, busy schedules, plateaus).
3. Provide highly scientific yet practical and actionable advice. Emphasize key physiological factors: Muscle Protein Synthesis (MPS), TDEE, progressive overload, hydration, hormonal function, sleep quality (at least 8 hours to allow muscle tissue to reconstruct), and consistent daily caloric surplus.
4. Maintain a structured bulking trajectory. Adjust targets dynamically based on user questions about appetite, schedule, preferences, and progress.
5. Encourage them to stay patient, consistent, and accountable. Ask relevant coaching questions to find out where they might be struggling or how you can better optimize their protocol.
`;

      const ai = getAIClient();

      // Format conversation history to match Gemini's API format
      const contents = (history || []).map((item: any) => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));

      // Append the latest user query
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Call Gemini 3.5-flash for real-time text and structured outputs
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The core personalized, empathetic, athletic, and direct response from the WeightGain AI Nutrition & Strength Coach. This must read exactly like a human professional personal coach, speaking directly to the user's specific context. It should NOT sound like a generic bot or assistant."
              },
              calories: {
                type: Type.INTEGER,
                description: "The total daily calorie target computed or adjusted for the user's weight gain goals."
              },
              protein: {
                type: Type.INTEGER,
                description: "The daily protein target (in grams) for optimal muscle protein synthesis (MPS)."
              },
              carbs: {
                type: Type.INTEGER,
                description: "The daily carbs target (in grams) based on metabolic needs."
              },
              fats: {
                type: Type.INTEGER,
                description: "The daily fats target (in grams) for hormonal and caloric density."
              },
              timeframeWeeks: {
                type: Type.INTEGER,
                description: "The projected timeframe (in weeks) to safely reach the goal weight."
              },
              mealPlan: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.INTEGER },
                  breakfast: {
                    type: Type.OBJECT,
                    properties: {
                      kcal: { type: Type.INTEGER },
                      items: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["kcal", "items"]
                  },
                  lunch: {
                    type: Type.OBJECT,
                    properties: {
                      kcal: { type: Type.INTEGER },
                      items: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["kcal", "items"]
                  },
                  snacks: {
                    type: Type.OBJECT,
                    properties: {
                      kcal: { type: Type.INTEGER },
                      items: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["kcal", "items"]
                  },
                  dinner: {
                    type: Type.OBJECT,
                    properties: {
                      kcal: { type: Type.INTEGER },
                      items: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["kcal", "items"]
                  }
                },
                required: ["calories", "breakfast", "lunch", "snacks", "dinner"]
              },
              workoutPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: "e.g., Monday, Tuesday, etc." },
                    routine: { type: Type.STRING, description: "Name of the routine, e.g. Chest + Triceps Heavy" },
                    exercises: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of exercises, including sets and reps, e.g. Bench Press (4 sets x 8 reps)" }
                  },
                  required: ["day", "routine", "exercises"]
                }
              },
              insights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 key actionable coaching tips or insights based on the conversation."
              }
            },
            required: [
              "text",
              "calories",
              "protein",
              "carbs",
              "fats",
              "timeframeWeeks",
              "mealPlan",
              "workoutPlan",
              "insights"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content from Gemini.");
      }

      const structuredResponse = JSON.parse(responseText.trim());
      res.json(structuredResponse);

    } catch (error: any) {
      console.error("Gemini API server proxy error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to generate coaching response." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
