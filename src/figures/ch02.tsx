import type { FC } from 'react'
import { Arrow, C, Label, Svg } from './common'

// 歯と歯周組織の断面（模式図）
const ToothSection: FC = () => (
  <Svg w={760} h={420} label="歯の断面の模式図。外側からエナメル質、象牙質、中心に歯髄。歯根はセメント質に覆われ、歯根膜を介して歯槽骨に支えられ、歯肉が歯頸部を覆う。">
    {/* 歯槽骨 */}
    <path d="M150 210 L150 400 L470 400 L470 210 L400 210 L400 380 Q310 410 220 380 L220 210 Z" fill={C.peach} stroke={C.line} />
    {/* 歯肉 */}
    <path d="M150 210 L220 210 L220 180 Q240 160 250 170 L250 150 L150 150 Z" fill={C.pink} stroke={C.line} />
    <path d="M470 210 L400 210 L400 180 Q380 160 370 170 L370 150 L470 150 Z" fill={C.pink} stroke={C.line} />
    {/* 歯根膜（骨と歯根の間のすき間） */}
    <path d="M222 210 L222 378 Q310 408 398 378 L398 210" fill="none" stroke={C.lavenderDeep} strokeWidth={5} />
    {/* セメント質 */}
    <path d="M232 205 L232 372 Q310 398 388 372 L388 205" fill="none" stroke={C.peachDeep} strokeWidth={4} />
    {/* 象牙質（歯冠＋歯根） */}
    <path d="M236 205 L236 370 Q310 394 384 370 L384 205 L384 120 Q384 60 310 48 Q236 60 236 120 Z" fill="#fff7e0" stroke={C.line} />
    {/* エナメル質 */}
    <path d="M232 200 L232 115 Q232 42 310 28 Q388 42 388 115 L388 200 L372 200 L372 118 Q372 62 310 50 Q248 62 248 118 L248 200 Z" fill="#fff" stroke={C.ink} strokeWidth={1.5} />
    {/* 歯髄 */}
    <path d="M285 110 Q310 90 335 110 L335 200 Q335 260 322 330 L298 330 Q285 260 285 200 Z" fill={C.pink} stroke={C.pinkDeep} />
    {/* ラベル（右側） */}
    {[
      { y: 60, t: 'エナメル質（体で最も硬い。歯冠の表面）', x1: 372, y1: 60 },
      { y: 110, t: '象牙質（歯の本体）', x1: 378, y1: 150 },
      { y: 160, t: '歯髄（血管・神経）', x1: 335, y1: 180 },
      { y: 215, t: '歯肉（歯ぐき）', x1: 440, y1: 180 },
      { y: 265, t: 'セメント質（歯根の表面）', x1: 388, y1: 280 },
      { y: 315, t: '歯根膜（骨と歯をつなぐクッション）', x1: 398, y1: 320 },
      { y: 365, t: '歯槽骨（歯が植わる顎の骨）', x1: 450, y1: 360 },
    ].map((l, i) => (
      <g key={i}>
        <line x1={l.x1} y1={l.y1} x2={500} y2={l.y} stroke={C.soft} strokeWidth={1} />
        <Label x={506} y={l.y} text={l.t} size={12} color={C.ink} />
      </g>
    ))}
    {/* 左側: 歯冠・歯頸・歯根 */}
    <Label x={140} y={90} text="歯冠" size={12} anchor="end" color={C.soft} bold />
    <Label x={140} y={180} text="歯頸" size={12} anchor="end" color={C.soft} bold />
    <Label x={140} y={300} text="歯根" size={12} anchor="end" color={C.soft} bold />
    <line x1={145} y1={120} x2={145} y2={165} stroke={C.soft} strokeDasharray="3 3" />
    <line x1={145} y1={195} x2={145} y2={290} stroke={C.soft} strokeDasharray="3 3" />
    <Label x={60} y={405} text="※ 歯周組織 ＝ 歯肉・歯根膜・セメント質・歯槽骨" size={11} />
  </Svg>
)

