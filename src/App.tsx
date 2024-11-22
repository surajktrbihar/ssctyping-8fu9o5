import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TypingTest from './components/TypingTest';
import Results from './components/Results';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TypingTest />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;