import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  unit?: string;
  label: string;
}

const Counter = ({ end, suffix = '', unit = '', label }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
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
    <div ref={ref} className="text-center group flex flex-col items-center">
      <div className="font-display font-black text-gradient-copper tabular-nums leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
        {count.toLocaleString('ru-RU')}
        <span className="text-teal">{suffix}</span>
        {unit && <span className="text-teal text-[0.6em] align-super ml-0.5">{unit}</span>}
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

export default Counter;
