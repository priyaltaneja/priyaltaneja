import { useEffect, useRef } from 'react';
import { LILY_CENTER, LILY_SKETCH } from './lilySketch';

// A lily that is sketched in pencil, then painted in watercolour from the real photo:
// a loose blurred wash, a mid glaze, then fine detail strokes, petal by petal.
const SRC = '/images/lily.webp';
const SIZE = 420;
const SKETCH_START = 0.2;
const SKETCH_TIME = 2.7;
const GRAPHITE = '59,54,51';
const HATCH_ANGLE = 2.03; // down-left, like a right-handed artist's quick shading

// Layers of the pencil sketch: relative speed (before normalising to SKETCH_TIME),
// pen-lift pause, width, opacity, and how much each stroke tapers at its ends.
const PENCIL = {
  gesture: { speed: 3, pause: 0.015, width: 2.8, alpha: 0.26, taper: 0.8 },
  layout: { speed: 3.2, pause: 0.012, width: 3.2, alpha: 0.2, taper: 0.85 },
  line: { speed: 1.7, pause: 0.02, width: 4.4, alpha: 0.72, taper: 0.65 },
  retrace: { speed: 2.4, pause: 0.01, width: 3, alpha: 0.3, taper: 0.85 },
  stem: { speed: 2, pause: 0.015, width: 3.2, alpha: 0.55, taper: 0.5 },
  scribble: { speed: 2.2, pause: 0.02, width: 2.4, alpha: 0.5, taper: 0.3 },
  hatch: { speed: 4, pause: 0.008, width: 2.4, alpha: 0.3, taper: 0.9 },
};

// Watercolour passes, painted one petal at a time (then the stamens): a loose wash,
// a glaze, then detail. `from`/`to` are fractions of each petal's time window.
const PASSES = [
  { key: 'wash', spacing: 19, width: 34, length: 120, alpha: 0.24, stroke: 0.4, from: 0, to: 0.5, tip: 'soft' },
  { key: 'glaze', spacing: 14, width: 24, length: 44, alpha: 0.32, stroke: 0.26, from: 0.3, to: 0.8, tip: 'bristle' },
  { key: 'detail', spacing: 8, width: 12, length: 24, alpha: 0.38, stroke: 0.18, from: 0.52, to: 1, tip: 'bristle' },
];
const PETAL_WINDOW = 0.55;
const PETAL_STRIDE = 0.42;
const CENTER_RADIUS = 62;
// Stamens: washed over with their petals, but their fine detail waits until last.
const STAMEN_BOX = [155, 122, 248, 256];
const SETTLE = 0.55;
const SEED = 1507;
const SWAY_ANGLE = 0.045; // radians at the petal tips' peak, about 2.5°
const SWAY_SPEED = 2.6; // radians per second

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

const mulberry32 = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const makeCanvas = (w = SIZE, h = w) => {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
};

// Catmull-Rom through the control points, resampled every `step` px.
const resample = (pts, step = 1.5) => {
  const dense = [];
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  for (let i = 1; i < p.length - 2; i += 1) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / step));
    for (let j = 0; j < n; j += 1) {
      const t = j / n, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (3 * b - a - 3 * c + d) * t3);
      dense.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  dense.push(pts[pts.length - 1]);
  return dense;
};

const pathLength = (pts) => pts.reduce((sum, pt, i) => (i ? sum + Math.hypot(pt[0] - pts[i - 1][0], pt[1] - pts[i - 1][1]) : 0), 0);

// Make a line look hand-drawn: overshoot the ends, drift off the true edge, and wobble.
const hand = (pts, { wobble = 0, drift = 0, overshoot = 0 }, rand) => {
  if (pts.length < 2) return pts;
  const ext = (a, b, d) => {
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [b[0] + ((b[0] - a[0]) / l) * d, b[1] + ((b[1] - a[1]) / l) * d];
  };
  const q = [
    ext(pts[Math.min(3, pts.length - 1)], pts[0], overshoot * rand()),
    ...pts,
    ext(pts[Math.max(0, pts.length - 4)], pts[pts.length - 1], overshoot * rand()),
  ];
  const d0 = (rand() - 0.5) * 2 * drift, d1 = (rand() - 0.5) * 2 * drift;
  const ph1 = rand() * 6.28, ph2 = rand() * 6.28, f = 0.08 + rand() * 0.08;
  return q.map(([x, y], i) => {
    const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const u = i / (q.length - 1);
    const off = d0 + (d1 - d0) * u + wobble * (Math.sin(i * f + ph1) * 0.7 + Math.sin(i * f * 2.7 + ph2) * 0.3);
    return [x - ((b[1] - a[1]) / len) * off, y + ((b[0] - a[0]) / len) * off];
  });
};

