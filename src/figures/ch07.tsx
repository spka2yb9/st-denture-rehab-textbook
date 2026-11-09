import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// RSST・MWST・FT の手順と判定の流れ
const FigScreeningFlow: FC = () => {
  const cols = [
    { x: 20, title: 'RSST（反復唾液嚥下テスト）', f: C.sky, how: ['喉頭隆起と舌骨に', '指腹を当て、30秒間の', '空嚥下回数を数える'] },
    { x: 268, title: 'MWST（改訂水飲みテスト）', f: C.mint, how: ['冷水3mLを口腔底に注ぎ', '嚥下を指示', '（舌背に注がない）'] },
    { x: 516, title: 'フードテスト（FT）', f: C.lemon, how: ['ティースプーン1杯（約4g）の', 'プリンを嚥下させ、', '口腔内の残留を観察'] },
  ]
  const scale = [
    ['1', '嚥下なし、むせ/呼吸切迫'],
    ['2', '嚥下あり、呼吸切迫'],
    ['3', '嚥下あり、呼吸良好、むせ/湿性嗄声'],
    ['4', '嚥下あり、呼吸良好、むせなし'],
    ['5', '4＋反復嚥下2回/30秒'],
  ]
  return (
    <Svg w={760} h={420} label="RSST、MWST、フードテストの手順と判定を並べた模式図。RSSTは30秒間に3回未満で陽性。MWSTとフードテストは評価点1から5で判定する。MWSTは4点以上なら最大2回繰り返して最も悪い点を採用する。フードテストは3点と4点で口腔内残留の程度も見る。">
      {cols.map((c) => (
        <g key={c.title}>
          <Box x={c.x} y={30} w={224} h={36} fill={c.f} lines={c.title} size={12} bold />
          <Box x={c.x} y={76} w={224} h={62} lines={c.how} size={11} />
          <Arrow d={`M${c.x + 112} 140 L${c.x + 112} 156`} />
        </g>
      ))}

      {/* RSST 判定 */}
      <Box x={20} y={160} w={224} h={44} fill="#fff" lines={['30秒間に3回未満']} size={12} bold />
      <Arrow d="M80 204 L60 232" />
      <Arrow d="M184 204 L204 232" />
      <Box x={20} y={234} w={96} h={40} fill={C.pink} lines={['陽性', '（問題あり）']} size={11} />
      <Box x={148} y={234} w={96} h={40} fill={C.mint} lines={['陰性', '（3回以上）']} size={11} />
      <Label x={132} y={300} text="指示理解が不良なら判定不可" size={10.5} anchor="middle" />
      <Label x={132} y={318} text="感度0.98 / 特異度0.66" size={10.5} anchor="middle" />

      {/* MWST & FT 共通の5段階 */}
      {[268, 516].map((x, k) => (
        <g key={x}>
          {scale.map((s, i) => (
            <g key={s[0]}>
              <rect x={x} y={160 + i * 30} width={224} height={26} rx={6} fill={i >= 3 ? '#eafaf3' : '#fff0f4'} stroke={C.line} strokeWidth={1} />
              <Label x={x + 14} y={173 + i * 30} text={s[0]} size={12} bold color={C.ink} />
              <Label x={x + 32} y={173 + i * 30} text={s[1]} size={10.5} color={C.ink} />
            </g>
          ))}
          <Label x={x + 112} y={322} text={k === 0 ? '4点以上 → 最大2回繰り返し、最も悪い点' : '3点は残留中等度、4点は残留ほぼなしも条件'} size={10.5} anchor="middle" />
          <Label x={x + 112} y={340} text={k === 0 ? 'カットオフ4点: 感度1.0 / 特異度0.71' : 'カットオフ4点: 感度1.0 / 特異度0.82'} size={10.5} anchor="middle" />
        </g>
      ))}

      {/* 凡例 */}
      <rect x={20} y={364} width={14} height={14} rx={3} fill="#fff0f4" stroke={C.line} />
      <Label x={40} y={371} text="評価点1〜3：嚥下なし・呼吸切迫・むせ・湿性嗄声のいずれかがみられた" size={11} />
      <rect x={20} y={388} width={14} height={14} rx={3} fill="#eafaf3" stroke={C.line} />
      <Label x={40} y={395} text="評価点4〜5：むせなく嚥下できた（それでも誤嚥がないとは限らない）" size={11} />
    </Svg>
  )
}

// 質問紙 → スクリーニング → 精密検査の判断の流れ
const FigCombination: FC = () => {
  const steps = [
    { y: 20, t: ['問診・質問紙（第6章）', 'EAT-10 3点以上／聖隷式 Aあり'], f: C.sky },
    { y: 96, t: ['口腔ケア → RSST', '30秒3回未満で陽性'], f: C.mint },
    { y: 172, t: ['MWST・フードテスト（形態は状態に合わせて）', '＋ 頸部聴診（第8章）'], f: C.lemon },
    { y: 248, t: ['結果を歯科医師へ報告', 'VE・VF の必要性を相談'], f: C.lavender },
  ]
  return (
    <Svg w={760} h={330} label="質問紙からRSST、MWST・フードテストと頸部聴診、歯科医師への報告とVE・VFの相談へ上から下に進む流れの一例。むせや湿性嗄声、呼吸の変化など危険なサインが出たら、その場で検査を進めるのをやめて歯科医師へ報告・相談する。学会が定めた順番や中止基準ではない。">
      {steps.map((s, i) => (
        <g key={i}>
          <Box x={120} y={s.y} w={300} h={56} fill={s.f} lines={s.t} size={12} bold={i === 3} />
          {i < steps.length - 1 && <Arrow d={`M270 ${s.y + 58} L270 ${s.y + 74}`} />}
          {i < steps.length - 1 && <Arrow d={`M422 ${s.y + 28} L518 ${s.y + 28}`} dashed color={C.pinkDeep} />}
        </g>
      ))}
      <Label x={470} y={12} text="むせ・湿性嗄声・呼吸の変化などの危険なサイン" size={10.5} anchor="middle" color={C.pinkDeep} />
      <Box x={520} y={24} w={220} h={200} fill={C.pink} lines={['その場で検査を進めるのをやめ', '歯科医師へ報告・相談']} size={12} bold />
      <Arrow d="M630 224 L630 276 L424 276" dashed color={C.pinkDeep} />
      <Label x={60} y={48} text="疑いを拾う" size={11} anchor="middle" />
      <Label x={60} y={124} text="反射の確認" size={11} anchor="middle" />
      <Label x={60} y={200} text="形態別に確認" size={11} anchor="middle" />
      <Label x={60} y={276} text="精密検査へ" size={11} anchor="middle" />
      <Label x={380} y={318} text="※ 進め方の一例（学会が定めた順番・中止基準ではありません）。判断は歯科医師の指示に従います。" size={10.5} anchor="middle" />
    </Svg>
  )
}

export const figuresCh07: Record<string, FC> = {
  'ch07-screening-flow': FigScreeningFlow,
  'ch07-combination': FigCombination,
}
