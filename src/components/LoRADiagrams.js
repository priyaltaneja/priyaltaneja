import React, { useState, useMemo } from 'react';

const INK = '#001233';
const MID = '#33415c';
const MUTED = '#5c677d';
const RULE = '#C8D1DD';
const FILL = '#F0F4F8';

const NAVY = '#023e7d';
const PURPLE = '#33415c';

const FONT = "'IBM Plex Sans', sans-serif";

const NOISE_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='.035'/%3E%3C/svg%3E\")";

const Defs = () => (
  <defs>
    <linearGradient id="gNavy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0353a4" />
      <stop offset="100%" stopColor="#001845" />
    </linearGradient>
    <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#33415c" />
      <stop offset="100%" stopColor="#001845" />
    </linearGradient>
    <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E0E5ED" />
      <stop offset="100%" stopColor="#C8D1DD" />
    </linearGradient>
    <filter id="shSm" x="-10%" y="-6%" width="120%" height="125%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#001233" floodOpacity="0.1" />
    </filter>
    <filter id="shMd" x="-8%" y="-8%" width="116%" height="132%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#001233" floodOpacity="0.1" />
    </filter>
    <filter id="shLg" x="-6%" y="-6%" width="112%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#001233" floodOpacity="0.1" />
    </filter>
  </defs>
);

const DiagramFrame = ({ label, children, caption }) => (
  <figure className="my-10 mx-0">
    <div className="rounded-xl border border-[#C8D1DD] bg-white p-6 relative overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,18,51,0.04), 0 6px 20px rgba(0,18,51,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ backgroundImage: NOISE_BG, backgroundSize: '300px' }} />
      <div className="relative">
        {label && (
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: MUTED }}>
            {label}
          </div>
        )}
        {children}
      </div>
    </div>
    {caption && (
      <figcaption className="mt-3 text-[13px] leading-[1.6]" style={{ color: MUTED }}>
        {caption}
      </figcaption>
    )}
  </figure>
);

export const ScalingDiagram = () => (
  <DiagramFrame
    label="Fig. 1 · The scaling problem"
    caption="Each fine-tuned model is a fully independent 16 GB artifact. The cost grows linearly with the number of specializations."
  >
    <svg viewBox="0 0 680 190" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
      <title>Fine-tuning storage scales linearly</title>
      <Defs />

      <text x="136" y="44" textAnchor="end" fontSize="13" fontWeight="500" fill={INK}>1 customer</text>
      <rect x="150" y="30" width="28" height="22" rx="3" fill="url(#gNavy)" filter="url(#shSm)" />
      <text x="186" y="46" fontSize="12" fill={MID}>16 GB</text>

      <text x="136" y="94" textAnchor="end" fontSize="13" fontWeight="500" fill={INK}>10 customers</text>
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={150 + i * 29} y={80} width="27" height="22" rx="3" fill="url(#gNavy)" filter="url(#shSm)" />
      ))}
      <text x="452" y="96" fontSize="12" fill={MID}>160 GB</text>

      <text x="136" y="144" textAnchor="end" fontSize="13" fontWeight="500" fill={INK}>100 customers</text>
      <rect x="150" y="130" width="460" height="22" rx="3" fill="url(#gNavy)" filter="url(#shSm)" />
      <text x="618" y="146" fontSize="12" fill={MID}>1.6 TB</text>
    </svg>
  </DiagramFrame>
);