// Break a long line into shorter, overlapping strokes, the way a sketch feels its way along an edge.
const chunks = (pts, min, max, overlap, rand) => {
  const out = [];
  let i = 0;
  while (i < pts.length - 2) {
    const end = Math.min(pts.length - 1, i + Math.round((min + rand() * (max - min)) / 1.5));
    out.push(pts.slice(i, end + 1));
    if (end === pts.length - 1) break;
    i = Math.max(i + 2, end - Math.round(overlap / 1.5));
  }
  return out;
};

// Fill an anther with a quick zig-zag scribble along its long axis.
const scribble = (pts, rand) => {
  const c = pts.reduce(([x, y], p) => [x + p[0] / pts.length, y + p[1] / pts.length], [0, 0]);
  const far = pts.reduce((best, p) => (Math.hypot(p[0] - c[0], p[1] - c[1]) > Math.hypot(best[0] - c[0], best[1] - c[1]) ? p : best));
  const a = Math.hypot(far[0] - c[0], far[1] - c[1]);
  const ax = [(far[0] - c[0]) / a, (far[1] - c[1]) / a];
  const b = Math.max(...pts.map((p) => Math.abs((p[0] - c[0]) * -ax[1] + (p[1] - c[1]) * ax[0])));
  const zig = [];
  const n = 7 + Math.round(rand() * 2);
  for (let k = 0; k <= n; k += 1) {
    const t = -0.8 + (1.6 * k) / n;
    const side = (k % 2 ? 1 : -1) * b * 0.75 * Math.sqrt(1 - t * t);
    zig.push([c[0] + ax[0] * t * a - ax[1] * side, c[1] + ax[1] * t * a + ax[0] * side]);
  }
  return resample(zig);
};

