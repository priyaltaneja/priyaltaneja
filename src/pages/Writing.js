import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    title: 'Unlearning Perfectionism',
    date: 'September 17, 2025',
    quote: '"Perfectionism doesn\'t drive success, it hinders it."',
    content: (
      <>
        <p className="text-lg mb-6">The obvious definition is wanting everything you do to be perfect.</p>
        <p className="text-lg mb-6">That definition only scratches the surface. It says what perfectionism looks like, but not why we cling to it.</p>
        <p className="text-lg mb-6">On a deeper level, <strong>perfectionism is the tendency to tie your self-worth and identity to your achievements.</strong></p>
        <p className="text-lg mb-6">These achievements are subjective and aren't the same for everyone. To one, it may mean securing their dream internship and to the next, it means buying a house by 25, graduating as valedictorian or always looking put-together.</p>
        <p className="text-lg mb-6">None of these goals are wrong on their own. In fact, I would argue that goals traditionally help add structure and direction to life. <strong>The danger comes when this gets tangled up in identity.</strong> When your wins feel like proof of your worth and your failures feel like a personal flaw.</p>
        <p className="text-lg mb-6">If you've ever felt a similar way, I don't blame you. For as long as we've known, Our educational system has upheld a hierarchy of intelligence which has conditioned us to equate our value with numbers on a test, class rankings or praise from our parents and teachers.</p>
        <p className="text-lg mb-6">In today's digital world, that message only gets louder. Social media metrics, LinkedIn updates, and curated highlight reels amplify the sense that our worth is something to be measured, compared, and displayed.</p>
        <p className="text-lg mb-6">When you grow up in that kind of environment, those lessons don't stay abstract. I remember creating a 3D model of the respiratory system, presenting it to my peers, and later being referred by my teacher to a district-wide conference.</p>
        <p className="text-lg mb-6">At ten years old, I didn't have the language for it, but I remember how much I liked being seen as capable and intelligent. It was the first time I realized that my efforts, and the way others recognized them, could shape how I was valued.</p>
        <p className="text-lg mb-6">With a natural ability to excel academically, I gradually built my sense of self around overachievement. This mindset followed me for years. but as I've grown, I've firsthand seen & experienced how fragile and exhausting it is.</p>
        <p className="text-lg mb-6">One of the clearest ways I've seen perfectionism show up is in the form of procrastination. To break it down to its core, easy tasks feel safe and their completion will reaffirm our confidence. But when a task feels remotely difficult, it's put off — not out of laziness, but out of fear.</p>
        <p className="text-lg mb-6">The fear of trying and discovering we can't do it perfectly. So instead of taking the risk, we delay, waiting for the "right" time that never really comes.</p>
        <p className="text-lg mb-6">The irony is that procrastination doesn't protect us from failure; it just delays growth. and each time we avoid the hard thing, we reinforce the belief that our worth is tied to effortless success. That oscillating cycle between action and avoidance compounds and decreases both your confidence and capacity to take risks.</p>
        <p className="text-lg mb-6">Good news is <strong>perfectionism is a learned pattern, not a fixed trait.</strong> This means it's within our control to unlearn this mindset. That being said, it's comparable to training at the gym - we won't see overnight results and it'll require repetition and discipline.</p>
        <p className="text-lg mb-6">I'm still figuring out how to let go of this mindset, but so far my favorite ways to unlearn perfectionism have been:</p>
        <ul className="list-disc ml-8 mb-6 space-y-2">
          <li className="text-lg"><strong>Daily updates:</strong> Write down everything you've done during the day, no matter how trivial it seems. Review this at the end of the week or periodically. Over time, you'll rewire your brain to appreciate consistency over the shiny achievements.</li>
          <li className="text-lg"><strong>Be a beginner on purpose:</strong> Carve out time for activities that don't align with your career path or what you're "supposed" to be good at. Exploring unfamiliar skills gives you permission to be a beginner again and reminds you that your worth isn't tied to expertise.</li>
          <li className="text-lg"><strong>Seek feedback early:</strong> The next time you work on a project, ask for feedback after your v1. It takes the pressure off always presenting flawless work and I've found that it helps enjoy the process of iteration too!</li>
        </ul>
        <p className="text-lg mb-6">The key to all these practices is shifting the focus away from outcomes and back onto the process.</p>
        <p className="text-lg mb-6">I also want to mention that <strong>unlearning perfectionism does not mean lowering your standards.</strong> It's about freeing yourself from the fear of not being "enough" and internalizing that <strong>progress > perfection.</strong></p>
        <p className="text-lg mb-6">Excellence still matters, but it flourishes most when it's rooted in curiosity, growth, and joy instead of fear. By letting go of the need to get everything right, we create space for mistakes, risks, and the kind of progress that actually moves you forward.</p>
        <p className="text-lg mb-6">So the next time you catch yourself hesitating or waiting to be certain you can do it perfectly, take the step anyway. <strong>Progress will always carry you further than perfection ever could, because real growth comes not from flawless execution, but from the courage to begin.</strong></p>
        
        <hr className="border-t border-pink-200 dark:border-pink-800 my-12" />
        
        <div className="mt-8">
          <div 
            className="substack-embed" 
            data-substack-embed="https://fieldnotesbypriyal.substack.com/embed"
            data-substack-domain="fieldnotesbypriyal.substack.com"
          >
            <iframe 
              src="https://fieldnotesbypriyal.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{border: '1px solid #EEE', background: 'white', borderRadius: '8px'}}
              frameBorder="0" 
              scrolling="no"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4 italic">
            This piece first went out in field notes by priyal — my weekly corner for sharing reflections and sparks of curiosity. If you'd like to journey along with me and receive these notes straight in your inbox, you can subscribe! ♡
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
        <p className="text-lg mb-6">Around two months ago, I started an article (which still remains in my drafts) called 'I've Been More Happy Now Than I Have In The Last Couple Of Years... Why?'</p>
        <img src="/images/article.webp" alt="Draft Screenshot" className="rounded-lg shadow-md mx-auto mb-6 max-w-full" style={{maxHeight: '350px'}} />
        <p className="text-lg mb-6">But weeks later, this article was still blank. Every night at 10:56 pm, I'd find myself back in my own mind, desperately searching for answers that just refused to show up.</p>
        <p className="text-lg mb-6">To be honest, this wasn't the best move on my part.</p>
        <p className="text-lg mb-6">The more I questioned the 'why' behind my mental state, the more I became attached to figuring out. And, throughout that entire process, I think I ended up entering a cycle of self-sabotage.</p>
        <p className="text-lg mb-6">As I'm writing this, everything I just mentioned reminded me of a concept that I had read about in 'The Mountain is You' by Brianna Wiest -- this idea of self-sabotaging when you 'hitting your upper limit.'</p>
        <img src="/images/book.jpeg" alt="The Mountain is You book, candle, and tea" className="rounded-lg shadow-md mx-auto mb-6 max-w-full" style={{maxHeight: '350px'}} />
        {/* Tweet will be rendered in the main render function */}
        <p className="text-lg mb-6">Humans are wired to seek comfort everywhere they go; it explains why no one puts themselves out to face a rejection or sings in the street full of random people-- it's uncomfortable.</p>
        <p className="text-lg mb-6">In the past month, without even realizing it, I ended up losing sight of the initial question about the reason behind my elevated happiness levels. Instead, I became overly fixated on the outcomes I'd been getting. Because in my mind, there was a correlation between the two.</p>
        <p className="text-lg mb-6">I began setting conditions for my happiness, all of which were based on the tangible achievements I'd been getting. My happiness became contingent upon certain factors being present or certain outcomes being achieved.</p>
        <pre className="bg-gray-100 rounded p-4 text-left mb-6 overflow-x-auto"><code>{`if (outcome == True):\n  happiness == True\nelse:\n  happiness == False`}</code></pre>
        <p className="text-lg mb-6">And, this methodology is the way in which countless people navigate their lives -- formally, it's called 'conditional happiness.'</p>
        <p className="text-lg mb-6">But, it's not a sustainable model of thinking.</p>
        <p className="text-lg mb-6">It puts you in a constant pursuit of external validation or the fulfillment of certain conditions in order to feel happy, but what actually ends up happening is that you fall into an infinite loop of waiting for the next 'big' thing.</p>
        <p className="text-lg mb-6">It's this idea that life can always be better than the current moment which sets us on a perpetual chase for the next condition that promises happiness. This becomes a never-ending cycle of constantly seeking improvement, never fully embracing the present.</p>
        <p className="text-lg mb-6">And, this extends beyond just me.</p>
        <p className="text-lg mb-6">So many people in the world around us think this way.</p>
        <div className="mb-6 text-left">
          <p className="italic text-gray-700">Some quotes I've heard...</p>
          <ul className="list-disc ml-8 mt-2 text-gray-800">
            <li>"I'll be happy when I buy a car."</li>
            <li>"I'll be happy when I'm rich."</li>
            <li>"I'll be happy once I get a scholarship."</li>
            <li>"I'll be happy if I get a promotion."</li>
            <li>"I'll be happy when I get into my dream program."</li>
            <li>"I'll be happy if I buy a Gucci bag."</li>
          </ul>
        </div>
        <p className="text-lg mb-6">I think the saddest thing is that this mental model of thinking is drilled into so many of us as children.</p>
        <p className="text-lg mb-6">As I sit down and reflect, I can remember countless of asks I demanded from my parents. What started from toys led to luxury clothing and bags -- all with the common 'if I get [insert here], I'll be happy and never ask for anything again' phrase attached.</p>
        <p className="text-lg mb-6">But, I don't mean to imply that goals shouldn't exist, and that improvement shouldn't be a priority. Rather, true happiness isn't dependent on anything outside of ourselves; it's internal.</p>
        <p className="text-lg mb-6">When happiness becomes conditional and relies on external factors, it transforms into a goal we strive to achieve rather than a natural expression of our being. True happiness, however, is found in the simple joy of existence itself. It shouldn't be treated as a distant objective, but rather embraced as a way of life.</p>
        <p className="text-lg mb-6">And, I think the couple of months where I was so invested into my high levels of happiness followed a structure where I didn't care about achievements. I was very invested into building projects I found interesting and personally connected with at the time, one being epiphany. I was going to sleep with a smile on my face every night because I enjoyed what I was working on... a lot.</p>
        <p className="text-lg mb-6">But, as soon as I hit that pinnacle of an upper-limit, I found myself slipping into a headspace consumed by comparison. Instead of staying true to what truly mattered to me, I became fixated on measuring my outcomes against those of others.</p>
        <p className="text-lg mb-6">From now and then, I've learnt that everything you do should be from a place of self-love and genuine interest instead of completing something for the sake of a potential outcome.</p>
        <p className="text-lg mb-6">But, that's specific to my case. For a general overview, recognizing that your happiness is based on expectations and achievements is the first step to true happiness -- because, now, you're self-aware.</p>
        <p className="text-lg mb-6">Arguably, it's the easiest step as well.</p>
        <p className="text-lg mb-6">The real challenge of reaching true happiness is actually rewiring your brain in the way you think and how you react to the circumstances involving you.</p>
        <p className="text-lg mb-6">I've had countless conversations discussing the internal insecurity of not seeing tangible results, and the entire process of navigating my thoughts led to my two-step process to reverse my thinking and reconnect with with that initial passion and authenticity.</p>
        <p className="text-lg mb-6 italic">note -- this worked best for me! something else might work better for you... i think the process of overcoming these thoughts comes down to identifying the type of conditions you're setting in place.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1) A Detox From The Source of Conditions</h2>
        <p className="text-lg mb-6">Like I've mentioned, a lot of my mental space was consumed by comparison. I identified the source of this was LinkedIn, especially during my hour-long scrolls through the app.</p>
        <p className="text-lg mb-6">So, I deleted it off my phone for a while.</p>
        <p className="text-lg mb-6">It was a conscious choice to embark on a detox of sorts, allowing my mind the freedom to wander without the constant influence of what others were doing or achieving.</p>
        <p className="text-lg mb-6">I still remained updated on the projects of the people closest to me and I stayed connected with multiple communities through platforms like Slack. Of course, their ambition is always so so inspiring to see.</p>
        <p className="text-lg mb-6">But, I refrained from fixating on stalking everyone's achievements and comparing them to my own.</p>
        <p className="text-lg mb-6">A mental separation was my first step to redirect my attention towards nurturing my own passions.</p>
        <p className="text-lg mb-6">The first couple of days of doing this was weird, because I was breaking apart from this subconscious habit I was never intentional about. But, it all came together as I continued to give my brain a lil' break.</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">2) Exploring and Going Down Rabbit Holes</h2>
        <p className="text-lg mb-6">Main lesson from my mini-detox? The conditions I had been setting for my happiness were nothing more than a time-waster. Instead of investing my time in engaging in meaningful learning experiences, I found myself caught in a web of overthinking.</p>
        <p className="text-lg mb-6">And, this wasn't fun. But, as I took away the root cause, I naturally fell back into this state where I could explore and concentrate on what mattered.</p>
        <p className="text-lg mb-6">I started getting excited about finding the next thing for me to work on. Instead of the spontaneous LinkedIn scrolls, I time-blocked that same ~1 hour every night to just read article on artificial intelligence and see what's out there.</p>
        <p className="text-lg mb-6">This habit was nice.</p>
        <p className="text-lg mb-6">After a few days of doing this, when I was going down an entire rabbit hole of leading & growing companies, I came across Cohere and how they're working on semantic search.</p>
        <p className="text-lg mb-6">I loved it.</p>
        <p className="text-lg mb-6">I spent a couple of days just going through their documentation (ended up with 20+ pages of notes) but I felt excited again. It felt nice. Being able to spend hours understanding the fundamentals of Natural Language Processing was so fulfilling.</p>
        <p className="text-lg mb-6">And, this is what filled me with momentum to continue down the trajectory of exploring, along with helping me realize the flaws of obsessing over results.</p>
        <p className="text-lg mb-6">This may seem like a small achievement, but even a small step towards true happiness is a victory in my opinion.</p>
        <p className="text-lg mb-6">And, I've come to realize that a significant change in the way you doesn't happen overnight. It's an iterative process of both failures and successes, and it's common to find yourself reverting to what's comfortable. But, as long as you are self-aware, you'll continue being conscious of your method of thinking.</p>
        <p className="text-lg mb-6">Regardless, I'm still finding my way, navigating through life, and striving to be the best version of myself.</p>
        <div className="mt-8 p-4 bg-pink-50 rounded-lg text-pink-700 font-semibold text-center">TL;DR? As humans, our greatest gift is that happiness is in our control.</div>
      </>
    ),
  },
  // Placeholder for future articles
];

