import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DocumentViewer from '../components/DocumentViewer';
import DocumentSummary from '../components/DocumentSummary';
import { parseDocument } from '../utils/documentParser';
import { mockClauses } from '../utils/aiMockData';
import { generateDocumentSummary, DocumentSummary as DocumentSummaryType } from '../utils/documentSummary';
import { exportToText, downloadTextFile } from '../utils/exportUtils';
import { Clause } from '../types';
import { MessageSquare, Download, Share, FileText, BarChart3 } from 'lucide-react';

const SimplificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [summary, setSummary] = useState<DocumentSummaryType | null>(null);
  const [documentName, setDocumentName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses'>('summary');

  useEffect(() => {
    const content = localStorage.getItem('documentContent');
    const name = localStorage.getItem('documentName');
    
    if (!content) {
      navigate('/');
      return;
    }

    setDocumentName(name || 'Uploaded Document');
    
    // Simulate AI processing
    setTimeout(() => {
      const processedClauses = mockClauses;
      const documentSummary = generateDocumentSummary(processedClauses);
      
      setClauses(processedClauses);
      setSummary(documentSummary);
      setIsLoading(false);
    }, 2000);
  }, [navigate]);

  const handleExport = () => {
    if (!summary) return;
    
    const exportContent = exportToText(clauses, summary, documentName);
    const filename = `${documentName.replace(/\.[^/.]+$/, '')}_Analysis_${new Date().toISOString().split('T')[0]}.txt`;
    downloadTextFile(exportContent, filename);
  };
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Processing Document...</h2>
            <p className="text-slate-600">AI is analyzing and simplifying your legal document</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const riskCount = clauses.filter(c => c.category === 'risk').length;
  const obligationCount = clauses.filter(c => c.category === 'obligation').length;

  return (
    <div className="min-h-[calc(100vh-120px)] py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {documentName}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span>Processed at {new Date().toLocaleTimeString()}</span>
                <span>•</span>
                <span>{clauses.length} clauses analyzed</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
              
              <button 
                onClick={handleExport}
                className="flex items-center space-x-2 border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 font-medium">Risk Items</p>
                <p className="text-2xl font-bold text-red-900">{riskCount}</p>
              </div>
              <div className="text-red-400">⚠️</div>
            </div>
            <p className="text-red-600 text-sm mt-1">Potentially unfavorable terms identified</p>
          </motion.div>

          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-medium">Your Obligations</p>
                <p className="text-2xl font-bold text-blue-900">{obligationCount}</p>
              </div>
              <div className="text-blue-400">✅</div>
            </div>
            <p className="text-blue-600 text-sm mt-1">Responsibilities you need to fulfill</p>
          </motion.div>

          <motion.div
            className="bg-green-50 border border-green-200 rounded-lg p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-medium">Simplification</p>
                <p className="text-2xl font-bold text-green-900">95%</p>
              </div>
              <div className="text-green-400">📚</div>
            </div>
            <p className="text-green-600 text-sm mt-1">Readability improvement achieved</p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6">
          <div className="bg-white rounded-lg border border-slate-200 p-1 flex w-fit">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'summary'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Document Summary</span>
            </button>
            <button
              onClick={() => setActiveTab('clauses')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'clauses'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Clause Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {activeTab === 'summary' && summary && (
          <DocumentSummary summary={summary} />
        )}
        {activeTab === 'clauses' && (
          <DocumentViewer clauses={clauses} />
        )}
      </motion.div>
    </div>
  );
};

export default SimplificationPage;