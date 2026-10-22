import type { Metadata, Viewport } from 'next'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { GoogleAnalytics } from '@next/third-parties/google'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React from 'react'
import { routing, rtlLocales } from '../../i18n/routing'
import ClientLayout from '../ClientLayout'

type Props = React.PropsWithChildren<{
  params: Promise<{ locale: string }>
}>

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
}

/**
 * 全言語のページを静的生成する
 * MARK: generateStaticParams
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * 言語ごとのサイト情報
 * MARK: generateMetadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    description: t('description'),
    title: t('title'),
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const direction = rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  return (
    <html dir={direction} lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3203287558334935"
        />
      </head>

      <body>
        <InitColorSchemeScript attribute="class" />

        <NextIntlClientProvider>
          <ClientLayout direction={direction} key={locale}>
            {children}
          </ClientLayout>
        </NextIntlClientProvider>
      </body>

      <GoogleAnalytics gaId="G-9MW6KE1DYC" />
    </html>
  )
}
