import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ExperienceSection } from '@/components/experience-section';
import { ServicesSection } from '@/components/services-section';
import { SkillsSection } from '@/components/skills-section';
import { CertificationsSection } from '@/components/certifications-section';
import { LanguagesSection } from '@/components/languages-section';
import { FooterSection } from '@/components/footer-section';
import portfolioData from '@/data/portfolio.json';

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* <Navigation name={portfolioData.name} /> */}
      <HeroSection
        name={portfolioData.name}
        title={portfolioData.title}
        heroHeadline={portfolioData.heroHeadline}
        tagline={portfolioData.tagline}
        stats={portfolioData.stats}
        whatsapp={portfolioData.ctaWhatsApp}
        scheduleCallUrl={portfolioData.scheduleCallUrl}
      />
      <AboutSection
        name={portfolioData.name}
        about={portfolioData.about}
        aboutHeadline={portfolioData.aboutHeadline}
      />
      <ExperienceSection experience={portfolioData.experience} />
      <ServicesSection services={portfolioData.services} />
      <SkillsSection skills={portfolioData.skills} />
      <CertificationsSection
        certifications={portfolioData.certifications}
        education={portfolioData.education}
      />
      <LanguagesSection languages={portfolioData.languages} />
      <FooterSection
        contact={portfolioData.contact}
        name={portfolioData.name}
        contactHeadline={portfolioData.contactHeadline}
        contactDescription={portfolioData.contactDescription}
        scheduleCallUrl={portfolioData.scheduleCallUrl}
      />
    </main>
  );
}