const Writing = ({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleArticleClick = (idx) => {
    window.location.hash = `article-${idx}`;
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#000000] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Navigation */}
        <nav className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} text-center`}>
          <ul className="flex space-x-8 text-lg sm:text-xl md:text-2xl justify-center items-center text-black dark:text-white">
            <li>
              <button 
                onClick={() => onNavigate('home')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4] flex items-center gap-2"
                aria-label="Back to home"
              >
                <ArrowLeft size={24} />
                <span className="sr-only">Back to home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4]"
              >
                about
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('projects')}
                className="hover:text-pink-500 dark:hover:text-[#FF69B4]"
              >
                projects
              </button>
            </li>
            <li>
              <button 
                className="text-pink-500 dark:text-[#FF69B4]"
              >
                writing
              </button>
            </li>
          </ul>
        </nav>

        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-12 text-center text-black dark:text-white transition-colors duration-300">Writing</h1>
          <div className="max-w-3xl mx-auto">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="mb-10 border border-transparent cursor-pointer rounded-lg transition transform bg-white dark:bg-[#000000] hover:shadow-pink-100 dark:hover:shadow-pink-900/50 hover:shadow-lg hover:border-pink-200 dark:hover:border-[#FF69B4] transition-colors duration-300"
                onClick={() => handleArticleClick(idx)}
              >
                <div className="flex items-center justify-between px-6 py-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl mb-2 text-gray-900 dark:text-white transition-colors duration-300">{article.title}</h2>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-2 transition-colors duration-300">{article.date}</div>
                  </div>
                  <span className="ml-4 text-pink-500">
                    <ChevronRight size={28} />
                  </span>
                </div>
              </div>
            ))}
            <div className="text-center text-gray-400 dark:text-gray-500 italic mt-12 transition-colors duration-300">more articles coming soon :)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing; 
