'use client';

import { FadeUp, MaskText, StaggerContainer } from '@/components/animations';

interface Certification {
  title: string;
  issuer: string;
  year: number | null;
  description?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  education: Array<{
    degree: string;
    major: string;
    institution: string;
    description: string;
  }>;
}

const cardClass =
  'p-5 sm:p-6 md:p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] hover:border-accent/35 hover:from-white/[0.09] hover:to-white/[0.03] transition-all duration-300';

export function CertificationsSection({ certifications, education }: CertificationsSectionProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#0a0a0a] relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <MaskText>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
                Education & Certifications
              </h2>
            </MaskText>
            <FadeUp delay={0.2} className="flex justify-center">
              <div className="w-12 h-1 bg-accent rounded-full mt-4" />
            </FadeUp>
          </div>

          <div className="space-y-14">
            {/* Education — full width */}
            <div className="space-y-6">
              <FadeUp delay={0.1}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                  Education
                </h3>
              </FadeUp>
              <StaggerContainer className="space-y-4">
                {education.map((edu, idx) => (
                  <FadeUp key={idx} delay={0}>
                    <div className={`${cardClass} md:p-10`}>
                      <div className="max-w-3xl space-y-3">
                        <h4 className="text-xl md:text-2xl font-display font-bold text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-base text-white/70">{edu.major}</p>
                        <p className="text-base text-brand font-semibold">{edu.institution}</p>
                        {edu.description && (
                          <p className="text-sm text-white/55 leading-relaxed pt-2">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </StaggerContainer>
            </div>

            {/* Certifications — balanced grid */}
            <div className="space-y-6">
              <FadeUp delay={0.15}>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                  Certifications
                </h3>
              </FadeUp>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, idx) => (
                  <FadeUp key={idx} delay={0}>
                    <div className={`${cardClass} h-full flex flex-col`}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-xs font-semibold text-brand bg-brand/15 border border-brand/30 px-2.5 py-1 rounded-full shrink-0">
                          {cert.year ?? 'Award'}
                        </span>
                      </div>
                      <h4 className="text-base md:text-lg font-display font-bold text-white leading-snug mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-brand font-semibold">{cert.issuer}</p>
                      {cert.description && (
                        <p className="text-xs text-white/50 mt-3 leading-relaxed flex-1">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </FadeUp>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
