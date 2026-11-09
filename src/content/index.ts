import type { Chapter } from './types'
import { ch00 } from './chapters/ch00'
import { ch01 } from './chapters/ch01'
import { ch02 } from './chapters/ch02'
import { ch03 } from './chapters/ch03'
import { ch04 } from './chapters/ch04'
import { ch05 } from './chapters/ch05'
import { ch06 } from './chapters/ch06'
import { ch07 } from './chapters/ch07'
import { ch08 } from './chapters/ch08'
import { ch09 } from './chapters/ch09'
import { ch10 } from './chapters/ch10'
import { ch11 } from './chapters/ch11'
import { ch12 } from './chapters/ch12'
import { ch13 } from './chapters/ch13'

export { cases } from './cases'
export { books, recommended } from './books'
export { glossary } from './glossary'

// 部の構成。ケース演習は各部の最後の章の末尾に置く
export const parts: { num: string; title: string; ids: string[] }[] = [
  { num: 'I', title: '基礎知識', ids: ['ch00', 'ch01', 'ch02', 'ch03', 'ch04', 'ch05'] },
  { num: 'II', title: '評価', ids: ['ch06', 'ch07', 'ch08'] },
  { num: 'III', title: '訓練', ids: ['ch09', 'ch10', 'ch11'] },
  { num: 'IV', title: '応用と実践', ids: ['ch12', 'ch13'] },
]

// 学習順に並べた章の一覧
export const chapters: Chapter[] = [ch00, ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12, ch13]
