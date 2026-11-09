import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 背景疾患別の嚥下障害の特徴比較（模式図）
const COLS: { title: string; fill: string; rows: string[][] }[] = [
  {
    title: '脳卒中：球麻痺',
    fill: C.sky,
    rows: [
      ['延髄・脳神経の障害', '嚥下筋そのもの'],
      ['嚥下反射の消失〜減弱', '舌萎縮・カーテン徴候', '鼻咽腔閉鎖不全'],
      ['嚥下反射が起きるか', '鼻への逆流・嗄声'],
      ['反射の誘発・代償法', 'VE/VFで安全確認'],
    ],
  },
  {
    title: '脳卒中：偽性球麻痺',
    fill: C.sky,
    rows: [
      ['両側皮質延髄路', '協調とタイミング'],
      ['口唇からこぼれる', '食塊形成不良', '反射の遅れ・嚥下失行'],
      ['嚥下失行の有無', '高次脳機能（第12章）'],
      ['一口量・交互嚥下', '口腔器官の運動訓練'],
    ],
  },
  {
    title: 'パーキンソン病',
    fill: C.lavender,
    rows: [
      ['錐体外路症状など', '薬効のON/OFF'],
      ['不顕性誤嚥が多い', '運動症状と一致しない', '咽頭残留・流涎'],
      ['服薬時刻と食事時刻', '食後の咳・低血圧'],
      ['ONで食べる・とろみ', '顎引き・呼気筋/発声訓練'],
    ],
  },
  {
    title: 'サルコペニア',
    fill: C.mint,
    rows: [
      ['全身＋嚥下筋の', '筋量・筋力低下'],
      ['食事時間の延長', '舌圧低下・咽頭残留', '体重減少'],
      ['体重・握力・食事量', '舌圧（20kPa未満）'],
      ['栄養とリハをセットで', '負荷より栄養が先'],
    ],
  },
  {
    title: '誤嚥性肺炎後',
    fill: C.peach,
    rows: [
      ['入院中の絶食・安静', '低栄養が重なる'],
      ['入院前より機能低下', '元気がない・食欲低下', 'のどのゴロゴロ'],
      ['入院前の食形態・体重', '退院サマリー'],
      ['新しい基準で再評価', '再発サインの早期発見'],
    ],
  },
]
const ROW_LABELS = ['障害の中心', '典型的な所見', '訪問で最初に確認', '訓練の方向性']

export const FigDiseaseCompare: FC = () => {
  const x0 = 96
  const cw = 130
  const y0 = 54
  const rhs = [56, 72, 56, 56]
  const ys = rhs.map((_, i) => y0 + rhs.slice(0, i).reduce((a, b) => a + b, 0))
  const total = y0 + rhs.reduce((a, b) => a + b, 0)
  return (
    <Svg w={760} h={total + 30} label="脳卒中（球麻痺・偽性球麻痺）、パーキンソン病、サルコペニア、誤嚥性肺炎後の5列について、障害の中心、典型的な所見、訪問で最初に確認すること、訓練の方向性を並べた比較表の模式図。">
      {COLS.map((c, ci) => (
        <g key={c.title}>
          <rect x={x0 + ci * cw + 2} y={14} width={cw - 4} height={32} rx={10} fill={c.fill} />
          <text x={x0 + ci * cw + cw / 2} y={30} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={700} fill={C.ink}>
            {c.title}
          </text>
        </g>
      ))}
      {ROW_LABELS.map((l, ri) => (
        <g key={l}>
          <rect x={4} y={ys[ri] + 2} width={x0 - 8} height={rhs[ri] - 4} rx={8} fill="#f6f3ee" />
          <text x={x0 / 2} y={ys[ri] + rhs[ri] / 2} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill={C.ink}>
            {l}
          </text>
        </g>
      ))}
      {COLS.map((c, ci) =>
        c.rows.map((lines, ri) => {
          const startY = ys[ri] + rhs[ri] / 2 - ((lines.length - 1) * 14) / 2
          return (
            <g key={`${ci}-${ri}`}>
              <rect x={x0 + ci * cw + 2} y={ys[ri] + 2} width={cw - 4} height={rhs[ri] - 4} rx={8} fill="#fff" stroke={C.line} />
              {lines.map((t, li) => (
                <text key={li} x={x0 + ci * cw + cw / 2} y={startY + li * 14} textAnchor="middle" dominantBaseline="middle" fontSize={10.5} fill={C.ink}>
                  {t}
                </text>
              ))}
            </g>
          )
        }),
      )}
      <Label x={6} y={total + 16} text="模式図（典型像の整理。実際には複数が重なります）" size={11} color={C.soft} />
    </Svg>
  )
}

