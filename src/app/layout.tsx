'use client'

import './globals.css'
import cx from 'classnames'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import { useMode } from '../hooks'

export default function RootLayout({ children }: React.PropsWithChildren) {
  const [isDark] = useMode()

  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9MW6KE1DYC"
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9MW6KE1DYC');
        `}
      </Script>

      <body
        className={cx(
          'bg-gray-100 dark:bg-gray-800 grid grid-rows-[1fr_auto] min-h-screen',
          { 'bp4-dark': isDark }
        )}
      >
        {children}

        <footer className="text-center py-2">
          © 2012-{new Date().getFullYear()}{' '}
          <Link href="https://hayu.io">Hayu</Link>
        </footer>
      </body>
    </html>
  )
}
