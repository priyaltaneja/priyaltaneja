import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Twitter, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// Add custom styles for Georgia font
const georgiaStyle = {
  fontFamily: 'Georgia, serif'
};

const Portfolio = ({ onNavigate, currentPage, animationKey }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const animatedRef = useRef(null);
  // Sample images using placeholder service with square dimensions
  const images = [
    process.env.PUBLIC_URL + "/images/1.png",
    process.env.PUBLIC_URL + "/images/2.png",
    process.env.PUBLIC_URL + "/images/3.png"
  ];

  useEffect(() => {
    setIsLoaded(false);
    // Force reflow for Safari
    if (animatedRef.current) {
      void animatedRef.current.offsetHeight;
    }
    const timeout = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timeout);
  }, [currentPage, animationKey]);

  const prevSlide = () => setCurrentSlide((s) => (s - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentSlide((s) => (s + 1) % images.length);

  return (
    <div key={animationKey} className="w-full overflow-x-hidden block bg-white md:flex md:flex-col md:items-center md:min-h-screen md:justify-center">
      <div className="flex flex-col items-center p-4 md:flex-row md:items-center md:justify-center md:min-h-screen max-w-7xl mx-auto relative gap-2 md:gap-16 h-[100dvh] md:h-screen" style={georgiaStyle}>
        {/* Left side content */}
        <div
          ref={animatedRef}
          className={`flex-1 md:w-1/2 flex flex-col items-center justify-center min-h-[50vh] md:min-h-0 md:block md:items-center md:justify-center md:pr-8 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`.replace(/\s+/g, ' ')}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-6 text-center whitespace-nowrap">Priyal Taneja</h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-center max-w-[500px]`} style={{lineHeight: '1.6', transform: 'translateZ(0)', backfaceVisibility: 'hidden'}}>
            <div className="whitespace-nowrap">
              <span>engineer exploring </span>
              <span className="bg-pink-100 px-1 rounded">human-centered AI</span>
            </div>
            <div>
              <span>and </span>
              <span className="bg-pink-100 px-1 rounded">embedded systems</span>
            </div>
          </p>
          
          {/* Navigation */}
          <nav className={`mb-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-center`} style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
            <ul className="flex space-x-8 text-lg sm:text-xl md:text-2xl justify-center">
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
                  onClick={() => onNavigate('writing')}
                  className="hover:text-pink-500 transition-colors"
                >
                  writing
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Social Icons */}
          <div className={`flex space-x-4 mt-2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} justify-center`} style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
            <a href="mailto:priyaltaneja15@gmail.com" className="bg-gray-200 p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/priyaltaneja/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/TanejaPriyal" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/priyaltaneja" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        {/* Right side image carousel with cross-fade animation */}
        <div
          className={`flex-1 md:w-1/2 flex justify-center items-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-lg overflow-hidden shadow-lg mx-auto">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx + 1}`}
                className={`
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}
                `}
              />
            ))}
            {/* Carousel navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1.5 md:p-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} className="md:w-5 md:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1.5 md:p-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 z-20"
                  aria-label="Next image"
                >
                  <ChevronRight size={16} className="md:w-5 md:h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;