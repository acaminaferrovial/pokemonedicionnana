// ============================================================
//  GAME ENGINE — Pokémon Edición Bizcochín
//  Main orchestrator: state machine, scenes, save/load, HUD.
// ============================================================
'use strict';

const Game = {
  // ── STATE ─────────────────────────────────────────────────
  state: {
    screen: 'title',
    currentScene: null,
    starter: null,
    team: [],
    inventory: {},
    flags: {},
    saveExists: false,
    playerPos: { x: 400, y: 430 },
  },

  // ── MOVEMENT STATE (not saved) ─────────────────────────────
  _keys: {},
  _loopRunning: false,
  _nearItem: null,
  _transitioning: false,

  // ── INIT ──────────────────────────────────────────────────

  init() {
    this._scaleGame();
    window.addEventListener('resize', () => this._scaleGame());
    document.addEventListener('keydown', (e) => this._onKeyDown(e));
    document.addEventListener('keyup',   (e) => { this._keys[e.code] = false; });

    this._checkSave();
    this._drawTitleCanvas();
    this.showScreen('title-screen');
    this._bindTitleButtons();
  },

  _scaleGame() {
    const wrapper = document.getElementById('game-wrapper');
    if (!wrapper) return;
    const scaleX = window.innerWidth  / 800;
    const scaleY = window.innerHeight / 600;
    const scale  = Math.min(scaleX, scaleY);
    const left   = (window.innerWidth  - 800 * scale) / 2;
    const top    = (window.innerHeight - 600 * scale) / 2;
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.left = left + 'px';
    wrapper.style.top  = top  + 'px';
  },

  // ── SCREENS ───────────────────────────────────────────────

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
    this.state.screen = id;
    if (id === 'scene-screen') this._startLoop();
    else this._stopLoop();
  },

  // ── TITLE ─────────────────────────────────────────────────

  _drawTitleCanvas() {
    const canvas = document.getElementById('title-canvas');
    if (!canvas) return;
    canvas.width = 800; canvas.height = 600;
    Renderer.backgrounds.stars(canvas.getContext('2d'), 800, 600);
  },

  _bindTitleButtons() {
    const btnNew  = document.getElementById('btn-new-game');
    const btnLoad = document.getElementById('btn-load-game');
    if (btnNew)  btnNew.addEventListener('click',  () => this._startNewGame());
    if (btnLoad) {
      btnLoad.addEventListener('click', () => this._loadGame());
      btnLoad.style.display = this.state.saveExists ? '' : 'none';
    }
  },

  _startNewGame() {
    this.state = {
      screen: 'title',
      currentScene: null,
      starter: null,
      team: [],
      inventory: {},
      flags: {},
      saveExists: false,
      playerPos: { x: 400, y: 430 },
    };
    this.fade(() => this._showIntro());
  },

  // ── INTRO / STORY START ───────────────────────────────────

  _showIntro() {
    this.showScreen('scene-screen');
    this._loadScene('intro');
    // _loadScene triggers intro_01 via onEnter — no need to start it again
  },

  // ── STARTER SELECTION ─────────────────────────────────────

  showStarterScreen() {
    this.showScreen('starter-screen');
    const row = document.getElementById('starter-row');
    if (!row) return;
    row.innerHTML = '';

    const starters = ['torchic', 'togepi', 'eevee'];
    starters.forEach(id => {
      const def = POKEMON_DEFS[id];
      const typeColor = TYPE_COLORS[def.type1] || '#666';
      const card = document.createElement('div');
      card.className = 'starter-card';
      card.innerHTML = `
        <div class="s-sprite">${SPRITES[id] || ''}</div>
        <div class="s-name">${def.name}</div>
        <div class="s-type" style="background:${typeColor}">${TYPE_NAMES_ES[def.type1] || def.type1.toUpperCase()}</div>
        <div class="s-desc">${def.desc}</div>
      `;
      card.addEventListener('click', () => this._confirmStarter(id, card, starters));
      row.appendChild(card);
    });
  },

  _confirmStarter(id, card, all) {
    // Highlight selected
    all.forEach(sid => {
      const cards = document.querySelectorAll('.starter-card');
      cards.forEach(c => c.style.opacity = '0.5');
    });
    card.style.opacity = '1';
    card.style.borderColor = '#f59e0b';
    card.style.boxShadow = '0 0 24px rgba(245,158,11,0.6)';

    const def = POKEMON_DEFS[id];
    const confirmArea = document.getElementById('starter-confirm') || this._makeConfirmBtn();

    const btn = document.createElement('button');
    btn.className = 'btn-gold starter-confirm';
    btn.textContent = '¡Elegir ' + def.name + '!';
    btn.addEventListener('click', () => {
      this.state.starter = id;
      this.addToTeam(id);
      this.fade(() => {
        this.showScreen('scene-screen');
        this._loadScene('villa_room');
        DialogueEngine.start('alberto_after_starter', () => {});
      });
    });

    const existing = document.querySelector('.starter-confirm');
    if (existing) existing.replaceWith(btn);
    else document.getElementById('starter-screen').appendChild(btn);
  },

  _makeConfirmBtn() {
    const btn = document.createElement('button');
    btn.className = 'btn-gold starter-confirm';
    document.getElementById('starter-screen').appendChild(btn);
    return btn;
  },

  // ── SCENE LOADING ─────────────────────────────────────────

  _loadScene(sceneId) {
    const scene = SCENES[sceneId];
    if (!scene) { console.warn('Unknown scene:', sceneId); return; }

    this.state.currentScene = sceneId;

    // Draw background
    const canvas = document.getElementById('scene-canvas');
    if (canvas) {
      canvas.width = 800; canvas.height = 600;
      const fn = Renderer.backgrounds[scene.bg];
      if (fn) fn(canvas.getContext('2d'), 800, 600);
    }

    // HUD
    const locEl = document.getElementById('hud-location');
    if (locEl) locEl.textContent = scene.name || '';
    const hud = document.getElementById('hud');
    if (hud) hud.style.display = (scene.showHud === false) ? 'none' : '';

    // Scene layer
    this._populateSceneLayer(scene);

    // onEnter dialogue — fires only once per scene (tracked by flag)
    const enterKey = '_entered_' + sceneId;
    if (scene.onEnter && !this.state.flags[enterKey]) {
      this.state.flags[enterKey] = true;
      setTimeout(() => {
        DialogueEngine.start(scene.onEnter, () => {});
      }, 300);
    }
  },

  _populateSceneLayer(scene) {
    const layer = document.getElementById('scene-layer');
    if (!layer) return;
    layer.innerHTML = '';

    // NPCs
    (scene.npcs || []).forEach(npc => {
      if (npc.flag && this.state.flags[npc.flag]) return;  // hidden once flag set
      if (npc.oneshot && this.state.flags['npc_done_' + npc.id]) return;

      const el = document.createElement('div');
      el.className = 'scene-npc';
      el.style.left = npc.x + '%';
      el.style.top  = npc.y + '%';

      const sprite = SPRITES[npc.sprite] || '';
      el.innerHTML = `
        <div class="npc-sprite">${sprite}</div>
        <div class="npc-label">${npc.label}</div>
      `;
      el.addEventListener('click', () => {
        if (npc.oneshot) this.state.flags['npc_done_' + npc.id] = true;
        if (npc.dialogue) DialogueEngine.start(npc.dialogue, () => this._populateSceneLayer(scene));
      });
      layer.appendChild(el);
    });

    // Objects
    (scene.objects || []).forEach(obj => {
      if (obj.flag && this.state.flags[obj.flag]) return;  // hidden once flag set
      if (obj.oneshot && this.state.flags['obj_done_' + obj.id]) return;

      const el = document.createElement('div');
      el.className = 'scene-object';
      el.style.left = obj.x + '%';
      el.style.top  = obj.y + '%';
      el.innerHTML = `
        <div class="obj-icon">${obj.icon || '❓'}</div>
        <div class="obj-label">${obj.label}</div>
      `;
      el.addEventListener('click', () => {
        if (obj.oneshot) this.state.flags['obj_done_' + obj.id] = true;
        if (obj.dialogue) DialogueEngine.start(obj.dialogue, () => this._populateSceneLayer(scene));
      });
      layer.appendChild(el);
    });

    // Exits
    (scene.exits || []).forEach(exit => {
      if (exit.requireFlag && !this.state.flags[exit.requireFlag]) return;

      const el = document.createElement('div');
      el.className = 'scene-exit';
      el.style.left = exit.x + '%';
      el.style.top  = exit.y + '%';
      el.innerHTML = `<div class="exit-label">➤ ${exit.label}</div>`;
      el.addEventListener('click', () => {
        this.fade(() => this._loadScene(exit.target));
      });
      layer.appendChild(el);
    });

    // Player character
    this._spawnPlayer();
  },

  // ── ACTION HANDLER ────────────────────────────────────────

  handleAction(action) {
    switch (action) {
      case 'go_villa_room':
        setTimeout(() => {
          this.showScreen('scene-screen');
          this._loadScene('villa_room');
        }, 200);
        break;

      case 'unlock_room':
        this.state.flags['room_unlocked'] = true;
        break;

      case 'give_starter_items':
        this.giveItem('kit_aventura');
        this.giveItem('pocion_cumple');
        this.toast('¡Recibiste el KIT DE AVENTURA y POCIONES DE CUMPLEAÑOS!');
        break;

      case 'show_starter_screen':
        setTimeout(() => this.showStarterScreen(), 500);
        break;

      case 'alberto_leaves':
        this.state.flags['alberto_visited'] = true;
        setTimeout(() => {
          const sc = SCENES[this.state.currentScene];
          if (sc) this._populateSceneLayer(sc);
        }, 100);
        break;

      case 'unlock_exterior':
        this.state.flags['exterior_unlocked'] = true;
        setTimeout(() => {
          const scene = SCENES['villa_room'];
          if (scene) this._populateSceneLayer(scene);
        }, 200);
        break;

      case 'start_battle_marcos':
        this.state.flags['in_marcos_battle'] = true;
        setTimeout(() => {
          this.showScreen('battle-screen');
          BattleEngine.start(
            this.state.starter, 'growlithe', false, null,
            () => {
              this.state.flags['marcos_beaten'] = true;
              this.state.flags['in_marcos_battle'] = false;
              this.showScreen('scene-screen');
              DialogueEngine.start('marcos_post', () => {
                this._loadScene('route1');
              });
            }
          );
        }, 400);
        break;

      case 'give_marcos_items':
        this.giveItem('llavero_viaje');
        this.toast('¡Marcos te dio el LLAVERO DE VIAJE!');
        break;

      case 'give_item_entrada_cine':
        if (!this.state.flags['got_entrada_cine']) {
          this.giveItem('entrada_cine');
          this.state.flags['got_entrada_cine'] = true;
          this.toast('¡Encontraste la ENTRADA DE CINE VIEJA!');
        }
        break;

      case 'give_item_foto':
        if (!this.state.flags['got_foto']) {
          this.giveItem('foto_escapada');
          this.state.flags['got_foto'] = true;
          this.toast('¡Recibiste la FOTO INSTANTÁNEA!');
        }
        break;

      case 'unlock_route1':
        this.state.flags['route1_visited'] = true;
        break;

      case 'unlock_ciudad':
        this.state.flags['ciudad_unlocked'] = true;
        break;

      case 'unlock_ciudad_scene':
        // Called from ciudad's onEnter — scene already loaded, just set flag
        this.state.flags['ciudad_unlocked'] = true;
        break;

      case 'alberto_gym_seen':
        this.state.flags['alberto_gym_seen'] = true;
        break;

      case 'unlock_gym_door':
        this.state.flags['gym_door_open'] = true;
        this.state.flags['alberto_gym_seen'] = true;
        break;

      case 'open_gym_door1':
        this.state.flags['tile1_done'] = true;
        setTimeout(() => {
          if (this.state.flags['tile2_done']) {
            this.state.flags['gym_door_open'] = true;
            this.toast('¡La puerta del Gimnasio se ha abierto!');
            this._populateSceneLayer(SCENES['gym']);
          }
        }, 100);
        break;

      case 'open_gym_door2':
        this.state.flags['tile2_done'] = true;
        setTimeout(() => {
          if (this.state.flags['tile1_done']) {
            this.state.flags['gym_door_open'] = true;
            this.toast('¡La puerta del Gimnasio se ha abierto!');
            this._populateSceneLayer(SCENES['gym']);
          }
        }, 100);
        break;

      case 'start_battle_valentin':
        setTimeout(() => {
          BattleEngine.start(
            this.state.starter, 'chansey', false, null,
            () => {
              this.state.flags['valentin_beaten'] = true;
              this.showScreen('scene-screen');
              DialogueEngine.start('valentin_post', () => {
                this._loadScene('gym');
              });
            }
          );
        }, 400);
        break;

      case 'give_medalla_ternura':
        this.giveItem('medalla_ternura');
        this.toast('¡Recibiste la MEDALLA TERNURA!');
        break;

      case 'sfx_heartbeat':
        this.toast('💛 Pum-pum... Pum-pum...');
        break;

      case 'unlock_bosque':
        this.state.flags['bosque_unlocked'] = true;
        break;

      case 'unlock_bosque_scene':
        // Called from bosque's onEnter — scene already loaded, just set flag
        this.state.flags['bosque_unlocked'] = true;
        break;

      case 'add_pollito_1':
        if (!this.state.flags['pollito1']) {
          this.state.flags['pollito1'] = true;
          this.addToTeam('torchic');
          this.toast('¡Un Torchic pollito se unió a tu equipo!');
        }
        break;

      case 'add_pollito_2':
        if (!this.state.flags['pollito2']) {
          this.state.flags['pollito2'] = true;
          this.addToTeam('togepi');
          this.toast('¡Un Togepi se unió a tu equipo!');
        }
        break;

      case 'add_pollito_3':
        if (!this.state.flags['pollito3']) {
          this.state.flags['pollito3'] = true;
          this.addToTeam('eevee');
          this.toast('¡Un Eevee se unió a tu equipo!');
        }
        break;

      case 'give_baya_melocoton':
        this.giveItem('baya_melocoton');
        this.toast('¡La Abuela te dio la BAYA MELOCOTÓN!');
        break;

      case 'open_bosque_puerta':
        if (!this.state.flags['pollito1'] || !this.state.flags['pollito2'] || !this.state.flags['pollito3']) {
          this.toast('¡Necesitas los 3 pollitos para abrir la puerta! 🐣');
          return;
        }
        this.state.flags['bosque_open'] = true;
        this.fade(() => this._loadScene('puente'));
        break;

      case 'start_battle_alberto':
        setTimeout(() => {
          BattleEngine.start(
            this.state.starter, 'pikachu', true, null,
            () => {
              this.state.flags['alberto_beaten'] = true;
              this.showScreen('scene-screen');
              DialogueEngine.start('puente_post', () => {
                this._loadScene('cima');
              });
            }
          );
        }, 400);
        break;

      case 'unlock_cima':
        this.state.flags['cima_unlocked'] = true;
        break;

      case 'start_ritual':
        if (this.state.flags['ritual_done']) return;
        setTimeout(() => {
          RitualEngine.start(() => {
            this.giveItem('gorro_pollital');
            this.state.flags['ritual_done'] = true;
            this.showScreen('scene-screen');
            // Draw epilogue sunrise on the current canvas
            const cvs = document.getElementById('scene-canvas');
            if (cvs) { cvs.width=800; cvs.height=600; Renderer.backgrounds.epilogue(cvs.getContext('2d'),800,600); }
            const hud = document.getElementById('hud');
            if (hud) hud.style.display = 'none';
            document.getElementById('scene-layer').innerHTML = '';
            // Epilogue mirador dialogue
            DialogueEngine.start('epilogue_mirador', () => {});
          });
        }, 600);
        break;

      case 'show_pokedex':
        this._showPokedex();
        break;

      case 'show_letter':
        this._showLetter();
        break;

      default:
        console.log('[Game] Unknown action:', action);
    }
  },

  // ── TEAM & INVENTORY ──────────────────────────────────────

  addToTeam(pokemonId) {
    if (!this.state.team.includes(pokemonId)) {
      this.state.team.push(pokemonId);
    }
    this.toast('¡' + (POKEMON_DEFS[pokemonId].name) + ' se unió a tu equipo!');
  },

  giveItem(itemId) {
    const def = ITEMS[itemId];
    if (!def) return;
    if (def.unique) {
      this.state.inventory[itemId] = { unique: true };
    } else {
      if (!this.state.inventory[itemId]) {
        this.state.inventory[itemId] = { count: 0 };
      }
      this.state.inventory[itemId].count += (def.count || 1);
    }
  },

  hasItem(itemId) {
    const slot = this.state.inventory[itemId];
    if (!slot) return false;
    if (slot.unique) return true;
    return slot.count > 0;
  },

  // ── HUD PANELS ────────────────────────────────────────────

  showInventory() {
    const panel = document.getElementById('inventory-panel');
    if (!panel) return;
    panel.classList.add('open');
    const body = panel.querySelector('.inv-body');
    if (!body) return;
    body.innerHTML = '';

    const categories = {
      'amor':     'Objetos de Amor',
      'objetos':  'Objetos',
      'bayas':    'Bayas',
      'recuerdos':'Recuerdos',
    };

    Object.entries(categories).forEach(([cat, label]) => {
      const items = Object.entries(this.state.inventory).filter(([id]) => ITEMS[id]?.category === cat);
      if (!items.length) return;

      const catEl = document.createElement('div');
      catEl.className = 'inv-category-label';
      catEl.textContent = label;
      body.appendChild(catEl);

      items.forEach(([id, slot]) => {
        const def = ITEMS[id];
        if (!def) return;
        const count = slot.unique ? '' : slot.count;

        const row = document.createElement('div');
        row.className = 'inv-item';
        row.innerHTML = `
          <span class="inv-item-icon">${def.icon || '❓'}</span>
          <span class="inv-item-name">${def.name}</span>
          <span class="inv-item-count">${count ? '×' + count : ''}</span>
        `;
        const desc = document.createElement('div');
        desc.className = 'inv-item-desc';
        desc.textContent = def.desc;
        row.appendChild(desc);
        row.addEventListener('click', () => row.classList.toggle('expanded'));
        body.appendChild(row);
      });
    });

    if (!body.children.length) {
      body.innerHTML = '<div class="inv-empty">La mochila está vacía.</div>';
    }
  },

  closeInventory() {
    const panel = document.getElementById('inventory-panel');
    if (panel) panel.classList.remove('open');
  },

  showTeam() {
    const panel = document.getElementById('team-panel');
    if (!panel) return;
    panel.classList.add('open');
    const grid = panel.querySelector('.team-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!this.state.team.length) {
      grid.innerHTML = '<div class="inv-empty" style="grid-column:1/-1;padding:32px">Todavía no tienes Pokémon en el equipo.</div>';
      return;
    }

    this.state.team.forEach(id => {
      const def = POKEMON_DEFS[id];
      if (!def) return;
      const bp = makeBattlePokemon(id);
      const pct = Math.round((bp.hp / bp.maxHp) * 100);

      const el = document.createElement('div');
      el.className = 'team-member';
      el.innerHTML = `
        <div class="tm-sprite">${SPRITES[id] || ''}</div>
        <div class="team-member-info">
          <div class="tm-name">${def.name}</div>
          <div class="tm-nick">${def.nickname ? '"' + def.nickname + '"' : ''}</div>
          <div class="tm-hp-row">
            <div class="tm-hp-track"><div class="tm-hp-fill" style="width:${pct}%"></div></div>
            <div class="tm-hp-nums">${bp.hp}/${bp.maxHp}</div>
          </div>
        </div>
      `;
      grid.appendChild(el);
    });
  },

  closeTeam() {
    const panel = document.getElementById('team-panel');
    if (panel) panel.classList.remove('open');
  },

  // ── POKÉDEX ───────────────────────────────────────────────

  _showPokedex() {
    const panel = document.getElementById('pokedex-panel');
    if (!panel) return;
    panel.classList.add('open');
    const body = panel.querySelector('.pokedex-body');
    if (!body) return;
    body.innerHTML = '';

    const entries = [
      { id: 'bizcochin', num: '#∞' },
      { id: this.state.starter,  num: '#001' },
    ];

    entries.forEach(({ id, num }) => {
      if (!id) return;
      const def = POKEMON_DEFS[id];
      if (!def) return;
      const el = document.createElement('div');
      el.className = 'pokedex-entry';
      el.innerHTML = `
        <div class="pokedex-entry-sprite">${SPRITES[id] || ''}</div>
        <div class="pokedex-entry-info">
          <div class="pokedex-entry-num">${num}</div>
          <div class="pokedex-entry-name">${def.name}</div>
          <div class="pokedex-entry-desc">${def.desc}</div>
        </div>
      `;
      body.appendChild(el);
    });

    // Special Bizcochín entry
    const biz = document.createElement('div');
    biz.style.cssText = 'padding:20px 0;font-size:13px;color:rgba(255,200,200,0.7);font-style:italic;border-top:1px solid rgba(244,63,94,0.3);margin-top:12px;';
    biz.textContent = 'Nota del Profesor Bizcochín: Este Pokémon es completamente único. No existe en ninguna otra Pokédex del mundo. Solo puede encontrarse en el corazón de quienes lo esperan con amor.';
    body.appendChild(biz);
  },

  closePokedex() {
    const panel = document.getElementById('pokedex-panel');
    if (panel) panel.classList.remove('open');
  },

  // ── LETTER ────────────────────────────────────────────────

  _showLetter() {
    const panel = document.getElementById('letter-panel');
    if (!panel) return;
    panel.classList.add('open');
    const paper = panel.querySelector('.letter-paper');
    if (!paper) return;

    paper.innerHTML = `
      <div class="letter-title">💛 Para Cristina 💛</div>
      <p>Cris,</p>
      <br>
      <p>Si estás leyendo esto, es que has llegado al final de esta pequeña aventura que preparé para ti.</p>
      <br>
      <p>Quería contártelo de una manera especial, porque tú siempre haces especial todo lo que tocas.</p>
      <br>
      <p>Dentro de unos meses va a llegar alguien muy, muy especial. Nuestro Bizcochín.</p>
      <br>
      <p>No sé si será pollito o pollita. No sé cómo será su risa, ni cómo serán sus manos. Pero ya te digo que va a ser la persona más amada que ha existido jamás, porque tú vas a ser su madre.</p>
      <br>
      <p>Y yo voy a estar aquí. Para los dos.</p>
      <br>
      <p>Feliz cumpleaños, mi vida.</p>
      <br>
      <p style="text-align:right;color:#b45309;font-style:italic">Con todo mi amor,<br><strong>Alberto</strong> 🐥</p>
    `;
  },

  closeLetter() {
    const panel = document.getElementById('letter-panel');
    if (panel) panel.classList.remove('open');
  },

  // ── SAVE / LOAD ───────────────────────────────────────────

  save() {
    try {
      const data = {
        v: 1,
        state: JSON.stringify(this.state),
      };
      localStorage.setItem('biz_save', JSON.stringify(data));
      this.state.saveExists = true;
      this.toast('¡Progreso guardado!');
    } catch(e) {
      this.toast('Error al guardar.');
    }
  },

  _checkSave() {
    try {
      const raw = localStorage.getItem('biz_save');
      this.state.saveExists = !!raw;
    } catch(e) {
      this.state.saveExists = false;
    }
  },

  _loadGame() {
    try {
      const raw = localStorage.getItem('biz_save');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.v !== 1) return;
      const saved = JSON.parse(data.state);
      // Restore state but keep screen at current
      this.state = Object.assign({}, saved);
      this.state.saveExists = true;

      this.fade(() => {
        this.showScreen('scene-screen');
        const sc = this.state.currentScene || 'villa_room';
        this._loadScene(sc);
        this.toast('¡Partida cargada!');
      });
    } catch(e) {
      this.toast('Error al cargar la partida.');
    }
  },

  // ── FADE ──────────────────────────────────────────────────

  fade(cb) {
    const overlay = document.getElementById('fade-overlay');
    if (!overlay) { if (cb) cb(); return; }
    overlay.classList.add('fade-in');
    setTimeout(() => {
      if (cb) cb();
      overlay.classList.remove('fade-in');
      overlay.classList.add('fade-out');
      setTimeout(() => overlay.classList.remove('fade-out'), 450);
    }, 420);
  },

  // ── PLAYER MOVEMENT ───────────────────────────────────────

  _spawnPlayer() {
    const scene = SCENES[this.state.currentScene];
    const layer = document.getElementById('scene-layer');
    if (!layer) return;
    const old = document.getElementById('player-char');
    if (old) old.remove();
    // Don't show player in cutscene-only scenes (no HUD)
    if (!scene || scene.showHud === false) return;
    const el = document.createElement('div');
    el.id = 'player-char';
    el.innerHTML = SPRITES['player'] || '';
    layer.appendChild(el);
    this._updatePlayerEl();
  },

  _updatePlayerEl() {
    const el = document.getElementById('player-char');
    if (!el) return;
    const pos = this.state.playerPos || { x: 400, y: 430 };
    el.style.left = pos.x + 'px';
    el.style.top  = pos.y + 'px';
  },

  _startLoop() {
    if (this._loopRunning) return;
    this._loopRunning = true;
    const step = () => {
      if (!this._loopRunning) return;   // stopped — don't reschedule
      this._tick();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  _stopLoop() {
    this._loopRunning = false;
    this._nearItem = null;
    this._showPrompt(null);
  },

  _tick() {
    if (this.state.screen !== 'scene-screen') return;
    if (this._dialogueOpen() || this._transitioning) return;

    if (!this.state.playerPos) this.state.playerPos = { x: 400, y: 430 };
    const spd = 3;
    let { x, y } = this.state.playerPos;

    if (this._keys['KeyW'] || this._keys['ArrowUp'])    y -= spd;
    if (this._keys['KeyS'] || this._keys['ArrowDown'])  y += spd;
    if (this._keys['KeyA'] || this._keys['ArrowLeft'])  x -= spd;
    if (this._keys['KeyD'] || this._keys['ArrowRight']) x += spd;

    // Boundaries — top leaves room for HUD
    x = Math.max(25,  Math.min(775, x));
    y = Math.max(100, Math.min(545, y));

    this.state.playerPos = { x, y };
    this._updatePlayerEl();
    this._checkProximity();
  },

  _dialogueOpen() {
    const box = document.getElementById('dialogue-box');
    return !!(box && box.classList.contains('visible'));
  },

  _checkProximity() {
    if (this._transitioning) return;
    const scene = SCENES[this.state.currentScene];
    if (!scene) return;

    const { x, y } = this.state.playerPos;
    const TALK_R = 90;
    const EXIT_R = 55;

    let nearest = null;
    let nearDist = Infinity;

    // NPCs
    (scene.npcs || []).forEach(npc => {
      if (npc.flag    && this.state.flags[npc.flag])            return;
      if (npc.oneshot && this.state.flags['npc_done_' + npc.id]) return;
      const d = Math.hypot(x - npc.x / 100 * 800, y - npc.y / 100 * 600);
      if (d < TALK_R && d < nearDist) { nearDist = d; nearest = { type: 'npc', data: npc }; }
    });

    // Objects
    (scene.objects || []).forEach(obj => {
      if (obj.flag    && this.state.flags[obj.flag])            return;
      if (obj.oneshot && this.state.flags['obj_done_' + obj.id]) return;
      const d = Math.hypot(x - obj.x / 100 * 800, y - obj.y / 100 * 600);
      if (d < TALK_R && d < nearDist) { nearDist = d; nearest = { type: 'obj', data: obj }; }
    });

    this._nearItem = nearest;
    this._showPrompt(nearest);

    // Exits — auto-trigger at shorter radius (use for loop so we can return early)
    for (const exit of (scene.exits || [])) {
      if (exit.requireFlag && !this.state.flags[exit.requireFlag]) continue;
      const d = Math.hypot(x - exit.x / 100 * 800, y - exit.y / 100 * 600);
      if (d < EXIT_R) {
        this._transitioning = true;
        this._stopLoop();
        // Entry position on the other side for the new scene
        const entryX = exit.x < 30 ? 720 : exit.x > 70 ? 80 : 400;
        this.state.playerPos = { x: entryX, y: 430 };
        this.fade(() => {
          this._transitioning = false;
          this._loadScene(exit.target);
          this._startLoop();
        });
        return;
      }
    }
  },

  _showPrompt(item) {
    let el = document.getElementById('interaction-prompt');
    if (!item) {
      if (el) el.style.display = 'none';
      return;
    }
    if (!el) {
      el = document.createElement('div');
      el.id = 'interaction-prompt';
      const layer = document.getElementById('scene-layer');
      if (layer) layer.appendChild(el);
    }
    el.style.display = '';
    el.textContent = '▲ ESPACIO';
    const { x, y } = this.state.playerPos;
    el.style.left = x + 'px';
    el.style.top  = (y - 80) + 'px';
  },

  _onKeyDown(e) {
    this._keys[e.code] = true;
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      // Space advances dialogue (works on any screen)
      if (this._dialogueOpen()) {
        const box = document.getElementById('dialogue-box');
        if (box && box._skipHandler) box._skipHandler(e);
        return;
      }
      // Interact with nearby NPC/object only while exploring
      if (this.state.screen === 'scene-screen' && this._nearItem) {
        this._triggerInteraction(this._nearItem);
      }
    }
  },

  _triggerInteraction(item) {
    if (!item) return;
    const scene = SCENES[this.state.currentScene];
    if (!scene) return;
    if (item.type === 'npc') {
      const npc = item.data;
      if (npc.oneshot) this.state.flags['npc_done_' + npc.id] = true;
      if (npc.dialogue) DialogueEngine.start(npc.dialogue, () => this._populateSceneLayer(scene));
    } else if (item.type === 'obj') {
      const obj = item.data;
      if (obj.oneshot) this.state.flags['obj_done_' + obj.id] = true;
      if (obj.dialogue) DialogueEngine.start(obj.dialogue, () => this._populateSceneLayer(scene));
    }
    this._showPrompt(null);
    this._nearItem = null;
  },

  // ── TOAST ─────────────────────────────────────────────────

  toast(msg, duration) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), duration || 2200);
  },
};

// ── GLOBAL HUD WIRING (called from HTML onclick) ───────────
function hudEquipo()  { Game.showTeam(); }
function hudMochila() { Game.showInventory(); }
function hudGuardar() { Game.save(); }
