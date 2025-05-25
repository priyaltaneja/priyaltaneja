import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Twitter, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// Add custom styles for Georgia font
const georgiaStyle = {
  fontFamily: 'Georgia, serif'
};

const Portfolio = ({ onNavigate, currentPage, animationKey }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlideIndex, setNextSlideIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState('');
  const [isSliding, setIsSliding] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const slideTimeout = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Sample images using placeholder service with square dimensions
  const images = [
    process.env.PUBLIC_URL + "/images/1.png",
    process.env.PUBLIC_URL + "/images/2.png",
    process.env.PUBLIC_URL + "/images/3.png"
  ];

  useEffect(() => {
    setIsLoaded(false);
    const timeout = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timeout);
  }, [currentPage, animationKey]);

  useEffect(() => {
    if (isSliding && nextSlideIndex !== null) {
      // Start the animation
      setTranslateX(slideDirection === 'right' ? -50 : 50);
      slideTimeout.current = setTimeout(() => {
        setCurrentSlide(nextSlideIndex);
        setNextSlideIndex(null);
        setIsSliding(false);
        setTranslateX(0);
      }, 500); // match CSS duration
      return () => clearTimeout(slideTimeout.current);
    }
  }, [isSliding, nextSlideIndex, slideDirection]);

  const startSlide = (direction) => {
    if (isSliding) return;
    setIsSliding(true);
    setSlideDirection(direction);
    if (direction === 'right') {
      setNextSlideIndex((currentSlide + 1) % images.length);
    } else {
      setNextSlideIndex((currentSlide - 1 + images.length) % images.length);
    }
    setTranslateX(0); // Start at 0
  };

  const nextSlide = () => startSlide('right');
  const prevSlide = () => startSlide('left');

  return (
    <div className="w-full overflow-x-hidden block bg-white md:flex md:flex-col md:items-center md:min-h-screen md:justify-center">
      <div className="flex flex-col items-center p-4 md:flex-row md:items-center md:justify-center md:min-h-screen max-w-7xl mx-auto relative gap-2 md:gap-32" style={georgiaStyle}>
        {/* Left side content */}
        <div className={`
          flex flex-col items-center justify-center min-h-[80vh]
          md:block md:items-center md:justify-center md:min-h-0
          w-full md:w-1/2 md:pr-32 text-center
          transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`.replace(/\s+/g, ' ')}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-6 text-center whitespace-nowrap">Priyal Taneja</h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center max-w-[500px]`} style={{lineHeight: '1.6'}}>
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
          <nav className={`mb-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center`}>
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
          <div className={`flex space-x-4 mt-2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} justify-center`}>
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
        
        {/* Right side image carousel with animation */}
        <div className={`relative w-full flex flex-col items-center justify-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative rounded-lg overflow-hidden shadow-lg aspect-square w-[250px] md:w-[350px] z-10" style={{zIndex: 10}}>
            <div className="w-full h-full overflow-hidden relative">
              {isSliding && nextSlideIndex !== null ? (
                <div
                  className="flex w-full h-full transition-transform duration-500"
                  style={{ width: '200%', transform: `translateX(${translateX}%)` }}
                >
                  {slideDirection === 'right' ? (
                    <>
                      <img
                        src={images[currentSlide]}
                        alt="Portfolio showcase"
                        className="w-1/2 h-full object-cover rounded-lg"
                        style={{ minWidth: '50%' }}
                      />
                      <img
                        src={images[nextSlideIndex]}
                        alt="Portfolio showcase"
                        className="w-1/2 h-full object-cover rounded-lg"
                        style={{ minWidth: '50%' }}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={images[nextSlideIndex]}
                        alt="Portfolio showcase"
                        className="w-1/2 h-full object-cover rounded-lg"
                        style={{ minWidth: '50%' }}
                      />
                      <img
                        src={images[currentSlide]}
                        alt="Portfolio showcase"
                        className="w-1/2 h-full object-cover rounded-lg"
                        style={{ minWidth: '50%' }}
                      />
                    </>
                  )}
                </div>
              ) : (
                <img
                  src={images[currentSlide]}
                  alt="Portfolio showcase"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;