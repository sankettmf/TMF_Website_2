import React from 'react';
import { businessConfig, publicAsset } from '../data/config';
import { merchProducts } from '../data/merchData';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-[#E8E4DC] text-[#635F56] pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-[#E8E4DC]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center shrink-0">
                <img
                  src={publicAsset('assets/aistudio/TMF_Athletic_Logo_56acf51b.png')}
                  alt="The Merch Foundry Logo"
                  className="w-16 md:w-20 h-auto object-contain filter drop-shadow-sm"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-[#141414] leading-none">
                  {businessConfig.shopName}
                </h3>
                <span className="text-[11px] text-[#E5382C] font-bold tracking-widest uppercase mt-0.5 block">
                  {businessConfig.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#736E65] max-w-sm leading-relaxed">
              Custom apparel and merchandise printing in Nashik, using DTF and sublimation transfer. We serve creators, colleges, brands, and corporate companies, from single pieces to bulk orders.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={businessConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center hover:border-[#E1306C] hover:shadow-[0_4px_16px_rgba(225,48,108,0.22)] transition-all shadow-sm group"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[16px] h-[16px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="footerIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
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
                  <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" fill="none" stroke="url(#footerIgGrad)" strokeWidth="2.2" />
                  <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#footerIgGrad)" strokeWidth="2.2" />
                  <circle cx="17.5" cy="6.5" r="1.4" fill="url(#footerIgGrad)" />
                </svg>
              </a>
              <a
                href={businessConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center hover:border-[#1877F2] hover:shadow-[0_4px_16px_rgba(24,119,242,0.22)] transition-all shadow-sm group"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[16px] h-[16px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                  aria-hidden="true"
                >
                  <path
                    fill="#1877F2"
                    d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h5.125v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.322h3.328l-.532 3.47h-2.796V24H19c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5z"
                  />
                </svg>
              </a>
              <a
                href={businessConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center hover:border-[#0A66C2] hover:shadow-[0_4px_16px_rgba(10,102,194,0.22)] transition-all shadow-sm group"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[16px] h-[16px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
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
                className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center hover:border-[#4285F4] hover:shadow-[0_4px_14px_rgba(66,133,244,0.2)] transition-all shadow-sm group"
                aria-label="Location Map"
              >
                <svg
                  viewBox="0 0 92.3 132.3"
                  className="w-[16px] h-[16px] filter grayscale opacity-75 group-hover:filter-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                  aria-hidden="true"
                >
                  <path fill="#1A73E8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z" />
                  <path fill="#EA4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z" />
                  <path fill="#4285F4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3" />
                  <path fill="#FBBC04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3" />
                  <path fill="#34A853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#141414] tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#hero" className="footer-nav-link">Home Atelier</a></li>
              <li><a href="#products" className="footer-nav-link">Print Catalog</a></li>
              <li><a href="#customizer" className="footer-nav-link">Studio Customizer</a></li>
              <li><a href="#how-it-works" className="footer-nav-link">Craft Process</a></li>
              <li><a href="#gallery" className="footer-nav-link">Recent Lookbook</a></li>
              <li><a href="#bulk-orders" className="footer-nav-link">Bulk Orders</a></li>
              <li><a href="#faq" className="footer-nav-link">FAQ</a></li>
            </ul>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#141414] tracking-widest uppercase">
              Our Products
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {merchProducts.map((p) => {
                const footerLabels: Record<string, string> = {
                  't-shirts': 'T-Shirts',
                  caps: 'Caps',
                  mugs: 'Mugs',
                  bottles: 'Bottles',
                  'mouse-pads': 'Mouse Pads',
                  trophies: 'Trophies & Plaques',
                };
                return (
                  <li key={p.id}>
                    <a href="#products" className="footer-nav-link whitespace-nowrap">
                      {footerLabels[p.id] ?? p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Workshop Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#141414] tracking-widest uppercase">
              Workshop Location
            </h4>
            <p className="text-xs text-[#736E65] leading-relaxed">
              {businessConfig.address.full}
            </p>
            <div className="pt-2 text-xs space-y-1.5 font-medium">
              <p className="flex items-center gap-2 text-[#141414] font-semibold">
                <Phone size={13} className="text-[#E5382C]" />
                <span>{businessConfig.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2 text-[#635F56]">
                <Mail size={13} className="text-[#E5382C]" />
                <span>{businessConfig.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C867A] gap-4 font-medium">
          <p>© 2026 The Merch Foundry. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with pride in Nashik, Maharashtra</span>
            <span className="text-[#E5382C]">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
