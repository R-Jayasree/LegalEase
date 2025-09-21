import React from 'react';
import { motion } from 'framer-motion';
import { DocumentSummary as DocumentSummaryType } from '../utils/documentSummary';
import { 
  DollarSign, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp
} from 'lucide-react';

interface DocumentSummaryProps {
  summary: DocumentSummaryType;
}

const DocumentSummary: React.FC<DocumentSummaryProps> = ({ summary }) => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <motion.div
        className="bg-white rounded-lg border border-slate-200 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Document Overview</h3>
        <p className="text-slate-700 leading-relaxed">{summary.overview}</p>
      </motion.div>

      {/* Key Terms */}
      <motion.div
        className="bg-white rounded-lg border border-slate-200 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
          Key Terms at a Glance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Monthly Rent</p>
            <p className="text-xl font-bold text-slate-900">{summary.keyTerms.rentAmount}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Security Deposit</p>
            <p className="text-xl font-bold text-slate-900">{summary.keyTerms.securityDeposit}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Lease Duration</p>
            <p className="text-xl font-bold text-slate-900">{summary.keyTerms.leaseDuration}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Late Fee Penalty</p>
            <p className="text-xl font-bold text-slate-900">{summary.keyTerms.lateFeePenalty}</p>
          </div>
        </div>
      </motion.div>

      {/* Financial Impact */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Financial Impact Analysis
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Monthly Commitment:</span>
            <span className="font-semibold text-slate-900">{summary.financialImpact.monthlyCommitment}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-700">Potential Penalties:</span>
            <span className="font-semibold text-red-700">{summary.financialImpact.potentialPenalties}</span>
          </div>
          <div className="flex justify-between items-center border-t border-blue-200 pt-3">
            <span className="text-slate-700 font-medium">Total Annual Cost:</span>
            <span className="font-bold text-lg text-slate-900">{summary.financialImpact.totalCostEstimate}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Major Risks */}
        <motion.div
          className="bg-white rounded-lg border border-red-200 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Major Risks Identified
          </h3>
          <ul className="space-y-2">
            {summary.majorRisks.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">{risk}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Your Obligations */}
        <motion.div
          className="bg-white rounded-lg border border-blue-200 p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Your Key Obligations
          </h3>
          <ul className="space-y-2">
            {summary.yourObligations.slice(0, 5).map((obligation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">{obligation}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Important Dates */}
      <motion.div
        className="bg-white rounded-lg border border-slate-200 p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-purple-600" />
          Important Dates & Deadlines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.importantDates.map((date, index) => (
            <div key={index} className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3">
              <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="text-sm text-slate-700">{date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentSummary;