import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 体幹角度（水平面基準）と頸部前屈の模式図
// 90度は椅子に座った姿、60度・30度はリクライニングベッドの背を起こした姿を横から描く（顔は右向き）。
const Panel = ({ x, deg, title, note }: { x: number; deg: number; title: string; note: string }) => {
  const chair = deg === 90
  const hx = x + (chair ? 110 : 132) // 股関節
  const hy = 176
  const floorY = 228
  const rad = (deg * Math.PI) / 180
  const u = [-Math.cos(rad), -Math.sin(rad)] // 体幹の向き（頭側）
  const f = [Math.sin(rad), -Math.cos(rad)] // 体の前側
  const pt = (bx: number, by: number, k: number, v = u) => [bx + v[0] * k, by + v[1] * k]
  const [sx, sy] = pt(hx, hy, 74) // 肩
  // 頭: 首を軽く前屈させるため、体幹の延長より少し前側に置く
  const [nx, ny] = pt(sx, sy, 14)
  const hcx = nx + u[0] * 14 + f[0] * 7
  const hcy = ny + u[1] * 14 + f[1] * 7
  const [bx0, by0] = [hx - 6 * f[0], hy + 10]
  const [bx1, by1] = pt(hx - 10 * f[0], hy + 10 - 10 * f[1], 118) // 背もたれの先端
  const body = { stroke: C.skyDeep, strokeWidth: 12, strokeLinecap: 'round' as const, fill: 'none' }
  return (
    <g>
      <Label x={x + 115} y={26} text={title} size={13} anchor="middle" bold color={C.ink} />
      {/* 床 */}
      <line x1={x + 6} y1={floorY} x2={x + 236} y2={floorY} stroke={C.line} strokeWidth={3} />
      {chair ? (
        <g stroke="#c9bdae" strokeWidth={5} strokeLinecap="round" fill="none">
          {/* 椅子 */}
          <path d={`M${hx - 14} ${hy + 10} L${hx + 62} ${hy + 10}`} />
          <path d={`M${hx - 14} ${hy + 10} L${hx - 14} ${hy - 96}`} />
          <path d={`M${hx - 10} ${hy + 10} L${hx - 10} ${floorY}`} strokeWidth={4} />
          <path d={`M${hx + 56} ${hy + 10} L${hx + 56} ${floorY}`} strokeWidth={4} />
        </g>
      ) : (
        <g>
          {/* リクライニングベッド */}
          <rect x={x + 14} y={hy + 10} width={216} height={14} rx={5} fill="#efe9e1" stroke="#c9bdae" />
          <line x1={bx0} y1={by0} x2={bx1} y2={by1} stroke="#c9bdae" strokeWidth={9} strokeLinecap="round" />
          <line x1={x + 24} y1={hy + 24} x2={x + 24} y2={floorY} stroke="#c9bdae" strokeWidth={4} />
          <line x1={x + 220} y1={hy + 24} x2={x + 220} y2={floorY} stroke="#c9bdae" strokeWidth={4} />
        </g>
      )}
      {/* 体（股関節→肩→首）と脚 */}
      <path d={`M${hx} ${hy} L${sx} ${sy} L${nx} ${ny}`} {...body} />
      {chair ? (
        <path d={`M${hx} ${hy} L${hx + 62} ${hy} L${hx + 66} ${floorY - 6} L${hx + 86} ${floorY - 6}`} {...body} strokeWidth={10} />
      ) : (
        <path d={`M${hx} ${hy} L${hx + 50} ${hy - 12} L${hx + 96} ${hy}`} {...body} strokeWidth={10} />
      )}
      {/* 頭（右向きの横顔: 鼻の小さな突起で向きを示す） */}
      <circle cx={hcx} cy={hcy} r={15} fill={C.peach} stroke={C.peachDeep} strokeWidth={1.5} />
      <circle cx={hcx + f[0] * 6 + u[0] * 3} cy={hcy + f[1] * 6 + u[1] * 3} r={1.8} fill={C.ink} />
      <path d={`M${hcx + f[0] * 14 + u[0] * 2} ${hcy + f[1] * 14 + u[1] * 2} L${hcx + f[0] * 19 - u[0] * 2} ${hcy + f[1] * 19 - u[1] * 2} L${hcx + f[0] * 13 - u[0] * 4} ${hcy + f[1] * 13 - u[1] * 4}`} fill={C.peach} stroke={C.peachDeep} strokeWidth={1.5} strokeLinejoin="round" />
      {/* 角度（水平線からの体幹の角度） */}
      <line x1={hx - 62} y1={hy} x2={hx} y2={hy} stroke={C.pinkDeep} strokeWidth={1.5} strokeDasharray="4 3" />
      <path d={`M${hx - 40} ${hy} A40 40 0 0 1 ${hx + u[0] * 40} ${hy + u[1] * 40}`} fill="none" stroke={C.pinkDeep} strokeWidth={2} />
      <Label x={hx - 44 - (deg < 45 ? 26 : 8)} y={hy - (deg < 45 ? 12 : 30)} text={`${deg}°`} size={13} anchor="end" color={C.pinkDeep} bold />
      <Label x={x + 115} y={floorY + 18} text={note} size={11} anchor="middle" />
    </g>
  )
}

