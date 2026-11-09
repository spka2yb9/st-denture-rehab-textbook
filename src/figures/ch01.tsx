import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 引き出し線つきのラベル（線の端に小さな点を置き、指している位置を明確にする）
const Lead = ({ x1, y1, x2, y2, text, anchor = 'start', color = C.ink, bold = false, size = 12 }: { x1: number; y1: number; x2: number; y2: number; text: string; anchor?: 'start' | 'end' | 'middle'; color?: string; bold?: boolean; size?: number }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.soft} strokeWidth={1} />
    <circle cx={x1} cy={y1} r={2.5} fill={C.soft} />
    <Label x={anchor === 'end' ? x2 - 4 : x2 + 4} y={y2} text={text} size={size} anchor={anchor} color={color} bold={bold} />
  </g>
)

// 口腔・咽頭・喉頭の矢状断面（模式図）
// 顔を左に向けた頭頸部を正中で切った断面。輪郭・骨・軟部組織を色分けし、食べ物の道と空気の道を重ねる。
const FigSagittal: FC = () => (
  <Svg w={760} h={500} label="顔を左に向けた頭と首を、真ん中で縦に切った断面の模式図。前から鼻腔・口腔・舌、その奥に咽頭、咽頭の下で前側に喉頭と気管、後ろ側に食道があり、さらに後ろに頸椎がある。食べ物の道は口から咽頭を通って後ろの食道へ、空気の道は鼻から咽頭を通って前の喉頭・気管へ向かい、咽頭で交差する。">
    {/* 皮膚の輪郭（顔は左向き） */}
    <path
      d="M 196 22 C 178 40, 170 70, 166 96 C 150 112, 128 138, 112 154 C 120 164, 134 168, 144 172 C 138 182, 134 194, 136 204 C 132 210, 132 218, 138 224 C 134 236, 140 250, 146 262 C 150 278, 160 290, 182 296 C 214 302, 246 304, 262 316 L 270 488"
      fill="none"
      stroke="#b9a99a"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <path d="M 196 22 C 300 6, 420 30, 440 120 C 450 180, 432 240, 420 300 L 418 488" fill="none" stroke="#b9a99a" strokeWidth={2.5} strokeLinecap="round" />
    {/* 頸椎 */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} x={352} y={150 + i * 46} width={40} height={38} rx={6} fill="#efe9e1" stroke="#d6cbbd" />
    ))}
    <Label x={372} y={130} text="頸椎" size={11} anchor="middle" color={C.soft} />
    {/* 鼻腔 */}
    <path d="M 168 104 C 200 92, 262 92, 300 108 L 318 128 L 318 170 L 160 172 C 150 160, 150 128, 168 104 Z" fill={C.sky} stroke={C.line} strokeWidth={1.2} />
    {/* 咽頭（鼻咽頭〜下咽頭）の内腔 */}
    <path d="M 300 108 C 320 110, 336 118, 340 134 L 342 330 C 342 342, 336 352, 330 356 L 310 356 L 306 300 C 310 278, 312 250, 308 232 L 318 170 L 318 128 Z" fill="#dff5ec" stroke="none" />
    <path d="M 340 134 L 342 330" stroke={C.line} strokeWidth={1.5} />
    {/* 硬口蓋（骨） */}
    <path d="M 150 176 L 272 176" stroke="#a89f95" strokeWidth={7} strokeLinecap="round" />
    {/* 上の歯・下の歯 */}
    <rect x={142} y={178} width={12} height={16} rx={3} fill="#fff" stroke={C.line} />
    <rect x={144} y={212} width={12} height={15} rx={3} fill="#fff" stroke={C.line} />
    {/* 舌 */}
    <path d="M 158 214 C 168 196, 214 186, 258 194 C 296 202, 312 236, 306 272 C 302 290, 296 300, 286 304 C 248 300, 204 278, 176 254 C 164 244, 156 228, 158 214 Z" fill={C.peach} stroke={C.peachDeep} strokeWidth={1.2} />
    {/* 下顎骨 */}
    <path d="M 150 230 C 150 256, 160 280, 186 288 C 210 294, 236 292, 252 286" fill="none" stroke="#a89f95" strokeWidth={7} strokeLinecap="round" />
    {/* 軟口蓋（嚥下時に上がって鼻への道をふさぐ） */}
    <path d="M 272 176 C 290 180, 304 196, 308 222" stroke={C.pinkDeep} strokeWidth={7} strokeLinecap="round" fill="none" />
    {/* 舌骨 */}
    <ellipse cx={262} cy={312} rx={13} ry={6} fill={C.lemon} stroke="#c9b45a" />
    {/* 喉頭蓋（嚥下時に倒れて喉頭の入口をふさぐ） */}
    <path d="M 290 318 C 300 304, 308 290, 312 270" stroke={C.pinkDeep} strokeWidth={6} strokeLinecap="round" fill="none" />
    {/* 喉頭（甲状軟骨・声帯） */}
    <path d="M 266 326 L 306 326 L 306 392 L 270 392 C 262 372, 260 346, 266 326 Z" fill="#fff" stroke={C.line} strokeWidth={1.5} />
    <path d="M 272 356 L 300 352 L 272 362 Z" fill={C.lavenderDeep} />
    {/* 気管（軟骨の輪） */}
    <path d="M 272 392 L 304 392 L 304 488 L 274 488 Z" fill="#fff" stroke={C.line} strokeWidth={1.5} />
    {[404, 420, 436, 452, 468].map((y) => (
      <line key={y} x1={274} y1={y} x2={304} y2={y} stroke="#d6cbbd" />
    ))}
    {/* 食道 */}
    <path d="M 312 356 L 336 356 L 338 488 L 312 488 Z" fill="#dff5ec" stroke={C.line} strokeWidth={1.5} />
    {/* 空気の道（点線） */}
    <path d="M 120 158 C 170 138, 250 130, 300 142 C 318 150, 322 180, 318 230 C 316 262, 306 300, 290 334 L 289 478" fill="none" stroke={C.skyDeep} strokeWidth={2.2} strokeDasharray="6 4" markerEnd="url(#arr)" />
    {/* 食べ物の道（実線） */}
    <path d="M 146 203 C 190 198, 250 196, 290 214 C 318 228, 330 260, 330 300 L 325 478" fill="none" stroke={C.mintDeep} strokeWidth={3.5} markerEnd="url(#arr)" />

    {/* 左側のラベル（顔の前） */}
    <Lead x1={214} y1={130} x2={92} y2={70} text="鼻腔" anchor="end" bold />
    <Lead x1={210} y1={176} x2={92} y2={112} text="硬口蓋" anchor="end" />
    <Lead x1={190} y1={203} x2={92} y2={196} text="口腔" anchor="end" bold />
    <Lead x1={210} y1={240} x2={92} y2={250} text="舌" anchor="end" bold />
    <Lead x1={176} y1={286} x2={92} y2={300} text="下顎骨" anchor="end" />
    <Lead x1={250} y1={312} x2={92} y2={346} text="舌骨" anchor="end" />
    <Lead x1={268} y1={344} x2={92} y2={392} text="喉頭（声帯）" anchor="end" bold />
    <Lead x1={288} y1={440} x2={92} y2={440} text="気管（空気へ）" anchor="end" bold />
    {/* 右側のラベル（首の後ろ） */}
    <Lead x1={300} y1={200} x2={456} y2={176} text="軟口蓋" color={C.pinkDeep} bold />
    <Lead x1={334} y1={236} x2={456} y2={222} text="咽頭" bold />
    <Lead x1={310} y1={284} x2={456} y2={268} text="喉頭蓋" color={C.pinkDeep} bold />
    <Lead x1={325} y1={440} x2={456} y2={440} text="食道（胃へ）" bold />

    {/* 凡例と「嚥下の瞬間」 */}
    <rect x={548} y={20} width={198} height={110} rx={10} fill="#fff" stroke={C.line} />
    <Label x={560} y={40} text="凡例" size={12} bold color={C.ink} />
    <path d="M 560 64 L 598 64" stroke={C.mintDeep} strokeWidth={3.5} />
    <Label x={606} y={64} text="食べ物の道" size={11.5} />
    <path d="M 560 88 L 598 88" stroke={C.skyDeep} strokeWidth={2.2} strokeDasharray="6 4" />
    <Label x={606} y={88} text="空気の道" size={11.5} />
    <path d="M 562 112 L 596 112" stroke={C.pinkDeep} strokeWidth={6} strokeLinecap="round" />
    <Label x={606} y={112} text="嚥下時にフタをする部位" size={11.5} />
    <rect x={548} y={300} width={198} height={148} rx={10} fill="#fffaf0" stroke={C.line} />
    <Label x={560} y={320} text="嚥下の瞬間に起こること" size={12} bold color={C.ink} />
    <Label x={560} y={346} text="① 軟口蓋が上がり鼻をふさぐ" size={11} />
    <Label x={560} y={370} text="② 舌骨・喉頭が上前方へ挙上" size={11} />
    <Label x={560} y={394} text="③ 喉頭蓋が倒れ気道をふさぐ" size={11} />
    <Label x={560} y={418} text="④ 食道の入口が開く" size={11} />
    <Label x={560} y={436} text="※ 道が咽頭で交差します" size={10} />
    <Label x={648} y={480} text="※ 模式図（形・比率は簡略化）" size={10.5} anchor="middle" />
  </Svg>
)

