// 教材コンテンツのデータ型

// 出典。本文中の {{語句|sourceId}} から参照される
export type Source = {
  id: string
  title: string
  publisher: string
  url: string
  accessed: string // 参照日 YYYY-MM-DD
  note?: string // 版・発行年・何を裏付ける資料か
}

export type QuizItem = {
  q: string
  choices: string[]
  answer: number // choices の添字
  explain: string
  src?: string[] // sourceId
}

// 本文中のインライン記法:
//   {{表示語句|sourceId}}  → タップで出典カードが開く
//   ==強調したい語句==      → 蛍光マーカー風の強調
//   「\n」                   → 改行（callout 内など）
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'note'; title?: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'figure'; id: string; caption: string; desc: string }
  | { type: 'quiz'; items: QuizItem[] }

export type Section = {
  id: string
  title: string
  blocks: Block[]
}

export type Chapter = {
  id: string // ルーティングに使う。例: 'ch01'
  num: string // 表示用の章番号。例: '1'
  title: string
  lead: string // 章の冒頭で「この章でわかること」として表示
  prereq?: string[] // 前提となる章の id
  sections: Section[]
  summary: string[] // 章末の要点
}

export type CaseStudy = {
  placementChapterId: string
  id: string
  title: string
  tags: string[]
  scenario: string[] // 段落ごと
  question: string
  model: { heading: string; text: string }[] // 解答例（評価→問題点→訓練計画→連携・報告 など）
  checklist: string[] // 自己採点の観点
  src?: string[]
}

export type Book = {
  title: string
  authors: string
  publisher: string
  edition: string // 版・発行年
  isbn?: string
  url: string
  accessed: string
  summary: string
  chapters: string[] // 対応する章 id
  area: string
}

export type GlossaryItem = {
  term: string
  reading?: string
  def: string
  chapter?: string
}
