import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const TextToSpeech: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setIsVisible(false);
        return;
      }

      const text = selection.toString().trim();

      if (text.length > 0) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
          });
          setIsVisible(true);
        } catch {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.text-to-speech-button')) {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim().length === 0) {
          setIsVisible(false);
        }
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('click', handleClick);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = async (): Promise<void> => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const selection = window.getSelection();
    if (!selection) return;

    const text = selection.toString().trim();

    if (!text) return;

    // Stop previous speech if any
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Set language based on text (Uzbek, Russian, or English)
    let lang = 'uz-UZ';
    if (/[а-яА-ЯёЁ]/.test(text)) {
      lang = 'ru-RU';
    } else if (/[a-zA-Z]/.test(text)) {
      lang = 'en-US';
    }

    utterance.lang = lang;

    // Set voice for better accent
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) => {
      if (lang === 'uz-UZ') {
        // Try to find Turkish or Russian voice as they might work better for Uzbek
        return (
          voice.lang.startsWith('tr-') || voice.lang.startsWith('ru-') || voice.lang.includes('uz')
        );
      } else if (lang === 'ru-RU') {
        return voice.lang.startsWith('ru-');
      } else if (lang === 'en-US') {
        return voice.lang.startsWith('en-');
      }
      return false;
    });

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Adjust speech parameters for better accent
    utterance.pitch = 1.0; // Normal pitch
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.volume = 1.0; // Full volume

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;

    // Wait for voices to load if needed
    if (voices.length === 0) {
      const handleVoicesChanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        const voice = updatedVoices.find((v) => {
          if (lang === 'uz-UZ') {
            return v.lang.startsWith('tr-') || v.lang.startsWith('ru-') || v.lang.includes('uz');
          } else if (lang === 'ru-RU') {
            return v.lang.startsWith('ru-');
          } else if (lang === 'en-US') {
            return v.lang.startsWith('en-');
          }
          return false;
        });
        if (voice) {
          utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={speakText}
      className="text-to-speech-button fixed z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
      aria-label="Read selected text"
      title="Matnni o'qish"
    >
      {isSpeaking ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      )}
    </button>
  );
};

export default TextToSpeech;
