import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 観察の5領域と主な観察項目（模式図）
const FigObserveMap: FC = () => {
  const areas = [
    { t: '問診', f: C.sky, items: ['咳・むせ・こぼし', '避けている食品', '体重変化・摂食時間', '既往歴・薬・義歯歴'] },
    { t: '食事場面', f: C.mint, items: ['姿勢・環境', '食形態・一口量', '咀嚼・嚥下・むせ', '食後の声・咳'] },
    { t: '口腔内', f: C.lemon, items: ['衛生・舌苔・乾燥', '残存歯・歯肉', '粘膜の傷・発赤', '舌・軟口蓋の動き'] },
    { t: '義歯装着時', f: C.peach, items: ['着脱・安静時の安定', '会話時の動き・発音', '咀嚼時の痛み', '外した後の粘膜'] },
    { t: '発声・構音', f: C.lavender, items: ['湿性嗄声・GRBAS', '構音・発話明瞭度', 'パ・タ・カ', '義歯の有無で比較'] },
  ]
  const w = 128
  const gap = 14
  return (
    <Svg w={760} h={330} label="観察の5つの領域（問診、食事場面、口腔内、義歯装着時、発声・構音）を左から右へ負担の少ない順に並べ、各領域の主な観察項目を示した模式図。どの領域でも危険なサインがあれば歯科医師へ相談する。">
      <Label x={380} y={22} text="負担の少ない順に進める →" size={13} anchor="middle" bold color={C.ink} />
      {areas.map((a, i) => {
        const x = 20 + i * (w + gap)
        return (
          <g key={a.t}>
            <Box x={x} y={44} w={w} h={44} fill={a.f} lines={a.t} size={14} bold />
            <rect x={x} y={96} width={w} height={150} rx={10} fill="#fff" stroke={C.line} strokeWidth={1.5} />
            {a.items.map((it, j) => (
              <Label key={it} x={x + 10} y={118 + j * 34} text={`・${it}`} size={11} color={C.ink} />
            ))}
            {i < areas.length - 1 && <Arrow d={`M${x + w + 2} 66 L${x + w + gap - 2} 66`} />}
          </g>
        )
      })}
      {/* 危険サイン → 歯科医師へ */}
      <Box x={230} y={276} w={300} h={40} fill={C.pink} lines="危険なサインがあれば → 歯科医師へ報告・相談" size={12} bold />
      {areas.map((_, i) => (
        <Arrow key={i} d={`M${20 + i * (w + gap) + w / 2} 248 L${20 + i * (w + gap) + w / 2} 262 L380 262 L380 274`} dashed color={C.pinkDeep} />
      ))}
    </Svg>
  )
}

export const figuresCh06: Record<string, FC> = {
  'ch06-observe-map': FigObserveMap,
}
