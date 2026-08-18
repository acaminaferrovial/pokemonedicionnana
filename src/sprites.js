// ============================================================
//  SPRITES — Pokémon Edición Bizcochín
//  Todas las definiciones SVG de personajes y Pokémon.
// ============================================================
'use strict';

const SPRITES = {

  // ── POKÉMON ────────────────────────────────────────────

  torchic: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="62" cy="68" rx="11" ry="14" fill="#ff8c00" opacity=".7"/>
    <ellipse cx="62" cy="59" rx="7" ry="9" fill="#ffbb00"/>
    <ellipse cx="62" cy="53" rx="5" ry="6" fill="#ffe066"/>
    <path d="M40 65 Q52 60 60 70" stroke="#e05010" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="56" rx="19" ry="15" fill="#fb923c"/>
    <ellipse cx="36" cy="58" rx="12" ry="10" fill="#fde68a"/>
    <ellipse cx="22" cy="57" rx="6" ry="5" fill="#fb923c" transform="rotate(-30 22 57)"/>
    <ellipse cx="50" cy="57" rx="6" ry="5" fill="#fb923c" transform="rotate(30 50 57)"/>
    <ellipse cx="27" cy="69" rx="8" ry="5" fill="#fb923c"/>
    <ellipse cx="45" cy="69" rx="8" ry="5" fill="#fb923c"/>
    <circle cx="36" cy="36" r="18" fill="#fb923c"/>
    <circle cx="28" cy="32" r="5.5" fill="white"/>
    <circle cx="44" cy="32" r="5.5" fill="white"/>
    <circle cx="29" cy="32" r="3.5" fill="#111"/>
    <circle cx="45" cy="32" r="3.5" fill="#111"/>
    <circle cx="30" cy="31" r="1.2" fill="white"/>
    <circle cx="46" cy="31" r="1.2" fill="white"/>
    <circle cx="34" cy="40" r="1.5" fill="#c04010" opacity=".6"/>
    <circle cx="39" cy="40" r="1.5" fill="#c04010" opacity=".6"/>
    <path d="M30 44 Q36 48 42 44" stroke="#c04010" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  togepi: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="52" rx="26" ry="22" fill="#fffde7"/>
    <polygon points="25,30 22,14 30,26" fill="#ef5350"/>
    <polygon points="40,26 38,10 44,24" fill="#42a5f5"/>
    <polygon points="55,30 60,14 52,26" fill="#ef5350"/>
    <ellipse cx="40" cy="50" rx="22" ry="18" fill="#fff8e1"/>
    <ellipse cx="40" cy="62" rx="26" ry="12" fill="#ffe082"/>
    <circle cx="29" cy="40" r="7" fill="#ef5350" opacity=".7"/>
    <circle cx="51" cy="40" r="7" fill="#ef5350" opacity=".7"/>
    <circle cx="28" cy="36" r="5" fill="white"/>
    <circle cx="52" cy="36" r="5" fill="white"/>
    <circle cx="29" cy="36" r="3" fill="#111"/>
    <circle cx="53" cy="36" r="3" fill="#111"/>
    <circle cx="30" cy="35" r="1" fill="white"/>
    <circle cx="54" cy="35" r="1" fill="white"/>
    <ellipse cx="40" cy="48" rx="5" ry="3" fill="#ffcc80" opacity=".6"/>
    <ellipse cx="30" cy="68" rx="6" ry="4" fill="#ffe082"/>
    <ellipse cx="50" cy="68" rx="6" ry="4" fill="#ffe082"/>
  </svg>`,

  eevee: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 55 Q72 50 70 65 Q60 68 55 62Z" fill="#d4a76a"/>
    <ellipse cx="36" cy="56" rx="20" ry="16" fill="#c8853a"/>
    <ellipse cx="36" cy="55" rx="13" ry="11" fill="#f5deb3"/>
    <ellipse cx="20" cy="52" rx="7" ry="5" fill="#c8853a" transform="rotate(-25 20 52)"/>
    <ellipse cx="52" cy="52" rx="7" ry="5" fill="#c8853a" transform="rotate(25 52 52)"/>
    <ellipse cx="27" cy="70" rx="8" ry="5" fill="#c8853a"/>
    <ellipse cx="45" cy="70" rx="8" ry="5" fill="#c8853a"/>
    <circle cx="36" cy="36" r="20" fill="#c8853a"/>
    <ellipse cx="36" cy="26" rx="18" ry="12" fill="#f5deb3"/>
    <polygon points="22,22 16,6 28,18" fill="#c8853a"/>
    <polygon points="50,22 56,6 44,18" fill="#c8853a"/>
    <polygon points="24,21 18,8 29,18" fill="#ffebcd"/>
    <polygon points="48,21 54,8 43,18" fill="#ffebcd"/>
    <circle cx="28" cy="30" r="5.5" fill="white"/>
    <circle cx="44" cy="30" r="5.5" fill="white"/>
    <circle cx="29" cy="30" r="3.5" fill="#111"/>
    <circle cx="45" cy="30" r="3.5" fill="#111"/>
    <circle cx="30" cy="29" r="1.2" fill="white"/>
    <circle cx="46" cy="29" r="1.2" fill="white"/>
    <circle cx="36" cy="38" r="2" fill="#b8621a"/>
    <path d="M29 42 Q36 47 43 42" stroke="#b8621a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  growlithe: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="38" cy="56" rx="20" ry="16" fill="#f97316"/>
    <ellipse cx="22" cy="50" rx="8" ry="6" fill="#f97316" transform="rotate(-20 22 50)"/>
    <ellipse cx="54" cy="50" rx="8" ry="6" fill="#f97316" transform="rotate(20 54 50)"/>
    <ellipse cx="27" cy="70" rx="9" ry="6" fill="#f97316"/>
    <ellipse cx="49" cy="70" rx="9" ry="6" fill="#f97316"/>
    <path d="M56 50 Q68 44 66 60" stroke="#f97316" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="38" cy="44" rx="8" ry="5" fill="#1a1a1a" opacity=".15"/>
    <circle cx="38" cy="36" r="20" fill="#f97316"/>
    <ellipse cx="28" cy="28" rx="4" ry="8" fill="#1a1a1a" opacity=".2" transform="rotate(-10 28 28)"/>
    <ellipse cx="48" cy="28" rx="4" ry="8" fill="#1a1a1a" opacity=".2" transform="rotate(10 48 28)"/>
    <circle cx="28" cy="30" r="6" fill="white"/>
    <circle cx="48" cy="30" r="6" fill="white"/>
    <circle cx="29" cy="30" r="4" fill="#111"/>
    <circle cx="49" cy="30" r="4" fill="#111"/>
    <circle cx="30" cy="29" r="1.4" fill="white"/>
    <circle cx="50" cy="29" r="1.4" fill="white"/>
    <ellipse cx="38" cy="42" rx="8" ry="5" fill="#fde68a"/>
    <circle cx="36" cy="40" r="2" fill="#1a1a1a"/>
    <circle cx="40" cy="40" r="2" fill="#1a1a1a"/>
    <path d="M28 46 Q38 54 48 46" stroke="#1a1a1a" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  chansey: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="55" rx="26" ry="22" fill="#f9a8d4"/>
    <ellipse cx="22" cy="50" rx="9" ry="7" fill="#f9a8d4"/>
    <ellipse cx="58" cy="50" rx="9" ry="7" fill="#f9a8d4"/>
    <ellipse cx="28" cy="68" rx="10" ry="7" fill="#f9a8d4"/>
    <ellipse cx="52" cy="68" rx="10" ry="7" fill="#f9a8d4"/>
    <ellipse cx="40" cy="58" rx="16" ry="13" fill="#fce7f3"/>
    <ellipse cx="40" cy="62" rx="10" ry="8" fill="#f472b6" opacity=".3"/>
    <ellipse cx="40" cy="64" rx="8" ry="6" fill="#f472b6" opacity=".2"/>
    <circle cx="40" cy="34" r="20" fill="#f9a8d4"/>
    <circle cx="28" cy="30" r="5.5" fill="white"/>
    <circle cx="52" cy="30" r="5.5" fill="white"/>
    <circle cx="29" cy="30" r="3.5" fill="#111"/>
    <circle cx="53" cy="30" r="3.5" fill="#111"/>
    <circle cx="30" cy="29" r="1.2" fill="white"/>
    <circle cx="54" cy="29" r="1.2" fill="white"/>
    <circle cx="22" cy="36" r="6" fill="#f472b6" opacity=".6"/>
    <circle cx="58" cy="36" r="6" fill="#f472b6" opacity=".6"/>
    <circle cx="40" cy="38" r="3" fill="#db2777" opacity=".5"/>
    <path d="M33 44 Q40 50 47 44" stroke="#db2777" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  pikachu: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <polygon points="52,60 58,46 54,54 62,40 56,50 62,36" fill="#facc15"/>
    <polygon points="18,16 14,4 26,12" fill="#facc15"/>
    <polygon points="19,16 15,5 24,12" fill="#111" opacity=".85"/>
    <polygon points="46,16 50,4 38,12" fill="#facc15"/>
    <polygon points="45,16 49,5 40,12" fill="#111" opacity=".85"/>
    <ellipse cx="36" cy="56" rx="21" ry="17" fill="#facc15"/>
    <ellipse cx="36" cy="58" rx="13" ry="10" fill="#fde68a"/>
    <ellipse cx="16" cy="54" rx="7" ry="5" fill="#facc15" transform="rotate(-30 16 54)"/>
    <ellipse cx="56" cy="54" rx="7" ry="5" fill="#facc15" transform="rotate(30 56 54)"/>
    <ellipse cx="26" cy="70" rx="8" ry="5" fill="#facc15"/>
    <ellipse cx="46" cy="70" rx="8" ry="5" fill="#facc15"/>
    <circle cx="36" cy="36" r="20" fill="#facc15"/>
    <circle cx="20" cy="41" r="7" fill="#ef4444" opacity=".85"/>
    <circle cx="52" cy="41" r="7" fill="#ef4444" opacity=".85"/>
    <circle cx="27" cy="31" r="5.5" fill="#111"/>
    <circle cx="45" cy="31" r="5.5" fill="#111"/>
    <circle cx="28" cy="30" r="1.8" fill="white"/>
    <circle cx="46" cy="30" r="1.8" fill="white"/>
    <circle cx="36" cy="38" r="1.5" fill="#8b6000"/>
    <path d="M29 43 Q36 48 43 43" stroke="#8b6000" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  bizcochin: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="50" rx="28" ry="24" fill="#fbbf24" opacity=".18"/>
    <ellipse cx="40" cy="50" rx="24" ry="20" fill="#fbbf24" opacity=".25"/>
    <path d="M40 28 Q38 14 34 10 Q40 18 46 10 Q42 14 40 28Z" fill="#fbbf24"/>
    <circle cx="40" cy="52" r="22" fill="#fef08a"/>
    <ellipse cx="40" cy="54" rx="14" ry="12" fill="#fef9c3"/>
    <ellipse cx="22" cy="56" rx="8" ry="6" fill="#fef08a" transform="rotate(-20 22 56)"/>
    <ellipse cx="58" cy="56" rx="8" ry="6" fill="#fef08a" transform="rotate(20 58 56)"/>
    <ellipse cx="28" cy="70" rx="9" ry="6" fill="#fef08a"/>
    <ellipse cx="52" cy="70" rx="9" ry="6" fill="#fef08a"/>
    <circle cx="40" cy="38" r="18" fill="#fef08a"/>
    <circle cx="30" cy="34" r="6" fill="white"/>
    <circle cx="50" cy="34" r="6" fill="white"/>
    <circle cx="31" cy="34" r="4" fill="#1a1a1a"/>
    <circle cx="51" cy="34" r="4" fill="#1a1a1a"/>
    <circle cx="32" cy="33" r="1.4" fill="white"/>
    <circle cx="52" cy="33" r="1.4" fill="white"/>
    <circle cx="22" cy="40" r="5" fill="#fb7185" opacity=".7"/>
    <circle cx="58" cy="40" r="5" fill="#fb7185" opacity=".7"/>
    <ellipse cx="40" cy="44" rx="4" ry="3" fill="#f59e0b"/>
    <path d="M33 50 Q40 56 47 50" stroke="#d97706" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="14" r="5" fill="#fbbf24" opacity=".5"/>
    <circle cx="40" cy="14" r="3" fill="#fde68a" opacity=".7"/>
  </svg>`,

  // ── PERSONAJES ─────────────────────────────────────────

  professor: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="40" width="30" height="32" rx="4" fill="#f0f4f8"/>
    <rect x="5"  y="44" width="14" height="24" rx="4" fill="#f0f4f8"/>
    <rect x="41" y="44" width="14" height="24" rx="4" fill="#f0f4f8"/>
    <rect x="18" y="66" width="10" height="14" rx="4" fill="#64748b"/>
    <rect x="32" y="66" width="10" height="14" rx="4" fill="#64748b"/>
    <circle cx="30" cy="28" r="18" fill="#fde68a"/>
    <ellipse cx="30" cy="20" rx="16" ry="10" fill="#e2c46a"/>
    <rect x="14" y="22" width="5" height="9" rx="2" fill="#e2c46a"/>
    <rect x="41" y="22" width="5" height="9" rx="2" fill="#e2c46a"/>
    <circle cx="22" cy="28" r="4" fill="white"/>
    <circle cx="38" cy="28" r="4" fill="white"/>
    <circle cx="22" cy="28" r="2.5" fill="#1e3a5f"/>
    <circle cx="38" cy="28" r="2.5" fill="#1e3a5f"/>
    <circle cx="23" cy="27" r="0.8" fill="white"/>
    <circle cx="39" cy="27" r="0.8" fill="white"/>
    <path d="M24 36 Q30 40 36 36" stroke="#c08040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <rect x="22" y="40" width="16" height="3" rx="1.5" fill="#38bdf8"/>
  </svg>`,

  alberto: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#4ade80"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#4ade80"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#4ade80"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#1e3a5f"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#1e3a5f"/>
    <circle cx="30" cy="26" r="18" fill="#fde68a"/>
    <ellipse cx="30" cy="16" rx="14" ry="8" fill="#92400e"/>
    <rect x="16" y="18" width="4" height="10" rx="2" fill="#92400e"/>
    <rect x="40" y="18" width="4" height="10" rx="2" fill="#92400e"/>
    <circle cx="22" cy="26" r="4.5" fill="white"/>
    <circle cx="38" cy="26" r="4.5" fill="white"/>
    <circle cx="22" cy="26" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="26" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="25" r="0.9" fill="white"/>
    <circle cx="39" cy="25" r="0.9" fill="white"/>
    <path d="M22 34 Q30 40 38 34" stroke="#c08040" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M24 37 Q30 44 36 37" stroke="#c08040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  andrea: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#e879f9"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#e879f9"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#e879f9"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#7c3aed"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#7c3aed"/>
    <circle cx="30" cy="26" r="18" fill="#fde68a"/>
    <path d="M12,22 Q30,8 48,22 Q48,38 40,42 Q30,32 20,42 Q12,38 12,22Z" fill="#92400e"/>
    <circle cx="22" cy="27" r="4.5" fill="white"/>
    <circle cx="38" cy="27" r="4.5" fill="white"/>
    <circle cx="22" cy="27" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="27" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="26" r="0.9" fill="white"/>
    <circle cx="39" cy="26" r="0.9" fill="white"/>
    <circle cx="18" cy="32" r="3.5" fill="#fb7185" opacity=".5"/>
    <circle cx="42" cy="32" r="3.5" fill="#fb7185" opacity=".5"/>
    <path d="M24 36 Q30 41 36 36" stroke="#c08040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  jose: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#fb923c"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#fb923c"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#fb923c"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#1e3a5f"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#1e3a5f"/>
    <circle cx="30" cy="26" r="18" fill="#fde68a"/>
    <ellipse cx="30" cy="16" rx="12" ry="7" fill="#451a03"/>
    <circle cx="22" cy="26" r="4.5" fill="white"/>
    <circle cx="38" cy="26" r="4.5" fill="white"/>
    <circle cx="22" cy="26" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="26" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="25" r="0.9" fill="white"/>
    <circle cx="39" cy="25" r="0.9" fill="white"/>
    <path d="M28 34 Q30 32 32 34" stroke="#451a03" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M22 38 Q30 44 38 38" stroke="#c08040" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  marcos: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#38bdf8"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#38bdf8"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#38bdf8"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#0c4a6e"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#0c4a6e"/>
    <circle cx="30" cy="26" r="18" fill="#fde68a"/>
    <rect x="14" y="14" width="32" height="10" rx="5" fill="#0c4a6e"/>
    <rect x="14" y="18" width="32" height="8" rx="4" fill="#0369a1"/>
    <circle cx="22" cy="27" r="4.5" fill="white"/>
    <circle cx="38" cy="27" r="4.5" fill="white"/>
    <circle cx="22" cy="27" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="27" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="26" r="0.9" fill="white"/>
    <circle cx="39" cy="26" r="0.9" fill="white"/>
    <path d="M24 36 Q30 41 36 36" stroke="#c08040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  valentin: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#a78bfa"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#a78bfa"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#a78bfa"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#4c1d95"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#4c1d95"/>
    <circle cx="30" cy="26" r="18" fill="#f5f0e0"/>
    <path d="M12,20 Q20,6 30,10 Q40,6 48,20 Q44,8 30,6 Q16,8 12,20Z" fill="#e0d0a0"/>
    <rect x="16" y="12" width="28" height="6" rx="3" fill="#e0d0a0"/>
    <circle cx="22" cy="28" r="4.5" fill="white"/>
    <circle cx="38" cy="28" r="4.5" fill="white"/>
    <circle cx="22" cy="28" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="28" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="27" r="0.9" fill="white"/>
    <circle cx="39" cy="27" r="0.9" fill="white"/>
    <path d="M28 35 Q30 32 32 35" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M22 38 Q30 46 38 38" stroke="#a08060" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  abuela: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="40" width="32" height="34" rx="4" fill="#86efac"/>
    <rect x="4"  y="44" width="14" height="22" rx="4" fill="#86efac"/>
    <rect x="42" y="44" width="14" height="22" rx="4" fill="#86efac"/>
    <rect x="18" y="68" width="10" height="12" rx="4" fill="#166534"/>
    <rect x="32" y="68" width="10" height="12" rx="4" fill="#166534"/>
    <circle cx="30" cy="26" r="18" fill="#f5f0e0"/>
    <path d="M12,22 Q14,6 30,8 Q46,6 48,22 Q44,14 30,12 Q16,14 12,22Z" fill="#e0e0e0"/>
    <circle cx="22" cy="28" r="4.5" fill="white"/>
    <circle cx="38" cy="28" r="4.5" fill="white"/>
    <circle cx="22" cy="28" r="2.8" fill="#1e3a5f"/>
    <circle cx="38" cy="28" r="2.8" fill="#1e3a5f"/>
    <circle cx="23" cy="27" r="0.9" fill="white"/>
    <circle cx="39" cy="27" r="0.9" fill="white"/>
    <circle cx="18" cy="32" r="3" fill="#fb7185" opacity=".4"/>
    <circle cx="42" cy="32" r="3" fill="#fb7185" opacity=".4"/>
    <path d="M26 37 Q30 42 34 37" stroke="#a08060" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  statue: `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="55" width="24" height="25" rx="4" fill="#a1a1aa"/>
    <rect x="14" y="50" width="32" height="10" rx="2" fill="#71717a"/>
    <circle cx="30" cy="32" r="22" fill="#d4a76a"/>
    <ellipse cx="30" cy="24" rx="16" ry="10" fill="#b8860b"/>
    <circle cx="20" cy="32" r="5" fill="white"/>
    <circle cx="40" cy="32" r="5" fill="white"/>
    <circle cx="20" cy="32" r="3" fill="#111"/>
    <circle cx="40" cy="32" r="3" fill="#111"/>
    <path d="M24 42 Q30 46 36 42" stroke="#8b6000" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

};

// Pollito pequeño para el tren (usado en el bosque)
SPRITES.pollito_mini = `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="15" r="12" fill="#fef08a"/>
  <circle cx="10" cy="12" r="3" fill="white"/>
  <circle cx="20" cy="12" r="3" fill="white"/>
  <circle cx="10" cy="12" r="2" fill="#111"/>
  <circle cx="20" cy="12" r="2" fill="#111"/>
  <ellipse cx="15" cy="20" rx="5" ry="3" fill="#fde68a"/>
  <ellipse cx="15" cy="17" rx="3" ry="2" fill="#f59e0b"/>
</svg>`;
