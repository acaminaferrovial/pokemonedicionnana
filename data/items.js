// ============================================================
//  ITEMS DATA — Pokémon Edición Bizcochín
// ============================================================
'use strict';

const ITEMS = {
  // ─── OBJETOS DE AMOR ────────────────────────────────────
  nana_ball: {
    name: 'NANA BALL',
    icon: '🌟',
    category: 'amor',
    desc: 'Una Poké Ball única en el mundo, tejida con hilos de ternura y templada con el calor de un hogar. Dicen que no necesita fuerza para atrapar: solo un corazón dispuesto a amar para siempre.',
    unique: true,
  },
  gorro_pollital: {
    name: 'GORRO POLLITAL',
    icon: '🐣',
    category: 'amor',
    desc: 'Un gorrito amarillo súper suave con crestita de pollito. Alberto te lo pone con una sonrisa y te queda monísimo.',
    unique: true,
  },
  medalla_ternura: {
    name: 'MEDALLA TERNURA',
    icon: '💛',
    category: 'amor',
    desc: 'Otorgada por Don Valentín. Al examinarla se oye el latido suave de Bizcochín: ¡Pum-pum!',
    unique: true,
    onUse: 'sfx_heartbeat',
  },
  kit_aventura: {
    name: 'KIT DE AVENTURA',
    icon: '🎒',
    category: 'amor',
    desc: 'Un kit especial preparado con todo lo que una gran entrenadora necesita para su aventura más importante.',
    unique: true,
  },

  // ─── CURATIVAS ──────────────────────────────────────────
  pocion_cumple: {
    name: 'POCIÓN DE CUMPLEAÑOS',
    icon: '🎂',
    category: 'objetos',
    desc: 'Una poción especial con sabor a tarta de fresas. Restaura 20 PS al Pokémon elegido.',
    count: 3,
    healAmount: 20,
  },
  baya_dulce: {
    name: 'BAYA DULCE',
    icon: '🍓',
    category: 'bayas',
    desc: 'Una baya jugosa y dulcísima. Restaura 10 PS al Pokémon que la lleva.',
    count: 1,
    healAmount: 10,
  },
  baya_melocoton: {
    name: 'BAYA MELOCOTÓN',
    icon: '🍑',
    category: 'bayas',
    desc: 'Regalo de la Abuela Tejedora del Bosque. Restaura 15 PS y tiene un sabor increíble.',
    count: 1,
    healAmount: 15,
  },

  // ─── RECUERDOS (coleccionables) ─────────────────────────
  entrada_cine: {
    name: 'ENTRADA DE CINE VIEJA',
    icon: '🎬',
    category: 'recuerdos',
    desc: 'La encontraste en un arbusto de la Ruta 1. Te trae recuerdos de vuestras primeras citas y de cuando no os poníais de acuerdo con las palomitas.',
    unique: true,
  },
  foto_escapada: {
    name: 'FOTO INSTANTÁNEA',
    icon: '📸',
    category: 'recuerdos',
    desc: 'Una foto de una escapada improvisada donde todo salió regular... pero os reísteis como nunca.',
    unique: true,
  },
  llavero_viaje: {
    name: 'LLAVERO DE VIAJE',
    icon: '🗝️',
    category: 'recuerdos',
    desc: 'Recuerdo de aquella escapada donde todo fue perfecto.',
    unique: true,
  },
  chupete_dorado: {
    name: 'CHUPETE DORADO',
    icon: '⭐',
    category: 'recuerdos',
    desc: 'Una señal de que lo mejor de vuestras vidas está a punto de llegar.',
    unique: true,
  },
};
