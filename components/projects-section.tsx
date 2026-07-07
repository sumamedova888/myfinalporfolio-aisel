'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp, MaskText } from '@/components/animations';

interface Project {
  title: string;
  category: string;
  description: string;
  year: number;
}

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({ project, idx, total, imageSrc }: { project: Project; idx: number; total: number; imageSrc: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        top: `calc(15vh + ${idx * 40}px)`,
        zIndex: idx,
      }}
      className="sticky w-full"
    >
      <div className="group relative w-full overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_100px_rgba(0,242,254,0.1)] transition-all duration-700 hover:-translate-y-2">
        <div className="flex flex-col md:flex-row items-stretch p-8 md:p-12 gap-8 md:gap-12">
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between order-2 md:order-1">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-medium text-white/80 border border-white/10">
                  {project.category}
                </span>
                <span className="text-sm font-medium text-white/40">
                  {project.year}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            <div className="mt-12">
              <div className="inline-flex items-center gap-3 text-white font-medium group-hover:gap-5 transition-all duration-300 cursor-pointer">
                <span className="relative z-10">View Case Study</span>
                <span className="w-8 h-[1px] bg-white/40 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-[50%] lg:w-[60%] aspect-[4/3] md:aspect-auto rounded-2xl overflow-hidden relative order-1 md:order-2 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Sample project images - in production these would be real images
  const projectImages = [
    '/projects/project-1.png',
    '/projects/project-2.png',
    '/projects/project-3.png',
    '/projects/project-4.png',
  ];

  return (
    <section id="work" className="py-32 px-6 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <MaskText>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                Selected Work
              </h2>
            </MaskText>
            <FadeUp delay={0.2}>
              <div className="w-16 h-1 bg-gradient-to-r from-white/80 to-transparent rounded-full mt-4" />
            </FadeUp>
          </div>

          {/* Stacked Projects */}
          <div className="relative mt-20 pb-32">
            {projects.map((project, idx) => (
              <ProjectCard
                key={idx}
                project={project}
                idx={idx}
                total={projects.length}
                imageSrc={projectImages[idx] || '/placeholder-project.jpg'}
              />
            ))}
          </div>

          {/* View all projects CTA */}
          <FadeUp delay={0.2} className="flex justify-center mt-12">
            <button className="group relative px-9 py-5 bg-white/10 hover:bg-white/15 text-white rounded-full font-medium text-lg transition-all duration-500 overflow-hidden backdrop-blur-md border border-white/10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">View All Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
