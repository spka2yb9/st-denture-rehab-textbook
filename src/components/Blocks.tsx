import { Lightbulb, NotebookPen, Search, TriangleAlert, X } from 'lucide-react'
import { useEffect, useState, type FC } from 'react'
import type { Block } from '../content/types'
import { plainText, renderInline } from '../lib/markup'
import { figures } from '../figures'
import { Quiz } from './Quiz'

// 図。スマホでは縮小されて読みにくいため、タップで拡大表示（横スクロール可）できる
function Figure({ id, caption, desc, seen }: { id: string; caption: string; desc: string; seen: Set<string> }) {
  const [zoom, setZoom] = useState(false)
  const Fig = figures[id] as FC | undefined
  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false)
    addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])
  return (
    <figure className="figure" id={`fig-${id}`}>
      {/* 図そのものをタップしても拡大できる（スマホでは文字が小さくなるため）。キーボード操作は「拡大」ボタンで行う */}
      <div className={`figure__canvas ${Fig ? 'figure__canvas--zoomable' : ''}`} onClick={Fig ? () => setZoom(true) : undefined}>
        {Fig ? <Fig /> : <p className="figure__missing">（図 {id} は準備中です）</p>}
      </div>
      {Fig && <p className="figure__hint">図をタップすると拡大して見られます</p>}
      <figcaption>
        <span className="figure__label">図</span> {renderInline(caption, seen)}
        {Fig && (
          <button type="button" className="figure__zoom" onClick={() => setZoom(true)}>
            <Search className="ui-icon" aria-hidden="true" /> 拡大
          </button>
        )}
        <span className="figure__desc">{renderInline(desc, seen)}</span>
      </figcaption>
      {zoom && Fig && (
        <div className="zoom" role="dialog" aria-modal="true" aria-label={`図の拡大表示: ${plainText(caption)}`} onClick={() => setZoom(false)}>
          <div className="zoom__bar">
            <span>{plainText(caption)}</span>
            <button type="button" className="icon-btn" aria-label="閉じる" onClick={() => setZoom(false)}>
              <X className="ui-icon" aria-hidden="true" />
            </button>
          </div>
          <div className="zoom__scroll" onClick={(e) => e.stopPropagation()}>
            <div className="zoom__canvas">
              <Fig />
            </div>
          </div>
        </div>
      )}
    </figure>
  )
}

export function Blocks({ blocks, quizKey }: { blocks: Block[]; quizKey: string }) {
  let quizIndex = 0
  // 節の中で各用語の初出だけを用語解説リンクにする
  const seen = new Set<string>()
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{renderInline(b.text, seen)}</p>
          case 'h3':
            return <h3 key={i}>{renderInline(b.text, false)}</h3>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it, seen)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it, seen)}</li>
                ))}
              </ol>
            )
          case 'callout':
            return (
              <aside key={i} className={`callout callout--${b.tone}`}>
                <div className="callout__title">
                  {b.tone === 'tip' ? <Lightbulb className="ui-icon" aria-hidden="true" /> : b.tone === 'warn' ? <TriangleAlert className="ui-icon" aria-hidden="true" /> : <NotebookPen className="ui-icon" aria-hidden="true" />} {b.title ?? (b.tone === 'tip' ? 'ポイント' : b.tone === 'warn' ? '注意' : 'メモ')}
                </div>
                <div>{renderInline(b.text, seen)}</div>
              </aside>
            )
          case 'table': {
            // スマホ用カードとPC用の表は片方だけ表示されるので、同じ初出状態から描画する
            const cardSeen = new Set(seen)
            return (
              <div key={i} className="responsive-table">
                {b.head.length > 2 && (
                  <div className="table-cards">
                    {b.caption && <p className="table-cards__caption">{b.caption}</p>}
                    {b.rows.map((row, rowIndex) => (
                      <dl className="table-cards__row" key={rowIndex}>
                        {b.head.map((heading, columnIndex) => (
                          <div key={columnIndex}>
                            <dt>{renderInline(heading, false)}</dt>
                            <dd>{renderInline(row[columnIndex] ?? '', cardSeen)}</dd>
                          </div>
                        ))}
                      </dl>
                    ))}
                  </div>
                )}
                <div className={`table-wrap ${b.head.length > 2 ? "table-wrap--wide" : "table-wrap--compact"}`}>
                <table>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          {renderInline(h, false)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>{renderInline(c, seen)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )
          }
          case 'figure':
            return <Figure key={i} id={b.id} caption={b.caption} desc={b.desc} seen={seen} />
          case 'quiz': {
            const key = `${quizKey}:${quizIndex++}`
            return <Quiz key={i} items={b.items} storageKey={key} />
          }
        }
      })}
    </>
  )
}
