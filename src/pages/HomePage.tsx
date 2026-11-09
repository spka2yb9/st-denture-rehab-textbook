import { Handshake, Library, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { chapters } from '../content'
import { href } from '../lib/router'
import { renderInline } from '../lib/markup'
import { load, type ReadingPosition } from '../lib/storage'
import { RecommendedBooks } from '../components/RecommendedBooks'
import { GlossaryLink, TermLink } from '../components/SourceCard'

// ホームに挙げる主な参照資料（{{表示名|sourceId}} で出典カードを開く）
const KEY_SOURCES = [
  '{{日本摂食嚥下リハビリテーション学会「摂食嚥下障害の評価 2019」|jsdr-assessment-2019}}',
  '{{日本摂食嚥下リハビリテーション学会「訓練法のまとめ（2014版）」|jsdr-training-2014}}',
  '{{日本摂食嚥下リハビリテーション学会「嚥下調整食分類2021」|jsdr-class-2021}}',
  '{{日本補綴歯科学会「有床義歯補綴診療のガイドライン」|jpds-denture-gl}}',
  '{{日本歯科医学会「口腔機能低下症に関する基本的な考え方」|jads-ohf-2026}}',
  '{{日本リハビリテーション医学会「安全管理・推進のためのガイドライン（案）」|jarm-safety-gl}}',
  '{{言語聴覚士法（e-Gov法令検索）|st-law}}',
]

export function HomePage() {
  const pos = load<ReadingPosition | null>('position', null)
  const posChapter = pos ? chapters.find((c) => pos.hash.startsWith(`#/ch/${c.id}`)) : undefined
  useEffect(() => {
    document.title = '義歯とえんげの教科書 ― 訪問ST向け学習サイト'
  }, [])

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow">歯科訪問リハビリに携わる言語聴覚士のための</p>
          <h1>
            義歯と<mark>えんげ</mark>の教科書
          </h1>
          <p className="hero__lead">
            新しい義歯が「噛める・飲み込める・話せる」道具として定着しているかを確かめ、必要な訓練につなげる。そのための嚥下・歯科・嚥下調整食・高次脳機能の知識を、基礎から学び直せる読み物です。
          </p>
          <div className="hero__actions">
            {posChapter ? (
              <a className="btn btn--primary" href={pos!.hash}>
                続きから読む（第{posChapter.num}章）
              </a>
            ) : (
              <a className="btn btn--primary" href={href('/ch/ch00')}>
                はじめから読む
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="home__policy" aria-labelledby="policy-title">
        <h2 id="policy-title">この教材の方針</h2>
        <div className="policy-grid">
          <div className="callout callout--note policy">
            <div className="callout__title">
              <ShieldCheck className="ui-icon" aria-hidden="true" /> 医学的な内容は、根拠を示して書いています
            </div>
            <p>
              嚥下・歯科・栄養・リスク管理の内容は、学会のガイドラインやマニュアル、公的機関の資料、論文などをもとに書き、本文の該当箇所に出典を付けています。<TermLink sourceIds={['jsdr-assessment-2019']} sample>点線と ⁺ が付いた語句</TermLink>
              をタップすると、資料名・発行元・確認日と参照元へのリンクが開きます。<GlossaryLink term="頸部聴診" sample>ミント色の波線の語</GlossaryLink>はタップで用語解説が開きます。ここにある2つの語句は、タップするとカードの<span className="sample-badge">サンプル</span>が開きます。
            </p>
          </div>
          <div className="callout callout--tip policy">
            <div className="callout__title">
              <Handshake className="ui-icon" aria-hidden="true" /> 手順は勤務先に合わせ、根拠をもって提案する
            </div>
            <p>検査・訓練の進め方や中止の目安、報告の書式は、勤務先の方針やご本人・家庭の状況で変わります。教材の手順は一例として参考にしてください。</p>
            <ul>
              <li>医師・歯科医師の指示と勤務先の手順に従う</li>
              <li>教材の根拠と違うときは、出典を添えて歯科医師に相談・提案する</li>
              <li>調整した内容と理由は記録して共有する</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home__books" aria-labelledby="books-title">
        <h2 id="books-title">全体像をつかんだら、この3冊で深める</h2>
        <p>
          この教材で業務の全体像と根拠のありかをつかんだら、次は体系的な成書で学びを深めましょう。歯科からの訪問でSTとして働く方に合う3冊を、読む順に選びました。他のおすすめの参考書は<a href={href('/books')}>参考書紹介</a>に載っています。
        </p>
        <RecommendedBooks />
        <p>
          <a className="btn" href={href('/books')}>
            <Library className="ui-icon" aria-hidden="true" /> ほかの参考書も見る（参考書紹介）
          </a>
        </p>
      </section>

      <section className="home__sources" aria-labelledby="sources-title">
        <h2 id="sources-title">主に参照している資料</h2>
        <p className="muted">タップすると出典カード（資料名・発行元・確認日・参照元へのリンク）が開きます。</p>
        <ul className="policy__sources">
          {KEY_SOURCES.map((t) => (
            <li key={t}>{renderInline(t, false)}</li>
          ))}
        </ul>
        <p className="muted">
          ほかの資料も含めた一覧と確認日は<a href={href('/refs')}>用語集・参考文献</a>にあります。基準値や制度は改定されることがあるため、重要な判断の前には参照元で最新版を確かめてください。
        </p>
      </section>
    </div>
  )
}
