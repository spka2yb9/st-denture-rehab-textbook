import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 総義歯と部分床義歯の構造
const Structure: FC = () => (
  <Svg w={760} h={420} label="左に上顎の総義歯、右に下顎の部分床義歯を粘膜面側から見た模式図。総義歯は義歯床と人工歯からなり、床縁と床後縁、粘膜面と研磨面を示す。部分床義歯には残存歯にかけるクラスプ、レスト、左右をつなぐ大連結子がある。">
    {/* 総義歯 */}
    <Label x={190} y={22} text="上顎 総義歯（FD）" size={13} anchor="middle" bold color={C.ink} />
    <path d="M70 320 Q70 70 190 58 Q310 70 310 320 Q190 350 70 320 Z" fill={C.pink} stroke={C.pinkDeep} strokeWidth={2} />
    {/* 人工歯 */}
    <path d="M90 310 Q90 90 190 80 Q290 90 290 310" fill="none" stroke="#fff" strokeWidth={22} strokeLinecap="round" />
    <path d="M90 310 Q90 90 190 80 Q290 90 290 310" fill="none" stroke={C.line} strokeWidth={1} strokeDasharray="10 4" />
    <Label x={190} y={190} text="義歯床" size={13} anchor="middle" bold color={C.ink} />
    <Label x={190} y={212} text="（口蓋を覆うピンクの土台）" size={10} anchor="middle" />
    <line x1={290} y1={150} x2={340} y2={120} stroke={C.soft} />
    <Label x={344} y={120} text="人工歯" size={12} color={C.ink} bold />
    <line x1={70} y1={200} x2={40} y2={240} stroke={C.soft} />
    <Label x={10} y={255} text="床縁（ふち）" size={11} color={C.ink} />
    <line x1={190} y1={345} x2={190} y2={372} stroke={C.soft} />
    <Label x={190} y={385} text="床後縁（軟口蓋との境目付近）" size={11} anchor="middle" color={C.ink} />
    <Label x={40} y={405} text="粘膜面：顎堤に接する側 ／ 研磨面：舌・頬に接する外側" size={10} />
    {/* 部分床義歯 */}
    <Label x={560} y={22} text="下顎 部分床義歯（PD）" size={13} anchor="middle" bold color={C.ink} />
    {/* 残存歯（前歯〜犬歯） */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={508 + i * 18} y={70} width={16} height={26} rx={5} fill="#fff" stroke={C.line} />
    ))}
    <Label x={560} y={58} text="残っている歯（前歯）" size={10} anchor="middle" />
    {/* 支台歯 */}
    <rect x={470} y={120} width={20} height={28} rx={6} fill="#fff" stroke={C.ink} strokeWidth={1.5} />
    <rect x={630} y={120} width={20} height={28} rx={6} fill="#fff" stroke={C.ink} strokeWidth={1.5} />
    {/* 義歯床 左右 */}
    <path d="M450 160 L450 300 Q470 320 495 300 L495 160 Z" fill={C.pink} stroke={C.pinkDeep} strokeWidth={2} />
    <path d="M625 160 L625 300 Q650 320 670 300 L670 160 Z" fill={C.pink} stroke={C.pinkDeep} strokeWidth={2} />
    {/* 人工歯 */}
    {[0, 1, 2].map((i) => (
      <rect key={`l${i}`} x={455} y={168 + i * 40} width={34} height={30} rx={5} fill="#fff" stroke={C.line} />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={`r${i}`} x={631} y={168 + i * 40} width={34} height={30} rx={5} fill="#fff" stroke={C.line} />
    ))}
    {/* 大連結子（リンガルバー） */}
    <path d="M495 240 Q560 290 625 240" fill="none" stroke="#8c8c96" strokeWidth={9} strokeLinecap="round" />
    {/* クラスプ */}
    <path d="M495 140 Q480 110 466 128" fill="none" stroke="#8c8c96" strokeWidth={4} strokeLinecap="round" />
    <path d="M625 140 Q640 110 654 128" fill="none" stroke="#8c8c96" strokeWidth={4} strokeLinecap="round" />
    {/* レスト */}
    <rect x={476} y={116} width={10} height={6} rx={2} fill="#8c8c96" />
    <rect x={634} y={116} width={10} height={6} rx={2} fill="#8c8c96" />
    <line x1={466} y1={125} x2={430} y2={105} stroke={C.soft} />
    <Label x={428} y={98} text="クラスプ（バネ）" size={11} anchor="end" color={C.ink} bold />
    <line x1={644} y1={116} x2={690} y2={100} stroke={C.soft} />
    <Label x={692} y={98} text="レスト" size={11} color={C.ink} bold />
    <Label x={690} y={113} text="（歯に乗る）" size={10} />
    <line x1={560} y1={268} x2={560} y2={330} stroke={C.soft} />
    <Label x={560} y={345} text="大連結子（左右の床をつなぐバー）" size={11} anchor="middle" color={C.ink} bold />
    <Label x={560} y={362} text="舌が触れるため発音に影響しやすい" size={10} anchor="middle" />
    <line x1={670} y1={230} x2={712} y2={230} stroke={C.soft} />
    <Label x={714} y={230} text="義歯床" size={11} color={C.ink} />
    <Label x={420} y={405} text="※ 形は症例ごとに大きく異なる模式図" size={10} />
  </Svg>
)

