import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: Locale }>
}

/**
 * 言語ごとのページタイトル
 * MARK: generateMetadata
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Random' })

  return {
    description: 'Hayu Apps',
    title: t('title'),
  }
}

export default function RandomLayout({ children }: React.PropsWithChildren) {
  return children
}
