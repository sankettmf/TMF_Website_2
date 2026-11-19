/**
 * Data store for THE MERCH FOUNDRY
 * All products, 3D showcase slides, testimonials, FAQs, and gallery items.
 */

import refCapPrintingImg from '../assets/images/ref_cap_printing_1792144777190.jpg';
import refMugPrintingImg from '../assets/images/ref_mug_printing_1792144778250.jpg';
import refBottlePrintingImg from '../assets/images/ref_bottle_printing_1792144778432.jpg';
import refMousepadPrintingImg from '../assets/images/ref_mousepad_printing_1792144779611.jpg';
import refTrophyPrintingImg from '../assets/images/ref_trophy_printing_1792144780032.jpg';

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  popular?: boolean;
  minOrder: string;
  methods: string[];
  description: string;
  badge?: string;
  features: string[];
  imagePlaceholder: string;
}

export interface ShirtSlide {
  id: string;
  name: string;
  tagline: string;
  shirtColor: string;
  textColor: string;
  artStyle: string;
  designType: 'cyber-panther' | 'free-your-mind' | 'never-look-back' | 'foundry-heritage' | 'vintage-navy';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'T-Shirts' | 'Caps' | 'Mugs' | 'Bottles' | 'Others';
  method: string;
  imageUrl: string;
  client: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  review: string;
  rating: number;
  avatarText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const merchProducts: ProductItem[] = [
  {
    id: 't-shirts',
    name: 'T-Shirt Printing',
    tagline: 'Oversized, Polo, Round Neck & Activewear',
    startingPrice: 290,
    popular: true,
    minOrder: '1 Piece',
    methods: ['Direct-to-Film (DTF)', 'Sublimation'],
    description: 'Our primary specialty: Vibrant, high-detail custom apparel printing using two techniques, so we can match the right method to your fabric and design.',
    badge: '★ PRIMARY PRODUCT',
    features: [
      'Premium 180–240 GSM Combed Cotton',
      'Ultra HD Direct-to-Film (DTF) Color Output',
      'Zero Minimum Order – Single to Bulk Runs',
      'Bio-washed, Preshrunk & Anti-Pill Fabric'
    ],
    imagePlaceholder: '/assets/aistudio/download__10__18ea2989.jpg'
  },
  {
    id: 'caps',
    name: 'Cap Printing',
    tagline: 'Snapbacks, Baseball Caps & Structured Twill',
    startingPrice: 189,
    popular: false,
    minOrder: '1 Piece',
    methods: ['Direct-to-Film (DTF)', 'Sublimation'],
    description: 'Structured baseball caps, trucker mesh caps, and snapbacks with vivid front panel & visor custom prints for brand merch, sports teams, and events.',
    badge: 'POPULAR',
    features: [
      'Heavyweight Structured Cotton Twill',
      'Curved & Flat Visor Profile Options',
      'High-precision Front Panel Sublimation Printing',
      'Adjustable Snapback & Brass Buckle Closures'
    ],
    imagePlaceholder: refCapPrintingImg
  },
  {
    id: 'mugs',
    name: 'Mug Printing',
    tagline: 'Ceramic Photo Mugs, Magic Mugs & Dual-Tone',
    startingPrice: 249,
    popular: false,
    minOrder: '1 Piece',
    methods: ['HD Sublimation', 'DTF Heat Transfer'],
    description: 'Grade-A 330ml glossy white ceramic mugs, colour inside mugs, and heat-sensitive magic mugs printed with razor-sharp 360-degree photo wrap designs.',
    badge: 'GIFTING FAVORITE',
    features: [
      'Premium 330ml / 11oz Food-Grade Ceramic',
      '100% Microwave & Dishwasher Safe',
      'Vibrant Edge-to-Edge 300+ DPI Photo Wrap',
      'Color-Lock Scratch-Resistant Glaze'
    ],
    imagePlaceholder: refMugPrintingImg
  },
  {
    id: 'bottles',
    name: 'Bottle Printing',
    tagline: 'Personalized Aluminum & Stainless Steel Sippers',
    startingPrice: 349,
    popular: false,
    minOrder: '1 Piece',
    methods: ['Sublimation', 'UV Rotary DTF'],
    description: 'Custom-printed sports sippers, insulated flasks, and gym bottles with your graphics, corporate logos, or names. Available in a range of sizes, so you can choose what suits you.',
    badge: 'TRENDING',
    features: [
      'Stainless steel and aluminum bottle options',
      'Wraparound printing for full-height designs',
      'Durable, protective exterior finish',
      'Custom names, logos, and bulk corporate orders'
    ],
    imagePlaceholder: refBottlePrintingImg
  },
  {
    id: 'mouse-pads',
    name: 'Mouse Pad Printing',
    tagline: 'Standard Ergonomic & Extended XXL Desk Mats',
    startingPrice: 199,
    popular: false,
    minOrder: '1 Piece',
    methods: ['HD Dye-Sublimation', 'DTF Transfer'],
    description: 'High-precision micro-woven gaming mousepads and extended desk mats customized with vibrant full-bleed artwork, company logos, and desk aesthetics.',
    badge: 'HOT WORKSPACE',
    features: [
      'Micro-textured Speed & Control Cloth Surface',
      'Anti-slip Textured Natural Rubber Base',
      'Precision Anti-Fray Stitched Edge Seams',
      'Washable & Fade-Resistant HD Printing'
    ],
    imagePlaceholder: refMousepadPrintingImg
  },
  {
    id: 'trophies',
    name: 'Trophy & Decorative Plate Printing',
    tagline: 'Custom Printed Trophies & Plates',
    startingPrice: 449,
    popular: false,
    minOrder: '1 Piece',
    methods: ['Sublimation Transfer'],
    description: 'Personalized trophies and decorative display plates for corporate awards, events, achievements, and special occasions. Add your logo, names, text, or artwork in full color.',
    badge: 'CORPORATE',
    features: [
      'Custom trophy printing with names, logos, and event details',
      'Printed decorative and commemorative display plates',
      'Suitable for corporate awards, school and sports events, and gifting',
      'Bulk orders only'
    ],
    imagePlaceholder: refTrophyPrintingImg
  }
];

export const shirtSlides: ShirtSlide[] = [
  {
    id: 'cyber-panther',
    name: 'Cyber Panther Streetwear',
    tagline: 'Futuristic Mecha Graphic & Kanji Accents',
    shirtColor: '#B6D926', // Vibrant Neon Lime (model-598)
    textColor: '#151515',
    artStyle: 'Neo-Tokyo Streetwear',
    designType: 'cyber-panther'
  },
  {
    id: 'free-your-mind',
    name: 'Free Your Mind Retro',
    tagline: '70s Psychedelic Sun & Meditating Silhouettes',
    shirtColor: '#17B8A6', // Turquoise Teal (model-596)
    textColor: '#FFFFFF',
    artStyle: 'Retro Screenprint',
    designType: 'free-your-mind'
  },
  {
    id: 'never-look-back',
    name: 'Never Look Back Streetwear',
    tagline: 'Fire Typography, Skate Skull & Ink Splatter',
    shirtColor: '#F5F5F3', // Crisp White (3D.jpg)
    textColor: '#0D0D0D',
    artStyle: 'Gothic Skate Streetwear',
    designType: 'never-look-back'
  },
  {
    id: 'foundry-heritage',
    name: 'The Merch Foundry Original',
    tagline: 'Vintage Screen Press & Molten Ladle Emblem',
    shirtColor: '#121212', // Deep Pitch Black
    textColor: '#F3E9D2',
    artStyle: 'Heritage Foundry',
    designType: 'foundry-heritage'
  },
  {
    id: 'vintage-navy',
    name: 'Foundry Athletic Club',
    tagline: 'Heavy Distressed College Stencil in Coral & Cream',
    shirtColor: '#1A2942', // Classic Deep Navy
    textColor: '#F2584E',
    artStyle: 'Vintage College',
    designType: 'vintage-navy'
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Share Your Idea',
    desc: 'Send your vector art, logo, rough sketch, or photo via WhatsApp or our design form. Need art? Our in-house artists will draft it for free.',
    tag: 'Quick Consult'
  },
  {
    step: '02',
    title: 'Design Approval',
    desc: 'Before printing starts, we share a design preview showing the artwork, colors, placement, and print size. Once you approve it, we begin production.',
    tag: 'YOUR APPROVAL'
  },
  {
    step: '03',
    title: 'Careful Printing',
    desc: 'We print your order using DTF or sublimation, whichever suits your product. Every piece is heat-pressed and quality-checked before it moves to delivery.',
    tag: 'PRODUCTION'
  },
  {
    step: '04',
    title: 'Pickup / Express Delivery',
    desc: 'Pick up directly from our workshop at Swami Park, Dhruv Nagar, or receive doorstep tracked delivery anywhere in Nashik & across India.',
    tag: 'Ready to Wear'
  }
];

export const whyChooseUsCards = [
  {
    icon: 'ShieldCheck',
    title: 'Wash-Proof Inks',
    desc: 'Formulated with curing accelerators that survive 25+ wash cycles without fading, flaking, or hairline cracking.'
  },
  {
    icon: 'Sparkles',
    title: 'Cotton & Polyester Garments',
    desc: 'Comfortable, good-quality garments in cotton and polyester, matched to the print method for the best result.'
  },
  {
    icon: 'PackageCheck',
    title: 'Low Minimum Orders',
    desc: 'From a single custom personalized birthday gift to 10,000 corporate uniforms, we treat every order with pride.'
  },
  {
    icon: 'Zap',
    title: 'Lightning 24h-48h Turnaround',
    desc: 'Express rush printing available for last-minute college festivals, marathons, startup launches, and celebrations.'
  },
  {
    icon: 'BadgePercent',
    title: 'Tiered Bulk Savings',
    desc: 'Unbeatable wholesale rates for colleges, cafes, fitness gyms, tech events, and merchandise resellers.'
  },
  {
    icon: 'Palette',
    title: 'Help With Your Artwork',
    desc: 'Not sure if your design is print-ready? Share it on WhatsApp and we’ll check the quality, size, and placement.'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Hoops & Panels Oversized Streetwear Tee',
    category: 'T-Shirts',
    method: 'Manga Comic Series — High-Density DTF Print',
    imageUrl: '/assets/aistudio/download__9__87015125.jpg',
    client: 'Anime Streetwear'
  },
  {
    id: 'g2',
    title: 'Custom Football Jersey Sipper Bottles',
    category: 'Bottles',
    method: 'Name & Number Customization — Full-Height Rotary Sublimation Print',
    imageUrl: '/assets/aistudio/Customised_aluminium_bottles_You_can_get_anything_printed_Capacity_600_ml_Material_aluminum_Buy_1_for_260_plus_shipping_Customisation_includes_pic_cartoon_character_and_name_9a62b99c.jpg',
    client: 'Personalized Sports'
  },
  {
    id: 'g3',
    title: 'One Piece Luffy Vintage Washed Cap',
    category: 'Caps',
    method: 'Anime Character Series — Precision Front Panel DTF Transfer',
    imageUrl: '/assets/aistudio/One_Piece_Cap_Cotton_Washed_Cap_Luffy_Zoro_Cartoon_Anime_Figure_Hats_Men_Women_Casual_Trend_d1734e6d.jpg',
    client: 'Anime & Streetwear'
  },
  {
    id: 'g4',
    title: "Toji 'Discipline' Oversized Tee",
    category: 'T-Shirts',
    method: 'PAIN TODAY, POWER TOMORROW — Ultra HD Direct-to-Film (DTF) Print',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_11.39.11_AM_cc2d05b7.jpeg',
    client: 'Anime Streetwear'
  },
  {
    id: 'g5',
    title: 'Marvel Comics Retro Dual-Tone Mug',
    category: 'Mugs',
    method: 'Black Inner & Handle — High-Gloss 360° Sublimation Print',
    imageUrl: '/assets/aistudio/b834e02b0c643dae1f846eb3aa535fba_c54cf89b.jpg',
    client: 'Pop Culture & Collectibles'
  },
  {
    id: 'g6',
    title: "I'll Make Money Custom Mouse Pad",
    category: 'Others',
    method: 'Hustle Edition — HD Full-Bleed Dye Sublimation Print',
    imageUrl: '/assets/aistudio/Amazing___mouse_pad_3d807756.jpg',
    client: 'Gaming & Workspace'
  },
  {
    id: 'g7',
    title: 'Custom Crystal Service Award',
    category: 'Others',
    method: 'Employee Recognition Series — Direct UV Flatbed & Foil Accent',
    imageUrl: '/assets/aistudio/download__8__de0760bc.jpg',
    client: 'Corporate & Awards'
  },
  {
    id: 'g8',
    title: 'Mahadev Serenity Premium Cotton Tee',
    category: 'T-Shirts',
    method: 'Spiritual Art Series — Vibrant DTF & Sublimation Print',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_11.39.11_AM__1__259fb5be.jpeg',
    client: 'Divine & Cultural'
  }
];

export const statsCounters = [
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 50000, suffix: '+', label: 'Products Printed' },
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 12000, suffix: '+', label: 'Custom Designs Crafted' }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Siddharth Deshmukh',
    role: 'Convener',
    organization: 'Sandip University Youth Fest',
    review: 'We ordered 83 custom oversized tees for our tech symposium. The Merch Foundry delivered 2 days ahead of schedule. The screen-print sharpness and fabric feel were the best we’ve had in 2 years!',
    rating: 5,
    avatarText: 'SD'
  },
  {
    id: 't2',
    name: 'Pooja Kulkarni',
    role: 'Founder',
    organization: 'Roast & Roast Cafe, Gangapur Rd',
    review: 'Our staff polo t-shirts and branded coffee mugs look ultra professional. Even after 40 commercial kitchen machine washes, the embroidery and ceramic prints remain pristine.',
    rating: 5,
    avatarText: 'PK'
  },
  {
    id: 't3',
    name: 'Aditya Patil',
    role: 'Lead Singer',
    organization: 'Godavari Groove Indie Band',
    review: 'The 3D mockup tool and the attention to detail on our merch skull back-prints blew us away. The ink red matches our album color code 100%. Highly recommended in Nashik!',
    rating: 5,
    avatarText: 'AP'
  },
  {
    id: 't4',
    name: 'Neha Shinde',
    role: 'HR Manager',
    organization: 'FinEdge Technologies Nashik',
    review: 'Seamless bulk welcome kits (hoodie, temperature water bottle, desk pad). The team accommodated our urgent timeline without compromising on packaging quality.',
    rating: 5,
    avatarText: 'NS'
  }
];

