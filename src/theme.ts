import { createTheme, Direction } from '@mui/material/styles'

/** 移行前のBlueprintに合わせたシステムフォント */
const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')

/**
 * ダークモードの配色 (TablePlusのSilver Darkテーマに合わせる)
 * @see /Applications/Setapp/TablePlus.app/Contents/Resources/silver-dark.json
 */
const silverDark = {
  action: {
    selected: '#666E81',
  },
  background: {
    default: '#282C34',
    paper: '#303540',
  },
  divider: '#343A44',
  error: { main: '#EF4B60' },
  info: { main: '#00BBF9' },
  primary: { main: '#529BD8' },
  success: { main: '#558C3A' },
  text: {
    disabled: '#7E7E7E',
    primary: '#D5D5D5',
    secondary: '#B2B2B2',
  },
  warning: { main: '#F9B746' },
}

/**
 * OSのライト/ダーク設定に追従するテーマ
 * MARK: createAppTheme
 */
export const createAppTheme = (direction: Direction) =>
  createTheme({
    colorSchemes: {
      dark: {
        palette: silverDark,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    direction,
    shape: {
      borderRadius: 2,
    },
    typography: {
      button: {
        textTransform: 'none',
      },
      fontFamily,
    },
  })
