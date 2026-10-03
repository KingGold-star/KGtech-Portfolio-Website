/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

interface HeroPortraitProps {
  imageSrc?: string;
  className?: string;
}

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ 
  imageSrc = '/images/praise_portrait.png', 
  className = '' 
}) => {
  const [photo, setPhoto] = useState<string>(imageSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check localStorage for persisted user photo
    try {
      const savedPhoto = localStorage.getItem('praise_portrait_photo');
      if (savedPhoto) {
        setPhoto(savedPhoto);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhoto(result);
        setHasError(false);
        try {
          localStorage.setItem('praise_portrait_photo', result);
        } catch {
          // Ignore quota errors
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoto('/images/praise_portrait.png');
    setHasError(false);
    try {
      localStorage.removeItem('praise_portrait_photo');
    } catch {
      // Ignore
    }
  };

  return (
    <div className={`relative flex items-end justify-center select-none group ${className}`}>
      
      {/* Hidden File Input to load Praise_portfolio */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload photo of Praise"
      />

      {photo && !hasError ? (
        /* Rendered Real Image Cutout of Praise - 100% completely blended background */
        <div className="relative z-10 flex justify-center pb-2 sm:pb-4 max-w-full">
          <img
            src={photo}
            alt="Praise Egburedi - Lead Developer & UI/UX Architect"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-[360px] sm:h-[520px] md:h-[620px] lg:h-[700px] xl:h-[780px] w-auto max-w-[88vw] sm:max-w-none object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.07)] transition-transform duration-300 group-hover:scale-[1.01] [mask-image:linear-gradient(to_bottom,#000_0%,#000_68%,rgba(0,0,0,0.85)_76%,rgba(0,0,0,0.4)_84%,rgba(0,0,0,0.08)_90%,transparent_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_68%,rgba(0,0,0,0.85)_76%,rgba(0,0,0,0.4)_84%,rgba(0,0,0,0.08)_90%,transparent_94%,transparent_100%)]"
          />

          {/* Seamless bottom fade into pure white canvas - zero edges or artifacts */}
          <div 
            className="pointer-events-none absolute -bottom-3 inset-x-0 h-28 sm:h-44 bg-gradient-to-t from-white via-white/80 to-transparent z-15"
            aria-hidden="true"
          />
        </div>
      ) : (
        /* High-fidelity Vector Portrait matching the uploaded photo:
           - Navy Blue Suit Jacket
           - White Collared Dress Shirt & Solid Navy Tie
           - Blue-tinted rimless sunglasses with gold bridge
           - Gold luxury wristwatch & bead bracelet on left wrist
           - Confident warm smile with clean teeth
           - Three-quarter stance
        */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative z-10 w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px] flex justify-center cursor-pointer"
          title="Click to load Praise_portfolio image file"
        >
          <svg
            viewBox="0 0 420 540"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.16)]"
          >
            <defs>
              {/* Skin Tone Gradients matching Praise's rich complexion */}
              <linearGradient id="praiseSkin" x1="200" y1="80" x2="260" y2="240" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6C452F" />
                <stop offset="0.4" stopColor="#5A3723" />
                <stop offset="1" stopColor="#432616" />
              </linearGradient>
              <linearGradient id="praiseSkinHighlight" x1="210" y1="90" x2="240" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7F5238" />
                <stop offset="1" stopColor="#5A3723" />
              </linearGradient>

              {/* Suit Jacket - Dark Navy Tailored Fabric */}
              <linearGradient id="suitNavy" x1="120" y1="240" x2="320" y2="520" gradientUnits="userSpaceOnUse">
                <stop stopColor="#222F43" />
                <stop offset="0.5" stopColor="#182333" />
                <stop offset="1" stopColor="#0E1622" />
              </linearGradient>
              <linearGradient id="suitLapel" x1="180" y1="260" x2="260" y2="440" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2B3A52" />
                <stop offset="1" stopColor="#182333" />
              </linearGradient>

              {/* Navy Necktie */}
              <linearGradient id="tieNavy" x1="225" y1="280" x2="245" y2="450" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E2A3A" />
                <stop offset="0.5" stopColor="#151E2B" />
                <stop offset="1" stopColor="#0C121A" />
              </linearGradient>

              {/* Blue Tinted Sunglasses Lenses */}
              <linearGradient id="blueLenses" x1="180" y1="135" x2="270" y2="155" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" stopOpacity="0.82" />
                <stop offset="0.5" stopColor="#6366F1" stopOpacity="0.85" />
                <stop offset="1" stopColor="#1D4ED8" stopOpacity="0.8" />
              </linearGradient>

              {/* Gold Watch & Hardware */}
              <linearGradient id="goldGrad" x1="240" y1="470" x2="280" y2="510" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.3" stopColor="#EAB308" />
                <stop offset="0.7" stopColor="#CA8A04" />
                <stop offset="1" stopColor="#A16207" />
              </linearGradient>
            </defs>

            {/* Body / Suit Torso - Turned in 3/4 pose (facing viewer's left) */}
            {/* Back of Right Shoulder */}
            <path
              d="M165 260 C125 280 85 330 65 390 C45 440 40 500 35 540 L195 540 L210 330 Z"
              fill="#121B27"
            />

            {/* Left Shoulder & Arm (Turned towards front/left) */}
            <path
              d="M210 260 C260 270 330 310 360 380 C375 420 385 470 385 540 L240 540 L220 380 Z"
              fill="url(#suitNavy)"
            />

            {/* Suit Back Collar */}
            <path
              d="M175 240 C200 230 250 232 270 248 L275 275 C240 268 200 268 170 275 Z"
              fill="#101824"
            />

            {/* Neck */}
            <path
              d="M195 190 L195 260 C205 268 245 268 255 255 L255 190 Z"
              fill="#432616"
            />
            <path
              d="M200 195 L200 250 C210 258 240 258 250 250 L250 195 Z"
              fill="url(#praiseSkin)"
            />

            {/* Crisp White Collared Dress Shirt */}
            <path
              d="M190 255 L215 285 L235 280 L220 250 Z"
              fill="#FFFFFF"
            />
            <path
              d="M255 255 L235 285 L225 280 L235 250 Z"
              fill="#EDF2F7"
            />

            {/* Solid Navy Necktie */}
            {/* Tie Knot */}
            <polygon points="222,275 238,275 235,295 225,295" fill="#151E2B" />
            {/* Tie Body */}
            <polygon points="224,295 236,295 242,425 230,445 218,425" fill="url(#tieNavy)" />

            {/* Tailored Suit Lapels & Front */}
            {/* Left Lapel (prominent in 3/4 pose) */}
            <path
              d="M175 255 L165 315 L215 425 L230 425 L190 280 Z"
              fill="url(#suitLapel)"
            />
            {/* Right Lapel */}
            <path
              d="M265 255 L275 320 L235 435 L220 435 L245 280 Z"
              fill="url(#suitLapel)"
            />

            {/* Suit Blazer Front Overlap & Buttons */}
            <path
              d="M185 410 L235 440 L230 540 L160 540 Z"
              fill="#151E2A"
            />
            <circle cx="232" cy="455" r="3.5" fill="#0A0F16" stroke="#2B3A52" strokeWidth="0.8" />
            <circle cx="230" cy="495" r="3.5" fill="#0A0F16" stroke="#2B3A52" strokeWidth="0.8" />

            {/* Left Forearm & Hand in 3/4 pose (resting across lower waist) */}
            <path
              d="M330 430 C310 460 270 480 240 485 L250 515 C285 510 325 480 345 450 Z"
              fill="url(#suitNavy)"
            />
            {/* White shirt cuff peeking out */}
            <polygon points="248,476 258,478 254,488 244,486" fill="#FFFFFF" />

            {/* Luxury Gold Watch on Left Wrist */}
            <g id="goldWatch">
              {/* Gold Bracelet Band */}
              <path d="M246 478 L262 481 L258 497 L242 494 Z" fill="url(#goldGrad)" />
              {/* Watch Case / Bezel */}
              <circle cx="253" cy="488" r="9.5" fill="url(#goldGrad)" stroke="#78350F" strokeWidth="0.8" />
              {/* Watch Black Dial */}
              <circle cx="253" cy="488" r="7" fill="#09090B" />
              {/* Watch Hands */}
              <line x1="253" y1="488" x2="253" y2="483" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
              <line x1="253" y1="488" x2="257" y2="488" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
              <circle cx="253" cy="488" r="1" fill="#FDE047" />
            </g>

            {/* Black Bead Bracelet next to watch */}
            <g id="beadBracelet">
              <circle cx="242" cy="498" r="2.5" fill="#1C1917" />
              <circle cx="247" cy="500" r="2.5" fill="#1C1917" />
              <circle cx="252" cy="502" r="2.5" fill="#FFFFFF" />
              <circle cx="257" cy="503" r="2.5" fill="#1C1917" />
              <circle cx="262" cy="503" r="2.5" fill="#1C1917" />
            </g>

            {/* Left Hand Fingers (Clasped at waist) */}
            <path
              d="M245 496 C240 505 242 518 248 524 C255 530 270 528 275 518 L265 500 Z"
              fill="url(#praiseSkin)"
            />

            {/* ================================================================= */}
            {/* HEAD, FACIAL FEATURES & SUNGLASSES (MATCHING EXACT PHOTO) */}
            {/* ================================================================= */}
            {/* Head Contour (slight 3/4 tilt) */}
            <path
              d="M185 130 C185 75 275 70 278 125 C280 165 268 220 232 225 C195 228 185 180 185 130 Z"
              fill="url(#praiseSkin)"
            />
            {/* Forehead & Cheek Highlights */}
            <path
              d="M205 110 C215 95 250 95 260 110 C265 140 245 160 215 150 Z"
              fill="url(#praiseSkinHighlight)"
              opacity="0.6"
            />

            {/* Clean Buzzcut Hairstyle with Sharp Hairline */}
            <path
              d="M185 125 C185 78 215 65 245 68 C270 70 280 95 278 128 C275 105 265 82 245 80 C220 78 198 95 185 125 Z"
              fill="#18110D"
            />
            {/* Hair texture / Fade shading */}
            <path
              d="M185 135 C185 110 195 88 215 82 C240 76 265 82 276 105 C272 90 258 78 240 78 C218 78 198 95 185 135 Z"
              fill="#261A14"
              opacity="0.8"
            />

            {/* Ears */}
            <ellipse cx="183" cy="155" rx="6" ry="14" fill="url(#praiseSkin)" />
            <ellipse cx="277" cy="158" rx="6" ry="14" fill="url(#praiseSkin)" />

            {/* Eyes behind lenses (Visible through gradient tint) */}
            <ellipse cx="212" cy="144" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="212" cy="144" r="2.5" fill="#26160D" />
            <ellipse cx="258" cy="146" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="258" cy="146" r="2.5" fill="#26160D" />

            {/* DISTINCTIVE LUXURY SUNGLASSES (Blue-tinted rectangular rimless with gold hardware) */}
            <g id="blueTintedSunglasses">
              {/* Left Lens */}
              <rect
                x="195"
                y="132"
                width="34"
                height="24"
                rx="4"
                fill="url(#blueLenses)"
                stroke="#FDE047"
                strokeWidth="1.2"
                className="drop-shadow-xs"
              />
              {/* Left Lens Top Reflection Accent */}
              <path d="M198 135 L225 135" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

              {/* Right Lens */}
              <rect
                x="241"
                y="134"
                width="34"
                height="24"
                rx="4"
                fill="url(#blueLenses)"
                stroke="#FDE047"
                strokeWidth="1.2"
                className="drop-shadow-xs"
              />
              {/* Right Lens Top Reflection Accent */}
              <path d="M244 137 L271 137" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

              {/* Gold Nose Bridge */}
              <path d="M229 142 Q235 138 241 142" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Gold Temple Hinges */}
              <rect x="191" y="138" width="4.5" height="3" rx="1" fill="url(#goldGrad)" />
              <rect x="275" y="140" width="4.5" height="3" rx="1" fill="url(#goldGrad)" />
            </g>

            {/* Nose Contour */}
            <path
              d="M232 152 L228 174 Q232 178 238 175"
              stroke="#432616"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Thin Trim Mustache */}
            <path
              d="M222 186 Q234 183 246 186"
              stroke="#2B1A12"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Warm Welcoming Smile showing clean white teeth */}
            <g id="warmSmile">
              {/* Outer Lips */}
              <path
                d="M218 193 C228 206 242 206 252 193 C245 198 225 198 218 193 Z"
                fill="#3A1F13"
              />
              {/* White Teeth */}
              <path
                d="M222 194 C228 200 242 200 248 194 Z"
                fill="#FFFFFF"
              />
              {/* Lower Lip Contour */}
              <path
                d="M224 205 Q235 208 246 205"
                stroke="#542F1C"
                strokeWidth="1.5"
                fill="none"
              />
            </g>

            {/* Subtle Goatee / Chin Beard */}
            <ellipse cx="235" cy="214" rx="8" ry="3" fill="#2B1A12" opacity="0.5" />
          </svg>
        </div>
      )}

    </div>
  );
};
