import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    setUploadStatus('processing');
    setFileName(file.name);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock file content - in real app, this would extract text from PDF/DOCX
      const mockContent = `
RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is entered into on January 1, 2024, between Landlord and Tenant.

RENT PAYMENT TERMS
The Tenant shall pay rent in the amount of $2,500 per calendar month, due and payable in advance on or before the first day of each month. Late payment shall incur a penalty of 5% of the monthly rent amount plus $25 administrative fee for each day the payment is delinquent.

RENT INCREASES  
Landlord reserves the right to increase rent with sixty (60) days written notice to Tenant, provided such increase does not exceed ten percent (10%) of the current monthly rental amount in any twelve (12) month period.

MAINTENANCE AND REPAIRS
Tenant acknowledges responsibility for maintaining the premises in good condition and shall promptly notify Landlord of any necessary repairs or maintenance issues.
      `;

      setUploadStatus('success');
      onFileUpload(file, mockContent);
    } catch (error) {
      setUploadStatus('error');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50'
            : uploadStatus === 'error'
            ? 'border-red-400 bg-red-50'
            : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {uploadStatus === 'processing' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <div>
              <p className="text-lg font-medium text-slate-900">Processing {fileName}...</p>
              <p className="text-sm text-slate-500">Extracting text and analyzing content</p>
            </div>
          </div>
        )}

        {uploadStatus === 'success' && (
          <motion.div 
            className="flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <p className="text-lg font-medium text-green-900">Upload Successful!</p>
              <p className="text-sm text-green-700">{fileName} has been processed</p>
            </div>
          </motion.div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <div>
              <p className="text-lg font-medium text-red-900">Upload Failed</p>
              <p className="text-sm text-red-700">Please try again with a valid document</p>
            </div>
          </div>
        )}

        {uploadStatus === 'idle' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Upload className="w-16 h-16 text-slate-400" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Upload Your Legal Document
              </h3>
              <p className="text-slate-600 mb-4">
                Drag & drop your document here, or click to browse
              </p>
              <p className="text-sm text-slate-500">
                Supports PDF, DOCX, and TXT files up to 10MB
              </p>
            </div>

            <label className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <FileText className="w-4 h-4" />
              <span className="font-medium">Choose File</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        )}
      </motion.div>

      {/* Supported formats */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-6 text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>DOCX</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>TXT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;