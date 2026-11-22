import React, { useState, useRef, useEffect } from 'react';
import { calculateEstimatePrice } from '../data/merchData';
import { getWhatsAppLink } from '../data/config';
import { 
  Upload, 
  Type, 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Move, 
  Compass,
  CornerDownRight
} from 'lucide-react';

interface PositionPreset {
  id: string;
  label: string;
  shortLabel: string;
  x: number; // percentage (0 to 100)
  y: number; // percentage (0 to 100)
  scale: number; // scale multiplier
  description: string;
}

const POSITION_PRESETS: PositionPreset[] = [
  { id: 'left-corner', label: 'Left Corner / Pocket', shortLabel: 'Left Pocket', x: 35, y: 36, scale: 0.8, description: 'Wearer left chest pocket print' },
  { id: 'center-chest', label: 'Center Chest', shortLabel: 'Center Chest', x: 50, y: 39, scale: 1.0, description: 'Standard high-impact chest statement' },
  { id: 'right-corner', label: 'Right Corner / Crest', shortLabel: 'Right Crest', x: 65, y: 36, scale: 0.8, description: 'Right chest badge / emblem' },
  { id: 'full-front', label: 'Full Front Center', shortLabel: 'Full Center', x: 50, y: 49, scale: 1.25, description: 'Large oversized center statement' },
  { id: 'upper-chest', label: 'Upper Chest / Collar', shortLabel: 'Upper Collar', x: 50, y: 29, scale: 0.85, description: 'Minimalist high neckline logo' },
  { id: 'lower-hem', label: 'Lower Hem / Bottom', shortLabel: 'Lower Hem', x: 38, y: 64, scale: 0.75, description: 'Modern bottom streetwear hem patch' },
];

interface ApparelModelData {
  title: string;
  uid: string;
  cameraDistanceMultiplier?: number;
}

const DEFAULT_CAMERA_DISTANCE_MULTIPLIER = 1.14;

// Clean embed options that disable Sketchfab UI controls, watermarks, hints, and info
const SKETCHFAB_INIT_OPTIONS = {
  autostart: 1,
  preload: 1,
  camera: 0,
  ui_controls: 0,
  ui_infos: 0,
  ui_watermark: 0,
  ui_watermark_link: 0,
  ui_hint: 0,
  ui_theme: 'light',
  ui_help: 0,
  ui_settings: 0,
  ui_inspector: 0,
  ui_stop: 0,
  ui_animations: 0,
  transparent: 0,
};

// 3D Model Catalog for Men's & Women's for all 3 Apparel Silhouettes
const APPAREL_MODELS: Record<'tshirt' | 'polo' | 'hoodie', { mens: ApparelModelData; womens: ApparelModelData }> = {
  // 1. Crewneck Tee (Primary)
  tshirt: {
    mens: {
      title: 'T Shirt - Men',
      uid: '08f28f3c33494de7a29fd255e64441bf',
      cameraDistanceMultiplier: 1.14,
    },
    womens: {
      title: 'Female White Casual Tucked-in T-Shirt',
      uid: 'fcbc4777e10144ec9a51d8a2b0204c28',
      cameraDistanceMultiplier: 1.32,
    },
  },
  // 2. Collared Polo
  polo: {
    mens: {
      title: 'Men Short Sleeved Solid Color Polo',
      uid: '670dad551f4243e39f116f5e5e038a5e',
      cameraDistanceMultiplier: 1.14,
    },
    womens: {
      title: 'Women Classic Strip Polo Shirt',
      uid: '43470f9b12b64253bdeb41d337e7c9a3',
      cameraDistanceMultiplier: 1.14,
    },
  },
  // 3. Warm Hoodie
  hoodie: {
    mens: {
      title: 'Men Zip-up Hoodie',
      uid: '8e78ba296dfe40749caa57fb4d4e318f',
      cameraDistanceMultiplier: 1.16,
    },
    womens: {
      title: 'Women Hooded T-Shirt',
      uid: '297d2abf5bb9475ab5fd0eb1bc0fee4f',
      cameraDistanceMultiplier: 1.16,
    },
  },
};

interface SketchfabCameraLookAt {
  position: [number, number, number];
  target: [number, number, number];
}

interface SketchfabViewerApi {
  start: () => void;
  addEventListener: (event: string, cb: () => void) => void;
  getCameraLookAt: (cb: (err: unknown, camera: SketchfabCameraLookAt) => void) => void;
  setCameraLookAt: (
    position: [number, number, number],
    target: [number, number, number],
    duration?: number,
    cb?: () => void
  ) => void;
}

