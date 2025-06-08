import { useEffect, useRef } from 'react';

const TwitterEmbed = ({ tweetUrl }) => {
  const ref = useRef();

  useEffect(() => {
    // Only add the script if it doesn't exist
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className="flex justify-center">
      <blockquote className="twitter-tweet">
        <a href={tweetUrl}></a>
      </blockquote>
    </div>
  );
};

export default TwitterEmbed; 