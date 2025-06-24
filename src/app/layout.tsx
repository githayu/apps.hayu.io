import type { Metadata } from 'next'
import './globals.css'
// tailwindだとフォントのビルド時にエラーになるのでNextでロードしておく
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import React from 'react'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Hayu Apps',
  description: 'Hayu Apps',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ja">
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
