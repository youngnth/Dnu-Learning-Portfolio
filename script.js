/**
 * DNU LEARNING PORTFOLIO — NGUYỄN TUẤN HƯNG (MSV: 2071080075)
 * Interactive Volumetric Silk Aurora WebGL Engine, Inertial Smooth Scroll & 3D Card Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initInertialSmoothScroll();
  initSilkAuroraWebGLBackground();
  initScrollProgress();
  initNavbarScrollSpy();
  initSpotlightCards();
  initTiltCards();
  initWheelOfLifeChart();
  initProgressBars();
  initScrollReveal();
});

/**
 * 1. Inertial Smooth Scroll Engine (Mouse Wheel Momentum + Long Coasting Deceleration)
 *    - Frame-rate independent (dt-based) exponential friction damper
 *    - Consecutive wheel-notch momentum buildup so spinning the wheel glides & decelerates smoothly after stopping
 *    - Instant direction-reversal response & anchor link smooth gliding
 */
function initInertialSmoothScroll() {
  let targetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  let currentScrollY = targetScrollY;
  let isTicking = false;
  let lastFrameTime = 0;
  let lastWheelTime = 0;
  let lastWheelDir = 0;
  let wheelStreak = 0;

  // Lower damping = longer, silkier coasting tail after the mouse wheel stops
  const DAMPING = 3.65;

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function startLoop() {
    if (!isTicking) {
      isTicking = true;
      lastFrameTime = performance.now();
      requestAnimationFrame(updateScroll);
    }
  }

  function updateScroll(now) {
    if (!isTicking) return;

    const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) * 0.001));
    lastFrameTime = now;

    // Clamp target within valid document bounds in case layout resized
    targetScrollY = Math.min(maxScroll(), Math.max(0, targetScrollY));

    const diff = targetScrollY - currentScrollY;

    if (Math.abs(diff) > 0.25) {
      // Frame-rate independent exponential decay: glides smoothly and slows down gradually
      const alpha = 1.0 - Math.exp(-DAMPING * dt);
      currentScrollY += diff * alpha;
      window.scrollTo(0, currentScrollY);
      requestAnimationFrame(updateScroll);
    } else {
      currentScrollY = targetScrollY;
      window.scrollTo(0, Math.round(currentScrollY));
      isTicking = false;
    }
  }

  // Always attach wheel listener (do NOT gate on pointer:coarse, which breaks touchscreen Windows laptops using a mouse)
  window.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey || e.metaKey) return; // Allow browser pinch/ctrl zoom

      e.preventDefault();

      // Normalize wheel delta across pixel, line, and page modes
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 42;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight * 0.85;
      }

      const now = performance.now();
      const dir = Math.sign(delta);
      const elapsed = now - lastWheelTime;

      // Build rotational momentum when spinning the mouse wheel continuously in the same direction
      if (dir === lastWheelDir && elapsed < 140) {
        wheelStreak = Math.min(6, wheelStreak + 1);
      } else {
        wheelStreak = 0;
      }

      // If the user suddenly reverses wheel direction while coasting, shed opposing residual distance first
      const remaining = targetScrollY - currentScrollY;
      if (dir !== 0 && Math.sign(remaining) !== 0 && dir !== Math.sign(remaining)) {
        targetScrollY = currentScrollY + remaining * 0.2;
      }

      lastWheelTime = now;
      lastWheelDir = dir;

      // Project targetScrollY ahead with momentum boost so stopping the wheel leaves a smooth deceleration runway
      const momentumMultiplier = 1.18 + wheelStreak * 0.08;
      targetScrollY = Math.min(
        maxScroll(),
        Math.max(0, targetScrollY + delta * momentumMultiplier)
      );

      startLoop();
    },
    { passive: false }
  );

  // Sync position when scrolling natively via scrollbar thumb, touch swipe, or middle-click autoscroll
  window.addEventListener(
    'scroll',
    () => {
      if (!isTicking) {
        targetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        currentScrollY = targetScrollY;
      }
    },
    { passive: true }
  );

  // Yield immediately if user clicks the native browser scrollbar track/thumb
  window.addEventListener(
    'mousedown',
    (e) => {
      if (e.clientX >= document.documentElement.clientWidth - 18) {
        isTicking = false;
        targetScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        currentScrollY = targetScrollY;
      }
    },
    { passive: true }
  );

  // Keyboard navigation with inertial glide
  window.addEventListener('keydown', (e) => {
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable)) {
      return;
    }

    const step = window.innerHeight * 0.78;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      targetScrollY = Math.min(maxScroll(), targetScrollY + 135);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      targetScrollY = Math.max(0, targetScrollY - 135);
    } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault();
      targetScrollY = Math.min(maxScroll(), targetScrollY + step);
    } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault();
      targetScrollY = Math.max(0, targetScrollY - step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetScrollY = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetScrollY = maxScroll();
    } else {
      return;
    }
    startLoop();
  });

  // Smooth anchor navigation integrated with inertial scroll state
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const targetEl = document.querySelector(href);
      if (!targetEl) return;
      e.preventDefault();
      targetScrollY = Math.min(maxScroll(), Math.max(0, targetEl.offsetTop - 24));
      startLoop();
    });
  });
}

