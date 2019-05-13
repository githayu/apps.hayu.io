import * as React from 'react'
import {
  FormGroup,
  InputGroup,
  NumericInput,
  MenuItem,
  Button,
  Checkbox,
} from '@blueprintjs/core'

import { MultiSelect } from '@blueprintjs/select'
import { AppContext } from 'src/containers/App/App'
import { unicodeBlocks, defaultBlocks } from 'src/containers/App/unicode-blocks'
import styled from 'styled-components'

export const Generator = () => {
  return (
    <AppContext.Consumer>
      {(context) =>
        context && (
          <Root
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault()
              context.actions.generate()
            }}
            onReset={context.actions.reset}
          >
            <FormGroup label="汎用文字" inline={true}>
              {defaultBlocks.map((block, i) => {
                return (
                  <Checkbox
                    key={`generator-main-${i}`}
                    label={block.name}
                    inline={true}
                    checked={context.store.defaultBlocks.includes(block)}
                    onChange={() => context.actions.toggleBlock(block)}
                  />
                )
              })}
            </FormGroup>

            <FormGroup
              label="Unicode"
              inline={true}
              helperText="各ブロックから文字列を生成可能にします。"
            >
              <MultiSelect
                items={unicodeBlocks}
                itemRenderer={(block, itemRenderer) => {
                  const chars = []
                  const interval = Math.floor((block.to - block.from) / 5)

                  for (let i = block.from; i < block.to; i += interval) {
                    chars.push(String.fromCodePoint(i))
                  }

                  return (
                    <MenuItem
                      key={`${block.from}-${block.to}`}
                      text={block.name}
                      icon={
                        context.store.blocks.includes(block) ? 'tick' : 'blank'
                      }
                      label={chars.slice(0, 5).join(' ')}
                      shouldDismissPopover={false}
                      onClick={itemRenderer.handleClick}
                    />
                  )
                }}
                onItemSelect={(block) => {
                  context.actions.toggleBlock(block)
                }}
                tagRenderer={(block) => {
                  return block.name
                }}
                selectedItems={context.store.blocks}
                tagInputProps={{
                  onRemove: (value, index) => {
                    context.actions.toggleBlock(context.store.blocks[index])
                  },
                }}
              />
            </FormGroup>
            <FormGroup
              label="追加文字"
              inline={true}
              helperText="任意の文字を複数追加できます。区切り文字は不要です。"
            >
              <InputGroup
                value={context.store.appendStrings}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                  return context.actions.updateAppendStrings(target.value)
                }}
              />
            </FormGroup>

            <FormGroup label="生成回数" inline={true}>
              <NumericInput
                type="number"
                value={String(context.store.creationCount)}
                onValueChange={(int) =>
                  context.actions.updateCreationCount(int)
                }
              />
            </FormGroup>

            <FormGroup label="文字数" inline={true}>
              <NumericInput
                type="number"
                value={String(context.store.charactersCount)}
                onValueChange={(int) =>
                  context.actions.updateCharacterCount(int)
                }
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="reset">リセット</Button>
              <Button type="submit" intent="primary">
                実行
              </Button>
            </ButtonGroup>
          </Root>
        )
      }
    </AppContext.Consumer>
  )
}

const Root = styled.form`
  padding: 32px;

  label {
    min-width: 5rem;
  }
`

const ButtonGroup = styled.div`
  > button {
    + button {
      margin-left: 16px;
    }
  }
`
