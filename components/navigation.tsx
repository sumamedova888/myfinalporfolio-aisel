'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  name: string;
}

export function Navigation({ name }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div 
          className={`w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-20' : 'h-28'
          }`}
        >
          {/* Logo - Top Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-xl font-display font-medium text-white tracking-tight hover:text-white/80 transition-colors"
            >
              {name.split(' ')[0]}
            </Link>
          </div>

          {/* Desktop Navigation - Top Right */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 rounded-full text-[14px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Let's Talk Button */}
            <Link
              href="#contact"
              className="ml-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[14px] font-medium hover:-translate-y-[1px] transition-all duration-300"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button - Top Right */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-3xl flex flex-col px-6 py-6"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center w-full h-14">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-medium text-white tracking-tight"
              >
                {name.split(' ')[0]}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-display font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + navItems.length * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-lg font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
