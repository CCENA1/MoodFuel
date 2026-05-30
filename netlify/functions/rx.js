exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { mood, symptoms, goal } = JSON.parse(event.body);

    const prompt = `You are the MOODFUEL AI Nutritionist — a world-class dietician specializing in psychonutrition: the neuroscience of food and mood.

A user is reporting their current state:
- Mood: ${mood}
- Physical/Mental symptoms: ${symptoms && symptoms.length > 0 ? symptoms.join(', ') : 'None specified'}
- Goal: ${goal || 'General wellbeing'}

Generate a precise, science-backed nutritional prescription. Be specific, warm, and medically grounded. Respond ONLY with a valid JSON object — no markdown, no backticks, no preamble:

{
  "analysis": "2-3 sentences analyzing their neurochemical state. Name the specific neurotransmitter or hormone involved (serotonin, dopamine, cortisol, GABA, etc.) and explain what this mood state signals biochemically.",
  "neurotransmitter": "Primary neurotransmitter target (e.g. Serotonin, Dopamine, GABA, Cortisol)",
  "powerFoods": ["Specific Food 1", "Specific Food 2", "Specific Food 3", "Specific Food 4", "Specific Food 5"],
  "science": "2-3 sentences on the exact biochemical mechanism — why these specific foods address this mood. Include the specific nutrient (e.g. tryptophan, tyrosine, magnesium, omega-3) and what it does.",
  "recipe": {
    "name": "A specific, appealing recipe name using the power foods",
    "description": "1-2 sentence recipe description with key ingredients and how to make it quickly"
  },
  "timing": "When to eat this — morning, before bed, immediately, etc. and why timing matters for this mood state",
  "avoid": ["Specific food to avoid 1", "Specific food to avoid 2", "Specific food to avoid 3"],
  "avoidReason": "Brief explanation of why these foods make this specific mood worse",
  "note": "A warm, empowering prescription note written in second person from the dietician. Personal, specific to their mood, and encouraging. 2-3 sentences."
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
      console.error('Anthropic API error:', err);
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'API error', detail: err }),
      };
    }

    const data = await response.json();
    const prescription = data.content[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ prescription }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
