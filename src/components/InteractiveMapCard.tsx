import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Compass } from 'lucide-react';

export const InteractiveMapCard: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  return (
    <div className="bg-white rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-lg relative group">
      {/* Map Graphic Stage */}
      <div className="relative h-72 w-full bg-[#EAE0D5] overflow-hidden flex items-center justify-center">
        {/* Stylized Vector Map Grid representing Valiasr / Fereshteh Tehran District */}
        <svg
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Terrain */}
          <rect width="800" height="400" fill="#EAE0D5" />

          {/* Park / Greenery Areas */}
          <path d="M 50 20 Q 150 10 220 80 T 180 200 Z" fill="#D2E3C8" opacity="0.8" />
          <path d="M 600 150 Q 720 120 780 250 T 650 380 Z" fill="#D2E3C8" opacity="0.8" />

          {/* Major Avenues (Valiasr Ave & Fereshteh St) */}
          {/* Valiasr Main Diagonal Avenue */}
          <path d="M -50 450 L 500 -50" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" />
          <path d="M -50 450 L 500 -50" stroke="#C3B091" strokeWidth="18" strokeLinecap="round" />

          {/* Fereshteh Street */}
          <path d="M 250 220 L 750 100" stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round" />
          <path d="M 250 220 L 750 100" stroke="#A88D92" strokeWidth="14" strokeLinecap="round" />

          {/* Secondary Connectors */}
          <path d="M 100 100 L 400 350" stroke="#FFFFFF" strokeWidth="12" />
          <path d="M 450 50 L 650 350" stroke="#FFFFFF" strokeWidth="12" />
          <path d="M 300 300 L 700 250" stroke="#FFFFFF" strokeWidth="10" />

          {/* Street Names Labels in Farsi */}
          <text x="180" y="320" fill="#701A23" fontSize="14" fontWeight="bold" transform="rotate(-40 180 320)">
            خیابان ولی‌عصر (عج)
          </text>
          <text x="480" y="160" fill="#1F1A1C" fontSize="14" fontWeight="bold" transform="rotate(-12 480 160)">
            خیابان فرشته (فرشته شو روم)
          </text>

          {/* Studio Pin Marker Pulsing */}
          <g transform="translate(480, 160)">
            <circle r="22" fill="#701A23" opacity="0.2" className="animate-ping" />
            <circle r="14" fill="#701A23" opacity="0.4" />
            <circle r="8" fill="#701A23" />
            <circle r="3" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Map Floating Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-2xl p-1.5 shadow-md flex flex-col gap-1 border border-[#EAE3DA]">
          <button
            onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.2))}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#F3EEE7] text-[#1F1A1C] font-bold text-sm flex items-center justify-center shadow-sm"
            title="بزرگ‌نمایی"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#F3EEE7] text-[#1F1A1C] font-bold text-sm flex items-center justify-center shadow-sm"
            title="کوچک‌نمایی"
          >
            -
          </button>
        </div>

        {/* Studio Location Card Tag */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EAE3DA] shadow-lg max-w-xs text-right">
          <div className="flex items-center gap-2 text-[#701A23]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="font-extrabold text-xs">استودیو و شو روم نیلوفر</span>
          </div>
          <p className="text-[11px] text-[#574E52] mt-1 leading-relaxed">
            تهران، خیابان فرشته (شهید بیدار)، پلاک ۴۲، طبقه ۳
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#EAE3DA]">
        <div className="flex items-center gap-4 text-[#574E52]">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#701A23]" />
            ساعات کاری: شنبه تا پنج‌شنبه (۱۰ تا ۲۰)
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-[#701A23]" />
            پذیرش حضوری با وقت قبلی
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://maps.google.com/?q=Tehran+Fereshteh"
            target="_blank"
            rel="noreferrer"
            className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-2 px-4 rounded-xl transition-all shadow flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>مسیریابی هوشمند</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};
