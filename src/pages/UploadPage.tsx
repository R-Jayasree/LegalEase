import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { Shield, Clock, Zap } from 'lucide-react';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File, content: string) => {
    setUploadedFile(file);
    // Store the document content in localStorage for demo purposes
    localStorage.setItem('documentContent', content);
    localStorage.setItem('documentName', file.name);
    
    // Navigate to simplification page after a short delay
    setTimeout(() => {
      navigate('/simplify');
    }, 1000);
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed securely and never stored permanently.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI simplifies complex legal language into plain English.'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get simplified explanations and risk analysis in seconds.'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simplify Legal Documents
            <span className="text-blue-600"> with AI</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Upload your legal documents and get instant plain-language explanations, 
            risk analysis, and interactive Q&A assistance powered by Google Cloud AI.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FileUpload onFileUpload={handleFileUpload} />
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Why Choose LegalEase?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Try it with a sample document
            </h3>
            <p className="text-slate-600 mb-6">
              Don't have a document ready? Use our sample lease agreement to see LegalEase in action.
            </p>
            <button
              onClick={() => {
                const sampleContent = `
RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is entered into on January 1, 2024, between Landlord and Tenant for the property located at 123 Main Street.

RENT PAYMENT TERMS
The Tenant shall pay rent in the amount of $2,500 per calendar month, due and payable in advance on or before the first day of each month. Late payment shall incur a penalty of 5% of the monthly rent amount plus $25 administrative fee for each day the payment is delinquent.

RENT INCREASES  
Landlord reserves the right to increase rent with sixty (60) days written notice to Tenant, provided such increase does not exceed ten percent (10%) of the current monthly rental amount in any twelve (12) month period.
                `;
                localStorage.setItem('documentContent', sampleContent);
                localStorage.setItem('documentName', 'Sample Lease Agreement.pdf');
                navigate('/simplify');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Try Sample Document
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;