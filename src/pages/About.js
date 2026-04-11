import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const About = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-dvh w-full bg-transparent transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center`}>
          <ul className="flex space-x-8 text-xl sm:text-2xl font-light justify-center items-center text-white/60 transition-colors duration-200">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="icon-sweep flex items-center gap-2"
                aria-label="Back to home"
              >
                <ArrowLeft size={24} />
                <span className="sr-only">Back to home</span>
              </button>
            </li>
            <li>
              <button 
                className="glass-text transition-colors duration-200"
              >
                about
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('projects')}
                className="text-sweep"
              >
                projects
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('writing')}
                className="text-sweep"
              >
                writing
              </button>
            </li>
          </ul>
        </nav>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-5xl font-serif italic tracking-tight leading-tight mb-12 text-center text-black dark:text-white transition-colors duration-200">About Me</h1>
          
          <div className="space-y-8 text-zinc-300 text-lg leading-relaxed font-light transition-colors duration-200">
            <div>
              <h2 className="text-3xl font-serif italic tracking-tight leading-tight mb-4 text-black dark:text-white">
                hey, i'm <span className="decoration-white/40 decoration-3 underline decoration-solid [text-decoration-skip-ink:none]">priyal</span>!
              </h2>
              <p className="leading-relaxed">
                i'm driven by the desire to <span className="glass-highlight text-black dark:text-white">design systems</span> that challenge the status quo and redefine how we experience the world.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-serif italic tracking-tight leading-tight mb-4 text-black dark:text-white">i'm currently…</h2>
              <ul className="list-disc ml-6 space-y-3">
                <li>studying <span className="glass-highlight text-black dark:text-white">computer engineering</span> and working towards my iron ring at <a href="https://www.eng.mcmaster.ca/" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-1">mcmaster university <ExternalLink size={18} /></a></li>
                <li>a <span className="glass-highlight text-black dark:text-white">research engineer</span> at <a href="https://e3group.ai" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-1">e3 group <ExternalLink size={18} /></a></li>
                <li>writing about the <span className="glass-highlight text-black dark:text-white">startup / VC ecosystem</span> at <a href="http://thecollectiveny.com/" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-1">the collective <ExternalLink size={18} /></a></li>
              </ul>
            </div>

            <div>
              <p className="leading-relaxed">
                i'm always excited to connect with ambitious people working on leveraging tech for impact. if that's you, <a href="https://calendly.com/priyaltaneja/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-1 italic">let's chat! <ExternalLink size={18} /></a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 