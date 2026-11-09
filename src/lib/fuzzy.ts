// 検索のあいまい一致に使う純粋な関数（React やデータに依存しない）

// 表記ゆれをそろえる: 全角/半角・大文字/小文字・カタカナ/ひらがな・異体字（頚→頸）。
// 文字数を変えない変換だけにして、元の文の同じ位置から抜粋を切り出せるようにする。
export function normalize(s: string): string {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/頚/g, '頸')
}

// 読みを漢字に置き換えた候補を作る（例: えんげくんれん → 嚥下訓練）。
// readings は [読み, 漢字の候補] を読みの長い順に並べたもの。読みが同じ語（かんせつ→間接/関節）は候補を複数持つ。
export function readingVariants(term: string, readings: [string, string[]][]): string[] {
  let out = [term]
  for (const [reading, kanjis] of readings) {
    const next = [...out]
    for (const s of out) if (s.includes(reading)) for (const k of kanjis) next.push(s.replaceAll(reading, k))
    out = [...new Set(next)].slice(0, 16)
  }
  return out
}

// 打ち間違いを許した部分一致（文中のどこかに、編集距離 maxDist 以内で pat に近い部分があるか）。
// 見つかれば、その部分のおおよその開始位置と距離を返す。
export function approxFind(text: string, pat: string, maxDist: number): { at: number; dist: number } | null {
  const m = pat.length
  let prev = Array.from({ length: m + 1 }, (_, i) => i)
  let cur = new Array<number>(m + 1)
  let best = { at: -1, dist: maxDist + 1 }
  for (let j = 1; j <= text.length; j++) {
    cur[0] = 0
    const c = text[j - 1]
    for (let i = 1; i <= m; i++) cur[i] = Math.min(prev[i] + 1, cur[i - 1] + 1, prev[i - 1] + (pat[i - 1] === c ? 0 : 1))
    if (cur[m] < best.dist) best = { at: Math.max(0, j - m), dist: cur[m] }
    ;[prev, cur] = [cur, prev]
  }
  return best.dist <= maxDist ? best : null
}

// 打ち間違いを何文字まで許すか（短い語は誤一致が増えるので許さない）
export const typoAllowance = (len: number) => (len <= 3 ? 0 : len <= 6 ? 1 : 2)
