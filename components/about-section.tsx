'use client';

import Image from 'next/image';
import { FadeUp, MaskText, ImageReveal } from '@/components/animations';

interface AboutSectionProps {
  name: string;
  about: string;
  aboutHeadline?: string;
}

export function AboutSection({ name, about, aboutHeadline }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <MaskText>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
                  {aboutHeadline
                    ? aboutHeadline.replace('. I ', '.\nI ').split('\n').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))
                    : <>More Than Marketing.<br />I Build Business Growth Systems.</>}
                </h2>
              </MaskText>
              <FadeUp delay={0.2}>
                <div className="w-12 h-1 bg-brand rounded-full mt-4" />
              </FadeUp>
            </div>

            <div className="space-y-4 text-white/65 leading-relaxed">
              {about.split('\n\n').map((paragraph, idx) => (
                <FadeUp key={idx} delay={0.3 + idx * 0.1}>
                  <p className="text-sm sm:text-base md:text-lg">
                    {paragraph}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={0.2} className="relative order-1 md:order-2 max-w-md mx-auto md:max-w-none w-full">
            <ImageReveal>
              <div className="relative w-full aspect-[4/5] max-h-[480px] sm:max-h-none rounded-2xl overflow-hidden bg-gradient-to-br from-brand/20 to-brand/5 border border-white/10 shadow-2xl">
                <Image
                  src="/aisunpp.jpg"
                  alt={name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 90vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </ImageReveal>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
