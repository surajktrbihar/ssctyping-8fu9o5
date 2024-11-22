import React from 'react';
import { Youtube, MessageCircle, Twitter, Instagram } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-purple-800 to-teal-500 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="text-white">
            <div className="text-sm opacity-80">Hello</div>
            <div className="font-semibold">TypingPortal</div>
          </div>
        </div>
        <div className="flex gap-4">
          <Youtube className="w-6 h-6 text-white cursor-pointer hover:text-red-400 transition-colors" />
          <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
          <Twitter className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
          <Instagram className="w-6 h-6 text-white cursor-pointer hover:text-pink-400 transition-colors" />
        </div>
      </div>
    </div>
  );
}