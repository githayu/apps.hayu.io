import React from 'react'

export const useMode = () => {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')

    setIsDark(darkMode.matches)

    const onChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    darkMode.addEventListener('change', onChange)

    return () => {
      darkMode.removeEventListener('change', onChange)
    }
  }, [])

  return [isDark]
}
