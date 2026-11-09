import { Arrow, Box, C, Label, Svg } from './common'

// 義歯装着から定着確認・訓練・報告までの業務フロー（概念図）
export function FigWorkflow() {
  const steps = [
    { t: ['歯科医師', '義歯を製作・装着'], f: C.sky },
    { t: ['ST', '初回評価'], f: C.mint },
    { t: ['ST', '訓練・指導'], f: C.mint },
    { t: ['ST', '再評価'], f: C.mint },
    { t: ['歯科医師へ', '報告・相談'], f: C.pink },
  ]
  return (
    <Svg w={760} h={300} label="義歯の製作・装着から、STによる評価、訓練、再評価、歯科医師への報告までの流れを左から右へ示した概念図。再評価から訓練へ戻る矢印と、報告から義歯調整へ戻る矢印がある。">
      {steps.map((s, i) => (
        <Box key={i} x={20 + i * 148} y={70} w={128} h={70} fill={s.f} lines={s.t} size={13} bold={i !== 0} />
      ))}
      {steps.slice(1).map((_, i) => (
        <Arrow key={i} d={`M${148 + i * 148} 105 L${166 + i * 148} 105`} />
      ))}
      {/* 再評価→訓練 へ戻る */}
      <Arrow d="M528 140 C 528 190, 380 190, 380 142" dashed />
      <Label x={454} y={196} text="改善が不十分なら訓練を見直す" size={11} anchor="middle" />
      {/* 報告→義歯調整 へ戻る */}
      <Arrow d="M680 140 C 680 250, 84 250, 84 142" dashed color={C.pinkDeep} />
      <Label x={380} y={262} text="不適合のサインがあれば義歯の調整へ（調整は歯科医師が行う）" size={11} anchor="middle" color={C.pinkDeep} />
      {/* 評価の中身 */}
      <Label x={232} y={32} text="噛める・飲み込める・話せる か？" size={13} anchor="middle" bold color={C.ink} />
      <Arrow d="M232 42 L232 62" />
      <Label x={380} y={290} text="※ 概念図。実際の流れは勤務先の手順に従います。" size={11} anchor="middle" />
    </Svg>
  )
}