export const StructuredChangeDiagram = () => {
  const GRID = 12;
  const CELL = 14;
  const GAP = 2;

  const matrices = useMemo(() => {
    let rng = 42;
    const rand = () => { rng = (rng * 9301 + 49297) % 233280; return rng / 233280; };
    const before = [], after = [], diff = [];
    for (let i = 0; i < GRID; i++) {
      before[i] = []; after[i] = []; diff[i] = [];
      for (let j = 0; j < GRID; j++) before[i][j] = rand();
    }
    const rF = Array.from({ length: GRID }, () => (rand() - 0.5) * 0.6);
    const cF = Array.from({ length: GRID }, () => (rand() - 0.5) * 0.6);
    for (let i = 0; i < GRID; i++)
      for (let j = 0; j < GRID; j++) {
        diff[i][j] = rF[i] * cF[j] + (rand() - 0.5) * 0.05;
        after[i][j] = Math.max(0, Math.min(1, before[i][j] + diff[i][j]));
      }
    return { before, after, diff };
  }, []);

  const gray = v => {
    const t = Math.max(0, Math.min(1, v));
    const r = Math.round(240 - t * 100);
    const g = Math.round(244 - t * 108);
    const b = Math.round(251 - t * 116);
    return `rgb(${r},${g},${b})`;
  };
  const diverging = v => {
    if (Math.abs(v) < 0.04) return FILL;
    const a = Math.min(Math.abs(v) * 2, 0.85);
    return v > 0
      ? `rgba(2,62,125,${a})`
      : `rgba(122,139,163,${a})`;
  };

  const gridW = GRID * CELL + (GRID - 1) * GAP;
  const SP = 40;
  const total = 3 * gridW + 2 * SP;
  const ox = (680 - total) / 2;
  const cy = 54 + gridW / 2;

  const renderGrid = (data, x, y, fn) => (
    <g filter="url(#shSm)">{data.map((row, i) => row.map((v, j) => (
      <rect key={`${i}-${j}`} x={x + j * (CELL + GAP)} y={y + i * (CELL + GAP)} width={CELL} height={CELL} rx="2" fill={fn(v)} />
    )))}</g>
  );

  return (
    <DiagramFrame
      label="Fig. 2 · The change has structure"
      caption="The change matrix is not random noise. Parameters move in coordinated patterns, rows and columns shifting together. This low-rank structure is what LoRA exploits."
    >
      <svg viewBox="0 0 680 260" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
        <title>Structured change matrix</title>
        <Defs />

        <text x={ox + gridW / 2} y="26" textAnchor="middle" fontSize="13" fontWeight="500" fill={INK}>Before</text>
        <text x={ox + gridW / 2} y="42" textAnchor="middle" fontSize="11" fill={MUTED}>W</text>
        {renderGrid(matrices.before, ox, 54, gray)}

        <text x={ox + gridW + SP / 2} y={cy + 4} textAnchor="middle" fontSize="18" fill={MUTED}>{'−'}</text>

        <text x={ox + gridW + SP + gridW / 2} y="26" textAnchor="middle" fontSize="13" fontWeight="500" fill={INK}>After</text>
        <text x={ox + gridW + SP + gridW / 2} y="42" textAnchor="middle" fontSize="11" fill={MUTED}>{`W′`}</text>
        {renderGrid(matrices.after, ox + gridW + SP, 54, gray)}

        <text x={ox + 2 * gridW + 1.5 * SP} y={cy + 4} textAnchor="middle" fontSize="18" fill={MUTED}>=</text>

        <text x={ox + 2 * (gridW + SP) + gridW / 2} y="26" textAnchor="middle" fontSize="13" fontWeight="500" fill={INK}>The change</text>
        <text x={ox + 2 * (gridW + SP) + gridW / 2} y="42" textAnchor="middle" fontSize="11" fill={MUTED}>{`ΔW = W′ − W`}</text>
        {renderGrid(matrices.diff, ox + 2 * (gridW + SP), 54, diverging)}
      </svg>
    </DiagramFrame>
  );
};

