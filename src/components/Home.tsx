import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeSelector from './TimeSelector';
import TextInput from './TextInput';

export default function Home() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(5);
  const [customText, setCustomText] = useState('');
  const [showRealtime, setShowRealtime] = useState(true);

  const defaultText = `Historians use different types of sources to learn about the past depending upon the period of their study and the nature of their investigation. Last year for example, you read about the rulers of the Gupta dynasty and Harshavardhana. We will read about the following thousand years, from roughly 700 to 1750.`;

  const handleStart = () => {
    const testText = customText.trim() || defaultText;
    navigate('/test', { 
      state: { 
        time: selectedTime * 60,
        text: testText,
        showRealtime
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Typing Speed Test</h1>
        
        <TimeSelector 
          selectedTime={selectedTime} 
          onTimeSelect={setSelectedTime} 
        />
        
        <TextInput 
          customText={customText}
          showRealtime={showRealtime}
          onTextChange={setCustomText}
          onRealtimeToggle={() => setShowRealtime(!showRealtime)}
        />

        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-blue-900 via-purple-800 to-teal-500 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}