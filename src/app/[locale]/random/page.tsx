'use client'

import { Block, CharSet, charSets, Generator, RandomContext } from '.'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Locale, useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { CopyButton } from '../../../components/CopyButton'
import { LocaleSwitcher } from '../../../components/LocaleSwitcher'
import { ThemeSwitcher } from '../../../components/ThemeSwitcher'

export type AppState = {
  /** 追加文字列 */
  appendStrings: string
  /** 生成対象ブロック */
  blocks: Block[]
  /** 生成文字数 */
  charactersCount: number
  /** 生成回数 */
  creationCount: number
  /** 選択中の汎用文字セット */
  defaultBlocks: CharSet[]
  /** 生成文字列 */
  resultStrings: string
}

export type AppActions = {
  /** 文字列生成 */
  generate(): void
  /** リセット */
  reset(): void
  /** ユニコードブロック・汎用文字セットの切替 */
  toggleBlock(block: Block | CharSet): void
  /** 追加文字列更新 */
  updateAppendStrings(value: string): void
  /** 生成文字数更新 */
  updateCharacterCount(value: number): void
  /** 生成回数更新 */
  updateCreationCount(value: number): void
}

/**
 * 言語ごとの初期状態
 * MARK: createInitialState
 */
const createInitialState = (locale: Locale): AppState => ({
  appendStrings: '',
  blocks: [],
  charactersCount: 10,
  creationCount: 5,
  defaultBlocks: charSets[locale].filter((set) => set.default),
  resultStrings: '',
})

/**
 * 範囲内の全文字 (from, to とも含む)
 * MARK: rangeChars
 */
const rangeChars = (block: Block) =>
  Array.from({ length: block.to - block.from + 1 }, (_, i) =>
    String.fromCodePoint(block.from + i),
  )

/**
 * 汎用文字セットに含まれる全文字
 * MARK: charSetChars
 */
const charSetChars = (set: CharSet) => [
  ...(set.ranges ?? []).flatMap(rangeChars),
  ...Array.from(set.chars ?? ''),
]

export default function RandomPage() {
  const locale = useLocale()
  const t = useTranslations('Random')
  const [state, setState] = React.useState(() => createInitialState(locale))

  /**
   * ユニコードブロック・汎用文字セットの切替
   */
  const toggleBlock = React.useCallback(
    (block: Block | CharSet) => {
      const isCharSet = 'id' in block
      const nextBlocks = [...(isCharSet ? state.defaultBlocks : state.blocks)]
      const findIndex = nextBlocks.findIndex(
        (i) => JSON.stringify(i) === JSON.stringify(block),
      )

      findIndex === -1
        ? nextBlocks.push(block)
        : nextBlocks.splice(findIndex, 1)

      setState((prev) => ({
        ...prev,
        [isCharSet ? 'defaultBlocks' : 'blocks']: nextBlocks,
      }))
    },
    [state.blocks, state.defaultBlocks],
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
    [],
  )

  /**
   * 生成文字数更新
   */
  const updateCharacterCount = React.useCallback(
    (charactersCount: number) =>
      setState((prev) => ({ ...prev, charactersCount })),
    [],
  )

  /**
   * 生成回数更新
   */
  const updateCreationCount = React.useCallback(
    (creationCount: number) => setState((prev) => ({ ...prev, creationCount })),
    [],
  )

  /**
   * 文字列生成
   */
  const generate = React.useCallback(() => {
    const text = [
      ...new Set([
        ...state.blocks.flatMap(rangeChars),
        ...state.defaultBlocks.flatMap(charSetChars),
        ...Array.from(state.appendStrings),
      ]),
    ]

    const resultStrings = text.length
      ? Array.from({ length: Math.max(state.creationCount, 0) }, () =>
          Array.from(
            { length: Math.max(state.charactersCount, 0) },
            () => text[Math.floor(Math.random() * text.length)],
          ).join(''),
        ).join('\n')
      : ''

    setState((prev) => ({ ...prev, resultStrings }))
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
  const reset = React.useCallback(
    () => setState(createInitialState(locale)),
    [locale],
  )

  return (
    <RandomContext.Provider
      value={{
        actions: {
          generate,
          reset,
          toggleBlock,
          updateAppendStrings,
          updateCharacterCount,
          updateCreationCount,
        },
        state,
      }}
    >
      <AppBar
        color="transparent"
        elevation={0}
        position="static"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar sx={{ px: 2 }} variant="dense">
          <Typography component="h1" sx={{ flex: 1 }} variant="subtitle1">
            {t('title')}
          </Typography>

          <Stack direction="row" spacing={1}>
            <ThemeSwitcher />
            <LocaleSwitcher />
          </Stack>
        </Toolbar>
      </AppBar>

      <Generator />

      <Box sx={{ px: { sm: 4, xs: 2 } }}>
        <Box
          sx={{
            display: { sm: 'inline-block', xs: 'block' },
            position: 'relative',
          }}
        >
          <TextField
            multiline
            rows={10}
            size="small"
            slotProps={{ htmlInput: { readOnly: true } }}
            sx={{
              '& .MuiInputBase-root': { pr: 5 },
              '& textarea': {
                fontFamily: 'monospace',
                resize: { sm: 'both', xs: 'vertical' },
                width: { sm: 186 },
              },
              width: { sm: 'auto', xs: '100%' },
            }}
            value={state.resultStrings}
          />

          <CopyButton
            label={t('copy')}
            sx={{ position: 'absolute', right: 4, top: 4 }}
            text={state.resultStrings}
          />
        </Box>
      </Box>
    </RandomContext.Provider>
  )
}
