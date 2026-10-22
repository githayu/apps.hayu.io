import { Block, blockKey, charSets, RandomContext, unicodeBlocks } from '.'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { useListRef } from 'react-window'
import { NumberField } from '../../../components/NumberField'
import { VirtualListbox, VirtualListboxContext } from './VirtualListbox'

type FormRowProps = React.PropsWithChildren<{
  /** 入力欄の下に表示する補足 */
  helperText?: string
  /** 項目名 */
  label: string
}>

/**
 * 項目名と入力欄の行
 * フォームのグリッドに項目名・入力欄の2セルとして並べ、PCは項目名の列幅を最長の項目名に揃える
 * MARK: FormRow
 */
const FormRow = ({ children, helperText, label }: FormRowProps) => (
  <>
    <FormLabel
      sx={{
        alignItems: 'center',
        color: 'text.primary',
        display: { sm: 'flex' },
        fontSize: 14,
        fontWeight: 500,
        minHeight: { sm: 40 },
        minWidth: { sm: 80 },
        whiteSpace: { sm: 'nowrap' },
      }}
    >
      {label}
    </FormLabel>

    <Box sx={{ mb: { sm: 0, xs: 1.5 }, minWidth: 0 }}>
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  </>
)

/**
 * ブロックから等間隔に5文字を抜き出したサンプル
 * MARK: sampleChars
 */
const sampleChars = (block: Block) => {
  const interval = Math.floor((block.to - block.from) / 5)

  return Array.from({ length: 5 }, (_, i) =>
    String.fromCodePoint(block.from + interval * i)
  ).join(' ')
}

/** 項目の入力欄の幅 (スマホは全幅) */
const fieldWidth = (width: number) => ({ width: { sm: width, xs: '100%' } })

export const Generator = () => {
  const context = React.useContext(RandomContext)
  const locale = useLocale()
  const t = useTranslations('Random')
  const tBlocks = useTranslations('UnicodeBlocks')
  const listRef = useListRef(null)
  const rowIndexByKey = React.useRef(new Map<string, number>())

  const onRowsBuilt = React.useCallback((map: Map<string, number>) => {
    rowIndexByKey.current = map
  }, [])

  if (!context) {
    return null
  }

  return (
    <Box
      component="form"
      onReset={context.actions.reset}
      onSubmit={(e) => {
        e.preventDefault()
        context.actions.generate()
      }}
      sx={{
        columnGap: 2,
        display: 'grid',
        gridTemplateColumns: { sm: 'max-content minmax(0, 1fr)', xs: '1fr' },
        p: { sm: 4, xs: 2 },
        rowGap: { sm: 2, xs: 0.5 },
      }}
    >
      <FormRow label={t('generalChars')}>
        <FormGroup row>
          {charSets[locale].map((set) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={context.state.defaultBlocks.some(
                    ({ id }) => id === set.id
                  )}
                  onChange={() => context.actions.toggleBlock(set)}
                  size="small"
                />
              }
              key={set.id}
              label={set.label}
            />
          ))}
        </FormGroup>
      </FormRow>

      <FormRow helperText={t('unicodeHelp')} label={t('unicode')}>
        <VirtualListboxContext.Provider value={{ listRef, onRowsBuilt }}>
          <Autocomplete
            disableClearable
            disableCloseOnSelect
            disableListWrap
            getOptionKey={blockKey}
            getOptionLabel={(block) => tBlocks(blockKey(block))}
            handleHomeEndKeys={false}
            isOptionEqualToValue={(a, b) => a.from === b.from && a.to === b.to}
            multiple
            onChange={(_e, _value, _reason, details) => {
              if (details) {
                context.actions.toggleBlock(details.option)
              }
            }}
            onHighlightChange={(_e, block) => {
              const index = block && rowIndexByKey.current.get(blockKey(block))

              if (index != null) {
                listRef.current?.scrollToRow({ align: 'auto', index })
              }
            }}
            options={unicodeBlocks}
            renderInput={(params) => (
              <TextField {...params} placeholder={t('search')} size="small" />
            )}
            renderOption={({ key, ...props }, block, { selected }) => (
              <li data-option-key={blockKey(block)} key={key} {...props}>
                <Checkbox
                  checked={selected}
                  size="small"
                  sx={{ mr: 0.5, p: 0.5 }}
                />
                <Typography noWrap sx={{ flex: 1 }}>
                  {tBlocks(blockKey(block))}
                </Typography>
                <Typography
                  noWrap
                  sx={{ color: 'text.secondary', ml: 2 }}
                >
                  {sampleChars(block)}
                </Typography>
              </li>
            )}
            renderValue={(blocks, getItemProps) =>
              blocks.map((block, index) => {
                const { key, ...itemProps } = getItemProps({ index })

                return (
                  <Chip
                    key={key}
                    label={tBlocks(blockKey(block))}
                    size="small"
                    {...itemProps}
                  />
                )
              })
            }
            slotProps={{
              listbox: { component: VirtualListbox },
              popper: {
                placement: 'bottom-start',
                sx: { maxWidth: 'calc(100vw - 2rem)', width: '26rem !important' },
              },
            }}
            sx={fieldWidth(208)}
            value={context.state.blocks}
          />
        </VirtualListboxContext.Provider>
      </FormRow>

      <FormRow helperText={t('appendHelp')} label={t('appendChars')}>
        <TextField
          onChange={({ target }) =>
            context.actions.updateAppendStrings(target.value)
          }
          size="small"
          sx={fieldWidth(272)}
          value={context.state.appendStrings}
        />
      </FormRow>

      <FormRow label={t('creationCount')}>
        <NumberField
          decrementLabel={t('decrease')}
          incrementLabel={t('increase')}
          min={0}
          onValueChange={(value) =>
            context.actions.updateCreationCount(value ?? 0)
          }
          size="small"
          sx={fieldWidth(176)}
          value={context.state.creationCount}
        />
      </FormRow>

      <FormRow label={t('characterCount')}>
        <NumberField
          decrementLabel={t('decrease')}
          incrementLabel={t('increase')}
          min={0}
          onValueChange={(value) =>
            context.actions.updateCharacterCount(value ?? 0)
          }
          size="small"
          sx={fieldWidth(176)}
          value={context.state.charactersCount}
        />
      </FormRow>

      <Stack direction="row" spacing={2} sx={{ gridColumn: '1 / -1' }}>
        <Button
          sx={{ flex: { sm: 'none', xs: 1 } }}
          type="reset"
          variant="outlined"
        >
          {t('reset')}
        </Button>
        <Button
          sx={{ flex: { sm: 'none', xs: 1 } }}
          type="submit"
          variant="contained"
        >
          {t('generate')}
        </Button>
      </Stack>
    </Box>
  )
}
