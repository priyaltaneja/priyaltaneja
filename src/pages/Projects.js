import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Youtube, Presentation, NotebookPen, Link as LinkIcon, X, Info } from 'lucide-react';
import { FaMediumM, FaGithub, FaYoutube, FaChrome } from 'react-icons/fa';
import { LuPresentation } from 'react-icons/lu';

const Projects = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hoveredLearnMore, setHoveredLearnMore] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const projects = [
    {
      title: "NextScholar - Chrome Extension for Scholarship Progress Tracking",
      description: "a chrome extension designed to help students conquer scholarship applications – track deadlines, requirements, and personal progress, all in one place.",
      tech: ["Full-Stack", "UX/UI"],
      image: process.env.PUBLIC_URL + "/images/NextScholarImage.png",
      links: [
        {
          url: "https://chromewebstore.google.com/detail/nextscholar/ndohegljfodihdiaopgalhlinaamcfbj",
          icon: FaChrome,
          label: "Chrome Store"
        }
      ]
    },
    {
      title: "QSVM for Cardiovascular Disease Risk",
      description: "translating high-dimensional classical health data into quantum states to power quantum support vector machines for early-stage heart disease detection. presented at World Summit AI 2023 in Montreal.",
      tech: ["Research", "Quantum Computing"],
      image: process.env.PUBLIC_URL + "/images/QSVMImage.webp",
      links: [
        {
          url: "https://priyaltaneja.medium.com/predicting-early-heart-diseases-with-quantum-support-vector-machines-2f2c678e80b7",
          icon: FaMediumM,
          label: "Read on Medium"
        }
      ]
    },
    {
      title: "Reshaping Search Results With Semantic Search",
      description: "built a semantic search engine that understands meaning, not just syntax, through advanced text embeddings.",
      tech: ["Machine Learning"],
      image: process.env.PUBLIC_URL + "/images/SemanticSearchImage.png",
      links: [
        {
          url: "https://priyaltaneja.medium.com/from-query-to-meaning-reshaping-the-landscape-of-google-search-results-through-semantic-search-7f5aa02ebc65",
          icon: FaMediumM,
          label: "Read on Medium"
        }
      ]
    },
    {
      title: "Optimizing Database Searching with Grover's Algorithm",
      description: "demonstrating quantum advantage through grover's algorithm accelerating unstructured search.",
      tech: ["Quantum Computing"],
      image: process.env.PUBLIC_URL + "/images/GroversImage.png",
      links: [
        {
          url: "https://priyaltaneja.medium.com/optimizing-database-searching-with-grovers-algorithm-cad50a603494",
          icon: FaMediumM,
          label: "Read on Medium"
        },
        {
          url: "https://youtu.be/HeYGWe20yqc?si=Eng6hl0LRjsoO7jv",
          icon: FaYoutube,
          label: "Watch Video"
        }
      ]
    },
    {
      title: "Creating Digital Touchpoints for Walmart Blue Labs",
      description: "redesigned Walmart into a seamless omni-channel retailer by integrating real-time personalization, queue management, and community engagement. selected as a top 5 global finalist by Walmart c-suite executives.",
      tech: ["Consulting", "UX/UI"],
      image: process.env.PUBLIC_URL + "/images/WalmartImage.png",
      links: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/tks-life-prod.appspot.com/o/items%2Fpriyal.taneja%2FTanvi%2C%20Priyal%2C%20Krish%2C%20Zara%2C%20Vinaya.pptx%20(1).pdf?alt=media&token=536326ab-a32b-4995-b684-72cf188822ce",
          icon: LuPresentation,
          label: "View Presentation"
        }
      ]
    }
  ];

  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.tech)));

  // Filter tags for dropdown search
  const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(search.toLowerCase()));

  // Filter projects by selected tags (OR logic)
  const filteredProjects =
    selectedTags.length === 0
      ? projects
      : projects.filter(p => p.tech.some(tag => selectedTags.includes(tag)));

  // Add or remove tag from selectedTags
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Remove tag from selectedTags
  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter(t => t !== tag));
  };

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
                className="text-pink-500"
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

        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-12 text-center">Projects</h1>
          {/* Multi-select dropdown for filtering (now below the title) */}
          <div className="flex justify-center mb-10 relative">
            <div className="w-full max-w-xs" ref={dropdownRef}>
              <div
                className="w-full px-3 py-2 rounded-full border border-pink-200 bg-white text-black text-left font-medium flex flex-wrap gap-2 items-center min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                style={{ fontFamily: 'Georgia, serif' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                tabIndex={0}
              >
                {selectedTags.length === 0 && <span className="text-gray-400">filter by skill...</span>}
                {selectedTags.map(tag => (
                  <span key={tag} className="flex items-center bg-pink-100 text-black px-3 py-1 rounded-full text-sm font-medium mr-1 mb-1">
                    {tag}
                    <button
                      className="ml-1 text-black hover:text-pink-500 focus:outline-none"
                      onClick={e => { e.stopPropagation(); removeTag(tag); }}
                      tabIndex={-1}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <span className="ml-auto text-black">▾</span>
              </div>
              {dropdownOpen && (
                <div className="absolute left-0 w-full mt-2 bg-white border border-pink-200 rounded-xl shadow-lg z-10" style={{ minWidth: '100%' }}>
                  <input
                    className="w-full px-4 py-2 border-b border-pink-100 focus:outline-none rounded-t-xl"
                    style={{ fontFamily: 'Georgia, serif' }}
                    placeholder="search skills..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    onClick={e => e.stopPropagation()}
                  />
                  <div className="max-h-56 overflow-y-auto px-2 py-2 flex flex-wrap gap-2">
                    {filteredTags.map(tag => (
                      <button
                        key={tag}
                        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors
                          ${selectedTags.includes(tag) ? 'bg-pink-500 text-white' : 'bg-pink-100 text-black hover:bg-pink-200'}`}
                        style={{ fontFamily: 'Georgia, serif' }}
                        onClick={e => { e.stopPropagation(); toggleTag(tag); }}
                      >
                        {tag}
                        {selectedTags.includes(tag) && (
                          <X size={14} className="ml-1" />
                        )}
                      </button>
                    ))}
                    {filteredTags.length === 0 && (
                      <div className="px-5 py-2 text-gray-400">No tags found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.title}
                className={`
                  bg-white rounded-2xl shadow-md border border-pink-100
                  transition-all duration-300
                  hover:scale-105 hover:shadow-pink-100 hover:shadow-lg hover:border-pink-200
                  flex flex-col overflow-hidden
                  ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                {/* Image on top */}
                {project.image && (
                  <div className="relative w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 rounded-t-2xl" style={{ background: 'rgba(0,0,0,0.18)' }} />
                    {/* Tooltip overlay filling the image area */}
                    {project.description && hoveredLearnMore === index && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl z-40 backdrop-blur-md" style={{ background: 'rgba(30,41,59,0.65)' }}>
                        <div className="text-base text-white text-center px-6" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                          {project.description}
                        </div>
                      </div>
                    )}
                    {/* Question mark icon in bottom right */}
                    {project.description && (
                      <div className="absolute bottom-3 right-3 z-50">
                        <button
                          className="flex items-center justify-center w-7 h-7 rounded-full focus:outline-none p-0 m-0 transition-colors"
                          style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#4B5563' }}
                          onMouseEnter={e => { setHoveredLearnMore(index); e.currentTarget.style.color = '#EC4899'; }}
                          onMouseLeave={e => { setHoveredLearnMore(null); e.currentTarget.style.color = '#4B5563'; }}
                          onFocus={e => { setHoveredLearnMore(index); e.currentTarget.style.color = '#EC4899'; }}
                          onBlur={e => { setHoveredLearnMore(null); e.currentTarget.style.color = '#4B5563'; }}
                          type="button"
                          aria-label="Show project description"
                        >
                          <Info size={22} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {/* Content section below image */}
                <div className="flex flex-col gap-2 px-6 py-5 relative">
                  <div className="flex flex-row items-start justify-between w-full">
                    <div>
                      <div className="text-xl md:text-xl font-medium text-black mb-1" style={{ fontFamily: 'Georgia, serif' }}>{project.title}</div>
                    </div>
                  </div>
                  {/* Tags and links row */}
                  <div className="flex flex-row flex-wrap gap-2 items-center -mt-1">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-pink-100 p-2 rounded-full hover:bg-pink-200 transition-colors group cursor-pointer"
                        aria-label={link.label}
                      >
                        {React.createElement(link.icon, { size: 17, className: "text-black group-hover:text-black transition-colors" })}
                      </a>
                    ))}
                    {project.tech.map(tech => (
                      <span 
                        key={tech}
                        className="bg-pink-100 text-black px-3 py-1 rounded-full text-xs font-medium"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 