type SketchfabClientConstructor = new (iframe: HTMLIFrameElement) => {
  init: (
    uid: string,
    options: Record<string, unknown> & {
      success?: (api: SketchfabViewerApi) => void;
      error?: () => void;
    }
  ) => void;
};

let sketchfabScriptPromise: Promise<SketchfabClientConstructor> | null = null;

function loadSketchfabViewerApi(): Promise<SketchfabClientConstructor> {
  const win = window as unknown as { Sketchfab?: SketchfabClientConstructor };
  if (win.Sketchfab) {
    return Promise.resolve(win.Sketchfab);
  }
  if (sketchfabScriptPromise) {
    return sketchfabScriptPromise;
  }
  sketchfabScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="sketchfab-viewer"]'
    );
    if (existing) {
      existing.addEventListener('load', () => {
        if (win.Sketchfab) resolve(win.Sketchfab);
        else reject(new Error('Sketchfab global missing after script load'));
      });
      existing.addEventListener('error', () => reject(new Error('Failed to load Sketchfab Viewer API')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    script.onload = () => {
      if (win.Sketchfab) resolve(win.Sketchfab);
      else reject(new Error('Sketchfab global missing after script load'));
    };
    script.onerror = () => {
      sketchfabScriptPromise = null;
      reject(new Error('Failed to load Sketchfab Viewer API'));
    };
    document.head.appendChild(script);
  });
  return sketchfabScriptPromise;
}

