// ── Init 3D Rose via Sketchfab Viewer API (hides all UI including hint) ──
const roseIframe = document.getElementById('roseIframe');
const client = new Sketchfab(roseIframe);
client.init('6281bf3703584323bb4d8326f1f1b59d', {
  autostart: 1,
  autospin: 0.4,
  camera: 0,
  transparent: 1,
  ui_hint: 0,
  ui_controls: 0,
  ui_animations: 0,
  ui_infos: 0,
  ui_stop: 0,
  ui_inspector: 0,
  ui_watermark_link: 0,
  ui_watermark: 0,
  ui_ar: 0,
  ui_help: 0,
  ui_settings: 0,
  ui_vr: 0,
  ui_fullscreen: 0,
  ui_annotations: 0,
  ui_general_controls: 0,
  ui_loading: 0,
  ui_color: '1a0a0a',
  preload: 1,
  scrollwheel: 0,
  dnt: 1,
  success: function(api) {
    api.start();
    api.addEventListener('viewerready', function() {
      // Delay reveal so Sketchfab hint text fades away first
      setTimeout(() => { roseIframe.style.opacity = '1'; }, 2500);
    });
  },
  error: function() {
    setTimeout(() => { roseIframe.style.opacity = '1'; }, 5000);
  }
});

// ── Get name from URL ──
const params = new URLSearchParams(window.location.search);
const name = (params.get('name') || 'My Love').replace(/-/g, ' ');
document.getElementById('nameDisplay').textContent = name;

// ── Onboarding Logic ──
const nagMessages = [
  "Arre, press Yes na! \u{1F97A}",
  "Noo you HAVE to press Yes! \u{1F495}",
  "There's only one right answer... YES! \u{1F339}",
  "I won't give up! Press Yes! \u{1F624}\u{2764}\uFE0F",
  "Pretty please? Just press Yes! \u{1F979}",
  "You're breaking my heart... press Yes! \u{1F494}",
  "Okay I'll wait... but press YES! \u{1F339}\u{2728}"
];
let nagIndex = 0;

document.getElementById('btnNo').addEventListener('click', () => {
  const msg = document.getElementById('nagMsg');
  msg.textContent = nagMessages[nagIndex % nagMessages.length];
  msg.classList.add('show');
  nagIndex++;

  // Make the No button shrink and Yes button grow
  const noBtn = document.getElementById('btnNo');
  const yesBtn = document.getElementById('btnYes');
  const scale = Math.max(0.6, 1 - nagIndex * 0.08);
  noBtn.style.transform = `scale(${scale})`;
  yesBtn.style.transform = `scale(${1 + nagIndex * 0.07})`;
});

document.getElementById('btnYes').addEventListener('click', () => {
  document.getElementById('onboarding').classList.add('hide');
  setTimeout(() => {
    document.getElementById('main-screen').classList.add('show');
    createPetals();
    createHearts();
    createSparkles();
    createBloomBurst();
    createHeartRipples();
  }, 400);
});

// ── Create Falling Petals ──
function createPetals() {
  const petalEmojis = ['\u{1F338}', '\u{1F3F5}\uFE0F', '\u{1F4AE}', '\u{1F33A}', '\u{1FAB7}', '\u{1F337}'];
  const container = document.getElementById('main-screen');

  for (let i = 0; i < 35; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -60px;
      font-size: ${Math.random() * 18 + 14}px;
      --size: ${Math.random() * 20 + 16}px;
      --dur: ${Math.random() * 6 + 6}s;
      --delay: ${Math.random() * 8}s;
      --drift: ${(Math.random() - 0.5) * 150}px;
      --spin: ${Math.random() * 360}deg;
    `;
    container.appendChild(el);
  }
}

// ── Create Floating Hearts ──
function createHearts() {
  const hearts = ['\u{2764}\uFE0F', '\u{1F495}', '\u{1F497}', '\u{1F496}', '\u{1F498}', '\u{1F49D}'];
  const container = document.getElementById('main-screen');

  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -50px;
      --size: ${Math.random() * 16 + 16}px;
      --dur: ${Math.random() * 6 + 7}s;
      --delay: ${Math.random() * 10}s;
    `;
    container.appendChild(el);
  }
}

// ── Create Garden on all 4 edges ──
function createGarden() {
  const flowers = ['\u{1F339}', '\u{1F337}', '\u{1F338}', '\u{1F33A}', '\u{1F33B}', '\u{1F490}', '\u{1FAB3}', '\u{1F33C}', '\u{1F3F5}\uFE0F', '\u{1FAB7}'];
  const isMobile = window.innerWidth < 500;

  const edges = [
    { id: 'gardenBottom', count: isMobile ? 8 : 14 },
    { id: 'gardenTop',    count: isMobile ? 8 : 14 },
    { id: 'gardenLeft',   count: isMobile ? 6 : 10 },
    { id: 'gardenRight',  count: isMobile ? 6 : 10 },
  ];

  edges.forEach((edge, edgeIdx) => {
    const container = document.getElementById(edge.id);
    for (let i = 0; i < edge.count; i++) {
      const el = document.createElement('div');
      el.className = 'garden-flower';
      el.style.cssText = `--dur: ${0.5 + Math.random() * 0.5}s; --delay: ${edgeIdx * 0.3 + i * 0.12 + 0.4}s;`;
      el.innerHTML = `<span>${flowers[Math.floor(Math.random() * flowers.length)]}</span>`;
      container.appendChild(el);
    }
  });
}

// ── Sparkles around Rose ──
function createSparkles() {
  const ring = document.getElementById('sparkleRing');
  const count = 14;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 48;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.cssText = `
      left: ${x}%; top: ${y}%;
      --dur: ${1.5 + Math.random() * 1.5}s;
      --delay: ${i * 0.2}s;
    `;
    ring.appendChild(sp);
  }
}

// ── Bloom burst on reveal ──
function createBloomBurst() {
  const colors = ['#ff6b81', '#ffd700', '#ff9ff3', '#ff6348', '#ffc0cb', '#ee5a24'];
  const container = document.getElementById('main-screen');

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'bloom-particle';
    const angle = (i / 30) * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    p.style.cssText = `
      left: 50%; top: 40%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${Math.sin(angle) * dist}px;
      animation: burstOut ${0.8 + Math.random() * 0.6}s ${Math.random() * 0.3}s ease-out forwards;
    `;
    container.appendChild(p);
  }
}

// ── Pixelated Heart Ripples behind rose ──
function createHeartRipples() {
  const container = document.getElementById('heartRipples');
  const colors = [
    'rgba(255, 50, 80, 0.8)',
    'rgba(255, 80, 120, 0.7)',
    'rgba(255, 100, 140, 0.6)',
    'rgba(200, 30, 60, 0.7)',
    'rgba(255, 60, 100, 0.65)',
    'rgba(220, 40, 80, 0.6)',
    'rgba(255, 120, 160, 0.5)',
    'rgba(180, 20, 50, 0.55)',
  ];
  const count = 8;

  for (let i = 0; i < count; i++) {
    const ripple = document.createElement('div');
    ripple.className = 'heart-ripple';
    const pixelSize = 3 + Math.random() * 2;
    ripple.style.cssText = `
      --dur: ${3 + Math.random() * 2}s;
      --delay: ${i * 0.45}s;
      --clr: ${colors[i % colors.length]};
      --max-scale: ${6 + Math.random() * 4};
    `;
    const heart = document.createElement('div');
    heart.className = 'pixel-heart';
    heart.style.transform = `scale(${pixelSize}) translate(-6px, -5px)`;
    ripple.appendChild(heart);
    container.appendChild(ripple);
  }
}