// ============================================================
//  POKEMON DATA — Pokémon Edición Bizcochín
// ============================================================
'use strict';

const MOVE_DATA = {
  // Físicos
  scratch:      { name:'ARAÑAZO',        type:'normal',   power:40,  pp:35 },
  tackle:       { name:'PLACAJE',         type:'normal',   power:40,  pp:35 },
  quick_attack: { name:'ATAQUE RÁPIDO',   type:'normal',   power:40,  pp:30 },
  headbutt:     { name:'CABEZAZO',        type:'normal',   power:70,  pp:15 },
  bite:         { name:'MORDISCO',        type:'normal',   power:60,  pp:25 },
  // Especiales
  ember:        { name:'ASCUAS',          type:'fire',     power:40,  pp:25 },
  flamethrower: { name:'LANZALLAMAS',     type:'fire',     power:90,  pp:15 },
  water_gun:    { name:'PISTOLA AGUA',    type:'water',    power:40,  pp:25 },
  bubble:       { name:'BURBUJA',         type:'water',    power:40,  pp:30 },
  metronome:    { name:'METRÓNOMO',       type:'normal',   power:50,  pp:10 },
  swift:        { name:'RAPIDEZ',         type:'normal',   power:60,  pp:20 },
  charm:        { name:'ENCANTO',         type:'fairy',    power:50,  pp:20 },
  egg_bomb:     { name:'BOMBA HUEVO',     type:'normal',   power:100, pp:10 },
  soft_boiled:  { name:'SUAVIZADO',       type:'normal',   power:0,   pp:10, eff:'heal' },
  // Status
  growl:        { name:'GRUÑIDO',         type:'normal',   power:0,   pp:40, eff:'lower_atk' },
  withdraw:     { name:'RETIRADA',        type:'water',    power:0,   pp:40, eff:'raise_def' },
  sing:         { name:'CANTO',           type:'normal',   power:0,   pp:15, eff:'lower_atk' },
  sweet_kiss:   { name:'BESO DULCE',      type:'fairy',    power:0,   pp:10, eff:'lower_atk' },
  // Alberto's love moves (special — buff the player)
  love_cheer1:  { name:'¡LO LOGRARÁS!',  type:'love',     power:0,   pp:5,  eff:'buff_player_atk' },
  love_cheer2:  { name:'¡MEJOR EQUIPO!', type:'love',     power:0,   pp:5,  eff:'buff_player_def' },
  love_cheer3:  { name:'¡TE AMO!',       type:'love',     power:0,   pp:5,  eff:'buff_player_sp'  },
  love_cheer4:  { name:'¡ERES GENIAL!',  type:'love',     power:0,   pp:5,  eff:'buff_player_spd' },
  // Celebrations (friendly battles)
  tarta:        { name:'TARTA SORPRESA',  type:'fairy',    power:0,   pp:5,  eff:'heal' },
  chiste:       { name:'CHISTE MALO',     type:'normal',   power:0,   pp:10, eff:'lower_atk' },
  abrazo:       { name:'ABRAZO VELOZ',    type:'fairy',    power:40,  pp:20 },
};

const TYPE_EFF = {
  fire:    { grass:2, ice:2, water:.5, fire:.5, rock:.5 },
  water:   { fire:2,  rock:2, grass:.5, water:.5 },
  grass:   { water:2, rock:2, fire:.5, grass:.5, poison:.5 },
  fairy:   { dragon:2, fighting:2 },
  love:    {}, // always effective (special case — positive)
  normal:  { rock:.5, ghost:0 },
};

const TYPE_COLORS = {
  fire:'#f97316', water:'#38bdf8', grass:'#4ade80', electric:'#facc15',
  psychic:'#e879f9', ghost:'#a78bfa', normal:'#94a3b8', fairy:'#fb7185',
  love:'#f43f5e', rock:'#a8a29e',
};

const TYPE_NAMES_ES = {
  fire:'FUEGO', water:'AGUA', grass:'PLANTA', electric:'ELÉCTRICO',
  psychic:'PSÍQUICO', ghost:'FANTASMA', normal:'NORMAL', fairy:'HADA',
  love:'AMOR',
};

