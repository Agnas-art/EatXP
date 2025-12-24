# Floating Voice Bot AI Integration Guide

The new Floating Voice Bot supports multiple AI backends: ChatGPT and Copilot. This guide shows you how to set them up.

## Setup

### 1. ChatGPT (OpenAI API)

To use ChatGPT as your AI backend:

1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to your `.env` file:

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

### 2. Copilot (Azure OpenAI API)

To use Copilot (via Azure OpenAI):

1. Create an Azure OpenAI resource at [Azure Portal](https://portal.azure.com/)
2. Deploy a GPT-3.5 Turbo model
3. Get your API key and endpoint
4. Add to your `.env` file:

```env
VITE_AZURE_OPENAI_KEY=your-azure-key
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
```

## Features

### Floating Voice Bot
- **Pop-up Interface**: Appears on all pages as a floating button
- **Voice Input**: Click the mic button to speak
- **AI Responses**: Get instant responses powered by ChatGPT or Copilot
- **Conversation History**: The bot remembers your previous messages
- **Minimizable**: Collapse the bot when not needed
- **AI Source Toggle**: Switch between ChatGPT and Copilot in real-time

### Anime Character Follower
- **Dynamic Character**: 3D character follows your cursor based on selected anime
- **Character Color Theme**: Changes color based on your anime character choice
- **Responsive**: Only shows on larger screens (hidden on mobile)
- **Interactive**: Displays character name on hover

## Usage

### In Your App
The FloatingVoiceBot and AnimeCharacterFollower are automatically added to all pages.

The bot will:
1. Use the user's selected anime character
2. Remember conversation context across messages
3. Fall back to local responses if API keys aren't configured
4. Support multiple languages based on your i18n settings

### Conversation Context
The bot maintains conversation history and uses it to provide better responses. It remembers:
- Previous questions and answers
- Context about what was discussed
- The flow of conversation

### Fallback Behavior
If API keys aren't configured, the bot will automatically:
- Use local keyword-based responses
- Still support voice input and text
- Display encouragement messages about food and nutrition

## Without API Keys

The bot works without any API keys! It includes a smart fallback system with:
- 20+ food-related responses
- General encouragement messages
- Full voice recognition support

However, responses will be limited to pre-defined answers about nutrition and cooking.

## Testing

1. Start the app
2. You'll see a floating button in the bottom right corner
3. Click it to open the voice bot
4. Try speaking or typing a question
5. Toggle between ChatGPT and Copilot (if keys are configured)
6. Watch the anime character follow your cursor

## Troubleshooting

**Bot isn't responding:**
- Check browser console for errors
- Verify API keys are correct (if using ChatGPT/Copilot)
- Make sure microphone permissions are granted

**Character follower not showing:**
- Only visible on screens wider than 1024px (lg breakpoint)
- Try moving your mouse around the page

**Voice input not working:**
- Check that you've granted microphone permissions
- Try refreshing the page
- Use a browser that supports Web Speech API (Chrome, Edge, Safari)

## API Costs

- **OpenAI (ChatGPT)**: ~$0.0015 per conversation turn
- **Azure OpenAI (Copilot)**: Similar pricing, varies by region
- **Local Fallback**: Free, no API costs

Start with the free fallback responses and upgrade to paid AI only if needed!