// 舌骨上筋群・舌骨下筋群と喉頭挙上（模式図）
// 左向きの横顔の骨格（下顎骨・頭蓋底・舌骨・甲状軟骨・胸骨）に、舌骨につく筋を帯で重ねる。
const FigMuscles: FC = () => (
  <Svg w={760} h={460} label="左向きの横顔の骨格に、舌骨につく筋を重ねた模式図。舌骨上筋群（オトガイ舌骨筋・顎舌骨筋・顎二腹筋前腹・顎二腹筋後腹・茎突舌骨筋）は下顎骨や頭蓋底から舌骨へ走り、収縮すると舌骨を上前方へ引き上げる。舌骨下筋群の甲状舌骨筋は甲状軟骨を舌骨へ引き寄せ、胸骨舌骨筋は舌骨と胸骨を結ぶ。">
    <g transform="translate(40 0)">
    {/* 皮膚の輪郭 */}
    <path d="M 140 30 C 120 70, 100 110, 92 140 C 84 150, 80 160, 86 168 C 82 186, 84 206, 92 218 C 90 236, 100 254, 110 262 C 150 276, 190 282, 214 296 L 226 430" fill="none" stroke="#d6cbbd" strokeWidth={2} />
    <path d="M 140 30 C 260 6, 380 40, 392 130 C 398 190, 380 250, 372 330 L 368 430" fill="none" stroke="#d6cbbd" strokeWidth={2} />
    {/* 頭蓋底・乳様突起・茎状突起 */}
    <path d="M 220 118 C 260 108, 330 108, 360 124 L 352 150 C 330 140, 280 138, 236 142 Z" fill="#efe9e1" stroke="#c9bdae" />
    <path d="M 340 140 C 348 160, 346 176, 336 184 C 326 176, 326 158, 330 142 Z" fill="#efe9e1" stroke="#c9bdae" />
    <path d="M 300 142 L 286 196" fill="none" stroke="#c9bdae" strokeWidth={4} strokeLinecap="round" />
    {/* 下顎骨（体部・下顎角・下顎枝） */}
    <path d="M 108 228 C 106 244, 112 258, 126 262 L 236 252 C 250 250, 258 240, 262 226 L 270 150 L 254 150 L 244 222 C 240 232, 234 236, 224 237 L 128 244 C 120 244, 116 238, 116 228 Z" fill="#efe9e1" stroke="#c9bdae" />
    {/* 舌骨 */}
    <ellipse cx={200} cy={300} rx={18} ry={8} fill={C.lemon} stroke="#c9b45a" />
    {/* 甲状軟骨・気管 */}
    <path d="M 180 322 L 226 322 L 222 372 L 190 372 C 182 356, 178 338, 180 322 Z" fill={C.sky} stroke={C.line} />
    <path d="M 192 372 L 220 372 L 220 410 L 194 410 Z" fill="#fff" stroke={C.line} />
    {/* 胸骨（上端） */}
    <path d="M 168 414 L 250 414 L 246 430 L 172 430 Z" fill="#efe9e1" stroke="#c9bdae" />

    {/* 舌骨上筋群（ピンクの帯） */}
    <path d="M 124 252 L 190 296" fill="none" stroke={C.pinkDeep} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
    <path d="M 132 244 C 160 262, 190 280, 210 294" fill="none" stroke="#f0a3b6" strokeWidth={9} strokeLinecap="round" opacity={0.7} />
    <path d="M 214 298 L 334 180" fill="none" stroke={C.pinkDeep} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
    <path d="M 286 196 L 212 294" fill="none" stroke="#f0a3b6" strokeWidth={4} strokeLinecap="round" />
    {/* 舌骨下筋群（ミントの帯） */}
    <path d="M 206 306 L 208 330" fill="none" stroke={C.mintDeep} strokeWidth={7} strokeLinecap="round" />
    <path d="M 190 306 C 176 340, 174 380, 186 414" fill="none" stroke="#7fcdb5" strokeWidth={6} strokeLinecap="round" />
    {/* 挙上の向き */}
    <Arrow d="M 236 318 L 196 268" color={C.peachDeep} />
    <Label x={242} y={318} text="嚥下時に上前方へ" size={11.5} color={C.peachDeep} bold />

    {/* ラベル */}
    <Lead x1={150} y1={262} x2={44} y2={300} text="オトガイ舌骨筋" anchor="end" size={10.5} />
    <Lead x1={160} y1={258} x2={44} y2={232} text="顎舌骨筋" anchor="end" size={10.5} />
    <Lead x1={300} y1={214} x2={420} y2={226} text="顎二腹筋後腹" size={11} />
    <Lead x1={252} y1={248} x2={420} y2={252} text="茎突舌骨筋" size={11} />
    <Lead x1={300} y1={168} x2={420} y2={196} text="茎状突起・乳様突起（頭蓋底）" size={10.5} color={C.soft} />
    <Lead x1={250} y1={190} x2={420} y2={150} text="下顎骨" size={11} color={C.soft} />
    <Lead x1={218} y1={300} x2={420} y2={286} text="舌骨" size={11} bold />
    <Lead x1={208} y1={320} x2={420} y2={346} text="甲状舌骨筋" size={11} />
    <Lead x1={222} y1={350} x2={420} y2={372} text="甲状軟骨（喉頭）" size={11} />
    <Lead x1={180} y1={392} x2={44} y2={392} text="胸骨舌骨筋" anchor="end" size={10.5} />

    </g>

    {/* 凡例（支配神経） */}
    <rect x={530} y={20} width={216} height={102} rx={10} fill="#fff" stroke={C.line} />
    <path d="M 542 42 L 570 42" stroke={C.pinkDeep} strokeWidth={5} strokeLinecap="round" />
    <Label x={578} y={42} text="舌骨上筋群（舌骨を上げる）" size={11} color={C.ink} bold />
    <Label x={542} y={66} text="顎舌骨筋・顎二腹筋前腹 … 三叉神経" size={10} />
    <Label x={542} y={86} text="顎二腹筋後腹・茎突舌骨筋 … 顔面神経" size={10} />
    <Label x={542} y={106} text="オトガイ舌骨筋 … 舌下神経" size={10} />
    <rect x={566} y={352} width={180} height={80} rx={10} fill="#fff" stroke={C.line} />
    <path d="M 578 372 L 606 372" stroke={C.mintDeep} strokeWidth={5} strokeLinecap="round" />
    <Label x={614} y={372} text="舌骨下筋群" size={11} color={C.ink} bold />
    <Label x={578} y={396} text="甲状舌骨筋 … 甲状軟骨を舌骨へ" size={10} />
    <Label x={578} y={416} text="胸骨舌骨筋 … 舌骨と胸骨を結ぶ" size={10} />
    <Label x={746} y={450} text="※ 模式図。筋の走行・本数は簡略化" size={10} anchor="end" />
  </Svg>
)