// Short parallel shading strokes along petal overlaps and around the throat of the flower.
const hatching = (overlaps, inside, rand) => {
  const [cx, cy] = LILY_CENTER;
  const dir = [Math.cos(HATCH_ANGLE), Math.sin(HATCH_ANGLE)];
  const out = [];
  const hatch = ([x, y], len) => {
    const end = [x + dir[0] * len, y + dir[1] * len];
    if (!inside(x, y) || !inside(...end)) return;
    const h = [[x, y], [(x + end[0]) / 2, (y + end[1]) / 2], end];
    out.push(out.length % 2 ? h.reverse() : h); // back and forth without lifting much
  };
  overlaps.forEach((line) => {
    for (let i = 5; i < line.length - 5; i += 7 + Math.round(rand() * 3)) {
      const [x, y] = line[i];
      const side = Math.sign((cx - x) * -(line[i + 1][1] - line[i - 1][1]) + (cy - y) * (line[i + 1][0] - line[i - 1][0])) || 1;
      const a = line[i - 1], b = line[i + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      hatch([x - ((b[1] - a[1]) / l) * side * 2, y + ((b[0] - a[0]) / l) * side * 2], 8 + rand() * 7);
    }
  });
  for (let ang = 0.35; ang < 2.8; ang += 0.26 + rand() * 0.1) {
    const r = 22 + rand() * 14;
    hatch([cx + Math.cos(ang) * r, cy + Math.sin(ang) * r], 9 + rand() * 5);
  }
  return out;
};

const planSketch = (rand, inside) => {
  const strokes = [];
  const add = (key, pts, opts) => strokes.push({ style: PENCIL[key], pts: hand(pts, opts, rand), weight: 0.8 + rand() * 0.4, done: false });
  const byKind = (kind) => LILY_SKETCH.filter(([k]) => k === kind).map(([, pts]) => resample(pts));
  const outlines = byKind('outline');
  const overlaps = byKind('overlap');

  // 1. Gesture: the direction of each petal, quick and light.
  byKind('gesture').forEach((p) => add('gesture', p, { wobble: 1.4, drift: 1, overshoot: 5 }));
  // 2. Layout: loose, fast strokes blocking in each petal, overshooting their ends.
  outlines.forEach((p) => chunks(p, 70, 130, 0, rand).forEach((c) => add('layout', c, { wobble: 2.4, drift: 3.5, overshoot: 8 })));
  // 3. Line: shorter, darker strokes searching for the real edge, sometimes gone over twice.
  [...outlines, ...overlaps].forEach((p) => chunks(p, 26, 68, 7, rand).forEach((c) => {
    add('line', c, { wobble: 0.8, drift: 1.2, overshoot: 3 });
    if (rand() < 0.3) add('retrace', c, { wobble: 1.2, drift: 2.4, overshoot: 3 });
  }));
  // 4. Stamens: filaments, then each anther outlined and scribbled in.
  [...byKind('filament'), ...byKind('pistil')].forEach((p) => add('stem', p, { wobble: 0.5, drift: 0.6, overshoot: 2 }));
  LILY_SKETCH.filter(([k]) => k === 'anther' || k === 'stigma').forEach(([k, pts]) => {
    add('line', resample(pts), { wobble: 0.4, drift: 0.4, overshoot: 1.5 });
    if (k === 'anther') add('scribble', scribble(pts, rand), {});
  });
  // 5. Shading.
  hatching(overlaps, inside, rand).forEach((h) => add('hatch', h, {}));

  // Speeds are relative: stretch the whole sequence to SKETCH_TIME, with a floor so tiny flicks still register.
  strokes.forEach((s) => { s.raw = pathLength(s.pts) / s.style.speed; });
  let scale = SKETCH_TIME / strokes.reduce((sum, s) => sum + s.raw + s.style.pause, 0);
  let t = 0;
  strokes.forEach((s) => {
    s.start = t;
    s.dur = Math.max(0.025, s.raw * scale);
    t += s.dur + s.style.pause * scale;
  });
  scale = SKETCH_TIME / t;
  strokes.forEach((s) => { s.start = SKETCH_START + s.start * scale; s.dur *= scale; });
  return { strokes, end: SKETCH_START + SKETCH_TIME };
};

// Draw a stroke up to progress k as a filled ribbon, so width can taper like pencil pressure.
const drawPencil = (ctx, s, k) => {
  const { pts, style } = s;
  const n = pts.length;
  const m = Math.max(2, Math.ceil(k * (n - 1)) + 1);
  const left = [];
  const right = [];
  for (let i = 0; i < m; i += 1) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const w = (style.width / 2) * s.weight * (1 - style.taper + style.taper * Math.sin(Math.PI * (i / (n - 1))) ** 0.6);
    const nx = (-(b[1] - a[1]) / len) * w, ny = ((b[0] - a[0]) / len) * w;
    left.push([pts[i][0] + nx, pts[i][1] + ny]);
    right.push([pts[i][0] - nx, pts[i][1] - ny]);
  }
  ctx.beginPath();
  ctx.moveTo(...left[0]);
  left.forEach((p) => ctx.lineTo(...p));
  for (let i = right.length - 1; i >= 0; i -= 1) ctx.lineTo(...right[i]);
  ctx.closePath();
  ctx.fillStyle = `rgba(${GRAPHITE},${style.alpha * s.weight})`;
  ctx.fill();
};

