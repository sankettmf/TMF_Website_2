import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/merchData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-14 lg:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-[#E5382C] uppercase tracking-widest">
            COMMUNITY ENDORSEMENTS · VERIFIED ORDERS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-display tracking-tight">
            WHAT OUR CLIENTS <span className="text-[#E5382C]">SAY</span>
          </h2>
          <p className="text-sm sm:text-base text-[#635F56] leading-relaxed">
            From university campus fest conveners to local specialty cafes and independent bands across Maharashtra.
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="relative bg-white border border-[#E8E4DC] rounded-2xl p-6 sm:p-8 shadow-atelier transition-all duration-300"
        >
          <Quote className="w-12 h-12 text-[#E5382C]/10 absolute top-6 right-6 pointer-events-none" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={17} className="fill-[#E5382C] text-[#E5382C]" />
            ))}
          </div>

          {/* Review text */}
          <p className="text-base sm:text-xl text-[#141414] font-medium leading-relaxed italic mb-6">
            "{current.review}"
          </p>

          {/* Author info */}
          <div className="flex items-center justify-between pt-5 border-t border-[#F0ECE4]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FAF6ED] text-[#E5382C] border border-[#EBE3D3] font-black text-sm flex items-center justify-center font-display">
                {current.avatarText}
              </div>
              <div>
                <h4 className="text-base font-bold text-[#141414]">
                  {current.name}
                </h4>
                <p className="text-xs text-[#736E65]">
                  {current.role}
                </p>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#F3EFE9] text-[#141414] transition-colors border border-[#E8E4DC]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#F3EFE9] text-[#141414] transition-colors border border-[#E8E4DC]"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#E5382C]'
                    : 'w-2 h-2 bg-[#DCD6CA]'
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