/**
 * 2. Volumetric Silk Aurora & Interactive Liquid Light Mesh WebGL Shader Background
 *    - Multi-layered flowing 3D silk light ribbons (Sapphire Blue, Electric Cyan, Indigo & Warm DNU Amber)
 *    - Subtle architectural micro-grid illuminated by aurora waves & mouse light
 *    - Smooth cursor fluid distortion + scroll phase shift
 */
function initSilkAuroraWebGLBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    powerPreference: 'high-performance'
  });

  if (!gl) return;

  let width = 0;
  let height = 0;

  function resize() {
    // Performance: the aurora is soft & blurry by nature, so render it at ~60% of CSS pixels
    // and let the GPU upscale it (≈3–5x fewer fragment shader invocations, same look)
    const scale = window.innerWidth > 1600 ? 0.5 : 0.62;
    width = canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
    height = canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
    gl.viewport(0, 0, width, height);
  }

  resize();
  window.addEventListener('resize', resize);

  const vsSource = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos * 0.5 + 0.5;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    varying vec2 vUv;

    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uMouseEnergy;
    uniform float uScroll;

    // Smooth 2D rotation
    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // Compact procedural hash & value noise
    float hash21(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
        mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    // Domain-warped FBM for liquid silk folds
    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.5;
      mat2 m = rot(0.55);
      for (int i = 0; i < 4; i++) {
        v += amp * noise(p);
        p = m * p * 2.04 + vec2(1.7, 9.2);
        amp *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
      vec2 p = (vUv - 0.5) * aspect;
      vec2 mPos = (uMouse - 0.5) * aspect;

      // Interactive cursor fluid warp
      vec2 toMouse = p - mPos;
      float mDist = length(toMouse);
      float mouseField = exp(-mDist * mDist * 4.2);
      vec2 warpedP = p - toMouse * mouseField * (0.14 + uMouseEnergy * 0.16);

      float t = uTime * 0.22;
      float scrollShift = uScroll * 0.55;

      // Layered domain warping
      vec2 q = vec2(
        fbm(warpedP * 1.35 + vec2(t * 0.6, scrollShift * 0.4)),
        fbm(warpedP * 1.35 + vec2(-t * 0.45, 3.4 - scrollShift * 0.3))
      );

      vec2 r = vec2(
        fbm(warpedP * 1.8 + 1.6 * q + vec2(1.7 + t * 0.5, 9.2)),
        fbm(warpedP * 1.8 + 1.6 * q + vec2(8.3 - t * 0.4, 2.8))
      );

      float silk = fbm(warpedP * 1.4 + 1.85 * r);

      // Flowing Volumetric Silk Ribbons (Harmonic Wave Interference)
      vec2 rp = rot(-0.26) * warpedP;
      float wave1 = sin(rp.x * 2.6 + q.x * 3.8 + t * 1.5 - scrollShift) * 0.34;
      float ribbon1 = exp(-abs(rp.y - wave1 + 0.08) * 4.6);

      float wave2 = cos(rp.x * 2.1 - r.y * 3.5 - t * 1.15 + scrollShift * 0.7) * 0.42;
      float ribbon2 = exp(-abs(rp.y - wave2 - 0.12) * 5.2);

      float wave3 = sin(rp.x * 3.4 + silk * 4.2 + t * 0.9) * 0.28;
      float ribbon3 = exp(-abs(rp.y - wave3) * 6.5);

      // Base Midnight Obsidian & Deep Navy Canvas
      vec3 bgBase = vec3(0.012, 0.022, 0.055);
      vec3 royalBlue = vec3(0.08, 0.30, 0.80);
      vec3 electricCyan = vec3(0.12, 0.58, 0.90);
      vec3 deepIndigo = vec3(0.26, 0.16, 0.72);
      vec3 dnuAmber = vec3(0.96, 0.46, 0.14);

      vec3 col = bgBase;

      // Ambient FBM nebula depth
      col += mix(deepIndigo, royalBlue, clamp(q.x * 1.3, 0.0, 1.0)) * smoothstep(0.18, 0.85, silk) * 0.42;

      // Layer the 3 glowing silk ribbons
      col += royalBlue * pow(ribbon1, 1.45) * 0.62;
      col += electricCyan * pow(ribbon2, 1.8) * 0.44;
      col += mix(electricCyan, dnuAmber, 0.58) * pow(ribbon3, 2.2) * 0.28;

      // Specular silk crest highlights
      float crest = pow( clamp(ribbon1 * ribbon2 * 1.85, 0.0, 1.0), 1.8 );
      col += vec3(0.65, 0.88, 1.0) * crest * 0.55;

      // Subtle architectural micro-grid illuminated by silk & cursor
      vec2 gridUv = warpedP * 15.0;
      vec2 gridLine = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
      float gridMask = 1.0 - min(min(gridLine.x, gridLine.y), 1.0);
      float gridLight = (ribbon1 * 0.5 + ribbon2 * 0.5 + mouseField * 1.25) * 0.075;
      col += electricCyan * gridMask * gridLight;

      // Interactive Mouse Volumetric Spotlight
      col += mix(electricCyan, royalBlue, 0.4) * mouseField * (0.16 + uMouseEnergy * 0.18);

      // Subtle film grain to prevent gradient banding
      float grain = (hash21(vUv * uResolution + fract(uTime * 60.0)) - 0.5) * 0.016;
      col += grain;

      // Soft cinematic vignette
      float vig = 1.0 - dot(vUv - 0.5, vUv - 0.5) * 0.75;
      col *= clamp(vig, 0.35, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  // Enable standard derivatives if available for ultra-crisp micro-grid lines
  gl.getExtension('OES_standard_derivatives');

  // Safe fallback if OES_standard_derivatives is not supported on a device
  const safeFsSource = fsSource.replace(
    'vec2 gridLine = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);',
    'vec2 gridLine = abs(fract(gridUv - 0.5) - 0.5) / vec2(0.025);'
  );

  const prog = gl.createProgram();
  const vs = compileShader(gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl.FRAGMENT_SHADER, safeFsSource);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

  const aPosLoc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPosLoc);
  gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

  const uTimeLoc = gl.getUniformLocation(prog, 'uTime');
  const uResLoc = gl.getUniformLocation(prog, 'uResolution');
  const uMouseLoc = gl.getUniformLocation(prog, 'uMouse');
  const uMouseEnergyLoc = gl.getUniformLocation(prog, 'uMouseEnergy');
  const uScrollLoc = gl.getUniformLocation(prog, 'uScroll');

  let targetMouseX = 0.5, targetMouseY = 0.5;
  let curMouseX = 0.5, curMouseY = 0.5;
  let mouseEnergy = 0.0;
  let targetScroll = 0.0, curScroll = 0.0;

  window.addEventListener(
    'mousemove',
    (e) => {
      const nx = e.clientX / Math.max(window.innerWidth, 1);
      const ny = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
      const dist = Math.hypot(nx - targetMouseX, ny - targetMouseY);
      mouseEnergy = Math.min(1.2, mouseEnergy + dist * 4.5);
      targetMouseX = nx;
      targetMouseY = ny;
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      targetScroll = scrollY / Math.max(window.innerHeight, 600);
    },
    { passive: true }
  );

  const startTime = performance.now();
  let running = true;

  // Pause the shader entirely while the tab is hidden (saves GPU/battery)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      requestAnimationFrame(render);
    }
  });

  function render(now) {
    if (!running) return;
    const elapsed = (now - startTime) * 0.001;

    curMouseX += (targetMouseX - curMouseX) * 0.065;
    curMouseY += (targetMouseY - curMouseY) * 0.065;
    mouseEnergy *= 0.93;
    curScroll += (targetScroll - curScroll) * 0.07;

    gl.uniform1f(uTimeLoc, elapsed);
    gl.uniform2f(uResLoc, width, height);
    gl.uniform2f(uMouseLoc, curMouseX, curMouseY);
    gl.uniform1f(uMouseEnergyLoc, mouseEnergy);
    gl.uniform1f(uScrollLoc, curScroll);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * 3. Interactive SVG Wheel of Life ("Bánh xe mục tiêu" — Trang 06)
 *    - Exact content, sector angles, curved outer ring labels & 1..10 axis scales from Page 06
 *    - Redesigned in the dark-mode glassmorphic & luminous Cyan/Blue/Orange HUD style of the landing page
 *    - Smooth entrance animation + bidirectional hover highlight with the score table
 */
function initWheelOfLifeChart() {
  const svg = document.getElementById('wheel-of-life-svg');
  if (!svg) return;

  svg.innerHTML = '';

  // Exact sector angles matching the original slide layout (225°..270° = Top-Left GIA ĐÌNH, etc.)
  const categories = [
    { name: 'GIA ĐÌNH', score: 9, startDeg: 225, endDeg: 270 },
    { name: 'TÀI CHÍNH', score: 6, startDeg: 270, endDeg: 315 },
    { name: 'GIẢI TRÍ', score: 8, startDeg: 315, endDeg: 360 },
    { name: 'QUAN HỆ', score: 7, startDeg: 0, endDeg: 45 },
    { name: 'THIỆN NGUYỆN', score: 6, startDeg: 45, endDeg: 90 },
    { name: 'HỌC TẬP', score: 7, startDeg: 90, endDeg: 135 },
    { name: 'SỰ NGHIỆP', score: 4, startDeg: 135, endDeg: 180 },
    { name: 'SỨC KHỎE', score: 4, startDeg: 180, endDeg: 225 }
  ];

  const cx = 240;
  const cy = 240;
  const innerR = 160; // 10 levels * 16px each
  const outerR = 204; // Outer ring radius
  const textR = 182;  // Mid-radius of the outer label ring
  const stepR = innerR / 10; // 16px per score unit
  const ns = 'http://www.w3.org/2000/svg';

  // 1. Defs: Dark Glassmorphic & Neon Gradients, Glow Filter & Curved Label Arcs
  const defs = document.createElementNS(ns, 'defs');
  let arcsHtml = '';

  categories.forEach((cat, i) => {
    const startRad = (cat.startDeg * Math.PI) / 180;
    const endRad = (cat.endDeg * Math.PI) / 180;
    const x1 = cx + textR * Math.cos(startRad);
    const y1 = cy + textR * Math.sin(startRad);
    const x2 = cx + textR * Math.cos(endRad);
    const y2 = cy + textR * Math.sin(endRad);
    arcsHtml += `<path id="wheel-label-arc-${i}" d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${textR} ${textR} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}" fill="none" />`;
  });

  defs.innerHTML = `
    <radialGradient id="wheelOuterRingGrad" cx="50%" cy="50%" r="50%">
      <stop offset="72%" stop-color="#0f172a" stop-opacity="0.92" />
      <stop offset="88%" stop-color="#1e293b" stop-opacity="0.88" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96" />
    </radialGradient>
    <linearGradient id="wheelRimStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.65" />
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0.6" />
    </linearGradient>
    <radialGradient id="wheelInnerDiscGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#091326" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#050b16" stop-opacity="0.92" />
    </radialGradient>
    <radialGradient id="wheelSectorGrad" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse" fx="${cx}" fy="${cy}">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.18" />
      <stop offset="55%" stop-color="#2563eb" stop-opacity="0.52" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.82" />
    </radialGradient>
    <radialGradient id="wheelSectorActiveGrad" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse" fx="${cx}" fy="${cy}">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.28" />
      <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.68" />
      <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.95" />
    </radialGradient>
    <filter id="wheelAmbientGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#020617" flood-opacity="0.7" />
    </filter>
    ${arcsHtml}
  `;
  svg.appendChild(defs);

  // 2. Outer Dark Glassmorphic Ring (r = 204)
  const outerCircle = document.createElementNS(ns, 'circle');
  outerCircle.setAttribute('cx', cx);
  outerCircle.setAttribute('cy', cy);
  outerCircle.setAttribute('r', outerR);
  outerCircle.setAttribute('fill', 'url(#wheelOuterRingGrad)');
  outerCircle.setAttribute('filter', 'url(#wheelAmbientGlow)');
  svg.appendChild(outerCircle);

  // Outer Ring Sector Highlight Segments (subtle glow under the active category title)
  const outerRingGroup = document.createElementNS(ns, 'g');
  svg.appendChild(outerRingGroup);
  const outerBandElements = [];

  categories.forEach((cat, i) => {
    const startRad = (cat.startDeg * Math.PI) / 180;
    const endRad = (cat.endDeg * Math.PI) / 180;
    const ox1 = cx + outerR * Math.cos(startRad);
    const oy1 = cy + outerR * Math.sin(startRad);
    const ox2 = cx + outerR * Math.cos(endRad);
    const oy2 = cy + outerR * Math.sin(endRad);
    const ix2 = cx + innerR * Math.cos(endRad);
    const iy2 = cy + innerR * Math.sin(endRad);
    const ix1 = cx + innerR * Math.cos(startRad);
    const iy1 = cy + innerR * Math.sin(startRad);

    const bandData = [
      `M ${ox1.toFixed(2)} ${oy1.toFixed(2)}`,
      `A ${outerR} ${outerR} 0 0 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)}`,
      `L ${ix2.toFixed(2)} ${iy2.toFixed(2)}`,
      `A ${innerR} ${innerR} 0 0 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)}`,
      'Z'
    ].join(' ');

    const band = document.createElementNS(ns, 'path');
    band.setAttribute('d', bandData);
    band.setAttribute('fill', i % 2 === 0 ? 'rgba(30, 41, 59, 0.42)' : 'rgba(15, 23, 42, 0.42)');
    band.style.transition = 'fill 0.25s ease';
    outerRingGroup.appendChild(band);
    outerBandElements.push(band);
  });

  // 3. Inner Dark Radar Disc (r = 160)
  const innerDisc = document.createElementNS(ns, 'circle');
  innerDisc.setAttribute('cx', cx);
  innerDisc.setAttribute('cy', cy);
  innerDisc.setAttribute('r', innerR);
  innerDisc.setAttribute('fill', 'url(#wheelInnerDiscGrad)');
  svg.appendChild(innerDisc);

  // 4. 8 Luminous Score Wedges + Full-Sector Hover Hit Areas
  const sectorGroup = document.createElementNS(ns, 'g');
  svg.appendChild(sectorGroup);

  const hitGroup = document.createElementNS(ns, 'g');
  const sectorElements = [];
  const labelElements = [];

  categories.forEach((cat, i) => {
    const startRad = (cat.startDeg * Math.PI) / 180;
    const endRad = (cat.endDeg * Math.PI) / 180;
    const r = stepR * cat.score;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const pathData = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    const wedge = document.createElementNS(ns, 'path');
    wedge.setAttribute('d', pathData);
    wedge.setAttribute('fill', 'url(#wheelSectorGrad)');
    wedge.setAttribute('stroke', 'rgba(56, 189, 248, 0.75)');
    wedge.setAttribute('stroke-width', '1.25');
    wedge.setAttribute('class', 'wheel-sector');
    wedge.setAttribute('data-sector', i);
    wedge.style.transformOrigin = `${cx}px ${cy}px`;
    wedge.style.transform = 'scale(0)';
    wedge.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease, stroke 0.25s ease';
    sectorGroup.appendChild(wedge);
    sectorElements.push(wedge);

    // Transparent full-sector hit area (from center to outerR)
    const hx1 = cx + outerR * Math.cos(startRad);
    const hy1 = cy + outerR * Math.sin(startRad);
    const hx2 = cx + outerR * Math.cos(endRad);
    const hy2 = cy + outerR * Math.sin(endRad);
    const hitData = `M ${cx} ${cy} L ${hx1.toFixed(2)} ${hy1.toFixed(2)} A ${outerR} ${outerR} 0 0 1 ${hx2.toFixed(2)} ${hy2.toFixed(2)} Z`;

    const hitWedge = document.createElementNS(ns, 'path');
    hitWedge.setAttribute('d', hitData);
    hitWedge.setAttribute('fill', 'transparent');
    hitWedge.style.cursor = 'pointer';
    hitWedge.setAttribute('data-sector', i);
    hitGroup.appendChild(hitWedge);
  });

  // 5. 10 Concentric Radar Rings (drawn ON TOP of the wedges)
  const gridGroup = document.createElementNS(ns, 'g');
  gridGroup.setAttribute('pointer-events', 'none');
  for (let level = 1; level <= 10; level++) {
    const r = stepR * level;
    const ring = document.createElementNS(ns, 'circle');
    ring.setAttribute('cx', cx);
    ring.setAttribute('cy', cy);
    ring.setAttribute('r', r);
    ring.setAttribute('fill', 'none');
    if (level === 10) {
      ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.48)');
      ring.setAttribute('stroke-width', '1.4');
    } else if (level === 7) {
      // Level 7 target ring emphasized like in the original slide
      ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.36)');
      ring.setAttribute('stroke-width', '1.25');
    } else {
      ring.setAttribute('stroke', 'rgba(148, 163, 184, 0.16)');
      ring.setAttribute('stroke-width', '0.8');
    }
    gridGroup.appendChild(ring);
  }

  // Outer Glowing Rim Border (r = 204)
  const outerBorder = document.createElementNS(ns, 'circle');
  outerBorder.setAttribute('cx', cx);
  outerBorder.setAttribute('cy', cy);
  outerBorder.setAttribute('r', outerR);
  outerBorder.setAttribute('fill', 'none');
  outerBorder.setAttribute('stroke', 'url(#wheelRimStrokeGrad)');
  outerBorder.setAttribute('stroke-width', '1.6');
  gridGroup.appendChild(outerBorder);

  // 6. 8 Radial Dividing Spokes from center (240, 240) to outerR (204)
  for (let i = 0; i < 8; i++) {
    const deg = i * 45;
    const rad = (deg * Math.PI) / 180;
    const x2 = cx + outerR * Math.cos(rad);
    const y2 = cy + outerR * Math.sin(rad);

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', cx);
    line.setAttribute('y1', cy);
    line.setAttribute('x2', x2.toFixed(2));
    line.setAttribute('y2', y2.toFixed(2));
    line.setAttribute('stroke', 'rgba(148, 163, 184, 0.26)');
    line.setAttribute('stroke-width', '0.95');
    gridGroup.appendChild(line);
  }

  // Center glowing pivot dot
  const centerDot = document.createElementNS(ns, 'circle');
  centerDot.setAttribute('cx', cx);
  centerDot.setAttribute('cy', cy);
  centerDot.setAttribute('r', '2.8');
  centerDot.setAttribute('fill', '#38bdf8');
  gridGroup.appendChild(centerDot);

  svg.appendChild(gridGroup);

  // 7. Curved Bold Montserrat Labels inside the Outer Ring
  const labelGroup = document.createElementNS(ns, 'g');
  labelGroup.setAttribute('pointer-events', 'none');
  categories.forEach((cat, i) => {
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('font-family', "'Montserrat', sans-serif");
    text.setAttribute('font-size', '12.5');
    text.setAttribute('font-weight', '700');
    text.setAttribute('fill', '#e2e8f0');
    text.setAttribute('letter-spacing', '0.06em');
    text.setAttribute('dominant-baseline', 'central');
    text.style.transition = 'fill 0.25s ease, opacity 0.25s ease';

    const textPath = document.createElementNS(ns, 'textPath');
    textPath.setAttribute('href', `#wheel-label-arc-${i}`);
    textPath.setAttribute('startOffset', '50%');
    textPath.setAttribute('text-anchor', 'middle');
    textPath.textContent = cat.name;

    text.appendChild(textPath);
    labelGroup.appendChild(text);
    labelElements.push(text);
  });
  svg.appendChild(labelGroup);

  // 8. 4 Cardinal Axis Number Scales (1..10 on Top, Bottom, Left, Right axes)
  const numGroup = document.createElementNS(ns, 'g');
  numGroup.setAttribute('pointer-events', 'none');
  numGroup.setAttribute('font-family', "'Montserrat', sans-serif");
  numGroup.setAttribute('font-size', '9');
  numGroup.setAttribute('font-weight', '600');
  numGroup.setAttribute('fill', 'rgba(203, 213, 225, 0.72)');

  function addAxisNumber(x, y, val, anchor) {
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', x.toFixed(1));
    t.setAttribute('y', y.toFixed(1));
    t.setAttribute('text-anchor', anchor);
    t.textContent = String(val);
    numGroup.appendChild(t);
  }

  for (let level = 1; level <= 10; level++) {
    // Top vertical axis
    addAxisNumber(cx - 4, cy - (level - 0.30) * stepR, level, 'end');
    // Bottom vertical axis
    addAxisNumber(cx - 4, cy + (level - 0.22) * stepR, level, 'end');
    // Left horizontal axis
    addAxisNumber(cx - (level - 0.5) * stepR, cy - 4, level, 'middle');
    // Right horizontal axis
    addAxisNumber(cx + (level - 0.5) * stepR, cy - 4, level, 'middle');
  }
  svg.appendChild(numGroup);

  // Append interactive hit layer on top
  svg.appendChild(hitGroup);

  // 9. Animate sectors expanding slowly & replay when scrolled back into view (up or down)
  let wheelTimers = [];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
          wheelTimers.forEach((t) => clearTimeout(t));
          wheelTimers = [];
          sectorElements.forEach((el, idx) => {
            const timer = setTimeout(() => {
              el.style.transform = 'scale(1)';
              el.style.opacity = '1';
            }, idx * 90);
            wheelTimers.push(timer);
          });
        } else if (!entry.isIntersecting) {
          wheelTimers.forEach((t) => clearTimeout(t));
          wheelTimers = [];
          sectorElements.forEach((el) => {
            el.style.transform = 'scale(0.08)';
            el.style.opacity = '0';
          });
        }
      });
    },
    { threshold: [0, 0.08, 0.2] }
  );
  observer.observe(svg);

  // 10. Bidirectional Hover Highlight with Score Table (#wheel-score-list)
  const rows = document.querySelectorAll('.wheel-score-row');
  function highlightSector(idx) {
    sectorElements.forEach((el, i) => {
      const isMatch = i === idx;
      el.classList.toggle('is-active', isMatch);
      el.setAttribute('fill', isMatch ? 'url(#wheelSectorActiveGrad)' : 'url(#wheelSectorGrad)');
      el.setAttribute('stroke', isMatch ? '#7dd3fc' : 'rgba(56, 189, 248, 0.75)');
      el.setAttribute('stroke-width', isMatch ? '2' : '1.25');
      el.style.opacity = idx === null || isMatch ? '1' : '0.32';
    });
    outerBandElements.forEach((band, i) => {
      const isMatch = i === idx;
      if (isMatch) {
        band.setAttribute('fill', 'rgba(56, 189, 248, 0.22)');
      } else {
        band.setAttribute('fill', i % 2 === 0 ? 'rgba(30, 41, 59, 0.42)' : 'rgba(15, 23, 42, 0.42)');
      }
    });
    labelElements.forEach((lbl, i) => {
      const isMatch = i === idx;
      lbl.setAttribute('fill', isMatch ? '#38bdf8' : '#e2e8f0');
      lbl.style.opacity = idx === null || isMatch ? '1' : '0.45';
    });
    rows.forEach((row, i) => {
      row.classList.toggle('is-active', i === idx);
    });
  }

  hitGroup.querySelectorAll('path[data-sector]').forEach((hitEl) => {
    const i = parseInt(hitEl.getAttribute('data-sector'), 10);
    hitEl.addEventListener('mouseenter', () => highlightSector(i));
    hitEl.addEventListener('mouseleave', () => highlightSector(null));
  });

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => highlightSector(i));
    row.addEventListener('mouseleave', () => highlightSector(null));
  });
}

