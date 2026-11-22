/**
 * Business Configuration for THE MERCH FOUNDRY
 * Easily edit contact numbers, addresses, social handles, and business hours here.
 */

export interface BusinessConfig {
  shopName: string;
  tagline: string;
  shortDesc: string;
  phoneDisplay: string;
  phoneRaw: string; // international format without spaces for tel: and wa.me
  whatsappNumber: string;
  email: string;
  address: {
    line1: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    full: string;
  };
  workingHours: {
    days: string;
    time: string;
    sunday?: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    facebook?: string;
    whatsapp: string;
    maps: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string;
  mobileMapEmbedUrl: string;
}

export const businessConfig: BusinessConfig = {
  shopName: 'THE MERCH FOUNDRY',
  tagline: 'Where merch is crafted',
  shortDesc: 'Custom T-shirts, caps, mugs, bottles & corporate merchandise printed with master craftsmanship in Nashik.',
  phoneDisplay: '+91 94230 75173',
  phoneRaw: '919423075173',
  whatsappNumber: '919423075173',
  email: 'craft.themerchfoundry@gmail.com',
  address: {
    line1: 'Swami Park',
    landmark: 'Near Munde Water Tank',
    area: 'Dhruv Nagar',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422222',
    country: 'India',
    full: 'Swami Park, Near Munde Water Tank, Dhruv Nagar, Nashik, Maharashtra - 422222'
  },
  workingHours: {
    days: 'Monday – Sunday',
    time: '10:00 AM – 7.00 PM'
  },
  socials: {
    instagram: 'https://instagram.com/themerchfoundry',
    linkedin: 'https://www.linkedin.com/company/the-merch-foundry/',
    whatsapp: 'https://wa.me/919423075173?text=Hello%20The%20Merch%20Foundry%2C%20I%20would%20like%20to%20enquire%20about%20custom%20merchandise.',
    maps: 'https://www.google.com/maps/place/The+Merch+Foundry/@20.0112394,73.7138725,17z/data=!3m1!4b1!4m6!3m5!1s0x3bddedea46bc99d1:0xdd79c79cd35b7c6!8m2!3d20.0112344!4d73.7164528!16s%2Fg%2F11p2gbpkn2?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D'
  },
  coordinates: {
    lat: 20.0112344,
    lng: 73.7164528
  },
  // Embedded Google Map centered on The Merch Foundry, Dhruv Nagar, Nashik with red pin marker
  mapEmbedUrl: 'https://maps.google.com/maps?q=The+Merch+Foundry,+Nashik&t=&z=16&ie=UTF8&iwloc=&output=embed',
  // Mobile neighborhood-level Google Map framing (Gangapur, Sadhana, Someshwar, DMart Anandvalli, Satpur, Shramik Nagar)
  mobileMapEmbedUrl: 'https://maps.google.com/maps?q=The+Merch+Foundry,+Nashik&t=&z=13&ie=UTF8&iwloc=&output=embed'
};

/**
 * Helper to resolve files in public/ cleanly across custom domains and subpath deployments
 */
export const publicAsset = (relativePath: string): string => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const cleanPath = relativePath.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
};

/**
 * Helper to build custom WhatsApp enquiry links
 */
export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
