import type { FC } from 'react'
import { FigWorkflow } from './ch00'
import { figuresCh01 } from './ch01'
import { figuresCh02 } from './ch02'
import { figuresCh03 } from './ch03'
import { figuresCh04 } from './ch04'
import { figuresCh05 } from './ch05'
import { figuresCh06 } from './ch06'
import { figuresCh07 } from './ch07'
import { figuresCh08 } from './ch08'
import { figuresCh09 } from './ch09'
import { figuresCh10 } from './ch10'
import { figuresCh11 } from './ch11'
import { figuresCh12 } from './ch12'
import { figuresCh13 } from './ch13'

// 図の登録簿。コンテンツの { type: 'figure', id } から参照される。
export const figures: Record<string, FC> = {
  workflow: FigWorkflow,
  ...figuresCh01,
  ...figuresCh02,
  ...figuresCh03,
  ...figuresCh04,
  ...figuresCh05,
  ...figuresCh06,
  ...figuresCh07,
  ...figuresCh08,
  ...figuresCh09,
  ...figuresCh10,
  ...figuresCh11,
  ...figuresCh12,
  ...figuresCh13,
}
