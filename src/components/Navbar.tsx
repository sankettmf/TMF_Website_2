import React, { useState, useEffect } from 'react';
import { businessConfig, getWhatsAppLink, publicAsset } from '../data/config';
import { Menu, X, MessageSquare, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Catalog', href: '#products' },
    { label: 'Studio Customizer', href: '#customizer' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Lookbook', href: '#gallery' },
    { label: 'Bulk Orders', href: '#bulk-orders' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar in Signature Vermilion Red */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#E5382C] z-[100] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navigation Bar: Normal Document Flow */}
      <header className="relative z-20 w-full bg-transparent py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6">
          {/* Zone 1: Single Brand Wordmark with Logo */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={publicAsset('assets/aistudio/TMF_Athletic_Logo_56acf51b.png')}
                alt="The Merch Foundry Logo"
                width={68}
                height={15}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallbackApplied === '1') return;
                  img.dataset.fallbackApplied = '1';
                  img.src = publicAsset('logo.png');
                }}
                className="w-[68px] h-[15px] -mt-[2px] object-contain filter drop-shadow-sm pointer-events-auto"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base md:text-[17px] font-extrabold tracking-tight text-[#141414] leading-none">
                {businessConfig.shopName}
              </span>
              <span className="text-[10px] text-[#736E65] tracking-widest uppercase font-semibold mt-0.5 ml-[2px] leading-none">
                {businessConfig.tagline}
              </span>
            </div>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13px] xl:text-sm font-semibold text-[#635F56]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#141414] transition-colors whitespace-nowrap shrink-0 relative py-0.5 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5382C] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#bulk-orders"
              className="no-shine hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#E5382C] hover:bg-[#CC2F24] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(229,56,44,0.25)] active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl bg-white border border-[#E8E4DC] text-[#141414] hover:border-[#E5382C] transition-colors shadow-sm"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full z-40 bg-[#f8fafc]/98 backdrop-blur-xl border-b border-[#E8E4DC] px-6 py-6 shadow-xl transition-all duration-300 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#635F56] hover:text-[#141414] py-2 flex items-center justify-between border-b border-[#EFEBE4]"
                >
                  <span>{link.label}</span>
                  <span className="text-[#E5382C] text-sm">→</span>
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={getWhatsAppLink('Hi The Merch Foundry, I would like to get a quote for custom merchandise.')}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E5382C] text-white font-bold text-sm shadow-md"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-center text-xs text-[#8C867A]">
                Workshop at Swami Park, Dhruv Nagar, Nashik
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
