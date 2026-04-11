// controllers/aiController.js
// Generates structured AI itineraries using user input + places from MongoDB.

const Place = require('../models/Place');

const planCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;
const DEFAULT_PLACES = [
  { title: 'Hawa Mahal', city: 'Jaipur', state: 'Rajasthan' },
  { title: 'Amber Fort', city: 'Jaipur', state: 'Rajasthan' },
  { title: 'Taj Mahal', city: 'Agra', state: 'Uttar Pradesh' },
  { title: 'Gateway of India', city: 'Mumbai', state: 'Maharashtra' },
  { title: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra' },
  { title: 'Mysore Palace', city: 'Mysuru', state: 'Karnataka' },
  { title: 'Meenakshi Temple', city: 'Madurai', state: 'Tamil Nadu' },
  { title: 'Dal Lake', city: 'Srinagar', state: 'Jammu and Kashmir' }
];

function normalize(value) {
  return String(value || '').trim();
}

function cacheKey(userId, payload) {
  return `${userId}::${payload.destination.toLowerCase()}::${payload.days}::${payload.budget}::${payload.travelType}`;
}

function readCache(key) {
  const item = planCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    planCache.delete(key);
    return null;
  }
  return item.value;
}

function writeCache(key, value) {
  planCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS
  });
}

function extractJson(text) {
  const trimmed = String(text || '').trim();
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      throw new Error('AI response is not valid JSON');
    }
    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function sanitizePlan(raw, expectedDays, destination) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.days)) {
    throw new Error('AI response shape is invalid');
  }

  const safeDays = raw.days
    .slice(0, expectedDays)
    .map((d, idx) => ({
      day: Number(d?.day) || idx + 1,
      title: String(d?.title || `Day ${idx + 1}`).slice(0, 120),
      activities: Array.isArray(d?.activities)
        ? d.activities
            .map((a) => String(a).trim())
            .filter(Boolean)
            .slice(0, 6)
        : []
    }))
    .filter((d) => d.activities.length > 0);

  if (!safeDays.length) {
    throw new Error('AI returned an empty itinerary');
  }

  return {
    destination,
    days: safeDays
  };
}

