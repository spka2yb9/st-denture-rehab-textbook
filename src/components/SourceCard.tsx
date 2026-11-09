import { BookOpen, ExternalLink, X } from 'lucide-react'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { glossary } from '../content/glossary'
import { chapters } from '../content'
import { renderInline } from '../lib/markup'
import { sources } from '../content/sources'
import type { Source } from '../content/types'

// 本文の語句をタップしたときに開くカード。
//   出典カード: {{語句|sourceId}} から。資料名・発行者・確認日・参照元リンク
//   用語解説カード: 用語集の語から。読み・定義（用語集と同じ文）・関連する章
// sample: ホームの説明文から開いた見本のカード（サンプルである旨を表示する）
type Card = ({ kind: 'sources'; ids: string[] } | { kind: 'term'; term: string }) & { sample?: boolean }
type Ctx = { open: (card: Card) => void }
const CardCtx = createContext<Ctx>({ open: () => {} })

export function SourceProvider({ children }: { children: ReactNode }) {
  const [card, setCard] = useState<Card | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (card && !d.open) d.showModal()
    if (!card && d.open) d.close()
  }, [card])

  const term = card?.kind === 'term' ? glossary.find((g) => g.term === card.term) : undefined
  const ids = card?.kind === 'sources' ? card.ids : []
  const list = ids.map((id) => sources[id]).filter((s): s is Source => Boolean(s))
  const missing = ids.filter((id) => !sources[id])
  const termChapter = term?.chapter ? chapters.find((c) => c.id === term.chapter) : undefined
  const close = () => setCard(null)

  return (
    <CardCtx.Provider value={{ open: setCard }}>
      {children}
      <dialog
        ref={ref}
        className={`source-dialog ${term ? 'source-dialog--term' : ''}`}
        aria-label={term ? `用語解説: ${term.term}` : '出典'}
        onClose={close}
        onClick={(e) => {
          if (e.target === ref.current) close()
        }}
      >
        <div className="source-dialog__body">
          <div className="source-dialog__head">
            <span className="source-dialog__eyebrow">
              {term ? '用語解説' : '参照元'}
              {card?.sample && <span className="sample-badge">サンプル</span>}
            </span>
            <button type="button" className="icon-btn" onClick={close} aria-label="閉じる">
              <X className="ui-icon" aria-hidden="true" />
            </button>
          </div>
          {card?.sample && (
            <p className="source-dialog__sample">
              これは見本です。本文で同じ見た目の語句をタップすると、このような{term ? '用語解説' : '出典'}のカードが開きます。
            </p>
          )}
          {term && (
            <article className="source-item source-item--term">
              <h3 className="source-item__title">{term.term}</h3>
              {term.reading && <p className="source-item__meta">{term.reading}</p>}
              <p className="source-item__def">{renderInline(term.def, false)}</p>
              {termChapter &&
                (location.hash.startsWith(`#/ch/${termChapter.id}`) ? (
                  <p className="source-item__meta">この章で解説しています。</p>
                ) : (
                  <a className="btn" href={`#/ch/${termChapter.id}`} onClick={close}>
                    <BookOpen className="ui-icon" aria-hidden="true" /> 第{termChapter.num}章 {termChapter.title}
                  </a>
                ))}
            </article>
          )}
          {list.map((s) => (
            <article key={s.id} className="source-item">
              <h3 className="source-item__title">{s.title}</h3>
              <p className="source-item__meta">
                {s.publisher}
                {s.note ? ` ・ ${s.note}` : ''}
              </p>
              <p className="source-item__meta">確認日: {s.accessed}</p>
              <a className="btn btn--primary" href={s.url} target="_blank" rel="noopener noreferrer">
                参照元を開く <ExternalLink className="ui-icon" aria-hidden="true" />
              </a>
            </article>
          ))}
          {missing.length > 0 && <p className="source-item__meta">（出典データが見つかりません: {missing.join(', ')}）</p>}
        </div>
      </dialog>
    </CardCtx.Provider>
  )
}

// 出典リンク（点線の下線 + ⁺）
export function TermLink({ sourceIds, children, sample }: { sourceIds: string[]; children: ReactNode; sample?: boolean }) {
  const { open } = useContext(CardCtx)
  const valid = sourceIds.filter((id) => sources[id])
  return (
    <button type="button" className="term" onClick={() => open({ kind: 'sources', ids: sourceIds, sample })} title={valid.length ? `出典: ${valid.map((id) => sources[id].title).join(' / ')}` : '出典を見る'}>
      {children}
      <span className="term__mark" aria-hidden="true">
        ⁺
      </span>
    </button>
  )
}

// 用語解説リンク（ミント色の波線）
export function GlossaryLink({ term, children, sample }: { term: string; children: ReactNode; sample?: boolean }) {
  const { open } = useContext(CardCtx)
  return (
    <button type="button" className="gloss" onClick={() => open({ kind: 'term', term, sample })} title={`用語解説: ${term}`}>
      {children}
    </button>
  )
}
