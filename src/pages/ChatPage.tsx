import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ChatAssistant from '../components/ChatAssistant';
import { ArrowLeft } from 'lucide-react';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [documentName, setDocumentName] = useState<string>('');

  useEffect(() => {
    const content = localStorage.getItem('documentContent');
    const name = localStorage.getItem('documentName');
    
    if (!content) {
      navigate('/');
      return;
    }

    setDocumentName(name || 'Uploaded Document');
  }, [navigate]);

  return (
    <motion.div
      className="min-h-[calc(100vh-120px)] py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={() => navigate('/simplify')}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Analysis</span>
          </button>
          <div className="h-4 w-px bg-slate-300"></div>
          <h1 className="text-xl font-semibold text-slate-900">
            Legal Assistant Chat
          </h1>
        </div>

        {/* Chat Interface */}
        <ChatAssistant documentName={documentName} />
      </div>
    </motion.div>
  );
};

export default ChatPage;