// 口の中の各部位を上から見た図（模式図）
const OralMap: FC = () => (
  <Svg w={760} h={410} label="上顎と下顎を上から見た模式図。図の上が前（唇側）、下が後ろ（のど側）。上顎は顎堤の内側に硬口蓋、その後ろに軟口蓋と口蓋垂が続き、上顎総義歯の床はおおよそ顎堤と硬口蓋を覆う。耳下腺の開口部は上の奥歯の横の頬粘膜にある。下顎は顎堤の内側に舌があり、下の前歯の裏の口底に顎下腺・舌下腺の開口部（舌下小丘）がある。">
    {/* 上顎 */}
    <Label x={190} y={16} text="上顎（口蓋側から見る）" size={13} anchor="middle" bold color={C.ink} />
    <Label x={190} y={34} text="前（唇側）" size={10} anchor="middle" />
    <path d="M50 300 Q50 46 190 42 Q330 46 330 300 Z" fill={C.pink} stroke={C.line} />
    {/* 軟口蓋と口蓋垂（顎堤より後ろへ続く） */}
    <path d="M114 262 L266 262 Q268 300 222 314 Q204 318 198 332 Q190 346 182 332 Q176 318 158 314 Q112 300 114 262 Z" fill={C.lavender} stroke={C.line} />
    {/* 顎堤 */}
    <path d="M90 272 Q90 80 190 70 Q290 80 290 272" fill="none" stroke={C.peachDeep} strokeWidth={18} strokeLinecap="round" />
    {/* 硬口蓋 */}
    <path d="M112 262 Q112 100 190 92 Q268 100 268 262 Z" fill="#fff" stroke={C.line} />
    {/* 上顎総義歯の床が覆うおおよその範囲 */}
    <path d="M74 274 Q74 60 190 54 Q306 60 306 274 Z" fill="none" stroke={C.pinkDeep} strokeWidth={1.8} strokeDasharray="6 4" />
    <Label x={190} y={170} text="硬口蓋" size={12} anchor="middle" bold color={C.ink} />
    <Label x={190} y={290} text="軟口蓋" size={12} anchor="middle" bold color={C.ink} />
    <Label x={212} y={340} text="口蓋垂" size={10} />
    {/* 耳下腺開口部（上の奥歯の横の頬粘膜） */}
    <circle cx={66} cy={214} r={5} fill={C.skyDeep} />
    <circle cx={314} cy={214} r={5} fill={C.skyDeep} />
    <Label x={30} y={360} text="● 耳下腺の開口部（上の奥歯の横の頬粘膜）" size={11} color={C.skyDeep} />
    <Label x={30} y={378} text="■ 顎堤（歯を失ったあとの土手）　※ 歯があればこの上に歯列" size={10.5} color={C.peachDeep} />
    <Label x={30} y={396} text="--- 上顎総義歯の床が覆うおおよその範囲" size={10.5} color={C.pinkDeep} />

    {/* 下顎 */}
    <Label x={570} y={16} text="下顎（上から見る）" size={13} anchor="middle" bold color={C.ink} />
    <Label x={570} y={34} text="前（唇側）" size={10} anchor="middle" />
    <path d="M430 300 Q430 46 570 42 Q710 46 710 300 Z" fill={C.pink} stroke={C.line} />
    <path d="M470 272 Q470 80 570 70 Q670 80 670 272" fill="none" stroke={C.peachDeep} strokeWidth={18} strokeLinecap="round" />
    {/* 舌（舌尖の前に口底が見える） */}
    <path d="M498 300 Q494 150 570 124 Q646 150 642 300 Z" fill="#ffb7c5" stroke={C.pinkDeep} />
    <path d="M570 124 L570 108" stroke={C.pinkDeep} strokeWidth={1.5} />
    <Label x={570} y={210} text="舌" size={14} anchor="middle" bold color={C.ink} />
    <Label x={570} y={234} text="（義歯の内側の壁）" size={10} anchor="middle" />
    {/* 舌下小丘（顎下腺・舌下腺の開口部） */}
    <circle cx={561} cy={104} r={4} fill={C.skyDeep} />
    <circle cx={579} cy={104} r={4} fill={C.skyDeep} />
    <Label x={420} y={360} text="● 顎下腺・舌下腺の開口部（舌下小丘：下の前歯の裏の口底）" size={11} color={C.skyDeep} />
    <Label x={420} y={378} text="矢印：頬・口唇が外側から義歯を支える" size={11} color={C.mintDeep} />
    <Arrow d="M722 190 L682 190" color={C.mintDeep} />
    <Arrow d="M418 190 L458 190" color={C.mintDeep} />
    <Label x={740} y={190} text="頬" size={11} anchor="middle" color={C.mintDeep} bold />
    <Label x={402} y={176} text="頬" size={11} anchor="middle" color={C.mintDeep} bold />
  </Svg>
)