export const DecompositionDiagram = () => {
  const [rank, setRank] = useState(16);
  const H = 4096, L = 32, V = 1024, FULL = H * H;
  const perMatrix = 2 * rank * H;
  const ratio = Math.round(FULL / perMatrix);
  const totalP = L * (2 * rank * H) + L * (rank * H + rank * V);
  const mb = Math.round((totalP * 2) / (1024 * 1024));
  const minW = 10, maxW = 56;
  const rW = minW + (Math.log2(rank) / Math.log2(128)) * (maxW - minW);

  const DW_CX = 135;
  const B_CX = 320;
  const A_CX = 495;
  const MAT_Y = 50;
  const MAT_H = 150;
  const MAT_CY = MAT_Y + MAT_H / 2;

  return (
    <DiagramFrame
      label="Fig. 3 · The decomposition"
      caption="The full change matrix has 16.7M parameters. LoRA reconstructs it from two small matrices whose combined size depends on rank."
    >
      <svg viewBox="0 0 680 230" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
        <title>LoRA decomposition</title>
        <Defs />

        <text x={DW_CX} y="38" textAnchor="middle" fontSize="13" fontWeight="500" fill={INK}>{'Δ'}W</text>
        <rect x={DW_CX - 75} y={MAT_Y} width="150" height={MAT_H} rx="4" fill="url(#gFill)" filter="url(#shSm)" />
        <text x={DW_CX} y="218" textAnchor="middle" fontSize="11" fill={MUTED}>4096 {'×'} 4096</text>

        <text x="248" y={MAT_CY + 5} textAnchor="middle" fontSize="20" fill={MUTED}>{'≈'}</text>

        <text x={B_CX} y="38" textAnchor="middle" fontSize="13" fontWeight="500" fill={NAVY}>B</text>
        <rect x={B_CX - rW / 2} y={MAT_Y} width={rW} height={MAT_H} rx="4" fill="url(#gNavy)" />
        <text x={B_CX} y="218" textAnchor="middle" fontSize="11" fill={NAVY}>4096 {'×'} {rank}</text>

        <text x="392" y={MAT_CY + 5} textAnchor="middle" fontSize="16" fill={MUTED}>{'×'}</text>

        <text x={A_CX} y="38" textAnchor="middle" fontSize="13" fontWeight="500" fill={NAVY}>A</text>
        <rect x={A_CX - 75} y={MAT_CY - rW / 2} width="150" height={rW} rx="4" fill="url(#gNavy)" />
        <text x={A_CX} y="218" textAnchor="middle" fontSize="11" fill={NAVY}>{rank} {'×'} 4096</text>
      </svg>

      <div className="mt-4 flex items-center gap-4">
        <label className="text-[13px] font-medium" style={{ color: INK, minWidth: 52 }} htmlFor="rank-slider">
          r = {rank}
        </label>
        <input
          id="rank-slider"
          type="range" min="2" max="128" step="1" value={rank}
          onChange={e => setRank(+e.target.value)}
          className="lora-rank-input flex-1"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          ['Per-matrix params', perMatrix.toLocaleString()],
          ['Compression', `${ratio}×`],
          ['Adapter on disk', `~${mb} MB`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md px-4 py-3" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,18,51,0.05)' }}>
            <div className="text-[11px] uppercase tracking-wide" style={{ color: MUTED }}>{label}</div>
            <div className="mt-1 text-xl font-semibold tracking-tight" style={{ color: INK }}>{value}</div>
          </div>
        ))}
      </div>

      <style>{`
        .lora-rank-input { -webkit-appearance: none; appearance: none; height: 3px; background: ${RULE}; border-radius: 2px; outline: none; }
        .lora-rank-input::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: ${NAVY}; border-radius: 50%; cursor: pointer; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,18,51,0.2); }
        .lora-rank-input::-moz-range-thumb { width: 16px; height: 16px; background: ${NAVY}; border-radius: 50%; cursor: pointer; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,18,51,0.2); }
      `}</style>
    </DiagramFrame>
  );
};

export const AttentionTargetsDiagram = () => {
  const projs = [
    { name: 'q_proj', role: 'query', lora: true },
    { name: 'k_proj', role: 'key', lora: false },
    { name: 'v_proj', role: 'value', lora: true },
    { name: 'o_proj', role: 'output', lora: false },
  ];

  return (
    <DiagramFrame
      label="Fig. 4 · Where LoRA attaches in an attention block"
      caption="Inside each transformer layer, four projection matrices handle different roles. LoRA typically adapts only q_proj and v_proj: 2 matrices per layer, 32 layers, 64 (B, A) pairs per adapter, roughly 13 MB total."
    >
      <svg viewBox="0 0 680 240" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
        <title>LoRA adapts q_proj and v_proj inside the attention block</title>
        <Defs />
        <defs>
          <marker id="arrAtt" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1L7 4L1 7" fill="none" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
          </marker>
        </defs>
        {projs.map((p, i) => {
          const x = 40 + i * 155;
          return (
            <g key={p.name} filter={p.lora ? 'url(#shMd)' : 'url(#shSm)'}>
              <rect x={x} y="10" width="138" height="70" rx="6"
                fill={p.lora ? 'url(#gNavy)' : 'url(#gFill)'}
                stroke={p.lora ? 'none' : RULE}
                strokeWidth={p.lora ? 0 : 0.5}
              />
              <text x={x + 69} y="38" textAnchor="middle" fontSize="14" fontWeight="600" fill={p.lora ? '#E2E8F0' : INK}>{p.name}</text>
              <text x={x + 69} y="58" textAnchor="middle" fontSize="11" fill={p.lora ? '#979dac' : MID}>{p.role}</text>
            </g>
          );
        })}
        {projs.map((p, i) => {
          const x = 40 + i * 155;
          return (
            <text key={`${p.name}-label`} x={x + 69} y="106" textAnchor="middle" fontSize="11" fontWeight="500" fill={p.lora ? NAVY : MUTED}>
              {p.lora ? 'LoRA adapted' : 'frozen'}
            </text>
          );
        })}

        {/* Attention flow: q & k → scores; scores & v → attend; attend → o_proj */}
        <path d="M 109 122 L 109 152 L 186 152" fill="none" stroke={MUTED} strokeWidth="1" strokeLinecap="round" />
        <path d="M 264 122 L 264 152 L 186 152" fill="none" stroke={MUTED} strokeWidth="1" strokeLinecap="round" />
        <rect x="160" y="156" width="52" height="20" rx="3" fill="white" stroke={RULE} strokeWidth="0.6" />
        <text x="186" y="170" textAnchor="middle" fontSize="10" fontWeight="500" fill={MID}>Q · Kᵀ</text>

        <path d="M 186 176 L 186 198 L 302 198" fill="none" stroke={MUTED} strokeWidth="1" strokeLinecap="round" />
        <path d="M 419 122 L 419 198 L 302 198" fill="none" stroke={MUTED} strokeWidth="1" strokeLinecap="round" />
        <rect x="276" y="202" width="52" height="20" rx="3" fill="white" stroke={RULE} strokeWidth="0.6" />
        <text x="302" y="216" textAnchor="middle" fontSize="10" fontWeight="500" fill={MID}>attend</text>

        <path d="M 328 212 L 495 212 L 495 45 L 503 45" fill="none" stroke={MUTED} strokeWidth="1" strokeLinecap="round" markerEnd="url(#arrAtt)" />
      </svg>
    </DiagramFrame>
  );
};

