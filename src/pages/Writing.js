import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const Writing = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Navigation */}
        <nav className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center`}>
          <ul className="flex space-x-8 text-lg sm:text-xl md:text-2xl justify-center items-center">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="hover:text-pink-500 transition-colors flex items-center gap-2"
                aria-label="Back to home"
              >
                <ArrowLeft size={24} />
                <span className="sr-only">Back to home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-pink-500 transition-colors"
              >
                about
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('projects')}
                className="hover:text-pink-500 transition-colors"
              >
                projects
              </button>
            </li>
            <li>
              <button 
                className="text-pink-500"
              >
                writing
              </button>
            </li>
          </ul>
        </nav>

        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-12 text-center">Writing</h1>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl text-gray-600 italic">coming soon :)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing; 