import React from 'react';

const INK = '#001233';
const MID = '#33415c';
const MUTED = '#5c677d';
const RULE = '#C8D1DD';
const NAVY = '#023e7d';
const PURPLE = '#33415c';
const CORAL = '#c52233';

const FONT = "'IBM Plex Sans', sans-serif";
const NOISE_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='.035'/%3E%3C/svg%3E\")";

const lerp = (v, d0, d1, r0, r1) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
const logLerp = (v, d0, d1, r0, r1) => lerp(Math.log(v), Math.log(d0), Math.log(d1), r0, r1);

const Defs = () => (
  <defs>
    <linearGradient id="gNavy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0353a4" /><stop offset="100%" stopColor="#001845" />
    </linearGradient>
    <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#33415c" /><stop offset="100%" stopColor="#001845" />
    </linearGradient>
    <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E0E5ED" /><stop offset="100%" stopColor="#C8D1DD" />
    </linearGradient>
    <linearGradient id="gCoral" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#a7333f" /><stop offset="100%" stopColor="#74121d" />
    </linearGradient>
    <filter id="shSm" x="-10%" y="-6%" width="120%" height="125%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#001233" floodOpacity="0.1" />
    </filter>
    <filter id="shMd" x="-8%" y="-8%" width="116%" height="132%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#001233" floodOpacity="0.1" />
    </filter>
  </defs>
);

