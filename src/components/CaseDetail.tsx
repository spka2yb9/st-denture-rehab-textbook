import { useState } from 'react'
import { cases } from '../content'
import { sources } from '../content/sources'
import { renderInline } from '../lib/markup'
import { load, save } from '../lib/storage'

type CaseState = { text: string; revealed: boolean; checks: boolean[] }

// 各部の最後の章末に埋め込むケース演習。見出しは章の階層（h2 = ケース演習の節）の下に収める。
export function CaseDetail({ id }: { id: string }) {
  const c = cases.find((x) => x.id === id)!
  const idx = cases.findIndex((x) => x.id === id)
  const [st, setSt] = useState<CaseState>(() => load<CaseState>(`case:${id}`, { text: '', revealed: false, checks: c.checklist.map(() => false) }))
  const update = (patch: Partial<CaseState>) => {
    const next = { ...st, ...patch }
    setSt(next)
    save(`case:${id}`, next)
  }
  const scenarioSeen = new Set<string>()
  const modelSeen = new Set<string>()

  return (
    <article className="case" id={`case-${id}`}>
      <div className="chapter__eyebrow">ケース {idx + 1}</div>
      <h3 className="case__title">{c.title}</h3>
      <div className="case__tags">
        {c.tags.map((t) => (
          <span key={t} className="chip chip--soft">
            {t}
          </span>
        ))}
      </div>

      <section className="case__scenario">
        <h4>場面</h4>
        {c.scenario.map((p, i) => (
          <p key={i}>{renderInline(p, scenarioSeen)}</p>
        ))}
      </section>

      <section className="case__question">
        <h4>設問</h4>
        <p>{renderInline(c.question, scenarioSeen)}</p>
        <label htmlFor={`answer-${id}`} className="case__label">
          あなたの記述（この端末に自動保存されます）
        </label>
        <textarea id={`answer-${id}`} className="case__textarea" rows={12} value={st.text} onChange={(e) => update({ text: e.target.value })} placeholder="評価 → 問題点 → 訓練計画 → 連携・報告 の順に書いてみましょう" />
        <div className="case__actions">
          {!st.revealed ? (
            <button type="button" className="btn btn--primary" onClick={() => update({ revealed: true })} disabled={st.text.trim().length === 0}>
              解答例を見る
            </button>
          ) : (
            <button type="button" className="btn btn--ghost" onClick={() => update({ revealed: false, checks: c.checklist.map(() => false) })}>
              解答例を隠してやり直す
            </button>
          )}
          {st.text.trim().length === 0 && !st.revealed && <span className="muted">まず自分の考えを書いてから解答例を開きましょう。</span>}
        </div>
      </section>

      {st.revealed && (
        <section className="case__compare">
          <h4>見比べる</h4>
          <div className="compare">
            <div className="compare__col">
              <h5>あなたの記述</h5>
              <div className="compare__box compare__box--mine">{st.text}</div>
            </div>
            <div className="compare__col">
              <h5>解答例</h5>
              <div className="compare__box">
                {c.model.map((m, i) => (
                  <div key={i} className="compare__block">
                    <div className="compare__heading">{m.heading}</div>
                    <p>{renderInline(m.text, modelSeen)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h5>自己採点チェックリスト</h5>
          <p className="muted">自分の記述に含まれていた観点にチェックを入れましょう。</p>
          <ul className="checklist">
            {c.checklist.map((item, i) => (
              <li key={i}>
                <label>
                  <input
                    type="checkbox"
                    checked={st.checks[i] ?? false}
                    onChange={(e) => {
                      const checks = [...st.checks]
                      checks[i] = e.target.checked
                      update({ checks })
                    }}
                  />
                  <span>{renderInline(item, false)}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="case__score">
            自己採点: {st.checks.filter(Boolean).length} / {c.checklist.length} 観点
          </div>
          {c.src && c.src.length > 0 && (
            <p className="quiz__src">
              関連する出典:{' '}
              {c.src.map((sid) => {
                const s = sources[sid]
                return s ? (
                  <a key={sid} href={s.url} target="_blank" rel="noopener noreferrer" className="chip">
                    {s.title}
                  </a>
                ) : null
              })}
            </p>
          )}
        </section>
      )}
    </article>
  )
}
