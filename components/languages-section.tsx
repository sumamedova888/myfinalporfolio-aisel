'use client';

import { FadeUp, MaskText, StaggerContainer } from '@/components/animations';

interface Language {
  language: string;
  level: string;
  flag: string;
}

interface LanguagesSectionProps {
  languages: Language[];
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <MaskText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                Languages
              </h2>
            </MaskText>
            <FadeUp delay={0.2} className="flex justify-center">
              <div className="w-12 h-1 bg-accent rounded-full mt-4" />
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <FadeUp key={lang.language} delay={0}>
                <div className="p-6 md:p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:border-accent/35 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl" role="img" aria-label={lang.language}>
                      {lang.flag}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white">
                      {lang.language}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-white/60">
                    {lang.level}
                  </p>
                </div>
              </FadeUp>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
