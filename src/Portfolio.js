import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {FaLinkedinIn,FaGithub} from 'react-icons/fa';
import {MdOutlineEmail} from 'react-icons/md';
import {BsTwitterX} from 'react-icons/bs';
import { RiTwitterXFill } from "react-icons/ri";

const Portfolio = ({ onNavigate, currentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitingSlide, setExitingSlide] = useState(null);
  const animatedRef = useRef(null);

  const georgiaStyle = {
    fontFamily: 'Georgia, serif'
  };

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      
      if (currentSlide === 2) {
        // Reset animation without sliding off
        setCurrentSlide(0);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      } else {
        // Normal progression with slide-off
        const newSlide = (currentSlide + 1) % 3;
        setExitingSlide(currentSlide);
        // Slight delay before changing current slide to ensure exit animation starts properly
        requestAnimationFrame(() => {
          setCurrentSlide(newSlide);
        });
        setTimeout(() => {
          setExitingSlide(null);
          setIsAnimating(false);
        }, 500);
      }
    }
  };

  const realImages = [
    process.env.PUBLIC_URL + "/images/PriyalImage1.jpeg",
    process.env.PUBLIC_URL + "/images/PriyalImage2.jpg",
    process.env.PUBLIC_URL + "/images/PriyalImage3.jpg"
  ];
  
  const images = realImages;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <style>
        {`
          .carousel-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px;
            position: relative;
          }

          .carousel-wrapper {
            position: relative;
            width: 300px;
            height: 480px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .polaroid {
            position: absolute;
            width: 100%;
            height: auto;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: center;
            will-change: transform, opacity;
          }

          /* Initial stacked position */
          .polaroid:nth-child(1) {
            transform: rotate(-5deg) translateY(-8px);
            z-index: 2;
          }

          .polaroid:nth-child(2) {
            transform: rotate(0deg);
            z-index: 1;
          }

          .polaroid:nth-child(3) {
            transform: rotate(5deg) translateY(8px);
            z-index: 0;
          }

          /* Active states based on currentSlide */
          .polaroid.exit {
            transform: translate(-120%, 120%) rotate(-15deg);
            opacity: 0;
            pointer-events: none;
            z-index: 10;
          }

          .polaroid.top {
            transform: rotate(0deg) translateY(0);
            z-index: 3;
          }

          .polaroid.middle {
            transform: rotate(-3deg) translateY(-4px);
            z-index: 2;
          }

          .polaroid.bottom {
            transform: rotate(3deg) translateY(4px);
            z-index: 1;
          }

          /* Quick transition only for reset */
          .polaroid.quick-reset {
            transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          }

          .polaroid img {
            width: 100%;
            height: auto;
            display: block;
            image-rendering: -webkit-optimize-contrast;
          }

          @media (max-width: 768px) {
            .carousel-wrapper {
              width: 240px;
              height: 384px;
            }
          }
        `}
      </style>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-4 gap-12 md:gap-4 py-8 md:py-0">
        {/* Left side content */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-6 md:mb-8 whitespace-nowrap" style={georgiaStyle}>Priyal Taneja</h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 max-w-[450px]" style={{...georgiaStyle, lineHeight: '1.2'}}>
            <div className="whitespace-nowrap mb-2">
              <span>engineer exploring </span>
              <span className="bg-pink-100 px-1 rounded">human-centered AI</span>
            </div>
            <div>
              <span>and </span>
              <span className="bg-pink-100 px-1 rounded">embedded systems</span>
            </div>
          </p>
          
          {/* Navigation */}
          <nav className="mb-2">
            <ul className="flex space-x-8 md:space-x-10 text-base sm:text-lg md:text-xl lg:text-2xl justify-center" style={georgiaStyle}>
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
            <a href="mailto:priyaltaneja15@gmail.com" className="bg-gray-200 p-2.5 md:p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="Email">
              <MdOutlineEmail size={18} className="md:w-5 md:h-5" />
            </a>
            <a href="https://www.linkedin.com/in/priyaltaneja/" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-2.5 md:p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn size={18} className="md:w-5 md:h-5" />
            </a>
            <a href="https://x.com/TanejaPriyal" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-2.5 md:p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="Twitter">
              <RiTwitterXFill size={18} className="md:w-5 md:h-5" />
            </a>
            <a href="https://github.com/priyaltaneja" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-2.5 md:p-3 rounded-full hover:bg-pink-100 transition-colors" aria-label="GitHub">
              <FaGithub size={18} className="md:w-5 md:h-5" />
            </a>
          </div>
        </div>
        
        {/* Right side image carousel */}
        <div className="w-full md:w-1/2 flex justify-center items-center h-full">
          <div className="relative w-[220px] h-[290px] sm:w-[260px] sm:h-[330px] md:w-[340px] md:h-[410px] flex items-center justify-center">
            <div className="carousel-container">
              <div className="carousel-wrapper" onClick={handleClick}>
                <div className={`polaroid ${
                  exitingSlide === 0 ? 'exit' :
                  currentSlide === 0 ? 'top' : 'exit'
                } ${currentSlide === 2 ? 'quick-reset' : ''}`}>
                  <img src="/images/polaroid1.png" alt="Polaroid 1" />
                </div>
                <div className={`polaroid ${
                  exitingSlide === 1 ? 'exit' :
                  currentSlide === 0 ? 'middle' :
                  currentSlide === 1 ? 'top' : 'exit'
                } ${currentSlide === 2 ? 'quick-reset' : ''}`}>
                  <img src="/images/polaroid2.png" alt="Polaroid 2" />
                </div>
                <div className={`polaroid ${
                  currentSlide === 0 ? 'bottom' :
                  currentSlide === 1 ? 'middle' :
                  currentSlide === 2 ? 'top' : ''
                } ${currentSlide === 2 ? 'quick-reset' : ''}`}>
                  <img src="/images/polaroid3.png" alt="Polaroid 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;