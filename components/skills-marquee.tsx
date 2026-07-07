'use client';

import { motion } from 'framer-motion';

const skillsRow1 = [
  'Brand Strategy', 'Digital Design', 'UI/UX', 'Art Direction', 'Prototyping', 'Web Design', 'React', 'Next.js'
];
const skillsRow2 = [
  'Visual Storytelling', 'Figma', 'Framer', 'Design Systems', 'Marketing', 'Creative Direction', 'Typography', 'Animation'
];

function MarqueeRow({ items, direction = 1 }: { items: string[], direction?: 1 | -1 }) {
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-4 group">
      <motion.div
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        className="flex gap-6 pr-6 w-max group-hover:[animation-play-state:paused]"
      >
        {/* Render twice for seamless looping */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-display text-xl md:text-2xl font-medium shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:text-white transition-colors cursor-default"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <section className="py-20 bg-[#050505] overflow-hidden relative z-10 border-y border-white/5">
      {/* Soft gradient masks for edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-4">
        <MarqueeRow items={skillsRow1} direction={1} />
        <MarqueeRow items={skillsRow2} direction={-1} />
      </div>
    </section>
  );
}
