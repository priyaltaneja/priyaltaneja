import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

const articles = [
  {
    title: 'I\'ll Be Happy When [insert here] — A Reflection on Conditional Happiness Versus True Happiness.',
    date: 'June 6, 2023',
    quote: '“Conditional Happiness not only prevents us from being happy in the present, it also stunts our progress and personal growth. It holds us back from the success we are forfeiting happiness to achieve.”',
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
                onClick={() => onNavigate('projects')}
                className="hover:text-pink-500 transition-colors"
              >
                projects
              </button>
            </li>
            <li>
              <button 
                className="text-pink-500"
              >
                writing
              </button>
            </li>
          </ul>
        </nav>

        <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic mb-12 text-center">Writing</h1>
          <div className="max-w-3xl mx-auto">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="mb-10 border border-transparent cursor-pointer rounded-lg transition transform bg-white hover:scale-105 hover:shadow-pink-100 hover:shadow-lg hover:border-pink-200"
                onClick={() => handleArticleClick(idx)}
              >
                <div className="flex items-center justify-between px-6 py-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl mb-2 text-gray-900 transition-colors">{article.title}</h2>
                    <div className="text-gray-500 text-sm mt-2">{article.date}</div>
                  </div>
                  <span className="ml-4 text-pink-500">
                    <ChevronRight size={28} />
                  </span>
                </div>
              </div>
            ))}
            <div className="text-center text-gray-400 italic mt-12">more articles coming soon :)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing; 
