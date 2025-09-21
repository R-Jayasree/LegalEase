import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, MessageSquare, Upload, Scale } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Upload, label: 'Upload' },
    { path: '/simplify', icon: FileText, label: 'Simplify' },
    { path: '/chat', icon: MessageSquare, label: 'Q&A Assistant' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">LegalEase</h1>
                <p className="text-xs text-slate-500">AI Legal Document Simplification</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-slate-200">
        <div className="flex">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <p>© 2024 LegalEase. Powered by Google Cloud AI.</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Secure & Private
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;