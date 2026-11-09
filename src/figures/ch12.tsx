import type { FC } from 'react'
import { C, Label, Svg } from './common'

// 認知症4病型 × 摂食嚥下の段階 の対応図（模式図）
// 濃淡: 2=問題になりやすい, 1=ときに問題, 0=目立ちにくい。text が ['—'] のセルは本文の資料に特徴的な記載がない段階
const NA = { level: 0 as const, text: ['—'] }
const ROWS: { name: string; abbr: string; cells: { level: 0 | 1 | 2; text: string[] }[]; other: string[] }[] = [
  {
    name: 'アルツハイマー型',
    abbr: 'AD',
    cells: [
      { level: 2, text: ['食べ始めない', '途中で止まる', '好みの変化', '食具が使えない'] },
      { level: 0, text: ['咀嚼・嚥下の', '機能自体は', '問題になりにくい'] },
      { level: 0, text: ['（同左）'] },
      { level: 0, text: ['終末期に', '誤嚥が増える'] },
    ],
    other: ['見当識・実行機能の障害', '手づかみ食べの許容'],
  },
  {
    name: 'レビー小体型',
    abbr: 'DLB',
    cells: [
      { level: 2, text: ['「虫が入っている」', 'などの誤認で', '食欲が低下'] },
      NA,
      NA,
      { level: 2, text: ['嚥下反射遅延', '咽頭残留', '不顕性誤嚥', '（比較的早期から）'] },
    ],
    other: ['抗精神病薬による', '薬剤性嚥下障害が多い'],
  },
  {
    name: '血管性（皮質下型）',
    abbr: 'VaD',
    cells: [
      NA,
      NA,
      NA,
      { level: 2, text: ['錐体外路症状', '麻痺が軽くても誤嚥'] },
    ],
    other: ['脳卒中の後遺症が重なる', '（第13章）'],
  },
  {
    name: '前頭側頭型',
    abbr: 'FTD',
    cells: [
      { level: 2, text: ['衝動的・過食', '異食・盗食'] },
      NA,
      NA,
      { level: 2, text: ['窒息'] },
    ],
    other: ['声かけ・食具の工夫が', '通用しにくい', '（介入は最小限に）'],
  },
]
const COLS = ['先行期', '準備期', '口腔期', '咽頭期']
const FILL = ['#f6f3ee', C.lemon, C.pink]

export const FigDementiaMatrix: FC = () => {
  const x0 = 130
  const cw = 118
  const y0 = 60
  const rh = 88
  const otherX = x0 + cw * 4 + 10
  return (
    <Svg w={760} h={y0 + rh * 4 + 56} label="認知症4病型（アルツハイマー型、レビー小体型、血管性、前頭側頭型）と摂食嚥下の先行期・準備期・口腔期・咽頭期における特徴を表にした模式図。アルツハイマー型は先行期の食行動障害が中心、レビー小体型と血管性（皮質下型）は咽頭期の誤嚥、前頭側頭型は先行期の衝動性と窒息が目立つ。資料に特徴的な記載がない段階は横線で示す。">
      {COLS.map((c, i) => (
        <Label key={c} x={x0 + cw * i + cw / 2} y={30} text={c} size={13} anchor="middle" bold color={C.ink} />
      ))}
      <Label x={otherX + 60} y={30} text="その他の影響" size={13} anchor="middle" bold color={C.ink} />
      {ROWS.map((r, ri) => {
        const y = y0 + rh * ri
        return (
          <g key={r.abbr}>
            <rect x={8} y={y} width={x0 - 16} height={rh - 8} rx={10} fill={C.lavender} />
            <text x={8 + (x0 - 16) / 2} y={y + rh / 2 - 12} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.ink}>
              {r.name}
            </text>
            <text x={8 + (x0 - 16) / 2} y={y + rh / 2 + 8} textAnchor="middle" fontSize={11} fill={C.soft}>
              {r.abbr}
            </text>
            {r.cells.map((cell, ci) => {
              const x = x0 + cw * ci
              const lines = cell.text
              const startY = y + (rh - 8) / 2 - ((lines.length - 1) * 15) / 2
              return (
                <g key={ci}>
                  <rect x={x + 3} y={y} width={cw - 6} height={rh - 8} rx={10} fill={FILL[cell.level]} stroke={C.line} />
                  {lines.map((t, li) => (
                    <text key={li} x={x + cw / 2} y={startY + li * 15} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill={C.ink}>
                      {t}
                    </text>
                  ))}
                </g>
              )
            })}
            {r.other.map((t, li) => (
              <text key={li} x={otherX} y={y + (rh - 8) / 2 - 8 + li * 16} fontSize={11} fill={C.soft} dominantBaseline="middle">
                {t}
              </text>
            ))}
          </g>
        )
      })}
      {/* 凡例 */}
      {[
        ['問題になりやすい', 2],
        ['ときに問題', 1],
        ['目立ちにくい', 0],
      ].map(([t, lv], i) => (
        <g key={String(t)}>
          <rect x={x0 + i * 150} y={y0 + rh * 4 + 10} width={16} height={16} rx={4} fill={FILL[lv as number]} stroke={C.line} />
          <Label x={x0 + i * 150 + 22} y={y0 + rh * 4 + 18} text={String(t)} size={11} />
        </g>
      ))}
      <Label x={8} y={y0 + rh * 4 + 18} text="模式図（典型像）" size={11} color={C.soft} />
      <Label x={8} y={y0 + rh * 4 + 40} text="— は本文で扱った資料に特徴的な記載がない段階（問題が起きないという意味ではありません）" size={10.5} color={C.soft} />
    </Svg>
  )
}

export const figuresCh12: Record<string, FC> = {
  'ch12-dementia-matrix': FigDementiaMatrix,
}
