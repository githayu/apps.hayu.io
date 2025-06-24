'use client'

import cx from 'classnames'
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import { useMode } from '../hooks'

export default function ClientLayout({ children }: React.PropsWithChildren) {
  const [isDark] = useMode()

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9MW6KE1DYC" />
      <Script id="ga">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9MW6KE1DYC');
        `}
      </Script>
      <Script
        async
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3203287558334935"
      />

      <body
        className={cx('bg-gray-100 dark:bg-gray-800 min-h-screen', {
          'bp5-dark': isDark,
        })}
      >
        {children}

        <footer className="text-center py-2">
          © 2012-{new Date().getFullYear()}{' '}
          <Link href="https://hayu.io">hayu.io</Link>
        </footer>
      </body>
    </>
  )
}