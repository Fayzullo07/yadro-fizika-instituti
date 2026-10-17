import { EASE, ROLL_MS } from './motion';

/** One column of an odometer: rolls through a full 0–9 cycle and lands on `digit`. */
const Digit: React.FC<{ digit: number; active: boolean; order: number; delay: number }> = ({
  digit,
  active,
  order,
  delay,
}) => (
  <span className="relative inline-block h-[1em] overflow-hidden leading-none" aria-hidden>
    <span
      className="flex flex-col will-change-transform motion-reduce:transition-none"
      style={{
        transform: active ? `translateY(-${digit + 10}em)` : 'translateY(0)',
        transition: `transform ${ROLL_MS + order * 220}ms ${EASE} ${delay}ms`,
      }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} className="block h-[1em] leading-none">
          {i % 10}
        </span>
      ))}
    </span>
  </span>
);

interface OdometerProps {
  text: string;
  active: boolean;
  /** size, weight and colour live on the caller's class */
  className?: string;
  /** ms before the first column starts rolling */
  delay?: number;
}

/** Digits roll up from 0 one column at a time; non-digit characters stay put. */
const Odometer: React.FC<OdometerProps> = ({ text, active, className = '', delay = 0 }) => (
  <span aria-label={text} className={`flex leading-none tabular-nums ${className}`}>
    {text.split('').map((ch, i) =>
      /\d/.test(ch) ? (
        <Digit key={i} digit={Number(ch)} active={active} order={text.length - i} delay={delay} />
      ) : (
        <span key={i} aria-hidden>
          {ch}
        </span>
      )
    )}
  </span>
);

export default Odometer;
