// ============================================================
//  RENDER — Pokémon Edición Bizcochín
//  Dibuja fondos en canvas y gestiona el layer de escena.
// ============================================================
'use strict';

const Renderer = {

  // ── BACKGROUNDS ──────────────────────────────────────────

  backgrounds: {

    stars(ctx, W, H) {
      ctx.fillStyle = '#08090f';
      ctx.fillRect(0, 0, W, H);
      const seed = 42;
      for (let i = 0; i < 120; i++) {
        const x = ((seed * i * 1731 + 5381) % W + W) % W;
        const y = ((seed * i * 3947 + 2017) % H + H) % H;
        const r = (i % 3 === 0) ? 1.5 : 1;
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 7) * 0.1})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      // Nebula glow
      const neb = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, H * 0.55);
      neb.addColorStop(0, 'rgba(88,50,160,0.18)');
      neb.addColorStop(1, 'transparent');
      ctx.fillStyle = neb; ctx.fillRect(0, 0, W, H);
    },

    room(ctx, W, H) {
      // Wallpaper
      const wall = ctx.createLinearGradient(0, 0, 0, H * 0.75);
      wall.addColorStop(0, '#fff8f0'); wall.addColorStop(1, '#ffecd2');
      ctx.fillStyle = wall; ctx.fillRect(0, 0, W, H * 0.75);
      // Subtle wallpaper dots
      ctx.fillStyle = 'rgba(255,180,100,0.08)';
      for (let x = 20; x < W; x += 40) for (let y = 20; y < H * 0.75; y += 40) {
        ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      }
      // Floor
      ctx.fillStyle = '#c8a06a'; ctx.fillRect(0, H * 0.75, W, H * 0.25);
      for (let x = 0; x < W; x += 50) {
        ctx.fillStyle = 'rgba(0,0,0,0.07)'; ctx.fillRect(x, H * 0.75, 2, H * 0.25);
      }
      // Window (top center)
      Renderer._window(ctx, W * 0.5 - 60, 20, 120, 140);
      // Birthday banners
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(50, 30); ctx.lineTo(W - 50, 30); ctx.stroke();
      const bunting = ['🎉','🎊','🎈','🎉','🎊'];
      bunting.forEach((e, i) => {
        ctx.font = '18px serif';
        ctx.fillText(e, 60 + i * ((W - 120) / 4), 46);
      });
      // Bed (left side)
      Renderer._rect(ctx, 30, H * 0.45, 180, 120, '#d4a76a', '#b8860b', 8);
      Renderer._rect(ctx, 30, H * 0.45, 180, 40, '#f3d5a3', '#d4a76a', 6);
      ctx.fillStyle = '#fde68a'; ctx.fillRect(40, H * 0.47, 40, 35);
      // Desk (right side)
      Renderer._rect(ctx, W - 200, H * 0.55, 160, 80, '#92400e', '#78350f', 4);
      Renderer._rect(ctx, W - 195, H * 0.50, 150, 10, '#a16207', '#92400e', 3);
    },

    exterior(ctx, W, H) {
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
      sky.addColorStop(0, '#7dd3fc'); sky.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.6);
      // Clouds
      Renderer._cloud(ctx, 60, 40, 1); Renderer._cloud(ctx, W - 180, 30, 0.8); Renderer._cloud(ctx, W * 0.45, 20, 0.6);
      // Grass
      ctx.fillStyle = '#4a7c4a'; ctx.fillRect(0, H * 0.6, W, H * 0.4);
      ctx.fillStyle = '#5a9a5a'; ctx.fillRect(0, H * 0.6, W, H * 0.06);
      // Path (center)
      ctx.fillStyle = '#d4a76a'; ctx.fillRect(W * 0.38, H * 0.55, W * 0.24, H * 0.45);
      ctx.fillStyle = '#c8986a'; ctx.fillRect(W * 0.48, H * 0.55, 4, H * 0.45);
      // Houses
      Renderer._house(ctx, 30, H * 0.3, 150, 180, '#fca5a5', '#dc2626', '#fee2e2');
      Renderer._house(ctx, W - 200, H * 0.3, 160, 190, '#93c5fd', '#2563eb', '#dbeafe');
      // Trees
      Renderer._tree(ctx, W * 0.34, H * 0.68, 0.9); Renderer._tree(ctx, W * 0.64, H * 0.68, 0.8);
      // Birthday decorations on street
      ctx.fillStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.strokeStyle = '#f59e0b';
      ctx.beginPath(); ctx.moveTo(0, H * 0.28); ctx.lineTo(W * 0.36, H * 0.28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W * 0.64, H * 0.28); ctx.lineTo(W, H * 0.28); ctx.stroke();
    },

    route(ctx, W, H) {
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55);
      sky.addColorStop(0, '#60a5fa'); sky.addColorStop(1, '#bae6fd');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.55);
      Renderer._cloud(ctx, 40, 30, 0.7); Renderer._cloud(ctx, W - 150, 50, 0.85); Renderer._cloud(ctx, W * 0.5, 15, 0.6);
      // Hills
      ctx.fillStyle = '#4ade80';
      ctx.beginPath(); ctx.arc(W * 0.2, H * 0.6, H * 0.35, 0, Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(W * 0.8, H * 0.58, H * 0.32, 0, Math.PI); ctx.fill();
      // Ground
      ctx.fillStyle = '#22c55e'; ctx.fillRect(0, H * 0.55, W, H * 0.45);
      ctx.fillStyle = '#16a34a'; ctx.fillRect(0, H * 0.55, W, H * 0.04);
      // Path
      ctx.fillStyle = '#c8986a'; ctx.fillRect(W * 0.35, 0, W * 0.3, H);
      ctx.fillStyle = '#b8886a'; ctx.fillRect(W * 0.5 - 1, 0, 2, H);
      // Fences
      for (let x = 0; x < W * 0.33; x += 30) {
        ctx.fillStyle = '#d4a76a'; ctx.fillRect(x, H * 0.6, 5, 24);
        if (x > 0) { ctx.fillStyle = '#c8986a'; ctx.fillRect(x - 25, H * 0.64, 26, 5); }
      }
      for (let x = W * 0.66; x < W; x += 30) {
        ctx.fillStyle = '#d4a76a'; ctx.fillRect(x, H * 0.6, 5, 24);
        if (x < W - 30) { ctx.fillStyle = '#c8986a'; ctx.fillRect(x + 5, H * 0.64, 26, 5); }
      }
      // Tall grass
      Renderer._grass(ctx, 60, H * 0.6, 12);
      Renderer._grass(ctx, W - 80, H * 0.6, 12);
      // Wildflowers
      ['#ef4444','#3b82f6','#facc15','#a855f7'].forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(20 + i * 30, H * 0.72, 5, 0, Math.PI * 2); ctx.fill();
      });
      // Trees
      Renderer._tree(ctx, 20, H * 0.6, 0.8); Renderer._tree(ctx, W - 20, H * 0.6, 0.8);
    },

    city(ctx, W, H) {
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      sky.addColorStop(0, '#a78bfa'); sky.addColorStop(1, '#ddd6fe');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.5);
      Renderer._cloud(ctx, 50, 30, 0.7); Renderer._cloud(ctx, W - 130, 40, 0.6);
      // Street
      ctx.fillStyle = '#6b7280'; ctx.fillRect(0, H * 0.5, W, H * 0.5);
      ctx.fillStyle = '#78716c'; ctx.fillRect(0, H * 0.5, W, H * 0.04);
      // Sidewalk
      ctx.fillStyle = '#d1d5db'; ctx.fillRect(0, H * 0.5, W, H * 0.08);
      // Buildings
      Renderer._building(ctx, 10, H * 0.15, 130, H * 0.38, '#fca5a5', '#dc2626');
      Renderer._building(ctx, W - 145, H * 0.12, 135, H * 0.41, '#93c5fd', '#2563eb');
      Renderer._building(ctx, W * 0.35, H * 0.08, W * 0.3, H * 0.46, '#86efac', '#16a34a');
      // Heart fountain (center)
      Renderer._heartFountain(ctx, W * 0.5, H * 0.6);
      // Lamp posts with garlands
      [W * 0.2, W * 0.8].forEach(x => {
        ctx.fillStyle = '#374151'; ctx.fillRect(x - 3, H * 0.4, 6, H * 0.18);
        ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x, H * 0.38, 10, 0, Math.PI * 2); ctx.fill();
      });
    },

    gym(ctx, W, H) {
      // Stone walls
      ctx.fillStyle = '#44403c'; ctx.fillRect(0, 0, W, H);
      for (let x = 0; x < W; x += 60) for (let y = 0; y < H; y += 30) {
        ctx.fillStyle = (Math.floor(x / 60 + y / 30) % 2 === 0) ? '#57534e' : '#44403c';
        ctx.fillRect(x, y, 58, 28);
      }
      // Colorful floor carpet
      const carpet = ctx.createLinearGradient(0, H * 0.6, 0, H);
      carpet.addColorStop(0, '#7c3aed'); carpet.addColorStop(1, '#4c1d95');
      ctx.fillStyle = carpet; ctx.fillRect(0, H * 0.6, W, H * 0.4);
      // Pollito decorations
      ctx.font = '40px serif';
      ctx.fillText('🐣', 40, 100); ctx.fillText('🐣', W - 80, 100);
      // Victory podium area
      ctx.fillStyle = '#fde68a'; ctx.fillRect(W * 0.3, H * 0.12, W * 0.4, 8);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(W * 0.3, H * 0.12, W * 0.4, 3);
    },

    forest(ctx, W, H) {
      // Night sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
      sky.addColorStop(0, '#0f0020'); sky.addColorStop(1, '#1a1040');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.7);
      // Stars
      for (let i = 0; i < 60; i++) {
        const x = (i * 1731 * 37 + 999) % W;
        const y = (i * 997 * 13 + 333) % (H * 0.65);
        ctx.fillStyle = `rgba(255,255,200,${0.5 + (i % 5) * 0.1})`;
        ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
      }
      // Moon
      const moonGrad = ctx.createRadialGradient(W * 0.8, 50, 0, W * 0.8, 50, 40);
      moonGrad.addColorStop(0, '#fef9c3'); moonGrad.addColorStop(1, 'rgba(254,249,195,0)');
      ctx.fillStyle = moonGrad; ctx.fillRect(0, 0, W, 120);
      ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.arc(W * 0.8, 50, 28, 0, Math.PI * 2); ctx.fill();
      // Forest ground
      ctx.fillStyle = '#0d2818'; ctx.fillRect(0, H * 0.7, W, H * 0.3);
      ctx.fillStyle = '#14532d'; ctx.fillRect(0, H * 0.7, W, H * 0.05);
      // Dense trees (dark silhouettes)
      [0.05, 0.15, 0.22, 0.70, 0.78, 0.88, 0.95].forEach(px => {
        Renderer._darkTree(ctx, W * px, H * 0.7, 0.8 + Math.random() * 0.4);
      });
      // Fireflies (golden dots)
      ctx.fillStyle = 'rgba(255,220,50,0.7)';
      for (let i = 0; i < 25; i++) {
        const x = (i * 1117 * 7 + 511) % W;
        const y = H * 0.2 + (i * 997 * 3 + 211) % (H * 0.55);
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, 'rgba(255,220,50,0.3)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow; ctx.fillRect(x - 12, y - 12, 24, 24);
        ctx.fillStyle = 'rgba(255,220,50,0.7)';
      }
      // Path
      ctx.fillStyle = '#1a3a2e'; ctx.fillRect(W * 0.37, 0, W * 0.26, H);
      ctx.fillStyle = 'rgba(255,200,50,0.08)'; ctx.fillRect(W * 0.37, 0, W * 0.26, H);
    },

    bridge(ctx, W, H) {
      // Evening sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
      sky.addColorStop(0, '#0f1e5f'); sky.addColorStop(0.5, '#1e3a8a'); sky.addColorStop(1, '#312e81');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.6);
      // Stars
      for (let i = 0; i < 60; i++) {
        const x = (i * 1731 + 999) % W;
        const y = (i * 997 + 111) % (H * 0.55);
        ctx.fillStyle = `rgba(255,255,255,${0.4 + (i % 5) * 0.12})`;
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
      }
      // Water (reflections)
      ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, H * 0.6, W, H * 0.4);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let y = H * 0.62; y < H; y += 10) { ctx.fillRect(0, y, W, 3); }
      // Bridge structure
      ctx.fillStyle = '#78716c'; ctx.fillRect(0, H * 0.52, W, H * 0.12);
      ctx.fillStyle = '#57534e'; ctx.fillRect(0, H * 0.52, W, H * 0.02);
      ctx.fillStyle = '#57534e'; ctx.fillRect(0, H * 0.62, W, H * 0.02);
      // Bridge stones
      for (let x = 0; x < W; x += 50) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.fillRect(x, H * 0.52, 2, H * 0.12);
      }
      // Torches
      [W * 0.1, W * 0.35, W * 0.65, W * 0.9].forEach(x => {
        ctx.fillStyle = '#44403c'; ctx.fillRect(x - 3, H * 0.38, 6, H * 0.16);
        const torch = ctx.createRadialGradient(x, H * 0.37, 0, x, H * 0.37, 22);
        torch.addColorStop(0, 'rgba(251,191,36,0.9)');
        torch.addColorStop(0.4, 'rgba(239,68,68,0.4)');
        torch.addColorStop(1, 'transparent');
        ctx.fillStyle = torch; ctx.fillRect(x - 22, H * 0.25, 44, 44);
      });
    },

    summit(ctx, W, H) {
      // Ethereal white-gold sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#fff'); sky.addColorStop(0.4, '#fef9c3'); sky.addColorStop(1, '#fce7f3');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
      // Aurora (pastel bands)
      [
        ['rgba(167,243,208,0.25)', 0.1], ['rgba(186,230,253,0.2)', 0.25],
        ['rgba(233,213,255,0.2)', 0.4],  ['rgba(253,230,138,0.15)', 0.55],
      ].forEach(([col, y]) => {
        const g = ctx.createLinearGradient(0, H * y, 0, H * (y + 0.15));
        g.addColorStop(0, col); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.fillRect(0, H * y, W, H * 0.15);
      });
      // Cloud floor
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 12; i++) {
        const x = (i * 1117 * 7) % W;
        const y = H * 0.72 + (i * 113) % 40;
        ctx.beginPath(); ctx.ellipse(x, y, 60 + (i % 3) * 20, 20, 0, 0, Math.PI * 2); ctx.fill();
      }
      // Moon / full moon
      const moonGrad = ctx.createRadialGradient(W * 0.5, 60, 0, W * 0.5, 60, 55);
      moonGrad.addColorStop(0, '#fffde7'); moonGrad.addColorStop(0.7, '#fef9c3'); moonGrad.addColorStop(1, 'rgba(254,243,199,0)');
      ctx.fillStyle = moonGrad; ctx.fillRect(W * 0.3, 0, W * 0.4, 130);
      ctx.fillStyle = '#fffde7'; ctx.beginPath(); ctx.arc(W * 0.5, 60, 40, 0, Math.PI * 2); ctx.fill();
      // Golden nest
      Renderer._goldenNest(ctx, W * 0.5, H * 0.6);
    },

    epilogue(ctx, W, H) {
      // Sunrise
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#1e3a8a'); sky.addColorStop(0.4, '#7c3aed');
      sky.addColorStop(0.7, '#f97316'); sky.addColorStop(1, '#fbbf24');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
      // Sun rising
      const sun = ctx.createRadialGradient(W * 0.5, H * 0.6, 0, W * 0.5, H * 0.6, 120);
      sun.addColorStop(0, 'rgba(255,255,200,0.9)'); sun.addColorStop(0.3, 'rgba(251,191,36,0.5)'); sun.addColorStop(1, 'transparent');
      ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
      // Silhouette horizon
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, H * 0.78, W, H * 0.22);
      // Stars fading
      for (let i = 0; i < 40; i++) {
        const x = (i * 1731 + 999) % W;
        const y = (i * 997 + 111) % (H * 0.45);
        ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 5) * 0.06})`;
        ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
      }
    },
  },

  // ── HELPER DRAWING FUNCTIONS ─────────────────────────────

  _rect(ctx, x, y, w, h, fill, stroke, r = 0) {
    ctx.fillStyle = fill;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.stroke();
    }
  },

  _window(ctx, x, y, w, h) {
    // Frame
    ctx.fillStyle = '#d4a76a'; ctx.fillRect(x - 6, y - 6, w + 12, h + 12);
    // Sky outside
    const outside = ctx.createLinearGradient(x, y, x, y + h);
    outside.addColorStop(0, '#7dd3fc'); outside.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = outside; ctx.fillRect(x, y, w, h);
    // Sun rays
    ctx.fillStyle = 'rgba(255,230,100,0.3)';
    ctx.beginPath(); ctx.moveTo(x + w * 0.5, y);
    for (let a = -60; a <= 60; a += 15) {
      const rad = a * Math.PI / 180;
      ctx.lineTo(x + w * 0.5 + Math.sin(rad) * h * 0.8, y + Math.cos(rad) * h * 0.8);
      ctx.lineTo(x + w * 0.5, y);
    }
    ctx.fill();
    // Curtains
    ctx.fillStyle = '#fca5a5';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * 0.28, y); ctx.lineTo(x + w * 0.12, y + h); ctx.lineTo(x, y + h); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w * 0.72, y); ctx.lineTo(x + w * 0.88, y + h); ctx.lineTo(x + w, y + h); ctx.fill();
    // Cross bar
    ctx.fillStyle = '#d4a76a'; ctx.fillRect(x, y + h * 0.5 - 3, w, 6); ctx.fillRect(x + w * 0.5 - 3, y, 6, h);
  },

  _cloud(ctx, x, y, s) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.arc(x, y, 18 * s, 0, Math.PI * 2);
    ctx.arc(x + 22 * s, y - 6 * s, 22 * s, 0, Math.PI * 2);
    ctx.arc(x + 44 * s, y, 17 * s, 0, Math.PI * 2); ctx.fill();
  },

  _house(ctx, x, y, w, h, wallColor, roofColor, windowColor) {
    const roofH = h * 0.35;
    // Wall
    ctx.fillStyle = wallColor; ctx.fillRect(x, y + roofH, w, h - roofH);
    // Roof
    ctx.fillStyle = roofColor;
    ctx.beginPath(); ctx.moveTo(x - 10, y + roofH); ctx.lineTo(x + w * 0.5, y); ctx.lineTo(x + w + 10, y + roofH); ctx.fill();
    // Door
    ctx.fillStyle = '#78350f'; ctx.fillRect(x + w * 0.38, y + h - 55, w * 0.24, 50);
    // Windows
    ctx.fillStyle = windowColor; ctx.fillRect(x + w * 0.1, y + roofH + 20, w * 0.28, 30);
    ctx.fillStyle = windowColor; ctx.fillRect(x + w * 0.62, y + roofH + 20, w * 0.28, 30);
    ctx.strokeStyle = '#a16207'; ctx.lineWidth = 2;
    ctx.strokeRect(x + w * 0.1, y + roofH + 20, w * 0.28, 30);
    ctx.strokeRect(x + w * 0.62, y + roofH + 20, w * 0.28, 30);
  },

  _building(ctx, x, y, w, h, wallColor, accentColor) {
    ctx.fillStyle = wallColor; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = accentColor; ctx.fillRect(x, y, w, 8);
    // Windows grid
    ctx.fillStyle = '#fef9c3';
    for (let wx = x + 10; wx < x + w - 10; wx += 22) {
      for (let wy = y + 16; wy < y + h - 20; wy += 22) {
        ctx.fillRect(wx, wy, 12, 10);
      }
    }
  },

  _tree(ctx, x, y, s) {
    // Trunk
    ctx.fillStyle = '#92400e'; ctx.fillRect(x - 6 * s, y - 20 * s, 12 * s, 40 * s);
    // Foliage layers
    [0, -20, -36].forEach(dy => {
      ctx.fillStyle = dy === 0 ? '#166534' : dy === -20 ? '#15803d' : '#16a34a';
      ctx.beginPath(); ctx.arc(x, y + dy * s, 28 * s - Math.abs(dy) * s * 0.3, 0, Math.PI * 2); ctx.fill();
    });
  },

  _darkTree(ctx, x, y, s) {
    ctx.fillStyle = '#0a1a0e'; ctx.fillRect(x - 8 * s, y - 20 * s, 16 * s, 50 * s);
    ctx.fillStyle = '#0a1a0e';
    ctx.beginPath(); ctx.arc(x, y - 60 * s, 35 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y - 90 * s, 25 * s, 0, Math.PI * 2); ctx.fill();
  },

  _grass(ctx, x, y, count) {
    ctx.strokeStyle = '#15803d'; ctx.lineWidth = 2;
    for (let i = 0; i < count; i++) {
      const gx = x + (i * 11 % 60);
      ctx.beginPath(); ctx.moveTo(gx, y); ctx.quadraticCurveTo(gx - 5, y - 15, gx, y - 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx + 6, y); ctx.quadraticCurveTo(gx + 12, y - 15, gx + 6, y - 20); ctx.stroke();
    }
  },

  _heartFountain(ctx, x, y) {
    // Basin
    ctx.fillStyle = '#93c5fd'; ctx.fillRect(x - 50, y - 10, 100, 20);
    ctx.fillStyle = '#bfdbfe'; ctx.fillRect(x - 40, y - 30, 80, 22);
    // Heart on top
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(x, y - 50);
    ctx.bezierCurveTo(x, y - 58, x - 14, y - 58, x - 14, y - 48);
    ctx.bezierCurveTo(x - 14, y - 38, x, y - 28, x, y - 28);
    ctx.bezierCurveTo(x, y - 28, x + 14, y - 38, x + 14, y - 48);
    ctx.bezierCurveTo(x + 14, y - 58, x, y - 58, x, y - 50);
    ctx.fill();
    // Water spray
    ctx.strokeStyle = 'rgba(147,197,253,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y - 50); ctx.quadraticCurveTo(x - 15, y - 80, x - 20, y - 60); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - 50); ctx.quadraticCurveTo(x + 15, y - 80, x + 20, y - 60); ctx.stroke();
  },

  _goldenNest(ctx, x, y) {
    // Golden glow
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 120);
    glow.addColorStop(0, 'rgba(251,191,36,0.4)');
    glow.addColorStop(0.6, 'rgba(251,191,36,0.1)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow; ctx.fillRect(x - 120, y - 120, 240, 240);
    // Nest base (cloud-like)
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.ellipse(x, y + 30, 80, 30, 0, 0, Math.PI * 2); ctx.fill();
    // Nest rim (golden feathers)
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(x, y + 20, 65, 25, 0, 0, Math.PI * 2); ctx.stroke();
  },

  // ── SCENE SETUP ──────────────────────────────────────────

  drawBackground(canvasEl, sceneId) {
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 800; canvasEl.height = 600;
    const fn = this.backgrounds[SCENES[sceneId]?.bg || sceneId];
    if (fn) fn(ctx, 800, 600);
  },

  drawBattleBackground(canvasEl) {
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 800; canvasEl.height = 250;
    const W = 800, H = 250;
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
    sky.addColorStop(0, '#a8d8f0'); sky.addColorStop(1, '#dbeafe');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.7);
    this._cloud(ctx, 60, 30, 0.6); this._cloud(ctx, W - 160, 20, 0.5);
    ctx.fillStyle = '#374151'; ctx.fillRect(0, H * 0.7, W, H * 0.3);
    // Enemy platform
    ctx.fillStyle = '#9ca3af';
    ctx.beginPath(); ctx.ellipse(W * 0.72, H * 0.62, 85, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d1d5db';
    ctx.beginPath(); ctx.ellipse(W * 0.72, H * 0.59, 80, 13, 0, 0, Math.PI * 2); ctx.fill();
    // Player platform
    ctx.fillStyle = '#4b5563';
    ctx.beginPath(); ctx.ellipse(W * 0.28, H * 0.84, 90, 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.ellipse(W * 0.28, H * 0.81, 85, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#16a34a';
    ctx.beginPath(); ctx.ellipse(W * 0.28, H * 0.795, 78, 11, 0, 0, Math.PI * 2); ctx.fill();
  },
};
