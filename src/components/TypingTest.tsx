import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import clsx from 'clsx';

export default function TypingTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { time, text, showRealtime } = location.state || { time: 300, text: '', showRealtime: true };
  
  const [timeLeft, setTimeLeft] = useState(time);
  const [started, setStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [started, timeLeft]);

  const handleStart = () => {
    if (!started) {
      startTime.current = Date.now();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!started) {
      setStarted(true);
      startTime.current = Date.now();
    }
    setUserInput(e.target.value);
  };

  const handleComplete = () => {
    const endTime = Date.now();
    const elapsedTimeInMinutes = ((endTime - (startTime.current || endTime)) / 1000 / 60);
    const words = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(words / elapsedTimeInMinutes);
    const accuracy = calculateAccuracy();
    
    navigate('/results', { 
      state: { 
        wpm,
        accuracy,
        originalText: text,
        typedText: userInput,
        timeTaken: time - timeLeft,
        totalTime: time
      }
    });
  };

  const calculateAccuracy = () => {
    const inputWords = userInput.trim().split(/\s+/);
    const originalWords = text.substring(0, userInput.length).trim().split(/\s+/);
    let correct = 0;

    inputWords.forEach((word, i) => {
      if (word === originalWords[i]) correct++;
    });

    return Math.round((correct / originalWords.length) * 100);
  };

  const renderText = () => {
    if (!showRealtime) {
      return <div className="typing-text text-gray-900">{text}</div>;
    }

    const typed = userInput.split('');
    return text.split('').map((char, i) => {
      const isTyped = i < typed.length;
      const isCorrect = isTyped && typed[i] === char;
      const color = !isTyped ? 'text-gray-400' : isCorrect ? 'text-gray-900' : 'text-red-500';
      return <span key={i} className={`typing-text ${color}`}>{char}</span>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-navy-900 text-white p-6 rounded-lg mb-6 text-center">
        <div className="text-2xl font-bold">Time Left</div>
        <div className="text-4xl font-mono">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6 typing-text text-xl leading-relaxed bg-gray-50 p-6 rounded-lg h-48 overflow-y-auto">
          {renderText()}
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          onFocus={handleStart}
          className="w-full h-40 p-4 border rounded-lg font-sans text-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start typing to begin the test..."
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={handleComplete}
            className="px-6 py-3 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}