const FigPosture: FC = () => {
  return (
    <Svg w={760} h={310} label="体幹角度90度、60度、30度の3つの姿勢を横から見た模式図。90度は椅子に座り足底を床につけた姿、60度と30度はリクライニングベッドの背を起こした姿で、角度は水平線を基準に体幹がどれだけ起きているかを表す。いずれも首は軽く前に曲げ、顎を引きすぎないことを注記している。">
      <Panel x={10} deg={90} title="体幹角度 90度（座位）" note="普段の食事姿勢。足底を床につける" />
      <Panel x={265} deg={60} title="体幹角度 60度" note="送り込みが弱いときの候補" />
      <Panel x={520} deg={30} title="体幹角度 30度（30度仰臥位）" note="重度例で検討。液体は流れ込みに注意" />
      <Label x={380} y={274} text="角度は水平（床面と平行な線）を基準に体幹を何度起こしているか。「垂直から30度倒す」ではありません。" size={11} anchor="middle" color={C.ink} />
      <Label x={380} y={294} text="頸部は軽く前屈（おへそを覗き込む程度）。枕で頸部が伸展しないように。顎を胸骨につけるほど引くと喉頭挙上を妨げます。" size={11} anchor="middle" />
    </Svg>
  )
}

// 直接訓練の開始・中断の判断フロー
const FigStartStop: FC = () => {
  return (
    <Svg w={760} h={440} label="直接訓練の開始から中断までの判断フロー。経口摂取開始の前提条件を満たすか確認し、満たさなければ状態の安定を待って再評価、満たせばスクリーニング検査と医師・歯科医師の判断を経て直接訓練を開始する。訓練中に中断のサインがあれば一旦中断して多職種で検討し、落ち着いたら再評価して再開を検討する。">
      <Box x={230} y={14} w={300} h={78} fill={C.lemon} lines={['経口摂取開始の前提条件', '意識 JCS 1桁／全身状態・呼吸状態が安定', '唾液・少量の水で嚥下反射あり／口腔が清潔・湿潤']} size={11} bold />
      <Arrow d="M380 92 L380 118" />
      <Box x={290} y={118} w={180} h={40} fill="#fff" lines="すべて満たす？" size={12} bold />
      {/* いいえ */}
      <Arrow d="M290 138 L120 138 L120 170" />
      <Label x={200} y={128} text="いいえ" size={11} anchor="middle" color={C.pinkDeep} bold />
      <Box x={20} y={170} w={200} h={56} fill={C.peach} lines={['状態が安定するのを待ち', '再評価する']} size={12} />
      <Arrow d="M120 226 L120 250 L240 250 L240 138" dashed />
      {/* はい */}
      <Arrow d="M470 138 L560 138 L560 170" />
      <Label x={515} y={128} text="はい" size={11} anchor="middle" color={C.mintDeep} bold />
      <Box x={450} y={170} w={290} h={56} fill={C.sky} lines={['スクリーニング検査・精査を行い', '医師・歯科医師が訓練可能と判断']} size={12} />
      <Arrow d="M595 226 L595 256" />
      <Box x={450} y={256} w={290} h={44} fill={C.mint} lines="直接訓練を開始（歯科医師の指示に沿って）" size={12} bold />
      <Arrow d="M595 300 L595 330" />
      <Box x={420} y={330} w={320} h={60} fill="#fff" lines={['中断のサインは？', '頻回なむせ・湿性嗄声／発熱／痰の増加', '炎症反応／意識・全身状態の悪化']} size={11} />
      <Arrow d="M420 360 L220 360 L220 330" />
      <Label x={370} y={372} text="ある" size={11} anchor="middle" color={C.pinkDeep} bold />
      <Box x={20} y={300} w={300} h={52} fill={C.peach} lines={['一旦中断し、多職種で検討', '落ち着き次第、再評価して再開を検討']} size={12} />
      <Arrow d="M740 360 L752 360 L752 278 L740 278" dashed />
      <Label x={700} y={410} text="ない → 継続・段階的に進める" size={11} anchor="end" color={C.mintDeep} bold />
      <Label x={20} y={410} text="※ 前提条件・中断基準は日本離床学会資料の表1（引用文献由来）。学会の統一基準ではありません。" size={10} anchor="start" />
      <Label x={20} y={426} text="※ 同資料では、すでに経口摂取中でむせや咀嚼困難などの問題がある人も直接訓練の適応としています。" size={10} anchor="start" />
    </Svg>
  )
}