export const TShirtCustomizer: React.FC = () => {
  // Apparel Silhouette: 'tshirt' (Crewneck Tee - Primary), 'polo' (Collared Polo), 'hoodie' (Warm Hoodie)
  const [shirtType, setShirtType] = useState<'tshirt' | 'polo' | 'hoodie'>('tshirt');

  // 3D Model Fit: 'mens' (M) or 'womens' (W)
  const [modelGender, setModelGender] = useState<'mens' | 'womens'>('mens');


  // Canvas Mode: 'adjust' (drag/position artwork) vs 'orbit' (spin 3D model 360)
  const [interactionMode, setInteractionMode] = useState<'adjust' | 'orbit'>('adjust');

  // Color & Product Options
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [size, setSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [placement, setPlacement] = useState<'front' | 'back' | 'both'>('front');
  const [customText, setCustomText] = useState('YOUR TEXT HERE');
  const [textColor, setTextColor] = useState('#141414');
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');

  const isInitialMobile =
    typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches;

  // Adjustable Placement Coordinates & Transform State
  const [activePreset, setActivePreset] = useState<string>(
    isInitialMobile ? 'custom' : 'center-chest'
  );
  const [posX, setPosX] = useState<number>(isInitialMobile ? 51 : 50); // percentage 20% - 80%
  const [posY, setPosY] = useState<number>(isInitialMobile ? 40 : 39); // percentage 22% - 74%
  const [scale, setScale] = useState<number>(isInitialMobile ? 61 : 100); // 50% - 150%
  const [rotation, setRotation] = useState<number>(0); // -45 deg to +45 deg
  const hasUserModifiedPlacementRef = useRef(false);

  // 3D model readiness state (keeps design overlay hidden until 3D viewer is ready)
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Dragging, corner-resizing, and hover visibility state on 3D canvas
  const [isDesignHovered, setIsDesignHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 50,
    initY: 39,
  });
  const resizeStartRef = useRef<{
    centerX: number;
    centerY: number;
    ux: number;
    uy: number;
    initDist: number;
    initScale: number;
  }>({
    centerX: 0,
    centerY: 0,
    ux: 1,
    uy: 0,
    initDist: 1,
    initScale: 100,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    { name: 'Pure White', hex: '#FFFFFF', border: '#DCD6CA' },
    { name: 'Oatmeal Natural', hex: '#EDE8DF', border: '#D5CEBF' },
    { name: 'Pitch Black', hex: '#141414', border: '#141414' },
    { name: 'Foundry Vermilion', hex: '#E5382C', border: '#E5382C' },
    { name: 'Deep French Navy', hex: '#1B2945', border: '#1B2945' },
    { name: 'Cyber Chartreuse', hex: '#B6D926', border: '#9EB825' },
    { name: 'Forest Pine', hex: '#2B4C38', border: '#2B4C38' },
    { name: 'Heather Grey', hex: '#9E9E9E', border: '#8E8E8E' },
    { name: 'Royal Crimson', hex: '#8B1E1E', border: '#8B1E1E' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'Oversized'];
  const fonts = [
    { value: 'Outfit', label: 'Outfit' },
    { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Bebas Neue', label: 'Bebas Neue' },
    { value: 'Permanent Marker', label: 'Permanent Marker (Graffiti)' },
  ];

  const estimate = calculateEstimatePrice(shirtType, placement, quantity);

  // Initialize Sketchfab Viewer API and wait for 'viewerready' before showing design overlay
  const activeModel = APPAREL_MODELS[shirtType][modelGender];
  const activeModelUid = activeModel.uid;
  const activeCameraMultiplier =
    activeModel.cameraDistanceMultiplier ?? DEFAULT_CAMERA_DISTANCE_MULTIPLIER;

  useEffect(() => {
    let cancelled = false;
    setIsModelLoaded(false);
    setIsDesignHovered(false);
    setIsDragging(false);
    setIsResizing(false);

    const iframe = iframeRef.current;
    if (!iframe) return;

    loadSketchfabViewerApi()
      .then((Sketchfab) => {
        if (cancelled || !iframeRef.current) return;
        const client = new Sketchfab(iframeRef.current);
        client.init(activeModelUid, {
          ...SKETCHFAB_INIT_OPTIONS,
          success: (api) => {
            if (cancelled) return;
            api.start();
            api.addEventListener('viewerready', () => {
              if (cancelled) return;
              api.getCameraLookAt((err, camera) => {
                if (cancelled) return;
                if (!err && camera) {
                  const [px, py, pz] = camera.position;
                  const [tx, ty, tz] = camera.target;
                  const pulledBackPosition: [number, number, number] = [
                    tx + (px - tx) * activeCameraMultiplier,
                    ty + (py - ty) * activeCameraMultiplier,
                    tz + (pz - tz) * activeCameraMultiplier,
                  ];
                  api.setCameraLookAt(pulledBackPosition, camera.target, 0, () => {
                    if (!cancelled) setIsModelLoaded(true);
                  });
                } else {
                  setIsModelLoaded(true);
                }
              });
            });
          },
          error: () => {
            if (!cancelled) {
              setIsModelLoaded(true);
            }
          },
        });
      })
      .catch(() => {
        if (cancelled || !iframeRef.current) return;
        const fallbackParams = new URLSearchParams(
          Object.entries(SKETCHFAB_INIT_OPTIONS).map(([k, v]) => [k, String(v)])
        ).toString();
        iframeRef.current.src = `https://sketchfab.com/models/${activeModelUid}/embed?${fallbackParams}`;
        iframeRef.current.onload = () => {
          if (!cancelled) setIsModelLoaded(true);
        };
      });

    return () => {
      cancelled = true;
    };
  }, [activeModelUid, activeCameraMultiplier]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = (e: MediaQueryListEvent) => {
      if (hasUserModifiedPlacementRef.current) return;
      if (e.matches) {
        setActivePreset('center-chest');
        setPosX(50);
        setPosY(39);
        setScale(100);
      } else {
        setActivePreset('custom');
        setPosX(51);
        setPosY(40);
        setScale(61);
      }
    };
    mql.addEventListener('change', handleViewportChange);
    return () => mql.removeEventListener('change', handleViewportChange);
  }, []);

  // Apply a preset position
  const applyPreset = (preset: PositionPreset) => {
    hasUserModifiedPlacementRef.current = true;
    setActivePreset(preset.id);
    setPosX(preset.x);
    setPosY(preset.y);
    setScale(Math.round(preset.scale * 100));
    setRotation(0);
  };

  // Dragging handlers for artwork decal body and top drag bar on the 3D model
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (interactionMode !== 'adjust' || !isModelLoaded) return;
    const target = e.target as HTMLElement;
    if (target.closest('[data-resize-handle="true"]')) return;
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      startX: e.clientX,
      startY: e.clientY,
      initX: posX,
      initY: posY,
    });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging || isResizing || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.startY) / rect.height) * 100;

    // Clamp coordinates within realistic garment boundaries
    const newX = Math.min(Math.max(Math.round(dragStart.initX + deltaX), 22), 78);
    const newY = Math.min(Math.max(Math.round(dragStart.initY + deltaY), 24), 74);

    hasUserModifiedPlacementRef.current = true;
    setPosX(newX);
    setPosY(newY);
    setActivePreset('custom');
  };

  const isPointerInsideOverlay = (clientX: number, clientY: number) => {
    const el = overlayRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
      if (!isPointerInsideOverlay(e.clientX, e.clientY)) {
        setIsDesignHovered(false);
      }
    }
  };

  // Corner handle resize handlers (strictly scales bounding box without translating position)
  const handleResizePointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (interactionMode !== 'adjust' || !isModelLoaded || !canvasRef.current) return;
    e.stopPropagation();
    e.preventDefault();

    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.left + (posX / 100) * rect.width;
    const centerY = rect.top + (posY / 100) * rect.height;
    const dx0 = e.clientX - centerX;
    const dy0 = e.clientY - centerY;
    const initDist = Math.max(Math.hypot(dx0, dy0), 1);

    resizeStartRef.current = {
      centerX,
      centerY,
      ux: dx0 / initDist,
      uy: dy0 / initDist,
      initDist,
      initScale: scale,
    };

    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleResizePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!isResizing) return;
    e.stopPropagation();
    const { centerX, centerY, ux, uy, initDist, initScale } = resizeStartRef.current;
    const projDist = (e.clientX - centerX) * ux + (e.clientY - centerY) * uy;
    const ratio = projDist / initDist;
    const nextScale = Math.min(Math.max(Math.round(initScale * ratio), 50), 150);
    hasUserModifiedPlacementRef.current = true;
    setScale(nextScale);
  };

  const handleResizePointerUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (isResizing) {
      e.stopPropagation();
      setIsResizing(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
      if (!isPointerInsideOverlay(e.clientX, e.clientY)) {
        setIsDesignHovered(false);
      }
    }
  };

  const showBoundingBox = interactionMode === 'adjust' && (isDesignHovered || isDragging || isResizing);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setActiveTab('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedColorName = colors.find((c) => c.hex.toLowerCase() === shirtColor.toLowerCase())?.name || 'Custom Shade';
  const activePresetLabel = POSITION_PRESETS.find((p) => p.id === activePreset)?.label || `Custom (X: ${posX}%, Y: ${posY}%)`;

  // Get current active 3D model data based on selected silhouette and M / W fit
  const active3DModel = APPAREL_MODELS[shirtType][modelGender];

  const getSilhouetteLabel = (type: 'tshirt' | 'polo' | 'hoodie') => {
    switch (type) {
      case 'tshirt':
        return 'Crewneck Tee';
      case 'polo':
        return 'Collared Polo';
      case 'hoodie':
        return 'Warm Hoodie';
    }
  };

  const generateWhatsAppMessage = () => {
    let msg = `🔥 *CUSTOM 3D MERCH DESIGN REQUEST* 🔥\n`;
    msg += `• Silhouette: ${getSilhouetteLabel(shirtType).toUpperCase()}\n`;
    msg += `• 3D Fit Model: ${modelGender === 'mens' ? "Men's 3D Model (M)" : "Women's 3D Model (W)"}\n`;
    msg += `• Color: ${selectedColorName} (${shirtColor})\n`;
    msg += `• Size: ${size}\n`;
    msg += `• Print Placement: ${placement.toUpperCase()} at ${activePresetLabel}\n`;
    msg += `• Coordinates: X: ${posX}%, Y: ${posY}%, Scale: ${scale}%, Rot: ${rotation}°\n`;
    msg += `• Quantity: ${quantity} units\n`;
    msg += `• Estimated Price: ₹${estimate.totalPrice} (₹${estimate.unitPrice}/piece)\n`;
    if (activeTab === 'text') {
      msg += `• Custom Text: "${customText}" (${fontFamily} font in ${textColor})\n`;
    } else {
      msg += `• Custom Artwork: Attached vector graphic / logo uploaded\n`;
    }
    msg += `\nPlease review this 3D mockup and confirm production schedule!`;
    return msg;
  };

  return (
    <section id="customizer" className="py-14 lg:py-16 bg-transparent relative overflow-hidden border-t border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E4DC] text-[#E5382C] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles size={13} />
            <span>3D Interactive Atelier · Real-Time Fitting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141414] font-display tracking-tight">
            CUSTOM MERCH <span className="text-[#E5382C]">DESIGNER</span>
          </h2>
          <p className="text-sm sm:text-base text-[#635F56] leading-relaxed">
            Choose between Crewneck Tee, Collared Polo, or Warm Hoodie, toggle Men&apos;s and Women&apos;s 3D models on clean white studio background, and adjust your custom artwork placement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:items-stretch">
          {/* Left Column: 3D Interactive Canvas & Model Viewer */}
          <div className="lg:col-span-7 flex flex-col items-center min-w-0">
            {/* Top Toolbar: Men's / Women's [M] / [W] Model Selector & 3D/2D Toggle */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-2.5 bg-white p-2 rounded-2xl border border-[#E8E4DC] shadow-sm">
              {/* Gender [M] / [W] Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#736E65] mr-1 hidden sm:inline">3D Fit:</span>

                {/* Men's Model Button (M) */}
                <button
                  type="button"
                  onClick={() => setModelGender('mens')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    modelGender === 'mens'
                      ? 'bg-[#141414] text-white shadow-sm'
                      : 'bg-[#f8fafc] text-[#635F56] hover:text-[#141414] border border-[#E8E4DC]'
                  }`}
                  aria-label="Men's 3D Model"
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black tracking-wider ${
                      modelGender === 'mens' ? 'bg-[#E5382C] text-white' : 'bg-[#E8E4DC] text-[#141414]'
                    }`}
                  >
                    M
                  </span>
                  <span>Men&apos;s 3D Model</span>
                </button>

                {/* Women's Model Button (W) */}
                <button
                  type="button"
                  onClick={() => setModelGender('womens')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    modelGender === 'womens'
                      ? 'bg-[#141414] text-white shadow-sm'
                      : 'bg-[#f8fafc] text-[#635F56] hover:text-[#141414] border border-[#E8E4DC]'
                  }`}
                  aria-label="Women's 3D Model"
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black tracking-wider ${
                      modelGender === 'womens' ? 'bg-[#E5382C] text-white' : 'bg-[#E8E4DC] text-[#141414]'
                    }`}
                  >
                    W
                  </span>
                  <span>Women&apos;s 3D Model</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Stage Container - PURE WHITE BACKGROUND GUARANTEED */}
            <div
              ref={canvasRef}
              className="relative w-full h-[330px] sm:h-[360px] lg:h-[385px] rounded-2xl bg-white border border-[#E8E4DC] shadow-atelier overflow-hidden flex items-center justify-center select-none"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Constant Pure White Studio Background - Never alters with color selection */}
              <div
                className="absolute inset-0 bg-white pointer-events-none"
                style={{ backgroundColor: '#FFFFFF' }}
              />

              {/* 3D MODE: Primary Dynamic Models for Tee, Polo & Hoodie */}
              <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                {/* Dynamic 3D Model Embed Container - Seamless Full Space Fill */}
                <div
                  key={`${shirtType}-${modelGender}`}
                  className="sketchfab-embed-wrapper w-full h-full relative overflow-hidden flex items-center justify-center bg-white"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <iframe
                    ref={iframeRef}
                    title={`${active3DModel.title} - The Merch Foundry`}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    className={`border-0 bg-white transition-opacity duration-300 ${
                      interactionMode === 'orbit' ? 'pointer-events-auto' : 'pointer-events-none'
                    } ${isModelLoaded ? 'opacity-100' : 'opacity-90'}`}
                    style={{
                      backgroundColor: '#FFFFFF',
                      width: '104%',
                      height: 'calc(100% + 104px)',
                      marginTop: '-52px',
                      marginBottom: '-52px',
                      marginLeft: '-2%',
                      marginRight: '-2%',
                    }}
                  />
                </div>
              </div>

              {/* ADJUSTABLE CUSTOMER DESIGN OVERLAY (Hidden until 3D model is fully loaded) */}
              {activeView === 'front' && isModelLoaded && (
                <div
                  ref={overlayRef}
                  onPointerEnter={() => {
                    if (interactionMode === 'adjust') setIsDesignHovered(true);
                  }}
                  onPointerLeave={() => {
                    if (!isDragging && !isResizing) setIsDesignHovered(false);
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`absolute z-20 flex items-center justify-center touch-none ${
                    isDragging || isResizing ? '' : 'transition-all'
                  } ${
                    interactionMode === 'adjust' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
                  } ${isDragging ? 'scale-105 opacity-90' : ''}`}
                  style={{
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale / 100})`,
                    transformOrigin: 'center center',
                    width: '138px',
                    height: '138px',
                  }}
                >
                  {/* Visual Bounding Anchor Box for Precise Fitting */}
                  <div
                    className={`w-full h-full relative rounded-xl flex items-center justify-center p-2.5 border-2 ${
                      showBoundingBox
                        ? 'border-dashed border-[#E5382C] bg-white/20 backdrop-blur-[1px] shadow-lg'
                        : 'border-transparent bg-transparent'
                    }`}
                  >
                    {/* Corner Position Resize Anchors */}
                    {showBoundingBox && (
                      <>
                        <span
                          data-resize-handle="true"
                          role="slider"
                          aria-label="Resize top-left corner"
                          aria-valuenow={scale}
                          onPointerDown={handleResizePointerDown}
                          onPointerMove={handleResizePointerMove}
                          onPointerUp={handleResizePointerUp}
                          onPointerCancel={handleResizePointerUp}
                          className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-[#E5382C] rounded-full border-2 border-white shadow-sm cursor-nwse-resize touch-none z-30 hover:scale-125 transition-transform"
                        />
                        <span
                          data-resize-handle="true"
                          role="slider"
                          aria-label="Resize top-right corner"
                          aria-valuenow={scale}
                          onPointerDown={handleResizePointerDown}
                          onPointerMove={handleResizePointerMove}
                          onPointerUp={handleResizePointerUp}
                          onPointerCancel={handleResizePointerUp}
                          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#E5382C] rounded-full border-2 border-white shadow-sm cursor-nesw-resize touch-none z-30 hover:scale-125 transition-transform"
                        />
                        <span
                          data-resize-handle="true"
                          role="slider"
                          aria-label="Resize bottom-left corner"
                          aria-valuenow={scale}
                          onPointerDown={handleResizePointerDown}
                          onPointerMove={handleResizePointerMove}
                          onPointerUp={handleResizePointerUp}
                          onPointerCancel={handleResizePointerUp}
                          className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-[#E5382C] rounded-full border-2 border-white shadow-sm cursor-nesw-resize touch-none z-30 hover:scale-125 transition-transform"
                        />
                        <span
                          data-resize-handle="true"
                          role="slider"
                          aria-label="Resize bottom-right corner"
                          aria-valuenow={scale}
                          onPointerDown={handleResizePointerDown}
                          onPointerMove={handleResizePointerMove}
                          onPointerUp={handleResizePointerUp}
                          onPointerCancel={handleResizePointerUp}
                          className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#E5382C] rounded-full border-2 border-white shadow-sm cursor-nwse-resize touch-none z-30 hover:scale-125 transition-transform"
                        />

                        {/* Drag Handle HUD Pill (with pb-2 hover bridge to prevent gap flicker) */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 pb-2 cursor-grab active:cursor-grabbing">
                          <div className="bg-[#141414] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap">
                            <Move size={10} className="text-[#E5382C]" />
                            <span>DRAG TO POSITION</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Artwork Render: Uploaded Graphic vs Custom Typography */}
                    {activeTab === 'image' && uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Customer Artwork"
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none"
                      />
                    ) : (
                      <div
                        className="text-center font-bold tracking-wider break-words select-none pointer-events-none px-1 normal-case"
                        style={{
                          fontFamily: fontFamily === 'Permanent Marker' ? '"Permanent Marker", cursive' : fontFamily,
                          color: textColor,
                          fontSize: customText.length > 14 ? '18px' : customText.length > 8 ? '23px' : '28px',
                          lineHeight: 1.05,
                          textShadow:
                            shirtColor === '#FFFFFF'
                              ? '0 1px 2px rgba(0,0,0,0.2)'
                              : '0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.4)',
                        }}
                      >
                        {customText || 'YOUR DESIGN'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Right Mode Controls: 3D Orbit vs Design Adjust */}
              {isModelLoaded && (
                <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                  <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#E8E4DC] shadow-sm flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setInteractionMode('adjust')}
                      className={`no-shine flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        interactionMode === 'adjust' ? 'bg-[#E5382C] text-white shadow-sm' : 'text-[#635F56] hover:text-[#141414]'
                      }`}
                      title="Adjust Artwork Position & Size"
                    >
                      <Move size={13} />
                      <span>Adjust Design</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInteractionMode('orbit')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        interactionMode === 'orbit' ? 'bg-[#141414] text-white shadow-sm' : 'text-[#635F56] hover:text-[#141414]'
                      }`}
                      title="Rotate & Orbit 3D Model 360°"
                    >
                      <Compass size={13} />
                      <span>Orbit 360°</span>
                    </button>
                  </div>
                </div>
              )}
            </div>


            {/* ADJUSTABLE POSITION SELECTOR: Quick Placement Presets */}
            <div className="w-full mt-2.5 bg-white p-3.5 rounded-2xl border border-[#E8E4DC] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <CornerDownRight size={14} className="text-[#E5382C]" />
                  <span className="text-xs font-bold text-[#141414]">Adjustable Design Position:</span>
                </div>
                <span className="text-[11px] font-semibold text-[#E5382C] bg-[#FFF2F0] px-2 py-0.5 rounded">
                  {activePresetLabel}
                </span>
              </div>

              {/* 6 Quick Position Presets */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {POSITION_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`py-1.5 px-1.5 rounded-lg text-center text-[11px] font-bold transition-all border ${
                      activePreset === p.id
                        ? 'border-[#E5382C] bg-[#FFF5F4] text-[#E5382C] shadow-sm'
                        : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56] hover:border-[#D5CEBF] hover:text-[#141414]'
                    }`}
                  >
                    {p.shortLabel}
                  </button>
                ))}
              </div>

              {/* Precision Coordinate Sliders (X, Y, Size, Rotation) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-[#F0ECE4]">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#736E65] mb-1">
                    <span>X Position</span>
                    <span className="font-bold text-[#141414]">{posX}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={posX}
                    onChange={(e) => {
                      hasUserModifiedPlacementRef.current = true;
                      setPosX(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full accent-[#E5382C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#736E65] mb-1">
                    <span>Y Position</span>
                    <span className="font-bold text-[#141414]">{posY}%</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="74"
                    value={posY}
                    onChange={(e) => {
                      hasUserModifiedPlacementRef.current = true;
                      setPosY(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full accent-[#E5382C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#736E65] mb-1">
                    <span>Design Scale</span>
                    <span className="font-bold text-[#141414]">{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={scale}
                    onChange={(e) => {
                      hasUserModifiedPlacementRef.current = true;
                      setScale(Number(e.target.value));
                    }}
                    className="w-full accent-[#E5382C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#736E65] mb-1">
                    <span>Rotation</span>
                    <span className="font-bold text-[#141414]">{rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full accent-[#E5382C] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Wholesale Quote Generator */}
          <div className="lg:col-span-5 min-w-0 bg-white border border-[#E8E4DC] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-atelier">
            {/* Header: APPAREL SILHOUETTE SELECTOR (Crewneck Tee - Primary, Collared Polo, Warm Hoodie) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#736E65] uppercase tracking-wider block">
                  Apparel Silhouette
                </label>
                <span className="text-[11px] font-bold text-[#E5382C] bg-[#FFF2F0] px-2 py-0.5 rounded">
                  {modelGender === 'mens' ? "Men's Fit [M]" : "Women's Fit [W]"}
                </span>
              </div>

              {/* 3 Silhouette Buttons: Crewneck Tee (Primary), Collared Polo, Warm Hoodie */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tshirt', label: 'Crewneck Tee', isPrimary: true },
                  { id: 'polo', label: 'Collared Polo', isPrimary: false },
                  { id: 'hoodie', label: 'Warm Hoodie', isPrimary: false },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setShirtType(type.id as any)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center text-center gap-0.5 ${
                      shirtType === type.id
                        ? 'border-[#E5382C] bg-[#FFF5F4] text-[#E5382C] shadow-sm ring-1 ring-[#E5382C]/30'
                        : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56] hover:border-[#D5CEBF] hover:text-[#141414]'
                    }`}
                  >
                    <span>{type.label}</span>
                    {type.isPrimary && (
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#E5382C]">
                        Primary
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Asset Toggle (Custom Text vs Upload Graphic) */}
            <div className="pt-3.5 border-t border-[#F0ECE4]">
              <label className="text-xs font-bold text-[#736E65] uppercase tracking-wider block mb-2">
                Artwork / Custom Content
              </label>
              <div className="flex items-center gap-2 mb-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    activeTab === 'text'
                      ? 'border-[#141414] bg-[#141414] text-white shadow-sm'
                      : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56]'
                  }`}
                >
                  <Type size={14} />
                  <span>Type Custom Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('image')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    activeTab === 'image'
                      ? 'border-[#141414] bg-[#141414] text-white shadow-sm'
                      : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56]'
                  }`}
                >
                  <Upload size={14} />
                  <span>Upload Vector / Logo</span>
                </button>
              </div>

              {activeTab === 'text' ? (
                <div className="space-y-2.5 p-3 bg-[#f8fafc] rounded-xl border border-[#E8E4DC]">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter slogan or brand name..."
                    className="w-full bg-white border border-[#E8E4DC] rounded-lg px-3 py-1.5 text-sm text-[#141414] font-medium normal-case focus:outline-none focus:border-[#E5382C]"
                  />
                  <div className="flex flex-wrap items-center gap-2.5">
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="bg-white border border-[#E8E4DC] text-xs font-semibold text-[#141414] rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                      {fonts.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-[11px] text-[#736E65] font-semibold">Ink:</span>
                      {['#141414', '#E5382C', '#FFFFFF', '#FFB800', '#B6D926', '#1B2945'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setTextColor(color)}
                          className={`w-5 h-5 rounded-full border shadow-sm transition-transform ${
                            textColor === color ? 'border-[#141414] scale-120' : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: color }}
                          title={`Ink color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-[#E8E4DC] text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadedImage ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={uploadedImage}
                          alt="Uploaded artwork preview"
                          className="w-11 h-11 object-contain rounded-lg bg-white p-1 border border-[#E8E4DC]"
                        />
                        <div className="text-left">
                          <span className="text-xs text-[#141414] font-bold block">Artwork Attached</span>
                          <span className="text-[10px] text-[#736E65]">Ready for 3D simulation</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-[#E5382C] font-bold hover:underline"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3.5 border-2 border-dashed border-[#D5CEBF] hover:border-[#E5382C] rounded-xl flex flex-col items-center justify-center gap-1 transition-colors bg-white"
                    >
                      <ImageIcon size={20} className="text-[#8C867A]" />
                      <span className="text-xs text-[#141414] font-bold">Upload Vector or PNG Graphic</span>
                      <span className="text-[10px] text-[#736E65]">Supports SVG, PNG, AI, JPEG (300 DPI)</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Size & Print Placement Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 border-t border-[#F0ECE4]">
              <div>
                <label className="text-xs font-bold text-[#736E65] uppercase tracking-wider block mb-2">
                  Garment Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-bold transition-colors ${
                        size === s
                          ? 'border-[#E5382C] bg-[#E5382C] text-white shadow-sm'
                          : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#736E65] uppercase tracking-wider block mb-2">
                  Print Placement
                </label>
                <div className="flex gap-1.5">
                  {(['front', 'back', 'both'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlacement(p)}
                      className={`flex-1 py-1 text-xs rounded-lg border font-bold capitalize transition-colors ${
                        placement === p
                          ? 'border-[#E5382C] bg-[#FFF5F4] text-[#E5382C]'
                          : 'border-[#E8E4DC] bg-[#f8fafc] text-[#635F56]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tiered Wholesale Quantity Slider */}
            <div className="space-y-2 pt-3.5 border-t border-[#F0ECE4]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#736E65] uppercase tracking-wider">Quantity</span>
                <span className="text-[#E5382C] font-bold">
                  {quantity} {quantity === 1 ? 'Piece' : 'Pieces'} {estimate.savingsPercent > 0 && `(Save ${estimate.savingsPercent}%)`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-[#E5382C] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C867A] font-medium">
                <span>1 pc (Sample)</span>
                <span>10 pcs (-15%)</span>
                <span>25 pcs (-25%)</span>
                <span>50+ pcs (-35%)</span>
              </div>
            </div>

            {/* Price Estimate Summary & WhatsApp Direct Order Link */}
            <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#E8E4DC] flex flex-col items-stretch md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <span className="text-[11px] text-[#736E65] uppercase tracking-wider font-semibold block">
                  Total Quote Estimate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#141414] font-display">
                    ₹{estimate.totalPrice}
                  </span>
                  <span className="text-xs text-[#736E65] font-semibold">
                    (₹{estimate.unitPrice} / piece)
                  </span>
                </div>
              </div>

              <a
                href={getWhatsAppLink(generateWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E5382C] hover:bg-[#CC2F24] text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_16px_rgba(229,56,44,0.3)] active:scale-95 transition-all md:shrink-0"
              >
                <Send size={14} />
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