// 訪問時のリスク確認の順番（フロー）
export const FigRiskCheck: FC = () => {
  const steps = [
    { t: ['① バイタル', '血圧・脈拍・体温・SpO2'], ng: ['脈拍40以下/120以上、体温38度以上', 'SpO2 90%以下 など → 訓練は行わず報告'] },
    { t: ['② 全身状態', '眠気・元気・食事量・体重・排尿'], ng: ['急な食事量低下・体重減少・脱水所見', '→ 看護師・医師・栄養士へ共有'] },
    { t: ['③ 口腔・義歯', '乾燥・残渣・粘膜の傷・装着状況'], ng: ['発赤・潰瘍・義歯の浮き上がり', '→ 歯科医師へ報告（調整の相談）'] },
    { t: ['④ 環境・介助者', '姿勢・食具・見守り・家族の体調'], ng: ['一人での食事・姿勢の崩れ', '→ 環境調整・ケアマネへ相談'] },
    { t: ['⑤ 訓練の実施', '間接→直接の順で負荷を確認'], ng: ['むせ頻回・湿性嗄声 → 直接訓練を中断（第10章）', '脈拍140/分超・血圧の大幅上昇など → 途中で中止'] },
    { t: ['⑥ 終了時の確認', 'バイタル再測定・口腔内残渣・記録'], ng: ['回復しない症状 → 訓練中止', '家族へ連絡のサインを再確認'] },
  ]
  const bx = 40
  const bw = 300
  const bh = 58
  const gap = 20
  return (
    <Svg w={760} h={steps.length * (bh + gap) + 40} label="訪問時のリスク確認を6段階の流れで示した模式図。バイタル、全身状態、口腔・義歯、環境・介助者、訓練の実施、終了時の確認の順に進み、各段階で異常があれば右側の対応（報告・共有・中止）に進む。">
      {steps.map((s, i) => {
        const y = 16 + i * (bh + gap)
        return (
          <g key={i}>
            <Box x={bx} y={y} w={bw} h={bh} fill={i === 4 ? C.mint : C.sky} lines={s.t} size={12} bold />
            {i < steps.length - 1 && <Arrow d={`M${bx + bw / 2} ${y + bh} L${bx + bw / 2} ${y + bh + gap - 2}`} />}
            <Arrow d={`M${bx + bw} ${y + bh / 2} L${bx + bw + 28} ${y + bh / 2}`} dashed color={C.pinkDeep} />
            <rect x={bx + bw + 30} y={y + 4} width={760 - (bx + bw + 30) - 10} height={bh - 8} rx={10} fill="#fff4f7" stroke={C.pink} />
            {s.ng.map((t, li) => (
              <text key={li} x={bx + bw + 40} y={y + bh / 2 - 8 + li * 16} fontSize={11} fill={C.ink} dominantBaseline="middle">
                {t}
              </text>
            ))}
          </g>
        )
      })}
      <Label x={bx} y={steps.length * (bh + gap) + 26} text="模式図。数値は日本リハビリテーション医学会ガイドライン（案）の目安。勤務先の基準があればそちらを優先。" size={11} color={C.soft} />
      <Label x={bx + bw + 40} y={8} text="異常あり → 対応" size={11} color={C.pinkDeep} bold />
    </Svg>
  )
}

export const figuresCh13: Record<string, FC> = {
  'ch13-disease-compare': FigDiseaseCompare,
  'ch13-risk-check': FigRiskCheck,
}
