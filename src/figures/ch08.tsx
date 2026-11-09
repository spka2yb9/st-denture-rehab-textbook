import type { FC } from 'react'
import { Arrow, Box, C, Label, Svg } from './common'

// 頸部聴診の聴診位置（頸部正面の模式図）
// 下あごから鎖骨までを正面から見た図。胸鎖乳突筋は耳の後ろから胸骨へ斜めに走る。
const FigPosition: FC = () => {
  const cx = 280
  const skin = '#b9a99a'
  const bone = '#c9bdae'
  return (
    <Svg w={760} h={410} label="下あごから鎖骨までの首を正面から見た模式図。上から舌骨、甲状軟骨（喉頭隆起）、輪状軟骨、気管の順に並び、首の両脇を胸鎖乳突筋が耳の後ろから胸骨へ斜めに走る。臨床で聴診器を当てる目安は、正中を避けた喉頭の側面、胸鎖乳突筋の前方付近で、正中（喉頭の真上）は避ける。音響解析の研究で適するとされた部位（輪状軟骨直下の気管外側）は注記にとどめている。">
      {/* 下あご（顔の下半分） */}
      <path d={`M${cx - 140} 0 C ${cx - 140} 44, ${cx - 70} 86, ${cx} 88 C ${cx + 70} 86, ${cx + 140} 44, ${cx + 140} 0`} fill={C.peach} fillOpacity={0.45} stroke={skin} strokeWidth={2} />
      <path d={`M${cx - 30} 30 Q ${cx} 44 ${cx + 30} 30`} stroke={C.pinkDeep} strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* 首の輪郭と肩 */}
      <path d={`M${cx - 112} 60 C ${cx - 100} 140, ${cx - 98} 250, ${cx - 104} 312 Q ${cx - 150} 340 ${cx - 250} 362`} stroke={skin} strokeWidth={2} fill="none" />
      <path d={`M${cx + 112} 60 C ${cx + 100} 140, ${cx + 98} 250, ${cx + 104} 312 Q ${cx + 150} 340 ${cx + 250} 362`} stroke={skin} strokeWidth={2} fill="none" />
      {/* 鎖骨と胸骨の上端 */}
      <path d={`M${cx - 200} 346 Q ${cx - 100} 326 ${cx - 24} 350`} stroke={bone} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M${cx + 200} 346 Q ${cx + 100} 326 ${cx + 24} 350`} stroke={bone} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M${cx - 24} 352 Q ${cx} 342 ${cx + 24} 352 L ${cx + 28} 410 L ${cx - 28} 410 Z`} fill="#efe9e1" stroke={bone} />
      {/* 胸鎖乳突筋（耳の後ろ → 胸骨へ斜めに走る） */}
      <path d={`M${cx - 112} 64 C ${cx - 107} 160, ${cx - 72} 262, ${cx - 22} 350`} stroke={C.lavenderDeep} strokeWidth={16} strokeOpacity={0.35} fill="none" strokeLinecap="round" />
      <path d={`M${cx + 112} 64 C ${cx + 107} 160, ${cx + 72} 262, ${cx + 22} 350`} stroke={C.lavenderDeep} strokeWidth={16} strokeOpacity={0.35} fill="none" strokeLinecap="round" />
      {/* 舌骨 */}
      <path d={`M${cx - 40} 118 Q ${cx} 102 ${cx + 40} 118`} stroke={C.peachDeep} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* 甲状軟骨（喉頭隆起） */}
      <path d={`M${cx - 36} 140 L${cx - 30} 200 L${cx} 212 L${cx + 30} 200 L${cx + 36} 140 L${cx} 158 Z`} fill={C.sky} stroke={C.skyDeep} strokeWidth={2} />
      {/* 輪状軟骨 */}
      <rect x={cx - 26} y={220} width={52} height={22} rx={8} fill={C.lemon} stroke={C.peachDeep} strokeWidth={2} />
      {/* 気管（胸骨の裏へ続く） */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={cx - 24} y={252 + i * 22} width={48} height={14} rx={6} fill="#fff" stroke={C.line} strokeWidth={1.5} />
      ))}
      {/* 聴診位置 */}
      <circle cx={cx + 56} cy={196} r={20} fill={C.pink} fillOpacity={0.85} stroke={C.pinkDeep} strokeWidth={2.5} />
      <circle cx={cx - 56} cy={196} r={20} fill="none" stroke={C.pinkDeep} strokeWidth={2} strokeDasharray="4 4" />
      <Label x={cx} y={186} text="✕" size={16} anchor="middle" color={C.pinkDeep} bold />

      {/* 右側の注釈 */}
      <Label x={cx + 150} y={112} text="舌骨" size={12} bold color={C.ink} />
      <Arrow d={`M${cx + 146} 112 L${cx + 44} 114`} />
      <Label x={cx + 150} y={170} text="甲状軟骨（喉頭隆起＝のどぼとけ）" size={12} bold color={C.ink} />
      <Arrow d={`M${cx + 146} 170 L${cx + 40} 170`} />
      <Label x={cx + 150} y={231} text="輪状軟骨" size={12} bold color={C.ink} />
      <Arrow d={`M${cx + 146} 231 L${cx + 30} 231`} />
      <Label x={cx + 150} y={266} text="聴診器を当てる目安（臨床）" size={12} bold color={C.pinkDeep} />
      <Label x={cx + 150} y={284} text="正中を避けた喉頭の側面、" size={11} />
      <Label x={cx + 150} y={300} text="胸鎖乳突筋の前方付近" size={11} />
      <Label x={cx + 150} y={318} text="※ 音響解析の研究では輪状軟骨直下の気管外側" size={10} />
      <Arrow d={`M${cx + 146} 266 L${cx + 74} 208`} color={C.pinkDeep} />
      <Label x={cx - 150} y={322} text="気管" size={12} anchor="end" bold color={C.ink} />
      <Arrow d={`M${cx - 146} 322 L${cx - 28} 316`} />

      {/* 左側の注釈 */}
      <Label x={cx - 150} y={30} text="下あご" size={11} anchor="end" />
      <Label x={cx - 150} y={150} text="胸鎖乳突筋" size={12} anchor="end" bold color={C.lavenderDeep} />
      <Arrow d={`M${cx - 146} 150 L${cx - 108} 150`} />
      <Label x={cx - 150} y={228} text="✕ 正中部は避ける" size={11} anchor="end" color={C.pinkDeep} />
      <Label x={cx - 150} y={244} text="（喉頭の挙上を妨げる）" size={10.5} anchor="end" />
      <Arrow d={`M${cx - 146} 228 L${cx - 10} 190`} color={C.pinkDeep} dashed />
      <Label x={cx - 206} y={352} text="鎖骨" size={11} anchor="end" />
      <Label x={cx + 34} y={392} text="胸骨" size={11} />
      <Label x={746} y={398} text="※ 模式図。左右どちら側でも可。強く押しつけず、軽く密着させる。" size={10.5} anchor="end" />
    </Svg>
  )
}

