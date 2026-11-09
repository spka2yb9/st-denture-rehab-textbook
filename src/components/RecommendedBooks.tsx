import { BookOpen, ExternalLink } from 'lucide-react'
import { books, chapters, recommended } from '../content'
import { href } from '../lib/router'

// おすすめの3冊（読む順）。ホームと参考書紹介で同じ見た目で目立たせる
export function RecommendedBooks() {
  return (
    <ol className="picks">
      {recommended.map(({ isbn, step, why }, i) => {
        const b = books.find((x) => x.isbn === isbn)
        if (!b) return null
        return (
          <li key={isbn} className="book book--pick">
            <p className="book__step">
              <span className="book__rank">{i + 1}冊目</span>
              {step}
            </p>
            <h3 className="book__title">
              <BookOpen className="ui-icon" aria-hidden="true" /> {b.title}
            </h3>
            <p className="book__meta">
              {b.authors} ／ {b.publisher} ／ {b.edition}
            </p>
            <p>{why}</p>
            <p className="book__chapters">
              この教材の関連章:{' '}
              {b.chapters.map((cid) => {
                const ch = chapters.find((c) => c.id === cid)
                return ch ? (
                  <a key={cid} className="chip" href={href(`/ch/${cid}`)}>
                    第{ch.num}章
                  </a>
                ) : null
              })}
            </p>
            <a className="btn btn--primary" href={b.url} target="_blank" rel="noopener noreferrer">
              書籍ページを開く <ExternalLink className="ui-icon" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ol>
  )
}
