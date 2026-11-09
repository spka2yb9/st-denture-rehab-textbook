import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 間接訓練と狙う筋・機能の対応（模式図）
const FigTrainingTargets: FC = () => {
  const trainings = [
    { t: ['口唇・舌・頬の運動', '口唇閉鎖訓練'], f: C.mint, to: [0, 1] },
    { t: ['舌抵抗訓練'], f: C.mint, to: [1, 2] },
    { t: ['開口訓練'], f: C.sky, to: [2, 3] },
    { t: ['頭部挙上訓練', '嚥下おでこ体操'], f: C.sky, to: [2, 3] },
    { t: ['のどのアイスマッサージ', '冷圧刺激・氷なめ'], f: C.lavender, to: [4] },
    { t: ['ブローイング', '咳嗽・ハフィング'], f: C.peach, to: [5] },
  ]
  const targets = [
    ['口唇閉鎖', '（口輪筋・頬筋）'],
    ['舌の運動と舌圧', '（送り込み・食塊形成）'],
    ['舌骨上筋群の筋力'],
    ['喉頭挙上・食道入口部の開大'],
    ['嚥下反射の惹起'],
    ['呼気・咳の力', '鼻咽腔閉鎖'],
  ]
  const rowH = 58
  const lx = 20
  const lw = 230
  const rx = 500
  const rw = 240
  const top = 50
  return (
    <Svg w={760} h={top + targets.length * (rowH + 6) + 40} label="左の間接訓練から右の狙う筋・機能へ矢印を引いた対応図。口唇・舌・頬の運動は口唇閉鎖と舌の運動へ、舌抵抗訓練は舌圧と舌骨上筋群へ、開口訓練と頭部挙上訓練は舌骨上筋群と喉頭挙上へ、アイスマッサージ類は嚥下反射の惹起へ、ブローイングと咳嗽訓練は呼気・咳の力と鼻咽腔閉鎖へつながる。">
      <Label x={lx + lw / 2} y={24} text="間接訓練（食べ物を使わない）" size={13} anchor="middle" bold color={C.ink} />
      <Label x={rx + rw / 2} y={24} text="狙う筋・機能" size={13} anchor="middle" bold color={C.ink} />
      {trainings.map((tr, i) => (
        <Box key={i} x={lx} y={top + i * rowH} w={lw} h={46} fill={tr.f} lines={tr.t} size={12} />
      ))}
      {targets.map((tg, i) => (
        <Box key={i} x={rx} y={top + 12 + i * (rowH + 6)} w={rw} h={48} lines={tg} size={12} />
      ))}
      {trainings.flatMap((tr, i) =>
        tr.to.map((j) => {
          const y1 = top + i * rowH + 23
          const y2 = top + 12 + j * (rowH + 6) + 24
          return <Arrow key={`${i}-${j}`} d={`M${lx + lw} ${y1} C ${lx + lw + 90} ${y1}, ${rx - 90} ${y2}, ${rx} ${y2}`} color="#7b7488" />
        }),
      )}
      <Label x={380} y={top + targets.length * (rowH + 6) + 26} text="※ 模式図。対応は代表的なもので、訓練法のまとめ（2014版）の「意義」をもとに整理しています（発声・構音練習は本文参照）。" size={11} anchor="middle" />
    </Svg>
  )
}

// 評価所見 → 主な問題 → 候補となる間接訓練（模式図）
const FigTrainingFlow: FC = () => {
  const rows = [
    { s: ['口からこぼれる', '流涎がある'], p: ['口唇閉鎖の低下'], t: ['口唇閉鎖訓練', '口唇の自動・抵抗運動'] },
    { s: ['口腔内に残る', '送り込みに時間がかかる'], p: ['舌の運動・舌圧の低下'], t: ['舌抵抗訓練', '口唇・舌・頬の訓練'] },
    { s: ['喉頭の上がりが弱い', '咽頭残留・湿性嗄声'], p: ['舌骨上筋群の筋力低下', '食道入口部の開大不全'], t: ['開口訓練', '頭部挙上訓練／嚥下おでこ体操'] },
    { s: ['なかなか飲み込みが起きない', '口にためたまま'], p: ['嚥下反射の惹起遅延'], t: ['のどのアイスマッサージ', '氷なめ訓練・冷圧刺激'] },
    { s: ['咳が弱い', '鼻へ逆流する ※'], p: ['呼気・咳嗽力の低下', '鼻咽腔閉鎖不全など'], t: ['咳嗽・ハフィング訓練', 'ブローイング訓練（効果は検証中）'] },
  ]
  const rowH = 70
  const top = 46
  const cols = [
    { x: 16, w: 220, f: C.lemon },
    { x: 280, w: 200, f: C.lavender },
    { x: 524, w: 220, f: C.mint },
  ]
  return (
    <Svg w={760} h={top + rows.length * rowH + 48} label="評価で見られた所見から主な問題を推定し、候補となる間接訓練へつなぐ流れを5行で示した模式図。各行は左から右へ矢印でつながる。">
      <Label x={cols[0].x + cols[0].w / 2} y={22} text="評価でみられた所見" size={13} anchor="middle" bold color={C.ink} />
      <Label x={cols[1].x + cols[1].w / 2} y={22} text="推定される主な問題" size={13} anchor="middle" bold color={C.ink} />
      <Label x={cols[2].x + cols[2].w / 2} y={22} text="候補となる間接訓練" size={13} anchor="middle" bold color={C.ink} />
      {rows.map((r, i) => {
        const y = top + i * rowH
        return (
          <g key={i}>
            <Box x={cols[0].x} y={y} w={cols[0].w} h={54} fill={cols[0].f} lines={r.s} size={12} />
            <Arrow d={`M${cols[0].x + cols[0].w} ${y + 27} L${cols[1].x} ${y + 27}`} />
            <Box x={cols[1].x} y={y} w={cols[1].w} h={54} fill={cols[1].f} lines={r.p} size={12} />
            <Arrow d={`M${cols[1].x + cols[1].w} ${y + 27} L${cols[2].x} ${y + 27}`} />
            <Box x={cols[2].x} y={y} w={cols[2].w} h={54} fill={cols[2].f} lines={r.t} size={12} />
          </g>
        )
      })}
      <Label x={380} y={top + rows.length * rowH + 12} text="※ 模式図。実際は複数の問題が重なるため、評価全体をみて組み合わせます。" size={11} anchor="middle" />
      <Label x={380} y={top + rows.length * rowH + 32} text="※ 鼻への逆流は食道入口部の開大不全などでも起こるため、咽頭の精査について歯科医師と相談します。" size={11} anchor="middle" />
    </Svg>
  )
}

export const figuresCh09: Record<string, FC> = {
  'ch09-targets': FigTrainingTargets,
  'ch09-flow': FigTrainingFlow,
}