const POKEMON_DEFS = {
  // ─── STARTERS ───────────────────────────────────────────
  torchic: {
    name:'TORCHIC', nickname:'Pollito Jefe',
    type1:'fire', type2:null,
    hp:45, atk:60, def:40, sp:70, spd:45, lv:5,
    moves:['scratch','ember','growl','tackle'],
    desc:'Un pollito adorable, esponjoso y lleno de energía. Da saltitos cada vez que Cristina le mira.',
  },
  togepi: {
    name:'TOGEPI', nickname:'Pequeño Huevo',
    type1:'fairy', type2:null,
    hp:35, atk:20, def:65, sp:40, spd:20, lv:5,
    moves:['metronome','sweet_kiss','charm','soft_boiled'],
    desc:'Un Pokémon símbolo de alegría y bendición familiar.',
  },
  eevee: {
    name:'EEVEE', nickname:'Peluchín',
    type1:'normal', type2:null,
    hp:55, atk:55, def:50, sp:45, spd:55, lv:5,
    moves:['tackle','quick_attack','swift','growl'],
    desc:'Leal, cariñoso y lleno de infinitas posibilidades.',
  },

  // ─── ENEMY POKEMON ──────────────────────────────────────
  growlithe: {
    name:'GROWLITHE', nickname:null,
    type1:'fire', type2:null,
    hp:55, atk:70, def:45, sp:70, spd:60, lv:5,
    moves:['ember','bite','growl','tackle'],
    desc:'Un cachorro de fuego leal y valiente.',
  },
  chansey: {
    name:'CHANSEY', nickname:null,
    type1:'normal', type2:null,
    hp:250, atk:5, def:5, sp:35, spd:50, lv:8,
    moves:['sing','sweet_kiss','soft_boiled','egg_bomb'],
    desc:'Un Pokémon muy amable que siempre cura.',
  },
  pikachu: {
    name:'PIKACHU', nickname:null,
    type1:'electric', type2:null,
    hp:35, atk:55, def:40, sp:50, spd:90, lv:8,
    moves:['love_cheer1','love_cheer2','love_cheer3','love_cheer4'],
    desc:'El Pikachu de Alberto, lleno de amor y apoyo.',
  },

  // ─── BIZCOCHÍN (legendary - used only in ritual screen) ─
  bizcochin: {
    name:'BIZCOCHÍN', nickname:'Bizcochín',
    type1:'love', type2:null,
    hp:100, atk:80, def:80, sp:100, spd:100, lv:1,
    moves:[],
    desc:'El Pokémon legendario más esperado de todos los tiempos. Nacido del amor entre Cristina y Alberto.',
  },
};

function makeBattlePokemon(id) {
  const d = POKEMON_DEFS[id] || POKEMON_DEFS['torchic'];
  const lv = d.lv;
  const maxHp = Math.floor((d.hp * 2 * lv / 100) + lv + 10);
  return {
    id, name: d.name, nickname: d.nickname || d.name,
    type1: d.type1, type2: d.type2,
    maxHp, hp: maxHp, lv,
    atk: Math.floor((d.atk * 2 * lv / 100) + 5),
    def: Math.floor((d.def * 2 * lv / 100) + 5),
    sp:  Math.floor((d.sp  * 2 * lv / 100) + 5),
    spd: d.spd,
    atkMod: 0, defMod: 0,
    moves: d.moves.map(m => ({ id: m, pp: MOVE_DATA[m].pp, maxPp: MOVE_DATA[m].pp })),
  };
}

function getTypeEff(mtype, t1, t2) {
  const chart = TYPE_EFF[mtype] || {};
  return (chart[t1] ?? 1) * (chart[t2] ?? 1);
}

function calcDmg(atkr, defr, mid) {
  const mv = MOVE_DATA[mid];
  if (!mv.power) return { dmg: 0, eff: 1 };
  const special = ['fire','water','grass','electric','psychic','ghost','ice','fairy','love'].includes(mv.type);
  const a = special ? atkr.sp : atkr.atk;
  const d = defr.def;
  const eff = getTypeEff(mv.type, defr.type1, defr.type2);
  const stab = (mv.type === atkr.type1 || mv.type === atkr.type2) ? 1.5 : 1;
  const rng = 0.85 + Math.random() * 0.15;
  const mods = [0.5, 0.67, 0.75, 1, 1.14, 1.5, 2];
  const am = mods[atkr.atkMod + 3] ?? 1;
  const dm = mods[defr.defMod + 3] ?? 1;
  const raw = Math.floor(((2 * atkr.lv / 5 + 2) * mv.power * a * am / (d * dm * 50) + 2) * stab * eff * rng);
  return { dmg: Math.max(1, raw), eff };
}
