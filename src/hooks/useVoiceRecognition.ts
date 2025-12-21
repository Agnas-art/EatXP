import { useState, useCallback, useEffect } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface Window {
  webkitSpeechRecognition?: typeof SpeechRecognition;
  SpeechRecognition?: typeof SpeechRecognition;
}

export interface VoiceCommand {
  command: string;
  action: () => void;
  keywords: string[];
}

export const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as Window).webkitSpeechRecognition || (window as Window).SpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech Recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
      setInterimTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcriptSegment + ' ';
        } else {
          interim += transcriptSegment;
        }
      }

      setInterimTranscript(interim);
      if (final) {
        setTranscript((prev) => prev + final);
      }
    };

    recognition.onerror = (event: any) => {
      setError(`Error: ${event.error}`);
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognitionInstance(recognition);

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionInstance && isSupported) {
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      recognitionInstance.start();
    }
  }, [recognitionInstance, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionInstance) {
      recognitionInstance.stop();
    }
  }, [recognitionInstance]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  const processCommand = useCallback((commands: VoiceCommand[]): VoiceCommand | null => {
    const voiceInput = (transcript + interimTranscript).toLowerCase().trim();

    for (const cmd of commands) {
      for (const keyword of cmd.keywords) {
        if (voiceInput.includes(keyword.toLowerCase())) {
          return cmd;
        }
      }
    }

    return null;
  }, [transcript, interimTranscript]);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    processCommand,
    fullTranscript: transcript + interimTranscript,
  };
};

// Predefined voice commands for the app
export const VOICE_COMMANDS = {
  playGames: {
    command: 'play-games',
    keywords: ['play games', 'games', 'let me play'],
    action: () => {},
  },
  readComics: {
    command: 'read-comics',
    keywords: ['read comics', 'comics', 'story', 'stories'],
    action: () => {},
  },
  learMore: {
    command: 'learn-more',
    keywords: ['learn more', 'tell me more', 'more info'],
    action: () => {},
  },
  goHome: {
    command: 'go-home',
    keywords: ['go home', 'home', 'back home'],
    action: () => {},
  },
  changeTheme: {
    command: 'change-theme',
    keywords: ['change theme', 'switch theme', 'different theme'],
    action: () => {},
  },
};
