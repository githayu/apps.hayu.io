import TranslateIcon from '@mui/icons-material/Translate'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { usePathname, useRouter } from '../i18n/navigation'
import { localeNames, routing } from '../i18n/routing'

/**
 * 表示言語の切替メニュー
 * MARK: LocaleSwitcher
 */
export const LocaleSwitcher = () => {
  const t = useTranslations('Layout')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  return (
    <>
      <Tooltip title={t('language')}>
        <IconButton
          aria-label={t('language')}
          color="inherit"
          onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
      >
        {routing.locales.map((value) => (
          <MenuItem
            key={value}
            lang={value}
            onClick={() => {
              setAnchorEl(null)
              router.replace(pathname, { locale: value })
            }}
            selected={value === locale}
          >
            {localeNames[value]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
