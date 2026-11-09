import type { ReactNode } from 'react'
import { glossary } from '../content/glossary'
import { GlossaryLink, TermLink } from '../components/SourceCard'

// 用語集の語と別名（「フードテスト（FT）」→「フードテスト」など）。長い語を優先して一致させる。
// term が空のものは「用語集の語を含むが別の意味の語」で、一致させてもリンクしない（舌圧子の「舌圧」など）。
const extraAliases: Record<string, string> = {
  VE: 'VE／VF',
  VF: 'VE／VF',
  FT: 'フードテスト（FT）',
  ODK: 'オーラルディアドコキネシス',
  仮性球麻痺: '偽性球麻痺',
  義歯床縁: '床縁',
  歯槽堤: '顎堤',
}
const blockers = ['舌圧子', 'レストシート']
const termAliases = [
  ...glossary.flatMap((g) => [...new Set([g.term, g.term.split('（')[0]])].map((label) => ({ label, term: g.term }))),
  ...Object.entries(extraAliases).map(([label, term]) => ({ label, term })),
  ...blockers.map((label) => ({ label, term: '' })),
]
  .filter((a) => a.label.length > 1)
  .sort((a, b) => b.label.length - a.label.length)

// 英字の略語（FT・VE など）は、FTD のような別の略語の一部には一致させない
const ALNUM = /[A-Za-z0-9]/
function indexOfTerm(text: string, label: string, from: number): number {
  const ascii = ALNUM.test(label[0])
  for (let at = text.indexOf(label, from); at >= 0; at = text.indexOf(label, at + 1)) {
    if (!ascii || (!ALNUM.test(text[at - 1] ?? '') && !ALNUM.test(text[at + label.length] ?? ''))) return at
  }
  return -1
}

const TOKEN = /(\{\{[^}]+\}\}|==[^=]+==|\n)/g

// 用語解説リンクの付け方。
//   seen: 同じ範囲（節など）で既にリンクした用語。初出だけをリンクして本文がボタンだらけにならないようにする。
//   false: 用語解説リンクを付けない（見出し・ボタン内・用語解説カード内など）。
export type TermMode = Set<string> | false

// {{語句|sourceId}}（出典）、==強調==、用語集の語（用語解説）を React 要素に変換する
export function renderInline(text: string, terms: TermMode = new Set()): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null
    if (part === '\n') return <br key={i} />
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const body = part.slice(2, -2)
      const bar = body.lastIndexOf('|')
      if (bar === -1) return <span key={i}>{body}</span>
      const ids = body
        .slice(bar + 1)
        .split(',')
        .map((s) => s.trim())
      return (
        <TermLink key={i} sourceIds={ids}>
          {renderInline(body.slice(0, bar), false)}
        </TermLink>
      )
    }
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={i}>{renderInline(part.slice(2, -2), terms)}</mark>
    }
    if (!terms) return <span key={i}>{part}</span>
    return <span key={i}>{linkTerms(part, terms)}</span>
  })
}

function linkTerms(text: string, seen: Set<string>): ReactNode[] {
  const nodes: ReactNode[] = []
  let offset = 0
  while (offset < text.length) {
    // 既にリンク済みの語も位置の候補に含める（「偽性球麻痺」の中の「球麻痺」に一致させないため）
    let best: { at: number; label: string; term: string } | undefined
    for (const a of termAliases) {
      const at = indexOfTerm(text, a.label, offset)
      if (at >= 0 && (!best || at < best.at || (at === best.at && a.label.length > best.label.length))) best = { at, ...a }
    }
    if (!best) break
    const end = best.at + best.label.length
    if (!best.term || seen.has(best.term)) {
      nodes.push(text.slice(offset, end))
    } else {
      nodes.push(text.slice(offset, best.at))
      nodes.push(
        <GlossaryLink key={best.at} term={best.term}>
          {best.label}
        </GlossaryLink>,
      )
      seen.add(best.term)
    }
    offset = end
  }
  nodes.push(text.slice(offset))
  return nodes
}

// 検索索引・読み上げ用にインライン記法を除いた素のテキストを返す
export function plainText(text: string): string {
  return text
    .replace(/\{\{([^}|]+)\|[^}]+\}\}/g, '$1')
    .replace(/==([^=]+)==/g, '$1')
    .replace(/\n/g, ' ')
}

// 本文中で参照されている sourceId を集める
export function collectSourceIds(text: string): string[] {
  const ids: string[] = []
  for (const m of text.matchAll(/\{\{[^}|]+\|([^}]+)\}\}/g)) {
    for (const id of m[1].split(',')) ids.push(id.trim())
  }
  return ids
}
