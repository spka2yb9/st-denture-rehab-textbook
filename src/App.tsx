import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { SourceProvider } from './components/SourceCard'
import { useRoute } from './lib/router'
import { load, save, type ReadingPosition } from './lib/storage'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { BooksPage } from './pages/BooksPage'
import { RefsPage } from './pages/RefsPage'
import { SearchPage } from './pages/SearchPage'

// 初回表示: ハッシュが無く、前回の読書位置があれば復帰する（スクロールは描画後に行う）
let pendingY: number | null = null
{
  const pos = load<ReadingPosition | null>('position', null)
  if ((!location.hash || location.hash === '#/' || location.hash === '#') && pos && pos.hash.startsWith('#/ch/')) {
    location.hash = pos.hash
    pendingY = pos.y
  }
}

export default function App() {
  const route = useRoute()
  const top = route.path[0] ?? ''

  // 章ページでは読書位置を保存する
  useEffect(() => {
    if (top !== 'ch') return
    let t: number | undefined
    const onScroll = () => {
      clearTimeout(t)
      t = setTimeout(() => save<ReadingPosition>('position', { hash: location.hash, y: scrollY, at: new Date().toISOString() }), 300)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [top, route])

  // ページ遷移時は先頭へ（節アンカーは ChapterPage 側でスクロール）。初回は保存位置へ。
  useEffect(() => {
    if (pendingY !== null) {
      const y = pendingY
      pendingY = null
      requestAnimationFrame(() => scrollTo({ top: y, behavior: 'instant' }))
      return
    }
    // 「戻る」「進む」で来たときは、その項目で読んでいた位置へ戻す
    if (route.restoreY !== undefined) {
      const y = route.restoreY
      requestAnimationFrame(() => scrollTo({ top: y, behavior: 'instant' }))
      return
    }
    if (top === 'ch' && route.path[2]) return
    scrollTo({ top: 0, behavior: 'instant' })
  }, [route, top])

  let page
  switch (top) {
    case 'ch':
      page = <ChapterPage id={route.path[1]} sectionId={route.restoreY === undefined ? route.path[2] : undefined} />
      break
    case 'books':
      page = <BooksPage />
      break
    case 'refs':
      page = <RefsPage />
      break
    case 'search':
      page = <SearchPage q={route.query.get('q') ?? ''} />
      break
    default:
      page = <HomePage />
  }

  return (
    <SourceProvider>
      <Layout route={route}>{page}</Layout>
    </SourceProvider>
  )
}
