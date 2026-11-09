import { BookOpen, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { books, chapters, recommended } from '../content'
import { RecommendedBooks } from '../components/RecommendedBooks'
import { href } from '../lib/router'

export function BooksPage() {
  useEffect(() => {
    document.title = '参考書紹介 ― 義歯とえんげの教科書'
  }, [])
  // おすすめの3冊は上にまとめて載せ、分野別の一覧からは外す
  const others = books.filter((b) => !recommended.some((r) => r.isbn === b.isbn))
  const areas = [...new Set(others.map((b) => b.area))]
  return (
    <div className="page">
      <div className="chapter__eyebrow">資料</div>
      <h1>参考書紹介</h1>
      <p>この教材の内容をさらに詳しく学ぶための書籍です。</p>
      <section className="books__picks" aria-labelledby="picks-title">
        <h2 id="picks-title">まず読みたいおすすめの3冊</h2>
        <p className="muted">歯科からの訪問でSTとして働く方に合う3冊を、読む順に並べました。</p>
        <RecommendedBooks />
      </section>
      <h2 className="books__others">そのほかの参考書（分野別）</h2>
      {areas.map((area) => (
        <section key={area} className="books__area">
          <h3>{area}</h3>
          <div className="book-list">
            {others
              .filter((b) => b.area === area)
              .map((b) => (
                <article key={b.title} className="book">
                  <h4 className="book__title"><BookOpen className="ui-icon" aria-hidden="true" /> {b.title}</h4>
                  <p className="book__meta">
                    {b.authors} ／ {b.publisher} ／ {b.edition}
                    {b.isbn ? ` ／ ISBN ${b.isbn}` : ''}
                  </p>
                  <p>{b.summary}</p>
                  <p className="book__chapters">
                    関連する章:{' '}
                    {b.chapters.map((cid) => {
                      const ch = chapters.find((c) => c.id === cid)
                      return ch ? (
                        <a key={cid} className="chip" href={href(`/ch/${cid}`)}>
                          第{ch.num}章
                        </a>
                      ) : null
                    })}
                  </p>
                  <a className="btn" href={b.url} target="_blank" rel="noopener noreferrer">
                    書籍ページを開く <ExternalLink className="ui-icon" aria-hidden="true" />
                  </a>
                  <span className="muted book__accessed"> 確認日 {b.accessed}</span>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