// 5期モデル
const FigStages: FC = () => {
  const stages = [
    { name: '先行期', body: ['食べ物を認識し', '口へ運ぶ'], watch: ['食べ始めない', '意欲・認知'], f: C.lavender },
    { name: '準備期', body: ['咀嚼して', '食塊を作る'], watch: ['噛めない・', '義歯の適合'], f: C.peach },
    { name: '口腔期', body: ['舌で食塊を', '咽頭へ送る'], watch: ['送り込みの', 'ぎこちなさ'], f: C.lemon },
    { name: '咽頭期', body: ['嚥下反射で', '食道入口へ'], watch: ['むせ・残留', '喉頭挙上'], f: C.mint },
    { name: '食道期', body: ['蠕動と重力で', '胃へ送る'], watch: ['逆流・つかえ感'], f: C.sky },
  ]
  return (
    <Svg w={760} h={300} label="摂食嚥下の5期モデル。先行期、準備期、口腔期、咽頭期、食道期を左から右へ並べ、各期で起きることと観察のポイントを示す。">
      {stages.map((s, i) => {
        const x = 20 + i * 148
        return (
          <g key={s.name}>
            <Box x={x} y={30} w={128} h={44} fill={s.f} lines={s.name} size={14} bold />
            <Box x={x} y={90} w={128} h={64} fill="#fff" lines={s.body} size={12} />
            <Box x={x} y={176} w={128} h={64} fill="#fffaf0" lines={s.watch} size={11.5} dashed />
          </g>
        )
      })}
      {stages.slice(1).map((_, i) => (
        <Arrow key={i} d={`M${148 + i * 148} 52 L${166 + i * 148} 52`} />
      ))}
      <Label x={20} y={84} text="体で起きていること" size={10.5} />
      <Label x={20} y={170} text="見ておきたいポイント" size={10.5} />
      <path d="M 20 258 L 460 258" stroke={C.pinkDeep} strokeWidth={3} />
      <Label x={240} y={274} text="義歯の定着確認で特に関わる期（本文参照）" size={11} anchor="middle" color={C.pinkDeep} />
      <path d="M 464 258 L 740 258" stroke={C.mintDeep} strokeWidth={3} />
      <Label x={602} y={274} text="嚥下反射・蠕動による動き" size={11} anchor="middle" color={C.mintDeep} />
      <Label x={380} y={292} text="※ 模式図。時間の長さは実際の比率ではありません。" size={10.5} anchor="middle" />
    </Svg>
  )
}