const ADAPTER_NAMES = ['Adapter 47', 'Adapter 132', 'Adapter 8', 'Adapter 201', 'Adapter 356'];

export const MultiLoRAServingDiagram = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <DiagramFrame
      label="Fig. 5 · Multi-LoRA serving"
      caption="A single base model sits permanently on the GPU. Adapters are loaded and swapped as requests arrive. The server decides which adapters to keep in fast memory."
    >
      <svg viewBox="0 0 680 340" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
        <title>Multi-LoRA serving</title>
        <Defs />
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1L7 4L1 7" fill="none" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round" />
          </marker>
        </defs>

        <text x="36" y="28" fontSize="11" fontWeight="500" letterSpacing="0.08em" fill={MUTED}>REQUESTS</text>
        {[0, 1, 2].map(i => {
          const idx = (activeIdx + i) % ADAPTER_NAMES.length;
          return (
            <text key={i} x="36" y={52 + i * 26} fontSize="12"
              fontWeight={i === 0 ? '500' : '400'}
              fill={i === 0 ? INK : MUTED}
              opacity={1 - i * 0.25}
            >
              {'→'} {ADAPTER_NAMES[idx].toLowerCase()}
            </text>
          );
        })}

        <line x1="168" y1="52" x2="206" y2="52" stroke={MUTED} strokeWidth="1" markerEnd="url(#arr)" />

        <rect x="214" y="8" width="450" height="316" rx="10" fill="none" stroke={RULE} strokeWidth="1" strokeDasharray="4 3" />
        <text x="439" y="30" textAnchor="middle" fontSize="11" fontWeight="500" letterSpacing="0.06em" fill={MUTED}>GPU {'·'} 80 GB</text>

        <g filter="url(#shLg)">
          <rect x="232" y="46" width="180" height="260" rx="8" fill="url(#gNavy)" />
          <text x="322" y="164" textAnchor="middle" fontSize="14" fontWeight="600" fill="#E2E8F0">Base Model</text>
          <text x="322" y="184" textAnchor="middle" fontSize="11" fill="#94A3B8">Llama-3.1-8B</text>
          <text x="322" y="202" textAnchor="middle" fontSize="11" fill="#64748B">16 GB {'·'} frozen</text>
        </g>

        {ADAPTER_NAMES.map((name, idx) => {
          const active = idx === activeIdx;
          return (
            <g key={name} onClick={() => setActiveIdx(idx)} style={{ cursor: 'pointer' }}
              filter={active ? 'url(#shMd)' : 'url(#shSm)'}>
              <rect x="432" y={46 + idx * 54} width="214" height="42" rx="6"
                fill={active ? 'url(#gNavy)' : 'url(#gFill)'}
                stroke={active ? '#001845' : RULE}
                strokeWidth={active ? 0.75 : 0.5}
                style={{ transition: 'all 0.2s ease' }}
              />
              <text x="452" y={72 + idx * 54} fontSize="12" fontWeight={active ? '600' : '400'} fill={active ? '#E2E8F0' : MID}>{name}</text>
              <text x="628" y={72 + idx * 54} textAnchor="end" fontSize="11" fill={active ? '#979dac' : MUTED}>13 MB</text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[12px]" style={{ color: MUTED }}>Click an adapter or advance with Next</span>
        <button
          type="button"
          onClick={() => setActiveIdx(p => (p + 1) % ADAPTER_NAMES.length)}
          className="rounded-md px-3 py-1.5 text-[12px] transition-colors"
          style={{ border: `1px solid ${RULE}`, color: INK, background: 'transparent', boxShadow: '0 1px 2px rgba(0,18,51,0.05)' }}
          onMouseEnter={e => { e.currentTarget.style.background = FILL; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Next →
        </button>
      </div>
    </DiagramFrame>
  );
};
