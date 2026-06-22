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
7. Estimated budget must always be in Indian Rupees (INR).
8. Include estimated costs for accommodation, local transportation, food, and attractions.
   Assume the traveler is departing from a major Indian city such as Hyderabad, Mumbai, Delhi, or Bengaluru when estimating flights.
9. Budget should be realistic for the specified number of days and budget category.
10. Return estimatedBudget as a single string in the format:
    "₹45,000 - ₹60,000"
11. Do not use foreign currencies such as USD, AED, SGD, EUR, or JPY.
12. Do not include explanatory text such as "per person" or "excluding flights".
13. Assume the trip is for one person.
14. Suggest exactly 3 hotels based on destination, budget, and traveler popularity.
15. Return one Budget hotel, one Mid Range hotel, and one Luxury hotel.
16. Each hotel must include name, type and description.
17. For every activity include a bestTime field.
18. bestTime should help avoid crowds, improve views, weather, or the overall experience.
19. For every activity include a proTip field.
20. proTip should be a short practical recommendation related to that activity.
    

Expected JSON format:
{
  "estimatedBudget": "₹25,000 - ₹40,000",

  "hotels": [
    {
      "name": "Hotel Sakura Tokyo",
      "type": "Budget",
      "description": "Affordable stay near metro stations"
    },
    {
      "name": "Shinjuku Grand Hotel",
      "type": "Mid Range",
      "description": "Comfortable stay in central Tokyo"
    },
    {
      "name": "Tokyo Imperial Palace Hotel",
      "type": "Luxury",
      "description": "Premium luxury experience"
    }
  ],

  "itinerary": [
    {
      "day": 1,
      "theme": "Tokyo Highlights",
      "activities": [
        {
          "time": "09:00 AM",
          "activity": "Visit Tokyo Skytree",
          "bestTime": "Sunset",
          "proTip": "Book tickets online in advance"
        },
        {
          "time": "02:00 PM",
          "activity": "Explore Asakusa",
          "bestTime": "Weekday afternoons",
          "proTip": "Carry cash for local street vendors"
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
