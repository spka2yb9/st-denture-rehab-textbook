import { Pencil } from 'lucide-react'
import { useState } from 'react'
import type { QuizItem } from '../content/types'
import { plainText, renderInline } from '../lib/markup'
import { load, save } from '../lib/storage'
import { TermLink } from './SourceCard'
import { sources } from '../content/sources'

type Answers = Record<number, number> // 問題番号 → 選んだ選択肢

export function Quiz({ items, storageKey }: { items: QuizItem[]; storageKey: string }) {
  const [answers, setAnswers] = useState<Answers>(() => load<Answers>(`quiz:${storageKey}`, {}))

  const choose = (qi: number, ci: number) => {
    if (answers[qi] !== undefined) return
    const next = { ...answers, [qi]: ci }
    setAnswers(next)
    save(`quiz:${storageKey}`, next)
  }
  const reset = () => {
    setAnswers({})
    save(`quiz:${storageKey}`, {})
  }

  const answered = Object.keys(answers).length
  const correct = items.filter((it, i) => answers[i] === it.answer).length

  return (
    <section className="quiz" aria-label="確認クイズ">
      <div className="quiz__head">
        <span className="quiz__badge"><Pencil className="ui-icon" aria-hidden="true" /> 確認クイズ</span>
        <span className="quiz__score">
          {answered}/{items.length} 問回答 ・ 正解 {correct}
        </span>
      </div>
      {items.map((it, qi) => {
        const chosen = answers[qi]
        const done = chosen !== undefined
        return (
          <div key={qi} className="quiz__item">
            <p className="quiz__q">
              <span className="quiz__num">Q{qi + 1}</span> {renderInline(it.q, false)}
            </p>
            <div className="quiz__choices" role="group" aria-label={`問題${qi + 1}の選択肢`}>
              {it.choices.map((c, ci) => {
                let cls = 'quiz__choice'
                if (done) {
                  if (ci === it.answer) cls += ' is-correct'
                  else if (ci === chosen) cls += ' is-wrong'
                }
                return (
                  <button key={ci} type="button" className={cls} onClick={() => choose(qi, ci)} disabled={done} aria-pressed={chosen === ci}>
                    <span className="quiz__letter">{'ABCD'[ci]}</span>
                    <span>{plainText(c)}</span>
                  </button>
                )
              })}
            </div>
            {done && (
              <div className={`quiz__explain ${chosen === it.answer ? 'is-correct' : 'is-wrong'}`}>
                <div className="quiz__verdict">{chosen === it.answer ? '正解！' : `不正解。正解は ${'ABCD'[it.answer]} です。`}</div>
                <p>{renderInline(it.explain)}</p>
                {it.src && it.src.length > 0 && (
                  <p className="quiz__src">
                    出典:{' '}
                    {it.src.map((id) => (
                      <TermLink key={id} sourceIds={[id]}>
                        {sources[id]?.title ?? id}
                      </TermLink>
                    ))}
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
      {answered > 0 && (
        <button type="button" className="btn btn--ghost" onClick={reset}>
          このクイズをやり直す
        </button>
      )}
    </section>
  )
}
