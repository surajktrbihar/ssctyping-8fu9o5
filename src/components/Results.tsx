import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Home, Clock } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    wpm, 
    accuracy, 
    originalText, 
    typedText, 
    timeTaken,
    totalTime
  } = location.state || {};

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Test Results</h2>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-lg text-center">
            <div className="text-sm text-blue-600 mb-2">Words per Minute</div>
            <div className="text-4xl font-bold text-blue-900">{wpm}</div>
          </div>
          
          <div className="p-6 bg-green-50 rounded-lg text-center">
            <div className="text-sm text-green-600 mb-2">Accuracy</div>
            <div className="text-4xl font-bold text-green-900">{accuracy}%</div>
          </div>

          <div className="p-6 bg-purple-50 rounded-lg text-center">
            <div className="text-sm text-purple-600 mb-2">Time Used</div>
            <div className="text-4xl font-bold text-purple-900 flex items-center justify-center gap-2">
              <Clock className="w-6 h-6" />
              {formatTime(timeTaken)}
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Original Text</h3>
            <div className="typing-text text-lg leading-relaxed text-gray-900">
              {originalText}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Typed Text</h3>
            <div className="typing-text text-lg leading-relaxed">
              {typedText.split('').map((char, i) => (
                <span 
                  key={i} 
                  className={originalText[i] === char ? 'text-gray-900' : 'text-red-500'}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            onClick={() => navigate('/test', { state: location.state })}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}