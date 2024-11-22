import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
  customText: string;
  showRealtime: boolean;
  onTextChange: (text: string) => void;
  onRealtimeToggle: () => void;
}

export default function TextInput({ 
  customText, 
  showRealtime, 
  onTextChange, 
  onRealtimeToggle 
}: TextInputProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Custom Text (Optional)</h2>
        <button
          onClick={onRealtimeToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {showRealtime ? (
            <>
              <Eye className="w-4 h-4" />
              <span>Real-time Feedback On</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Real-time Feedback Off</span>
            </>
          )}
        </button>
      </div>
      <textarea
        value={customText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste your custom text here or use our default text..."
        className="w-full h-40 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-lg"
      />
    </div>
  );
}