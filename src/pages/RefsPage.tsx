import { useEffect } from 'react'
import { chapters, glossary } from '../content'
import { sources } from '../content/sources'
import { href } from '../lib/router'
import { renderInline } from '../lib/markup'

export function RefsPage() {
  useEffect(() => {
    document.title = '用語集・参考文献 ― 義歯とえんげの教科書'
  }, [])
  const all = Object.values(sources).sort((a, b) => a.publisher.localeCompare(b.publisher, 'ja') || a.title.localeCompare(b.title, 'ja'))
  const sorted = [...glossary].sort((a, b) => (a.reading ?? a.term).localeCompare(b.reading ?? b.term, 'ja'))
  return (
    <div className="page">
      <div className="chapter__eyebrow">資料</div>
      <h1>用語集・参考文献</h1>

      <section id="glossary">
        <h2>用語集</h2>
        <dl className="glossary">
          {sorted.map((g) => {
            const ch = g.chapter ? chapters.find((c) => c.id === g.chapter) : undefined
            return (
              <div key={g.term} className="glossary__item">
                <dt>
                  {g.term}
                  {g.reading && <span className="glossary__reading">（{g.reading}）</span>}
                </dt>
                <dd>
                  {renderInline(g.def, new Set([g.term]))}
                  {ch && (
                    <a className="chip" href={href(`/ch/${ch.id}`)}>
                      第{ch.num}章
                    </a>
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </section>

      <section id="sources">
        <h2>参考文献一覧</h2>
        <p className="muted">本文中の出典カードから参照している資料の一覧です。資料側の更新日ではなく、本教材の作成時に内容を確認した日を「確認日」として記載しています。</p>
        <ol className="refs">
          {all.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
              </a>
              <span className="refs__meta">
                {' '}
                ― {s.publisher}
                {s.note ? `（${s.note}）` : ''}。確認日 {s.accessed}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
