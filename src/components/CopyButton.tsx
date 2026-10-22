import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'
import { SxProps, Theme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'

type CopyButtonProps = {
  /** ボタンのラベル */
  label: string
  sx?: SxProps<Theme>
  /** コピーする文字列 */
  text: string
}

/** コピー完了の表示を戻すまでの時間 (ミリ秒) */
const COPIED_DURATION = 2000

/**
 * 文字列をクリップボードにコピーするボタン
 * コピー直後はしばらくチェックアイコンを表示し、失敗 (非HTTPSや権限拒否) した場合はアイコンを変えない
 * MARK: CopyButton
 */
export const CopyButton = ({ label, sx, text }: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timer = setTimeout(() => setCopied(false), COPIED_DURATION)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          aria-label={label}
          disabled={!text}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text)
              setCopied(true)
            } catch (error) {
              console.error('コピーに失敗しました:', error)
            }
          }}
          size="small"
          sx={sx}
        >
          {copied ? (
            <CheckIcon fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  )
}
