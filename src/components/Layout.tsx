import { BookMarked, HeartPulse, House, Library, Menu, PenLine, Search, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { cases, chapters, parts } from '../content'
import { href, navigate, type Route } from '../lib/router'

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const currentChapter = route.path[0] === 'ch' ? route.path[1] : undefined
  const top = route.path[0] ?? ''

  useEffect(() => setMenuOpen(false), [route])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  const nav = (
    <nav className="toc" aria-label="目次">
      <a className={`toc__link toc__link--top ${top === '' ? 'is-current' : ''}`} href={href('/')}>
        <House className="ui-icon" aria-hidden="true" /> ホーム
      </a>
      {parts.map((p) => {
        const last = p.ids.at(-1)!
        const n = cases.filter((c) => c.placementChapterId === last).length
        return (
        <div key={p.num} className="toc__part">
          <div className="toc__part-title">第{p.num}部 {p.title}</div>
          {p.ids.map((id) => {
            const ch = chapters.find((c) => c.id === id)
            if (!ch) return null
            return (
              <a key={id} className={`toc__link ${currentChapter === id ? 'is-current' : ''}`} href={href(`/ch/${id}`)} aria-current={currentChapter === id ? 'page' : undefined}>
                <span className="toc__num">{ch.num}</span>
                <span>{ch.title}</span>
              </a>
            )
          })}
          {n > 0 && (
            <a className="toc__link toc__link--case" href={href(`/ch/${last}/cases`)}>
              <span className="toc__num"><PenLine className="ui-icon" aria-hidden="true" /></span>
              <span>第{p.num}部のケース演習（{n}題）</span>
            </a>
          )}
        </div>
        )
      })}
      <div className="toc__part">
        <div className="toc__part-title">資料</div>
        <a className={`toc__link ${top === 'books' ? 'is-current' : ''}`} href={href('/books')}>
          <span className="toc__num"><Library className="ui-icon" aria-hidden="true" /></span>
          <span>参考書紹介</span>
        </a>
        <a className={`toc__link ${top === 'refs' ? 'is-current' : ''}`} href={href('/refs')}>
          <span className="toc__num"><BookMarked className="ui-icon" aria-hidden="true" /></span>
          <span>用語集・参考文献</span>
        </a>
      </div>
    </nav>
  )

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header className="header">
        <button type="button" className="icon-btn header__menu" aria-label="目次を開く" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <Menu className="ui-icon" aria-hidden="true" />
        </button>
        <a className="header__brand" href={href('/')} aria-label="義歯とえんげの教科書（ホーム）">
          <span className="header__logo" aria-hidden="true">
            <HeartPulse className="ui-icon" aria-hidden="true" />
          </span>
          <span className="header__title">義歯とえんげの教科書</span>
        </a>
        <form className="header__search" role="search" onSubmit={submit}>
          <label htmlFor="search-input" className="visually-hidden">
            教材内を検索
          </label>
          <input id="search-input" type="search" placeholder="検索（ひらがなでも可）" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="submit" className="icon-btn" aria-label="検索">
            <Search className="ui-icon" aria-hidden="true" />
          </button>
        </form>
      </header>

      <div className="shell">
        <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
          <div className="sidebar__head">
            <span>目次</span>
            <button type="button" className="icon-btn" aria-label="目次を閉じる" onClick={() => setMenuOpen(false)}>
              <X className="ui-icon" aria-hidden="true" />
            </button>
          </div>
          {nav}
        </aside>
        {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
        <main id="main" className="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  )
}
