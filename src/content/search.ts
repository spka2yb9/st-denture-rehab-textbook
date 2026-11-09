import { books, cases, chapters, glossary } from '.'
import type { Block } from './types'
import { plainText } from '../lib/markup'
import { approxFind, normalize, readingVariants, typoAllowance } from '../lib/fuzzy'

export type SearchEntry = { href: string; where: string; title: string; text: string }

function blockToText(b: Block): string {
  switch (b.type) {
    case 'p':
    case 'h3':
      return plainText(b.text)
    case 'ul':
    case 'ol':
      return b.items.map(plainText).join(' ')
    case 'callout':
      return plainText((b.title ?? '') + ' ' + b.text)
    case 'table':
      return [...b.head, ...b.rows.flat()].map(plainText).join(' ')
    case 'figure':
      return plainText(b.caption + ' ' + b.desc)
    case 'quiz':
      return b.items.map((it) => plainText(it.q + ' ' + it.choices.join(' ') + ' ' + it.explain)).join(' ')
  }
}

// 起動時に一度だけ構築する静的な全文索引
export const searchIndex: SearchEntry[] = [
  ...chapters.flatMap((ch) =>
    ch.sections.map((s) => ({
      href: `/ch/${ch.id}/${s.id}`,
      where: `第${ch.num}章 ${ch.title}`,
      title: s.title,
      text: s.blocks.map(blockToText).join(' '),
    })),
  ),
  ...cases.map((c) => ({
    href: `/ch/${c.placementChapterId}/case-${c.id}`,
    where: `ケース演習（第${chapters.find((ch) => ch.id === c.placementChapterId)?.num}章末）`,
    title: c.title,
    text: [...c.scenario, c.question, ...c.model.map((m) => m.heading + ' ' + m.text), ...c.checklist].map(plainText).join(' '),
  })),
  ...books.map((b) => ({ href: '/books', where: '参考書紹介', title: b.title, text: `${b.authors} ${b.publisher} ${b.summary}` })),
  ...glossary.map((g) => ({ href: '/refs', where: '用語集', title: g.term, text: plainText(`${g.reading ?? ''} ${g.def}`) })),
]

// ひらがなで入力された語を漢字に置き換えるための読み。用語集の読みに、よく使う語を足したもの
const COMMON_READINGS: Record<string, string[]> = {
  えんげ: ['嚥下'], ごえん: ['誤嚥'], ぎし: ['義歯'], そしゃく: ['咀嚼'], だえき: ['唾液'], こうくう: ['口腔'],
  いんとう: ['咽頭'], こうとう: ['喉頭'], けいぶ: ['頸部'], ちょうしん: ['聴診'], ぜっこつ: ['舌骨'], ぜつあつ: ['舌圧'],
  がくてい: ['顎堤'], こうがい: ['口蓋'], しょくかい: ['食塊'], ふけんせい: ['不顕性'], はいえん: ['肺炎'],
  にんちしょう: ['認知症'], しっこう: ['失行'], まひ: ['麻痺'], くんれん: ['訓練'], ちょうせいしょく: ['調整食'],
  ないしきょう: ['内視鏡'], ぞうえい: ['造影'], ていえいよう: ['低栄養'], えいよう: ['栄養'], だっすい: ['脱水'],
  ちっそく: ['窒息'], しせい: ['姿勢'], かいじょ: ['介助'], ほうもん: ['訪問'], しか: ['歯科'], ほてつ: ['補綴'],
  げんごちょうかくし: ['言語聴覚士'], かんせつ: ['間接', '関節'], ちょくせつ: ['直接'], しょっけい: ['食形'],
  けいたい: ['形態'], こうくうけあ: ['口腔ケア'], ねんまく: ['粘膜'], ざんりゅう: ['残留'],
}
const READINGS: [string, string[]][] = (() => {
  const map = new Map<string, Set<string>>()
  const add = (r: string, k: string) => {
    const key = normalize(r)
    if (key.length < 2 || key === normalize(k)) return
    map.set(key, (map.get(key) ?? new Set()).add(normalize(k)))
  }
  for (const g of glossary) if (g.reading) add(g.reading, g.term.split('（')[0])
  for (const [r, ks] of Object.entries(COMMON_READINGS)) for (const k of ks) add(r, k)
  return [...map].map(([r, ks]): [string, string[]] => [r, [...ks]]).sort((a, b) => b[0].length - a[0].length)
})()

const normalizedIndex = searchIndex.map((e) => ({ e, title: normalize(e.title), body: normalize(e.text) }))

export type SearchResult = SearchEntry & { snippet: string; score: number }

function snippetAt(text: string, at: number) {
  const start = Math.max(0, at - 40)
  return (start > 0 ? '…' : '') + text.slice(start, start + 120) + (start + 120 < text.length ? '…' : '')
}

// 検索。空白区切りの語をすべて含む項目を返す（表記ゆれと読みは常に吸収）。
// 1件も見つからないときだけ、打ち間違いを許した検索に切り替え、fuzzy: true を返す。
export function search(q: string): { results: SearchResult[]; fuzzy: boolean } {
  const terms = q
    .split(/[\s\u3000]+/)
    .map(normalize)
    .filter(Boolean)
    .map((t) => readingVariants(t, READINGS))
  if (terms.length === 0) return { results: [], fuzzy: false }

  const exact = normalizedIndex
    .map(({ e, title, body }) => {
      let score = 0
      let first = -1
      for (const variants of terms) {
        const hit = variants.find((v) => body.includes(v) || title.includes(v))
        if (!hit) return null
        score += (title.includes(hit) ? 5 : 0) + body.split(hit).length - 1
        if (first < 0) first = Math.max(0, body.indexOf(hit))
      }
      return { ...e, snippet: snippetAt(e.text, first), score }
    })
    .filter((r): r is SearchResult => r !== null)
  if (exact.length > 0) return { results: exact.sort((a, b) => b.score - a.score), fuzzy: false }

  const near = normalizedIndex
    .map(({ e, title, body }) => {
      let score = 0
      let first = -1
      for (const variants of terms) {
        let best: { at: number; dist: number; inTitle: boolean } | null = null
        for (const v of variants) {
          const max = typoAllowance(v.length)
          if (max === 0) continue
          const t = approxFind(title, v, max)
          const b = t ? null : approxFind(body, v, max)
          const f = t ? { ...t, inTitle: true } : b ? { ...b, inTitle: false } : null
          if (f && (!best || f.dist < best.dist)) best = f
        }
        if (!best) return null
        score += (best.inTitle ? 5 : 0) + 3 - best.dist
        if (first < 0 && !best.inTitle) first = best.at
      }
      return { ...e, snippet: snippetAt(e.text, Math.max(0, first)), score }
    })
    .filter((r): r is SearchResult => r !== null)
  return { results: near.sort((a, b) => b.score - a.score), fuzzy: near.length > 0 }
}
