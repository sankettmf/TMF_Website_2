import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Maximize2, Move } from 'lucide-react';

const WALKING_MODEL_UID = '022062edc5354dd78dd735870b02bccc';
const INITIAL_CAMERA_DISTANCE_MULTIPLIER = 1.42;

const SKETCHFAB_VIEWER_OPTIONS = {
  autostart: 1,
  preload: 1,
  camera: 0,
  ui_controls: 0,
  ui_infos: 0,
  ui_watermark: 0,
  ui_watermark_link: 0,
  ui_hint: 0,
  ui_theme: 'dark',
  ui_help: 0,
  ui_settings: 0,
  ui_inspector: 0,
  ui_animations: 0,
  ui_stop: 0,
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

let sketchfabViewerScriptPromise: Promise<SketchfabClientConstructor> | null = null;

function loadSketchfabViewerApi(): Promise<SketchfabClientConstructor> {
  const win = window as unknown as { Sketchfab?: SketchfabClientConstructor };
  if (win.Sketchfab) {
    return Promise.resolve(win.Sketchfab);
  }
  if (sketchfabViewerScriptPromise) {
    return sketchfabViewerScriptPromise;
  }
  sketchfabViewerScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="sketchfab-viewer"]'
    );
    if (existing) {
      existing.addEventListener('load', () => {
        if (win.Sketchfab) resolve(win.Sketchfab);
        else reject(new Error('Sketchfab global missing after script load'));
      });
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Sketchfab Viewer API'))
      );
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
      sketchfabViewerScriptPromise = null;
      reject(new Error('Failed to load Sketchfab Viewer API'));
    };
    document.head.appendChild(script);
  });
  return sketchfabViewerScriptPromise;
}

export const TShirt3DViewer: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let cancelled = false;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const applyFallbackSrc = () => {
      if (cancelled || !iframeRef.current) return;
      const fallbackParams = new URLSearchParams(
        Object.entries(SKETCHFAB_VIEWER_OPTIONS).map(([k, v]) => [k, String(v)])
      ).toString();
      iframeRef.current.src = `https://sketchfab.com/models/${WALKING_MODEL_UID}/embed?${fallbackParams}`;
    };

    loadSketchfabViewerApi()
      .then((Sketchfab) => {
        if (cancelled || !iframeRef.current) return;
        const client = new Sketchfab(iframeRef.current);
        client.init(WALKING_MODEL_UID, {
          ...SKETCHFAB_VIEWER_OPTIONS,
          success: (api) => {
            if (cancelled) return;
            api.start();
            api.addEventListener('viewerready', () => {
              if (cancelled) return;
              api.getCameraLookAt((err, camera) => {
                if (cancelled || err || !camera) return;
                const [px, py, pz] = camera.position;
                const [tx, ty, tz] = camera.target;
                const pulledBackPosition: [number, number, number] = [
                  tx + (px - tx) * INITIAL_CAMERA_DISTANCE_MULTIPLIER,
                  ty + (py - ty) * INITIAL_CAMERA_DISTANCE_MULTIPLIER,
                  tz + (pz - tz) * INITIAL_CAMERA_DISTANCE_MULTIPLIER,
                ];
                api.setCameraLookAt(pulledBackPosition, camera.target, 0);
              });
            });
          },
          error: applyFallbackSrc,
        });
      })
      .catch(applyFallbackSrc);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[460px] lg:h-[500px] flex flex-col items-center justify-center select-none">
      {/* Studio Light Ambient Pedestal Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full studio-spotlight blur-2xl opacity-90" />
      </div>

      {/* Main Showcase Card */}
      <div className="relative z-10 w-full h-full bg-white border border-[#E8E4DC] rounded-2xl shadow-atelier overflow-hidden flex flex-col">
        {/* Top Header Bar */}
        <div className="px-5 py-3 border-b border-[#E8E4DC] bg-[#f8fafc]/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5382C] animate-pulse" />
            <span className="text-xs font-bold text-[#141414] uppercase tracking-wider">
              3D Dynamic Simulation
            </span>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#E5382C] bg-[#FFF2F0] px-2 py-0.5 rounded border border-[#FFDDD8]">
              Walking Loop
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#736E65]">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#736E65]">
              <Move size={12} className="text-[#E5382C]" />
              Drag to 360° Orbit
            </span>
          </div>
        </div>

        {/* Embedded Animated T-Shirt - Walking Loop */}
        <div className="relative flex-1 w-full bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
          <div className="sketchfab-embed-wrapper w-full h-full relative overflow-hidden flex items-center justify-center">
            <iframe
              ref={iframeRef}
              title="Live Walking T-Shirt Design - The Merch Foundry"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              className="border-0"
              style={{
                width: '106%',
                height: 'calc(100% + 140px)',
                marginTop: '-48px',
                marginBottom: '-92px',
                marginLeft: '-3%',
                marginRight: '-3%',
              }}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-5 py-3 bg-white border-t border-[#E8E4DC] flex items-center justify-center text-center">
          <p className="text-xs sm:text-sm font-bold text-[#141414] tracking-wide">
            Live Walking T-Shirt Design By <span className="text-[#E5382C]">THE MERCH FOUNDRY</span>!
          </p>
        </div>
      </div>
    </div>
  );
};
