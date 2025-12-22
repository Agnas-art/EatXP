# VoiceBot AI Setup Guide

The VoiceBot in EatXP can be connected to **Groq**, a free AI service that provides fast and intelligent responses.

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free Groq API Key

1. Go to **https://console.groq.com** (free signup)
2. Sign up with your email
3. Navigate to **API Keys** section
4. Click **Create New API Key**
5. Copy your API key

### Step 2: Add API Key to Your App

1. Open `.env.local` file in the project root
2. Find the line: `VITE_GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE`
3. Replace `YOUR_GROQ_API_KEY_HERE` with your actual API key

Example:
```
VITE_GROQ_API_KEY=gsk_abc123xyz456def789...
```

### Step 3: Restart the Dev Server

1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev`
3. The VoiceBot will now use AI!

## ✨ Features

- **Free Tier**: Groq offers a generous free tier (no credit card required)
- **Fast Responses**: Mixtral-8x7b model is one of the fastest
- **Multilingual**: Works with all 9 languages in EatXP
- **Child-Safe**: System prompt ensures educational and safe responses about food

## 🎤 How to Use

1. Click the **🎤 Voice Bot** button on the home page
2. Click the **microphone** icon to start speaking
3. Ask any question about food, recipes, or nutrition
4. The AI will respond and speak the answer aloud

## 📝 Example Questions

- "What are the benefits of eating vegetables?"
- "How do I make a healthy smoothie?"
- "What's in a balanced diet?"
- "Tell me about protein"
- "Why is water important?"

## 🔧 Troubleshooting

**Bot gives generic responses:**
- Check your API key is correct in `.env.local`
- Make sure you've restarted the dev server
- Check browser console (F12) for errors

**"API key not set" message:**
- You haven't added the Groq API key to `.env.local`
- Add your key and restart the server

**Network errors:**
- Check your internet connection
- Ensure your Groq API key has sufficient quota
- Visit https://console.groq.com to check usage

## 💡 Free Alternatives

If Groq doesn't work for you, other free AI options:
- **Hugging Face**: https://huggingface.co (free inference API)
- **Together AI**: https://www.together.ai (free credits)
- **Local Ollama**: https://ollama.ai (runs locally on your computer)

## 🔐 Security Note

- Your API key is only used client-side
- Requests go directly from your browser to Groq
- Never commit `.env.local` to version control
- Keep your API key private

---

Happy learning with EatXP's AI VoiceBot! 🎓
