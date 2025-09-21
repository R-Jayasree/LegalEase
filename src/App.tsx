import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage';
import SimplificationPage from './pages/SimplificationPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/simplify" element={<SimplificationPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;