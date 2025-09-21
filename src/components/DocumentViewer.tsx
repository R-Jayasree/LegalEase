import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Clause } from '../types';

interface DocumentViewerProps {
  clauses: Clause[];
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ clauses }) => {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'simplified'>('side-by-side');

  const getRiskColor = (category: string, riskLevel: string) => {
    switch (category) {
      case 'risk':
        return riskLevel === 'high' ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50';
      case 'obligation':
        return 'border-blue-500 bg-blue-50';
      case 'important':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-slate-300 bg-white';
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'obligation':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'important':
        return <Info className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Document Analysis</h2>
          <p className="text-slate-600">Review simplified clauses and identified risks</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-lg border border-slate-200 p-1 flex">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                viewMode === 'side-by-side'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4 mr-1 inline" />
              Compare
            </button>
            <button
              onClick={() => setViewMode('simplified')}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                viewMode === 'simplified'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <EyeOff className="w-4 h-4 mr-1 inline" />
              Simplified
            </button>
          </div>
        </div>
      </div>

      {/* Risk Legend */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-slate-600">Risk - Potentially unfavorable terms</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-slate-600">Obligation - Your responsibilities</span>
          </div>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-yellow-600" />
            <span className="text-slate-600">Important - Key information</span>
          </div>
        </div>
      </div>

      {/* Document Clauses */}
      <div className="space-y-4">
        {clauses.map((clause) => (
          <motion.div
            key={clause.id}
            className={`border-2 rounded-lg transition-all duration-200 ${getRiskColor(clause.category, clause.riskLevel)} ${
              selectedClause === clause.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedClause(selectedClause === clause.id ? null : clause.id)}
          >
            <div className="p-4 cursor-pointer">
              <div className="flex items-start space-x-3 mb-3">
                {getRiskIcon(clause.category)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{clause.section}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      clause.riskLevel === 'high' 
                        ? 'bg-red-100 text-red-700'
                        : clause.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {clause.riskLevel.toUpperCase()} {clause.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {viewMode === 'side-by-side' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">Original Text</h5>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {clause.original}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">Simplified Version</h5>
                    <p className="text-sm text-slate-900 leading-relaxed font-medium">
                      {clause.simplified}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-900 leading-relaxed font-medium">
                    {clause.simplified}
                  </p>
                </div>
              )}

              {selectedClause === clause.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-slate-200"
                >
                  <div className="bg-slate-50 rounded-lg p-3">
                    <h6 className="text-sm font-medium text-slate-700 mb-1">Analysis</h6>
                    <p className="text-sm text-slate-600">
                      This clause has been categorized as a {clause.category} with {clause.riskLevel} priority. 
                      {clause.category === 'risk' && ' You should pay special attention to this section as it may contain unfavorable terms.'}
                      {clause.category === 'obligation' && ' This outlines your responsibilities under the agreement.'}
                      {clause.category === 'important' && ' This contains key information you should be aware of.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DocumentViewer;