// 聴診音の分類と示唆される病態
const FigSoundMap: FC = () => {
  // 右列: 疑われる病態
  const path = [
    { y: 40, h: 62, t: ['舌の送り込み障害・咽頭収縮の減弱', '喉頭挙上障害・食道入口部の弛緩障害', '→ 咽頭残留'], f: C.lemon },
    { y: 120, h: 40, t: ['誤嚥'], f: C.pink },
    { y: 178, h: 48, t: ['呼吸・嚥下パターンの失調', '喉頭侵入・誤嚥'], f: C.pink },
    { y: 244, h: 62, t: ['誤嚥・喉頭侵入', '咽頭部の液体貯留', '（嗽音・液体振動音は特に不顕性誤嚥）'], f: C.pink },
    { y: 324, h: 48, t: ['嚥下反射の遅延', '（食塊がすでに咽頭・喉頭にある）'], f: C.peach },
  ]
  // 中央列: 異常音 → 病態の添字
  const swallow = [
    { y: 48, t: '長い・弱い・複数回の嚥下音', to: 0 },
    { y: 96, t: '泡立ち音（bubbling）', to: 1 },
    { y: 144, t: 'むせに伴う喀出音', to: 1 },
    { y: 192, t: '嚥下音の合間の呼吸音', to: 2 },
  ]
  const breath = [
    { y: 270, t: '湿性音・嗽音・液体振動音', to: 3 },
    { y: 318, t: 'むせに伴う喀出音・喘鳴様呼吸音', to: 1 },
    { y: 366, t: '嚥下前の呼吸時の湿性音', to: 4 },
  ]
  const link = (y: number, to: number) => {
    const ty = path[to].y + path[to].h / 2
    return <path d={`M400 ${y} C 450 ${y}, 450 ${ty}, 498 ${ty}`} stroke="#7b7488" strokeWidth={1.5} fill="none" />
  }
  return (
    <Svg w={760} h={420} label="聴診音の分類図。左に正常音、中央に異常な嚥下音と異常な呼吸音、右に疑われる病態を置き、線で対応を示している。長い・弱い・複数回の嚥下音は送り込みや咽頭収縮・喉頭挙上の問題、泡立ち音・むせ・喘鳴様呼吸音は誤嚥、嚥下音の合間の呼吸音は呼吸嚥下パターンの失調、湿性音・嗽音・液体振動音は喉頭侵入・誤嚥・貯留、嚥下前の湿性音は嚥下反射遅延を示す。">
      <Label x={90} y={22} text="正常" size={13} anchor="middle" bold color={C.ink} />
      <Label x={300} y={22} text="異常な嚥下音" size={13} anchor="middle" bold color={C.ink} />
      <Label x={300} y={246} text="異常な呼吸音（嚥下前後）" size={13} anchor="middle" bold color={C.ink} />
      <Label x={620} y={22} text="疑われる病態" size={13} anchor="middle" bold color={C.ink} />

      <Box x={16} y={36} w={148} h={100} fill={C.mint} lines={['短く明瞭な', 'クリック音', '嚥下中は無呼吸', '嚥下後の呼気音は澄む']} size={11} />
      <Label x={90} y={160} text="基準となる音。" size={11} anchor="middle" />
      <Label x={90} y={176} text="自分の首で覚える" size={11} anchor="middle" />
      <Label x={90} y={300} text="嚥下前の呼気音と" size={11} anchor="middle" />
      <Label x={90} y={316} text="嚥下後の呼気音を" size={11} anchor="middle" />
      <Label x={90} y={332} text="必ず比べる" size={11} anchor="middle" bold color={C.ink} />

      {swallow.map((s) => (
        <g key={s.t + s.y}>
          <Box x={200} y={s.y - 18} w={200} h={36} fill={C.sky} lines={s.t} size={11} />
          {link(s.y, s.to)}
        </g>
      ))}
      {breath.map((b) => (
        <g key={b.t}>
          <Box x={200} y={b.y - 18} w={200} h={36} fill={C.lavender} lines={b.t} size={11} />
          {link(b.y, b.to)}
        </g>
      ))}
      {path.map((p) => (
        <Box key={p.y} x={500} y={p.y} w={244} h={p.h} fill={p.f} lines={p.t} size={11} />
      ))}
      <Label x={380} y={408} text="※ 模式図。日本摂食嚥下リハビリテーション学会「摂食嚥下障害の評価 2019」表8-1 と 大宿（2014）をもとに作成。" size={10.5} anchor="middle" />
    </Svg>
  )
}

export const figuresCh08: Record<string, FC> = {
  'ch08-position': FigPosition,
  'ch08-sound-map': FigSoundMap,
}