// 歯式の2つの表し方
const ToothNotation: FC = () => {
  const nums = [8, 7, 6, 5, 4, 3, 2, 1]
  const cell = 36
  const x0 = 90
  const row = (y: number, labels: (string | number)[], fill: string) =>
    labels.map((n, i) => (
      <g key={`${y}-${i}`}>
        <rect x={x0 + i * cell} y={y} width={cell - 2} height={30} rx={5} fill={fill} stroke={C.line} />
        <text x={x0 + i * cell + (cell - 2) / 2} y={y + 15} fontSize={12} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>
          {n}
        </text>
      </g>
    ))
  const mid = x0 + 8 * cell + 8
  return (
    <Svg w={760} h={400} label="歯式の2つの表し方。上段は日本の慣用表記で、十字に区切った4区画に1から8の番号。下段はFDI二桁法で、右上1x・左上2x・左下3x・右下4xの二桁。">
      <Label x={380} y={22} text="患者さんの右側 ←　　　　　　　　　　　　　→ 患者さんの左側" size={12} anchor="middle" bold color={C.ink} />
      {/* 慣用表記 */}
      <Label x={20} y={60} text="日本の慣用表記（Zsigmondy式）" size={13} bold color={C.ink} />
      {row(78, nums, '#fff')}
      {row(78, [1, 2, 3, 4, 5, 6, 7, 8].map(String), '#fff').map((g, i) => <g key={`u-${i}`} transform={`translate(${8 * cell + 8},0)`}>{g}</g>)}
      <line x1={x0 - 4} y1={113} x2={mid + 8 * cell} y2={113} stroke={C.ink} strokeWidth={2} />
      <line x1={mid - 4} y1={70} x2={mid - 4} y2={156} stroke={C.ink} strokeWidth={2} />
      {row(118, nums, '#fff')}
      {row(118, [1, 2, 3, 4, 5, 6, 7, 8].map(String), '#fff').map((g, i) => <g key={`l-${i}`} transform={`translate(${8 * cell + 8},0)`}>{g}</g>)}
      <rect x={x0 + 1 * cell} y={78} width={cell - 2} height={30} rx={5} fill={C.lemon} stroke={C.peachDeep} strokeWidth={2} />
      <text x={x0 + 1 * cell + (cell - 2) / 2} y={93} fontSize={12} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>7</text>
      <Label x={x0 + 1 * cell + 17} y={170} text="「右上7」＝ 右上の第2大臼歯" size={11} anchor="middle" color={C.peachDeep} bold />
      <Label x={mid + 8 * cell + 10} y={93} text="上顎" size={11} />
      <Label x={mid + 8 * cell + 10} y={133} text="下顎" size={11} />
      {/* FDI */}
      <Label x={20} y={215} text="FDI二桁法（国際的な表記）" size={13} bold color={C.ink} />
      {row(233, nums.map((n) => `1${n}`), C.sky)}
      {row(233, nums.map((_, i) => `2${i + 1}`), C.mint).map((g, i) => <g key={`fu-${i}`} transform={`translate(${8 * cell + 8},0)`}>{g}</g>)}
      <line x1={x0 - 4} y1={268} x2={mid + 8 * cell} y2={268} stroke={C.ink} strokeWidth={2} />
      <line x1={mid - 4} y1={225} x2={mid - 4} y2={311} stroke={C.ink} strokeWidth={2} />
      {row(273, nums.map((n) => `4${n}`), C.peach)}
      {row(273, nums.map((_, i) => `3${i + 1}`), C.lavender).map((g, i) => <g key={`fl-${i}`} transform={`translate(${8 * cell + 8},0)`}>{g}</g>)}
      <rect x={x0 + 1 * cell} y={233} width={cell - 2} height={30} rx={5} fill={C.lemon} stroke={C.peachDeep} strokeWidth={2} />
      <text x={x0 + 1 * cell + (cell - 2) / 2} y={248} fontSize={12} textAnchor="middle" dominantBaseline="middle" fill={C.ink}>17</text>
      <Label x={mid + 8 * cell + 10} y={248} text="上顎" size={11} />
      <Label x={mid + 8 * cell + 10} y={288} text="下顎" size={11} />
      <Label x={x0 + 1 * cell + 17} y={325} text="「17」＝ 1(右上) + 7(第2大臼歯)" size={11} anchor="middle" color={C.peachDeep} bold />
      <Label x={20} y={360} text="1桁目：1 右上 ／ 2 左上 ／ 3 左下 ／ 4 右下（乳歯は 5・6・7・8）" size={11} color={C.ink} />
      <Label x={20} y={382} text="2桁目：1 中切歯 … 3 犬歯 … 6 第1大臼歯 … 8 第3大臼歯（乳歯は1〜5）" size={11} color={C.ink} />
    </Svg>
  )
}

export const figuresCh02: Record<string, FC> = {
  'ch02-tooth-section': ToothSection,
  'ch02-oral-map': OralMap,
  'ch02-tooth-notation': ToothNotation,
}

