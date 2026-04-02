import React, { useState, useRef } from 'react';
import { PenLine } from 'lucide-react';
import { FaMediumM, FaYoutube, FaChrome } from 'react-icons/fa';

const PROJECTS = [
  {
    title: "Understanding FPGAs from First Principles",
    description: "a deep dive into how FPGAs work â€” from logic gates to lookup tables to configurable logic blocks. written to build intuition from the ground up.",
    image: process.env.PUBLIC_URL + "/images/FPGA.jpg",
    links: [
      {
        url: `/understanding-fpgas-from-first-principles`,
        icon: PenLine,
        label: "Read",
        internal: true,
      }
    ]
  },
  {
    title: "NextScholar",
    description: "a chrome extension that helps students find and compare universities. full-stack app with a focus on clean UX and fast search.",
    image: process.env.PUBLIC_URL + "/images/NextScholarImage.png",
    links: [
      {
        url: "https://chromewebstore.google.com/detail/nextscholar/ndohegljfodihdiaopgalhlinaamcfbj",
        icon: FaChrome,
        label: "Chrome Store",
      }
    ]
  },
  {
    title: "Semantic Search Engine",
    description: "built a search engine that understands meaning, not just keywords. uses embeddings and cosine similarity to rank results by semantic relevance.",
    image: process.env.PUBLIC_URL + "/images/SemanticSearchImage.png",
    links: [
      {
        url: "https://priyaltaneja.medium.com/from-query-to-meaning-reshaping-the-landscape-of-google-search-results-through-semantic-search-7f5aa02ebc65",
        icon: FaMediumM,
        label: "Medium",
      }
    ]
  },
  {
    title: "Grover's Algorithm",
    description: "implemented Grover's quantum search algorithm to optimize unstructured database searching. explored quantum speedup over classical approaches.",
    image: process.env.PUBLIC_URL + "/images/GroversImage.png",
    links: [
      {
        url: "https://priyaltaneja.medium.com/optimizing-database-searching-with-grovers-algorithm-cad50a603494",
        icon: FaMediumM,
        label: "Medium",
      },
      {
        url: "https://youtu.be/HeYGWe20yqc?si=Eng6hl0LRjsoO7jv",
        icon: FaYoutube,
        label: "Video",
      }
    ]
  }
];

const ProjectImage = ({ src, alt, onLoad }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="sync"
      onLoad={onLoad}
      onError={onLoad}
      className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-100 transition-all duration-300 hover:scale-[1.03]"
    />
  );
};

const Projects = ({ onNavigate }) => {
  const [imagesReady, setImagesReady] = useState(false);
  const loadedCount = useRef(0);

  return (
    <div className="min-h-screen w-full bg-black transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-16 sm:px-6 lg:px-8">

        <div className={`transition-opacity duration-500 ${imagesReady ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl sm:text-5xl font-serif italic tracking-tight leading-tight mb-12 text-center text-black dark:text-white transition-colors duration-200">Projects</h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {PROJECTS.map((project, index) => {
              const primaryLink = project.links[0];

              const handleClick = (e) => {
                if (primaryLink.internal) {
                  e.preventDefault();
                  onNavigate(primaryLink.url.replace('/', ''));
                }
              };

              const handleImageLoad = () => {
                loadedCount.current += 1;
                if (loadedCount.current === PROJECTS.length) {
                  setImagesReady(true);
                }
              };

              return (
                <div
                  key={project.title}
                  className="flex flex-col group"
                >
                  <a
                    href={primaryLink.url}
                    {...(primaryLink.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    onClick={primaryLink.internal ? handleClick : undefined}
                    className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-black cursor-pointer block"
                  >
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      onLoad={handleImageLoad}
                    />
                  </a>

                  <div className="flex items-start justify-between mt-4">
                    <h3 className="text-lg font-serif italic tracking-tight leading-tight text-sweep-group">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 ml-4">
                      {project.links.map((link, i) => {
                        const isInternal = link.internal;
                        return (
                          <a
                            key={i}
                            href={link.url}
                            {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                            onClick={isInternal ? (e) => {
                              e.preventDefault();
                              onNavigate(link.url.replace('/', ''));
                            } : undefined}
                            className="text-zinc-400 hover:text-white transition-colors duration-200"
                            aria-label={link.label}
                          >
                            {React.createElement(link.icon, { size: 18 })}
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <p className="mt-2 text-zinc-400 text-sm leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
