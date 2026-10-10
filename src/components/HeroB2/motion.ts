/**
 * Motion data for HeroB2, derived from the Figma timeline (40s loop).
 * The numbers are generated from the same orbit math used to author the
 * keyframes in Figma, so they reproduce `get_motion_context` exactly.
 */

export interface AnimationSpec {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
}

export const LOOP_MS = 40_000;

const STAGE_CENTER = { x: 720, y: 340 };
const EASE_IN_OUT = 'ease-in-out';

const round = (v: number) => Math.round(v * 100) / 100;
const px = (x: number, y: number) => `${round(x)}px ${round(y)}px`;

const loop = (keyframes: Keyframe[], easing = 'linear'): AnimationSpec => ({
  keyframes,
  options: { duration: LOOP_MS, iterations: Infinity, easing },
});

/** Point on an ellipse (rx, ry) rotated by `deg` (clockwise on screen) around (cx, cy). */
const ellipsePoint = (cx: number, cy: number, rx: number, ry: number, deg: number, t: number) => {
  const th = (deg * Math.PI) / 180;
  const x = rx * Math.cos(t);
  const y = ry * Math.sin(t);
  return [cx + x * Math.cos(th) - y * Math.sin(th), cy + x * Math.sin(th) + y * Math.cos(th)];
};

const sample = (steps: number, at: (tau: number) => [number, number]): Keyframe[] => {
  const [x0, y0] = at(0);
  return Array.from({ length: steps + 1 }, (_, k) => {
    const [x, y] = at(k / steps);
    return { offset: k / steps, translate: px(x - x0, y - y0), easing: 'linear' };
  });
};

/** Satellites and their chips ride one big ellipse, one full turn per loop. */
const SAT_ORBIT = { rx: 640, ry: 270, steps: 36 };

export const satelliteOrbit = (phaseDeg: number): AnimationSpec => {
  const phi0 = (phaseDeg * Math.PI) / 180;
  return loop(
    sample(SAT_ORBIT.steps, (tau) => {
      const phi = phi0 + 2 * Math.PI * tau;
      return [
        STAGE_CENTER.x + SAT_ORBIT.rx * Math.cos(phi),
        STAGE_CENTER.y + SAT_ORBIT.ry * Math.sin(phi),
      ];
    })
  );
};

/** Atom rings turn half a turn (they are 180°-symmetric, so the loop is seamless). */
export const ringSpin = (fromDeg: number, toDeg: number): AnimationSpec =>
  loop([{ rotate: `${fromDeg}deg` }, { rotate: `${toDeg}deg` }]);

/**
 * Atom ring half-axes, exactly as drawn in Figma (590 x 200). The rings are
 * large on purpose: tilted by 60° they run past the hero edge, so the stars
 * riding them leave the frame for part of the loop — same as the design.
 */
export const ATOM_SCALE = 1;
export const ATOM_RING = { rx: 590 * ATOM_SCALE, ry: 200 * ATOM_SCALE };

/** Orbiting stars ride a tilted atom ring that itself rotates. */
const STAR_ORBITS = [
  { ringDeg: 0, spin: 1, start: 0.5, turns: 1.5 },
  { ringDeg: 60, spin: -1, start: 2.2, turns: -1.5 },
  { ringDeg: -60, spin: 1, start: 4.1, turns: 1.5 },
  // second star per ring, half an orbit apart from the first
  { ringDeg: 0, spin: 1, start: 0.5 + Math.PI, turns: 1.5 },
  { ringDeg: 60, spin: -1, start: 2.2 + Math.PI, turns: -1.5 },
  { ringDeg: -60, spin: 1, start: 4.1 + Math.PI, turns: 1.5 },
];

const starPoint = (index: number, tau: number) => {
  const o = STAR_ORBITS[index];
  return ellipsePoint(
    STAGE_CENTER.x,
    STAGE_CENTER.y,
    ATOM_RING.rx,
    ATOM_RING.ry,
    o.ringDeg - o.spin * 180 * tau,
    o.start + 2 * Math.PI * o.turns * tau
  ) as [number, number];
};

/** Where an orbiting star rests (loop start), on the stage — it sits on its ring. */
export const starRestPoint = (index: number) => starPoint(index, 0);

export const starOrbit = (index: number): AnimationSpec =>
  loop(sample(80, (tau) => starPoint(index, tau)));

/** Alternating lo/hi values every half period; `startHigh` picks the first one. */
const twinkle = (
  periodS: number,
  startHigh: boolean,
  frame: (high: boolean) => Keyframe
): AnimationSpec => {
  const halves = Math.round(LOOP_MS / 1000 / (periodS / 2));
  return loop(
    Array.from({ length: halves + 1 }, (_, k) => ({
      ...frame((k % 2 === 0) === startHigh),
      offset: k / halves,
      easing: EASE_IN_OUT,
    }))
  );
};

export const fade = (periodS: number, startHigh: boolean, lo: number, hi: number) =>
  twinkle(periodS, startHigh, (high) => ({ opacity: high ? hi : lo }));

export const pulse = (
  periodS: number,
  startHigh: boolean,
  opacity: [number, number],
  scale: [number, number]
) =>
  twinkle(periodS, startHigh, (high) => ({
    opacity: opacity[high ? 1 : 0],
    scale: scale[high ? 1 : 0],
  }));

export const continuousSpin = (turns: number): AnimationSpec =>
  loop([{ rotate: '0deg' }, { rotate: `${turns * 360}deg` }]);

/** One-shot slide-up + fade-in used by the hero copy (play once on load). */
export const entrance = (startS: number, endS: number, rise = 40): AnimationSpec => ({
  keyframes: [
    { opacity: 0, translate: `0 ${rise}px` },
    { opacity: 1, translate: '0 0' },
  ],
  options: {
    delay: startS * 1000,
    duration: (endS - startS) * 1000,
    easing: 'ease-out',
    fill: 'backwards',
  },
});

/** One-shot fade-in (satellites/chips appear after the copy). */
export const appear = (startS: number, endS: number): AnimationSpec => ({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: {
    delay: startS * 1000,
    duration: (endS - startS) * 1000,
    easing: 'ease-out',
    fill: 'backwards',
  },
});
