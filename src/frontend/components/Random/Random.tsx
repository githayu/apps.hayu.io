import React from 'react'
import {
  Navbar,
  TextArea as BPTextArea,
  Checkbox,
  Dialog,
  Classes,
  Button,
} from '@blueprintjs/core'
import { isEqual } from 'lodash-es'
import { Generator } from 'src/frontend/components'
import {
  unicodeBlocks,
  IBlock,
  IRangeBlock,
  defaultBlocks,
} from './unicode-blocks'
import styled from 'styled-components'

interface IState {
  /** 生成対象ブロック */
  blocks: IBlock[]
  /** 汎用文字列 */
  defaultBlocks: IRangeBlock[]
  /** 追加文字列 */
  appendStrings: string
  /** 生成文字数 */
  charactersCount: number
  /** 生成回数 */
  creationCount: number
  /** 生成文字列 */
  resultStrings: string
  /** 生成対象ブロック追加ダイアログ */
  isOpenUnicodeDialog: boolean
}

interface IActions {
  /** ユニコードブロックの切替 */
  toggleBlock(block: IBlock | IRangeBlock): void
  /** 追加文字列更新 */
  updateAppendStrings(value: string): void
  /** 生成文字数更新 */
  updateCharacterCount(value: number): void
  /** 生成回数更新 */
  updateCreationCount(value: number): void
  /** 生成対象ブロック追加ダイアログ更新 */
  updateUnicodeDialog(value: boolean): void
  /** 文字列生成 */
  generate(): void
  /** リセット */
  reset(): void
}

interface IContext {
  state: IState
  actions: IActions
}

const initialStore: IState = {
  isOpenUnicodeDialog: false,
  blocks: [],
  defaultBlocks: defaultBlocks.slice(0, 3),
  appendStrings: '',
  charactersCount: 10,
  creationCount: 5,
  resultStrings: '',
}

export const AppContext = React.createContext<IContext | null>(null)

export const RandomApp = () => {
  const [state, setState] = React.useState<IState>(initialStore)

  /**
   * ユニコードブロックの切替
   */
  const toggleBlock = React.useCallback(
    (block: IBlock | IRangeBlock) => {
      const isRangeBlock = 'ranges' in block
      const nextBlocks = [
        ...(isRangeBlock ? state.defaultBlocks : state.blocks),
      ]
      const findIndex = nextBlocks.findIndex((i) => isEqual(i, block))

      findIndex === -1
        ? nextBlocks.push(block)
        : nextBlocks.splice(findIndex, 1)

      setState((prev) => ({
        ...prev,
        [isRangeBlock ? 'defaultBlocks' : 'blocks']: nextBlocks,
      }))
    },
    [state.blocks, state.defaultBlocks]
  )

  /**
   * 追加文字列更新
   */
  const updateAppendStrings = React.useCallback(
    (appendStrings: string) =>
      setState((prev) => ({
        ...prev,
        appendStrings,
      })),
    []
  )

  /**
   * 生成文字数更新
   */
  const updateCharacterCount = React.useCallback(
    (charactersCount: number) =>
      setState((prev) => ({ ...prev, charactersCount })),
    []
  )

  /**
   * 生成回数更新
   */
  const updateCreationCount = React.useCallback(
    (creationCount: number) => setState((prev) => ({ ...prev, creationCount })),
    []
  )

  /**
   * 生成対象ブロック追加ダイアログ更新
   */
  const updateUnicodeDialog = React.useCallback(
    (isOpenUnicodeDialog: boolean) =>
      setState((prev) => ({ ...prev, isOpenUnicodeDialog })),
    []
  )

  /**
   * 文字列生成
   */
  const generate = React.useCallback(() => {
    let result = ''

    let text = [...state.blocks, ...state.defaultBlocks].reduce<string[]>(
      (str, block) => {
        if ('ranges' in block) {
          block.ranges.forEach((range) => {
            for (let i = range.from; i < range.to; i++) {
              const char = String.fromCodePoint(i)

              if (str.includes(char)) {
                continue
              }

              str.push(char)
            }
          })
        } else {
          for (let i = block.from; i < block.to; i++) {
            const char = String.fromCodePoint(i)

            if (str.includes(char)) {
              continue
            }

            str.push(char)
          }
        }

        return str
      },
      []
    )

    Array.from(state.appendStrings).forEach((char) => {
      if (text.includes(char)) {
        return
      }

      text.push(char)
    })

    if (text.length) {
      for (let i = 0; i < state.creationCount; i++) {
        for (let ii = 0; ii < state.charactersCount; ii++) {
          result += text[Math.floor(Math.random() * text.length)]
        }

        if (i < state.creationCount - 1) {
          result += '\n'
        }
      }
    }

    setState((prev) => ({ ...prev, resultStrings: result }))
  }, [
    state.blocks,
    state.defaultBlocks,
    state.appendStrings,
    state.creationCount,
    state.charactersCount,
  ])

  /**
   * リセット
   */
  const reset = React.useCallback(() => setState(initialStore), [])

  return (
    <AppContext.Provider
      value={{
        state,
        actions: {
          toggleBlock,
          updateAppendStrings,
          updateCharacterCount,
          updateCreationCount,
          updateUnicodeDialog,
          generate,
          reset,
        },
      }}
    >
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>ランダム文字列ジェネレーター</Navbar.Heading>
        </Navbar.Group>
      </Navbar>

      <Dialog
        isOpen={state.isOpenUnicodeDialog}
        title="Unicode Block 追加"
        onClose={() =>
          setState((prev) => ({ ...prev, isOpenUnicodeDialog: false }))
        }
      >
        <div className={Classes.DIALOG_BODY}>
          {unicodeBlocks.map((block) => (
            <Checkbox key={`${block.from}-${block.to}`} label={block.name} />
          ))}
        </div>

        <footer className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={() =>
                setState((prev) => ({ ...prev, isOpenUnicodeDialog: false }))
              }
            >
              閉じる
            </Button>
          </div>
        </footer>
      </Dialog>

      <Generator />

      <TextArea value={state.resultStrings} cols={20} rows={10} />
    </AppContext.Provider>
  )
}

const TextArea = styled(BPTextArea)`
  margin: 0 32px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.4rem;
`
