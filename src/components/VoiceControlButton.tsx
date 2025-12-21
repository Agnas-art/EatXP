import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useState, useEffect } from "react";

interface VoiceControlButtonProps {
  onCommand?: (command: string) => void;
  className?: string;
}

export const VoiceControlButton = ({ onCommand, className = "" }: VoiceControlButtonProps) => {
  const { isListening, transcript, interimTranscript, error, isSupported, startListening, stopListening, resetTranscript } =
    useVoiceRecognition();
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (isListening) {
      setShowTranscript(true);
    }
  }, [isListening]);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
      setShowTranscript(false);
    } else {
      resetTranscript();
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`relative rounded-full p-3 font-semibold transition-all ${
          isListening
            ? "bg-primary text-primary-foreground shadow-lg animate-pulse"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      >
        <motion.div
          animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
        >
          {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </motion.div>

        {/* Listening indicator */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.3] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
      </motion.button>

      {/* Transcript display */}
      {showTranscript && (isListening || transcript || interimTranscript) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-xl p-3 min-w-[250px] shadow-lg z-50"
        >
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <>
              {transcript && (
                <p className="text-sm font-semibold text-foreground">{transcript}</p>
              )}
              {interimTranscript && (
                <p className="text-sm text-muted-foreground italic">{interimTranscript}</p>
              )}
              {!transcript && !interimTranscript && (
                <p className="text-sm text-muted-foreground">Listening...</p>
              )}
            </>
          )}
        </motion.div>
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs font-semibold whitespace-nowrap pointer-events-none"
      >
        {isListening ? "Listening..." : "Click to speak"}
      </motion.div>
    </div>
  );
};