// 製作フローとSTの関与
const Flow: FC = () => {
  const steps = ['概形印象', '個人トレー\n精密印象', '咬合採得', '人工歯排列\nろう義歯試適', '完成\n装着', '調整\n（1〜3週）', '定着・維持\n（2〜3か月〜）']
  const w = 96
  const gap = 10
  const x0 = 14
  return (
    <Svg w={760} h={346} label="義歯製作の流れを左から右へ、概形印象、個人トレーと精密印象、咬合採得、人工歯排列とろう義歯試適、完成・装着、調整、定着・維持の順に示す。下段にSTが関わるタイミングを帯で示し、装着前評価、試適時の発音確認、装着後の評価と訓練、歯科医師への報告がある。">
      <Label x={14} y={22} text="歯科医師・歯科技工士の工程" size={13} bold color={C.ink} />
      {steps.map((s, i) => (
        <Box key={i} x={x0 + i * (w + gap)} y={40} w={w} h={60} fill={i >= 4 ? C.sky : '#fff'} lines={s.split('\n')} size={12} bold={i >= 4} />
      ))}
      {steps.slice(1).map((_, i) => (
        <Arrow key={i} d={`M${x0 + (i + 1) * (w + gap) - gap + 1} 70 L${x0 + (i + 1) * (w + gap) - 1} 70`} />
      ))}
      <Label x={14} y={140} text="STが関わるタイミング" size={13} bold color={C.mintDeep} />
      {/* 装着前評価 */}
      <rect x={x0} y={158} width={w * 2 + gap} height={40} rx={10} fill={C.mint} />
      <Label x={x0 + w + gap / 2} y={172} text="装着前の評価" size={12} anchor="middle" bold color={C.ink} />
      <Label x={x0 + w + gap / 2} y={189} text="口腔・嚥下機能、義歯使用歴の聴取" size={10} anchor="middle" color={C.ink} />
      {/* 試適での発音確認 */}
      <rect x={x0 + 3 * (w + gap)} y={158} width={w} height={40} rx={10} fill={C.lemon} />
      <Label x={x0 + 3 * (w + gap) + w / 2} y={172} text="試適に同席" size={12} anchor="middle" bold color={C.ink} />
      <Label x={x0 + 3 * (w + gap) + w / 2} y={189} text="発音の確認" size={10} anchor="middle" color={C.ink} />
      {/* 装着後 */}
      <rect x={x0 + 4 * (w + gap)} y={158} width={w * 3 + gap * 2} height={54} rx={10} fill={C.mint} stroke={C.mintDeep} strokeWidth={2} />
      <Label x={x0 + 4 * (w + gap) + (w * 3 + gap * 2) / 2} y={172} text="定着確認と訓練（主な関わり）" size={12} anchor="middle" bold color={C.ink} />
      <Label x={x0 + 4 * (w + gap) + (w * 3 + gap * 2) / 2} y={188} text="噛める・飲み込める・話せる の評価" size={10} anchor="middle" color={C.ink} />
      <Label x={x0 + 4 * (w + gap) + (w * 3 + gap * 2) / 2} y={202} text="間接・直接訓練、取り扱い指導" size={10} anchor="middle" color={C.ink} />
      {/* 報告ループ */}
      <Arrow d={`M${x0 + 5.5 * (w + gap)} 214 C ${x0 + 5.5 * (w + gap)} 260, ${x0 + 5.5 * (w + gap) - 60} 260, ${x0 + 5.5 * (w + gap) - 60} 230`} color={C.pinkDeep} />
      <rect x={x0 + 4 * (w + gap)} y={228} width={w * 3 + gap * 2} height={40} rx={10} fill={C.pink} />
      <Label x={x0 + 4 * (w + gap) + (w * 3 + gap * 2) / 2} y={242} text="不適合サインを歯科医師へ報告" size={12} anchor="middle" bold color={C.ink} />
      <Label x={x0 + 4 * (w + gap) + (w * 3 + gap * 2) / 2} y={259} text="→ 歯科医師が調整・リライン・再製作を判断" size={10} anchor="middle" color={C.ink} />
      <Arrow d={`M${x0 + 4 * (w + gap)} 248 C ${x0 + 4 * (w + gap) - 40} 248, ${x0 + 5 * (w + gap) + 30} 120, ${x0 + 5 * (w + gap) + 30} 102`} color={C.pinkDeep} dashed />
      <Label x={14} y={300} text="※ 工程の名称・順序は一般的なもの（ろう義歯の試適などはガイドライン本文に記載のない一般的な工程）。" size={10} />
      <Label x={14} y={316} text="※ 調整を要した義歯の割合（1週後87%・2週後50%・3週後7%）は、ガイドラインが引用する報告の一つ。" size={10} />
      <Label x={14} y={332} text="※ 順応の目安 2〜3か月（日本歯科医学会）。模式図であり、医院・症例で異なる。" size={10} />
    </Svg>
  )
}

