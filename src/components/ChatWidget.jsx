import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, MoreVertical, Trash2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_INSTRUCTION } from '../data/tewoyeiPrompt';

const QUICK_REPLIES = [
  "Who is TEWOYEI?",
  "What programs do you run?",
  "How can I volunteer?",
  "How do I contact you?",
  "Where are you located?"
];

// Simple markdown parser for basic formatting
const renderMarkdown = (text) => {
  if (!text) return null;
  
  // Format bold text (**text**)
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format links ([text](url)) - ensuring they open in new tab
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-200 underline hover:text-white">$1</a>');
  
  // Format bullet points (* or - )
  html = html.replace(/^[\s]*[-*][\s]+(.*)/gm, '<li>$1</li>');
  // Wrap consecutive list items in <ul>
  html = html.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul class="list-disc pl-4 my-2">$1</ul>');
  
  // Format line breaks
  html = html.replace(/\n/g, '<br />');
  
  return <div dangerouslySetInnerHTML={{ __html: html }} className="prose prose-sm prose-invert max-w-none" />;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Load chat history from session storage on mount
  useEffect(() => {
    const savedChat = sessionStorage.getItem('tewoyei_chat_history');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
      setHasUnread(false);
    } else {
      // First load greeting
      setMessages([
        {
          role: 'model',
          text: "Hello! I am the official TEWOYEI assistant. How can I help you today?"
        }
      ]);
    }
  }, []);

  // Save chat history to session storage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('tewoyei_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWindowRef.current && 
        !chatWindowRef.current.contains(event.target) &&
        !event.target.closest('#chat-toggle-button')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'model', text: "Hello! I am the official TEWOYEI assistant. How can I help you today?" }]);
    sessionStorage.removeItem('tewoyei_chat_history');
    setShowMenu(false);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      // Format history for Gemini API
      const contents = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      
      // Append the new user message
      contents.push({
        role: 'user',
        parts: [{ text }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 500,
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch response");
      }

      const botReply = data.candidates[0].content.parts[0].text;
      
      setMessages((prev) => [...prev, { role: 'model', text: botReply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "Sorry, I'm having trouble connecting right now — you can also reach us on [WhatsApp](https://wa.me/256777676436).",
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
        <button
          id="chat-toggle-button"
          onClick={toggleChat}
          aria-label={isOpen ? "Close TEWOYEI chat assistant" : "Open TEWOYEI chat assistant"}
          className="relative flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-br from-[#E30B7B] to-[#b30861] text-white shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#E30B7B]/50"
        >
          {/* Subtle pulse animation */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#E30B7B] animation-delay-2000" style={{ animationDuration: '4s' }}></div>
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={28} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread dot indicator */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full bg-[#F5C518] ring-2 ring-white shadow-sm"></span>
          )}
        </button>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={chatWindowRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-0 left-0 w-full h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-120px)] sm:w-[380px] sm:absolute sm:bottom-20 sm:left-auto sm:right-0 bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 z-[9999]"
              role="dialog"
              aria-label="TEWOYEI Assistant Chat Window"
            >
              {/* Header */}
              <div className="bg-[#E30B7B] text-white p-4 flex items-center justify-between shadow-sm relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#E30B7B] flex items-center justify-center font-bold text-sm shadow-inner">
                    TW
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">TEWOYEI Assistant</h3>
                    <div className="flex items-center text-xs text-white/80">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-1.5 animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 relative">
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Options"
                  >
                    <MoreVertical size={20} />
                  </button>
                  <button 
                    onClick={toggleChat}
                    className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors sm:hidden"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute top-full right-0 mt-1 w-36 bg-white rounded-md shadow-lg overflow-hidden border border-gray-100 z-20">
                      <button 
                        onClick={clearChat}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Trash2 size={16} className="text-gray-500" />
                        <span>Clear chat</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Body */}
              <div 
                className="flex-1 overflow-y-auto p-4 bg-[#F7F5F2] flex flex-col space-y-4"
                aria-live="polite"
              >
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'model' && (
                      <div className="w-8 h-8 rounded-full bg-[#E30B7B] text-white flex items-center justify-center flex-shrink-0 mr-2 mt-auto">
                        <Bot size={16} />
                      </div>
                    )}
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-[#E30B7B] text-white rounded-br-none' 
                          : msg.isError 
                            ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-none'
                            : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'
                      }`}
                    >
                      {msg.role === 'user' ? msg.text : renderMarkdown(msg.text)}
                    </div>
                  </div>
                ))}

                {/* Quick Replies (only show if no user messages yet) */}
                {messages.length === 1 && !isLoading && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {QUICK_REPLIES.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(reply)}
                        className="text-xs px-3 py-1.5 bg-white border border-[#E30B7B]/30 text-[#E30B7B] rounded-full hover:bg-[#E30B7B] hover:text-white transition-colors shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#E30B7B] text-white flex items-center justify-center flex-shrink-0 mr-2 mt-auto">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3.5 shadow-sm border border-gray-100 flex space-x-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex items-end bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-[#E30B7B]/30 focus-within:border-[#E30B7B]/50 transition-all">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-4 text-sm text-gray-800"
                    rows="1"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="p-3 text-[#E30B7B] disabled:text-gray-400 hover:text-[#b30861] transition-colors"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-gray-400">Powered by Gemini AI</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatWidget;
