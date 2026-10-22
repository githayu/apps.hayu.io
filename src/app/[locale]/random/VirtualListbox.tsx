import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { List, ListImperativeAPI, RowComponentProps } from 'react-window'

/** 一度に表示する最大行数 */
const VISIBLE_ROWS = 8

/** 候補1件の要素が受け取る属性 */
export type VirtualOptionProps = React.HTMLAttributes<HTMLLIElement> & {
  /** 行番号を逆引きするためのキー */
  'data-option-key': string
}

type VirtualListboxContextValue = {
  /** 選択中の行へスクロールさせるためのAPI */
  listRef: React.RefObject<ListImperativeAPI | null>
  /** 描画した候補のキーと行番号の対応を受け取る */
  onRowsBuilt: (rowIndexByKey: Map<string, number>) => void
}

export const VirtualListboxContext =
  React.createContext<VirtualListboxContextValue | null>(null)

type RowProps = {
  /** 描画対象の候補要素 */
  options: React.ReactElement<VirtualOptionProps>[]
}

/**
 * 仮想リストの1行
 * MARK: OptionRow
 */
const OptionRow = ({ index, options, style }: RowComponentProps<RowProps>) => {
  const option = options[index]

  return React.cloneElement(option, {
    style: { ...option.props.style, ...style },
  })
}

type VirtualListboxProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLDivElement>
}

/**
 * 見えている行だけを描画するAutocomplete用のリストボックス
 * MARK: VirtualListbox
 */
export const VirtualListbox = ({
  children,
  className,
  ref,
  ...props
}: VirtualListboxProps) => {
  const context = React.useContext(VirtualListboxContext)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })

  const options = React.Children.toArray(children).filter(
    React.isValidElement<VirtualOptionProps>
  )
  const rowHeight = smUp ? 36 : 48

  React.useEffect(() => {
    if (!context) {
      return
    }

    context.onRowsBuilt(
      new Map(options.map((option, i) => [option.props['data-option-key'], i]))
    )
  })

  return (
    <Box ref={ref} {...props}>
      <List
        className={className}
        listRef={context?.listRef}
        overscanCount={5}
        rowComponent={OptionRow}
        rowCount={options.length}
        rowHeight={rowHeight}
        rowProps={{ options }}
        style={{
          height: Math.min(options.length, VISIBLE_ROWS) * rowHeight,
          padding: 0,
        }}
        tagName="ul"
      />
    </Box>
  )
}
