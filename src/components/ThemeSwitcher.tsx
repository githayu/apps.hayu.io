import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { useTranslations } from 'next-intl'

/** 押すたびに切り替わる配色モードの順番と、各モードのアイコン・翻訳キー */
const modes = [
  { icon: <SettingsBrightnessIcon />, labelKey: 'themeSystem', value: 'system' },
  { icon: <LightModeIcon />, labelKey: 'themeLight', value: 'light' },
  { icon: <DarkModeIcon />, labelKey: 'themeDark', value: 'dark' },
] as const

/**
 * 配色をOS設定・ライト・ダークの順に切り替えるトグルボタン
 * 初回描画では mode が未確定なので、サーバーと同じ「OS設定」として表示する
 * MARK: ThemeSwitcher
 */
export const ThemeSwitcher = () => {
  const t = useTranslations('Layout')
  const { mode, setMode } = useColorScheme()

  const index = Math.max(
    modes.findIndex(({ value }) => value === mode),
    0
  )
  const current = modes[index]
  const label = `${t('theme')}: ${t(current.labelKey)}`

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        color="inherit"
        onClick={() => setMode(modes[(index + 1) % modes.length].value)}
      >
        {current.icon}
      </IconButton>
    </Tooltip>
  )
}
