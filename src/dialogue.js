// ============================================================
//  DIALOGUE ENGINE — Pokémon Edición Bizcochín
//  Typewriter text, portrait, choices, node navigation.
// ============================================================
'use strict';

const DialogueEngine = {
  _node: null,
  _timer: null,
  _charIdx: 0,
  _fullText: '',
  _speed: 28,   // ms per character
  _onDone: null,

  // ── PUBLIC API ────────────────────────────────────────────

  // Force-close dialogue without calling onDone (for screen transitions)
  endNow() {
    this._stopTypewriter();
    this._node = null;
    this._onDone = null;
    this._hide();
  },

  start(nodeKey, onDone) {
    this._onDone = onDone || null;
    this._show();
    this._goTo(nodeKey);
  },

  // Actions that should fire after player clicks through (not before typewriter)
  _deferredActions: new Set([
    'start_battle_marcos', 'start_battle_valentin',
    'start_battle_alberto', 'start_ritual',
    'show_letter', 'show_pokedex',
  ]),

  // ── INTERNAL ──────────────────────────────────────────────

  _show() {
    const box = document.getElementById('dialogue-box');
    if (box) box.classList.add('visible');
  },

  _hide() {
    const box = document.getElementById('dialogue-box');
    if (box) {
      box.classList.remove('visible');
      if (box._skipHandler) {
        box.removeEventListener('click', box._skipHandler);
        box._skipHandler = null;
      }
    }
    this._stopTypewriter();
  },

  _goTo(key) {
    if (!key) { this._end(); return; }

    const node = DIALOGUE[key];
    if (!node) { console.warn('Missing dialogue node:', key); this._end(); return; }
    this._node = node;

    // Portrait
    const wrap = document.getElementById('dlg-portrait-wrap');
    const speaker = node.speaker || '';
    const spriteKey = node.portrait || this._speakerToSpriteKey(speaker);
    if (wrap) {
      if (spriteKey && SPRITES[spriteKey]) {
        wrap.innerHTML = SPRITES[spriteKey];
        wrap.style.display = '';
      } else {
        wrap.innerHTML = '';
        wrap.style.display = 'none';
      }
    }

    // Speaker name
    const nameEl = document.getElementById('dlg-speaker');
    if (nameEl) nameEl.textContent = speaker ? speaker.toUpperCase() : '';

    // Choices (hidden during typewriter)
    const choicesEl = document.getElementById('dlg-choices');
    if (choicesEl) choicesEl.innerHTML = '';

    // Fire action: deferred ones wait until player clicks; others fire immediately
    if (node.action && !this._deferredActions.has(node.action)) {
      Game.handleAction(node.action);
    }

    // Text
    this._fullText = node.text || '';
    this._charIdx = 0;
    this._startTypewriter();
  },

  _speakerToSpriteKey(speaker) {
    const map = {
      'CRISTINA': null,
      'PROFESSOR BIZCOCHÍN': 'professor',
      'PROFESOR BIZCOCHÍN': 'professor',
      'ALBERTO': 'alberto',
      'ANDREA': 'andrea',
      'JOSÉ': 'jose',
      'JOSE': 'jose',
      'MARCOS': 'marcos',
      'DON VALENTÍN': 'valentin',
      'VALENTÍN': 'valentin',
      'ABUELA': 'abuela',
      '???': null,
    };
    if (!speaker) return null;
    const k = speaker.toUpperCase();
    if (k in map) return map[k];
    return null;
  },

  _startTypewriter() {
    this._stopTypewriter();
    const textEl = document.getElementById('dlg-text');
    const cursor = document.getElementById('dlg-cursor');
    if (textEl) textEl.textContent = '';
    if (cursor) cursor.style.display = 'none';

    this._timer = setInterval(() => {
      if (!textEl) { this._stopTypewriter(); return; }
      if (this._charIdx < this._fullText.length) {
        textEl.textContent = this._fullText.slice(0, ++this._charIdx);
      } else {
        this._stopTypewriter();
        this._onTypingDone();
      }
    }, this._speed);

    // Click to skip typewriter — remove OLD handler first to avoid accumulation
    const box = document.getElementById('dialogue-box');
    if (box) {
      if (box._skipHandler) box.removeEventListener('click', box._skipHandler);
      box._skipHandler = (e) => {
        e.stopPropagation();
        if (this._charIdx < this._fullText.length) {
          // Skip to end
          this._stopTypewriter();
          if (textEl) textEl.textContent = this._fullText;
          this._charIdx = this._fullText.length;
          this._onTypingDone();
        } else {
          // Advance
          this._advance();
        }
      };
      box.addEventListener('click', box._skipHandler);
    }
  },

  _stopTypewriter() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  },

  _onTypingDone() {
    const node = this._node;
    if (!node) return;

    const cursor = document.getElementById('dlg-cursor');

    if (node.choices && node.choices.length) {
      // Show choices
      if (cursor) cursor.style.display = 'none';
      this._showChoices(node.choices);
    } else if (!this._fullText) {
      // Empty text — auto-advance without requiring a click
      this._advance();
    } else {
      // Show continue cursor
      if (cursor) cursor.style.display = '';
    }
  },

  _showChoices(choices) {
    const el = document.getElementById('dlg-choices');
    const textArea = document.getElementById('dlg-content');
    if (!el) return;
    // Hide the text area scroll to make room
    el.innerHTML = '';
    choices.forEach((c) => {
      const btn = document.createElement('button');
      btn.className = 'dlg-choice-btn';
      btn.textContent = c.text;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        el.innerHTML = '';
        this._goTo(c.goto);
      });
      el.appendChild(btn);
    });
  },

  _advance() {
    const node = this._node;
    if (!node) return;
    if (node.choices && node.choices.length) return; // handled by choice click

    const next = node.goto;
    if (next) {
      this._goTo(next);
    } else {
      this._end();
    }
  },

  _end() {
    // Fire deferred action (if any) before closing
    const node = this._node;
    if (node && node.action && this._deferredActions.has(node.action)) {
      Game.handleAction(node.action);
    }
    this._hide();
    const cb = this._onDone;
    this._node = null;
    this._onDone = null;
    if (cb) cb();
  },
};