const makeTip = (kind, rand) => {
  const c = makeCanvas(64);
  const g = c.getContext('2d');
  if (kind === 'soft') {
    // Flat wash brush: long across the stroke (y), soft ragged edges.
    for (let i = 0; i < 16; i += 1) {
      const x = 32 + (rand() - 0.5) * 8, y = 32 + (rand() - 0.5) * 40, r = 7 + rand() * 7;
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255,255,255,.5)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
    }
  } else {
    // Bristles spread across the stroke (y); dragging the tip along x leaves streaks.
    for (let i = 0; i < 34; i += 1) {
      const y = 32 + (rand() - 0.5) * 50, x = 32 + (rand() - 0.5) * 10;
      g.fillStyle = `rgba(255,255,255,${0.35 + rand() * 0.65})`;
      g.beginPath();
      g.ellipse(x, y, 2.5 + rand() * 3, 1 + rand() * 2.2, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  // Granulation: knock tiny holes out of the pigment.
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 60; i += 1) {
    g.fillStyle = `rgba(0,0,0,${rand() * 0.5})`;
    g.fillRect(rand() * 64, rand() * 64, 1.5, 1.5);
  }
  return c;
};

const insideOf = (alpha) => (x, y) => {
  const xi = Math.round(x), yi = Math.round(y);
  return xi >= 0 && yi >= 0 && xi < SIZE && yi < SIZE && alpha[(yi * SIZE + xi) * 4 + 3] > 90;
};

const planPaint = (inside, rand, start) => {
  const [cx, cy] = LILY_CENTER;
  const petals = LILY_SKETCH.filter(([kind]) => kind === 'gesture')
    .map(([, pts]) => Math.atan2(pts[pts.length - 1][1] - cy, pts[pts.length - 1][0] - cx));
  const petalOf = (a) => petals.reduce((best, pa, i) => {
    const d = Math.abs(Math.atan2(Math.sin(a - pa), Math.cos(a - pa)));
    return d < best.d ? { i, d } : best;
  }, { i: 0, d: Infinity }).i;

  return PASSES.map((pass) => {
    const strokes = [];
    const { spacing: sp } = pass;
    for (let y = sp / 2; y < SIZE; y += sp) {
      for (let x = sp / 2; x < SIZE; x += sp) {
        const px = x + (rand() - 0.5) * sp, py = y + (rand() - 0.5) * sp;
        if (!inside(px, py)) continue;
        const r = Math.hypot(px - cx, py - cy);
        const radial = Math.atan2(py - cy, px - cx);
        let dir = r < 24 ? rand() * Math.PI * 2 : radial + (rand() - 0.5) * 0.5;
        if (rand() < 0.3) dir += Math.PI;
        const len = pass.length * (0.7 + rand() * 0.6);
        const bend = (rand() - 0.5) * 0.7;
        const pts = [];
        let [sx, sy] = [px - (Math.cos(dir) * len) / 2, py - (Math.sin(dir) * len) / 2];
        for (let i = 0; i <= 6; i += 1) {
          pts.push([sx, sy]);
          const a = dir + bend * (i / 6 - 0.5);
          sx += (Math.cos(a) * len) / 6; sy += (Math.sin(a) * len) / 6;
        }
        const [bx0, by0, bx1, by1] = STAMEN_BOX;
        const stamen = pass.key === 'detail' && px > bx0 && px < bx1 && py > by0 && py < by1;
        const group = stamen || (r < CENTER_RADIUS && py < cy + 12) ? petals.length : petalOf(radial);
        strokes.push({ pts, total: len, done: 0, width: pass.width * (0.8 + rand() * 0.4), group, order: r + rand() * pass.length });
      }
    }
    // Within each petal the brush works from the base out to the tip.
    for (let g = 0; g <= petals.length; g += 1) {
      const mine = strokes.filter((s) => s.group === g).sort((a, b) => a.order - b.order);
      const w0 = start + g * PETAL_STRIDE + PETAL_WINDOW * pass.from;
      const span = PETAL_WINDOW * (pass.to - pass.from);
      mine.forEach((s, i) => { s.start = w0 + (span * i) / Math.max(1, mine.length - 1); });
    }
    return { ...pass, strokes, tipCanvas: makeTip(pass.tip, rand), mask: makeCanvas() };
  });
};

const pointAt = (pts, d) => {
  for (let i = 1; i < pts.length; i += 1) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (d <= seg || i === pts.length - 1) {
      const t = seg ? Math.min(1, d / seg) : 0;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t,
        Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])];
    }
    d -= seg;
  }
  return [...pts[pts.length - 1], 0];
};

const paintStroke = (ctx, pass, s, now) => {
  const k = easeInOut(clamp01((now - s.start) / pass.stroke));
  const target = k * s.total;
  const step = Math.max(1.2, s.width * 0.12);
  while (s.done < target) {
    const u = s.done / s.total;
    const [x, y, a] = pointAt(s.pts, s.done);
    const scale = (s.width * (0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, u * 1.4 + 0.1)))) / 64;
    ctx.globalAlpha = pass.alpha * (1 - 0.4 * u);
    ctx.setTransform(Math.cos(a) * scale, Math.sin(a) * scale, -Math.sin(a) * scale, Math.cos(a) * scale, x, y);
    ctx.drawImage(pass.tipCanvas, -32, -32);
    s.done += step;
  }
};

