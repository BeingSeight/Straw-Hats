'use client';

import React from 'react';
import Chatbot from '@/components/ChatBot';
import { LiquidChrome } from '@/background/LiquidChrome/LiquidChrome'; // Adjust path if necessary
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* LiquidChrome background positioned absolutely */}
      <LiquidChrome className="absolute inset-0 z-0" />

      
      
      {/* Content area where the Chatbot is rendered */}
      <div className="relative z-10 flex items-center justify-center p-4">
        <Chatbot />
      </div>
    </div>
  );
}
