import type { ReactNode } from 'react'

// SVG図の共通部品。パステル配色と矢印マーカーを提供する。
export const C = {
  mint: '#bfeedd',
  mintDeep: '#4fb59a',
  pink: '#ffd6e2',
  pinkDeep: '#e2748f',
  lemon: '#fff3a8',
  lavender: '#e2dcfa',
  lavenderDeep: '#8b7bd8',
  sky: '#d7ebff',
  skyDeep: '#5a9fe0',
  peach: '#ffe4cf',
  peachDeep: '#e59a5e',
  ink: '#3a3a44',
  soft: '#6b6b78',
  line: '#cfc8bd',
}

export function Svg({ w, h, label, children }: { w: number; h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <title>{label}</title>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#7b7488" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

// 角丸ボックス + 中央テキスト（複数行は配列で）
export function Box({ x, y, w, h, fill = '#fff', stroke = C.line, lines, size = 13, bold = false, dashed = false }: { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; lines: string | string[]; size?: number; bold?: boolean; dashed?: boolean }) {
  const ls = Array.isArray(lines) ? lines : [lines]
  const lh = size * 1.35
  const startY = y + h / 2 - ((ls.length - 1) * lh) / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} strokeWidth={1.5} strokeDasharray={dashed ? '5 4' : undefined} />
      {ls.map((t, i) => (
        <text key={i} x={x + w / 2} y={startY + i * lh} textAnchor="middle" dominantBaseline="middle" fontSize={size} fontWeight={bold ? 700 : 400} fill={C.ink}>
          {t}
        </text>
      ))}
    </g>
  )
}

export function Arrow({ d, dashed = false, color = '#7b7488' }: { d: string; dashed?: boolean; color?: string }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={2} markerEnd="url(#arr)" strokeDasharray={dashed ? '5 4' : undefined} />
}

export function Label({ x, y, text, size = 12, anchor = 'start', color = C.soft, bold = false }: { x: number; y: number; text: string; size?: number; anchor?: 'start' | 'middle' | 'end'; color?: string; bold?: boolean }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={color} fontWeight={bold ? 700 : 400} dominantBaseline="middle">
      {text}
    </text>
  )
}
