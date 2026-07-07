'use client';

import { FadeUp, MaskText, StaggerContainer } from '@/components/animations';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#0a0a0a] relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-4">
            <MaskText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                How I Can Help
              </h2>
            </MaskText>
            <FadeUp delay={0.2}>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </FadeUp>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <FadeUp key={idx} delay={0}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-5 sm:p-6 md:p-8 h-full rounded-[20px] sm:rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:border-accent/35 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute top-6 right-6 text-6xl font-display font-bold text-white/[0.04] group-hover:text-accent/15 transition-colors duration-500 pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white group-hover:text-brand transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
