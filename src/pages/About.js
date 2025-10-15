import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const About = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#000000] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Navigation */}
        <nav className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center`}>
          <ul className="flex space-x-8 text-lg sm:text-xl md:text-2xl justify-center items-center text-black dark:text-white">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4] flex items-center gap-2"
                aria-label="Back to home"
              >
                <ArrowLeft size={24} />
                <span className="sr-only">Back to home</span>
              </button>
            </li>
            <li>
              <button 
                className="text-pink-500 dark:text-[#FF69B4]"
              >
                about
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('projects')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4]"
              >
                projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('writing')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4]"
              >
                writing
              </button>
            </li>
          </ul>
        </nav>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-12 text-center text-black dark:text-white transition-colors duration-300">About Me</h1>
          
          <div className="space-y-8 text-lg text-black dark:text-white transition-colors duration-300">
            <div>
              <h2 className="text-2xl font-medium mb-4">
                hey, i'm <span className="decoration-pink-100 dark:decoration-pink-900 decoration-3 underline decoration-solid [text-decoration-skip-ink:none]">priyal</span>!
              </h2>
              <p className="leading-relaxed">
                i'm driven by the desire to <span className="bg-pink-100 dark:bg-[#FF69B4]/60 px-1 rounded transition-colors duration-300 text-black dark:text-white">design solutions</span> to non-obvious problems and make a meaningful impact. 
                i gravitate toward building systems that challenge the status quo and redefine how we experience the world.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">i'm currently…</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>studying <span className="bg-pink-100 dark:bg-[#FF69B4]/60 px-1 rounded transition-colors duration-300 text-black dark:text-white">computer engineering</span> and working towards my iron ring at <a href="https://www.eng.mcmaster.ca/" target="_blank" rel="noopener noreferrer" className="text-pink-500 dark:text-[#FF69B4] hover:text-pink-600 dark:hover:text-[#FF69B4]/80 transition-colors inline-flex items-center gap-1">mcmaster university <ExternalLink size={14} /></a></li>
                <li>developing <span className="bg-pink-100 dark:bg-[#FF69B4]/60 px-1 rounded transition-colors duration-300 text-black dark:text-white">embedded firmware</span> on the <a href="https://macformularacing.com/" target="_blank" rel="noopener noreferrer" className="text-pink-500 dark:text-[#FF69B4] hover:text-pink-600 dark:hover:text-[#FF69B4]/80 transition-colors inline-flex items-center gap-1">mac formula electric <ExternalLink size={14} /></a> vehicle team</li>
              </ul>
            </div>

            <div>
              <p className="leading-relaxed">
                i'm always excited to connect with ambitious people working on leveraging tech for impact. if that's you, <a href="https://calendly.com/priyaltaneja/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="text-pink-500 dark:text-[#FF69B4] hover:text-pink-600 dark:hover:text-[#FF69B4]/80 transition-colors inline-flex items-center gap-1 italic">let's chat! <ExternalLink size={14} /></a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 