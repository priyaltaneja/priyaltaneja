import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Download, ArrowUp } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { findArticleBySlug, slugify } from '../utils/slugify';
import { publicAsset } from '../utils/assets';
import TwitterEmbed from '../components/TwitterEmbed';
import {
  ScalingDiagram,
  StructuredChangeDiagram,
  DecompositionDiagram,
  AttentionTargetsDiagram,
  MultiLoRAServingDiagram,
} from '../components/LoRADiagrams';
import {
  MemoryHierarchyDiagram,
  ThroughputByAdapterCountDiagram,
  UniformVsZipfDiagram,
  ThroughputHeatmapDiagram,
  MaxLorasUCurveDiagram,
  TTFTHeatmapDiagram,
} from '../components/MultiLoRADiagrams';

const FPGA_SLIDES = [
  {
    number: 1,
    title: "Configurable Logic Block (CLB)",
    image: publicAsset("/images/CLB.png"),
    text: "The CLBs are the FPGA's basic logic units, which you configure to carry out the digital operations and functionality your circuit requires."
  },
  {
    number: 2,
    title: "Programmable Interconnect",
    image: publicAsset("/images/IConnect.png"),
    text: "The programmable interconnect is the reconfigurable wiring fabric that links logic, memory, and I/O resources according to the user's design."
  },
  {
    number: 3,
    title: "Input/Output Blocks",
    image: publicAsset("/images/IO.png"),
    text: "The I/O blocks form the interface between the FPGA's internal circuitry and the outside world, enabling communication with external components and systems."
  },
  {
    number: 4,
    title: "Specialized Blocks",
    image: publicAsset("/images/SB.png"),
    text: "Specialized blocks are fixed-function hardware elements integrated into the chip to support operations that benefit from optimized, non-programmable circuitry."
  }
];

const FPGASlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Preload all images on mount
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = FPGA_SLIDES.length;
    const imagePromises = FPGA_SLIDES.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = reject;
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises).catch(() => {
      // Even if some fail, mark as loaded to prevent infinite loading
      setImagesLoaded(true);
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FPGA_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FPGA_SLIDES.length) % FPGA_SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="my-12">
      <div className="relative max-w-4xl mx-auto">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden">
          <div className="relative w-full" style={{ minHeight: imagesLoaded ? 'auto' : '400px' }}>
            {FPGA_SLIDES.map((slide, index) => (
              <img 
                key={index}
                src={slide.image} 
                alt={slide.title}
                className={`w-full h-auto ${
                  index === currentSlide 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute top-0 left-0 pointer-events-none'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} className="text-[#1a1a1a] drop-shadow-lg" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={28} className="text-[#1a1a1a] drop-shadow-lg" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {FPGA_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#1a1a1a] w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="text-xl font-medium mb-3 text-[#1a1a1a]">
            {FPGA_SLIDES[currentSlide].number}. {FPGA_SLIDES[currentSlide].title}
          </h3>
          <p className="text-lg text-[#1a1a1a]">
            {FPGA_SLIDES[currentSlide].text}
          </p>
        </div>
      </div>
    </div>
  );
};

const LUT_SLIDES = [
  { number: 1, image: publicAsset("/images/FPGA_4.2_1.PNG") },
  { number: 2, image: publicAsset("/images/FPGA_4.2_2.PNG") },
  { number: 3, image: publicAsset("/images/FPGA_4.2_3.png") },
  { number: 4, image: publicAsset("/images/FPGA_4.2_4.PNG") },
  { number: 5, image: publicAsset("/images/FPGA_4.2_5.PNG") },
  { number: 6, image: publicAsset("/images/FPGA_4.2_6.PNG") },
  { number: 7, image: publicAsset("/images/FPGA_4.2_7.PNG") },
  { number: 8, image: publicAsset("/images/FPGA_4.2_8.PNG") },
  { number: 9, image: publicAsset("/images/FPGA_4.2_9.PNG") }
];

const HDLCodeExample = () => {
  const [isCombinational, setIsCombinational] = useState(true);

  const combinationalCode = `// These two assignments describe two separate logic circuits.
// Both circuits exist at the same time and continuously observe their inputs.
// When any input changes, both outputs are re-evaluated in parallel—there is no order of execution.

signal_a = input_1 & input_2;   // AND gate
signal_b = input_1 | input_3;   // OR gate`;

  const combinationalExplanation = `The AND gate and the OR gate are physically separate pieces of hardware.
They may share inputs, but each computes its output independently and simultaneously.`;

  const sequentialCode = `// Both registers sample their inputs on the same clock edge.
// The logic feeding each register runs in parallel before the clock arrives.
// On the clock edge, both stored values update at the same instant.

always @(posedge clk) begin
    signal_a_reg <= input_1 & input_2;   // AND logic feeding register A
    signal_b_reg <= input_1 | input_3;   // OR logic feeding register B
end`;

  const sequentialExplanation = `The AND logic and OR logic are evaluated continuously and independently.
The clock does not sequence the operations; it only defines the moment when both results are captured.`;

  const formatCode = (code) => {
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isBlockComment = trimmedLine.startsWith('//') && trimmedLine.length > 0;
      const hasInlineComment = line.includes('//') && !isBlockComment;
      
      if (isBlockComment) {
        return (
          <div key={index} className="text-[#5c677d]">
            {line || '\u00A0'}
          </div>
        );
      } else if (hasInlineComment) {
        const commentIndex = line.indexOf('//');
        const codePart = line.substring(0, commentIndex);
        const commentPart = line.substring(commentIndex);
        return (
          <div key={index} className="text-[#1a1a1a]">
            <span>{codePart}</span>
            <span className="text-[#5c677d]">{commentPart}</span>
          </div>
        );
      } else {
        return (
          <div key={index} className="text-[#1a1a1a]">
            {line || '\u00A0'}
          </div>
        );
      }
    });
  };

  return (
    <div className="my-8">
      <h4 className="text-lg font-medium text-[#1a1a1a] text-center mb-6">Concurrency in Verilog</h4>
      
      {/* Two Separate Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setIsCombinational(true)}
          className={`px-6 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            isCombinational
              ? 'bg-[#fce7f3] text-[#1a1a1a] font-medium border border-[#1a1a1a]'
              : 'bg-[#e5e7eb] text-[#1a1a1a]/70 hover:bg-[#e5e7eb]/80'
          }`}
        >
          Combinational
        </button>
        <button
          onClick={() => setIsCombinational(false)}
          className={`px-6 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
            !isCombinational
              ? 'bg-[#fce7f3] text-[#1a1a1a] font-medium border border-[#1a1a1a]'
              : 'bg-[#e5e7eb] text-[#1a1a1a]/70 hover:bg-[#e5e7eb]/80'
          }`}
        >
          Sequential
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto border border-gray-200">
        <pre className="font-mono text-sm leading-relaxed m-0">
          <code>
            {formatCode(isCombinational ? combinationalCode : sequentialCode)}
          </code>
        </pre>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-[#1a1a1a] mb-3">How to read this:</p>
        <p className="text-lg text-[#1a1a1a] leading-relaxed max-w-3xl mx-auto">
          {isCombinational ? combinationalExplanation : sequentialExplanation}
        </p>
      </div>
    </div>
  );
};

const LUTSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Preload all images on mount
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = LUT_SLIDES.length;
    const imagePromises = LUT_SLIDES.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = reject;
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises).catch(() => {
      // Even if some fail, mark as loaded to prevent infinite loading
      setImagesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        if (nextSlide >= LUT_SLIDES.length) {
          // Reached the end, stop playing and reset to beginning
          setIsPlaying(false);
          return 0;
        }
        return nextSlide;
      });
    }, 1500);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % LUT_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + LUT_SLIDES.length) % LUT_SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="my-12">
      <div className="relative max-w-4xl mx-auto">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden">
          <div className="relative w-full" style={{ minHeight: imagesLoaded ? 'auto' : '400px' }}>
            {LUT_SLIDES.map((slide, index) => (
              <img 
                key={index}
                src={slide.image} 
                alt={`LUT diagram ${slide.number}`}
                className={`w-full h-auto ${
                  index === currentSlide 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute top-0 left-0 pointer-events-none'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a1a1a]/30 text-[#1a1a1a] transition-colors duration-200 hover:bg-[#1a1a1a]/5"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentSlide(0);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a1a1a]/30 text-[#1a1a1a] transition-colors duration-200 hover:bg-[#1a1a1a]/5"
            aria-label="Replay slideshow from first slide"
          >
            <RotateCcw size={18} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={isPlaying}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a1a1a]/30 text-[#1a1a1a] transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a1a1a]/5"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              disabled={isPlaying}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#1a1a1a]/30 text-[#1a1a1a] transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a1a1a]/5"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {LUT_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#1a1a1a] w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const articles = [
  {
    title: 'The Quiet Skill of Not Assuming',
    date: 'June 5, 2026',
    quote: '"Not every gap needs to be filled with a guess. Some gaps just need a really good question."',
    content: (
      <>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Over the last few months, I’ve been in my first engineering role, and a lot of my work has been figuring out how to turn SOPs and internal processes into a product that people can actually use.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Before this, I don’t think I understood how much interpretation exists between a written process and a working product. A document can look really detailed, but once you start building from it, you realize how many decisions are still hidden in the wording.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Misunderstanding a requirement means building the wrong behaviour. If I assume a user will move through a workflow in the ideal way, I might miss the exact place where the experience breaks. If I assume an agent has enough context to make a decision, I might expect it to do something it was never actually set up to do.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Where this gets complex is that <strong>most assumptions don’t feel like assumptions in the moment. They feel like reasonable interpretations.</strong></p>

        <h2 className="text-2xl font-serif font-light italic tracking-tight leading-tight mt-10 mb-4 text-black dark:text-white">The harder problem isn't not knowing</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">That has been one of the more humbling parts so far. I expected the hard part to be not knowing enough, and of course that is a part of it. There’s a learning curve to obtain all the unknown context, whether that’s about the codebase, the product, how the team operates or the small decisions everyone understands because they’ve been working with the system longer than I have.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">However, I’ve come to understand that the challenge lies in noticing what I do when I don’t know something.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">When I run into something I don’t understand, there’s a choice I can make for myself. I can either ask, clarify, and spend a little more time understanding the problem, or I can quietly fill in the gaps with my inference and hope that it’s right.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I have always valued being independent. I like figuring things out on my own, and for most of my life, that has been treated as a strength. It’s a mindset of trying first, problem-solving, being resourceful, and not asking questions that I could have answered myself.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I still heavily believe in that. There’s a lot of value in being able to sit with a problem before handing it off to someone else. There’s value in researching, testing, iterating, and giving yourself the chance to build confidence through effort.</p>

        <h2 className="text-2xl font-serif font-light italic tracking-tight leading-tight mt-10 mb-4 text-black dark:text-white">When independence quietly turns into ego</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">There is a point where that independence can quietly turn into ego. Not in a loud, arrogant manner, but the type that convinces you that asking for help means you’re less capable. As a result, you keep pushing forward on your own, even though one conversation would get you unstuck faster.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">That realization has been interesting to sit with because the difference is more nuanced than I expected. Sometimes “I’m figuring it out” really does mean that I’m building the muscle and learning how to work through uncertainty on my own. Other times, I’m filling in gaps with assumptions and convincing myself I understand more than I actually do.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">In engineering, that pride can get expensive quickly. A question that feels uncomfortable to ask can save hours of debugging the wrong thing, or building a feature nobody needed, or solving a problem that was never actually the problem.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6"><strong>The cost of asking can feel high in the moment, especially when you’re new to something and want to prove yourself, but the cost of assumption is usually higher.</strong></p>

        <h2 className="text-2xl font-serif font-light italic tracking-tight leading-tight mt-10 mb-4 text-black dark:text-white">It's not about asking more, it's about asking better</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I don’t think the answer is to ask more questions just for the sake of it. It’s to learn how to ask better ones.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">A vague question can leave you just as, if not more, confused. Saying you don’t understand something is honest, but it doesn’t always give someone enough context to work with.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The questions that have helped me most are the ones that show the scope of my  understanding and the thought process behind it.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-4">This can look like:</p>
        <div className="mb-6 space-y-3 border-l border-white/20 pl-5">
          <p className="text-zinc-300 text-lg leading-relaxed font-light italic">“I’m interpreting the requirement as X. Is that right?”</p>
          <p className="text-zinc-300 text-lg leading-relaxed font-light italic">“I tried A and B, but I’m getting stuck at C. Am I thinking about this the right way?”</p>
          <p className="text-zinc-300 text-lg leading-relaxed font-light italic">“I was working towards Y. Is the goal here to optimize for speed, simplicity, or flexibility?”</p>
          <p className="text-zinc-300 text-lg leading-relaxed font-light italic">“What should happen if the user does something outside the expected flow?”</p>
          <p className="text-zinc-300 text-lg leading-relaxed font-light italic">“Is this edge case worth handling now, or is it out of scope?”</p>
        </div>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">These questions do more than ask for an answer; they make your thinking visible.</p>

        <h2 className="text-2xl font-serif font-light italic tracking-tight leading-tight mt-10 mb-4 text-black dark:text-white">This goes far beyond engineering</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">So far, I’ve mostly been talking about this through the angle of work, because that’s where this idea first became apparent. For me, it’s an environment where my assumptions have immediate consequences.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Though, the more I think about it, the more I realize this goes far beyond the engineering world.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">So much of interacting with the people around us involves filling in blanks. Someone takes longer to reply, and you’re now under the impression that they're annoyed. A tone shifts, and you start deciding what they meant by it. A friend feels distant, and before you’ve asked anything, you’re already halfway into the narrative that something has changed.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6"><strong>Sometimes we treat our interpretation and bias like facts before we ever check them.</strong></p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">It’s not that every assumption is irrational. We make them because we are trying to make sense of incomplete information. But if left unquestioned, they can quietly shape how we respond to people. You may pull away before asking what’s wrong. You may get defensive before you understand what they meant. You might create an entire story in your head and then react to that narrative instead.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">That’s where I think the skill of not assuming is really valuable; it asks you to pause and think about the way you’re thinking, before turning uncertainty into a concrete conclusion.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">When I catch myself thinking someone doesn’t care, I try to remember that there are probably other explanations I haven’t considered yet.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Instead of saying “I should already know this”, a better question might be “What context am I missing?”</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, when I start convincing myself that someone is upset with me, I’ve learned that it’s often better to verify than to build an entire story from my guess.</p>
        <h2 className="text-2xl font-serif font-light italic tracking-tight leading-tight mt-10 mb-4 text-black dark:text-white">Unlearning what I thought confidence was</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">It’s a small shift in thinking with a bigger impact than you’d think. In both cases, the pattern is the same. There’s missing context, and it’s in your hands to decide whether to ask for it or invent it.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Good questions don’t just help you get answers, they also help you become aware of the assumptions you were making without realizing it. I used to view confidence as needing fewer questions, but now I think it might be the willingness to ask clearer ones.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I’ve just begun learning this, it’s not something I’ve mastered yet. I still catch myself filling in gaps too quickly or hesitating before clarifying a basic concept. Though, I’m starting to see the goal is not to avoid not knowing, but being more honest about where my knowledge ends.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6"><strong>Not every gap needs to be filled with a guess. Some gaps just need a really good question.</strong></p>
      </>
    ),
  },
  {
    title: 'Unlearning Perfectionism',
    date: 'September 17, 2025',
    quote: '"Perfectionism doesn\'t drive success, it hinders it."',
    content: (
      <>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The obvious definition is wanting everything you do to be perfect.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">That definition only scratches the surface. It says what perfectionism looks like, but not why we cling to it.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">On a deeper level, <strong>perfectionism is the tendency to tie your self-worth and identity to your achievements.</strong></p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">These achievements are subjective and aren't the same for everyone. To one, it may mean securing their dream internship and to the next, it means buying a house by 25, graduating as valedictorian or always looking put-together.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">None of these goals are wrong on their own. In fact, I would argue that goals traditionally help add structure and direction to life. <strong>The danger comes when this gets tangled up in identity.</strong> When your wins feel like proof of your worth and your failures feel like a personal flaw.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">If you've ever felt a similar way, I don't blame you. For as long as we've known, Our educational system has upheld a hierarchy of intelligence which has conditioned us to equate our value with numbers on a test, class rankings or praise from our parents and teachers.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">In today's digital world, that message only gets louder. Social media metrics, LinkedIn updates, and curated highlight reels amplify the sense that our worth is something to be measured, compared, and displayed.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">When you grow up in that kind of environment, those lessons don't stay abstract. I remember creating a 3D model of the respiratory system, presenting it to my peers, and later being referred by my teacher to a district-wide conference.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">At ten years old, I didn't have the language for it, but I remember how much I liked being seen as capable and intelligent. It was the first time I realized that my efforts, and the way others recognized them, could shape how I was valued.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">With a natural ability to excel academically, I gradually built my sense of self around overachievement. This mindset followed me for years. but as I've grown, I've firsthand seen & experienced how fragile and exhausting it is.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">One of the clearest ways I've seen perfectionism show up is in the form of procrastination. To break it down to its core, easy tasks feel safe and their completion will reaffirm our confidence. But when a task feels remotely difficult, it's put off — not out of laziness, but out of fear.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The fear of trying and discovering we can't do it perfectly. So instead of taking the risk, we delay, waiting for the "right" time that never really comes.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The irony is that procrastination doesn't protect us from failure; it just delays growth. and each time we avoid the hard thing, we reinforce the belief that our worth is tied to effortless success. That oscillating cycle between action and avoidance compounds and decreases both your confidence and capacity to take risks.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Good news is <strong>perfectionism is a learned pattern, not a fixed trait.</strong> This means it's within our control to unlearn this mindset. That being said, it's comparable to training at the gym - we won't see overnight results and it'll require repetition and discipline.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I'm still figuring out how to let go of this mindset, but so far my favorite ways to unlearn perfectionism have been:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-zinc-300 text-lg leading-relaxed font-light"><strong>Daily updates:</strong> Write down everything you've done during the day, no matter how trivial it seems. Review this at the end of the week or periodically. Over time, you'll rewire your brain to appreciate consistency over the shiny achievements.</li>
          <li className="text-zinc-300 text-lg leading-relaxed font-light"><strong>Be a beginner on purpose:</strong> Carve out time for activities that don't align with your career path or what you're "supposed" to be good at. Exploring unfamiliar skills gives you permission to be a beginner again and reminds you that your worth isn't tied to expertise.</li>
          <li className="text-zinc-300 text-lg leading-relaxed font-light"><strong>Seek feedback early:</strong> The next time you work on a project, ask for feedback after your v1. It takes the pressure off always presenting flawless work and I've found that it helps enjoy the process of iteration too!</li>
        </ul>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The key to all these practices is shifting the focus away from outcomes and back onto the process.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I also want to mention that <strong>unlearning perfectionism does not mean lowering your standards.</strong> It's about freeing yourself from the fear of not being "enough" and internalizing that <strong>progress &gt; perfection.</strong></p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Excellence still matters, but it flourishes most when it's rooted in curiosity, growth, and joy instead of fear. By letting go of the need to get everything right, we create space for mistakes, risks, and the kind of progress that actually moves you forward.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">So the next time you catch yourself hesitating or waiting to be certain you can do it perfectly, take the step anyway. <strong>Progress will always carry you further than perfection ever could, because real growth comes not from flawless execution, but from the courage to begin.</strong></p>
        
        <hr className="border-t border-gray-200 dark:border-gray-700 my-12" />
        
        <div className="mt-8">
          <div 
            className="substack-embed" 
            data-substack-embed="https://fieldnotesbypriyal.substack.com/embed?theme=dark"
            data-substack-domain="fieldnotesbypriyal.substack.com"
          >
            <iframe 
              title="Substack embed"
              src="https://fieldnotesbypriyal.substack.com/embed?theme=dark"
              width="100%"
              height="320"
              style={{border: '1px solid #333', background: '#111', borderRadius: '8px', colorScheme: 'dark', filter: 'invert(1) hue-rotate(180deg)'}}
              frameBorder="0" 
              scrolling="no"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4 italic">
            This piece first went out in field notes by priyal — my weekly corner for sharing reflections and sparks of curiosity. If you'd like to follow along with me and receive these notes straight in your inbox, you can subscribe! ♡
          </p>
        </div>
      </>
    ),
  },
  {
    title: 'I\'ll Be Happy When [insert here] — A Reflection on Conditional Happiness Versus True Happiness.',
    date: 'June 6, 2023',
    quote: '"Conditional Happiness not only prevents us from being happy in the present, it also stunts our progress and personal growth. It holds us back from the success we are forfeiting happiness to achieve."',
    image: '/images/article.webp',
    bookImage: '/images/book.jpeg',
    tweet: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">we're wired to seek comfortability, not happiness. so, when we're presented with situations that surpass our upper limit, it's easy to unconsciously sabotage what's happening so you bring yourself to what's most familiar.</p>&mdash; priyal (@TanejaPriyal) <a href="https://twitter.com/TanejaPriyal/status/1609389471861981184?ref_src=twsrc%5Etfw">January 1, 2023</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    content: (
      <>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Around two months ago, I started an article (which still remains in my drafts) called 'I've Been More Happy Now Than I Have In The Last Couple Of Years... Why?'</p>
        <img src="/images/article.webp" alt="Draft Screenshot" className="rounded-lg shadow-md mx-auto mb-6 max-w-full" style={{maxHeight: '350px'}} />
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But weeks later, this article was still blank. Every night at 10:56 pm, I'd find myself back in my own mind, desperately searching for answers that just refused to show up.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">To be honest, this wasn't the best move on my part.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The more I questioned the 'why' behind my mental state, the more I became attached to figuring out. And, throughout that entire process, I think I ended up entering a cycle of self-sabotage.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">As I'm writing this, everything I just mentioned reminded me of a concept that I had read about in 'The Mountain is You' by Brianna Wiest — this idea of self-sabotaging when you 'hitting your upper limit.'</p>
        <img src="/images/book.jpeg" alt="The Mountain is You book, candle, and tea" className="rounded-lg shadow-md mx-auto mb-6 max-w-full" style={{maxHeight: '350px'}} />
        <div className="my-6 flex justify-center mb-10">
          <div className="w-full max-w-2xl">
            <TwitterEmbed tweetUrl="https://twitter.com/TanejaPriyal/status/1609389471861981184" />
          </div>
        </div>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Humans are wired to seek comfort everywhere they go; it explains why no one puts themselves out to face a rejection or sings in the street full of random people— it's uncomfortable.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">In the past month, without even realizing it, I ended up losing sight of the initial question about the reason behind my elevated happiness levels. Instead, I became overly fixated on the outcomes I'd been getting. Because in my mind, there was a correlation between the two.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I began setting conditions for my happiness, all of which were based on the tangible achievements I'd been getting. My happiness became contingent upon certain factors being present or certain outcomes being achieved.</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-left mb-6 overflow-x-auto text-black dark:text-white"><code>{`if (outcome == True):\n  happiness == True\nelse:\n  happiness == False`}</code></pre>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, this methodology is the way in which countless people navigate their lives — formally, it's called 'conditional happiness.'</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But, it's not a sustainable model of thinking.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">It puts you in a constant pursuit of external validation or the fulfillment of certain conditions in order to feel happy, but what actually ends up happening is that you fall into an infinite loop of waiting for the next 'big' thing.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">It's this idea that life can always be better than the current moment which sets us on a perpetual chase for the next condition that promises happiness. This becomes a never-ending cycle of constantly seeking improvement, never fully embracing the present.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, this extends beyond just me.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">So many people in the world around us think this way.</p>
        <div className="mb-6 text-left">
          <p className="italic text-gray-700 dark:text-gray-300">Some quotes I've heard...</p>
          <ul className="list-disc ml-8 mt-2 text-gray-800 dark:text-gray-200">
            <li>"I'll be happy when I buy a car."</li>
            <li>"I'll be happy when I'm rich."</li>
            <li>"I'll be happy once I get a scholarship."</li>
            <li>"I'll be happy if I get a promotion."</li>
            <li>"I'll be happy when I get into my dream program."</li>
            <li>"I'll be happy if I buy a Gucci bag."</li>
          </ul>
        </div>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I think the saddest thing is that this mental model of thinking is drilled into so many of us as children.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">As I sit down and reflect, I can remember countless of asks I demanded from my parents. What started from toys led to luxury clothing and bags — all with the common 'if I get [insert here], I'll be happy and never ask for anything again' phrase attached.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But, I don't mean to imply that goals shouldn't exist, and that improvement shouldn't be a priority. Rather, true happiness isn't dependent on anything outside of ourselves; it's internal.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">When happiness becomes conditional and relies on external factors, it transforms into a goal we strive to achieve rather than a natural expression of our being. True happiness, however, is found in the simple joy of existence itself. It shouldn't be treated as a distant objective, but rather embraced as a way of life.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, I think the couple of months where I was so invested into my high levels of happiness followed a structure where I didn't care about achievements. I was very invested into building projects I found interesting and personally connected with at the time, one being epiphany. I was going to sleep with a smile on my face every night because I enjoyed what I was working on... a lot.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But, as soon as I hit that pinnacle of an upper-limit, I found myself slipping into a headspace consumed by comparison. Instead of staying true to what truly mattered to me, I became fixated on measuring my outcomes against those of others.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">From now and then, I've learnt that everything you do should be from a place of self-love and genuine interest instead of completing something for the sake of a potential outcome.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But, that's specific to my case. For a general overview, recognizing that your happiness is based on expectations and achievements is the first step to true happiness — because, now, you're self-aware.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Arguably, it's the easiest step as well.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The real challenge of reaching true happiness is actually rewiring your brain in the way you think and how you react to the circumstances involving you.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I've had countless conversations discussing the internal insecurity of not seeing tangible results, and the entire process of navigating my thoughts led to my two-step process to reverse my thinking and reconnect with with that initial passion and authenticity.</p>
        <p className="text-lg mb-6 italic">note — this worked best for me! something else might work better for you... i think the process of overcoming these thoughts comes down to identifying the type of conditions you're setting in place.</p>
        <h2 className="text-2xl font-serif italic tracking-tight leading-tight mt-8 mb-4">1) A Detox From The Source of Conditions</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Like I've mentioned, a lot of my mental space was consumed by comparison. I identified the source of this was LinkedIn, especially during my hour-long scrolls through the app.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">So, I deleted it off my phone for a while.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">It was a conscious choice to embark on a detox of sorts, allowing my mind the freedom to wander without the constant influence of what others were doing or achieving.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I still remained updated on the projects of the people closest to me and I stayed connected with multiple communities through platforms like Slack. Of course, their ambition is always so so inspiring to see.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">But, I refrained from fixating on stalking everyone's achievements and comparing them to my own.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">A mental separation was my first step to redirect my attention towards nurturing my own passions.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">The first couple of days of doing this was weird, because I was breaking apart from this subconscious habit I was never intentional about. But, it all came together as I continued to give my brain a lil' break.</p>
        <h2 className="text-2xl font-serif italic tracking-tight leading-tight mt-8 mb-4">2) Exploring and Going Down Rabbit Holes</h2>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Main lesson from my mini-detox? The conditions I had been setting for my happiness were nothing more than a time-waster. Instead of investing my time in engaging in meaningful learning experiences, I found myself caught in a web of overthinking.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, this wasn't fun. But, as I took away the root cause, I naturally fell back into this state where I could explore and concentrate on what mattered.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I started getting excited about finding the next thing for me to work on. Instead of the spontaneous LinkedIn scrolls, I time-blocked that same ~1 hour every night to just read article on artificial intelligence and see what's out there.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">This habit was nice.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">After a few days of doing this, when I was going down an entire rabbit hole of leading & growing companies, I came across Cohere and how they're working on semantic search.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I loved it.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">I spent a couple of days just going through their documentation (ended up with 20+ pages of notes) but I felt excited again. It felt nice. Being able to spend hours understanding the fundamentals of Natural Language Processing was so fulfilling.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, this is what filled me with momentum to continue down the trajectory of exploring, along with helping me realize the flaws of obsessing over results.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">This may seem like a small achievement, but even a small step towards true happiness is a victory in my opinion.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">And, I've come to realize that a significant change in the way you doesn't happen overnight. It's an iterative process of both failures and successes, and it's common to find yourself reverting to what's comfortable. But, as long as you are self-aware, you'll continue being conscious of your method of thinking.</p>
        <p className="text-zinc-300 text-lg leading-relaxed font-light mb-6">Regardless, I'm still finding my way, navigating through life, and striving to be the best version of myself.</p>
        <div className="mt-8 p-4 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300 font-semibold text-center">TL;DR? As humans, our greatest gift is that happiness is in our control.</div>
      </>
    ),
  },
  {
    title: 'Understanding Field-Programmable Gate Arrays (FPGAs) from First Principles',
    date: 'January 3, 2026',
    quote: null,
    content: (
      <>
        <h2 id="introduction" className="text-2xl font-medium mt-8 mb-4">1. Introduction & Prerequisites</h2>
        <p className="text-lg mb-6">This article provides a technical explanation of the internal architecture and design methodologies of modern <strong>Field-Programmable Gate Arrays (FPGAs)</strong>. The focus is on analyzing how the device is constructed in silicon, how its major components interact at the transistor and signal levels, and how these elements combine to form a digital device that's universally reconfigurable.</p>
        <p className="text-lg mb-6">To navigate the architectural complexities detailed, it is assumed that the reader is familiar with digital logic design fundamentals, such as:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Logic Gates:</strong> The functional behavior of AND, OR, NOT, NAND, NOR, and XOR gates</li>
          <li className="text-lg"><strong>Truth Tables:</strong> The tabular representation of Boolean logic functions</li>
          <li className="text-lg"><strong>Boolean Algebra:</strong> The mathematical manipulation of binary variables</li>
          <li className="text-lg"><strong>Adder Circuits:</strong> The mechanics of binary addition, including half-adders, full-adders, and ripple-carry propagation</li>
          <li className="text-lg"><strong>Sequential Logic:</strong> The concept of state retention using latches and flip-flops, and the critical role of clock signals in synchronous systems</li>
        </ul>
        <p className="text-lg mb-6">No prior experience with Hardware Description Languages (HDL) such as VHDL or Verilog, nor familiarity with specific FPGA vendor toolchains, is required.</p>

        <h2 id="hardware-spectrum" className="text-2xl font-medium mt-8 mb-4">2. The Gap in the Hardware Spectrum</h2>
        
        <h3 id="evolution-logic-chips" className="text-xl font-medium mt-6 mb-3">2.1 The Evolution of Logic Chips</h3>
        <p className="text-lg mb-6">A logic chip is defined as a semiconductor integrated circuit that performs fundamental operations, calculations and processing tasks in electronic systems. From personal smartphones to industrial automation and automotive systems, these chips play an imperative role in today’s digital world.</p>
        <p className="text-lg mb-6">The most familiar of these is the <strong>Central Processing Unit (CPU)</strong>. Mechanically, a CPU operates on a sequential execution model. In this model, instructions are fetched from memory, decoded, and executed one after another. At the hardware level, a program counter provides the address of the next instruction; the CPU retrieves it, interprets the operation, and activates the appropriate circuitry to execute the command before advancing to the next step.</p>
        <p className="text-lg mb-6">While this architecture excels at tasks requiring complex decision-making, data-driven branching, and frequent interaction with memory, the demands of emerging workloads in the 1990s exposed a significant limitation: the CPU's constrained capacity for executing massive numbers of computations concurrently. The inherently serial nature of the fetch-decode-execute cycle was unsuited for tasks such as 3D graphics rendering, which required performing identical mathematical operations across thousands of independent pixels simultaneously.</p>
        <p className="text-lg mb-6">This gap led to the emergence of the <strong>Graphics Processing Unit (GPU)</strong>. Unlike a CPU’s serial approach, a GPU arranges its hardware into arrays of basic arithmetic units that operate in unison. By giving each unit a different piece of data to work on while issuing the same instruction to all of them, the GPU can carry out many identical calculations at once.</p>
        <p className="text-lg mb-6">Although this structure delivers extensive throughput, it comes with significant limitations. Groups of GPU threads must advance together under a shared instruction, so any divergence in their behavior forces the hardware to serialize parts of the computation and reduces efficiency. Furthermore, the internal circuits are optimized specifically for arithmetic-heavy, data-parallel tasks rather than general-purpose logic. As a result, GPUs excel at uniform numerical workloads but are far less flexible when the computation’s execution path varies according to the data being handled.</p>
        <p className="text-lg mb-6">Another important class of logic chips is the <strong>Application-Specific Integrated Circuit (ASIC)</strong>. Unlike CPUs and GPUs, which rely on instruction-driven execution, an ASIC implements a fixed hardware design directly in silicon. This means every gate and control path is engineered for a defined purpose.</p>
        <p className="text-lg mb-6">While this allows the chip to achieve far higher performance, a major drawback is that an ASIC cannot be reprogrammed after fabrication; the logic is permanently fixed. Any change to the algorithm, protocol, or hardware behavior requires a full redesign and an entirely new manufacturing run, which can cost millions of dollars and months of development time. This rigidity makes ASICs impractical for everchanging environments or applications that require post-deployment updates.</p>

        <h3 id="why-fpgas" className="text-xl font-medium mt-6 mb-3">2.2 Why FPGAs? The Need for Reconfigurable Hardware</h3>
        <p className="text-lg mb-6">By the late 20th century, the hardware landscape had polarized into two categories: flexible, instruction-based processors (CPUs/GPUs) and high-performance, fixed-function hardware (ASICs). A critical void existed for a platform that could offer the performance characteristics of custom hardware while retaining the post-deployment adaptability of software.</p>
        <p className="text-lg mb-6">Varying industries, like telecommunications and aerospace to name a few, demanded a change. They required hardware capable of processing data at wire speed, yet they also needed the ability to update encryption algorithms, modulation schemes, and communication protocols long after the hardware had been deployed. They could not commit to fixed silicon due to the risk of obsolescence, but they could not afford the inefficiency of serialized software.</p>
        <p className="text-lg mb-6">This multifaceted demand motivated the novel creation of <strong>Field-Programmable Gate Arrays (FPGAs)</strong>. Instead of running a stream of instructions through a fixed microarchitecture, the user provides a configuration bitstream that rewires the hardware itself. The FPGA is essentially a collection of uncommitted logic resources, including gates, memory blocks, and wiring switches. When programmed, the device physically transforms into a specific digital circuit. The functionality is not expressed as a sequence of commands but as the spatial structure of the hardware. Updating an FPGA means redefining the logic equations, the data paths, and the control behavior implemented active within the chip. So, the device assumes a new functional behavior without the need for new manufacturing.</p>

        <h2 id="fpga-architectural-overview" className="text-2xl font-medium mt-8 mb-4">3. An Overview of an FPGA's Architecture</h2>
        <p className="text-lg mb-6">Modern FPGAs can be visualized as a two-dimensional matrix of small logic units surrounded by a programmable wiring network. Instead of instruction-driven execution, like those found in CPUs and GPUs, the FPGA contains no predefined instructions. It offers a canvas of logic elements, routing switches, memory structures, and hardwired computational blocks that can be interconnected to form almost any digital circuit.</p>
        <img src={publicAsset("/images/FPGAOverview.PNG")} alt="FPGA Architectural Overview" className="w-full max-w-4xl mx-auto my-8" />
        <p className="text-lg mb-6">When a configuration bitstream is loaded, it does not instruct the FPGA how to execute operations serially but rather redefines the structure of the hardware itself. The chip's internal switches are set so that signals flow through logic functions, memory elements, and routing paths. In effect, the FPGA transforms into a custom, application-specific integrated circuit, without requiring new silicon.</p>
        <p className="text-lg mb-6">It's important to note that the specific implementations differ among vendors and models. However, modern FPGAs share the same top-level structure composed of four major elements:</p>

        <FPGASlideshow />

        <p className="text-lg mb-6">Together, these elements form the foundation of contemporary FPGAs. The sections ahead detail how each component functions and illustrate how they combine to create hardware tailored precisely to the demands of any design.</p>

        <h2 id="clb" className="text-2xl font-medium mt-8 mb-4">4. Configurable Logic Blocks (<span className="font-medium">CLB</span>)</h2>
        <p className="text-lg mb-6">The <strong>Configurable Logic Block (CLB)</strong>, variously termed <strong>Logic Array Block (LAB)</strong> or <strong>Logic Element (LE)</strong> depending on the vendor, is the fundamental building block that gives an FPGA its ability to form arbitrary digital circuits.</p>
        <p className="text-lg mb-6">At a high level, a CLB is a cluster of smaller, identical sub-units often called <strong>Slices</strong> or <strong>Adaptive Logic Modules (ALMs)</strong>.</p>
        <img
          src={publicAsset("/images/ALM_Diagram.png")}
          alt="Adaptive Logic Module illustration"
          className="w-full max-w-3xl mx-auto my-2"
        />
        <p className="text-lg mb-6">An individual ALM consists of three essential resources that are the backbone of its capabilities:</p>
        <ol className="list-decimal ml-8 mb-6 space-y-2">
          <li className="text-lg">Lookup Tables (LUTs) to implement combinational logic</li>
          <li className="text-lg">Flip-Flops (FFs) or Registers to implement sequential logic</li>
          <li className="text-lg">Carry-Chain Circuitry to implement arithmetic operations efficiently</li>
        </ol>

        <h3 id="luts" className="text-xl font-medium mt-6 mb-3">4.1 Lookup Tables (<span className="font-medium">LUTs</span>)</h3>
        <p className="text-lg mb-6">The <strong>Lookup Table (LUT)</strong> is the primary combinational logic primitive in an FPGA. Despite the name Field-Programmable <strong>Gate</strong> Array, modern FPGAs do not contain physical AND, OR, or NAND gates in the user-programmable fabric. Instead, logic is implemented using memory.</p>
        <p className="text-lg mb-6">Physically, a LUT is a small bank of SRAM cells coupled with a multiplexer tree. To implement a logic function, such as <span className="font-mono">Y = (A ∧ B) ∨ C</span>, the synthesis software first calculates the truth table for that function. During device configuration, the output column of this truth table is loaded into the LUT's SRAM cells. During operation, the input signals (<span className="font-mono">A, B, C</span>) act as the address lines to the respective SRAM. The multiplexer uses this address to select the appropriate bit from the memory and drives it to the output.</p>
        
        <LUTSlideshow />

        <p className="text-lg mb-6">Because a LUT reads a pre-calculated result from memory rather than evaluating a chain of logic gates, the propagation delay through a LUT is independent of the logical complexity of the function. A simple 2-input AND gate and a complex 6-input Boolean expression take the exact same amount of time to execute, provided they fit within a single LUT. The number of LUT inputs is therefore a key architectural parameter, as it dictates the stages of multiplexers the signal must traverse internally.</p>
        
        <h4 className="text-lg font-medium mt-4 mb-2">Architectural Development: The 6-Input LUT</h4>
        <p className="text-lg mb-6">Early FPGAs utilized 4-input LUTs. However, modern architectures (such as the Xilinx 7-Series, UltraScale, and Intel Stratix 10) have standardized on 6-input LUTs. This design choice represents a complex trade-off between silicon area and system performance.</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Area Penalty:</strong> A <span className="font-mono">k</span>-input LUT requires 2<sup><span className="font-mono">k</span></sup> configuration bits. Moving from 4 inputs (2<sup>4</sup> = 16 bits) to 6 inputs (2<sup>6</sup> = 64 bits) increases the SRAM area by 4× for only a 1.5× increase in input width.</li>
          <li className="text-lg"><strong>Performance Increase:</strong> The dominant source of delay in FPGAs is the programmable interconnect (routing), not the logic itself. By moving to larger LUTs, designs require fewer logic levels (LUTs in series) to implement a function. This reduces the number of interconnect hops a signal must travel through, significantly increasing the maximum frequency of the circuit.</li>
        </ul>
        <p className="text-lg mb-6">Modern LUTs are also fracturable. A single 6-input LUT can typically be split into two 5-input LUTs (sharing some inputs) or two independent small LUTs. This prevents the waste of silicon resources when implementing simple logic functions, ideally balancing the need for deep logic with the efficiency of granular logic.</p>
        <img src={publicAsset("/images/Fracturable-LUT.PNG")} alt="Fracturable LUT" className="w-full max-w-4xl mx-auto my-8" />

        <h3 id="flip-flops-registers" className="text-xl font-medium mt-6 mb-3">4.2 Flip-Flops and Registers</h3>
        <p className="text-lg mb-6">LUTs give an FPGA the ability to implement arbitrary combinational logic, but by itself it cannot hold information. Digital systems require a way to remember intermediate results, synchronize operations, and ensure signals remain stable long enough for downstream logic to evaluate them. Hence, each logic cell includes one or more dedicated flip-flops (FF) that serve as a fundamental storage resource.</p>
        <p className="text-lg mb-6">At a conceptual level, a flip-flop is a one-bit memory element that updates its stored value only when a clock signal transitions. The FPGA uses D-type edge-triggered flip-flops, where the data input is sampled just before the active clock transition and then transferred to the output at the moment of the edge. Between clock events, the output remains fixed, even if upstream signals continue to fluctuate.</p>
        <img
          src={publicAsset("/images/Clock_Cycle.png")}
          alt="Clock cycle illustration"
          className="w-full max-w-3xl mx-auto my-2"
        />
        <p className="text-lg mb-6">This controlled update behavior creates the foundation of synchronous logic. Instead of allowing signals to ripple through the design without coordination and creating a system that is susceptible to glitches, the circuit advances through a sequence of well-defined states on each clock cycle.</p>
        <p className="text-lg mb-6">Recall that in each logic cell, the flip-flop sits directly beside the LUT to minimize routing delay between logic and storage. A 2:1 multiplexer then selects whether the LUT’s output is sent out immediately or routed through the flip-flop first, determining whether the logic operates combinationally or as a registered pipeline stage.</p>

        <h3 id="carry-chains" className="text-xl font-medium mt-6 mb-3">4.3 Carry Chains</h3>
        <p className="text-lg mb-6">Binary addition and subtraction rely on the propagation of a <em>carry</em> bit. In a standard ripple-carry adder, the carry-out from bit <span className="font-mono">N</span> must propagate to the input of bit <span className="font-mono">N</span>+1. If implemented using standard LUTs and general routing, a 32-bit adder would require the signal to traverse 32 LUTs and 32 interconnect segments, resulting in prohibitive delays.</p>
        <p className="text-lg mb-6">To solve this, FPGAs incorporate dedicated carry logic, a hardwired silicon path that runs vertically between adjacent Slices. This bypasses the general routing fabric entirely. When an adder is synthesized, the LUTs compute the sum bits, while the carry propagation is offloaded to this dedicated high-speed avenue. The carry signal can traverse a Slice in mere picoseconds, allowing FPGAs to implement wide counters and adders (eg. 64-bit or 128-bit) that operate at hundreds of Megahertz.</p>
        <img src={publicAsset("/images/CarryChainsALM.PNG")} alt="Diagram of ALMs arranged vertically with carry-chain circuitry" className="w-full max-w-4xl mx-auto my-8" />

        <h2 id="programmable-interconnect" className="text-2xl font-medium mt-8 mb-4">5. Programmable Interconnect</h2>
        <p className="text-lg mb-6">Once the CLBs have been defined to perform specific operations, the next challenge in FPGA design is establishing the pathways that enable communication between these logic units. FPGAs don't simply contain isolated logic blocks; they require interconnections to form functional circuits that facilitate data transfer between logic blocks, memory units, and other specialized resources. This is achieved through a network of pre-fabricated wires and programmable switches.</p>

        <h3 id="routing-channels" className="text-xl font-medium mt-6 mb-3">5.1 Routing Channels</h3>
        <p className="text-lg mb-6">As previously established, the CLBs are arranged in a grid-like structure, with channels positioned in the rows and columns adjoining them. These channels are made up of fixed wire segments that provide predefined paths for signal transmission across the FPGA. Although the wires themselves remain static, their strategic placement allows for significant routing flexibility.</p>
        <img src={publicAsset("/images/Interconnect2.PNG")} alt="Interconnect routing channels" className="w-full max-w-4xl mx-auto my-8" />
        <p className="text-lg mb-6">To connect one logic block to another, a signal must first exit the logic block pin, then enter the adjacent routing channel and traverse through the network to reach its destination. By leveraging the right combination of horizontal and vertical channels, each logic block is guaranteed a direct path to any other component on the board. When possible, data prioritizes the travel through local wires that connect neighbouring CLBs, to minimize delay. This grid-based layout provides the FPGA with both the reach and adaptability to implement circuits with varying complexity.</p>

        <h3 id="switch-matrices" className="text-xl font-medium mt-6 mb-3">5.2 Switch Matrices</h3>
        <p className="text-lg mb-6">The mechanism that makes these fixed wires <em>programmable</em> is the <strong>Switch Matrix</strong> located at the intersection of every horizontal and vertical channel. A Switch Matrix is a collection of pass transistors whose states are controlled by SRAM cells.</p>
        <img src={publicAsset("/images/Switch_Matrix.PNG")} alt="Switch Matrix diagram" className="w-full max-w-4xl mx-auto my-8" />
        <p className="text-lg mb-6">When a routing path is defined, the configuration bitstream turns on specific transistors within the matrix, creating a conductive 90-degree or 180-degree path for signals to travel through. By default, the transistors remain in an off state, meaning the connection between the vertical and horizontal wires is open and electrically isolated.</p>
        <img src={publicAsset("/images/Switch_Memory.PNG")} alt="Switch Memory cell" className="w-full max-w-4xl mx-auto my-8" />

        <h3 id="key-parameters" className="text-xl font-medium mt-6 mb-3">5.3 Key Parameters</h3>
        <p className="text-lg mb-6">The routing network's behaviour is governed by several architectural parameters that determine how many paths exist, how far signals can travel, and how much delay each connection incurs. Understanding these parameters and design trade-offs is essential for appreciating how FPGAs achieve their reconfigurability.</p>

        <h4 className="text-lg mt-4 mb-2" style={{fontWeight: 400}}>1. <span style={{fontWeight: 600, textShadow: '0.15px 0 0 currentColor'}}>Switch Hops</span></h4>
        <p className="text-lg mb-6">Switch hops are defined as the number of switch matrices a signal travels through. When traversing through a matrix, it experiences a delay due to the pass transistor and the intrinsic wiring capacitance. Designers and tools therefore aim to minimize the number of switch matrices a signal must pass through.</p>
        <p className="text-lg mb-6">For reference, a direct neighbour-to-neighbour connection is typically 1 hop whereas a long-distance route may entail many hops, depending on the desired result.</p>
        <p className="text-lg mb-6">Reducing hop count is a foundational optimization objective in FPGA routing, as it directly impacts processing speed and power.</p>

        <h4 className="text-lg mt-4 mb-2" style={{fontWeight: 400}}>2. <span style={{fontWeight: 600, textShadow: '0.15px 0 0 currentColor'}}>Channel Width</span></h4>
        <p className="text-lg mb-6">Channel width (denoted by <span className="font-mono">W</span>) defines the number of parallel routing tracks available in each channel. It is a critical parameter that dictates the routing capacity of the FPGA fabric.</p>
        <p className="text-lg mb-6">A greater <span className="font-mono">W</span> value directly translates to several benefits:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><span className="font-medium">More alternative paths:</span> A higher track count gives the routing algorithms more options for connecting logic block outputs to inputs, making it easier to find efficient, low-latency routes.</li>
          <li className="text-lg"><span className="font-medium">Reduced routing congestion:</span> As circuits become larger and more complex, they require more connections. A wider channel reduces the likelihood of signals competing for the same limited wires, preventing bottlenecks.</li>
          <li className="text-lg"><span className="font-medium">Lower likelihood of failed routing:</span> For complex designs, a sufficiently wide channel is necessary to ensure that all required connections can be successfully mapped onto the physical hardware.</li>
        </ul>
        <p className="text-lg mb-6">However, increasing <span className="font-mono">W</span> comes with a significant trade-off in terms of silicon area and power consumption. Every additional wire requires extra metal, more switch connections within the switch matrix, and larger transistor structures to manage the increased complexity.</p>
        <p className="text-lg mb-6">FPGA vendors must therefore tune <span className="font-mono">W</span> to the minimum value that guarantees high routability for the vast majority of practical designs without causing excessive silicon cost. The chosen <span className="font-mono">W</span> value represents a balance point between performance/flexibility and manufacturing cost/power efficiency.</p>

        <h4 className="text-lg mt-4 mb-2" style={{fontWeight: 400}}>3. <span style={{fontWeight: 600, textShadow: '0.15px 0 0 currentColor'}}>Segment Length</span></h4>
        <p className="text-lg mb-6">An FPGA's channel length (denoted by <span className="font-mono">L</span>) refers to the distance wire segments span in the programmable routing fabric. <span className="font-mono">L</span> is measured by the number of CLBs that span a single continuous wire.</p>
        <p className="text-lg mb-6">Short segments (<span className="font-mono">L = 1</span>, connecting only adjacent CLBs) offer maximum routing flexibility because a signal can change direction at every CLB boundary. Though, a long-distance connection using only short segments utilizes a high number of switch hops, resulting in a significant signal delay.</p>
        <p className="text-lg mb-6">Conversely, longer segments (<span className="font-mono">L &gt; 1</span>, spanning multiple CLBs) provide faster long-distance connections by reducing the number of switch matrices a signal must traverse. Yet, these long wires are less flexible for local connections, as they must be used in their entirety, potentially overshooting the target and leading to unnecessary resource consumption.</p>
        <p className="text-lg mb-6">Modern FPGAs use a hierarchical routing architecture that combines segments of various lengths to balance these trade-offs. This multi-segment approach allows the synthesis tools to select the optimal wire length for each connection; the FPGA will intentionally use short wires for local, granular connections and longer segments for signals stretching across greater distances.</p>
        <p className="text-lg mb-6">Overall, FPGA vendors must account for the key parameters and achieve the right balance among routing flexibility, timing predictability, and silicon overhead. It's a core design challenge that continues to be explored, to ensure the device offers optimal flexibility and performance for the vast range of circuits FPGAs are designed to implement.</p>

        <h2 id="memory-resources" className="text-2xl font-medium mt-8 mb-4">6. Memory Resources</h2>
        <p className="text-lg mb-6">While flip-flops provide fast, distributed state retention, they are area-inefficient for bulk data storage. A single flip-flop consumes a relatively large area compared to a dedicated memory unit. To address this, FPGAs employ diverse on-chip memory resources such as block RAM (<span className="font-medium">BRAM</span>), distributed RAM implemented using lookup tables (LUTs), and specialized shift-register memory structures, enabling efficient storage of large volumes of data with reduced area and power consumption.</p>
        
        <h3 id="cram" className="text-xl font-medium mt-6 mb-3">6.1 Configuration RAM (<span className="font-medium">CRAM</span>)</h3>
        <p className="text-lg mb-6">The most fundamental memory in an FPGA is one the user never interacts with directly: the <strong>Configuration RAM (CRAM)</strong>. These are the millions of volatile SRAM cells that store the user's design. The bitstream file loaded at startup is essentially a binary image of this memory.</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Function:</strong> CRAM bits drive the select lines of multiplexers, the gates of routing pass transistors, and the truth tables of LUTs.</li>
          <li className="text-lg"><strong>Volatility:</strong> Since CRAM is SRAM-based, it loses its data when power is removed. This is why most FPGAs must be reconfigured from an external flash memory or processor at every power cycle.</li>
        </ul>

        <h3 id="distributed-ram" className="text-xl font-medium mt-6 mb-3">6.2 Distributed RAM</h3>
        <p className="text-lg mb-6">The first layer of user-accessible memory is Distributed RAM. As noted in Section 4.1, LUTs are built from a collection of SRAM cells. In standard logic mode, this SRAM is read-only. However, modern FPGA architectures (such as Xilinx's SLICEM) include additional write circuitry that allows the user logic to write to the LUT's SRAM cells during operation.</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Flexibility:</strong> This allows small memories to be instantiated anywhere in the logic fabric. A single LUT can become a 32 × 1 bit RAM or a 16 × 2 bit RAM.</li>
          <li className="text-lg"><strong>Use Cases:</strong> Distributed RAM is ideal for small scratchpad memories, register files, and small FIFOs where the overhead of a large memory block is unjustified.</li>
          <li className="text-lg"><strong>Shift Registers (<span className="font-medium">SRL</span>):</strong> A unique capability of Distributed RAM is the <strong>Shift Register Logic (SRL)</strong> mode. The SRAM cells in the LUT can be chained together to form a variable-length shift register (e.g. up to 32 bits deep) without using a single flip-flop. This is highly efficient for implementing digital delay lines and pipelining in DSP applications.</li>
        </ul>

        <h3 id="block-ram" className="text-xl font-medium mt-6 mb-3">6.3 Block RAM (<span className="font-medium">BRAM</span>)</h3>
        <p className="text-lg mb-6">For bulk storage, ranging in kilobytes to megabytes, FPGAs embed columns of dedicated <span className="font-medium">Block RAM (BRAM)</span>. These are hard-macro SRAM arrays (typically 18Kb or 36Kb in size) that exist separately from other core components.</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>True Dual-Port:</strong> This allows simultaneous reads and writes from different clock domains, which makes BRAMs ideal for implementing FIFOs that safely transfer data between circuits running on different clocks.</li>
          <li className="text-lg"><strong>Configurability:</strong> A BRAM is not a fixed shape. A 36Kb block can be configured as a deep, narrow memory (32K × 1), a wide, shallow memory (1K × 36), or various aspect ratios in between. This elasticity allows the memory to match the data path width perfectly.</li>
          <li className="text-lg"><strong>Performance:</strong> Because BRAMs are hard-wired custom blocks, they are significantly faster and denser than Distributed RAM. They often include built-in features like <strong>Error Correction Code (ECC)</strong> logic and output registers to maximize timing performance.</li>
        </ul>

        <p className="text-lg mb-4 font-medium text-center">Comparison of Memory Resources</p>
        <div className="my-8 overflow-x-auto flex justify-center">
          <table className="border-collapse border border-gray-300 text-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Feature</th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Flip-Flops (Registers)</th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Distributed RAM (LUT RAM)</th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Block RAM (BRAM)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Primary Use</td>
                <td className="border border-gray-300 px-4 py-2 text-center">State machines, pipelines</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Small LUTs, coefficients, delay lines</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Data buffers, large FIFOs, caches</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Bit Density</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Very Low</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Low</td>
                <td className="border border-gray-300 px-4 py-2 text-center">High</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Speed</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Ultra-High</td>
                <td className="border border-gray-300 px-4 py-2 text-center">High</td>
                <td className="border border-gray-300 px-4 py-2 text-center">High (with latency)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Ports</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Single (D input, Q output)</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Single or Dual (Read/Write)</td>
                <td className="border border-gray-300 px-4 py-2 text-center">True Dual Port (A & B)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Resource Cost</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Uses Slice Register</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Uses Logic LUTs</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Uses Dedicated BRAM Column</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-medium text-center">Ideal Size</td>
                <td className="border border-gray-300 px-4 py-2 text-center">1 bit - 100 bits</td>
                <td className="border border-gray-300 px-4 py-2 text-center">100 bits - 10 Kbits</td>
                <td className="border border-gray-300 px-4 py-2 text-center">10 Kbits - Megabits</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="dsp-slices" className="text-2xl font-medium mt-8 mb-4">7. DSP Slices / Hardened Arithmetic Blocks</h2>
        <p className="text-lg mb-6">Although Lookup Tables can be configured to perform arithmetic operations, implementing complex mathematical functions purely in general logic is both area-inefficient and slow. For example, an 18×18-bit multiplier synthesized from LUTs would consume hundreds of logic elements and suffer from long carry-propagation delays.</p>
        <p className="text-lg mb-6">To approach this inefficiency, modern FPGAs integrate DSP slices, which are fixed-function units optimized for high-throughput numerical computation. These blocks form the computational backbone of applications such as digital signal processing, video processing, wireless communication, and machine learning acceleration.</p>

        <h3 id="dsp-internal-structure" className="text-xl font-medium mt-6 mb-3">7.1 Internal Structure of a DSP Slice</h3>
        <p className="text-lg mb-6">A <strong>DSP slice</strong> is best understood as a pre-built arithmetic pipeline whose main job is to compute a <strong>multiply-accumulate (MAC)</strong>. The canonical operation is:</p>
        <p className="text-lg mb-6 font-mono text-center py-4 bg-gray-50 rounded">P = A × B + C</p>
        <p className="text-lg mb-6">This appears constantly in digital signal processing because many algorithms reduce to multiplying some input by a coefficient, then adding it into a running sum. Instead of building this out of LUTs and carry chains, the FPGA provides a hardened block that already contains the required hardware to improve calculation speed.</p>
        <p className="text-lg mb-6">Internally, the slice contains three main arithmetic stages arranged in a fixed datapath. Many DSP slices include an optional pre-adder. This unit can add or subtract two input values before they reach the multiplier, allowing the slice to compute expressions of the form <span className="font-mono">(A₁ ± A₂) × B</span>. Following is the dedicated multiplier, commonly sized around 25×18 or 27×18 bits depending on the vendor family. The multiplier output feeds into a wide post-adder / accumulator (often 48 bits) which can add an incoming value <span className="font-mono">C</span> and store the result <span className="font-mono">P</span>.</p>
        <p className="text-lg mb-6">Because these stages are separated by optional pipeline registers, the DSP slice can be clocked at very high frequencies. The trade-off is that the result may appear after a fixed number of cycles of latency, but once the pipeline is full the slice can produce one result per cycle.</p>
        <p className="text-lg mb-6">Many modern architectures also include auxiliary logic such as a pattern detector, which can compare the output against a programmed value. This feature is typically used for tasks like overflow detection, rounding behavior, or saturation logic, rather than being a core part of the MAC datapath.</p>

        <h3 id="pre-adder" className="text-xl font-medium mt-6 mb-3">7.2 The Role of the Pre-Adder</h3>
        <p className="text-lg mb-6">At first glance, a pre-adder seems redundant because the DSP slice already contains an adder after the multiplier. The key difference is where the addition occurs. The post-adder combines results after multiplication. The pre-adder combines values before multiplication, which can reduce the number of multiplications required in certain algorithms.</p>
        <p className="text-lg mb-6">This particularly matters because multipliers are the most expensive arithmetic operation in terms of power and area. If an algorithm can be rearranged to use fewer multiplications, it becomes significantly more efficient.</p>
        <p className="text-lg mb-6">A common example is the <strong>Finite Impulse Response (FIR)</strong> filter, where symmetric coefficients often occur:</p>
        <p className="text-lg mb-6 font-mono text-center py-4 bg-gray-50 rounded">h₀ = hₙ, h₁ = hₙ₋₁, …</p>
        <p className="text-lg mb-6">In a symmetric FIR, two different input samples are multiplied by the same coefficient. Because multiplication distributes over addition, those two multiplications can be rewritten as one multiplication if the inputs are added first:</p>
        <p className="text-lg mb-6 font-mono text-center py-4 bg-gray-50 rounded">h₀ · x[n] + h₀ · x[n-k] = h₀ · (x[n] + x[n-k])</p>
        <p className="text-lg mb-6">This is exactly what the pre-adder enables. The DSP slice can add <span className="font-mono">x[n]</span> and <span className="font-mono">x[n-k]</span> in the pre-adder and then multiply the sum by the shared coefficient <span className="font-mono">h₀</span>. In effect, the design computes the contribution of two filter taps using one multiplier, which increases throughput or reduces DSP usage while keeping the same filter behavior.</p>
        <p className="text-lg mb-6">In practical terms, the pre-adder exists because it matches the structure of real DSP workloads: many systems repeatedly perform the sum of two samples, multiplied by a coefficient, and accumulate into an output. Implementing that pattern directly inside the DSP slice is more efficient than forcing the synthesis tools to build it from general logic.</p>

        <h3 id="cascading-wide-arithmetic" className="text-xl font-medium mt-6 mb-3">7.3 Cascading and Wide Arithmetic</h3>
        <p className="text-lg mb-6">DSP slices are not intended to operate independently. They are arranged in vertical columns and connected by dedicated cascade paths that allow data to pass directly from one slice to the next without traversing the general routing fabric, in a similar manner to carry-chain circuitry. This architectural choice enables the construction of extremely wide arithmetic structures.</p>
        <p className="text-lg mb-6">By chaining multiple slices together, designers can build accumulators exceeding 96 or 128 bits while maintaining high clock frequencies. Because the intermediate signals remain on dedicated inter-slice wiring, these wide datapaths avoid the routing delays that would otherwise limit performance.</p>
        <p className="text-lg mb-6">Some DSP architectures also support SIMD modes, in which the wide arithmetic units are subdivided into multiple smaller lanes. In this configuration, a single DSP slice can operate on several lower-precision data streams simultaneously, making it particularly effective for applications that must be processed in parallel.</p>

        <h2 id="io-transceivers" className="text-2xl font-medium mt-8 mb-4">8. I/O, Transceivers, and High-Speed Interfaces</h2>
        <p className="text-lg mb-6">The <strong>Input/Output (I/O)</strong> subsystem defines how an FPGA communicates with the external world. While the internal logic of an FPGA may operate at hundreds of megahertz, the adequacy of the device also depends on how efficiently data can enter and leave the chip. As interface speeds have increased from simple GPIO-style signaling to multi-gigabit serial links, the I/O design has evolved into one of the most complex mixed-signal components.</p>
        <p className="text-lg mb-6">Rather than treating I/O as simple digital buffers, contemporary FPGA designs integrate configurable electrical drivers, on-chip impedance control, differential signaling support, and hardened high-speed transceivers. This allows the same device to interface with low-speed control signals, high-speed memory buses, and multi-gigabit communication protocols all together.</p>

        <h3 id="io-blocks" className="text-xl font-medium mt-6 mb-3">8.1 I/O Blocks and Electrical Standards</h3>
        <p className="text-lg mb-6">Each physical pin on an FPGA is controlled by an <strong>Input/Output Block (IOB)</strong>. The IOB forms the boundary between the FPGA's internal logic fabric and the external printed circuit board. Unlike fixed-function chips, FPGA IOBs are highly configurable, allowing the same pin to support a wide range of electrical signaling standards through configuration alone.</p>
        <p className="text-lg mb-6">These standards define voltage levels, termination requirements, and signaling behavior. For example, an IOB may be configured to operate as 3.3 V LVTTL for simple control signals, 1.2 V POD for DDR memory interfaces, or LVDS for high-speed differential communication. This flexibility allows a single FPGA to replace many discrete interface components.</p>
        <p className="text-lg mb-6">At high signaling speeds, PCB traces behave as transmission lines rather than ideal wires. If the output impedance of the FPGA driver does not match the characteristic impedance of the trace, signal reflections occur. These reflections can cause ringing, overshoot, and data corruption, particularly as edge rates increase.</p>
        <p className="text-lg mb-6">To handle this, FPGAs implement <strong>Digitally Controlled Impedance (DCI)</strong>. Instead of relying on external termination resistors, the FPGA dynamically adjusts the strength of its output transistors to match a reference impedance. This calibration compensates for variations in manufacturing process, supply voltage, and temperature, maintaining signal integrity while reducing board-level complexity.</p>

        <h3 id="differential-signaling" className="text-xl font-medium mt-6 mb-3">8.2 Differential Signaling and LVDS</h3>
        <p className="text-lg mb-6">As data rates increase, single-ended signaling becomes increasingly susceptible to noise and electromagnetic interference. To overcome this limitation, FPGAs make extensive use of differential signaling, most commonly in the form of <strong>Low-Voltage Differential Signaling (LVDS)</strong>.</p>
        <p className="text-lg mb-6">In differential signaling, information is conveyed as the voltage difference between two complementary wires rather than as an absolute voltage relative to ground. When the transmitted logic value changes, one wire increases in voltage while the other decreases. The receiver measures only the difference between the two.</p>
        <p className="text-lg mb-6">This approach offers two major advantages. First, external noise tends to couple equally onto both wires, appearing as common-mode noise that is rejected by the receiver. Second, as the voltage swing is small, power consumption is reduced and edge transitions can occur more quickly. These properties allow LVDS links to operate reliably at data rates exceeding 1 Gbps per pin pair while maintaining signal integrity.</p>

        <h2 id="clocking-architecture" className="text-2xl font-medium mt-8 mb-4">9. Clocking Architecture</h2>
        <p className="text-lg mb-6">In synchronous digital systems, the clock signal defines when data is sampled and propagated. Distributing this signal across a large FPGA while maintaining precise timing alignment is one of the most challenging aspects of chip design.</p>

        <h3 id="global-clock-distribution" className="text-xl font-medium mt-6 mb-3">9.1 Global Clock Distribution and Skew</h3>
        <p className="text-lg mb-6">Clock skew refers to the difference in arrival time of a clock edge at different flip-flops. Excessive skew can lead to data being sampled incorrectly along with hold-time violations and setup failure.</p>
        <p className="text-lg mb-6">To minimize this effect, FPGAs use a dedicated global clock distribution network that is entirely separate from the general routing system. This network is carefully engineered to provide low resistance, low capacitance paths with highly predictable delays. A common topology is the H-tree, in which the clock signal enters near the center of the chip and branches outward symmetrically. By matching the physical length of each branch, the propagation delay from the source to every endpoint is equalized as much as possible.</p>
        <p className="text-lg mb-6">Modern FPGAs further divide the device into rectangular clock regions, each with local clocking resources. This structure allows different regions of the chip to operate on different clocks, enabling multiple independent clock domains while maintaining low skew within each region.</p>
        <p className="text-lg mb-6">It is important to distinguish skew from jitter. Skew is a spatial effect, describing differences in arrival time across the chip, whereas jitter is a temporal effect, describing variation in the clock period from cycle to cycle. Excessive buffering can reduce skew but may introduce jitter, so the clock network must be designed to balance both effects.</p>

        <h3 id="clock-management" className="text-xl font-medium mt-6 mb-3">9.2 Clock Management Blocks</h3>
        <p className="text-lg mb-6">In addition to distributing clocks, FPGAs must also generate and manipulate them for specific use-cases. For this purpose, devices include dedicated Clock Management Blocks, typically containing <strong>Phase-Locked Loops (PLLs)</strong> and <strong>Mixed-Mode Clock Managers (MMCMs)</strong>.</p>
        <p className="text-lg mb-6">These blocks allow designers to derive multiple internal clocks from a single external reference. For example, a 100 MHz input clock may be multiplied and divided to generate a 400 MHz clock for logic, a 200 MHz clock for memory interfaces, and a phase-shifted clock for data capture. This capability is essential for systems that combine logic operating at different speeds.</p>
        <p className="text-lg mb-6">Clock management blocks also support precise phase shifting, which is critical when interfacing with high-speed memory. In these systems, data must be sampled in the center of a narrow valid window, requiring fine-grained control over clock phase. Additionally, PLLs can perform de-skewing by aligning the internal clock network with an external clock, compensating for delays introduced by the FPGA's clock tree.</p>
        <p className="text-lg mb-6">Together, the global clock network and clock management circuitry ensure that high-speed synchronous designs can operate reliably across a wide range of conditions.</p>

        <h2 id="hdl-to-hardware" className="text-2xl font-medium mt-8 mb-4">10. HDL-to-Hardware Flow</h2>
        <p className="text-lg mb-6">A common misconception is that FPGAs execute software in the same way as processors. In reality, an FPGA does not <em>run</em> code. Instead, the design process transforms a hardware description into a physical circuit by configuring the programmable resources of the device. The result is not a sequence of instructions, but a spatial arrangement of all the logic, memory, and interconnect components discussed.</p>

        <h3 id="hardware-description-languages" className="text-xl font-medium mt-6 mb-3">10.1 Hardware Description Languages</h3>
        <p className="text-lg mb-6"><strong>Hardware Description Languages</strong> such as <strong>VHDL</strong> and <strong>Verilog</strong> describe hardware structure and behavior concurrently. Each statement represents a piece of circuitry that exists continuously and operates in parallel with all others. Unlike software languages, where statements execute sequentially, HDL describes how signals are connected and how they respond to changes over time.</p>
        <p className="text-lg mb-6">From a conceptual standpoint, HDL is best viewed as a textual representation of a schematic. Assignments describe combinational logic, while clocked processes describe sequential elements such as registers and state machines.</p>
        
        <HDLCodeExample />

        <h3 id="synthesis" className="text-xl font-medium mt-6 mb-3">10.2 Synthesis</h3>
        <p className="text-lg mb-6">The first stage of transforming HDL into hardware is synthesis. During synthesis, the tool parses the HDL and translates it into an abstract representation composed of Boolean equations, registers, and memory structures. Logical optimizations are then applied to remove redundancy and simplify expressions using Boolean algebra.</p>
        <p className="text-lg mb-6">Once optimized to use minimal physical resources, the design is technology-mapped onto the physical resources of the target FPGA. Combinational logic is grouped into functions that fit within Lookup Tables, arithmetic operations are mapped onto carry chains or DSP slices, and memory constructs are implemented using distributed RAM or Block RAM. The result of synthesis is a <strong>register-transfer level (RTL)</strong> netlist that expresses the design in terms of the FPGA's native building blocks.</p>

        <h3 id="placement-routing" className="text-xl font-medium mt-6 mb-3">10.3 Placement and Routing</h3>
        <p className="text-lg mb-6">After synthesis, the design must be physically fixed on the chip through placement and routing, collectively referred to as implementation. Placement determines which specific logic blocks, memory blocks, and DSP slices on the silicon will implement each part of the theoretical design. A general objective is to minimize wire length and congestion while keeping logically related elements close together.</p>
        <p className="text-lg mb-6">Routing then selects the exact paths through the programmable interconnect to connect these placed elements. Because routing resources are shared and finite, the router must balance timing requirements against congestion. Critical signals are given priority access to faster routes, while less timing-sensitive connections are detoured as needed. This stage is computationally intensive and often dominates build time for larger designs.</p>

        <h3 id="static-timing-analysis" className="text-xl font-medium mt-6 mb-3">10.4 Static Timing Analysis</h3>
        <p className="text-lg mb-6">After placement and routing, the designer must determine whether the circuit can operate reliably at the intended clock frequency, for example 200 MHz. Rather than validating this through exhaustive dynamic simulation, FPGA toolchains rely on <strong>Static Timing Analysis (STA)</strong>. STA evaluates the timing behavior of the circuit mathematically by examining every possible data path between sequential elements, specifically from each launching flip-flop to every capturing flip-flop.</p>
        <p className="text-lg mb-6">For each path, the tool computes the total propagation delay, which is the sum of the clock-to-Q delay of the launching flip-flop, the delay through the intervening combinational logic, and the delay introduced by routing. This value is then compared against the available time defined by the clock period. To satisfy the setup time requirement, the data must arrive at the destination flip-flop before the next active clock edge, reduced by the flip-flop's required setup time:</p>
        <p className="text-lg mb-6 font-mono text-center py-4 bg-gray-50 rounded">T<sub>arrival</sub> &lt; T<sub>period</sub> - T<sub>setup</sub></p>
        <p className="text-lg mb-6">If this condition is violated, a setup violation occurs, meaning the data arrives too late to be reliably captured. In such cases, the design cannot operate at the target frequency and must either be optimized or clocked more slowly.</p>
        <p className="text-lg mb-6">STA also verifies hold time requirements, which ensure that data does not arrive too early. Specifically, the data must remain stable for a minimum duration after the clock edge so that the previous state is not overwritten before it is safely latched:</p>
        <p className="text-lg mb-6 font-mono text-center py-4 bg-gray-50 rounded">T<sub>arrival</sub> &gt; T<sub>hold</sub></p>
        <p className="text-lg mb-6">Unlike setup violations, which can often be resolved by reducing the clock frequency, hold violations are independent of clock speed and represent a fundamental timing flaw. FPGA tools address these by intentionally increasing delay on overly fast paths, typically by inserting routing detours, to ensure the minimum hold time is satisfied.</p>
        <p className="text-lg mb-6">By exhaustively checking both setup and hold conditions across all timing paths, static timing analysis provides a deterministic guarantee that the implemented circuit will function correctly under worst-case conditions, making it a cornerstone of reliable FPGA design.</p>

        <h3 id="bitstream-generation" className="text-xl font-medium mt-6 mb-3">10.5 Bitstream Generation</h3>
        <p className="text-lg mb-6">The final stage of the design workflow is the bitstream generation. At this point, the fully placed and routed design is converted into a binary configuration file. This file contains the values for every configuration memory cell in the FPGA, defining the LUT's truth tables, routing switch states, memory modes, and I/O standards.</p>
        <p className="text-lg mb-6">When the FPGA powers up, the bitstream is loaded into the Configuration RAM. This process physically configures the device, instantiating the custom digital circuit described by the HDL. From that moment onward, the FPGA behaves as a dedicated hardware implementation of the design until it is reconfigured or powered down.</p>

        <h2 id="concluding-thoughts" className="text-2xl font-medium mt-8 mb-4">Concluding Thoughts</h2>
        <p className="text-lg mb-6">Writing this gave me a much deeper appreciation for how FPGAs are engineered at a fundamental level. Rather than viewing them as abstract programmable logic, exploring their internal structure revealed how performance in an FPGA is achieved through deliberate architectural choices that balance flexibility, speed, and silicon cost.</p>
        <p className="text-lg mb-6">Understanding these trade-offs shifted my perspective from writing logic to analyzing hardware behavior and design intent. I continue to explore this curiosity through ongoing work in machine learning infrastructure, low-level systems, and chip design. See more at <button onClick={() => { window.location.href = '/'; }} className="inline-block px-2 py-0 rounded-full bg-[#fce7f3] text-[#1a1a1a] font-medium hover:bg-[#f9d4e8] transition-colors duration-200 border border-[#1a1a1a]/20 shadow-sm cursor-pointer">priyaltaneja.com</button>.</p>
        <p className="text-lg mb-6"><strong>Thank you for reading all the way through.</strong> This article is the result of many hours spent learning, researching, and refining my understanding of FPGA architecture, and I appreciate you taking the time to engage with it.</p>
      </>
    ),
  },
  {
    title: 'RTL Design of a RGB LED Mixer',
    date: 'January 16, 2026',
    quote: null,
    content: (
      <>
        <img 
          src={publicAsset("/images/LEDgif.gif")} 
          alt="RGB LED Mixer demonstration" 
          className="w-full max-w-[224px] mx-auto my-8"
        />
        <h2 id="project-goals" className="text-2xl font-medium mt-8 mb-4 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">Project Goals</h2>
        <p className="text-lg mb-6">I built a <strong>RGB LED mixer</strong> that allows users to control the color of an LED using three knobs: one each for red, green, and blue. Turning a knob clockwise increases the brightness of its color channel, while turning it counterclockwise decreases it. By blending the three channels, users can create virtually any color they want.</p>
        <p className="text-lg mb-6">The goal of this project wasn't technical complexity. I deliberately chose a system simple enough to build in a weekend, yet rich enough to expose the practical constraints and digital design concepts hidden within seemingly simple components like LEDs.</p>
        <p className="text-lg mb-6">Through this project, I aimed to develop a practical understanding of:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Synchronous digital design</strong> – why does everything need a clock?</li>
          <li className="text-lg"><strong>Metastability and clock domain crossing</strong> – what happens when asynchronous signals meet our clocked system?</li>
          <li className="text-lg"><strong>State machine design</strong> – how do we remember and update brightness values across time?</li>
          <li className="text-lg"><strong>Signal integrity</strong> – why does one button press create multiple electrical transitions?</li>
          <li className="text-lg"><strong>Pulse Width Modulation</strong> – how do we make an LED appear half-bright when it can only be fully ON or OFF?</li>
          <li className="text-lg"><strong>Hardware description thinking</strong> – how do we map out these concepts in Verilog?</li>
        </ul>

        <h2 id="why-leds-force-concepts" className="text-2xl font-medium mt-8 mb-4 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">Why LEDs Force These Concepts</h2>
        <p className="text-lg mb-6">At first glance, an LED is seemingly the simplest output possible. If you turn it on, it lights up and if you turn it off, it produces no light.</p>
        <p className="text-lg mb-6">That simplicity disappears the moment you want control over brightness instead of a binary on or off. A digital output pin only drives two voltage states, so even if your design stores an 8-bit brightness setting, the hardware still has to represent that setting using only highs and lows.</p>
        <p className="text-lg mb-6">The strategy is to leverage human perception. By switching the LED on and off rapidly, the eye averages the flashes and interprets the result as a steady intensity. In that sense, you aren't generating a true intermediate voltage at the pin but rather a time pattern whose on-time fraction relates to brightness.</p>
        <p className="text-lg mb-6">Adding user input forces another set of constraints. A rotary encoder is mechanical and unclocked, so its signals (let's denote by A and B) can change at any time and may bounce, meaning a single step briefly looks like several rapid on-off transitions before settling. If those raw signals are decoded directly, one physical step can turn into multiple counts, missed counts, or even the wrong direction. To make the LED respond reliably, the system has to clean and safely sample the input before it is interpreted.</p>
        <p className="text-lg mb-6">With that in mind, an LED mixer makes the system-level constraints impossible to ignore. PWM exists because digital outputs are binary. Debouncing exists because mechanical inputs are noisy. Synchronization exists because external signals are not aligned to the system clock. State exists because user settings need to persist.</p>
        <p className="text-lg mb-6">The final design starts with messy human input, converts it into stable 8-bit values, then uses those values to drive light in a controlled way.</p>

        <h2 id="system-overview" className="text-2xl font-medium mt-8 mb-4 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">System Overview</h2>
        <p className="text-lg mb-6">Each color channel (red, green, blue) is an independent but identical pipeline. A single channel consists of:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg">Two debouncers stabilize encoder A and encoder B</li>
          <li className="text-lg">An encoder decoder turns clean transitions into an 8-bit level</li>
          <li className="text-lg">PWM converts that level into a high-frequency on/off waveform</li>
          <li className="text-lg">An LED output that appears brighter or dimmer based on that waveform</li>
        </ul>
        <img 
          src={publicAsset("/images/RGB_Overview.png")} 
          alt="RGB LED Mixer system overview" 
          className="w-full max-w-4xl mx-auto my-8"
        />
        <p className="text-lg mb-6">All three channels share the same clock and reset, but their data paths stay separate. Each colour has its own 8-bit level and its own PWM output, so changes in one do not affect the others. This symmetry keeps behavior consistent across RGB and makes debugging easier, since any issue can be isolated to one channel at a time.</p>

        <h2 id="handling-asynchronous-input" className="text-2xl font-medium mt-8 mb-4 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">Handling Asynchronous Input</h2>
        <p className="text-lg mb-6">A rotary encoder is a mechanical device, so its two signals (A and B) are not synchronized to the clock signal. They can change at any time. On top of that, the metal contacts inside the encoder tend to bounce, which means one physical step often produces a short burst of rapid 0→1→0 transitions before it settles.</p>
        <img 
          src={publicAsset("/images/EncoderSignal.png")} 
          alt="Encoder signal bouncing" 
          className="w-full max-w-xs mx-auto my-8"
        />
        <p className="text-lg mb-6">If we decoded A and B directly, the design would feel extremely random. One click might count as three. Another might be missed. Sometimes the direction would flip for a moment. The fix is to treat the encoder inputs as messy signals that must be cleaned and stabilized before they are interpreted further in the circuit.</p>
        <p className="text-lg mb-6">In this design, each encoder signal goes through two stages:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg">Debounce each line (A and B) to remove bouncing</li>
          <li className="text-lg">Decode the cleaned A and B into "+1", "-1", or "0" updates to an 8-bit brightness value</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">The debounce module is a time filter</h3>
        <p className="text-lg mb-6">The core idea is simple. Instead of trusting the input instantly, we sample it over a period of time and only accept it as real when it says the same for long enough.</p>
        <div className="my-8 flex flex-col items-center">
          <img 
            src={publicAsset("/images/Debounce.png")} 
            alt="Debounce block diagram" 
            className="w-full max-w-md mx-auto"
          />
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">Debounce block. An 8-bit shift register stores recent samples. Output only changes when all samples agree.</p>
        </div>
        <p className="text-lg mb-6">The debounce logic keeps an 8-bit history of the most recent samples of the button signal. Every clock cycle, the register shifts left and the newest sample is appended. Conceptually, the history register answers the question: what has this input been doing recently?</p>
        <p className="text-lg mb-6">That being said, after updating the history register, the output follows these rules:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg">If the history becomes 11111111, the input has been high for 8 continuous clock cycles, so the output is set to 1</li>
          <li className="text-lg">If the history becomes 00000000, the input has been low for 8 continuous clock cycles, so the output is set to 0</li>
          <li className="text-lg">If the history is fluctuating, the output does not change and holds the previous stable value</li>
        </ul>
        <p className="text-lg mb-6">The last rule is especially important. It means bouncing does not cause chatter at the output and it only changes when the input has clearly settled.</p>

        <h3 className="text-xl font-medium mt-6 mb-3">Encoder decoding turns transitions into +1 and -1</h3>
        <p className="text-lg mb-6">Once A and B are debounced, the next step is to translate the user's rotation into a direction and brightness value.</p>
        <p className="text-lg mb-6">A rotary encoder outputs two square waves that are offset in time. This is called quadrature behaviour. The direction is encoded by which signal changes first. If A leads B, the rotation is in one direction and if A lags B, then the opposite direction is valid. The key point is that the direction is not determined by a single signal, but by the relationship between A and B over time.</p>
        <div className="my-8">
          <img 
            src={publicAsset("/images/Encoder.png")} 
            alt="Encoder block diagram" 
            className="w-full max-w-4xl mx-auto"
          />
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">Encoder block. Old values are stored, then the pattern {'{'}{'a, old_a, b, old_b'}{'}'} selects +1, -1 or 0.</p>
        </div>
        <p className="text-lg mb-6">To capture that, the module stores the previous values of A and B (old_a, old_b) and compares them to the current values. Each clock cycle, it forms a 4-bit pattern: {'{a, old_a, b, old_b}'}</p>
        <p className="text-lg mb-6">This pattern represents what changed since the last sample. Only a small set of patterns correspond to a valid encoder step. Those cases map to a clockwise or counter-clockwise movement.</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg">Some patterns mean this was a clean step clockwise, so the module does value = value + 1</li>
          <li className="text-lg">Some patterns mean this was a clean step counter-clockwise, so the module does value = value - 1</li>
          <li className="text-lg">Everything else does nothing, which helps reject leftover noise or partial transitions</li>
        </ul>
        <p className="text-lg mb-6">Here's the associated Verilog code:</p>
        <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto mb-6">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre">
            <code className="text-[#1a1a1a]">{'// Verilog code will be added here'}</code>
          </pre>
        </div>
        <p className="text-lg mb-6">What this is doing in plain terms:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg">The encoder produces a known sequence of A/B changes when rotated</li>
          <li className="text-lg">By remembering the previous sample, we can detect a real transition instead of guessing</li>
          <li className="text-lg">Only transitions that match expected quadrature behavior affect the value</li>
          <li className="text-lg">Everything else is ignored, which reduces false counts</li>
        </ul>
      </>
    ),
  },
  {
    title: 'The mechanics of LoRA: adapters, rank, and multi-tenant serving',
    subtitle: 'A first-principles understanding of LoRA fine-tuning and multi-tenant adapter serving.',
    date: 'May 26, 2026',
    quote: null,
    content: (
      <>
        <h2 id="starting-from-the-problem" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">The economics that motivated LoRA</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A pre-trained large language model is <strong className="font-medium">general-purpose by design</strong>. Models like Llama-3.1-8B are trained once on an enormous corpus of internet text, and they have a broad but shallow competence across many subjects, from writing code to summarizing documents to answering trivia.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">While this generality is useful for assistants and exploratory tools, the demands of real production deployments expose a significant limitation. A generalist model is rarely the best fit for any specific business problem. A system designed to draft legal contracts, classify medical records, or write a particular company's SQL benefits enormously from being shown what "good" looks like for the exact task at hand. The model needs a form of <strong className="font-medium">specialization</strong>.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The standard approach to achieving that specialization is fine-tuning, in which a pre-trained base model is trained further on a smaller, more focused dataset that represents the target task. Every training step nudges the model's parameters toward values that perform better on that data, and after enough fine-tuning, the result is a specialized version of the original model that handles the new task more competently than the generalist could.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A core bottleneck arises when this process needs to be repeated for many tasks at once.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">When Llama-3.1-8B is fine-tuned in the standard way, all 8 billion of its parameters are adjusted during training. The architecture and parameter count remain the same, but every numerical value shifts, and the result is a brand-new full-sized model. In half-precision floating point, that is roughly <strong className="font-medium">16 GB on disk, per task</strong>.</p>

        <ScalingDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">For organizations deploying a single fine-tuned model, this is a manageable cost. For ten customers, the storage requirement reaches 160 GB and the serving requirement reaches ten dedicated GPU allocations. For a hundred, the figures grow to a terabyte and a half of model weights and a hundred GPUs of dedicated capacity. Each model is a fully independent artifact, and they cannot easily share hardware because each one demands the full 16 GB of GPU memory to itself.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The economics of full fine-tuning at scale is what made a parameter-efficient alternative necessary, and the practice that emerged is now formally known as <strong className="font-medium">Low-Rank Adaptation, or LoRA</strong>.</p>

        <h2 id="what-fine-tuning-does" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Inside the fine-tuning process</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Before LoRA can be properly motivated, it is worth being precise about what fine-tuning is doing mechanically. A neural network, heavily simplified for our purpose, is a <strong className="font-medium">collection of numbers organized into matrices</strong>. Llama-3.1-8B contains roughly 8 billion such numbers, each one a parameter. These were set during pre-training, and together they encode everything the model "knows," from how the immune system fights infection to which year a particular film won an Oscar.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">When the model is fine-tuned, training continues on a smaller, more focused dataset. Each training step nudges the parameters in a direction that improves performance on the new task, and after sufficient training the parameters have all moved, most by a tiny amount, some by more, others by almost nothing. The architecture is unchanged and the parameter count is unchanged, but the internal numerical contents are different, and that difference is what produces a specialized behavior.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The key principle that motivates LoRA is that <strong className="font-medium">this change has structure</strong>.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Fine-tuning does not move 8 billion parameters in 8 billion independent random directions. It moves them in coordinated patterns, because the model is being adjusted toward a single coherent task. Many parameters move together, and many move in directions that are similar to other parameters' movements. The shape of the change is simpler than the change itself.</p>

        <StructuredChangeDiagram />

        <h2 id="lora-insight" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">The LoRA insight: low intrinsic rank</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The LoRA paper made an empirical claim about this structure: the change matrix produced by fine-tuning has <strong className="font-medium">low intrinsic rank</strong>. The phrase is a precise mathematical statement, but the underlying intuition is straightforward. When a matrix has low intrinsic rank, even though the matrix itself may be large, the actual information it contains lives in a much smaller subspace. The matrix can therefore be reconstructed, or closely approximated, from a representation that is far smaller than its full dimensions would suggest. If a complicated object can be described by a simple structure, <strong className="font-medium">it can be stored with very little data</strong>.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The way LoRA captures this is through a specific decomposition trick. Consider a single weight matrix inside the model, for example an attention matrix of shape <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(4096, 4096)</code>. That matrix contains <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">4096 × 4096 = 16,777,216</code> numbers. The change to that matrix from fine-tuning is also a <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(4096, 4096)</code> matrix, and it also contains 16.7 million numbers. LoRA approximates that change as the product of two much smaller matrices: a column-shaped matrix <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">B</code> of shape <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(4096, r)</code> and a row-shaped matrix <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">A</code> of shape <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(r, 4096)</code>. The number <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">r</code>, called the rank of the decomposition, governs how much of the original matrix's structure the approximation can capture. It is intentionally small, with common choices being 8, 16, 32, or 64.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">When the two matrices are multiplied together, the result has the original <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(4096, 4096)</code> shape, but it has been reconstructed from <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">2 × r × 4096</code> numbers rather than <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">4096²</code>. For <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">r = 16</code>, that is <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">2 × 16 × 4096 = 131,072</code> parameters in place of 16.7 million, a compression ratio of <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">16,777,216 / 131,072 = 128×</code>.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The magnitude of this compression depends on the rank. At <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">r = 16</code> it is roughly 128×, and at <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">r = 4</code> it exceeds 500×.</p>

        <DecompositionDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A defining fundamental is that <strong className="font-medium">the base model itself is never modified</strong>. The original 8 billion parameters of Llama-3.1-8B remain frozen, exactly as they emerged from pre-training. What is learned during LoRA fine-tuning is the two small matrices, which constitute new parameters attached alongside the frozen base.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At inference time, when the model uses one of its weight matrices, it computes <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">W + B·A</code> rather than <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">W</code> alone. The base model's behavior is preserved, augmented by the adapter's contribution. Different adapters, trained for different tasks, produce different <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(B, A)</code> pairs, all of which attach to the same frozen base: a single fixed model with many small additions.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Rank should be treated as a substantive design choice rather than an arbitrary hyperparameter. A smaller rank yields a smaller adapter and faster inference, but provides less capacity to capture what the fine-tuning was meant to teach. A larger rank affords the adapter more representational room at the cost of size. There are tasks that a rank-64 adapter can learn that a rank-8 adapter cannot, and there are tasks for which rank-8 is more than sufficient. Put simply, the selection of rank is a <strong className="font-medium">quality-versus-cost tradeoff</strong>, and the appropriate value is dependent on the task.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A second hyperparameter, alpha, scales the strength with which the adapter modifies the base. The computation is <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">W + (alpha/r) × B·A</code>, with alpha conventionally set to twice the rank. Its purpose is to provide a stable mechanism for controlling adapter influence independently of <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">r</code>, since the magnitudes of <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">B·A</code> would otherwise vary considerably with the choice of rank.</p>

        <h2 id="adapter-on-disk" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">The shape of an adapter on disk</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The discussion thus far has been largely abstract, so it is worth grounding it in something concrete. When a practitioner refers to an adapter for a particular task, what they actually obtain is a directory containing two files.</p>

        <pre className="bg-[#EDF1F7] rounded-lg p-5 overflow-x-auto my-6 border border-black/10 font-mono text-sm leading-[1.6] text-[#000000]"><code>{`my_sql_adapter/
├── adapter_config.json     (~200 bytes)
└── adapter_model.safetensors  (~13 MB)`}</code></pre>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The configuration file is small and human-readable. It specifies which base model the adapter targets, the rank used during training, and which weight matrices inside the model the adapter modifies. The accompanying safetensors file holds the majority of the artifact: it contains the actual <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">A</code> and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">B</code> matrices in their entirety, stored as tensors in a standardized binary format. Together, these two files compose a complete adapter: a brief specification of its shape and a tensor file containing its values.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A few practical considerations affect how adapters are sized in production. A LoRA adapter does not necessarily modify every weight matrix in the model; in most cases it adapts only a chosen subset. The conventional choice, and the one used in the companion experiment, is to apply LoRA exclusively to the query and value projections inside the attention mechanism, the matrices generally referred to as <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">q_proj</code> and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">v_proj</code>.</p>

        <AttentionTargetsDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">This was the configuration recommended in the original LoRA paper, and it has remained the default in most production setups because it offers a favorable balance of quality per parameter. Llama-3.1-8B has 32 layers, so an adapter targeting <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">q_proj</code> and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">v_proj</code> contains 64 individual <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(B, A)</code> pairs in total, one pair per targeted matrix per layer. Each pair contributes on the order of 100,000 parameters at rank 16, so the full adapter contains a few million parameters and occupies approximately 13 MB on disk in fp16. Compared against the 16 GB required to store a fully fine-tuned copy of the same base model, the ratio is roughly 1,200 to 1.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">An important implementation detail worth noting is that modern Llama models employ a technique called Grouped-Query Attention (GQA), under which the value matrix is smaller than the query matrix. As a result, the <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">B</code> matrix on <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">v_proj</code> has shape <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(1024, 16)</code> rather than <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">(4096, 16)</code>, which is why the adapter occupies 13 MB rather than the rounder 32 MB that naive shape arithmetic would suggest.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A final property worth emphasizing is that an adapter is <strong className="font-medium">permanently bound to a specific base model</strong>. A LoRA trained on Llama-3.1-8B will function only with Llama-3.1-8B, because the shapes of <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">B</code> and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">A</code> are determined by the base model's weight matrix dimensions. A Llama adapter cannot be applied to Qwen, nor even to a different size of Llama. This constraint is what makes multi-tenant serving coherent as a strategy.</p>

        <h2 id="serving-and-vllm" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">The infrastructure that serves a model</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Training a model is a one-time activity that produces a set of weights. <strong className="font-medium">Serving</strong> a model is the ongoing activity of accepting user requests, running them through those weights, and returning results, at scale, to many users at once, fast enough that none of them experience meaningful latency.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Most users of large language models interact with them through serving without consciously distinguishing it from training. Calls to the OpenAI API, conversations with Claude, and any other commercial LLM interaction all reach an inference server, which receives requests, runs them through frozen weights, and streams output back to the client. The weights are not being modified during these interactions; they are being applied. The infrastructure that performs this application is what is collectively referred to as an <strong className="font-medium">inference server</strong>.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Inference servers handle a substantial amount of unglamorous infrastructure work. They load model weights into GPU memory, accept HTTP requests, batch concurrent requests together so that the GPU operates efficiently (since GPUs are designed for parallel rather than serial work), stream output tokens back to clients as those tokens are generated, and manage the GPU's limited memory across competing demands. Without one of these systems in place, anyone attempting to serve a large language model would end up reimplementing the same plumbing themselves, typically with worse results.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">vLLM is one such inference server. It originated at UC Berkeley in 2023 and has rapidly become the default choice for teams operating their own LLMs in production. It's open source, performant, and supports multi-tenant LoRA serving.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">On one side, LoRA, which provides a means of specializing a base model into many small task-specific adapters, each only a few megabytes in size. On the other side, an inference server such as vLLM, which provides the infrastructure to take a request and produce output. The natural design that follows is one in which the inference server <strong className="font-medium">hosts a single base model alongside many adapters</strong>, routing each incoming request through the base model with its appropriate adapter applied.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">This is the conceptual picture of multi-LoRA serving:</p>

        <MultiLoRAServingDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">From the perspective of the server, this arrangement establishes a resource-allocation problem. The base model is fixed and easy to manage: it is loaded once and remains in place. The adapters, by contrast, are numerous, small, and must be available to the GPU at the precise moments they are required. The total weight of all adapters substantially exceeds what can fit in the fastest tier of memory: a thousand adapters at 13 MB each amounts to 13 GB, which is more space than the GPU has available after the base model and the working memory for in-flight requests have been accounted for. The server must therefore decide which adapters to keep close to the GPU and which to demote to slower storage, and these decisions have substantial performance consequences.</p>

        <h2 id="wrapping-up" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Where this goes next</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Overall, the picture to retain from this article is the following. A base model, expensive to produce and 16 GB to store, sits permanently on a GPU. Surrounding it, a network of much smaller adapters, each a few megabytes of parameters that capture what fine-tuning would have changed for a single task or customer. An inference server holds the base model, retains as many adapters as it can keep close at hand, and answers user requests by combining the two. The economic case is straightforward: <strong className="font-medium">a single GPU, a single base model, many specializations</strong>, and substantially less hardware than full fine-tuning would have demanded.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The interesting questions, from this point forward, are operational. Where do adapters physically live when they are not in active use? What occurs when a request arrives for an adapter that is not immediately available? How many concurrent users can the system accommodate before performance begins to degrade? Which configuration parameters does the operator control, and which of those parameters meaningfully affect outcomes?</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">I answered these questions empirically with a 80 GB GPU and 1,000 LoRA adapters and stress-testing the entire picture developed here. It works through the memory accounting required to fit many adapters into limited capacity, sweeps the operator-facing configuration knobs, and reports four empirical findings about what actually limits multi-LoRA serving in practice.</p>
      </>
    ),
  },
  {
    title: 'Multi-LoRA at scale: an empirical map of vLLM\'s operating range',
    subtitle: 'An empirical investigation of vLLM\'s multi-tenant adapter serving, conducted on a single 80 GB GPU with 1,000 LoRA adapters served alongside Llama-3.1-8B.',
    date: 'May 26, 2026',
    quote: null,
    content: (
      <>
        <h2 id="a-question-worth-measuring" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">A question worth measuring</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5"><a href="/mechanics-of-lora" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/mechanics-of-lora'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="underline decoration-[#0B1120]/30 underline-offset-2 hover:decoration-[#0B1120] transition-colors"><em>The Mechanics of LoRA</em></a> developed the conceptual machinery of LoRA fine-tuning and multi-tenant adapter serving: one frozen base model on a GPU, a constellation of small adapters in supporting memory, an inference server routing each request through the base with its associated adapter applied. The system is appealing in theory, and the economic argument is straightforward. What remains unclear is what happens when this system is actually pushed to production.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Two predictions about this system are worth distinguishing. The first, which arises naturally from the conceptual picture, treats <strong className="font-medium">adapter inventory as the dominant constraint</strong>: more adapters produce more memory pressure, which should degrade throughput once some capacity threshold is exceeded. The second, drawn from the recent serving literature, treats multi-LoRA serving as a <strong className="font-medium">working-set and scheduling problem</strong> in which inventory itself is largely irrelevant and the bottlenecks lie elsewhere. The vLLM, S-LoRA, and Punica papers consistently advance the second view, and the more recent LoRAServe work extends it by locating the next frontier in heterogeneous rank serving, where rank diversity rather than adapter count is the operative variable.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The question this article addresses is which of these predictions holds up under measurement on the upstream vLLM release, and what specifically limits throughput when the system is stressed.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">This was not a full-factorial sweep. What follows is a report on <strong className="font-medium">63 throughput benchmark runs across three focused sweeps</strong>, varying adapter pool size, concurrency, traffic shape, and vLLM's <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> parameter only where each variable answered a specific question. The variables tracked are throughput, latency tail behavior, and the actual memory accounting of loading 1,000 adapters into a single server. The measurement produces four findings, which together support the working-set framing and identify the specific mechanisms that drive performance.</p>

        <h2 id="how-adapters-fit" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">How adapters fit on a GPU</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Before the results can be interpreted, it is worth working through the memory accounting that determines what can and cannot fit on a single GPU. The numbers below are for a single 80 GB device serving Llama-3.1-8B in half-precision floating point, which is the configuration used throughout the experiment.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The base model itself occupies approximately <strong className="font-medium">16 GB</strong> of GPU memory. The KV cache, vLLM's working memory for in-flight requests, conventionally reserves an additional fraction, typically <strong className="font-medium">40 to 50 GB</strong> depending on the configured utilization target. What remains after these two allocations is <strong className="font-medium">10 to 15 GB</strong> of headroom for adapter slots, kernel scratch space, activations, and various forms of slack.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">This means that the available space for adapters is much smaller than the GPU's total memory suggests. A thousand adapters at 13 MB each amounts to 13 GB, which exceeds what the GPU has available after the base model and KV cache have been accounted for. At face value, the system appears not to fit at all, but the resolution lies in the arrangement of vLLM's adapter management.</p>

        <MemoryHierarchyDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">vLLM distributes adapters across <strong className="font-medium">three tiers of memory</strong>, and the access cost of each tier differs by roughly an order of magnitude from the one above it. The fastest tier is the GPU's adapter region, where adapters resident on the GPU are available to the model immediately, with access costs measured in microseconds. The middle tier is CPU memory, where loaded adapters wait when they are not currently resident on the GPU. Moving an adapter from CPU to GPU requires a copy across the PCIe bus, which takes a few milliseconds. The slowest tier is disk, from which an adapter not yet loaded into the CPU pool must be read into memory before it can be used at all, a process that requires hundreds of milliseconds at minimum.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The implication is that the system's performance is determined almost entirely by how often a request can be served from the fastest tier, and how often it must instead wait for a transfer from a slower one. This in turn is governed by three vLLM configuration parameters, two of which interact with traffic patterns in ways that are not obvious until they are measured.</p>

        <ol className="list-decimal list-outside pl-6 space-y-4 text-[17px] leading-[1.7] text-[#000000] mb-5">
          <li><code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">--enable-lora</code> simply activates the multi-LoRA serving path. Without it, vLLM ignores LoRA functionality entirely and serves only the base model.</li>
          <li><code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">--max-loras</code> is the most consequential and the most frequently misunderstood. <strong className="font-medium">It is not a cache size in the conventional sense, but a per-batch limit on the number of distinct adapters that can appear together in a single in-flight batch on the GPU.</strong> When 32 concurrent requests arrive for 20 distinct adapters and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> is set to 16, vLLM cannot accommodate all 20 in a single batch. It must either split the work across multiple batch steps or page adapters in and out between steps. This per-batch constraint, rather than memory capacity, is what produces the steep latency cliffs and throughput peaks that the findings document.</li>
          <li><code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">--max-cpu-loras</code> controls the size of the CPU adapter pool, that is, the number of adapters that vLLM keeps loaded in host memory and therefore available for fast transfer to the GPU. When this pool is full and a new adapter must be loaded, the least recently used adapter is evicted, and any subsequent request must pay the cost of a disk read.</li>
        </ol>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">These two adjustable parameters interact with traffic patterns and concurrency in ways that the rest of this article works through empirically.</p>

        <h2 id="experimental-setup" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">The experimental setup</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The benchmark ran on a single 80 GB GPU, with Llama-3.1-8B in fp16 served by vLLM ≥ 0.15.0 through its OpenAI-compatible API. An asynchronous aiohttp benchmark client running in the same container as the server issued requests to localhost, which eliminated network noise as a confounding factor.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">One thousand structurally valid LoRA adapters were generated for the experiment. Each adapter targets <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">q_proj</code> and <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">v_proj</code> at rank 16 across all 32 layers of Llama-3.1-8B, occupying approximately 13 MB on disk. The adapter weights are random rather than trained, since the experiment measures serving mechanics rather than model quality. vLLM reads the tensor shapes and dtypes from the safetensors files and processes the adapters identically to trained ones; from the server's perspective, the synthetic and trained cases are indistinguishable. The outputs the adapters produce are not coherent, but the throughput and latency measurements are real.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Four independent variables were varied across the benchmark. The adapter pool size <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">N</code> ranged across {'{'}{`1, 10, 50, 100, 250, 500, 1000`}{'}'}. Concurrency <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">c</code>, the maximum number of in-flight requests allowed at any moment, ranged across {'{'}{`1, 8, 32`}{'}'}. The <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> parameter ranged across {'{'}{`4, 8, 16, 32, 64, 128`}{'}'}. Two traffic distributions were tested: <strong className="font-medium">uniform</strong>, in which each adapter is equally likely to receive any given request, and <strong className="font-medium">Zipf with skew parameter s = 1.5</strong>, under which roughly half of all requests concentrate on the top 5% of adapters. The uniform distribution represents a worst-case scenario for adapter caching, and the Zipf distribution approximates the kind of traffic that real production workloads typically exhibit.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Each measured cell was run in a fresh vLLM subprocess, with adapters loaded before measurement and the server terminated afterward. This isolation assured that no state, including KV cache occupancy, leaked between cells. Each cell ran 50 warmup requests followed by 1,000 measured requests, with prompts and outputs both fixed at 128 tokens. The measurements collected were throughput in tokens per second, time-to-first-token (TTFT) at the 50th and 99th percentiles, and total request latency at the same percentiles. A separate memory-decomposition phase, conducted on an H100, recorded per-stage snapshots of GPU memory and process RSS as adapters were loaded into the server.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The findings below treat each parameter in turn: first concurrency, then traffic distribution, then <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code>, and finally the memory accounting.</p>

        <h2 id="finding-1" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Finding 1: At low concurrency, none of this matters</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At low concurrency, the multi-LoRA serving path imposes no measurable performance cost regardless of how many adapters are loaded.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Throughput at concurrency 1 under uniform traffic moves from 70.9 tokens per second when only one adapter is loaded to 70.2 tokens per second when 1,000 adapters are loaded. This is a one-percent change across a thousand-fold change in adapter inventory. So, throughput is constant within measurement noise.</p>

        <ThroughputByAdapterCountDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At concurrency 1, only a single request is in flight at any moment, so only a single adapter is ever required in the batch. Adapter slots are never oversubscribed and there's no scheduling pressure. The GPU spends its time generating tokens for that one request, decode-bound, and the multi-LoRA machinery is virtually idle. Adapter inventory cannot matter when the working set is always one.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The implication for deployment is narrow but worth noting. For products in which users interact one at a time, or for low-throughput APIs where concurrency rarely exceeds a small number, the multi-LoRA serving path does not reduce throughput, even as adapter inventory grows by three orders of magnitude. The performance trade-offs of multi-LoRA serving become significant only at higher concurrency, which is where the remaining findings are located.</p>

        <h2 id="finding-2" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Finding 2: Uniform traffic degrades faster than the cache-fit story predicts</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Under the inventory-as-constraint prediction, throughput should hold steady until adapter inventory exceeds the configured <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> value, at which point performance should degrade as adapters are evicted from the GPU and reloaded on demand. With <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> set to 32, this would indicate stable performance from N=1 through N=32, with degradation appearing only as N grows beyond that point.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The measurements contradicted this assumption. At concurrency 32 under uniform traffic with <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> set to 32, throughput at N=1 reaches 1,935 tokens per second. By N=10, the same configuration delivers 1,490 tokens per second. <strong className="font-medium">This is a 23% decline by ten adapters, well below the cache-size threshold the prediction would have located the cliff at.</strong> By N=1,000, throughput has settled around 884 tokens per second, which is a 54% decline from peak.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">What is happening is not a memory problem in the conventional sense, since the working set fits comfortably within the configured slot allocation. <strong className="font-medium">The actual bottleneck is scheduling.</strong> This means when 32 concurrent requests are distributed across 10 distinct adapters in a single batch, vLLM has to coordinate which adapter applies to which request inside the same forward pass. The kernel that performs the batched LoRA computation pays a cost that grows with adapter diversity in the batch, and this cost is independent of whether the relevant adapters happen to reside on the GPU.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The implication for capacity planning is that the intuitive question "how many adapters fit?" is the wrong one. Instead, a higher value question is <strong className="font-medium">"how diverse is the traffic in any given batch?"</strong></p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">These questions have different answers, but the second is the one that gives us insight into performance under stress.</p>

        <h2 id="finding-3" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Finding 3: Realistic skewed traffic more than doubles throughput</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Production traffic rarely distributes evenly across adapters in a uniform manner; in nearly every real-world setting, a small number of adapters absorb the bulk of incoming requests while the remainder see only occasional access. This pattern is well described by a Zipf distribution, in which the probability of selecting the k-th most popular adapter scales as <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">1/k<sup>s</sup></code>. With the skew parameter set to 1.5, roughly half of all requests concentrate on the top five percent of adapters, which is a reasonable approximation of the traffic distributions observed in real customer-specific or task-specific adapter deployments.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">Switching the experiment's traffic distribution from uniform to Zipf at <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">s = 1.5</code>, while holding everything else constant, produces major improvements in both throughput and tail latency. At N=10, throughput moves from 1,490 tokens per second under uniform traffic to 2,531 under Zipf, a 70% increase. At N=500, the comparison is 897 versus 2,127 tokens per second, an increase of 137%. At N=1,000, the comparison is 884 versus 2,167, <strong className="font-medium">an increase of 145%</strong>. The corresponding p99 latency reduces by roughly half across all of these comparisons.</p>

        <UniformVsZipfDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The lift grows with N. Under uniform traffic, the effective working set expands as more adapters are added to the pool, because every adapter remains equally likely to be requested. Under Zipf traffic, the effective working set is bounded: adapters one through ten do most of the work regardless of how many adapters sit in the pool behind them. The cache stabilizes on the most popular adapters and remains in that state. The uniform and Zipf cases therefore diverge increasingly as N grows, where the uniform case continues to degrade while the Zipf case holds close to constant.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">A practical consequence is that uniform-traffic benchmarks systematically underestimate the throughput a real deployment will achieve. Hardware provisioned against uniform numbers will tend to exceed what the actual workload requires.</p>

        <h2 id="finding-4" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Finding 4: <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> is a U-curve, not a ceiling</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The intuitive interpretation is incorrect. Throughput is highest at moderate values of <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> and degrades in both directions, producing a U-shaped curve rather than the monotonic-increase shape that the cache-size interpretation would predict.</p>

        <ThroughputHeatmapDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At N=500 under Zipf traffic with concurrency 32, the throughput numbers across the <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> range are as follows: 1,085 tokens per second at <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=4</code>, 1,628 at 8, <strong className="font-medium">2,160 at 16</strong>, 2,150 at 32, 2,000 at 64, and 1,763 at 128. The peak sits at <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=16</code>, and moving from this peak to <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=128</code> costs 20% of throughput on identical hardware and identical workload.</p>

        <MaxLorasUCurveDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The latency degradation under undersized <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> is more severe than the throughput degradation. At <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=4</code> with N=500, p99 TTFT reaches <strong className="font-medium">8,034 milliseconds</strong>: more than eight seconds of waiting before the worst-served users see their first token of output. At <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=16</code> with the same N, p99 TTFT measures 170 milliseconds, a forty-seven-fold reduction.</p>

        <TTFTHeatmapDiagram />

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The U-shape is not a single phenomenon, as the two sides of the curve are driven by different mechanisms with different operational signatures.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At the low end, the mechanism is <strong className="font-medium">cache thrashing</strong>. With <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> set to a small value, the GPU's batch-resident adapter set is smaller than the working set of any reasonably diverse traffic. Most batches therefore contain at least one request whose adapter is not currently resident, which requires the missing adapter to be transferred from CPU memory to the GPU before the request can proceed. The cold-loaded adapter pays its transfer cost in TTFT, and these misses are not independent. Once the working set exceeds the slot capacity, almost every batch contains at least one missing adapter, which produces a sharp tail-latency cliff rather than gradual degradation. The eight-second p99 numbers under <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras=4</code> are produced by exactly this dynamic.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">At the high end, the mechanism is <strong className="font-medium">per-batch coordination overhead</strong>. With <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> set to a large value, every adapter required by any batch fits comfortably, and nothing needs to be paged in or out. There is no cold-load penalty. However, vLLM must now coordinate a larger set of possible adapter slots in every batch step, and the kernel that batches LoRA computations across requests pays a per-distinct-adapter cost. Larger batches with more diverse adapter compositions take more work per generated token, even though the entire required adapter set is already on the GPU. Nothing is malfunctioning; the system is simply paying for capacity it does not need.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The U-curve is not produced by a single mechanism with an optimal operating point. Two distinct dynamics govern the two sides, and the configurations that perform best are those in which neither is active. The operational significance is that <strong className="font-medium"><code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> should be sized to the ninetieth-percentile working set of the actual workload</strong>, rather than to the total adapter inventory. If 90% of traffic over a five-minute window touches 30 distinct adapters, a setting of 32 is appropriate. Setting <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> higher in pursuit of headroom does not provide additional safety; it costs throughput in exchange for capacity that the system never uses.</p>

        <h2 id="operational-summary" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">An operational summary</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The findings above suggest the following sizing approach for a multi-LoRA serving deployment.</p>

        <div className="space-y-3 mb-5">
          {[
            { n: 1, text: <>Estimate the <strong className="font-medium">ninetieth-percentile active working set</strong> from production traffic logs by counting how many distinct adapters absorb 90% of requests over a five-minute window. Set <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> to that number, rounded up to the nearest power of two between 16 and 32. The temptation to set <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> higher in pursuit of headroom should be resisted, because per-batch coordination overhead will cost <strong className="font-medium">10 to 20 percent of throughput</strong> in exchange for capacity that goes unused.</> },
            { n: 2, text: <>Set <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_cpu_loras</code> to the <strong className="font-medium">full adapter inventory</strong>, and budget host RAM at approximately <strong className="font-medium">13 MB per rank-16</strong> Llama-3.1-8B adapter. The GPU side of the memory budget is fixed by <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code>, regardless of inventory.</> },
            { n: 3, text: <>If the production traffic distribution is genuinely uniform across hundreds of adapters, the bottleneck is the working set itself, and the most productive next step is to <strong className="font-medium">shard the adapter inventory across replicas</strong> by task family or customer group.</> },
            { n: 4, text: <>Capacity planning should be conducted against the <strong className="font-medium">actual traffic distribution</strong> rather than against the worst-case uniform synthetic. Real Zipfian traffic delivers between <strong className="font-medium">two and 2.4 times the throughput</strong> of equivalent uniform traffic, and provisioning against the uniform number leads to substantial over-provisioning.</> },
            { n: 5, text: <>At low concurrency, <strong className="font-medium">none of this matters</strong>. The infrastructure decisions above apply only to deployments with meaningful concurrent load.</> },
          ].map(item => (
            <div key={item.n} className="flex gap-4 border border-black/[0.06] rounded-lg px-5 py-4">
              <span className="text-[18px] font-medium text-[#023e7d]/40 leading-none mt-[3px] select-none">{item.n}</span>
              <p className="text-[16px] leading-[1.7] text-[#000000] flex-1">{item.text}</p>
            </div>
          ))}
        </div>

        <h2 id="scope-and-limitations" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Scope and limitations</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The experiment reported here is bounded in several important ways, and the conclusions should be applied with awareness of those limitations.</p>

        <ul className="list-disc list-outside pl-6 space-y-3 text-[17px] leading-[1.7] text-[#000000] mb-5">
          <li>All measurements were taken at <strong className="font-medium">LoRA rank 16</strong>. Heterogeneous-rank serving, in which adapters of different ranks are co-batched against the same base model, is an active area of investigation and produces effects that the present experiment cannot observe.</li>
          <li>Only <strong className="font-medium">one Zipf skew parameter</strong> was tested, <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">s = 1.5</code>. The sensitivity of the findings to different degrees of traffic skew is not characterized here.</li>
          <li>The adapters used in the experiment were <strong className="font-medium">synthetic, with random weights</strong>. The serving mechanics are the primary focus, but no conclusions can be drawn from these results about adapter quality or task performance.</li>
          <li>Prompts and outputs were both <strong className="font-medium">fixed at 128 tokens</strong>. Substantially different prompt-to-output length ratios may shift the bottleneck, particularly for prefill-heavy workloads where the cost of processing the input dominates the cost of generating the output.</li>
          <li>The experiment used a <strong className="font-medium">single GPU and a single tenant</strong>. Tensor parallelism, multi-GPU adapter placement, and multi-replica scheduling are not in scope.</li>
          <li>vLLM's recent multi-LoRA optimization work has focused on <strong className="font-medium">Mixture-of-Experts base models</strong> such as GPT-OSS and Qwen, which behave differently from dense models like Llama. The findings here apply to <strong className="font-medium">dense bases</strong>; their generalization to MoE bases is an open question.</li>
        </ul>

        <h2 id="closing" className="text-2xl font-medium tracking-tight leading-tight mt-14 mb-5 text-[#002855]">Closing</h2>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The conceptual model developed in the <a href="/mechanics-of-lora" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/mechanics-of-lora'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="underline decoration-[#0B1120]/30 underline-offset-2 hover:decoration-[#0B1120] transition-colors">first article</a> held up under measurement. Adapters do live across a tiered memory hierarchy, an inference server does manage them through two genuine knobs, and traffic shape does matter more than total inventory size. What was less anticipated was the magnitude of the failure modes. An undersized <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> does not produce a gradual slowdown; it produces eight-second tail latencies. An oversized <code className="font-mono text-[0.92em] bg-[#E8EEF4] px-1.5 py-0.5 rounded text-[#000000] font-medium">max_loras</code> does not produce harmless overhead; it costs 20% of throughput. Traffic distribution alone produces throughput swings of more than 2.4 times. <strong className="font-medium">The system has narrow operating bands with steep penalties on either side</strong>, and the configuration choices that lie between them are not the ones an operator's intuition would lead to without measurement.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">I ran this benchmark because the conceptual picture of multi-LoRA serving is widely discussed but rarely interrogated. The serving literature consistently frames the system as a working-set and scheduling problem, but the magnitude of that framing's consequences is not something I had seen quantified for a production configuration. What started as a smoke test on the conceptual machinery turned into providing me with a clearer view of the parameters that carry weight, the ones that do not, and where the system's real operating range lies.</p>

        <p className="text-[17px] leading-[1.7] text-[#000000] mb-5">The findings reported here came from one configuration on one piece of hardware with one base model. Multi-LoRA serving is being investigated by a growing number of teams in industry and academia, and the picture will only become clearer as more measurements accumulate. If you are working on multi-LoRA serving in production or in research, I would be interested to hear what you are seeing in your own measurements. I'm curious to hear about any findings that confirm or contradict what is reported!</p>
      </>
    ),
  },
  // Placeholder for future articles
];

const LORA_SECTIONS = [
  { id: 'starting-from-the-problem', label: 'The economics of LoRA' },
  { id: 'what-fine-tuning-does', label: 'Inside the fine-tuning process' },
  { id: 'lora-insight', label: 'The LoRA insight' },
  { id: 'adapter-on-disk', label: 'An adapter on disk' },
  { id: 'serving-and-vllm', label: 'Serving infrastructure' },
  { id: 'wrapping-up', label: 'Where this goes next' },
];

const MULTI_LORA_SECTIONS = [
  { id: 'a-question-worth-measuring', label: 'A question worth measuring' },
  { id: 'how-adapters-fit', label: 'How adapters fit on a GPU' },
  { id: 'experimental-setup', label: 'Experimental setup' },
  { id: 'finding-1', label: 'Finding 1 — Low concurrency' },
  { id: 'finding-2', label: 'Finding 2 — Uniform traffic' },
  { id: 'finding-3', label: 'Finding 3 — Zipf lift' },
  { id: 'finding-4', label: 'Finding 4 — max_loras U-curve' },
  { id: 'operational-summary', label: 'Operational summary' },
  { id: 'scope-and-limitations', label: 'Scope and limitations' },
  { id: 'closing', label: 'Closing' },
];

const ArticleDetail = ({ onNavigate }) => {
  
  // Get article slug from pathname, e.g., /article-unlearning-perfectionism or /understanding-fpgas-from-first-principles
  const path = window.location.pathname;
  const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path;
  // Remove 'article-' prefix if present (case-insensitive) and normalize to lowercase
  const slug = pathWithoutSlash.replace(/^article-/i, '').toLowerCase();
  
  // Special handling for FPGA article with custom slug
  const fpgaArticleSlug = 'understanding-fpgas-from-first-principles';
  const rgbLedArticleSlug = 'rtl-design-of-a-rgb-led-mixer';
  const loraArticleSlug = 'mechanics-of-lora';
  const multiLoraArticleSlug = 'multi-lora-at-scale';
  let idx;
  let article;
  if (slug === fpgaArticleSlug) {
    const fpgaTitle = 'Understanding Field-Programmable Gate Arrays (FPGAs) from First Principles';
    idx = findArticleBySlug(articles, slugify(fpgaTitle));
    article = articles[idx];
  } else if (slug === rgbLedArticleSlug) {
    const rgbLedTitle = 'RTL Design of a RGB LED Mixer';
    idx = findArticleBySlug(articles, slugify(rgbLedTitle));
    article = articles[idx];
  } else if (slug === loraArticleSlug) {
    const loraTitle = 'The mechanics of LoRA: adapters, rank, and multi-tenant serving';
    idx = findArticleBySlug(articles, slugify(loraTitle));
    article = articles[idx];
  } else if (slug === multiLoraArticleSlug) {
    const multiLoraTitle = 'Multi-LoRA at scale: an empirical map of vLLM\'s operating range';
    idx = findArticleBySlug(articles, slugify(multiLoraTitle));
    article = articles[idx];
  } else {
    idx = findArticleBySlug(articles, slug);
    article = articles[idx];
  }

  // Check if this is the FPGA article
  const isFPGAArticle = article && slugify(article.title) === slugify('Understanding Field-Programmable Gate Arrays (FPGAs) from First Principles');

  // Check if this is the RGB LED article (same font/header as FPGA but white background)
  const isRGBLedArticle = article && slugify(article.title) === slugify('RTL Design of a RGB LED Mixer');

  // LoRA article: white background, serif font, simpler header
  const isLoRAArticle = article && slugify(article.title) === slugify('The mechanics of LoRA: adapters, rank, and multi-tenant serving');
  const isMultiLoRAArticle = article && slugify(article.title) === slugify('Multi-LoRA at scale: an empirical map of vLLM\'s operating range');
  const useFPGAStyle = isFPGAArticle || isRGBLedArticle || isLoRAArticle || isMultiLoRAArticle;

  const [isLoaded, setIsLoaded] = useState(false);
  const articleRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showBar, setShowBar] = useState(false);

  const sections = isLoRAArticle ? LORA_SECTIONS : isMultiLoRAArticle ? MULTI_LORA_SECTIONS : null;

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (!sections) return;
    const onScroll = () => {
      const el = articleRef.current;
      const hdr = headerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setScrollProgress(total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0);

      if (hdr) setShowBar(hdr.getBoundingClientRect().bottom < 0);

      let active = sections[0].label;
      let activeIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const heading = document.getElementById(sections[i].id);
        if (heading && heading.getBoundingClientRect().top <= 100) {
          active = sections[i].label;
          activeIdx = i;
        }
      }
      setCurrentSection(active);
      setCurrentSectionIndex(activeIdx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  useEffect(() => {
    if (isFPGAArticle) {
      document.body.style.backgroundColor = '#f5efeb';
      return () => { document.body.style.backgroundColor = ''; };
    }
    if (isLoRAArticle || isMultiLoRAArticle) {
      document.body.style.backgroundColor = '#ffffff';
      return () => { document.body.style.backgroundColor = ''; };
    }
  }, [isFPGAArticle, isLoRAArticle, isMultiLoRAArticle]);

  if (!article) {
    return null;
  }

  // Custom theme for FPGA-style articles
  let bgColor = 'bg-transparent';
  if (isFPGAArticle) bgColor = 'bg-[#f5efeb]/90';
  else if (isLoRAArticle || isMultiLoRAArticle) bgColor = 'bg-white';
  const isLoRAFamily = isLoRAArticle || isMultiLoRAArticle;
  const textColor = isLoRAFamily ? 'text-[#000000]' : (useFPGAStyle ? 'text-[#1a1a1a]' : 'text-black dark:text-white');
  const titleColor = isLoRAFamily ? 'text-[#000000]' : (useFPGAStyle ? 'text-[#1a1a1a]' : 'text-black dark:text-white');

  return (
    <div ref={articleRef} className={`min-h-dvh w-full ${bgColor} transition-colors duration-200`}>
      {isLoRAFamily && sections && (
        <div
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            opacity: showBar ? 1 : 0,
            pointerEvents: showBar ? 'auto' : 'none',
            transform: showBar ? 'translateY(0)' : 'translateY(-100%)',
            fontFamily: '"IBM Plex Sans", sans-serif',
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm border-b border-black/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => {
                    const id = sections[currentSectionIndex]?.id;
                    const el = id && document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="text-[11px] font-medium text-[#000000]/50 hover:text-[#023e7d] tracking-wide truncate transition-colors duration-200 cursor-pointer"
                >
                  {currentSection}
                </button>
                <span className="text-[10px] text-[#000000]/30 flex-shrink-0">{currentSectionIndex + 1} / {sections.length}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="text-[10px] tabular-nums text-[#000000]/30">{Math.round(scrollProgress * 100)}%</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[#000000]/30 hover:text-[#023e7d] transition-colors duration-200"
                  aria-label="Back to top"
                >
                  <ArrowUp size={12} />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[2px] bg-[#0B1120]/5">
            <div className="h-full bg-[#023e7d]/70 transition-[width] duration-75 ease-linear" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </div>
      )}
      {article.quote && (
      <div className="px-8 sm:px-12 md:px-14 lg:px-20 pt-8 md:pt-10">
        <button onClick={() => onNavigate('writing')} className="flex items-center gap-2 text-sm md:text-base font-light icon-sweep">
          <ArrowLeft size={18} /> back to writing
        </button>
      </div>
      )}
      <div
        className={`max-w-4xl mx-auto px-4 ${isLoRAFamily ? 'pt-20 pb-16' : 'py-16'} sm:px-6 lg:px-8 ${useFPGAStyle ? '' : 'font-light'}`}
        style={
          isLoRAFamily
            ? { fontFamily: '"IBM Plex Sans", sans-serif' }
            : useFPGAStyle
              ? { fontFamily: 'Lora, serif' }
              : undefined
        }
      >
        <div ref={headerRef} className={useFPGAStyle ? 'mt-8' : ''}>
          <h1 className={`mb-4 ${titleColor} transition-colors duration-200 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${useFPGAStyle ? `text-3xl md:text-4xl ${isLoRAFamily ? 'font-medium' : 'font-semibold'} max-w-5xl` : 'text-3xl sm:text-4xl font-serif font-light italic tracking-tight leading-tight'}`}>{article.title}</h1>
          {useFPGAStyle && (
            <>
            <div className={`flex items-center gap-3 mb-8 ${textColor} transition-colors duration-200`}>
              <span className="text-sm">Priyal Taneja</span>
              <div className="flex items-center space-x-1 -ml-1.5 translate-y-[1px]">
                <a
                  href="https://www.linkedin.com/in/priyaltaneja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={13} />
                </a>
                <a
                  href="https://x.com/TanejaPriyal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a1a1a] hover:text-[#1a1a1a]/70 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <RiTwitterXFill size={13} />
                </a>
              </div>
              <span className="text-[#1a1a1a]">|</span>
              {article.date && (
                <span className="text-sm">{article.date}</span>
              )}
              {isFPGAArticle && (
                <>
              <span className="text-[#1a1a1a]">|</span>
              <a
                href={publicAsset("/Understanding_FPGAs_from_First_Principles.pdf")}
                download
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fce7f3] text-[#1a1a1a] font-medium hover:bg-[#f9d4e8] transition-colors duration-200 border border-[#1a1a1a]/20 shadow-sm"
                aria-label="Download PDF"
              >
                <Download size={12} />
                <span className="text-xs">Download PDF</span>
              </a>
              </>
              )}
            </div>
            </>
          )}
          {isLoRAArticle && (
            <>
              <p className={`italic text-[16px] text-[#33415c] leading-[1.7] mt-2 mb-4 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {article.subtitle}
              </p>
              <div className={`border-l-2 border-[#023e7d]/30 pl-4 mb-2 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#023e7d]/80">Part 1 of 2</span>
                <p className="text-[13px] leading-relaxed text-[#000000]/55 mt-1">
                  This is the first of a two-part series on LoRA serving. If you're already comfortable with the fundamentals, feel free to skip ahead to{' '}
                  <button
                    onClick={() => onNavigate('multi-lora-at-scale')}
                    className="text-[#023e7d]/80 hover:text-[#023e7d] underline decoration-[#023e7d]/30 underline-offset-2 hover:decoration-[#023e7d] transition-colors duration-200"
                  >
                    Part 2: Multi-LoRA at scale
                  </button>.
                </p>
              </div>
            </>
          )}
          {isMultiLoRAArticle && (
            <>
              <p className={`italic text-[16px] text-[#33415c] leading-[1.7] mt-2 mb-4 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {article.subtitle}
              </p>
              <div className={`border-l-2 border-[#023e7d]/30 pl-4 mb-2 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#023e7d]/80">Part 2 of 2</span>
                <p className="text-[13px] leading-relaxed text-[#000000]/55 mt-1">
                  This is the second part of a two-part series. The first article,{' '}
                  <button
                    onClick={() => onNavigate('mechanics-of-lora')}
                    className="text-[#023e7d]/80 hover:text-[#023e7d] underline decoration-[#023e7d]/30 underline-offset-2 hover:decoration-[#023e7d] transition-colors duration-200"
                  >
                    The mechanics of LoRA
                  </button>, covers the conceptual foundations that this article builds on.
                </p>
              </div>
            </>
          )}
        </div>
        {isLoRAFamily && (
          <hr className={`border-t border-black/10 mt-6 mb-12 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        )}
        {article.date && !useFPGAStyle && (
        <div className={`text-gray-500 dark:text-gray-400 text-sm md:text-base mb-8 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>{article.date}</div>
        )}
        {article.quote && (
          <div className={`transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <hr className="border-t border-gray-200 dark:border-white/20 mb-8 transition-colors duration-200" />
        <div className="italic text-sm md:text-base text-white/50 mb-8">{article.quote}</div>
          </div>
        )}
        {isFPGAArticle && (
          <div className={`mb-12 pb-8 border-b border-gray-300 ${textColor}`}>
            <h2 className={`text-xl font-medium mb-4 ${textColor}`}>Table of Contents</h2>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#introduction" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('introduction');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  1. Introduction & Prerequisites
                </a>
              </li>
              <li>
                <a 
                  href="#hardware-spectrum" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('hardware-spectrum');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  2. The Gap in the Hardware Spectrum
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#evolution-logic-chips" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('evolution-logic-chips');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      2.1  The Evolution of Logic Chips
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#why-fpgas" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('why-fpgas');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      2.2 - Why FPGAs? The Need for Reconfigurable Hardware
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#fpga-architectural-overview" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('fpga-architectural-overview');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  3. An Overview of an FPGA's Architecture
                </a>
              </li>
              <li>
                <a 
                  href="#clb" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('clb');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  4. Configurable Logic Blocks (CLB)
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#luts" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('luts');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      4.1  Lookup Tables (LUTs)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#flip-flops-registers" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('flip-flops-registers');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      4.2  Flip-Flops and Registers
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#carry-chains" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('carry-chains');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      4.3  Carry Chains
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#programmable-interconnect" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('programmable-interconnect');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  5. Programmable Interconnect
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#routing-channels" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('routing-channels');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      5.1  Routing Channels
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#switch-matrices" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('switch-matrices');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      5.2 - Switch Matrices
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#key-parameters" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('key-parameters');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      5.3  Key Parameters
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#memory-resources" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('memory-resources');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  6. Memory Resources
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#cram" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('cram');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      6.1 Configuration RAM (CRAM)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#distributed-ram" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('distributed-ram');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      6.2  Distributed RAM
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#block-ram" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('block-ram');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      6.3 Block RAM (BRAM)
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#dsp-slices" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('dsp-slices');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  7. DSP Slices / Hardened Arithmetic Blocks
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#dsp-internal-structure" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('dsp-internal-structure');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      7.1  Internal Structure of a DSP Slice
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#pre-adder" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('pre-adder');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      7.2 The Role of the Pre-Adder
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#cascading-wide-arithmetic" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('cascading-wide-arithmetic');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      7.3  Cascading and Wide Arithmetic
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#io-transceivers" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('io-transceivers');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  8. I/O, Transceivers, and High-Speed Interfaces
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#io-blocks" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('io-blocks');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      8.1 I/O Blocks and Electrical Standards
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#differential-signaling" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('differential-signaling');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      8.2  Differential Signaling and LVDS
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#clocking-architecture" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('clocking-architecture');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  9. Clocking Architecture
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#global-clock-distribution" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('global-clock-distribution');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      9.1 Global Clock Distribution and Skew
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#clock-management" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('clock-management');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      9.2  Clock Management Blocks
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a 
                  href="#hdl-to-hardware" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('hdl-to-hardware');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`hover:underline ${textColor} transition-colors duration-200 cursor-pointer`}
                >
                  10. HDL-to-Hardware Flow
                </a>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <a 
                      href="#hardware-description-languages" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('hardware-description-languages');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      10.1 Hardware Description Languages
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#synthesis" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('synthesis');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      10.2  Synthesis
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#placement-routing" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('placement-routing');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      10.3  Placement and Routing
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#static-timing-analysis" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('static-timing-analysis');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      10.4 Static Timing Analysis
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#bitstream-generation" 
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('bitstream-generation');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`hover:underline ${textColor} transition-colors duration-200 text-base cursor-pointer`}
                    >
                      10.5  Bitstream Generation
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}
        <div className={`${useFPGAStyle ? 'prose prose-lg' : 'prose reflective-article-content'} max-w-none mb-8 ${textColor} transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {React.cloneElement(article.content, {
            className: `${textColor} transition-colors duration-200`
          })}
        </div>
        {isLoRAArticle && (
          <div className="flex justify-end mt-8 mb-4 border-t border-black/10 pt-8">
            <button
              onClick={() => onNavigate('multi-lora-at-scale')}
              className="flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 group"
              style={{ color: '#023e7d' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#001845'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#023e7d'; }}
            >
              <span>Part 2: Multi-LoRA at scale</span>
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        )}
        {isMultiLoRAArticle && (
          <div className="flex justify-between items-center mt-8 mb-4 border-t border-black/10 pt-8">
            <button
              onClick={() => onNavigate('mechanics-of-lora')}
              className="flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 group"
              style={{ color: '#023e7d' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#001845'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#023e7d'; }}
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span>Part 1: The mechanics of LoRA</span>
            </button>
            <a
              href="https://github.com/priyaltaneja/multi-lora-serving-benchmark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-200"
              style={{ color: '#023e7d' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#001845'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#023e7d'; }}
            >
              <FaGithub size={16} />
              <span>View benchmark code</span>
            </a>
          </div>
        )}
        {!isLoRAFamily && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center p-2 cursor-pointer group"
              aria-label="Back to the top"
            >
              <ArrowUp size={18} className="text-white/60 group-hover:text-white transition-colors duration-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail; 
