import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ProductsSection } from './components/ProductsSection';
import { TShirtCustomizer } from './components/TShirtCustomizer';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { BulkOrdersSection } from './components/BulkOrdersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const scrollToHashSection = () => {
      const rawHash = window.location.hash;
      if (!rawHash) return;
      const targetId = rawHash.replace(/^#\/?/, '');
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToHashSection();
    window.addEventListener('hashchange', scrollToHashSection);
    return () => window.removeEventListener('hashchange', scrollToHashSection);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#141414] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E5382C] selection:text-white relative">

      {/* Full-Website Merch Factory Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8fafc]" aria-hidden="true">
        {/* Full-Page Aurora Multi-Orb Drift */}
        <div className="mf-aurora-full">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        {/* Full-Page Dot-Matrix Grid Overlay */}
        <div className="mf-grid-bg-full"></div>
      </div>

      {/* Initial Ink Fill Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Sticky Navbar with Vermilion Scroll Progress Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 1. Hero with 3D T-Shirt Daylight Studio Slideshow */}
        <Hero />

        {/* 2. Bold Vermilion Marquee Strip */}
        <MarqueeStrip />

        {/* 3. Products & Services Atelier Catalog */}
        <ProductsSection />

        {/* 4. Interactive Studio Customizer Designer */}
        <TShirtCustomizer />

        {/* 5. How It Works (4 Quality Milestones) */}
        <HowItWorks />

        {/* 6. The Foundry Standard (Why Choose Us) */}
        <WhyChooseUs />

        {/* 7. Gallery / Lookbook Portfolio with Lightbox */}
        <GallerySection />

        {/* 8. Bulk & Institutional Orders Form */}
        <BulkOrdersSection />

        {/* 9. Client & Campus Fest Testimonials */}
        <TestimonialsSection />

        {/* 11. Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* 12. Atelier Workshop, Hours & Google Map */}
        <ContactSection />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