/**
 * 4. Scroll-Triggered Progress Bar Fill (Bidirectional Replay on Scroll Up & Down)
 */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          el.style.width = el.getAttribute('data-width');
        } else if (!entry.isIntersecting) {
          el.style.width = '0%';
        }
      });
    },
    { threshold: [0, 0.1, 0.25] }
  );

  bars.forEach((b) => observer.observe(b));
}

/**
 * 5. Top Scroll Progress Bar
 */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      bar.style.width = `${pct}%`;
    },
    { passive: true }
  );
}

/**
 * 6. Floating Navbar Active Link Spy + Sliding Liquid Glass Lens Indicator
 *    - The glass lens glides (spring physics) to the active item instead of jumping
 *    - Liquid stretch: the lens elongates slightly with velocity, then settles back
 */
function initNavbarScrollSpy() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const indicator = document.querySelector('.nav-glass-indicator');
  if (!sections.length || !navLinks.length) return;

  // Cached section offsets (refreshed on resize/load) to avoid layout reads every scroll frame
  let offsets = [];
  function cacheOffsets() {
    offsets = sections.map((sec) => ({ id: sec.id, top: sec.offsetTop }));
  }
  cacheOffsets();
  window.addEventListener('load', cacheOffsets);
  window.addEventListener('resize', cacheOffsets);

  // Spring state for the sliding lens
  let curX = 0, curW = 0, velX = 0, velW = 0;
  let targetX = 0, targetW = 0;
  let rafId = null;
  let lastT = 0;
  let initialized = false;
  const STIFFNESS = 170;
  const DAMPING = 22;

  function measure(link) {
    // offsetLeft/offsetWidth are relative to the positioned <ul>, independent of scroll
    const li = link.parentElement;
    return { x: li.offsetLeft, w: li.offsetWidth };
  }

  function step(now) {
    const dt = Math.min(0.034, Math.max(0.001, (now - lastT) * 0.001));
    lastT = now;

    const ax = STIFFNESS * (targetX - curX) - DAMPING * velX;
    const aw = STIFFNESS * (targetW - curW) - DAMPING * velW;
    velX += ax * dt;
    velW += aw * dt;
    curX += velX * dt;
    curW += velW * dt;

    // Liquid stretch & squash proportional to horizontal speed
    const stretch = Math.min(0.22, Math.abs(velX) / 2600);
    indicator.style.width = `${curW.toFixed(2)}px`;
    indicator.style.transform = `translate3d(${curX.toFixed(2)}px, 0, 0) scale(${(1 + stretch).toFixed(4)}, ${(1 - stretch * 0.45).toFixed(4)})`;

    const settled =
      Math.abs(targetX - curX) < 0.2 && Math.abs(targetW - curW) < 0.2 &&
      Math.abs(velX) < 1 && Math.abs(velW) < 1;

    if (settled) {
      curX = targetX; curW = targetW; velX = 0; velW = 0;
      indicator.style.width = `${curW}px`;
      indicator.style.transform = `translate3d(${curX}px, 0, 0) scale(1, 1)`;
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(step);
  }

  function moveIndicatorTo(link, instant) {
    if (!indicator || !link) return;
    const m = measure(link);
    targetX = m.x;
    targetW = m.w;

    if (instant || !initialized) {
      curX = targetX; curW = targetW; velX = 0; velW = 0;
      indicator.style.width = `${curW}px`;
      indicator.style.transform = `translate3d(${curX}px, 0, 0)`;
      indicator.classList.add('is-ready');
      initialized = true;
      return;
    }
    if (!rafId) {
      lastT = performance.now();
      rafId = requestAnimationFrame(step);
    }

    // Keep the active item visible when the navbar is horizontally scrollable (small screens)
    const nav = link.closest('.floating-navbar');
    if (nav && nav.scrollWidth > nav.clientWidth) {
      const li = link.parentElement;
      const desired = li.offsetLeft - nav.clientWidth / 2 + li.offsetWidth / 2;
      nav.scrollTo({ left: desired, behavior: 'smooth' });
    }
  }

  let currentId = null;
  // When a nav item is clicked, glide straight to it (don't stop at every section passed on the way)
  let lockedId = null;
  let lockUntil = 0;
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const id = (link.getAttribute('href') || '').replace('#', '');
      if (!id) return;
      lockedId = id;
      lockUntil = performance.now() + 1800;
      currentId = id;
      navLinks.forEach((l) => l.classList.toggle('active', l === link));
      moveIndicatorTo(link, false);
    });
  });

  function updateActive(instant) {
    const scrollPos = (window.scrollY || document.documentElement.scrollTop) + 240;
    let id = offsets[0].id;
    for (let i = 0; i < offsets.length; i++) {
      if (scrollPos >= offsets[i].top) id = offsets[i].id;
    }
    if (lockedId && !instant) {
      if (id === lockedId || performance.now() > lockUntil) {
        lockedId = null;
      } else {
        return;
      }
    }
    if (id === currentId && !instant) return;
    currentId = id;

    let activeLink = null;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive) activeLink = link;
    });
    moveIndicatorTo(activeLink, instant);
  }

  let scrollScheduled = false;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        scrollScheduled = false;
        updateActive(false);
      });
    },
    { passive: true }
  );

  window.addEventListener('resize', () => updateActive(true));
  // Fonts change link widths: re-measure once Montserrat is loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => updateActive(true));
  }
  updateActive(true);
}

