import { useEffect, useState } from 'react';

const TypewriterTitle = ({ text }: { text: string }) => {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 180);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={shown.length < text.length ? 'typed-caret' : ''}>
      {shown}
    </span>
  );
};

export default TypewriterTitle;
