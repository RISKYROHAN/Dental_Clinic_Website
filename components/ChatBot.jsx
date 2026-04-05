"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const { messages, append, sendMessage, isLoading } = useChat();
  
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const txt = localInput.trim();
    if (!txt) return;
    
    // Safely support different versions of the AI SDK
    if (append) {
      append({ role: 'user', content: txt });
    } else if (sendMessage) {
      sendMessage({ role: 'user', content: txt });
    }
    
    setLocalInput("");
  };
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom smoothly
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 flex flex-col overflow-hidden transition-all">
          
          {/* Header */}
          <div className="bg-teal-600 p-4 text-white flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex justify-center items-center font-bold font-heading shadow-md">DC</div>
              <div>
                <h3 className="font-bold">Clinic Assistant</h3>
                <p className="text-teal-100 text-xs">Powered by AI</p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-teal-100 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-96 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 my-auto text-sm">
                <p>Hello! I am the Digital Clinic assistant.</p>
                <p>How can I help you today?</p>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  m.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm whitespace-pre-wrap'
                }`}>
                  <p className="text-sm">
                    {m.content || (m.parts ? m.parts.map(p => p.text || '').join('') : '') || JSON.stringify(m)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                 <div className="max-w-[85%] bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-full outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !localInput.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition-colors flex items-center justify-center shadow-lg shadow-teal-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 lg:p-5 rounded-full shadow-2xl shadow-teal-600/40 flex items-center justify-center transition-all hover:scale-110 animate-bounce hover:animate-none"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
