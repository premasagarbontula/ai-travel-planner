export const generateTravelPlan = async (
  destination: string,
  days: number,
  budget: string,
  interests: string[],
) => {
  const prompt = `
Generate a travel itinerary in JSON format.

Destination: ${destination}
Days: ${days}
Budget: ${budget}
Interests: ${interests.join(", ")}

Rules:
1. Return ONLY valid JSON.
2. Do not wrap response in markdown.
3. Do not use \`\`\`json.
4. Include estimatedBudget.
5. Include theme for each day.
6. Generate exactly ${days} days.

Expected JSON format:

{
  "estimatedBudget": "₹25000",
  "itinerary": [
    {
      "day": 1,
      "theme": "Beach Exploration",
      "activities": [
        {
          "time": "09:00 AM",
          "activity": "Visit attraction"
        }
      ]
    }
  ]
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  );

  const data = await response.json();
  
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return null;
  }
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};
