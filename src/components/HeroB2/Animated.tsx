import { useEffect, useRef, type ElementType, type HTMLAttributes } from 'react';
import type { AnimationSpec } from './motion';

interface AnimatedProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Must be referentially stable (module-level constants) — they restart on change. */
  animations: AnimationSpec[];
}

/**
 * Runs Web Animations API animations on its element. Under
 * `prefers-reduced-motion` nothing runs and the element keeps its resting style.
 */
const Animated: React.FC<AnimatedProps> = ({ as: Tag = 'div', animations, ...rest }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const running = animations.map(({ keyframes, options }) => el.animate(keyframes, options));
    return () => running.forEach((a) => a.cancel());
  }, [animations]);

  return <Tag ref={ref} {...rest} />;
};

export default Animated;
