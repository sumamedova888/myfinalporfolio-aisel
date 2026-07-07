'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Interactive right-side hero visual.
 * A canvas particle network + connection lines, a CSS glass orb, floating
 * glass labels, and mouse-following parallax across independent depth layers.
 */

const PALETTE = [
  { r: 0, g: 242, b: 254 }, // cyan
  { r: 79, g: 172, b: 254 }, // blue
  { r: 176, g: 102, b: 254 }, // violet
];

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  depth: number; // 0.2 (far) .. 1 (near)
  size: number;
  color: { r: number; g: number; b: number };
  twinkle: number;
}

function ParticleField({
  mx,
  my,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Latest smoothed pointer offset (-0.5..0.5), read inside the raf loop.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = mx.on('change', (v) => (pointer.current.x = v));
    const unsubY = my.on('change', (v) => (pointer.current.y = v));
    return () => {
      unsubX();
      unsubY();
    };
  }, [mx, my]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles: Particle[] = [];
    const COUNT = 46;
    for (let i = 0; i < COUNT; i++) {
      const depth = 0.25 + Math.random() * 0.75;
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 60 + Math.random() * 190,
        speed: (0.0006 + Math.random() * 0.0016) * (Math.random() > 0.5 ? 1 : -1),
        depth,
        size: 0.6 + depth * 2.2,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const positions: { x: number; y: number; depth: number }[] = new Array(
      COUNT
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const px = pointer.current.x;
      const py = pointer.current.y;

      // Update + collect positions
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        if (!prefersReduced) p.angle += p.speed;
        p.twinkle += 0.02;
        // Deeper particles shift more with the pointer for parallax depth.
        const parX = px * 70 * p.depth;
        const parY = py * 70 * p.depth;
        const x = cx + Math.cos(p.angle) * p.radius + parX;
        const y = cy + Math.sin(p.angle) * p.radius * 0.92 + parY;
        positions[i] = { x, y, depth: p.depth };
      }

      // Connection lines between nearby particles
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = positions[i];
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.16 * ((a.depth + b.depth) / 2);
            ctx.strokeStyle = `rgba(150, 190, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        const pos = positions[i];
        const flicker = 0.5 + Math.sin(p.twinkle) * 0.25;
        const alpha = (0.25 + p.depth * 0.5) * flicker;
        const { r, g, b } = p.color;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowBlur = 8 * p.depth;
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

function FloatingLabel({
  children,
  className,
  mx,
  my,
  depth,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  delay: number;
}) {
  const x = useTransform(mx, (v) => v * 60 * depth);
  const y = useTransform(my, (v) => v * 60 * depth);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute z-30 ${className ?? ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6 + delay * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.06 }}
        data-cursor="explore"
        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white/80">
          {children}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw pointer offset relative to the visual (-0.5..0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smoothed values used everywhere for buttery parallax
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [rawX, rawY]);

  // Orb parallax layers (near layer moves most)
  const orbX = useTransform(mx, (v) => v * 40);
  const orbY = useTransform(my, (v) => v * 40);
  const glowX = useTransform(mx, (v) => v * 20);
  const glowY = useTransform(my, (v) => v * 20);

  return (
    <div
      ref={containerRef}
      className="relative hidden h-[min(520px,62vh)] w-[38%] items-center justify-center lg:flex shrink-0"
    >
      {/* Soft radial glow behind the orb */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(79,172,254,0.22),rgba(176,102,254,0.12)_45%,transparent_70%)] blur-[40px]" />
      </motion.div>

      {/* Particle network layer */}
      <ParticleField mx={mx} my={my} />

      {/* GLASS ORB */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="relative z-20"
        data-cursor="view"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.04 }}
          className="group relative h-[240px] w-[240px] xl:h-[280px] xl:w-[280px]"
        >
          {/* Core glass sphere */}
          <div className="absolute inset-0 rounded-full border border-white/15 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),rgba(255,255,255,0.06)_35%,rgba(10,12,20,0.15)_70%)] shadow-[inset_0_0_60px_rgba(255,255,255,0.12),inset_0_-20px_40px_rgba(80,140,255,0.15),0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-700 group-hover:shadow-[inset_0_0_70px_rgba(255,255,255,0.18),inset_0_-20px_50px_rgba(120,90,255,0.25),0_40px_100px_rgba(0,0,0,0.55)]" />

          {/* Holographic gradient trail inside */}
          <div className="absolute inset-[14%] overflow-hidden rounded-full opacity-70 mix-blend-screen">
            <div className="absolute -inset-1/2 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(0,242,254,0.0),rgba(0,242,254,0.35),rgba(176,102,254,0.35),rgba(79,172,254,0.0))] blur-md" />
          </div>

          {/* Top-left specular highlight */}
          <div className="absolute left-[18%] top-[14%] h-16 w-24 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute left-[26%] top-[20%] h-3 w-6 rounded-full bg-white/80 blur-[2px]" />

          {/* Bottom refraction glow */}
          <div className="absolute bottom-[10%] left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-[#4facfe]/25 blur-2xl" />

          {/* Fine rim ring */}
          <div className="absolute inset-0 rounded-full border border-white/5" />
        </motion.div>
      </motion.div>

      {/* FLOATING GLASS LABELS */}
      <FloatingLabel
        mx={mx}
        my={my}
        depth={0.9}
        delay={0.2}
        className="left-[-6%] top-[8%]"
      >
        AI Systems
      </FloatingLabel>
      <FloatingLabel
        mx={mx}
        my={my}
        depth={0.5}
        delay={0.35}
        className="right-[-10%] top-[26%]"
      >
        Automation
      </FloatingLabel>
      <FloatingLabel
        mx={mx}
        my={my}
        depth={1.1}
        delay={0.5}
        className="left-[-14%] top-[52%]"
      >
        Software
      </FloatingLabel>
      <FloatingLabel
        mx={mx}
        my={my}
        depth={0.7}
        delay={0.65}
        className="bottom-[10%] right-[-4%]"
      >
        Growth
      </FloatingLabel>
      <FloatingLabel
        mx={mx}
        my={my}
        depth={0.4}
        delay={0.8}
        className="bottom-[2%] left-[16%]"
      >
        Strategy
      </FloatingLabel>
    </div>
  );
}
