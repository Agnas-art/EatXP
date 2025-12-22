import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceBot } from "@/components/VoiceBot";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FeaturesDemo() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      {/* Header with Language Selector */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🎉 {t("app_name")} Features Demo
            </h1>
            <p className="text-gray-600">
              Try the new language support and voice bot features!
            </p>
          </div>
          <LanguageSelector />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Language Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              🌍 Multi-Language Support
            </h2>
            <p className="text-gray-700 mb-4">
              EatXP now supports 9 languages!
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ English</li>
              <li>✅ Spanish</li>
              <li>✅ French</li>
              <li>✅ Japanese</li>
              <li>✅ Hindi (हिंदी)</li>
              <li>✅ Bengali (বাংলা)</li>
              <li>✅ Tamil (தமிழ்)</li>
              <li>✅ Telugu (తెలుగు)</li>
              <li>✅ Marathi (मराठी)</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              Your preference is saved automatically!
            </p>
          </div>

          {/* Voice Bot Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              🎤 Voice Bot Assistant
            </h2>
            <p className="text-gray-700 mb-4">
              Talk to EatXP using voice commands in any language!
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🎤 Speech Recognition</li>
              <li>📢 Text-to-Speech Response</li>
              <li>🌐 Multi-language Support</li>
              <li>💬 Interactive UI</li>
              <li>⚡ Real-time Processing</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              Grant microphone permission to use voice features
            </p>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              ✨ What's New
            </h2>
            <p className="text-gray-700 mb-4">
              {t("app_name")} has been upgraded with incredible new features!
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ 9 Language Support</li>
              <li>✅ Voice Recognition</li>
              <li>✅ Speech Synthesis</li>
              <li>✅ Persistent Settings</li>
              <li>✅ Browser Auto-detect</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              Built with React, i18next, and Web Speech API
            </p>
          </div>
        </div>

        {/* Voice Bot Demo Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Try the Voice Bot Below 👇
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Try speaking in {t("common.language")} - Click the microphone button!
          </p>
          
          <div className="flex justify-center">
            <VoiceBot />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">How to Use:</h3>
          <ol className="space-y-3 text-blue-800">
            <li>
              <strong>1. Change Language:</strong> Use the language dropdown at the top right to switch between 9 supported languages
            </li>
            <li>
              <strong>2. Try Voice Bot:</strong> Click the "Click to speak" button and say something like "apple", "recipe", "food", etc.
            </li>
            <li>
              <strong>3. Enjoy Response:</strong> The bot will listen to you, process your input, and respond with voice!
            </li>
            <li>
              <strong>4. Multi-language:</strong> The voice bot automatically adjusts to your selected language
            </li>
          </ol>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            ← Back to Main App
          </Button>
        </div>
      </div>
    </div>
  );
}
