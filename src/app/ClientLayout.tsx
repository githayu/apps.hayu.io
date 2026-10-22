'use client'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiLink from '@mui/material/Link'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { Direction, ThemeProvider } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import rtlPlugin from '@mui/stylis-plugin-rtl'
import Typography from '@mui/material/Typography'
import React from 'react'
import { prefixer } from 'stylis'
import { Link } from '../i18n/navigation'
import { createAppTheme } from '../theme'

type Props = React.PropsWithChildren<{
  /** 文字を書く向き */
  direction: Direction
}>

export default function ClientLayout({ children, direction }: Props) {
  const theme = React.useMemo(() => createAppTheme(direction), [direction])
  const isRtl = direction === 'rtl'

  return (
    <AppRouterCacheProvider
      options={{
        key: isRtl ? 'muirtl' : 'mui',
        stylisPlugins: isRtl ? [prefixer, rtlPlugin] : undefined,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Stack sx={{ minHeight: '100dvh' }}>
          <Box component="main" sx={{ flex: 1 }}>
            {children}
          </Box>

          <Stack
            component="footer"
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              py: 1,
            }}
            useFlexGap
          >
            <Typography component="span">
              © 2012-{new Date().getFullYear()}{' '}
              <MuiLink component={Link} href="/" underline="hover">
                hayu.io
              </MuiLink>
            </Typography>
          </Stack>
        </Stack>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