const blurred = (img, factor, tint) => {
  const small = makeCanvas(Math.round(SIZE / factor));
  small.getContext('2d').drawImage(img, 0, 0, small.width, small.height);
  const c = makeCanvas();
  const g = c.getContext('2d');
  g.imageSmoothingQuality = 'high';
  g.drawImage(small, 0, 0, SIZE, SIZE);
  if (tint) {
    g.globalCompositeOperation = 'source-atop';
    g.fillStyle = tint;
    g.fillRect(0, 0, SIZE, SIZE);
  }
  return c;
};

// Split the finished flower into one soft-edged layer per petal. Weights across the layers
// sum to one, so drawn with 'lighter' and no sway they rebuild the exact image.
const splitPetals = (image) => {
  const [cx, cy] = LILY_CENTER;
  const angles = LILY_SKETCH.filter(([kind]) => kind === 'gesture')
    .map(([, pts]) => Math.atan2(pts[pts.length - 1][1] - cy, pts[pts.length - 1][0] - cx));
  const layers = angles.map(() => new ImageData(SIZE, SIZE));
  const src = image.data;
  const w = new Float32Array(angles.length);
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const i = (y * SIZE + x) * 4;
      if (!src[i + 3]) continue;
      const phi = Math.atan2(y - cy, x - cx);
      let sum = 0;
      for (let k = 0; k < angles.length; k += 1) { w[k] = Math.exp(4 * Math.cos(phi - angles[k])); sum += w[k]; }
      for (let k = 0; k < angles.length; k += 1) {
        const d = layers[k].data;
        d[i] = src[i]; d[i + 1] = src[i + 1]; d[i + 2] = src[i + 2];
        d[i + 3] = Math.round((src[i + 3] * w[k]) / sum);
      }
    }
  }
  return layers.map((data) => {
    const c = makeCanvas();
    c.getContext('2d').putImageData(data, 0, 0);
    return c;
  });
};