const DiagramFrame = ({ label, children, caption }) => (
  <figure className="my-10 mx-0">
    <div className="rounded-xl border border-[#C8D1DD] bg-white p-6 relative overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,18,51,0.04), 0 6px 20px rgba(0,18,51,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none rounded-xl"
        style={{ backgroundImage: NOISE_BG, backgroundSize: '300px' }} />
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

/* ================================================================
   FIG 1 - Memory hierarchy
   ================================================================ */
export const MemoryHierarchyDiagram = () => {
  const sX = 175, sP = 54, sW = 48, sH = 28, sY = 130;
  const cX = 175, cP = 56, cW = 48, cH = 20;
  const cY1 = 278, cY2 = 302;

  const slots = [
    { id: '008', filled: true, hit: true },
    { id: '012', filled: true },
    { id: '044', filled: true },
    { id: '097', filled: true },
    { filled: false, target: true },
    { filled: false },
  ];

  const cpuR1 = ['201','088','356','177','410','055','312','226'];
  const cpuR2 = ['503','142','661','289','018','445','770','329'];

  const hitCy = sY + sH / 2;
  const coldReqCy = 184;
  const coldCpuI = 2;
  const coldCpuCx = cX + coldCpuI * cP + cW / 2;
  const coldGpuI = 4;
  const coldGpuCx = sX + coldGpuI * sP + sW / 2;

  return (
    <DiagramFrame
      label="Fig. 1 — Hot path vs. cold path"
      caption="Multi-LoRA serving is a working-set problem. The base model stays on the GPU, while only a limited set of active adapters occupies GPU slots. Requests to resident adapters take the fast path; cold adapters are paged from the CPU pool into a GPU slot."
    >
      <svg viewBox="0 0 700 385" className="block h-auto w-full" style={{ fontFamily: FONT }} role="img">
        <title>Hot path vs cold path through the multi-LoRA memory hierarchy</title>
        <Defs />
        <defs>
          <marker id="arrN" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1,1.5 L7,4 L1,6.5" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="arrC" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1,1.5 L7,4 L1,6.5" fill="none" stroke={CORAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* ── Incoming request tiles ── */}
        <g filter="url(#shSm)">
          <rect x={18} y={hitCy - sH / 2} width={100} height={sH} rx={4} fill="url(#gNavy)" />
          <text x={68} y={hitCy + 4} textAnchor="middle" fontSize="9.5" fill="#CBD5E1"
            fontFamily="'SF Mono',Menlo,monospace">adapter_008</text>
        </g>
        <g filter="url(#shSm)">
          <rect x={18} y={coldReqCy - sH / 2} width={100} height={sH} rx={4} fill="url(#gCoral)" />
          <text x={68} y={coldReqCy + 4} textAnchor="middle" fontSize="9.5" fill="#F5DED6"
            fontFamily="'SF Mono',Menlo,monospace">adapter_356</text>
        </g>

        {/* ── GPU HBM zone ── */}
        <rect x={158} y={12} width={528} height={200} rx={10} fill="#EEF2F9" />
        <rect x={158} y={12} width={528} height={200} rx={10} fill="none" stroke={NAVY} strokeWidth={1} opacity={0.35} />
        <text x={175} y={36} fontSize="11" fontWeight="700" fill={NAVY} letterSpacing="0.06em">GPU HBM</text>

        <g filter="url(#shSm)">
          <rect x={175} y={48} width={230} height={52} rx={6} fill="url(#gNavy)" />
        </g>
        <text x={290} y={72} textAnchor="middle" fontSize="12" fontWeight="500" fill="#E2E8F0">Base Model</text>
        <text x={290} y={87} textAnchor="middle" fontSize="8.5" fill="#8899AB">frozen</text>

        <g filter="url(#shSm)">
          <rect x={415} y={48} width={258} height={52} rx={6} fill="url(#gNavy)" opacity={0.6} />
        </g>
        <text x={544} y={78} textAnchor="middle" fontSize="12" fontWeight="500" fill="#E2E8F0">KV Cache</text>

        <text x={175} y={123} fontSize="9" fontWeight="600" fill={PURPLE} letterSpacing="0.05em">ACTIVE SLOTS</text>
        <text x={280} y={123} fontSize="9" fill={MUTED} fontStyle="italic">max_loras</text>

        {slots.map((s, i) => {
          const x = sX + i * sP;
          return s.filled ? (
            <g key={i}>
              <g filter="url(#shSm)">
                <rect x={x} y={sY} width={sW} height={sH} rx={4} fill="url(#gBlue)" />
              </g>
              <text x={x + sW / 2} y={sY + sH / 2 + 3.5} textAnchor="middle" fontSize="9"
                fill="#E2E8F0" fontFamily="'SF Mono',Menlo,monospace">{s.id}</text>
              {s.hit && (
                <rect x={x - 1.5} y={sY - 1.5} width={sW + 3} height={sH + 3} rx={5}
                  fill="none" stroke="#5BA8D5" strokeWidth={1.5} opacity={0.7} />
              )}
            </g>
          ) : (
            <rect key={i} x={x} y={sY} width={sW} height={sH} rx={4}
              fill="none" stroke={s.target ? CORAL : MUTED}
              strokeWidth={s.target ? 1 : 0.7} strokeDasharray="3 2"
              opacity={s.target ? 0.5 : 0.4} />
          );
        })}

        {/* ── CPU RAM zone ── */}
        <rect x={158} y={248} width={528} height={82} rx={10} fill="#F4F1F8" />
        <rect x={158} y={248} width={528} height={82} rx={10} fill="none" stroke={PURPLE} strokeWidth={0.8} opacity={0.25} />
        <text x={175} y={270} fontSize="11" fontWeight="700" fill={PURPLE} letterSpacing="0.06em">CPU RAM</text>
        <text x={253} y={270} fontSize="9" fill={MUTED} fontStyle="italic">max_cpu_loras</text>

        {[cpuR1, cpuR2].map((row, ri) =>
          row.map((id, ci) => {
            const x = cX + ci * cP;
            const y = ri === 0 ? cY1 : cY2;
            const hot = id === '356';
            return (
              <g key={`${ri}-${ci}`}>
                <rect x={x} y={y} width={cW} height={cH} rx={3}
                  fill={hot ? CORAL : PURPLE} opacity={hot ? 0.18 : 0.08} />
                <text x={x + cW / 2} y={y + cH / 2 + 3} textAnchor="middle" fontSize="8"
                  fill={hot ? CORAL : MUTED} fontFamily="'SF Mono',Menlo,monospace"
                  opacity={hot ? 1 : 0.6}>{id}</text>
                {hot && (
                  <rect x={x - 1} y={y - 1} width={cW + 2} height={cH + 2} rx={4}
                    fill="none" stroke={CORAL} strokeWidth={1.2} opacity={0.6} />
                )}
              </g>
            );
          })
        )}
        <text x={cX + 8 * cP + 4} y={cY1 + cH / 2 + 3} fontSize="11" fill={MUTED} opacity={0.35}>···</text>
        <text x={cX + 8 * cP + 4} y={cY2 + cH / 2 + 3} fontSize="11" fill={MUTED} opacity={0.35}>···</text>

        {/* ── Disk zone (de-emphasized) ── */}
        <rect x={158} y={356} width={528} height={22} rx={6} fill="#F5F5F5" />
        <text x={175} y={371} fontSize="9" fill={MUTED} opacity={0.5}>Disk</text>
        <text x={205} y={371} fontSize="8" fill={MUTED} opacity={0.3} fontStyle="italic">adapters at rest</text>

        {/* ── Fast path: request → GPU slot (navy, straight) ── */}
        <line x1={118} y1={hitCy} x2={sX} y2={hitCy}
          stroke={NAVY} strokeWidth={2} markerEnd="url(#arrN)" />
        <text x={147} y={hitCy - 8} textAnchor="middle"
          fontSize="8.5" fontWeight="600" fill={NAVY}>resident hit</text>

        {/* ── Cold path seg 1: request → CPU adapter (dashed) ── */}
        <path
          d={`M 118,${coldReqCy} C 148,${coldReqCy} 148,${cY1 + cH / 2} ${cX + coldCpuI * cP},${cY1 + cH / 2}`}
          fill="none" stroke={CORAL} strokeWidth={1.3} strokeDasharray="4 3" opacity={0.5} />

        {/* ── Cold path seg 2: CPU adapter → GPU slot (solid arrow) ── */}
        <path
          d={`M ${coldCpuCx},${cY1} C ${coldCpuCx},222 ${coldGpuCx},222 ${coldGpuCx},${sY + sH + 1}`}
          fill="none" stroke={CORAL} strokeWidth={1.8} markerEnd="url(#arrC)" />
        <text x={coldGpuCx + 12} y={225}
          fontSize="8.5" fontWeight="600" fill={CORAL}>page-in miss</text>
      </svg>
    </DiagramFrame>
  );
};

/* ================================================================
   FIG 2 - Throughput vs adapter count, two panels
   ================================================================ */
export const ThroughputByAdapterCountDiagram = () => {
  const N = [1, 10, 50, 100, 250, 500, 1000];
  const c32 = [1934.7, 1489.5, 1058.5, 972.4, 916.2, 896.8, 884.1];
  const c8  = [560.3, 475.2, 444.3, 438.2, 434.6, 433.1, 431.9];
  const c1  = [70.9, 70.5, 70.6, 70.5, 70.4, 70.3, 70.2];

  const X = 75, XR = 640, YT = 35, YB = 320;
  const xS = n => logLerp(n, 1, 1000, X, XR);
  const yS = tps => logLerp(tps, 50, 2500, YB, YT);

  const series = [
    { data: c32, color: CORAL, label: 'c = 32' },
    { data: c8,  color: PURPLE, label: 'c = 8' },
    { data: c1,  color: MUTED, label: 'c = 1' },
  ];

  const yTicks = [50, 100, 200, 500, 1000, 2000];

  return (
    <DiagramFrame
      label="Fig. 2 - Throughput vs adapter count at three concurrency levels"
      caption={<>Uniform traffic, max_loras=32, log-log scale. At c=1 throughput is flat: the working set is always one adapter. At c=8 and c=32, throughput declines well before N exceeds max_loras.</>}
    >
      <svg viewBox="0 0 680 390" className="block w-full h-auto" style={{ fontFamily: FONT }} role="img">
        <title>Throughput across adapter count at three concurrency levels under uniform traffic</title>
        <Defs />

        {/* Axes */}
        <line x1={X} y1={YT} x2={X} y2={YB} stroke={MUTED} strokeWidth="0.5" />
        <line x1={X} y1={YB} x2={XR} y2={YB} stroke={MUTED} strokeWidth="0.5" />
        {yTicks.map(t => (
          <g key={t}>
            <text x={X - 8} y={yS(t) + 4} textAnchor="end" fontSize="11" fill={MID}>{t}</text>
            <line x1={X} y1={yS(t)} x2={XR} y2={yS(t)} stroke={MUTED} strokeWidth="0.3" strokeDasharray="2 3" opacity="0.3" />
          </g>
        ))}
        <text x="30" y={(YT + YB) / 2} transform={`rotate(-90 30 ${(YT + YB) / 2})`} textAnchor="middle" fontSize="11" fill={MID}>tokens/sec (log)</text>

        {/* Lines */}
        {series.map(s => (
          <g key={s.label}>
            <polyline points={N.map((n, i) => `${xS(n)},${yS(s.data[i])}`).join(' ')}
              fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {N.map((n, i) => (
              <circle key={i} cx={xS(n)} cy={yS(s.data[i])} r="3.5" fill={s.color} stroke="white" strokeWidth="1.5" />
            ))}
          </g>
        ))}

        {/* Legend */}
        <g filter="url(#shSm)" transform="translate(510, 10)">
          <rect x="0" y="0" width="120" height="76" rx="6" fill="white" fillOpacity="0.9" stroke={RULE} strokeWidth="0.5" />
          {series.map((s, i) => (
            <g key={i}>
              <line x1="10" y1={16 + i * 24} x2="28" y2={16 + i * 24} stroke={s.color} strokeWidth="2" />
              <circle cx="19" cy={16 + i * 24} r="3" fill={s.color} stroke="white" strokeWidth="1" />
              <text x="34" y={20 + i * 24} fontSize="11" fill={MID}>{s.label}</text>
            </g>
          ))}
        </g>

        {/* X-axis */}
        {[1, 10, 100, 1000].map(n => (
          <text key={n} x={xS(n)} y="345" textAnchor="middle" fontSize="11" fill={MID}>{n}</text>
        ))}
        <text x="358" y="370" textAnchor="middle" fontSize="11" fill={MID}>Adapter count N (log scale)</text>
      </svg>
    </DiagramFrame>
  );
};

/* ================================================================
   FIG 3 - Uniform vs Zipf grouped bar chart
   ================================================================ */
export const UniformVsZipfDiagram = () => {
  const data = [
    { n: 10,   u: 1489.5, z: 2530.6, lift: '+70%' },
    { n: 50,   u: 1058.5, z: 2189.5, lift: '+107%' },
    { n: 100,  u: 972.4,  z: 2159.9, lift: '+122%' },
    { n: 250,  u: 916.2,  z: 2139.8, lift: '+134%' },
    { n: 500,  u: 896.8,  z: 2127.2, lift: '+137%' },
    { n: 1000, u: 884.1,  z: 2167.3, lift: '+145%' },
  ];
  const cx = [135, 225, 315, 405, 495, 585];
  const BW = 34;
  const YT = 50, YB = 320, YMAX = 2800;
  const yS = v => lerp(v, 0, YMAX, YB, YT);

  return (
    <DiagramFrame
      label="Fig. 3 - Uniform vs Zipf throughput (c=32, max_loras=32)"
      caption={<>Zipf traffic consistently outperforms uniform, with lift growing from +70% at N=10 to +145% at N=1,000.</>}
    >
      <svg viewBox="0 0 680 390" className="block w-full h-auto" style={{ fontFamily: FONT }} role="img">
        <title>Throughput under uniform versus Zipf traffic at c=32</title>
        <Defs />

        {/* Axes */}
        <line x1="80" y1={YT} x2="80" y2={YB} stroke={MUTED} strokeWidth="0.5" />
        <line x1="80" y1={YB} x2="640" y2={YB} stroke={MUTED} strokeWidth="0.5" />

        {[0, 500, 1000, 1500, 2000, 2500].map(t => (
          <g key={t}>
            <text x="72" y={yS(t) + 4} textAnchor="end" fontSize="11" fill={MID}>{t}</text>
            {t > 0 && <line x1="80" y1={yS(t)} x2="640" y2={yS(t)} stroke={MUTED} strokeWidth="0.3" strokeDasharray="2 3" opacity="0.3" />}
          </g>
        ))}
        <text x="34" y={(YT + YB) / 2} transform={`rotate(-90 34 ${(YT + YB) / 2})`} textAnchor="middle" fontSize="11" fill={MID}>tokens/sec</text>

        {/* Bars */}
        {data.map((d, i) => {
          const x = cx[i];
          return (
            <g key={i}>
              <g filter="url(#shSm)">
                <rect x={x - BW - 2} y={yS(d.u)} width={BW} height={YB - yS(d.u)} fill="url(#gFill)" rx="3" />
              </g>
              <g filter="url(#shSm)">
                <rect x={x + 2} y={yS(d.z)} width={BW} height={YB - yS(d.z)} fill="url(#gNavy)" rx="3" />
              </g>
              <text x={x} y="338" textAnchor="middle" fontSize="11" fill={MID}>N={d.n}</text>
              <text x={x + 2 + BW / 2} y={yS(d.z) - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY}>{d.lift}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(470, 360)">
          <rect x="0" y="0" width="14" height="12" fill="url(#gFill)" rx="2" />
          <text x="20" y="10" fontSize="11" fill={MID}>Uniform</text>
          <rect x="98" y="0" width="14" height="12" fill="url(#gNavy)" rx="2" />
          <text x="118" y="10" fontSize="11" fill={MID}>Zipf (s=1.5)</text>
        </g>
      </svg>
    </DiagramFrame>
  );
};

/* ================================================================
   Heatmap helper
   ================================================================ */
const Heatmap = ({
  data, rowLabels, colLabels, colHeader, rowHeader,
  toOp, cellColor, bestPerRow = false,
  legendHigh, legendLow, legendGradientId,
  annotation, viewH = 380,
}) => {
  const CW = 68, CH = 36;
  const GX = 148, GY = 76;
  const rows = data.length, cols = data[0].length;

  const bestCols = bestPerRow
    ? data.map(row => row.indexOf(Math.max(...row)))
    : [];

  return (
    <svg viewBox={`0 0 680 ${viewH}`} className="block w-full h-auto" style={{ fontFamily: FONT }} role="img">
      <Defs />
      <defs>
        <linearGradient id={legendGradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={cellColor} stopOpacity="0.95" />
          <stop offset="1" stopColor={cellColor} stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Column header */}
      <text x={GX + (cols * CW) / 2} y="38" textAnchor="middle" fontSize="13" fontWeight="500" fill={INK}>{colHeader}</text>
      {colLabels.map((cl, ci) => (
        <text key={ci} x={GX + ci * CW + CW / 2} y="62" textAnchor="middle" fontSize="11" fill={MID}>{cl}</text>
      ))}

      {/* Row header */}
      <text x={GX - 14} y="38" textAnchor="end" fontSize="13" fontWeight="500" fill={INK}>{rowHeader}</text>
      {rowLabels.map((rl, ri) => (
        <text key={ri} x={GX - 14} y={GY + ri * CH + CH / 2 + 4} textAnchor="end" fontSize="11" fill={MID}>{rl}</text>
      ))}

      {/* Cells */}
      <g filter="url(#shSm)">
        {data.map((row, ri) =>
          row.map((v, ci) => (
            <rect key={`${ri}-${ci}`}
              x={GX + ci * CW + 1} y={GY + ri * CH + 1}
              width={CW - 2} height={CH - 2} rx="3"
              fill={cellColor} opacity={toOp(v)} />
          ))
        )}
      </g>

      {/* Values */}
      {data.map((row, ri) =>
        row.map((v, ci) => {
          const op = toOp(v);
          const light = op > 0.42;
          return (
            <text key={`t${ri}-${ci}`}
              x={GX + ci * CW + CW / 2} y={GY + ri * CH + CH / 2 + 4}
              textAnchor="middle" fontSize="11"
              fill={light ? '#fff' : INK}
              fontWeight={light ? '500' : '400'}>
              {v}
            </text>
          );
        })
      )}

      {/* Best-per-row markers */}
      {bestPerRow && bestCols.map((ci, ri) => (
        <circle key={`best-${ri}`}
          cx={GX + ci * CW + CW / 2} cy={GY + ri * CH + CH / 2}
          r="14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
      ))}

      {/* Legend */}
      <text x={GX + cols * CW + 20} y={GY + 20} fontSize="11" fill={MID}>{legendHigh}</text>
      <rect x={GX + cols * CW + 28} y={GY + 28} width="12" height={rows * CH - 50}
        fill={`url(#${legendGradientId})`} rx="2" />
      <text x={GX + cols * CW + 20} y={GY + rows * CH - 12} fontSize="11" fill={MID}>{legendLow}</text>

      {/* Annotation */}
      {annotation}
    </svg>
  );
};

/* ================================================================
   FIG 4 - Throughput heatmap
   ================================================================ */
export const ThroughputHeatmapDiagram = () => {
  const data = [
    [3672, 3611, 3465, 3306, 3021, 2583],
    [2071, 2597, 2627, 2550, 2370, 2079],
    [1204, 1843, 2245, 2211, 2091, 1819],
    [1136, 1737, 2190, 2161, 2039, 1808],
    [1085, 1652, 2211, 2135, 2031, 1791],
    [1085, 1628, 2160, 2150, 2000, 1763],
  ];
  const MIN = 1085, MAX = 3672;
  const toOp = v => 0.08 + ((v - MIN) / (MAX - MIN)) * 0.87;

  return (
    <DiagramFrame
      label="Fig. 4 - Throughput heatmap (c=32, Zipf)"
      caption={<>Throughput (tokens/sec) peaks at max_loras=16 for N{'>'}1. Both undersized and oversized configurations cost roughly 20% of peak throughput on identical hardware. Best cell per row circled.</>}
    >
      <Heatmap
        data={data}
        rowLabels={[1, 10, 50, 100, 250, 500]}
        colLabels={[4, 8, 16, 32, 64, 128]}
        colHeader="max_loras"
        rowHeader="N"
        toOp={toOp}
        cellColor={NAVY}
        bestPerRow
        legendHigh="Higher"
        legendLow="Lower"
        legendGradientId="htTps"
        viewH={320}
        annotation={
          <rect x={148 + 2 * 68} y={76 + 36} width={68} height={5 * 36}
            fill="none" stroke={PURPLE} strokeWidth="1.5" strokeDasharray="4 3" rx="4" />
        }
      />
    </DiagramFrame>
  );
};

/* ================================================================
   FIG 5 - max_loras U-curve for N=500 (NEW)
   ================================================================ */
export const MaxLorasUCurveDiagram = () => {
  const ml = [4, 8, 16, 32, 64, 128];
  const tps = [1085, 1628, 2160, 2150, 2000, 1763];
  const ttft = [8034, 4305, 170, 152, 155, 162];

  const xS = v => lerp(Math.log2(v), 2, 7, 115, 590);
  const yTps = v => lerp(v, 800, 2400, 175, 35);
  const yTtft = v => lerp(v, 0, 9000, 380, 235);

  const bandL = xS(16) - 20, bandR = xS(32) + 20;

  return (
    <DiagramFrame
      label="Fig. 5 - The max_loras U-curve (N=500, c=32, Zipf)"
      caption={<>Throughput peaks and p99 TTFT flattens in the 16-32 band. Below it, cold-load penalties dominate. Above it, per-batch coordination overhead erodes throughput.</>}
    >
      <svg viewBox="0 0 680 430" className="block w-full h-auto" style={{ fontFamily: FONT }} role="img">
        <title>max_loras U-curve: throughput and p99 TTFT for N=500</title>
        <Defs />

        {/* Sweet-spot band behind both panels */}
        <rect x={bandL} y="25" width={bandR - bandL} height="355" fill={PURPLE} opacity="0.04" rx="4" />

        {/* ── Top panel: throughput ── */}
        <text x="44" y="110" transform="rotate(-90 44 110)" textAnchor="middle" fontSize="11" fill={MID}>tokens/sec</text>
        <line x1="80" y1="35" x2="80" y2="175" stroke={MUTED} strokeWidth="0.5" />
        <line x1="80" y1="175" x2="600" y2="175" stroke={MUTED} strokeWidth="0.5" />
        {[1000, 1500, 2000].map(t => (
          <g key={t}>
            <text x="72" y={yTps(t) + 4} textAnchor="end" fontSize="11" fill={MID}>{t}</text>
            <line x1="80" y1={yTps(t)} x2="600" y2={yTps(t)} stroke={MUTED} strokeWidth="0.3" strokeDasharray="2 3" opacity="0.3" />
          </g>
        ))}

        <polyline points={ml.map((m, i) => `${xS(m)},${yTps(tps[i])}`).join(' ')}
          fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {ml.map((m, i) => (
          <g key={i}>
            <circle cx={xS(m)} cy={yTps(tps[i])} r="4" fill={NAVY} stroke="white" strokeWidth="1.5" />
            <text x={xS(m)} y={yTps(tps[i]) - 10} textAnchor="middle" fontSize="10" fontWeight="500" fill={NAVY}>{tps[i]}</text>
          </g>
        ))}

        <text x="610" y="55" fontSize="11" fontWeight="500" fill={NAVY}>Throughput</text>

        {/* ── Bottom panel: p99 TTFT bars ── */}
        <text x="44" y="310" transform="rotate(-90 44 310)" textAnchor="middle" fontSize="11" fill={MID}>p99 TTFT (ms)</text>
        <line x1="80" y1="235" x2="80" y2="380" stroke={MUTED} strokeWidth="0.5" />
        <line x1="80" y1="380" x2="600" y2="380" stroke={MUTED} strokeWidth="0.5" />
        {[0, 3000, 6000, 9000].map(t => (
          <g key={t}>
            <text x="72" y={yTtft(t) + 4} textAnchor="end" fontSize="11" fill={MID}>{t === 0 ? '0' : `${t / 1000}k`}</text>
            {t > 0 && <line x1="80" y1={yTtft(t)} x2="600" y2={yTtft(t)} stroke={MUTED} strokeWidth="0.3" strokeDasharray="2 3" opacity="0.3" />}
          </g>
        ))}

        {ml.map((m, i) => {
          const bw = 38, bx = xS(m) - bw / 2;
          return (
            <g key={i}>
              <g filter="url(#shSm)">
                <rect x={bx} y={yTtft(ttft[i])} width={bw} height={380 - yTtft(ttft[i])} fill="url(#gCoral)" rx="3" />
              </g>
              <text x={xS(m)} y={yTtft(ttft[i]) - 6} textAnchor="middle" fontSize="10" fontWeight="500" fill={CORAL}>
                {ttft[i] >= 1000 ? `${(ttft[i] / 1000).toFixed(1)}s` : `${ttft[i]}ms`}
              </text>
            </g>
          );
        })}

        <text x="610" y="260" fontSize="11" fontWeight="500" fill={CORAL}>p99 TTFT</text>

        {/* Shared x-axis */}
        {ml.map(m => (
          <text key={m} x={xS(m)} y="400" textAnchor="middle" fontSize="11" fill={MID}>{m}</text>
        ))}
        <text x="340" y="422" textAnchor="middle" fontSize="11" fill={MID}>max_loras</text>

        {/* Band label */}
        <text x={(bandL + bandR) / 2} y="18" textAnchor="middle" fontSize="10" fontWeight="500" fill={PURPLE}>optimal range</text>
      </svg>
    </DiagramFrame>
  );
};

/* ================================================================
   FIG 6 - p99 TTFT heatmap
   ================================================================ */
export const TTFTHeatmapDiagram = () => {
  const data = [
    [57, 68, 58, 59, 59, 62],
    [3723, 1426, 69, 69, 70, 79],
    [7171, 2964, 145, 119, 104, 127],
    [7263, 3253, 149, 134, 150, 127],
    [7949, 3157, 163, 138, 170, 162],
    [8034, 4305, 170, 152, 155, 162],
  ];
  const toOp = v => Math.max(0.06, Math.min(0.95, Math.log(v / 50) / Math.log(170)));

  return (
    <DiagramFrame
      label="Fig. 6 - p99 TTFT heatmap (c=32, Zipf)"
      caption={<>p99 TTFT in milliseconds. Under undersized max_loras, tail latency reaches multi-second values. The cliff between max_loras=8 and max_loras=16 is sharp: roughly a fifty-fold drop. N=1 shows uniformly low TTFT because the working set never exceeds one adapter.</>}
    >
      <Heatmap
        data={data}
        rowLabels={[1, 10, 50, 100, 250, 500]}
        colLabels={[4, 8, 16, 32, 64, 128]}
        colHeader="max_loras"
        rowHeader="N"
        toOp={toOp}
        cellColor="#74121d"
        legendHigh="8000+ ms"
        legendLow="<100 ms"
        legendGradientId="htTtft"
        viewH={320}
        annotation={
          <rect x={148} y={76 + 36} width={2 * 68} height={5 * 36}
            fill="none" stroke={NAVY} strokeWidth="1.5" strokeDasharray="4 3" rx="4" />
        }
      />
    </DiagramFrame>
  );
};

/* ================================================================
   FIG 7 - Memory decomposition, split panels
   ================================================================ */