/**
 * 7. MotionSites Spotlight Hover Effect (Stationary Parent Hitbox & rAF Throttled for 60fps)
 */
function initSpotlightCards() {
  const cards = Array.from(document.querySelectorAll('.spotlight-card'));
  let mouseX = -1000;
  let mouseY = -1000;
  let scheduled = false;

  // Performance: only update CSS variables on cards currently near the viewport
  const visibleCards = new Set();
  const visObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleCards.add(entry.target);
        else visibleCards.delete(entry.target);
      });
    },
    { rootMargin: '80px 0px' }
  );
  cards.forEach((c) => visObserver.observe(c));

  function updateSpotlights() {
    scheduled = false;
    visibleCards.forEach((card) => {
      const hitEl = card.parentElement || card;
      const rect = hitEl.getBoundingClientRect();
      const relX = mouseX - rect.left;
      const relY = mouseY - rect.top;
      card.style.setProperty('--mouse-x', `${relX.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${relY.toFixed(1)}px`);
    });
  }

  document.addEventListener(
    'mousemove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateSpotlights);
      }
    },
    { passive: true }
  );
}

/**
 * 8. Jitter-Free 3D Perspective Tilt Engine
 *    - Listens on the stationary parent wrapper (.reveal-up) so tilting the card never moves the hitbox boundary
 *    - Smooth 60fps exponential LERP spring interpolation (no CSS transition fighting mousemove)
 *    - Soft edge attenuation so entering/leaving card borders is 100% fluid without oscillation
 */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');
  const MAX_TILT = 4.2; // Gentle, luxurious 3D angle in degrees

  tiltCards.forEach((card) => {
    const triggerEl = card.parentElement || card;

    let targetRx = 0;
    let targetRy = 0;
    let targetScale = 1;

    let curRx = 0;
    let curRy = 0;
    let curScale = 1;
    let rafId = null;

    function animateTilt() {
      curRx += (targetRx - curRx) * 0.13;
      curRy += (targetRy - curRy) * 0.13;
      curScale += (targetScale - curScale) * 0.13;

      const settled =
        Math.abs(targetRx - curRx) < 0.01 &&
        Math.abs(targetRy - curRy) < 0.01 &&
        Math.abs(targetScale - curScale) < 0.0005;

      if (settled && targetScale === 1) {
        curRx = 0;
        curRy = 0;
        curScale = 1;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        rafId = null;
        return;
      }

      card.style.transform = `perspective(1000px) rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg) scale3d(${curScale.toFixed(4)}, ${curScale.toFixed(4)}, 1)`;
      rafId = requestAnimationFrame(animateTilt);
    }

    function startLoop() {
      if (!rafId) {
        rafId = requestAnimationFrame(animateTilt);
      }
    }

    triggerEl.addEventListener(
      'mousemove',
      (e) => {
        // Use the stationary wrapper's bounding rect so card rotation never shifts the hit area
        const rect = triggerEl.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        const halfW = rect.width * 0.5;
        const halfH = rect.height * 0.5;

        // Normalized coordinates in [-1, 1]
        const nx = (x - halfW) / halfW;
        const ny = (y - halfH) / halfH;

        // Soften tilt right at the outer border for a silky entry
        const edgeRatio = Math.max(Math.abs(nx), Math.abs(ny));
        const edgeSoftener = 1.0 - 0.3 * Math.pow(edgeRatio, 3);

        targetRx = -ny * MAX_TILT * edgeSoftener;
        targetRy = nx * MAX_TILT * edgeSoftener;
        targetScale = 1.012;

        card.classList.add('is-hovered');
        startLoop();
      },
      { passive: true }
    );

    triggerEl.addEventListener(
      'mouseleave',
      () => {
        targetRx = 0;
        targetRy = 0;
        targetScale = 1;
        card.classList.remove('is-hovered');
        startLoop();
      },
      { passive: true }
    );
  });
}

