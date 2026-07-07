'use client';

import { FadeUp, MaskText } from '@/components/animations';

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <MaskText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                Technologies & Skills
              </h2>
            </MaskText>
            <FadeUp delay={0.2} className="flex justify-center">
              <div className="w-12 h-1 bg-accent rounded-full mt-4" />
            </FadeUp>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden divide-y divide-white/10">
            {skills.map((group, idx) => (
              <FadeUp key={group.category} delay={idx * 0.04}>
                <div className="group flex flex-col md:flex-row md:items-start gap-3 md:gap-8 px-4 py-5 sm:px-6 sm:py-7 md:px-10 md:py-8 hover:bg-white/[0.03] transition-colors duration-300">
                  <div className="md:w-52 shrink-0 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-display font-bold text-brand uppercase tracking-wide">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1 md:pt-0.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-xs sm:text-sm text-white/80 bg-white/[0.06] border border-white/10 rounded-full hover:border-brand/40 hover:text-white hover:bg-brand/10 transition-colors duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
