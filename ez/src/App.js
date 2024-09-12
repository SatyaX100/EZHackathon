import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() { 
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [terminology, setTerminology] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate', {
        topic,
        keywords,
        terminology,
        writing_style: writingStyle,
      });
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <section className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-32 text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            AI Blog Generator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-300 sm:text-2xl">
            Unleash Creativity with the AI-Powered Blog Generator: Effortless Content Creation at Your Fingertips
          </p>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-left text-lg font-semibold text-white">Topic:</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter blog topic"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-left text-lg font-semibold text-white">Keywords:</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-left text-lg font-semibold text-white">Terminology:</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={terminology}
                onChange={(e) => setTerminology(e.target.value)}
                placeholder="Enter specific terminology"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-left text-lg font-semibold text-white">Writing Style:</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={writingStyle}
                onChange={(e) => setWritingStyle(e.target.value)}
                placeholder="Enter writing style (e.g., formal, casual)"
              />
            </div>

            <button
              className={`w-full px-4 py-2 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Blog'}
            </button>
          </div>

          {generatedText && (
            <div className="result mt-8 bg-gray-800 text-gray-500 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Generated Blog Content</h2>
              <p className="text-lg">{generatedText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;