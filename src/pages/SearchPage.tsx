import { useEffect, useMemo } from 'react'
import { search } from '../content/search'
import { href } from '../lib/router'

export function SearchPage({ q }: { q: string }) {
  useEffect(() => {
    document.title = `「${q}」の検索結果 ― 義歯とえんげの教科書`
  }, [q])

  const { results, fuzzy } = useMemo(() => search(q), [q])

  return (
    <div className="page">
      <h1>「{q}」の検索結果</h1>
      <p className="muted">{results.length} 件</p>
      {fuzzy && <p className="callout callout--note">「{q}」と完全に一致する語句がなかったため、表記の近い語句を含む結果を表示しています。</p>}
      {results.length === 0 && <p>見つかりませんでした。短い語句や別の言葉でも試してみてください（ひらがな・カタカナどちらでも検索できます）。</p>}
      <ul className="search-results">
        {results.map((r) => (
          <li key={`${r.href}|${r.title}`} className="search-result">
            <a href={href(r.href)}>
              <div className="search-result__where">{r.where}</div>
              <div className="search-result__title">{r.title}</div>
              <p className="search-result__snippet">{r.snippet}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
