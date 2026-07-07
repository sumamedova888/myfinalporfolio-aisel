'use client';

import Link from 'next/link';
import { Link2, Share2, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { FadeUp, MaskText, StaggerContainer } from '@/components/animations';

interface ContactInfo {
  email: string;
  whatsapp?: string;
  phone?: string;
  location: string;
  website: string;
  social: {
    linkedin?: string;
    instagram?: string;
    dribbble?: string;
  };
}

interface FooterSectionProps {
  contact: ContactInfo;
  name: string;
  contactHeadline?: string;
  contactDescription?: string;
  scheduleCallUrl?: string;
}

function socialHref(value: string, platform: 'linkedin' | 'instagram' | 'dribbble') {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const handle = value.replace('@', '');

  if (platform === 'linkedin') {
    return handle.includes('linkedin.com') ? `https://${handle}` : `https://www.linkedin.com/in/${handle}`;
  }
  if (platform === 'instagram') {
    return `https://www.instagram.com/${handle}`;
  }
  return `https://dribbble.com/${handle}`;
}

export function FooterSection({ contact, name, contactHeadline, contactDescription, scheduleCallUrl = 'https://calendly.com/aisunmamedova-info/30min' }: FooterSectionProps) {
  return (
    <footer id="contact" className="bg-[#050505] text-white relative overflow-hidden z-10 pt-16 sm:pt-24 md:pt-32">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,254,0.15),transparent_60%)] pointer-events-none" />

      <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-10 sm:space-y-14 md:space-y-16">
            <div className="space-y-4 sm:space-y-6 px-2">
              <MaskText>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-tight">
                  {contactHeadline
                    ? contactHeadline.split('. ').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <><br /></>}</span>
                      ))
                    : <>Let&apos;s Build Something That<br />Creates Real Business Impact.</>}
                </h2>
              </MaskText>
              <FadeUp delay={0.2}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mt-4 sm:mt-6 font-light leading-relaxed">
                  {contactDescription || "Whether you're scaling a company, improving marketing performance, implementing AI, or building smarter customer acquisition systems, I'd be happy to explore how I can contribute."}
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl sm:max-w-none sm:w-auto px-2 sm:px-0">
              <Link
                href={contact.whatsapp || `mailto:${contact.email}`}
                target={contact.whatsapp ? '_blank' : undefined}
                rel={contact.whatsapp ? 'noopener noreferrer' : undefined}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black rounded-full font-medium text-base sm:text-lg md:text-xl transition-all duration-500 overflow-hidden hover:scale-[1.02] sm:hover:scale-105"
              >
                <span className="relative z-10 text-center">Schedule a Conversation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-black/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </Link>
              <Link
                href={scheduleCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-transparent border border-white/20 text-white rounded-full font-medium text-base sm:text-lg md:text-xl transition-all duration-500 hover:bg-white/10"
              >
                <span className="relative z-10">Schedule a Call</span>
              </Link>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 w-full pt-10 sm:pt-14 md:pt-16 border-t border-white/10">
              <FadeUp delay={0} className="space-y-3 sm:space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                  Email me
                </span>
                <Link
                  href={`mailto:${contact.email}`}
                  className="text-base sm:text-lg font-medium hover:text-[#00f2fe] transition-colors break-all px-2"
                >
                  {contact.email}
                </Link>
              </FadeUp>

              <FadeUp delay={0.1} className="space-y-3 sm:space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                  WhatsApp
                </span>
                <Link
                  href={contact.whatsapp || `tel:${contact.phone}`}
                  target={contact.whatsapp ? '_blank' : undefined}
                  rel={contact.whatsapp ? 'noopener noreferrer' : undefined}
                  className="text-base sm:text-lg font-medium hover:text-[#00f2fe] transition-colors"
                >
                  {contact.whatsapp ? 'Message on WhatsApp' : contact.phone}
                </Link>
              </FadeUp>

              <FadeUp delay={0.2} className="space-y-3 sm:space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
                  Location
                </span>
                <p className="text-base sm:text-lg font-medium">{contact.location}</p>
              </FadeUp>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex-1 max-w-sm mx-auto md:mx-0">
              <p className="text-xs sm:text-sm text-white/60 font-light">
                AI Powered Growth Marketing Manager specializing in marketing systems, automation, CRM, customer acquisition, and digital transformation for ambitious organizations.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/40 order-3 md:order-2">
              &copy; {new Date().getFullYear()} {name}. All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-4 order-2 md:order-3">
              {contact.social.linkedin && (
                <Link
                  href={socialHref(contact.social.linkedin, 'linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Link2 className="w-4 h-4" />
                </Link>
              )}
              {contact.social.instagram && (
                <Link
                  href={socialHref(contact.social.instagram, 'instagram')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </Link>
              )}
              {contact.social.dribbble && (
                <Link
                  href={socialHref(contact.social.dribbble, 'dribbble')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Globe className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
