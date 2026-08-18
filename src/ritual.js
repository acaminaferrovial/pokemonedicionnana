// ============================================================
//  RITUAL ENGINE — Pokémon Edición Bizcochín
//  Sintonía de Amor bar (0→100%).
//  At 80% unlocks NANA BALL. Then Bizcochín capture animation.
// ============================================================
'use strict';

const RitualEngine = {
  sintonia: 0,
  _onComplete: null,
  _captured: false,

  // Flavor messages per action
  _msgs: {
    nana:    ['Bizcochín percibe una melodía cálida...', '¡El corazón de Bizcochín late con fuerza!', '¡Sintonía en aumento!', 'Una energía mágica llena el aire...'],
    caricia: ['Bizcochín se relaja con cada caricia.', '¡Siente todo el amor que le rodea!', 'Sus patitas se agitan de felicidad.', '¡La sintonía crece!'],
    promesa: ['"Te voy a querer siempre, Bizcochín."', '"Serás la persona más amada del mundo."', '"Juntos vamos a vivir mil aventuras."', '"Eres nuestro mayor tesoro."'],
    ball:    ['La NANA BALL brilla con una luz dorada...', '¡Bizcochín siente el amor dentro de la Poké Ball!', '¡El capturado es definitivo!', '¡Bienvenido a la familia!'],
  },

  _ballUsed: false,

  // ── PUBLIC API ────────────────────────────────────────────

  start(onComplete) {
    DialogueEngine.endNow(); // close any open dialogue cleanly

    this.sintonia  = 0;
    this._captured = false;
    this._ballUsed = false;
    this._onComplete = onComplete || null;

    this._setupScreen();
    Game.showScreen('ritual-screen');

    setTimeout(() => {
      this._setMsg('Bizcochín apareció en el árbol más alto del mundo...');
    }, 400);
  },

  // ── SETUP ─────────────────────────────────────────────────

  _setupScreen() {
    // Draw ritual background
    const canvas = document.getElementById('ritual-canvas');
    if (canvas) {
      canvas.width = 800; canvas.height = 600;
      const ctx = canvas.getContext('2d');
      Renderer.backgrounds.summit(ctx, 800, 600);
      // Draw Bizcochín in the nest
      this._drawBizcochin(ctx, 400, 310, false);
    }

    this._updateBar();
    this._setMsg('¡Increíble! Bizcochín está justo ahí...');
    this._setBallEnabled(false);

    // Wire buttons
    const btns = { nana:'ritual-btn-nana', caricia:'ritual-btn-caricia', promesa:'ritual-btn-promesa', ball:'ritual-btn-ball' };
    Object.entries(btns).forEach(([action, id]) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => this._doAction(action);
      }
    });
  },

  _drawBizcochin(ctx, cx, cy, glowing) {
    // Golden nest glow
    if (glowing) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      g.addColorStop(0, 'rgba(255,220,50,0.6)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(cx - 100, cy - 100, 200, 200);
    }

    // Draw Bizcochín sprite
    const sprite = SPRITES['bizcochin'];
    if (sprite && typeof sprite === 'string') {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, cx - 40, cy - 50, 80, 80);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sprite);
    }

    // Heart particles when glowing
    if (glowing) {
      ctx.font = '22px serif';
      ['❤️','💛','💖','💕'].forEach((h, i) => {
        const a = (i / 4) * Math.PI * 2;
        ctx.fillText(h, cx + Math.cos(a) * 60 - 10, cy + Math.sin(a) * 60);
      });
    }
  },

  // ── ACTIONS ───────────────────────────────────────────────

  _doAction(action) {
    if (this._captured) return;
    if (action === 'ball') {
      if (this.sintonia < 80) {
        this._setMsg('Bizcochín no se fía todavía... necesita más amor.');
        return;
      }
      if (this._ballUsed) {
        this._setMsg('¡La NANA BALL ya está usada!');
        return;
      }
      this._useBall();
      return;
    }

    const msgs = this._msgs[action];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    this._setMsg(msg);

    const gain = action === 'promesa' ? 18 : 12;
    this.sintonia = Math.min(100, this.sintonia + gain);
    this._updateBar();

    if (this.sintonia >= 80) {
      this._setBallEnabled(true);
      if (this.sintonia === 80 || (this.sintonia >= 80 && !this._ballUsed)) {
        this._flashBar();
        setTimeout(() => this._setMsg('✨ ¡La NANA BALL está lista! ¡Úsala ahora!'), 400);
      }
    }

    // Redraw canvas with glowing Bizcochín at high sintonia
    if (this.sintonia >= 60) {
      const canvas = document.getElementById('ritual-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        Renderer.backgrounds.summit(ctx, 800, 600);
        this._drawBizcochin(ctx, 400, 310, true);
      }
    }
  },

  _useBall() {
    this._ballUsed = true;
    this._setBallEnabled(false);
    this._setAllActionsEnabled(false);
    this._setMsg('¡Cristina lanzó la NANA BALL!');

    // Ball throw animation via canvas
    const canvas = document.getElementById('ritual-canvas');
    const ctx    = canvas ? canvas.getContext('2d') : null;

    let frame = 0;
    const total = 40;
    const anim = setInterval(() => {
      frame++;
      const t = frame / total;
      if (!ctx) { clearInterval(anim); this._captureSuccess(); return; }

      // Redraw background
      Renderer.backgrounds.summit(ctx, 800, 600);
      this._drawBizcochin(ctx, 400, 310, true);

      // Ball arc
      const startX = 200, startY = 500;
      const endX = 400, endY = 290;
      const bx = startX + (endX - startX) * t;
      const by = startY + (endY - startY) * t - Math.sin(Math.PI * t) * 120;

      // Draw ball (simple circle)
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#1a0a00'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(bx, by, 14, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx - 14, by); ctx.lineTo(bx + 14, by); ctx.stroke();

      if (frame >= total) {
        clearInterval(anim);
        this._ballHit(ctx);
      }
    }, 30);
  },

  _ballHit(ctx) {
    this._setMsg('...');
    // Shake animation (3 wobbles)
    let wobble = 0;
    const shakeAnim = setInterval(() => {
      wobble++;
      if (!ctx) { clearInterval(shakeAnim); this._captureSuccess(); return; }
      Renderer.backgrounds.summit(ctx, 800, 600);
      const dx = wobble % 2 === 0 ? -6 : 6;
      ctx.save(); ctx.translate(dx, 0);
      // Ball at nest
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(400, 305, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(400, 305, 14, 0, Math.PI); ctx.fill();
      ctx.strokeStyle = '#1a0a00'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(400, 305, 14, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      if (wobble >= 6) {
        clearInterval(shakeAnim);
        this._captureSuccess();
      }
    }, 240);
  },

  _captureSuccess() {
    this._captured = true;
    this.sintonia = 100;
    this._updateBar();
    this._setMsg('¡Bizcochín fue capturado! 🌟');

    // Draw final celebration canvas
    const canvas = document.getElementById('ritual-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      Renderer.backgrounds.summit(ctx, 800, 600);
      // Hearts everywhere
      ctx.font = '30px serif';
      ['❤️','💛','💖','💕','⭐','🌟','✨'].forEach((e, i) => {
        const x = 60 + (i % 5) * 145;
        const y = 80 + Math.floor(i / 5) * 120;
        ctx.fillText(e, x, y);
      });
      this._drawBizcochin(ctx, 400, 280, true);
    }

    // Add to team after a moment
    setTimeout(() => {
      Game.addToTeam('bizcochin');
      Game.giveItem('nana_ball');
      setTimeout(() => {
        const cb = this._onComplete;
        this._onComplete = null;
        if (cb) cb();
      }, 1500);
    }, 1800);
  },

  // ── UI HELPERS ────────────────────────────────────────────

  _updateBar() {
    const fill = document.getElementById('ritual-bar-fill');
    const pct  = document.getElementById('ritual-sintonia-pct');
    if (fill) fill.style.width = this.sintonia + '%';
    if (pct)  pct.textContent  = this.sintonia + '%';
  },

  _setMsg(msg) {
    const el = document.getElementById('ritual-msg');
    if (el) el.textContent = msg;
  },

  _setBallEnabled(enabled) {
    const btn = document.getElementById('ritual-btn-ball');
    if (btn) btn.disabled = !enabled;
  },

  _setAllActionsEnabled(enabled) {
    ['ritual-btn-nana','ritual-btn-caricia','ritual-btn-promesa','ritual-btn-ball'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  },

  _flashBar() {
    const track = document.getElementById('ritual-bar-track');
    if (!track) return;
    track.style.boxShadow = '0 0 20px rgba(244,63,94,0.9)';
    setTimeout(() => { track.style.boxShadow = ''; }, 1200);
  },
};
