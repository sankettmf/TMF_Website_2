import React from 'react';
import { businessConfig, getWhatsAppLink } from '../data/config';
import { FoundryMap } from './FoundryMap';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Instagram, Facebook } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-14 lg:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-[#E5382C] uppercase tracking-widest">
            WORKSHOP · DHURV NAGAR, NASHIK
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-display tracking-tight">
            VISIT OUR <span className="text-[#E5382C]">ATELIER</span>
          </h2>
          <p className="text-sm sm:text-base text-[#635F56] leading-relaxed">
            Drop by our workshop in Dhruv Nagar, Nashik to feel fabric swatches, inspect real print samples, or discuss bulk merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white border border-[#E8E4DC] rounded-2xl p-6 flex flex-col shadow-atelier">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#E5382C] tracking-widest uppercase">
                  THE WORKSHOP
                </span>
                <h3 className="text-2xl font-bold font-display text-[#141414] mt-0.5">
                  {businessConfig.shopName}
                </h3>
                <p className="text-xs text-[#736E65] mt-0.5 font-medium">{businessConfig.tagline}</p>
              </div>

              {/* Info Items */}
              <div className="space-y-4 pt-1">
                {/* Address */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] text-[#E5382C] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#736E65] uppercase tracking-wider leading-tight">Address</h4>
                    <p className="text-sm font-semibold text-[#141414] mt-0.5 leading-snug">
                      {businessConfig.address.line1}, {businessConfig.address.landmark}, {businessConfig.address.area}, {businessConfig.address.city}, {businessConfig.address.state} - {businessConfig.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] text-[#E5382C] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#736E65] uppercase tracking-wider leading-tight">Call & WhatsApp</h4>
                    <a
                      href={`tel:+${businessConfig.phoneRaw}`}
                      className="text-sm font-bold text-[#141414] hover:text-[#E5382C] transition-colors block mt-0.5 leading-snug"
                    >
                      {businessConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] text-[#E5382C] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#736E65] uppercase tracking-wider leading-tight">Email Enquiries</h4>
                    <a
                      href={`mailto:${businessConfig.email}`}
                      className="text-sm font-semibold text-[#141414] hover:text-[#E5382C] transition-colors block mt-0.5 leading-snug"
                    >
                      {businessConfig.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF6ED] border border-[#EBE3D3] text-[#E5382C] flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#736E65] uppercase tracking-wider leading-tight">Hours</h4>
                    <p className="text-sm text-[#141414] font-semibold mt-0.5 leading-snug">
                      {businessConfig.workingHours.days} : <span className="text-[#E5382C]">{businessConfig.workingHours.time}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Buttons */}
            <div className="mt-5 pt-4 border-t border-[#F0ECE4]">
              <a
                href={getWhatsAppLink('Hi The Merch Foundry, I would like to visit your workshop or discuss an order.')}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#E5382C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#CC2F24] transition-all shadow-sm"
              >
                <MessageSquare size={16} />
                <span>Message on WhatsApp</span>
              </a>

              {/* Social Links */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href={businessConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#E8E4DC] hover:bg-white hover:border-[#E1306C] hover:shadow-[0_4px_16px_rgba(225,48,108,0.22)] transition-all shadow-sm flex items-center justify-center group"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[17px] h-[17px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="contactIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#405DE6" />
                        <stop offset="15%" stopColor="#5851DB" />
                        <stop offset="30%" stopColor="#833AB4" />
                        <stop offset="45%" stopColor="#C13584" />
                        <stop offset="60%" stopColor="#E1306C" />
                        <stop offset="75%" stopColor="#FD1D1D" />
                        <stop offset="90%" stopColor="#F56040" />
                        <stop offset="100%" stopColor="#FCAF45" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" fill="none" stroke="url(#contactIgGrad)" strokeWidth="2.2" />
                    <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#contactIgGrad)" strokeWidth="2.2" />
                    <circle cx="17.5" cy="6.5" r="1.4" fill="url(#contactIgGrad)" />
                  </svg>
                </a>
                <a
                  href={businessConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#E8E4DC] hover:bg-white hover:border-[#1877F2] hover:shadow-[0_4px_16px_rgba(24,119,242,0.22)] transition-all shadow-sm flex items-center justify-center group"
                  aria-label="Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[17px] h-[17px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>
                <a
                  href={businessConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#E8E4DC] hover:bg-white hover:border-[#0A66C2] hover:shadow-[0_4px_16px_rgba(10,102,194,0.22)] transition-all shadow-sm flex items-center justify-center group"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[17px] h-[17px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <path
                      fill="#0A66C2"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
                <a
                  href={businessConfig.socials.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#E8E4DC] hover:bg-white hover:border-[#4285F4] hover:shadow-[0_4px_14px_rgba(66,133,244,0.2)] transition-all shadow-sm flex items-center justify-center group"
                  aria-label="Google Maps"
                >
                  <svg
                    viewBox="0 0 92.3 132.3"
                    className="w-[17px] h-[17px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    aria-hidden="true"
                  >
                    {/* Deep Blue Base */}
                    <path fill="#1A73E8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z" />
                    {/* Google Red */}
                    <path fill="#EA4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z" />
                    {/* Google Light Blue */}
                    <path fill="#4285F4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3" />
                    {/* Google Yellow */}
                    <path fill="#FBBC04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3" />
                    {/* Google Green */}
                    <path fill="#34A853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden shadow-atelier min-h-[340px] lg:min-h-[380px] flex flex-col">
            <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#E8E4DC] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#141414] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E5382C]" />
                <span>TMF, Nashik!</span>
              </div>
              <a
                href={businessConfig.socials.maps}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#E5382C] hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="w-full flex-1 min-h-[290px] lg:min-h-[330px] relative bg-[#F5F3EF]">
              <FoundryMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
