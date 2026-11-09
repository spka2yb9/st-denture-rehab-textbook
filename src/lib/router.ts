import { useEffect, useState } from 'react'

// ハッシュベースの簡易ルーター。静的ホスティングでリロードしても壊れない。
//   #/            ホーム
//   #/ch/ch01     章（#/ch/ch01/sec-id で節へ）
//   #/ch/ch05/cases  各部の最後の章末にあるケース演習
//   #/books       参考書紹介
//   #/refs        参考文献・用語集
//   #/search?q=   検索

// restoreY: ブラウザの「戻る」「進む」で来たときに戻すスクロール位置（新しく開いたページでは undefined）
export type Route = { path: string[]; query: URLSearchParams; restoreY?: number }

// 履歴の項目ごとにスクロール位置を覚えておき、「戻る」で読んでいた位置に戻す。
// 項目には history.state.k で識別子を付ける。新しく開いた項目は state が空なので、復元対象にならない。
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
const scrollByEntry = new Map<string, number>()
const entryKey = (): string | undefined => history.state?.k
function ensureEntryKey() {
  if (!entryKey()) history.replaceState({ ...history.state, k: `${Date.now()}-${Math.random()}` }, '')
}
ensureEntryKey()
addEventListener(
  'scroll',
  () => {
    const k = entryKey()
    if (k) scrollByEntry.set(k, scrollY)
  },
  { passive: true },
)

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '')
  const [pathPart, queryPart = ''] = raw.split('?')
  const path = pathPart.split('/').filter(Boolean)
  return { path, query: new URLSearchParams(queryPart) }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(location.hash))
  useEffect(() => {
    const onChange = () => {
      // 描画で位置がずれる前に、この項目で最後に見ていた位置を読み出しておく
      const k = entryKey()
      const restoreY = k ? scrollByEntry.get(k) : undefined
      ensureEntryKey()
      setRoute({ ...parseHash(location.hash), restoreY })
    }
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigate(to: string) {
  location.hash = to.startsWith('#') ? to : `#${to}`
}

export const href = (to: string) => `#${to}`