function buildRegexFromDestination(destination) {
  const segments = destination
    .split(/[,+]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (!segments.length) return null;

  const escaped = segments.map((segment) => segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(escaped.join('|'), 'i');
}

async function fetchRelevantPlaces(destination, days) {
  const destinationRegex = buildRegexFromDestination(destination);

  const filter = destinationRegex
    ? {
        $or: [
          { city: destinationRegex },
          { state: destinationRegex },
          { title: destinationRegex },
          { description: destinationRegex }
        ]
      }
    : {};

  // Keep this query lean and bounded for fast AI requests.
  const limit = Math.max(8, Math.min(24, days * 4));
  const places = await Place.find(filter)
    .select('title city state description averageRating totalReviews')
    .sort({ totalReviews: -1, averageRating: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  return places;
}

const axios = require("axios");

async function callAiModel({ destination, days, budget, travelType, places }) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is missing in environment');
  }

  const knownPlaces = places.map((p) => ({
    title: p.title,
    city: p.city,
    state: p.state
  }));

  const prompt = `
Create a ${days}-day travel itinerary for ${destination} in India.

Travel type: ${travelType}
Budget: ${budget}

Use ONLY these places:
${knownPlaces.map(p => `${p.title} (${p.city})`).join(", ")}

Return ONLY JSON in this format:
{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "title": "string",
      "activities": ["string"]
    }
  ]
}
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    return extractJson(content);

  } catch (err) {
    const providerMessage =
      err?.response?.data?.error?.message ||
      err?.response?.data?.message ||
      err.message ||
      'Unknown provider error';

    console.error("Groq AI Error:", err.response?.data || err.message);
    throw new Error(`AI provider error: ${providerMessage}`);
  }
}

const generateTripPlan = async (req, res) => {
  try {
    const destination = normalize(req.body.destination);
    const days = Number(req.body.days);
    const budget = normalize(req.body.budget).toLowerCase();
    const travelType = normalize(req.body.travelType).toLowerCase();
    const regenerate = Boolean(req.body.regenerate);

    const validBudgets = ['low', 'medium', 'high'];
    const validTravelTypes = ['adventure', 'cultural', 'relaxation', 'mixed'];

    if (!destination) {
      return res.status(400).json({ message: 'Destination is required' });
    }

    if (!Number.isInteger(days) || days < 2 || days > 7) {
      return res.status(400).json({ message: 'Days must be an integer between 2 and 7' });
    }

    if (!validBudgets.includes(budget)) {
      return res.status(400).json({ message: 'Budget must be low, medium, or high' });
    }

    if (!validTravelTypes.includes(travelType)) {
      return res.status(400).json({ message: 'Travel type must be adventure, cultural, relaxation, or mixed' });
    }

    const userId = req.user.id;
    const key = cacheKey(userId, { destination, days, budget, travelType });
    const cached = regenerate ? null : readCache(key);

    if (cached) {
      return res.json({
        success: true,
        source: 'cache',
        matchedPlaces: cached.matchedPlaces,
        plan: cached.plan
      });
    }

    let places = await fetchRelevantPlaces(destination, days);
    let usedFallbackPlaces = false;

    // If destination-specific matches are missing, fall back to top known places
    // so the planner still returns a useful result instead of a blank experience.
    if (!places.length) {
      places = await Place.find({})
        .select('title city state description averageRating totalReviews')
        .sort({ totalReviews: -1, averageRating: -1, createdAt: -1 })
        .limit(12)
        .lean();
      usedFallbackPlaces = places.length > 0;
    }

    if (!places.length) {
      places = DEFAULT_PLACES;
      usedFallbackPlaces = true;
    }

    const aiRaw = await callAiModel({ destination, days, budget, travelType, places });
    const plan = sanitizePlan(aiRaw, days, destination);

    const matchedPlaces = places.map((p) => ({
      title: p.title,
      city: p.city,
      state: p.state
    }));

    writeCache(key, {
      matchedPlaces,
      plan
    });

    return res.json({
      success: true,
      source: 'ai',
      matchedPlaces,
      note: usedFallbackPlaces
        ? 'No exact city match found or database is empty. Generated itinerary using fallback places.'
        : undefined,
      plan
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ message: 'AI request timed out, please try again' });
    }

    if (String(err.message || '').includes('GROQ_API_KEY is missing')) {
      return res.status(500).json({
        message: 'AI provider is not configured. Set GROQ_API_KEY in backend/.env'
      });
    }

    if (String(err.message || '').startsWith('AI provider error')) {
      return res.status(502).json({ message: String(err.message || 'AI provider request failed') });
    }

    console.error('generateTripPlan error:', err.message);
    return res.status(500).json({ message: 'Failed to generate trip plan' });
  }
};

// Basic plain-text planner endpoint for simple frontend usage.
const generatePlan = async (req, res) => {
  try {
    const destination = String(req.body.destination || '').trim();
    const days = Number(req.body.days);

    if (!destination) {
      return res.status(400).json({ success: false, message: 'Destination is required' });
    }

    if (!Number.isInteger(days) || days < 1 || days > 14) {
      return res.status(400).json({ success: false, message: 'Days must be a valid number' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'AI provider is not configured. Set GROQ_API_KEY in backend/.env'
      });
    }

    const prompt = `Create a simple travel itinerary for ${destination} for ${days} days. Give day-wise plan with places to visit. Keep it short and clear.`;

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model,
          temperature: 0.3,
          max_tokens: 500,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful travel assistant focused only on Indian destinations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          timeout: 15000,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response?.data?.choices?.[0]?.message?.content) {
        return res.status(502).json({
          success: false,
          message: 'AI request failed: empty response'
        });
      }

      const plan = String(response.data.choices[0].message.content || '').trim();

      if (!plan) {
        return res.status(500).json({ success: false, message: 'Empty plan returned from AI' });
      }

      return res.json({
        success: true,
        plan
      });
    } catch (err) {
      const details =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err.message ||
        'Unknown AI provider error';

      return res.status(502).json({
        success: false,
        message: `AI provider request failed: ${details}`
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to generate plan'
    });
  }
};

module.exports = { generateTripPlan, generatePlan };
