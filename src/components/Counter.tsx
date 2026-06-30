import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

const Counter = ({ end, suffix = '', label }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-5xl md:text-7xl font-bold text-gradient-copper tabular-nums">
        {count.toLocaleString('ru-RU')}
        <span className="text-teal">{suffix}</span>
      </div>
      <div className="mt-3 font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default Counter;
