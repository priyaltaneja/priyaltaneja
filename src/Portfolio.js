import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const PROJECTS = [
  {
    title: 'LoRA Serving: A Two-Part Series',
    href: '/mechanics-of-lora',
  },
  {
    title: 'Understanding FPGAs from First Principles',
    href: '/understanding-fpgas-from-first-principles',
  },
  {
    title: 'NextScholar',
    href: 'https://chromewebstore.google.com/detail/nextscholar/ndohegljfodihdiaopgalhlinaamcfbj',
  },
  {
    title: 'Semantic Search Engine',
    href: 'https://priyaltaneja.medium.com/from-query-to-meaning-reshaping-the-landscape-of-google-search-results-through-semantic-search-7f5aa02ebc65',
  },
  {
    title: "Grover's Algorithm",
    href: 'https://priyaltaneja.medium.com/optimizing-database-searching-with-grovers-algorithm-cad50a603494',
  },
];

const WRITING = [
  {
    title: 'Under the Hood',
    href: 'https://thecollectivecommunity.substack.com/',
  },
  {
    title: 'The Quiet Skill of Not Assuming',
    href: '/the-quiet-skill-of-not-assuming',
  },
  {
    title: 'Unlearning Perfectionism',
    href: '/unlearning-perfectionism',
  },
  {
    title: "I'll Be Happy When…",
    href: '/ill-be-happy-when-insert-here-a-reflection-on-conditional-happiness-versus-true-happiness',
  },
];

const IndexLink = ({ item, onNavigate }) => {
  const external = /^https?:\/\//.test(item.href);

  const handleClick = (event) => {
    if (
      external ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(item.href.replace(/^\//, ''));
  };

  return (
    <a
      className="index-link reveal-item"
      href={item.href}
      onClick={handleClick}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {item.title}
    </a>
  );
};

const Portfolio = ({ onNavigate }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main id="main-content" className={`portfolio-index ${ready ? 'is-ready' : ''}`}>
      <div className="motion-blur" aria-hidden="true">
        <div className="motion-blur__wash motion-blur__wash--blue" />
        <div className="motion-blur__wash motion-blur__wash--coral" />
        <div className="motion-blur__wash motion-blur__wash--cyan" />
        <div className="motion-blur__veil" />
      </div>

      <section className="index-identity" aria-labelledby="home-title">
        <div className="index-identity__copy">
          <h1 id="home-title" className="index-name reveal-item">
            Priyal Taneja
          </h1>

          <p className="index-tagline reveal-item">
            I study Computer Engineering at <a href="https://www.eng.mcmaster.ca/" target="_blank" rel="noreferrer">McMaster</a> and build agents for freight and logistics at <a href="https://e3group.ai" target="_blank" rel="noreferrer">e3</a>. I’m curious about ML systems, how complex ideas become useful products, and learning how to think well before reaching for the right answer.
          </p>

          <div className="single-socials reveal-item" aria-label="Social and contact details">
            <a href="https://github.com/priyaltaneja" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://x.com/TanejaPriyal" target="_blank" rel="noreferrer" aria-label="X"><RiTwitterXFill /></a>
            <a href="https://www.linkedin.com/in/priyaltaneja/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <span className="single-socials__separator" aria-hidden="true" />
            <a className="single-email" href="mailto:priyaltaneja15@gmail.com">priyaltaneja15@gmail.com</a>
            <span className="single-socials__separator" aria-hidden="true" />
            <span className="single-location"><MapPin aria-hidden="true" /> toronto / sf</span>
          </div>
        </div>

      </section>

      <div className="index-content">
        <section className="index-section" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="reveal-item">Projects</h2>
          <div className="index-list">
            {PROJECTS.map((project) => (
              <IndexLink key={project.title} item={project} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        <section className="index-section" aria-labelledby="writing-heading">
          <h2 id="writing-heading" className="reveal-item">Writing</h2>
          <div className="index-list">
            {WRITING.map((article) => (
              <IndexLink key={article.title} item={article} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Portfolio;
