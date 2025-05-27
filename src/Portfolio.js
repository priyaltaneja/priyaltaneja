import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Twitter, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// Add custom styles for Georgia font
const georgiaStyle = {
  fontFamily: 'Georgia, serif'
};

const Portfolio = ({ onNavigate, currentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const animatedRef = useRef(null);

  // Sample images using placeholder service with square dimensions
  const images = [
    process.env.PUBLIC_URL + "/images/PriyalImage1.jpeg",
    process.env.PUBLIC_URL + "/images/PriyalImage2.jpg",
    process.env.PUBLIC_URL + "/images/PriyalImage3.jpg"
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const prevSlide = () => setCurrentSlide((s) => (s - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentSlide((s) => (s + 1) % images.length);

  return (
    <div className="w-full overflow-x-hidden block bg-white md:flex md:flex-col md:items-center md:min-h-screen md:justify-center">
      <style>
        {`
          .safari-fade {
            opacity: 0;
            -webkit-transform: translateY(20px);
            transform: translateY(20px);
            -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
          .safari-fade.loaded {
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
        `}
      </style>
      <div className="flex flex-col items-center p-4 md:flex-row md:items-center md:justify-center md:min-h-screen max-w-7xl mx-auto relative gap-2 md:gap-16 min-h-screen" style={georgiaStyle}>
        {/* Left side content */}
        <div
          ref={animatedRef}
          className="flex-1 md:w-1/2 flex flex-col items-center justify-center min-h-[50vh] md:min-h-0 md:block md:items-center md:justify-center md:pr-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-6 text-center whitespace-nowrap">Priyal Taneja</h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-6 text-center max-w-[500px]" style={{lineHeight: '1.6'}}>
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
          <nav className="mb-4 text-center">
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
          <div className="flex space-x-4 mt-2 justify-center">
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
          className="flex-1 md:w-1/2 flex flex-col items-center"
        >
          <div 
            className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-lg overflow-hidden shadow-lg"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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
          {/* Pagination dots */}
          {images.length > 1 && (
            <div className="flex justify-center space-x-2 mt-3">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;