// 4期モデルとプロセスモデルの比較
const FigProcess: FC = () => (
  <Svg w={760} h={330} label="液体を飲む4期モデルと固形物を食べるプロセスモデルを上下に並べた比較図。プロセスモデルでは咀嚼と咽頭への送り込みが時間的に重なる。">
    <Label x={20} y={28} text="飲む：4期モデル（液体）" size={13} bold color={C.ink} />
    <Box x={20} y={42} w={150} h={40} fill={C.peach} lines="口腔準備期" size={12} />
    <Box x={180} y={42} w={150} h={40} fill={C.lemon} lines="口腔送り込み期" size={12} />
    <Box x={340} y={42} w={150} h={40} fill={C.mint} lines="咽頭期（反射）" size={12} />
    <Box x={500} y={42} w={150} h={40} fill={C.sky} lines="食道期" size={12} />
    <Arrow d="M 330 62 L 340 62" />
    <Label x={415} y={98} text="咽頭に入るとすぐ嚥下反射" size={11} anchor="middle" color={C.mintDeep} />

    <Label x={20} y={140} text="食べる：プロセスモデル（固形物）" size={13} bold color={C.ink} />
    <Box x={20} y={154} w={140} h={40} fill={C.lavender} lines={['Stage I transport', '舌で臼歯部へ運ぶ']} size={10.5} />
    <Box x={170} y={154} w={300} h={40} fill={C.peach} lines={['processing（咀嚼・食塊形成）']} size={12} />
    <Box x={300} y={204} w={250} h={40} fill={C.lemon} lines={['Stage II transport', '噛みながら中咽頭へ送る']} size={10.5} />
    <Box x={560} y={204} w={90} h={40} fill={C.mint} lines={['咽頭期']} size={12} />
    <Box x={660} y={204} w={80} h={40} fill={C.sky} lines={['食道期']} size={12} />
    {/* オーバーラップの強調 */}
    <rect x={300} y={150} width={170} height={98} rx={8} fill="none" stroke={C.pinkDeep} strokeWidth={2} strokeDasharray="6 4" />
    <Label x={385} y={266} text="噛むことと送り込みが重なる" size={11} anchor="middle" color={C.pinkDeep} bold />
    <Label x={385} y={284} text="→ 中咽頭に食塊がたまっても、すぐには嚥下反射が起きない" size={11} anchor="middle" color={C.pinkDeep} />
    <Arrow d="M 20 300 L 740 300" />
    <Label x={380} y={318} text="時間の流れ →（模式図。長さは実際の比率ではありません）" size={10.5} anchor="middle" />
  </Svg>
)

