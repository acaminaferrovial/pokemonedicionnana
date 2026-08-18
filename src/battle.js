// ============================================================
//  BATTLE ENGINE — Pokémon Edición Bizcochín
//  Turn-based combat. Alberto's moves buff the player.
//  No-game-over policy: player can never faint.
// ============================================================
'use strict';

const BattleEngine = {
  player: null,
  enemy:  null,
  isAlberto: false,
  _busy: false,
  _onWin: null,
  _onLose: null,  // unused — no lose state
  _bark: null,

  // ── PUBLIC API ────────────────────────────────────────────

  start(playerPokemonId, enemyPokemonId, isAlberto, bark, onWin) {
    DialogueEngine.endNow(); // close any open dialogue cleanly

    this.player    = makeBattlePokemon(playerPokemonId);
    this.enemy     = makeBattlePokemon(enemyPokemonId);
    this.isAlberto = !!isAlberto;
    this._onWin    = onWin || null;
    this._bark     = bark || null;
    this._busy     = false;

    this._setupScreen();
    Game.showScreen('battle-screen');
    this._setText('¡' + this.enemy.name.toUpperCase() + ' quiere combatir!');
    this._scheduleEnable(1200);
  },

  // ── SETUP ─────────────────────────────────────────────────

  _setupScreen() {
    // Background
    const canvas = document.getElementById('battle-bg-canvas');
    if (canvas) Renderer.drawBattleBackground(canvas);

    // Sprites
    this._setSprite('b-enemy-sprite', this.enemy.id);
    this._setSprite('b-player-sprite', this.player.id);

    // Status boxes
    this._updateStatusBox('enemy', this.enemy);
    this._updateStatusBox('player', this.player);

    // Move buttons
    this._buildMoveGrid();
  },

  _setSprite(elId, pokemonId) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = SPRITES[pokemonId] || SPRITES['torchic'] || '';
    const svg = el.querySelector('svg');
    if (svg) { svg.style.width = '100%'; svg.style.height = '100%'; }
  },

  _buildMoveGrid() {
    const grid = document.getElementById('battle-move-grid');
    if (!grid) return;
    grid.innerHTML = '';
    this.player.moves.forEach((mv, i) => {
      const md = MOVE_DATA[mv.id];
      if (!md) return;
      const btn = document.createElement('button');
      btn.className = 'btn-move';
      btn.dataset.idx = i;
      const typeColor = TYPE_COLORS[md.type] || '#666';
      const typeNameEs = TYPE_NAMES_ES[md.type] || md.type.toUpperCase();
      btn.innerHTML = `
        <span>${md.name}</span>
        <span class="mv-type" style="background:${typeColor}">${typeNameEs}</span>
        <span class="mv-pp">PP ${mv.pp}/${mv.maxPp}</span>
      `;
      btn.addEventListener('click', () => this._playerTurn(i));
      grid.appendChild(btn);
    });
    this._setMovesEnabled(false);
  },

  // ── STATUS BOXES ──────────────────────────────────────────

  _updateStatusBox(side, poke) {
    const pre = side === 'enemy' ? 'b-enemy' : 'b-player';
    const nameEl = document.getElementById(pre + '-name');
    const lvEl   = document.getElementById(pre + '-lv');
    const fillEl = document.getElementById(pre + '-hp-fill');
    const numsEl = document.getElementById(pre + '-hp-nums');

    if (nameEl) nameEl.textContent = poke.nickname || poke.name;
    if (lvEl)   lvEl.textContent   = 'Nv.' + poke.lv;
    if (numsEl) numsEl.textContent = poke.hp + '/' + poke.maxHp;

    const pct = Math.max(0, Math.min(100, (poke.hp / poke.maxHp) * 100));
    if (fillEl) {
      fillEl.style.width = pct + '%';
      fillEl.classList.remove('mid', 'low');
      if (pct <= 20) fillEl.classList.add('low');
      else if (pct <= 50) fillEl.classList.add('mid');
    }
  },

  // ── PLAYER TURN ───────────────────────────────────────────

  _playerTurn(moveIdx) {
    if (this._busy) return;
    this._busy = true;
    this._setMovesEnabled(false);

    const mv = this.player.moves[moveIdx];
    const md = MOVE_DATA[mv.id];
    mv.pp = Math.max(0, mv.pp - 1);

    const textBase = this.player.nickname + ' usó ' + md.name.toUpperCase() + '!';
    this._setText(textBase);

    setTimeout(() => {
      if (md.eff) {
        this._applyEffect(md.eff, this.player, this.enemy, 'player', moveIdx);
      } else {
        const {dmg, eff} = calcDmg(this.player, this.enemy, mv.id);
        this._dealDamage(this.enemy, dmg, eff, 'enemy');
      }
      this._updateMoveGrid(moveIdx, mv);
    }, 600);
  },

  _applyEffect(eff, attacker, target, side, moveIdx) {
    switch (eff) {
      case 'heal': {
        const heal = Math.floor(attacker.maxHp * 0.5);
        attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
        this._setText(attacker.nickname + ' recuperó PS!');
        this._updateStatusBox(side, attacker);
        setTimeout(() => this._enemyTurn(), 1400);
        break;
      }
      case 'lower_atk':
        target.atkMod = Math.max(-3, target.atkMod - 1);
        this._setText('¡El Ataque del rival bajó!');
        setTimeout(() => this._enemyTurn(), 1200);
        break;
      case 'raise_def':
        attacker.defMod = Math.min(3, attacker.defMod + 1);
        this._setText('¡La Defensa subió!');
        setTimeout(() => this._enemyTurn(), 1200);
        break;
      default:
        setTimeout(() => this._enemyTurn(), 800);
    }
  },

  _dealDamage(target, dmg, eff, side) {
    target.hp = Math.max(0, target.hp - dmg);
    const effTxt = eff > 1 ? '¡Es muy eficaz!' : eff < 1 ? 'No es muy eficaz...' : '';
    this._setText((effTxt ? effTxt + ' ' : '') + 'El rival recibió ' + dmg + ' de daño.');
    this._shakeSprite(side === 'enemy' ? 'b-enemy-sprite' : 'b-player-sprite');
    this._updateStatusBox(side, target);

    setTimeout(() => {
      if (target.hp <= 0) {
        this._handleFaint(side);
      } else {
        // Enemy turn
        setTimeout(() => this._enemyTurn(), 600);
      }
    }, 1000);
  },

  // ── ENEMY TURN ────────────────────────────────────────────

  _enemyTurn() {
    if (!this.enemy || this.enemy.hp <= 0) return;

    // Pick a random move
    const available = this.enemy.moves.filter(m => m.pp > 0);
    if (!available.length) {
      this._setText(this.enemy.name + ' no puede atacar!');
      setTimeout(() => { this._busy = false; this._setMovesEnabled(true); }, 1000);
      return;
    }

    const mv = available[Math.floor(Math.random() * available.length)];
    const md = MOVE_DATA[mv.id];
    mv.pp = Math.max(0, mv.pp - 1);

    const name = this.enemy.name;

    if (this.isAlberto) {
      // Alberto's love moves buff the player
      this._handleAlbertoMove(mv, md);
    } else {
      this._setText(name + ' usó ' + md.name.toUpperCase() + '!');
      setTimeout(() => {
        if (md.eff) {
          this._applyEnemyEffect(md.eff, name);
        } else {
          const {dmg, eff} = calcDmg(this.enemy, this.player, mv.id);
          // No-lose policy: clamp player HP at 1
          const actualDmg = Math.min(dmg, this.player.hp - 1);
          this.player.hp = Math.max(1, this.player.hp - actualDmg);
          this._shakeSprite('b-player-sprite');
          this._updateStatusBox('player', this.player);
          this._setText('¡Recibiste ' + actualDmg + ' de daño!');
          setTimeout(() => {
            this._busy = false;
            this._setMovesEnabled(true);
          }, 900);
        }
      }, 600);
    }
  },

  _handleAlbertoMove(mv, md) {
    const barks = {
      love_cheer1: '¡Sé que puedes, Cris! ¡Tú y ' + (this.player.nickname || this.player.name) + ' juntos!',
      love_cheer2: '¡Sois el mejor equipo del mundo!',
      love_cheer3: '¡Os quiero con todo mi corazón!',
      love_cheer4: '¡Eres la entrenadora más increíble!',
    };
    const bark = barks[mv.id] || '¡Ánimo!';

    this._setText('¡ALBERTO apoya a ' + (this.player.nickname || this.player.name) + '!');
    setTimeout(() => {
      switch (md.eff) {
        case 'buff_player_atk':
          this.player.atkMod = Math.min(3, this.player.atkMod + 1);
          this._setText('💪 ' + bark + ' ¡Ataque SUBIÓ!');
          break;
        case 'buff_player_def':
          this.player.defMod = Math.min(3, this.player.defMod + 1);
          this._setText('🛡️ ' + bark + ' ¡Defensa SUBIÓ!');
          break;
        case 'buff_player_sp':
          this.player.sp = Math.min(this.player.sp + 4, 999);
          this._setText('✨ ' + bark + ' ¡Sp. Ataque SUBIÓ!');
          break;
        case 'buff_player_spd':
          this.player.spd = Math.min(this.player.spd + 8, 999);
          this._setText('⚡ ' + bark + ' ¡Velocidad SUBIÓ!');
          break;
        default:
          this._setText('💛 ' + bark);
      }
      this._updateStatusBox('player', this.player);
      setTimeout(() => {
        this._busy = false;
        this._setMovesEnabled(true);
      }, 1000);
    }, 700);
  },

  _applyEnemyEffect(eff, name) {
    switch (eff) {
      case 'heal': {
        const heal = Math.floor(this.enemy.maxHp * 0.5);
        this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + heal);
        this._setText(name + ' recuperó PS!');
        this._updateStatusBox('enemy', this.enemy);
        break;
      }
      case 'lower_atk':
        this.player.atkMod = Math.max(-3, this.player.atkMod - 1);
        this._setText('¡Tu Ataque bajó!');
        this._updateStatusBox('player', this.player);
        break;
      default:
        this._setText(name + ' actuó!');
    }
    setTimeout(() => {
      this._busy = false;
      this._setMovesEnabled(true);
    }, 1000);
  },

  // ── FAINT ─────────────────────────────────────────────────

  _handleFaint(side) {
    if (side === 'enemy') {
      // Enemy fainted → player wins
      const el = document.getElementById('b-enemy-sprite');
      if (el) el.classList.add('faint');
      this._setText('¡' + this.enemy.name + ' se ha debilitado!');
      setTimeout(() => {
        this._setText('¡Ganaste el combate!');
        setTimeout(() => {
          this._end(true);
        }, 1200);
      }, 800);
    } else {
      // Player would faint → keep at 1 HP (no-lose policy)
      this.player.hp = 1;
      this._updateStatusBox('player', this.player);
      this._setText('¡' + this.player.nickname + ' aguanta con todo su corazón!');
      setTimeout(() => {
        this._busy = false;
        this._setMovesEnabled(true);
      }, 1400);
    }
  },

  // ── END ───────────────────────────────────────────────────

  _end(won) {
    const cb = this._onWin;
    this._onWin = null;
    Game.showScreen('scene-screen');
    if (won && cb) cb();
  },

  // ── HELPERS ───────────────────────────────────────────────

  _setText(text) {
    const el = document.getElementById('battle-text-panel');
    if (el) el.textContent = text;
  },

  _setMovesEnabled(enabled) {
    document.querySelectorAll('.btn-move').forEach(btn => {
      btn.disabled = !enabled;
    });
  },

  _scheduleEnable(delay) {
    setTimeout(() => {
      this._busy = false;
      this._setMovesEnabled(true);
    }, delay);
  },

  _shakeSprite(elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  },

  _updateMoveGrid(moveIdx, mv) {
    const btn = document.querySelector(`.btn-move[data-idx="${moveIdx}"] .mv-pp`);
    if (btn) btn.textContent = 'PP ' + mv.pp + '/' + mv.maxPp;
  },
};
