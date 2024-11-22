import React from 'react';
import clsx from 'clsx';

interface TimeSelectorProps {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
}

export default function TimeSelector({ selectedTime, onTimeSelect }: TimeSelectorProps) {
  const times = [5, 10, 15, 20];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Select Time Duration</h2>
      <div className="grid grid-cols-4 gap-4">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={clsx(
              'py-3 rounded-lg transition-all transform hover:scale-105',
              selectedTime === time
                ? 'bg-gradient-to-r from-blue-900 via-purple-800 to-teal-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            )}
          >
            {time} min
          </button>
        ))}
      </div>
    </div>
  );
}