// 加齢による喉頭位置の変化
const FigAging: FC = () => {
  const spine = (x: number, from: number) =>
    [0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={x} y={60 + i * 44} width={50} height={36} rx={6} fill="#fff" stroke={C.line} strokeWidth={1.5} />
        <Label x={x + 25} y={78 + i * 44} text={`C${from + i}`} size={11} anchor="middle" />
      </g>
    ))
  return (
    <Svg w={760} h={360} label="若年成人と高齢者の喉頭位置を並べた模式図。高齢者では舌骨と喉頭が1〜2椎体下がり、嚥下時に持ち上げる距離が長くなる。">
      <Label x={190} y={30} text="若年成人" size={14} anchor="middle" bold color={C.ink} />
      <Label x={560} y={30} text="高齢者" size={14} anchor="middle" bold color={C.ink} />
      {spine(100, 2)}
      {spine(470, 2)}
      {/* 若年: 舌骨 C3付近、喉頭 C4-6 */}
      <rect x={180} y={108} width={60} height={14} rx={6} fill={C.peach} stroke={C.line} />
      <Label x={250} y={115} text="舌骨" size={11} />
      <path d="M 185 150 L 235 150 L 228 240 L 192 240 Z" fill={C.sky} stroke={C.line} strokeWidth={1.5} />
      <Label x={212} y={256} text="喉頭（C4〜6）" size={11} anchor="middle" />
      {/* 高齢: 1〜2椎体下 */}
      <rect x={550} y={172} width={60} height={14} rx={6} fill={C.peach} stroke={C.line} />
      <Label x={620} y={179} text="舌骨" size={11} />
      <path d="M 555 214 L 605 214 L 598 304 L 562 304 Z" fill={C.sky} stroke={C.line} strokeWidth={1.5} />
      <Label x={620} y={259} text="喉頭（1〜2椎体 下降）" size={11} />
      {/* 挙上距離 */}
      <Arrow d="M 300 240 L 300 160" color={C.mintDeep} />
      <Label x={312} y={200} text="嚥下時の挙上距離" size={11} color={C.mintDeep} />
      <Arrow d="M 670 304 L 670 170" color={C.pinkDeep} />
      <Label x={680} y={320} text="挙上距離" size={11} color={C.pinkDeep} bold />
      <Label x={380} y={345} text="※ 模式図。椎体の番号は目安で個人差があります。" size={11} anchor="middle" />
    </Svg>
  )
}

