# 🧬 MOODFUEL — Mood-Driven Nutritional Prescription Platform

> *Feed Your Feelings. The first nutrition platform built around your emotional chemistry.*

---

## What Is MoodFuel?

MoodFuel is a neuroscience-backed nutrition platform with a radical twist: instead of tracking calories or macros, users select their **emotional state** and receive a personalized **Nutritional Prescription (Rx)** — detailing exactly which foods their brain chemistry needs to rebalance, and why.

Every prescription includes:
- 🧬 **Neurochemical analysis** — which neurotransmitter is involved
- 🌿 **5 Power Foods** — precisely chosen for your mood state
- 🚫 **Foods to avoid** — and the biochemical reason why
- 🍽️ **A quick recipe** using the power foods
- ⏰ **Optimal eating timing** — when to eat for maximum effect
- 💊 **A personalized prescription note**

---

## 🚀 Deploying to Netlify

### Step 1 — Connect Your Repository

```bash
# Upload this entire folder to GitHub/GitLab/Bitbucket
# Then connect the repo to Netlify
```

Or use Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 2 — Add Your Anthropic API Key

In your Netlify dashboard:

1. Go to **Site Settings → Environment Variables**
2. Add a new variable:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api...` *(your Anthropic API key)*
3. Click **Save** and **Redeploy**

Get your API key at: https://console.anthropic.com

### Step 3 — Live!

Once deployed with the API key, the **AI-powered prescription engine** will generate fully personalized, dynamic nutritional prescriptions via Claude.

Without the API key, the site still works beautifully using the built-in evidence-based fallback prescriptions.

---

## 📁 File Structure

```
moodfuel/
├── index.html                    # Complete single-page website
├── netlify.toml                  # Netlify build + function config
├── netlify/
│   └── functions/
│       └── rx.js                 # Serverless function (Claude API proxy)
└── README.md
```

---

## 🧠 The Science Behind MoodFuel

MoodFuel maps 8 emotional states to 4 primary neurochemical pathways:

| Mood State | Neurochemistry | Primary Nutrient Target |
|---|---|---|
| Low / Sad | ↓ Serotonin | Tryptophan + Complex Carbs |
| Stressed / Anxious | ↑ Cortisol | Magnesium + Omega-3 + Adaptogens |
| Tired / Brain Fog | ↓ Dopamine + ↓ ATP | Tyrosine + Choline + Nitrates |
| Frustrated | ↑ Adrenaline | GABA precursors + Anti-inflammatories |
| Calm | Optimal GABA | Probiotic + Microbiome maintenance |
| Happy | ↑ Dopamine | Phenylethylamine + Beet nitrates |
| Overwhelmed | ↑ Cortisol + ↓ Prefrontal | DHA + NGF + Adaptogens |
| Motivated | ↑ Dopamine + Norepinephrine | Choline + Nitrates + MCT |

---

## ⚙️ Technical Stack

- **Frontend:** Pure HTML5/CSS3/Vanilla JS (no framework)
- **Fonts:** Cormorant Garamond + Outfit + JetBrains Mono
- **Backend:** Netlify Functions (serverless Node.js)
- **AI:** Anthropic Claude (claude-opus-4-6)
- **Deploy:** Netlify (zero config)

---

## 💡 Design Philosophy

MoodFuel's aesthetic is **Biopunk Medical Luxury**:
- Deep space dark backgrounds with bioluminescent accents
- CRT scanline effects on the prescription card
- Animated ambient orbs (pure CSS)
- Cormorant Garamond for editorial elegance
- JetBrains Mono for scientific data
- Glass morphism cards with micro-animations

---

*© 2025 MoodFuel · Nutrition is information. Feed wisely.*
