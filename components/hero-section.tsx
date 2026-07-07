'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroVisual } from '@/components/hero-visual';

interface HeroSectionProps {
  name: string;
  title: string;
  heroHeadline: string;
  tagline: string;
  stats: string[];
  whatsapp?: string;
  scheduleCallUrl?: string;
}

export function HeroSection({
  name,
  title,
  heroHeadline,
  tagline,
  stats,
  whatsapp,
  scheduleCallUrl = 'https://calendly.com/aisunmamedova-info/30min',
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameParts = name.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] lg:max-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-white/20 selection:text-white"
    >
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0a2040] blur-[150px] opacity-60 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#1b0a2a] blur-[180px] opacity-70 mix-blend-screen" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] rounded-full bg-[#0a2a2a] blur-[140px] opacity-40 mix-blend-screen" />

        <div
          className="absolute inset-0 opacity-[0.025] hero-grid"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 70% 45%, black 0%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 70% 45%, black 0%, transparent 75%)',
          }}
        />

        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 h-full min-h-[100dvh] lg:min-h-0 lg:max-h-[100dvh] py-16 sm:py-20 lg:py-10 flex flex-col justify-center"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-8 lg:gap-6">
          <div className="w-full lg:w-[58%] flex flex-col items-start text-left z-20">
            <div className="space-y-3 sm:space-y-4 lg:space-y-3 mb-5 sm:mb-6 lg:mb-5 relative">
              <div className="overflow-hidden mask-wrapper">
                <h1 className="text-[2.5rem] leading-[0.92] sm:text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-hero-name font-extrabold tracking-[-0.02em] reveal-text">
                  <span className="text-white">
                    {nameParts.map((part, index) => (
                      <span key={part}>
                        {part}
                        {index < nameParts.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>

              <div className="overflow-hidden mask-wrapper">
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-[2.1rem] leading-snug font-display font-bold text-brand reveal-text">
                  {title}
                </p>
              </div>

              <div className="overflow-hidden mask-wrapper">
                <p className="text-base sm:text-xl md:text-2xl leading-snug font-display font-semibold text-white/90 reveal-text">
                  {heroHeadline}
                </p>
              </div>
            </div>

            <div className="max-w-[640px] mb-5 sm:mb-6 lg:mb-5 overflow-hidden mask-wrapper">
              <p className="text-sm sm:text-base md:text-lg text-white/55 leading-relaxed font-light reveal-text">
                {tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 sm:gap-y-3 mb-6 sm:mb-7 lg:mb-6 overflow-hidden mask-wrapper w-full max-w-[720px]">
              {stats.map((stat) => (
                <div key={stat} className="flex items-start gap-2">
                  <span className="text-brand mt-1.5 text-xs shrink-0">•</span>
                  <p className="text-sm sm:text-base text-white/70 font-medium leading-snug">{stat}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start w-full sm:w-auto">
              <Link
                href={whatsapp || '#contact'}
                target={whatsapp ? '_blank' : undefined}
                rel={whatsapp ? 'noopener noreferrer' : undefined}
                data-cursor="explore"
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-brand hover:bg-brand/90 text-white rounded-full font-medium text-sm sm:text-base md:text-lg transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,140,0,0.35)] hover:shadow-[0_0_50px_-10px_rgba(255,140,0,0.5)]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href={scheduleCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-white/5 text-white/80 hover:text-white rounded-full font-medium text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/15 hover:border-white/30"
              >
                <span>Schedule a Call</span>
                <Calendar className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <HeroVisual />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        style={{ opacity }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">Discover My Work</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white animate-[scroll-indicator_2s_ease-in-out_infinite]" />
        </div>
      </motion.a>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
        .hero-grid {
          animation: grid-drift 40s linear infinite;
        }
        @keyframes grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}} />
    </section>
  );
}
