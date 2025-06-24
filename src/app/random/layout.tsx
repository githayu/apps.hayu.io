import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ランダム文字列ジェネレーター',
  description: 'Hayu Apps',
}

export default function RandomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}