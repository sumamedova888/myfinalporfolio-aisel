'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FadeUp, MaskText } from '@/components/animations';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievement?: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

const cardClass =
  'group p-5 sm:p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:border-accent/40 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)]';

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="space-y-24">
          <div className="space-y-4 text-center">
            <MaskText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                Professional Experience
              </h2>
            </MaskText>
            <FadeUp delay={0.2} className="flex justify-center">
              <div className="w-12 h-1 bg-accent rounded-full mt-4" />
            </FadeUp>
          </div>

          <div ref={containerRef} className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
              <motion.div
                className="absolute top-0 w-full bg-accent origin-top"
                style={{ scaleY, height: '100%' }}
              />
            </div>

            <div className="block md:hidden absolute left-[15px] top-0 bottom-0 w-[2px] bg-white/10">
              <motion.div
                className="absolute top-0 w-full bg-accent origin-top"
                style={{ scaleY, height: '100%' }}
              />
            </div>

            <div className="space-y-16">
              {experience.map((item, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, margin: '-10%' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex items-center justify-between md:justify-normal ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    <div className="absolute left-[7px] md:left-1/2 w-4 h-4 bg-[#050505] border-[3px] border-accent rounded-full md:-translate-x-1/2 shadow-[0_0_15px_rgba(255,140,0,0.45)] z-10" />

                    <div className="hidden md:block w-1/2" />

                    <div
                      className={`w-full pl-12 md:pl-0 md:w-[45%] ${
                        isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                      }`}
                    >
                      <div className={cardClass}>
                        <span className="inline-block px-3 py-1 bg-brand/15 text-brand border border-brand/30 rounded-full text-xs font-semibold mb-4">
                          {item.period}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white mb-1">
                          {item.role}
                        </h3>
                        <p className="text-brand font-semibold mb-4">{item.company}</p>
                        <p className="text-white/65 leading-relaxed text-sm md:text-base">
                          {item.description}
                        </p>
                        {item.achievement && (
                          <p className="text-sm text-brand mt-4 italic border-t border-white/10 pt-3">
                            ★ {item.achievement}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