// 窒息時の対応フロー
const FigChoking: FC = () => {
  return (
    <Svg w={760} h={400} label="窒息時の対応フロー。窒息のサインに気づいたら、声が出せず強い咳もできなければ窒息と判断し、大声で助けを呼んで119番通報を依頼する。反応がある間は背部叩打法を行い、効果がなければ腹部突き上げ法を行う。妊婦、高度な肥満者、乳児には腹部突き上げを行わず背部叩打のみ。反応がなくなったら心肺蘇生を開始し、まだなら119番通報とAEDを依頼する。異物が取れても医師の診察を受ける。">
      <Box x={230} y={12} w={300} h={56} fill={C.lemon} lines={['窒息のサインに気づく', '苦しそう・声が出ない・喉をつかむ仕草']} size={12} bold />
      <Arrow d="M380 68 L380 92" />
      <Box x={200} y={92} w={360} h={44} fill="#fff" lines="「喉が詰まったの？」声が出せず強い咳もできない → 窒息と判断" size={11} />
      <Arrow d="M380 136 L380 160" />
      <Box x={200} y={160} w={360} h={44} fill={C.sky} lines="大声で助けを呼び、119番通報を依頼（1人なら異物除去を優先）" size={11} />
      <Arrow d="M380 204 L380 228" />
      <Box x={60} y={228} w={300} h={56} fill={C.mint} lines={['① 背部叩打法', '肩甲骨の間を手掌基部で数回以上力強く叩く']} size={11} bold />
      <Arrow d="M360 256 L400 256" />
      <Label x={380} y={244} text="効果なし" size={10} anchor="middle" color={C.pinkDeep} />
      <Box x={400} y={228} w={340} h={56} fill={C.mint} lines={['② 腹部突き上げ法', 'へその少し上に握りこぶし、手前上方へ突き上げる']} size={11} bold />
      <Arrow d="M570 284 C 570 300, 210 300, 210 284" dashed />
      <Label x={390} y={306} text="異物が取れるか、反応がなくなるまで ①②を繰り返す" size={11} anchor="middle" />
      <Box x={400} y={318} w={340} h={40} fill={C.peach} lines="妊婦・高度な肥満者・乳児には②を行わず、①のみ" size={11} />
      <Box x={60} y={318} w={300} h={40} fill={C.pink} lines="反応がなくなったら → 心肺蘇生を開始、119番・AED" size={11} bold />
      <Label x={380} y={382} text="※ 異物が取れた後も、腹部の内臓を傷めている可能性があるため必ず医師の診察を受けます（救急蘇生法の指針2020 市民用）。" size={10} anchor="middle" />
    </Svg>
  )
}

export const figuresCh10: Record<string, FC> = {
  'ch10-posture': FigPosture,
  'ch10-start-stop': FigStartStop,
  'ch10-choking': FigChoking,
}
