'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  error?: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Keywords for cloth/measurement related queries
  const allowedKeywords = [
    "cloth",
    "clothing",
    "measurement",
    "size",
    "fit",
    "fabric",
    "material",
    "shoulder",
    "chest",
    "waist",
  ];

  const isQueryRelevant = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return allowedKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const currentTimestamp = new Date().toISOString();
    setIsLoading(true);

    // Check if the query is relevant
    if (!isQueryRelevant(input)) {
      const irrelevantMessage: Message = {
        sender: 'bot',
        text: "I'm sorry, I can only answer questions related to clothing and measurements. Please ask me something related to that.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: input, timestamp: currentTimestamp },
        irrelevantMessage,
      ]);
      setInput('');
      setIsLoading(false);
      return;
    }

    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: currentTimestamp,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/gemini-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError('Received non-JSON response from server');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = {
        sender: 'bot',
        text: data.reply,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        sender: 'bot',
        text: `Sorry, I encountered an error: ${(error as Error).message}`,
        timestamp: new Date().toISOString(),
        error: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/40 text-white backdrop-blur-sm rounded-lg shadow-lg border border-white/10">
      <div className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={cn(
                'max-w-[70%] rounded-lg p-3',
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : msg.error
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              )}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
              <span className="text-xs opacity-75 block mt-1">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-gray-800 dark:text-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-white/20 p-4">
        <div className="flex space-x-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none text-white bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || input.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
