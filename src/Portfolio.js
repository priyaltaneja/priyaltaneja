import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Twitter, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// Add custom styles for Georgia font
const georgiaStyle = {
  fontFamily: 'Georgia, serif'
};

const Portfolio = ({ onNavigate, currentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 because of clone
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const animatedRef = useRef(null);

  // Sample images using placeholder service with square dimensions
  const realImages = [
    process.env.PUBLIC_URL + "/images/PriyalImage1.jpeg",
    process.env.PUBLIC_URL + "/images/PriyalImage2.jpg",
    process.env.PUBLIC_URL + "/images/PriyalImage3.jpg"
  ];
  // Clone last and first for seamless looping
  const images = [realImages[realImages.length - 1], ...realImages, realImages[0]];

  // Touch event handlers for carousel
  useEffect(() => {
    const carousel = document.querySelector('.carousel-slider-row');
    if (!carousel) return;

    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
      setTouchStartY(e.targetTouches[0].clientY);
      setSwipeDirection(null);
      setTouchEnd(null);
    };
    const handleTouchMove = (e) => {
      if (!touchStart || !touchStartY) return;
      const deltaX = e.targetTouches[0].clientX - touchStart;
      const deltaY = e.targetTouches[0].clientY - touchStartY;
      if (swipeDirection === null) {
        if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
          const direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
          setSwipeDirection(direction);
        }
      }
      if (swipeDirection === 'horizontal') {
        e.preventDefault(); // ONLY prevent scrolling if it's truly horizontal
        setTouchEnd(e.targetTouches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe) {
        nextSlide();
      }
      if (isRightSwipe) {
        prevSlide();
      }
    };

    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchStartY, touchEnd, swipeDirection]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((s) => s - 1);
  };
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((s) => s + 1);
  };

  // Infinite loop effect: after animation, jump to real image if at clone
  useEffect(() => {
    if (!isAnimating) return;
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      if (currentSlide === 0) {
        setCurrentSlide(realImages.length);
      } else if (currentSlide === realImages.length + 1) {
        setCurrentSlide(1);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [isAnimating, currentSlide, realImages.length]);

  // For pagination dots
  const getRealIndex = () => {
    if (currentSlide === 0) return realImages.length - 1;
    if (currentSlide === realImages.length + 1) return 0;
    return currentSlide - 1;
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white overflow-x-hidden">
      <style>
        {`
          .safari-fade {
            opacity: 0;
            -webkit-transform: translateY(20px) translateZ(0);
            transform: translateY(20px) translateZ(0);
            -webkit-transition: opacity 0.5s ease, -webkit-transform 0.5s ease;
            -moz-transition: opacity 0.5s ease, transform 0.5s ease;
            transition: opacity 0.5s ease, transform 0.5s ease;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            will-change: transform, opacity;
          }
          .safari-fade.loaded {
            opacity: 1;
            -webkit-transform: translateY(0) translateZ(0);
            transform: translateY(0) translateZ(0);
          }
          .slide-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.75rem;
            transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .slide-img.inactive {
            opacity: 0;
            z-index: 1;
          }
          .slide-img.active {
            opacity: 1;
            z-index: 2;
          }
          .slide-img.slide-in-right {
            transform: translateX(100%);
            animation: slideInFromRight 0.5s forwards;
          }
          .slide-img.slide-in-left {
            transform: translateX(-100%);
            animation: slideInFromLeft 0.5s forwards;
          }
          @keyframes slideInFromRight {
            from { transform: translateX(100%); opacity: 1; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInFromLeft {
            from { transform: translateX(-100%); opacity: 1; }
            to { transform: translateX(0); opacity: 1; }
          }
          .carousel-slider-row {
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .carousel-slider-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.75rem;
            flex-shrink: 0;
          }
          /* Gradient Glow Container */
          .gradient-glow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            border-radius: 1.5rem;
            background: radial-gradient(circle at 50% 50%, rgba(236,72,153,0.95) 0%, rgba(244,114,182,0.85) 52%, transparent 71%);
            overflow: hidden;
            box-sizing: border-box;
            max-width: 400px;
            max-height: 400px;
          }
          @media (max-width: 600px) {
            .gradient-glow {
              padding: 24px;
              background: radial-gradient(circle at 50% 50%, rgba(236,72,153,0.85) 0%, rgba(244,114,182,0.7) 52%, transparent 71%);
              max-width: 95vw;
              max-height: 95vw;
            }
          }
        `}
      </style>
      <div className="flex flex-col items-center p-4 md:flex-row md:items-center md:justify-center max-w-7xl mx-auto relative gap-0.5 md:gap-20" style={georgiaStyle}>
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
        <div className="flex-1 md:w-1/2 flex flex-col items-center">
          {/* Gradient Glow Container */}
          <div className="gradient-glow">
            <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex items-center justify-center" style={{ overflow: 'hidden', background: 'none' }}>
              <div 
                className="relative w-full h-full rounded-xl overflow-hidden shadow-lg z-10"
              >
                <div
                  className="carousel-slider-row"
                  style={{
                    width: `${images.length * 100}%`,
                    transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
                    transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                  }}
                >
                  {images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Slide ${((idx - 1 + realImages.length) % realImages.length) + 1}`}
                      className="carousel-slider-img"
                      style={{ width: `${100 / images.length}%` }}
                    />
                  ))}
                </div>
                {/* Carousel navigation buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 md:left-2 top-1/2 -translate-y-1/2 transition-colors duration-200 z-20 group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={32} className="text-white group-hover:text-gray-300" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 md:right-2 top-1/2 -translate-y-1/2 transition-colors duration-200 z-20 group"
                      aria-label="Next image"
                    >
                      <ChevronRight size={32} className="text-white group-hover:text-gray-300" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Pagination dots */}
          {realImages.length > 1 && (
            <div className="flex justify-center space-x-2 mt-3">
              {realImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnimating && setCurrentSlide(idx + 1)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    getRealIndex() === idx ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Add breathing room for footer */}
      <div className="h-10 md:h-20"></div>
    </div>
  );
};

export default Portfolio;