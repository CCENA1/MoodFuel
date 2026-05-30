exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { mood, sleep, energy, water, meal, goal, diet, symptoms } = body;

    const prompt = `You are the MoodFuel AI Nutritionist — a warm, expert dietician who specialises in psychonutrition (the science of how food affects mood and brain chemistry).

A user has just completed a 5-question check-in:

🎭 Mood: ${mood}
😴 Sleep last night: ${sleep || 'Not specified'}
⚡ Energy level: ${energy || 'Not specified'}
💧 Hydration today: ${water || 'Not specified'}
🍽️ Last meal: ${meal || 'Not specified'}
🎯 Goal today: ${goal || 'General wellbeing'}
🥗 Dietary needs: ${diet && diet.length > 0 ? diet.join(', ') : 'No restrictions'}
🤔 Symptoms: ${symptoms && symptoms.length > 0 ? symptoms.join(', ') : 'None'}

Use ALL of this information to create a highly personalised nutritional prescription. The sleep, energy, hydration, and meal timing data are critical — they modify and add nuance to the mood-based recommendation. Keep the language simple, warm, and direct — no jargon.

Respond ONLY with a valid JSON object — no markdown, no backticks, no preamble or explanation outside the JSON:

{
  "analysis": "2-3 sentences. Explain what's likely happening in their brain and body right now, using ALL the information they gave (mood + sleep + energy + hydration + meal timing). Use simple language, not clinical jargon. Make it feel personal and specific to them.",
  "neurotransmitter": "Primary chemical target — e.g. Serotonin, Dopamine, GABA, Cortisol. Just the name and 2-3 words max.",
  "powerFoods": ["Food 1", "Food 2", "Food 3", "Food 4", "Food 5"],
  "science": "2-3 sentences. Explain in simple terms WHY these foods help — what specific nutrient does what in their brain. No jargon. Speak as if explaining to a smart friend.",
  "recipe": {
    "name": "A short, appealing recipe name",
    "description": "1-2 sentence recipe using the power foods. Quick to make. Specific."
  },
  "timing": "When exactly to eat this and why timing matters for their specific situation today. One concise sentence.",
  "avoid": ["Food to avoid 1", "Food to avoid 2", "Food to avoid 3"],
  "avoidReason": "One simple sentence explaining why these specific foods make their specific situation worse right now.",
  "note": "A warm, encouraging 2-3 sentence note written directly to them. Personal, specific to their exact combo of answers. Make them feel understood. End with something actionable."
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: err }) };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ prescription: data.content[0].text }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
