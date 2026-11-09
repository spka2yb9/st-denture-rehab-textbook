import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 口腔機能低下症 7項目と検査・基準値
const Seven: FC = () => {
  const rows: [string, string, string, string][] = [
    ['① 口腔衛生状態不良', '舌苔の視診（TCI）／ 細菌カウンタ', 'TCI 50%以上 ／ レベル4以上', C.peach],
    ['② 口腔乾燥', '口腔水分計 ／ サクソンテスト', '27.0未満 ／ 2分で2g以下', C.sky],
    ['③ 咬合力低下', '咬合力計 ／ 残存歯数', '機器別の基準値 ／ 20本未満', C.lavender],
    ['④ 舌口唇運動機能低下', 'オーラルディアドコキネシス', 'パ・タ・カ いずれか 6回/秒未満', C.mint],
    ['⑤ 低舌圧', '舌圧測定器', '30kPa未満', C.mint],
    ['⑥ 咀嚼機能低下', 'グミゼリー（グルコース溶出）／ スコア法', '100mg/dL未満 ／ スコア0〜2', C.lavender],
    ['⑦ 嚥下機能低下', 'EAT-10 ／ 聖隷式嚥下質問紙', '3点以上 ／ Aが1つ以上', C.mint],
  ]
  return (
    <Svg w={760} h={440} label="口腔機能低下症の7つの下位症状と、それぞれの検査および低下と判定する基準値を並べた図。3項目以上の該当で診断。④⑤⑦は言語聴覚士の訓練対象に重なる。">
      <Label x={110} y={24} text="下位症状" size={12} anchor="middle" bold color={C.ink} />
      <Label x={360} y={24} text="検査" size={12} anchor="middle" bold color={C.ink} />
      <Label x={600} y={24} text="低下と判定する基準" size={12} anchor="middle" bold color={C.ink} />
      {rows.map(([s, t, v, f], i) => {
        const y = 40 + i * 46
        return (
          <g key={s}>
            <Box x={14} y={y} w={192} h={38} fill={f} lines={s} size={12} bold />
            <Box x={230} y={y} w={260} h={38} fill="#fff" lines={t} size={11} />
            <Box x={514} y={y} w={232} h={38} fill="#fff" lines={v} size={11} />
            <Arrow d={`M206 ${y + 19} L228 ${y + 19}`} />
            <Arrow d={`M490 ${y + 19} L512 ${y + 19}`} />
          </g>
        )
      })}
      <rect x={14} y={372} width={732} height={30} rx={8} fill={C.lemon} />
      <Label x={380} y={387} text="7項目のうち 3項目以上 該当 → 口腔機能低下症。再評価は概ね6か月ごと、2項目以下で回復とみなす" size={12} anchor="middle" bold color={C.ink} />
      <Label x={14} y={418} text="緑：STの訓練・評価と重なる項目。義歯装着者は③④⑤⑥を義歯を装着して測る。基準値は日本歯科医学会（令和8年3月）。" size={10} />
      <Label x={14} y={428} text="咬合力の基準値は機器により 350N／500N／200N／375N 未満。模式図。" size={10} />
    </Svg>
  )
}

// オーラルフレイルから要介護への流れ + OF-5
const OralFrail: FC = () => {
  const levels = [
    ['第1レベル', '口の健康リテラシー', 'の低下'],
    ['第2レベル', '口のささいな', 'トラブル'],
    ['第3レベル', '口の機能低下', '（口腔機能低下症）'],
    ['第4レベル', '食べる機能の', '障がい'],
  ]
  const of5 = ['残存歯 0〜19本', '咀嚼困難感', '嚥下困難感', '口腔乾燥感', '滑舌低下']
  return (
    <Svg w={760} h={400} label="上段に日本歯科医師会マニュアルの4レベル（口の健康リテラシーの低下、口のささいなトラブル、口の機能低下、食べる機能の障がい）を左から右へ並べ、要介護・フレイルへ向かう矢印と、早期対応で改善可能という戻りの矢印を示す。下段はOF-5の5項目で、2項目以上該当でオーラルフレイル。">
      <Label x={14} y={22} text="オーラルフレイルの4つのレベル（日本歯科医師会 2019年版マニュアル）" size={13} bold color={C.ink} />
      {levels.map((l, i) => (
        <Box key={i} x={14 + i * 160} y={40} w={146} h={70} fill={[C.mint, C.lemon, C.peach, C.pink][i]} lines={l} size={12} bold={i === 1} />
      ))}
      {[0, 1, 2].map((i) => (
        <Arrow key={i} d={`M${160 + i * 160} 75 L${172 + i * 160} 75`} />
      ))}
      <Box x={654} y={40} w={92} h={70} fill="#f1efe9" lines={['要介護', 'フレイル']} size={12} bold />
      <Arrow d="M640 75 L652 75" />
      {/* 戻り矢印 */}
      <Arrow d="M400 112 C 400 150, 160 150, 160 114" dashed color={C.mintDeep} />
      <Label x={280} y={160} text="早い段階で対応すれば改善も可能（可逆的）" size={11} anchor="middle" color={C.mintDeep} bold />
      <Label x={14} y={184} text="第2レベルの放置のリスクを示す知見：柏スタディ（OF-5以前の定義＝口腔の6指標のうち3つ以上の低下）" size={11} color={C.pinkDeep} />
      <Label x={14} y={202} text="該当者はどれにも該当しない人と比べ、身体的フレイル 2.41倍・サルコペニア 2.13倍（2年間）、要介護認定 2.35倍・死亡 2.09倍" size={11} color={C.pinkDeep} />
      {/* OF-5 */}
      <Label x={14} y={232} text="OF-5：機器なしで確認できる5項目（3学会合同ステートメント 2024）" size={13} bold color={C.ink} />
      {of5.map((t, i) => (
        <Box key={t} x={14 + i * 148} y={246} w={136} h={44} fill={C.sky} lines={t} size={12} />
      ))}
      <rect x={14} y={306} width={732} height={32} rx={8} fill={C.lemon} />
      <Label x={380} y={322} text="5項目のうち 2つ以上 該当 → オーラルフレイル（地域在住高齢者の約4割が該当）" size={12} anchor="middle" bold color={C.ink} />
      <Label x={14} y={360} text="滑舌低下は質問票、またはオーラルディアドコキネシス タ音 6.0回/秒未満で評価。" size={10} />
      <Label x={14} y={378} text="4レベルの図とOF-5は出典が異なる枠組みを並べた模式図。対応関係は概念的なもの。" size={10} />
    </Svg>
  )
}

export const figuresCh04: Record<string, FC> = {
  'ch04-seven': Seven,
  'ch04-oralfrail': OralFrail,
}
