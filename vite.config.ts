import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 公開先のサブパス（GitHub Pages のプロジェクトサイトなど）に合わせて
// 環境変数 BASE_PATH を指定できます。例: BASE_PATH=/st-denture-rehab-textbook/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? '/',
})