// 誤嚥から誤嚥性肺炎への連鎖とSTの介入点
const FigAspirationChain: FC = () => {
  const chain = [
    { t: ['口腔内の', '細菌が増える'], f: C.peach },
    { t: ['唾液・食物を', '誤嚥する'], f: C.lemon },
    { t: ['咳で排出', 'できない'], f: C.lavender },
    { t: ['細菌が肺へ', '到達する'], f: C.sky },
    { t: ['誤嚥性肺炎'], f: C.pink },
  ]
  const interv = [['口腔ケア', '義歯の清掃'], ['嚥下訓練', '食形態・姿勢の調整'], ['呼吸・咳嗽訓練', '離床・体力維持'], ['早期発見', '（発熱・元気のなさ）']]
  return (
    <Svg w={760} h={260} label="口腔内細菌の増加、誤嚥、排出困難、肺への到達、誤嚥性肺炎という連鎖と、各段階でSTが介入できるポイントを示す概念図。">
      {chain.map((c, i) => (
        <Box key={i} x={20 + i * 148} y={30} w={128} h={60} fill={c.f} lines={c.t} size={12} bold={i === 4} />
      ))}
      {chain.slice(1).map((_, i) => (
        <Arrow key={i} d={`M${148 + i * 148} 60 L${166 + i * 148} 60`} />
      ))}
      {interv.map((t, i) => (
        <g key={i}>
          <Arrow d={`M${84 + i * 148} 150 L${84 + i * 148} 96`} color={C.mintDeep} />
          <Box x={20 + i * 148} y={154} w={128} h={56} fill="#eafaf3" lines={t} size={11} />
        </g>
      ))}
      <Label x={20} y={130} text="STが介入できるポイント" size={11} color={C.mintDeep} bold />
      <Label x={380} y={240} text="※ 概念図。日本呼吸器学会の解説をもとに教材用に整理したものです。" size={10.5} anchor="middle" />
    </Svg>
  )
}

export const figuresCh01: Record<string, FC> = {
  'ch01-sagittal': FigSagittal,
  'ch01-muscles': FigMuscles,
  'ch01-stages': FigStages,
  'ch01-process': FigProcess,
  'ch01-aging': FigAging,
  'ch01-aspiration-chain': FigAspirationChain,
}
