import { useEffect, useRef, useCallback, useState } from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { RiTwitterXFill } from "react-icons/ri";
import { ArrowUpRight } from 'lucide-react';

const IMAGES = [
  "/images/Priyal3.jpeg",
  "/images/SF.jpeg",
  "/images/Circuit.jpeg",
  "/images/Robot.jpeg",
  "/images/BearWithMe.jpeg",
  "/images/Arizona.jpeg",
];

const CARD_WIDTH = 200;
const CARD_HEIGHT = 265;
const AUTO_SCROLL_SPEED = 0.5;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
};

const GalleryStrip = ({ isVertical }) => {
  const stripRef = useRef(null);
  const viewportRef = useRef(null);
  const isVerticalRef = useRef(isVertical);
  const [ready, setReady] = useState(false);
  const firstFrameDone = useRef(false);

  useEffect(() => {
    let loaded = 0;
    IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === IMAGES.length) setReady(true);
      };
      img.src = process.env.PUBLIC_URL + src;
    });
  }, []);

  const scrollState = useRef({
    currentScroll: 0,
    targetScroll: 0,
    isDragging: false,
    lastPos: 0,
    velocity: 0,
    rafId: null,
  });

  // Reset scroll state when orientation changes
  useEffect(() => {
    if (isVerticalRef.current !== isVertical) {
      isVerticalRef.current = isVertical;
      const s = scrollState.current;
      s.currentScroll = 0;
      s.targetScroll = 0;
      s.velocity = 0;
    }
  }, [isVertical]);

  const animate = useCallback(() => {
    const s = scrollState.current;
    const vertical = isVerticalRef.current;

    if (!s.isDragging) {
      s.targetScroll += s.velocity;
      s.velocity *= 0.95;
      s.targetScroll += AUTO_SCROLL_SPEED;
    }

    s.currentScroll += (s.targetScroll - s.currentScroll) * 0.1;

    const cards = stripRef.current?.children;
    if (!cards) return;

    const CARD_SIZE = vertical ? CARD_HEIGHT : CARD_WIDTH;
    const totalSetSize = IMAGES.length * CARD_SIZE;
    const viewDimension = vertical ? window.innerHeight : window.innerWidth;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      let virtualIndex = i * CARD_SIZE - s.currentScroll;

      while (virtualIndex < -totalSetSize / 2) virtualIndex += totalSetSize;
      while (virtualIndex > totalSetSize / 2) virtualIndex -= totalSetSize;

      if (Math.abs(virtualIndex) < viewDimension) {
        card.style.display = 'block';
        const progress = virtualIndex / (viewDimension / 1.5);
        const depth = -Math.pow(Math.abs(progress), 2) * (vertical ? 350 : 500);
        const rotation = progress * (vertical ? 35 : 45);
        const opacity = String(Math.max(0, 1 - Math.pow(Math.abs(progress), 1.8)));

        if (vertical) {
          card.style.transform = `translateY(${virtualIndex}px) translateZ(${depth}px) rotateX(${-rotation}deg)`;
        } else {
          card.style.transform = `translateX(${virtualIndex}px) translateZ(${depth}px) rotateY(${rotation}deg)`;
        }
        card.style.opacity = opacity;
      } else {
        card.style.display = 'none';
      }
    }

    if (!firstFrameDone.current) firstFrameDone.current = true;
    s.rafId = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const s = scrollState.current;
    s.rafId = requestAnimationFrame(animate);
    return () => {
      if (s.rafId) {
        cancelAnimationFrame(s.rafId);
      }
    };
  }, [animate, ready]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const s = scrollState.current;

    const getPos = (e) => isVerticalRef.current ? e.clientY : e.clientX;
    const getTouchPos = (e) => isVerticalRef.current ? e.touches[0].clientY : e.touches[0].clientX;

    const onMouseDown = (e) => {
      s.isDragging = true;
      s.lastPos = getPos(e);
      s.velocity = 0;
      vp.style.cursor = 'grabbing';
    };
    const onMouseUp = () => {
      s.isDragging = false;
      if (vp) vp.style.cursor = 'grab';
    };
    const onMouseMove = (e) => {
      if (!s.isDragging) return;
      const pos = getPos(e);
      const delta = pos - s.lastPos;
      s.lastPos = pos;
      s.targetScroll -= delta * 1.5;
      s.velocity = -delta * 0.5;
    };
    const onTouchStart = (e) => {
      s.isDragging = true;
      s.lastPos = getTouchPos(e);
      s.velocity = 0;
    };
    const onTouchEnd = () => { s.isDragging = false; };
    const onTouchMove = (e) => {
      if (!s.isDragging) return;
      const pos = getTouchPos(e);
      const delta = pos - s.lastPos;
      s.lastPos = pos;
      s.targetScroll -= delta * 1.5;
      s.velocity = -delta * 0.5;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = isVerticalRef.current ? e.deltaY : (e.deltaY || e.deltaX);
      s.targetScroll += delta * 1.2;
      s.velocity = delta * 0.3;
    };

    vp.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    vp.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    vp.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      vp.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      vp.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchmove', onTouchMove);
      vp.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1200px',
        overflow: 'visible',
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isVertical ? {} : { width: '100vw', marginLeft: 'calc(-50vw + 50%)' }),
      }}
    >
      <style>{`
        .gallery-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140px;
          height: 180px;
          margin-left: -70px;
          margin-top: -90px;
          opacity: 0;
          background: transparent;
          border-radius: 6px;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.4s ease;
        }
        @media (min-width: 640px) {
          .gallery-card {
            width: 160px;
            height: 205px;
            margin-left: -80px;
            margin-top: -102px;
          }
        }
        @media (min-width: 768px) {
          .gallery-card {
            width: 165px;
            height: 220px;
            margin-left: -82px;
            margin-top: -110px;
          }
        }
        @media (min-width: 1024px) {
          .gallery-card {
            width: 180px;
            height: 240px;
            margin-left: -90px;
            margin-top: -120px;
          }
        }
        .gallery-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          z-index: 1000 !important;
        }
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 6px;
          filter: grayscale(20%) contrast(95%);
          pointer-events: none;
          user-select: none;
        }
      `}</style>
      <div
        ref={stripRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {IMAGES.map((src, index) => (
          <div key={src} className="gallery-card" data-index={index}>
            <img
              src={process.env.PUBLIC_URL + src}
              alt=""
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Portfolio = ({ onNavigate, animateIntro = false }) => {
  const isDesktop = useIsDesktop();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  return (
    <div className="w-full min-h-screen md:h-screen md:overflow-hidden transition-colors duration-200 relative">

      {/* Main content area */}
      <div className="min-h-screen md:absolute md:inset-0 z-10 flex flex-col justify-center md:flex-row">
        {/* Left column — identity + about */}
        <div className="w-full md:w-[55%] lg:w-[58%] flex flex-col md:justify-center px-8 sm:px-12 md:px-14 lg:px-20 md:py-0 md:-mt-12">
          {/* Name */}
          <h1
            className={`text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-tight text-black dark:text-white transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            Priyal Taneja
          </h1>

          {/* Tagline */}
          <p
            className={`text-sm md:text-base text-zinc-400 font-light leading-relaxed mt-3 md:mt-5 transition-opacity duration-700 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            systems thinker curious about{' '}
            <span className="glass-highlight text-black dark:text-white">ml infrastructure</span>{' '}
            and{' '}
            <span className="glass-highlight text-black dark:text-white">hardware / software codesign</span>
          </p>

          {/* Social icons */}
          <div
            className={`flex space-x-2 mt-3 md:mt-5 transition-opacity duration-700 delay-[250ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <a href="https://github.com/priyaltaneja" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://x.com/TanejaPriyal" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="Twitter">
              <RiTwitterXFill size={18} />
            </a>
            <a href="https://www.linkedin.com/in/priyaltaneja/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href="mailto:priyaltaneja15@gmail.com" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="Email">
              <MdOutlineEmail size={20} />
            </a>
          </div>

          {/* Thin separator */}
          <div
            className={`w-10 h-px bg-white/20 mt-4 mb-4 md:mt-7 md:mb-7 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'} origin-left`}
          />

          {/* Currently up to */}
          <div
            className={`transition-opacity duration-700 delay-[350ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <h2 className="text-base md:text-lg font-serif italic tracking-tight leading-tight mb-2 md:mb-3 text-black dark:text-white">
              currently...
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              <li>
                <span className="glass-highlight text-black dark:text-white">computer engineering</span> @{' '}
                <a href="https://www.eng.mcmaster.ca/" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-0.5">
                  mcmaster university <ArrowUpRight size={12} className="text-white/25" />
                </a>
              </li>
              <li>
                <span className="glass-highlight text-black dark:text-white">research engineer</span> @{' '}
                <a href="https://e3group.ai" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-0.5">
                  e3 <ArrowUpRight size={12} className="text-white/25" />
                </a>
              </li>
              <li>
                writing about the <span className="glass-highlight text-black dark:text-white">startup / VC ecosystem</span> @{' '}
                <a href="http://thecollectiveny.com/" target="_blank" rel="noopener noreferrer" className="text-sweep-glass inline-flex items-center gap-0.5">
                  the collective <ArrowUpRight size={12} className="text-white/25" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column — carousel */}
        <div
          className={`w-full md:w-[45%] lg:w-[42%] ${isDesktop ? 'h-full' : 'h-[40vh] -mt-8'} relative overflow-hidden`}
          style={isDesktop ? {
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          } : {
            maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
          }}
        >
          <GalleryStrip isVertical={isDesktop} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