// 不適合サインと報告の流れ
// 義歯装着後の症状と原因・対応（日本補綴歯科学会GL 図3を表の形に再構成）
const Signs: FC = () => {
  const symptoms = [['義歯の', '離脱・疼痛'], ['嘔吐感・', '嚥下時痛'], ['発語障害'], ['咬頬・咬舌']]
  // marks: 症状の列ごとに ●（true）または短い条件（文字列）
  const rows: { cause: string; marks: (boolean | string)[]; fix: string[] }[] = [
    { cause: '床辺縁の形態・長さ（不正）', marks: [true, false, false, false], fix: ['調整'] },
    { cause: '床後縁（長い・厚い）', marks: [false, true, false, false], fix: ['調整'] },
    { cause: '床粘膜面の適合不良', marks: [true, false, false, false], fix: ['軽度：リライン', '重度：新義歯製作'] },
    { cause: '人工歯の排列位置（不正）', marks: [true, false, true, true], fix: ['リマウント・修正'] },
    { cause: '咬合高径', marks: [false, false, '高い', '低い'], fix: ['咬合面再構成', 'リマウント・修正'] },
    { cause: '咬合接触の不良', marks: [true, true, true, true], fix: ['軽度：調整', '重度：咬合面再構成'] },
    { cause: '下顎位の不良', marks: [true, true, true, true], fix: ['軽度：リマウント・修正', '重度：治療義歯'] },
  ]
  const colX = (j: number) => 262 + j * 86
  const rowY = (i: number) => 92 + i * 40
  return (
    <Svg w={760} h={452} label="義歯装着後の症状と原因・対応の表。列は症状（義歯の離脱・疼痛、嘔吐感・嚥下時痛、発語障害、咬頬・咬舌）、行は原因。床辺縁の形態・長さの不正は離脱・疼痛、床後縁が長い・厚いと嘔吐感・嚥下時痛、床粘膜面の適合不良は離脱・疼痛、人工歯の排列位置の不正は離脱・疼痛・発語障害・咬頬咬舌、咬合高径は高いと発語障害・低いと咬頬咬舌、咬合接触の不良と下顎位の不良はすべての症状に関わる。右端は歯科医師の対応で、調整、リライン、新義歯製作、リマウント・修正、咬合面再構成、治療義歯がある。STは症状を観察して報告する。">
      <Label x={130} y={16} text="考えられる原因（歯科医師が判断）" size={12} anchor="middle" bold color={C.ink} />
      <Label x={colX(0) + 172} y={16} text="症状（STや家族が気づける）" size={12} anchor="middle" bold color={C.pinkDeep} />
      <Label x={680} y={16} text="対応（歯科医師）" size={12} anchor="middle" bold color={C.ink} />
      {symptoms.map((t, j) => (
        <Box key={j} x={colX(j)} y={28} w={80} h={44} fill={C.pink} lines={t} size={11} bold />
      ))}
      {rows.map((r, i) => (
        <g key={r.cause}>
          <rect x={20} y={rowY(i) - 18} width={720} height={36} rx={8} fill={i % 2 ? '#fff' : '#f7f4ff'} stroke={C.line} strokeWidth={0.8} />
          <Label x={32} y={rowY(i)} text={r.cause} size={11.5} color={C.ink} bold />
          {r.marks.map((m, j) =>
            m === true ? (
              <circle key={j} cx={colX(j) + 40} cy={rowY(i)} r={7} fill={C.lavenderDeep} />
            ) : m ? (
              <g key={j}>
                <rect x={colX(j) + 16} y={rowY(i) - 11} width={48} height={22} rx={11} fill={C.lavender} />
                <Label x={colX(j) + 40} y={rowY(i)} text={m} size={10.5} anchor="middle" color={C.ink} bold />
              </g>
            ) : null,
          )}
          {r.fix.map((f, k) => (
            <Label key={f} x={624} y={rowY(i) + (r.fix.length === 1 ? 0 : k === 0 ? -8 : 8)} text={f} size={10} color={C.ink} />
          ))}
        </g>
      ))}
      <line x1={614} y1={28} x2={614} y2={rowY(6) + 18} stroke={C.line} strokeDasharray="4 3" />
      <rect x={20} y={380} width={720} height={44} rx={10} fill={C.lemon} />
      <Label x={380} y={395} text="STの役割：症状・いつから・どの場面で・経過・本人の困り感 を記録して報告する" size={12} anchor="middle" bold color={C.ink} />
      <Label x={380} y={413} text="原因の特定と義歯の調整は歯科医師の診療行為" size={10.5} anchor="middle" />
      <Label x={740} y={442} text="※ 日本補綴歯科学会ガイドラインの図3をもとに表の形に再構成（●＝その原因で起こりうる症状）" size={10} anchor="end" />
    </Svg>
  )
}

export const figuresCh03: Record<string, FC> = {
  'ch03-structure': Structure,
  'ch03-flow': Flow,
  'ch03-signs': Signs,
}
