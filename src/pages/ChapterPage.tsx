import { PenLine, Star } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { cases, chapters, parts } from '../content'
import { sources } from '../content/sources'
import type { Chapter, Block } from '../content/types'
import { CaseDetail } from '../components/CaseDetail'
import { Blocks } from '../components/Blocks'
import { href } from '../lib/router'
import { collectSourceIds, renderInline } from '../lib/markup'

function blockText(b: Block): string[] {
  switch (b.type) {
    case 'p':
    case 'h3':
      return [b.text]
    case 'ul':
    case 'ol':
      return b.items
    case 'callout':
      return [b.title ?? '', b.text]
    case 'table':
      return [...b.head, ...b.rows.flat()]
    case 'figure':
      return [b.caption, b.desc]
    case 'quiz':
      return b.items.flatMap((it) => [it.q, ...it.choices, it.explain, ...(it.src ?? []).map((s) => `{{x|${s}}}`)])
  }
}

// 章を読み進めた割合を、ヘッダー直下の細い線で示す（スクロールごとの再描画を避けて style を直接更新）
function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      bar.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`)
    }
    const onChange = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onChange, { passive: true })
    addEventListener('resize', onChange)
    return () => {
      removeEventListener('scroll', onChange)
      removeEventListener('resize', onChange)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={bar} className="reading-progress__bar" />
    </div>
  )
}

export function chapterSourceIds(ch: Chapter): string[] {
  const ids = new Set<string>()
  for (const s of ch.sections) for (const b of s.blocks) for (const t of blockText(b)) for (const id of collectSourceIds(t)) ids.add(id)
  return [...ids]
}

export function ChapterPage({ id, sectionId }: { id: string; sectionId?: string }) {
  const index = chapters.findIndex((c) => c.id === id)
  const ch = chapters[index]
  const prev = chapters[index - 1]
  const next = chapters[index + 1]
  const refIds = useMemo(() => (ch ? chapterSourceIds(ch) : []), [ch])
  const summarySeen = new Set<string>()
  const chapterCases = cases.filter((c) => c.placementChapterId === id)
  const part = parts.find((p) => p.ids.includes(id))
  const partRange = part && `第${chapters.find((c) => c.id === part.ids[0])?.num}〜${chapters.find((c) => c.id === part.ids.at(-1))?.num}章`

  useEffect(() => {
    if (!ch) return
    document.title = `第${ch.num}章 ${ch.title} ― 義歯とえんげの教科書`
    if (sectionId) {
      requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({ block: 'start', behavior: 'instant' }))
    }
  }, [ch, sectionId])

  if (!ch) {
    return (
      <div className="page">
        <h1>章が見つかりません</h1>
        <a className="btn" href={href('/')}>
          ホームへ戻る
        </a>
      </div>
    )
  }

  return (
    <article className="page chapter">
      <ReadingProgress />
      <header className="chapter__head">
        <div className="chapter__eyebrow">第{ch.num}章</div>
        <h1>{ch.title}</h1>
        <p className="chapter__lead">{renderInline(ch.lead)}</p>
        {ch.prereq && ch.prereq.length > 0 && (
          <p className="chapter__prereq">
            前提となる章:{' '}
            {ch.prereq.map((pid) => {
              const p = chapters.find((c) => c.id === pid)
              return p ? (
                <a key={pid} href={href(`/ch/${pid}`)} className="chip">
                  第{p.num}章 {p.title}
                </a>
              ) : null
            })}
          </p>
        )}
      </header>

      <nav className="section-nav" aria-label="この章の内容">
        <div className="section-nav__title">この章の内容</div>
        <ol>
          {ch.sections.map((s) => (
            <li key={s.id}>
              <a href={href(`/ch/${ch.id}/${s.id}`)}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      {ch.sections.map((s, si) => (
        <section key={s.id} id={s.id} className="section">
          <h2>
            <span className="section__num">
              {ch.num}-{si + 1}
            </span>
            {s.title}
          </h2>
          <Blocks blocks={s.blocks} quizKey={`${ch.id}:${s.id}`} />
        </section>
      ))}

      <section className="summary" aria-label="この章の要点">
        <h2><Star className="ui-icon" aria-hidden="true" /> この章の要点</h2>
        <ul>
          {ch.summary.map((s, i) => (
            <li key={i}>{renderInline(s, summarySeen)}</li>
          ))}
        </ul>
      </section>

      {chapterCases.length > 0 && part && (
        <section className="section chapter-cases" id="cases" aria-label={`第${part.num}部のケース演習`}>
          <h2>
            <PenLine className="ui-icon" aria-hidden="true" /> 第{part.num}部のケース演習
          </h2>
          <p className="muted">
            第{part.num}部「{part.title}」（{partRange}）を読み終えたところで取り組むケースです。自分の言葉で書いてから解答例と見比べましょう。記述はこの端末に保存されます。
          </p>
          {chapterCases.map((c) => (
            <CaseDetail key={c.id} id={c.id} />
          ))}
        </section>
      )}
      {refIds.length > 0 && (
        <section className="chapter-refs" aria-label="この章の参考文献">
          <h2>この章の参考文献</h2>
          <ol>
            {refIds.map((rid) => {
              const s = sources[rid]
              if (!s) return <li key={rid}>（{rid}: 出典データなし）</li>
              return (
                <li key={rid}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                  <span className="refs__meta">
                    {' '}
                    ― {s.publisher}
                    {s.note ? `（${s.note}）` : ''}。確認日 {s.accessed}
                  </span>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      <nav className="pager" aria-label="前後の章">
        {prev ? (
          <a className="pager__link pager__link--prev" href={href(`/ch/${prev.id}`)}>
            <span className="pager__dir">← 前の章</span>
            <span>
              第{prev.num}章 {prev.title}
            </span>
          </a>
        ) : (
          <a className="pager__link pager__link--prev" href={href('/')}>
            <span className="pager__dir">← ホーム</span>
            <span>この教材の案内</span>
          </a>
        )}
        {next ? (
          <a className="pager__link pager__link--next" href={href(`/ch/${next.id}`)}>
            <span className="pager__dir">次の章 →</span>
            <span>
              第{next.num}章 {next.title}
            </span>
          </a>
        ) : (
          <a className="pager__link pager__link--next" href={href('/books')}>
            <span className="pager__dir">次へ →</span>
            <span>参考書紹介</span>
          </a>
        )}
      </nav>
    </article>
  )
}
