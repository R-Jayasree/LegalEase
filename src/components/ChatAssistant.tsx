import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, User, Bot, FileText } from 'lucide-react';
import { ChatMessage } from '../types';
import { mockChatResponses } from '../utils/aiMockData';

interface ChatAssistantProps {
  documentName?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ documentName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI legal assistant. I've analyzed your document${documentName ? ` "${documentName}"` : ''} and I'm ready to help you understand any part of it. You can ask me questions like:

• "What are the penalties if I cancel early?"
• "Can my landlord increase rent without notice?"
• "What are my maintenance responsibilities?"
• "Are there any hidden fees I should know about?"

What would you like to know?`,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const query = inputMessage.toLowerCase();
      let response = mockChatResponses.default;
      
      // Enhanced keyword matching for better responses
      if (query.includes('penalty') || query.includes('cancel') || query.includes('break') || query.includes('early') || query.includes('terminate')) {
        response = mockChatResponses.penalties;
      } else if ((query.includes('rent') && query.includes('increase')) || query.includes('raise rent')) {
        response = mockChatResponses['rent increase'];
      } else if (query.includes('late') || (query.includes('payment') && (query.includes('fee') || query.includes('penalty')))) {
        response = mockChatResponses['late payment'];
      } else if (query.includes('maintenance') || query.includes('repair') || query.includes('fix')) {
        response = mockChatResponses.maintenance;
      } else if (query.includes('security deposit') || query.includes('deposit')) {
        response = mockChatResponses['security deposit'];
      } else if (query.includes('termination') || query.includes('end lease') || query.includes('move out')) {
        response = mockChatResponses.termination;
      } else if (query.includes('fees') || query.includes('charges') || query.includes('cost')) {
        response = mockChatResponses.fees;
      } else if (query.includes('obligation') || query.includes('responsibility') || query.includes('duties')) {
        response = mockChatResponses.obligations;
      } else if (query.includes('rights') || query.includes('protection') || query.includes('what can')) {
        response = mockChatResponses.rights;
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const suggestedQuestions = [
    "What happens if I break the lease early?",
    "Can my landlord increase rent without notice?",
    "What are the late payment fees?",
    "What are my maintenance responsibilities?",
    "What fees should I know about?",
    "What are my rights as a tenant?",
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">Legal Assistant</h3>
            <p className="text-blue-100 text-sm">Ask me anything about your document</p>
          </div>
          {documentName && (
            <div className="ml-auto flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
              <FileText className="w-4 h-4" />
              <span className="text-sm truncate max-w-32">{documentName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              
              <div className={`rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-900'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-3">Suggested questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="text-left text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 p-2 rounded-lg transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about your document..."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;