const LilyMark = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const out = canvas.getContext('2d');
    const img = new Image();
    let frame = 0;
    let cancelled = false;
    let detach = () => {};

    img.onload = () => {
      if (cancelled) return;
      const read = makeCanvas();
      const rctx = read.getContext('2d', { willReadFrequently: true });
      rctx.drawImage(img, 0, 0, SIZE, SIZE);
      const alpha = rctx.getImageData(0, 0, SIZE, SIZE).data;
      const sources = {
        wash: blurred(img, 7, 'rgba(255,238,242,.38)'),
        glaze: blurred(img, 2.6),
        detail: read,
      };
      const inside = insideOf(alpha);
      const tmp = makeCanvas();
      const tctx = tmp.getContext('2d');
      const petalCount = LILY_SKETCH.filter(([kind]) => kind === 'gesture').length;

      // One full sketch-and-paint run. Each replay uses a new seed, so no two sketches are identical.
      const buildScene = (seed) => {
        const rand = mulberry32(seed);
        const pencil = makeCanvas();
        const pctx = pencil.getContext('2d');
        const live = makeCanvas();
        const lctx = live.getContext('2d');
        const sketch = planSketch(rand, inside);
        const passes = planPaint(inside, rand, sketch.end - 0.1);
        const paintEnd = sketch.end + petalCount * PETAL_STRIDE + PETAL_WINDOW + PASSES[PASSES.length - 1].stroke;
        const end = paintEnd + SETTLE;

        const render = (now) => {
          // Finished strokes are committed; the ones in progress are redrawn each frame.
          lctx.clearRect(0, 0, SIZE, SIZE);
          sketch.strokes.forEach((s) => {
            if (s.done || now < s.start) return;
            const k = easeInOut(clamp01((now - s.start) / s.dur));
            if (k >= 1) { drawPencil(pctx, s, 1); s.done = true; } else drawPencil(lctx, s, k);
          });
          out.clearRect(0, 0, SIZE, SIZE);
          passes.forEach((pass) => {
            const mctx = pass.mask.getContext('2d');
            pass.strokes.forEach((s) => { if (now >= s.start && s.done < s.total) paintStroke(mctx, pass, s, now); });
            mctx.setTransform(1, 0, 0, 1, 0, 0);
            tctx.globalCompositeOperation = 'source-over';
            tctx.clearRect(0, 0, SIZE, SIZE);
            tctx.drawImage(pass.mask, 0, 0);
            tctx.globalCompositeOperation = 'source-in';
            tctx.drawImage(sources[pass.key], 0, 0);
            out.drawImage(tmp, 0, 0);
          });
          const settle = clamp01((now - paintEnd) / SETTLE);
          if (settle > 0) {
            out.globalAlpha = easeInOut(settle);
            out.drawImage(img, 0, 0, SIZE, SIZE);
            out.globalAlpha = 1;
          }
          // Pencil stays visible under the transparent paint, fading as the pigment builds up.
          const paintProgress = clamp01((now - sketch.end) / (end - sketch.end));
          out.globalCompositeOperation = 'multiply';
          out.globalAlpha = 0.9 - 0.7 * paintProgress;
          out.drawImage(pencil, 0, 0);
          out.drawImage(live, 0, 0);
          out.globalCompositeOperation = 'source-over';
          out.globalAlpha = 1;
        };
        return { render, end };
      };

      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      let run = 0;
      if (reduceMotion) {
        buildScene(SEED).render(Infinity);
        return;
      }

      // Hover sway: the finished flower is split into overlapping petal layers that rock
      // around the centre slightly out of step, so the tips move and the heart stays put.
      let still = null;
      let petals = null;
      let mode = 'drawing';
      let amp = 0;
      let target = 0;
      let lastTs = null;

      const settleIntoStill = () => {
        still = makeCanvas();
        still.getContext('2d').drawImage(canvas, 0, 0);
        petals = splitPetals(out.getImageData(0, 0, SIZE, SIZE));
        mode = 'still';
        if (target) startSway();
      };

      const sway = (ts) => {
        const dt = lastTs === null ? 0 : Math.min(0.05, (ts - lastTs) / 1000);
        lastTs = ts;
        amp += (target - amp) * Math.min(1, dt * 3.5);
        if (!target && amp < 0.01) {
          out.clearRect(0, 0, SIZE, SIZE);
          out.drawImage(still, 0, 0);
          mode = 'still';
          lastTs = null;
          return;
        }
        const [cx, cy] = LILY_CENTER;
        out.clearRect(0, 0, SIZE, SIZE);
        out.globalCompositeOperation = 'lighter';
        petals.forEach((layer, i) => {
          const a = amp * SWAY_ANGLE * Math.sin((ts / 1000) * SWAY_SPEED + i * 1.35);
          const c = Math.cos(a), sn = Math.sin(a);
          out.setTransform(c, sn, -sn, c, cx - c * cx + sn * cy, cy - sn * cx - c * cy);
          out.drawImage(layer, 0, 0);
        });
        out.setTransform(1, 0, 0, 1, 0, 0);
        out.globalCompositeOperation = 'source-over';
        frame = requestAnimationFrame(sway);
      };

      const startSway = () => {
        if (mode !== 'still') return;
        mode = 'sway';
        frame = requestAnimationFrame(sway);
      };

      const play = () => {
        cancelAnimationFrame(frame);
        mode = 'drawing';
        out.setTransform(1, 0, 0, 1, 0, 0);
        out.globalCompositeOperation = 'source-over';
        const scene = buildScene(SEED + run);
        run += 1;
        let t0 = null;
        const tick = (ts) => {
          if (t0 === null) t0 = ts;
          const now = (ts - t0) / 1000;
          scene.render(now);
          if (now < scene.end) frame = requestAnimationFrame(tick);
          else settleIntoStill();
        };
        frame = requestAnimationFrame(tick);
      };

      const onEnter = () => { target = 1; startSway(); };
      const onLeave = () => { target = 0; };
      canvas.addEventListener('pointerenter', onEnter);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('click', play);
      detach = () => {
        canvas.removeEventListener('pointerenter', onEnter);
        canvas.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('click', play);
      };
      play();
    };
    img.src = SRC;

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      detach();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`lily-mark ${className}`.trim()}
      width={SIZE}
      height={SIZE}
      aria-hidden="true"
    />
  );
};

export default LilyMark;
