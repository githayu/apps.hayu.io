import { permanentRedirect } from 'next/navigation'

/**
 * 制作物の一覧はhayu.ioに移したので、トップページはそちらへ転送する
 * MARK: Page
 */
export default function Page() {
  permanentRedirect('https://hayu.io/#works')
}