/**
 * 9. Slow, Graceful Bidirectional Scroll Reveal Observer (Scroll Down & Scroll Up Replay)
 *    - Direction-aware entrance: glides up from below when scrolling down (.from-bottom),
 *      and glides down from above when scrolling back up (.from-top)
 *    - Resets cleanly once an element completely leaves the viewport so it replays smoothly on return
 *    - Preserves instant Chromium backdrop-filter sampling by separating parent transform from card opacity
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const vh = window.innerHeight;

  elements.forEach((el) => {
    if (el.querySelector('.spotlight-card')) {
      el.classList.add('reveal-has-card');
    }

    // Convert inline transition-delay to --reveal-delay CSS variable so reset off-screen has 0s delay
    const inlineDelay = el.style.transitionDelay;
    if (inlineDelay) {
      const parsed = parseFloat(inlineDelay);
      if (!Number.isNaN(parsed) && parsed > 0) {
        el.style.setProperty('--reveal-delay', `${(parsed * 1.45).toFixed(2)}s`);
      }
      el.style.transitionDelay = '';
    }

    // Set initial directional state before observing
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0) {
      el.classList.add('from-top');
    } else if (rect.top >= vh) {
      el.classList.add('from-bottom');
    } else {
      el.classList.add('from-bottom');
      requestAnimationFrame(() => {
        el.classList.add('is-visible');
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const rect = entry.boundingClientRect;

        if (entry.isIntersecting) {
          // Trigger reveal once a meaningful slice (~42px or 22% of small headers) enters the viewport
          const minVisiblePx = Math.min(42, Math.max(16, rect.height * 0.22));
          if (entry.intersectionRect.height >= minVisiblePx || entry.intersectionRatio >= 0.08) {
            el.classList.add('is-visible');
          }
        } else {
          // Element is 100% outside the viewport: reset and orient for the next return (up or down)
          el.classList.remove('is-visible');
          if (rect.top < 0) {
            // Scrolled down past the element (now above the viewport) -> next entry will be from top when scrolling up
            el.classList.remove('from-bottom');
            el.classList.add('from-top');
          } else {
            // Scrolled up past the element (now below the viewport) -> next entry will be from bottom when scrolling down
            el.classList.remove('from-top');
            el.classList.add('from-bottom');
          }
        }
      });
    },
    {
      threshold: [0, 0.04, 0.08, 0.16]
    }
  );

  elements.forEach((el) => observer.observe(el));
}
