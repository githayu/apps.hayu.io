import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'

type NumberFieldProps = BaseNumberField.Root.Props & {
  /** 減らすボタンの読み上げ名 */
  decrementLabel: string
  /** 増やすボタンの読み上げ名 */
  incrementLabel: string
  size?: 'small' | 'medium'
  sx?: SxProps<Theme>
}

/**
 * SSR時に入力済みとして扱わせるためのFormControl用プレースホルダー
 * MARK: SSRInitialFilled
 */
const SSRInitialFilled = Object.assign((): null => null, { muiName: 'Input' })

/**
 * MUIの見た目に合わせた数値入力 (Base UIのNumberFieldを利用)
 * @see https://mui.com/material-ui/react-number-field/
 * MARK: NumberField
 */
export const NumberField = ({
  decrementLabel,
  id: idProp,
  incrementLabel,
  size = 'medium',
  sx,
  ...props
}: NumberFieldProps) => {
  const generatedId = React.useId()
  const id = idProp ?? generatedId

  return (
    <BaseNumberField.Root
      {...props}
      render={(rootProps, state) => (
        <FormControl
          disabled={state.disabled}
          ref={rootProps.ref}
          required={state.required}
          size={size}
          sx={sx}
          variant="outlined"
        >
          {rootProps.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...props} />

      <BaseNumberField.Input
        id={id}
        render={(inputProps, state) => (
          <OutlinedInput
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  '& button': {
                    borderRadius: 0.5,
                    flex: 1,
                    py: 0,
                  },
                  alignSelf: 'stretch',
                  borderLeft: '1px solid',
                  borderLeftColor: (theme) =>
                    theme.vars
                      ? theme.alpha(theme.vars.palette.common.onBackground, 0.23)
                      : theme.alpha(theme.palette.text.primary, 0.23),
                  flexDirection: 'column',
                  maxHeight: 'unset',
                  ml: 0,
                }}
              >
                <BaseNumberField.Increment
                  render={<IconButton aria-label={incrementLabel} size={size} />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    sx={{ transform: 'translateY(2px)' }}
                  />
                </BaseNumberField.Increment>

                <BaseNumberField.Decrement
                  render={<IconButton aria-label={decrementLabel} size={size} />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    sx={{ transform: 'translateY(-2px)' }}
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            inputRef={inputProps.ref}
            onBlur={inputProps.onBlur}
            onChange={inputProps.onChange}
            onFocus={inputProps.onFocus}
            onKeyDown={inputProps.onKeyDown}
            onKeyUp={inputProps.onKeyUp}
            slotProps={{ input: inputProps }}
            sx={{ pr: 0 }}
            value={state.inputValue}
          />
        )}
      />
    </BaseNumberField.Root>
  )
}