export const faqItems: FAQItem[] = [
  {
    category: 'Ordering & Quantities',
    question: 'What is your minimum order quantity (MOQ)?',
    answer: 'For DTF or Sublimation T-shirts, ceramic mugs, and laser-etched sippers, our MOQ is just 1 piece! You can order single custom samples or gifts.'
  },
  {
    category: 'Production Time',
    question: 'How fast can you deliver my order?',
    answer: 'Standard orders take 2 to 4 business days. Need it faster? We offer 24-48 hours express rush service for emergency corporate events, college fests, and weekend celebrations across Nashik.'
  },
  {
    category: 'Artwork & Files',
    question: 'Which file formats do you accept for custom printing?',
    answer: 'We accept EPS, PDF, SVG, CDR, and high-resolution PNG/JPEG files (300 DPI Recommended).'
  },
  {
    category: 'Quality & Durability',
    question: 'Will the prints crack, peel, or fade in the washing machine?',
    answer: `Our prints are made with DTF (Direct-to-Film) transfer and heat-pressed onto the garment for a lasting finish. With proper care, they hold up well through regular washing. To keep your print looking its best, we recommend:

1. Wash inside out in cold or lukewarm water (up to 30°C)
2. Use a gentle cycle and mild detergent
3. Avoid bleach and fabric softener
4. Do not iron directly on the print
5. Dry in shade or tumble dry on low heat`
  },
  {
    category: 'Pickup & Delivery',
    question: 'Where can I collect my order in Nashik, or do you deliver?',
    answer: 'You can pick up directly from our workshop at Swami Park, Dhruv Nagar, Nashik. We also offer same-day Dunzo/Porter delivery within Nashik, and express tracked courier delivery throughout Maharashtra and across India.'
  },
  {
    category: 'Payment Options',
    question: 'What payment methods do you accept?',
    answer: 'We accept Google Pay, PhonePe, Paytm, UPI QR, Bank NEFT/RTGS. For corporate bulk orders, we get 50% advance and 50% upon Dispatch.'
  }
];

/**
 * Customizer price estimator
 */
export const calculateEstimatePrice = (
  productType: 'tshirt' | 'polo' | 'hoodie' = 'tshirt',
  placement: 'front' | 'back' | 'both' = 'front',
  quantity: number = 1
) => {
  let basePrice = 290;
  if (productType === 'polo') basePrice = 449;
  if (productType === 'hoodie') basePrice = 799;

  let placementAddon = 0;
  if (placement === 'both') placementAddon = 120;

  let unitPrice = basePrice + placementAddon;

  // Quantity tier discounts
  if (quantity >= 50) unitPrice = Math.round(unitPrice * 0.65);
  else if (quantity >= 25) unitPrice = Math.round(unitPrice * 0.75);
  else if (quantity >= 10) unitPrice = Math.round(unitPrice * 0.85);
  else if (quantity >= 5) unitPrice = Math.round(unitPrice * 0.92);

  return {
    unitPrice,
    totalPrice: unitPrice * quantity,
    savingsPercent: quantity >= 50 ? 35 : quantity >= 25 ? 25 : quantity >= 10 ? 15 : quantity >= 5 ? 8 : 0
  };
};
