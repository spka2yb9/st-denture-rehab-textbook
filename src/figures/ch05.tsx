import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 言語聴覚士法の2層構造
const FigLaw: FC = () => (
  <Svg w={760} h={260} label="言語聴覚士法の業務の2層構造。第2条の本来業務と、第42条の診療の補助としての業務（医師又は歯科医師の指示が前提）を並べた概念図。">
    <Box x={30} y={30} w={330} h={44} fill={C.lavender} lines="第2条：言語聴覚士の本来の業務" size={13} bold />
    <Box x={30} y={84} w={330} h={110} fill="#fff" lines={['音声機能・言語機能・聴覚の障害に対する', '言語訓練その他の訓練、', '必要な検査、助言・指導その他の援助', '（主治の医師・歯科医師がいれば指導を受ける：第43条）']} size={11.5} />
    <Box x={400} y={30} w={330} h={44} fill={C.mint} lines="第42条：診療の補助としての業務" size={13} bold />
    <Box x={400} y={84} w={330} h={110} fill="#fff" lines={['嚥下訓練、人工内耳の調整、', 'その他厚生労働省令で定める行為', '', '']} size={11.5} />
    <rect x={412} y={160} width={306} height={26} rx={6} fill={C.lemon} opacity={0.8} />
    <Label x={565} y={173} text="前提：医師 又は 歯科医師 の指示" size={11.5} anchor="middle" color={C.ink} bold />
    <Arrow d="M 565 230 L 565 198" color={C.pinkDeep} />
    <Label x={565} y={246} text="歯科訪問リハでの嚥下訓練はここに位置づく" size={11.5} anchor="middle" color={C.pinkDeep} bold />
    <Label x={195} y={230} text="構音・発声の訓練はこちらに含まれる" size={11} anchor="middle" />
  </Svg>
)

// 多職種の役割分担と情報の流れ
const FigTeam: FC = () => (
  <Svg w={760} h={460} label="中央の患者・家族を囲んで、歯科医師、ST、歯科衛生士、介護支援専門員、訪問看護、主治医、管理栄養士を配置し、指示・報告と情報共有の関係を示す概念図。">
    {/* 中央 */}
    <circle cx={380} cy={230} r={64} fill={C.lemon} stroke={C.line} strokeWidth={1.5} />
    <Label x={380} y={222} text="患者" size={14} anchor="middle" bold color={C.ink} />
    <Label x={380} y={242} text="家族・介護者" size={11.5} anchor="middle" color={C.ink} />
    {/* 歯科チーム（上） */}
    <rect x={200} y={20} width={360} height={96} rx={14} fill="#f3fbf7" stroke={C.mintDeep} strokeWidth={1.5} strokeDasharray="6 4" />
    <Label x={212} y={36} text="歯科クリニック" size={11} color={C.mintDeep} bold />
    <Box x={215} y={46} w={100} h={56} fill={C.mint} lines={['歯科医師', '診断・義歯調整・指示']} size={10.5} bold />
    <Box x={330} y={46} w={100} h={56} fill={C.pink} lines={['ST', '評価・訓練・報告']} size={10.5} bold />
    <Box x={445} y={46} w={100} h={56} fill={C.mint} lines={['歯科衛生士', '口腔衛生・清掃指導']} size={10.5} bold />
    <Arrow d="M 315 74 L 330 74" color={C.mintDeep} />
    <Arrow d="M 330 88 L 315 88" color={C.pinkDeep} />
    <Label x={322} y={136} text="指示↓ 報告↑" size={9.5} anchor="middle" />
    {/* 左: ケアマネ */}
    <Box x={30} y={200} w={150} h={60} fill={C.lavender} lines={['介護支援専門員', 'ケアプラン・連絡調整']} size={11} bold />
    {/* 右: 訪問看護 */}
    <Box x={580} y={200} w={150} h={60} fill={C.sky} lines={['訪問看護', '全身状態・療養上の世話']} size={11} bold />
    {/* 下左: 主治医 */}
    <Box x={150} y={370} w={160} h={60} fill={C.peach} lines={['主治医', '全身疾患・薬剤・指示']} size={11} bold />
    {/* 下右: 管理栄養士 */}
    <Box x={450} y={370} w={160} h={60} fill={C.peach} lines={['管理栄養士', '栄養指導・食形態と栄養']} size={11} bold />
    {/* STから中央へ */}
    <Arrow d="M 380 102 L 380 162" color={C.pinkDeep} />
    <Label x={392} y={132} text="訪問・訓練" size={10.5} color={C.pinkDeep} />
    {/* 情報共有（点線） */}
    <Arrow d="M 340 66 C 260 70, 150 120, 110 198" dashed color={C.lavenderDeep} />
    <Label x={118} y={152} text="生活・サービス調整の情報" size={10} anchor="middle" color={C.lavenderDeep} />
    <Arrow d="M 430 90 C 520 110, 600 150, 650 198" dashed color={C.skyDeep} />
    <Label x={655} y={160} text="バイタル・むせ・発熱の情報" size={10} anchor="middle" color={C.skyDeep} />
    <Arrow d="M 265 100 C 220 180, 210 290, 230 368" dashed color={C.peachDeep} />
    <Label x={160} y={320} text="歯科医師↔主治医" size={10} anchor="middle" color={C.peachDeep} />
    <Label x={160} y={334} text="診療情報の共有" size={10} anchor="middle" color={C.peachDeep} />
    <Arrow d="M 420 100 C 520 180, 540 290, 530 368" dashed color={C.peachDeep} />
    <Label x={610} y={320} text="食形態変更・体重減少" size={10} anchor="middle" color={C.peachDeep} />
    <Label x={610} y={334} text="→ 栄養相談" size={10} anchor="middle" color={C.peachDeep} />
    {/* 中央から周囲（サービス提供） */}
    <path d="M 316 230 L 182 230" stroke={C.line} strokeWidth={1.5} />
    <path d="M 444 230 L 578 230" stroke={C.line} strokeWidth={1.5} />
    <path d="M 340 286 L 250 368" stroke={C.line} strokeWidth={1.5} />
    <path d="M 420 286 L 510 368" stroke={C.line} strokeWidth={1.5} />
    {/* 凡例 */}
    <path d="M 30 440 L 60 440" stroke={C.pinkDeep} strokeWidth={2} markerEnd="url(#arr)" />
    <Label x={66} y={440} text="指示・報告・提供" size={10.5} />
    <path d="M 190 440 L 220 440" stroke={C.lavenderDeep} strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#arr)" />
    <Label x={226} y={440} text="情報共有（点線）" size={10.5} />
    <Label x={560} y={440} text="※ 概念図。体制は地域・ケースで異なります。" size={10.5} anchor="middle" />
  </Svg>
)

export const figuresCh05: Record<string, FC> = {
  'ch05-law': FigLaw,
  'ch05-team': FigTeam,
}
