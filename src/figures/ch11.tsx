import type { FC } from 'react'
import { Box, C, Label, Svg } from './common'

// 学会分類2021（食事）の段階図
const FigFoodCodes: FC = () => {
  const steps = [
    { code: '0j', name: '嚥下訓練食品 0j', form: ['均質なゼリー', 'スライス状に', 'すくえる'], udf: '—', f: C.lavender },
    { code: '0t', name: '嚥下訓練食品 0t', form: ['とろみ水', '（中間〜濃い）'], udf: '—', f: C.lavender },
    { code: '1j', name: '嚥下調整食 1j', form: ['ゼリー・プリン', '・ムース状', '口の外で食塊化'], udf: 'かまなくてもよい|（ゼリー状）', f: C.sky },
    { code: '2-1', name: '嚥下調整食 2-1', form: ['均質でなめらか', 'ペースト・', 'ミキサー食'], udf: 'かまなくてもよい', f: C.mint },
    { code: '2-2', name: '嚥下調整食 2-2', form: ['不均質も含む', 'ペースト・', 'ミキサー食'], udf: 'かまなくてもよい', f: C.mint },
    { code: '3', name: '嚥下調整食 3', form: ['形はあるが', '押しつぶし容易', '多量の離水なし'], udf: '舌でつぶせる', f: C.lemon },
    { code: '4', name: '嚥下調整食 4', form: ['箸・スプーン', 'で切れる', '歯槽堤で押しつぶす'], udf: '舌でつぶせる〜|容易にかめるの一部', f: C.peach },
  ]
  const n = steps.length
  const colW = 104
  const baseY = 300
  // 段の高さ（0j と 0t は並列。0j の次は 1j、0t の次は 2-1）
  const level = [0, 0, 1, 2, 3, 4, 5]
  return (
    <Svg w={760} h={436} label="学会分類2021の食事7区分を左から右へ階段状に並べた模式図。0jと0tは嚥下訓練食品で並列の選択肢（0jの次は1j、0tの次は2-1）。1jからコード4が嚥下調整食。各段に形態の要点とユニバーサルデザインフードの対応を示す。コード番号は必ずしも難易度と一致しない。">
      <Label x={380} y={22} text="← 咀嚼をほとんど要さない形態　　　　　　　　　　　　咀嚼能力が必要な形態 →（目安）" size={12} anchor="middle" color={C.soft} />
      {steps.map((s, i) => {
        const x = 12 + i * colW
        const h = 60 + level[i] * 24
        const y = baseY - h
        return (
          <g key={s.code}>
            <rect x={x} y={y} width={colW - 8} height={h} rx={8} fill={s.f} stroke={C.line} strokeWidth={1.5} />
            <text x={x + (colW - 8) / 2} y={y + 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={C.ink}>
              {s.code}
            </text>
            {s.form.map((t, j) => (
              <text key={j} x={x + (colW - 8) / 2} y={baseY + 18 + j * 15} textAnchor="middle" fontSize={10} fill={C.ink}>
                {t}
              </text>
            ))}
            <text x={x + (colW - 8) / 2} y={baseY + 62} textAnchor="middle" fontSize={9.5} fill={C.soft}>
              UDF:
            </text>
            {s.udf.split('|').map((t, j) => (
              <text key={j} x={x + (colW - 8) / 2} y={baseY + 75 + j * 13} textAnchor="middle" fontSize={9.5} fill={C.soft}>
                {t}
              </text>
            ))}
          </g>
        )
      })}
      <line x1={12} y1={baseY} x2={12 + n * colW} y2={baseY} stroke={C.line} strokeWidth={2} />
      <Box x={12} y={40} w={200} h={40} fill="#fff" lines={['0j・0t は「訓練食品」', '1j〜4 は「調整食」']} size={11} dashed />
      <Label x={380} y={408} text="※ 0jと0tは並列（0jの次は1j、0tの次は2-1）。コード番号は必ずしも難易度と一致しません。形態の要点は早見表の要約。" size={10.5} anchor="middle" />
      <Label x={380} y={426} text="※ 汁物を含む水分には原則とろみを付けるが、個別に水分の嚥下評価を行い不要と判断されれば解除できる。" size={10.5} anchor="middle" />
    </Svg>
  )
}

// とろみ3段階の比較図
const FigThickness: FC = () => {
  const cols = [
    { title: '段階1 薄いとろみ', en: 'Mildly thick', f: C.sky, rows: ['「drink」する', '口の中に広がる', 'ストローで容易に吸える', '粘度 50〜150 mPa·s', 'LST 36〜43 mm', 'シリンジ残留 2.2〜7.0 mL'], cup: 0.25 },
    { title: '段階2 中間のとろみ', en: 'Moderately thick', f: C.mint, rows: ['「drink」するが明らかにとろみ', '舌の上でまとめやすい', 'ストローで吸うのは抵抗あり', '粘度 150〜300 mPa·s', 'LST 32〜36 mm', 'シリンジ残留 7.0〜9.5 mL'], cup: 0.55 },
    { title: '段階3 濃いとろみ', en: 'Extremely thick', f: C.peach, rows: ['スプーンで「eat」する', 'まとまりがよく送り込みに力が要る', 'ストローは困難', '粘度 300〜500 mPa·s', 'LST 30〜32 mm', 'シリンジ残留 9.5〜10.0 mL'], cup: 0.9 },
  ]
  return (
    <Svg w={760} h={360} label="とろみの3段階を3列で比較した模式図。薄い、中間、濃いの順に、飲んだときの表現、口腔内での動き、ストローの可否、粘度、LST値、シリンジ残留量を示す。右へいくほどシリンジに残る量が多い絵を添えている。">
      {cols.map((c, i) => {
        const x = 12 + i * 250
        return (
          <g key={c.title}>
            <rect x={x} y={12} width={236} height={330} rx={14} fill={c.f} stroke={C.line} strokeWidth={1.5} />
            <text x={x + 118} y={38} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.ink}>
              {c.title}
            </text>
            <text x={x + 118} y={56} textAnchor="middle" fontSize={11} fill={C.soft}>
              {c.en}
            </text>
            {/* シリンジの絵 */}
            <rect x={x + 90} y={70} width={56} height={90} rx={4} fill="#fff" stroke={C.soft} strokeWidth={1.5} />
            <rect x={x + 92} y={72 + 86 * (1 - c.cup)} width={52} height={86 * c.cup} fill={C.skyDeep} opacity={0.6} />
            <rect x={x + 112} y={160} width={12} height={12} fill={C.soft} />
            <text x={x + 118} y={188} textAnchor="middle" fontSize={10} fill={C.soft}>
              10秒後のシリンジ内残留
            </text>
            {c.rows.map((r, j) => (
              <text key={j} x={x + 118} y={212 + j * 21} textAnchor="middle" fontSize={11.5} fill={C.ink} fontWeight={j >= 3 ? 700 : 400}>
                {r}
              </text>
            ))}
          </g>
        )
      })}
      <Label x={380} y={349} text="※ 数値は学会分類2021（とろみ）早見表より。キサンタンガム系とろみ剤で水にとろみ付けした試料の値です。" size={10.5} anchor="middle" />
    </Svg>
  )
}

export const figuresCh11: Record<string, FC> = {
  'ch11-codes': FigFoodCodes,
  'ch11-thickness': FigThickness,
}
