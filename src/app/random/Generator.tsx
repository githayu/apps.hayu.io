import { defaultBlocks, RandomContext, unicodeBlocks } from '.'
import {
  Button,
  Checkbox,
  FormGroup,
  InputGroup,
  NumericInput,
} from '@blueprintjs/core'
import { MenuItem2 } from '@blueprintjs/popover2'
import { MultiSelect2 } from '@blueprintjs/select'
import React from 'react'

export const Generator = () => {
  const context = React.useContext(RandomContext)

  if (!context) {
    return null
  }

  return (
    <form
      className="p-8 [&_label]:min-w-[5rem]"
      onReset={context.actions.reset}
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        context.actions.generate()
      }}
    >
      <FormGroup inline={true} label="汎用文字">
        {defaultBlocks.map((block, i) => {
          return (
            <Checkbox
              checked={context.state.defaultBlocks.includes(block)}
              inline={true}
              key={`generator-main-${i}`}
              label={block.name}
              onChange={() => context.actions.toggleBlock(block)}
            />
          )
        })}
      </FormGroup>

      <FormGroup
        helperText="各ブロックから文字列を生成可能にします。"
        inline={true}
        label="Unicode"
      >
        <MultiSelect2
          itemRenderer={(block, itemRenderer) => {
            const chars = []
            const interval = Math.floor((block.to - block.from) / 5)

            for (let i = block.from; i < block.to; i += interval) {
              chars.push(String.fromCodePoint(i))
            }

            return (
              <MenuItem2
                icon={context.state.blocks.includes(block) ? 'tick' : 'blank'}
                key={`${block.from}-${block.to}`}
                label={chars.slice(0, 5).join(' ')}
                onClick={itemRenderer.handleClick}
                shouldDismissPopover={false}
                text={block.name}
              />
            )
          }}
          items={unicodeBlocks}
          onItemSelect={(block) => {
            context.actions.toggleBlock(block)
          }}
          popoverProps={{ transitionDuration: 0 }}
          selectedItems={context.state.blocks}
          tagInputProps={{
            onRemove: (value, index) => {
              context.actions.toggleBlock(context.state.blocks[index])
            },
          }}
          tagRenderer={(block) => {
            return block.name
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="任意の文字を複数追加できます。区切り文字は不要です。"
        inline={true}
        label="追加文字"
      >
        <InputGroup
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
            return context.actions.updateAppendStrings(target.value)
          }}
          value={context.state.appendStrings}
        />
      </FormGroup>

      <FormGroup inline={true} label="生成回数">
        <NumericInput
          onValueChange={(int) => context.actions.updateCreationCount(int)}
          type="number"
          value={String(context.state.creationCount)}
        />
      </FormGroup>

      <FormGroup inline={true} label="文字数">
        <NumericInput
          onValueChange={(int) => context.actions.updateCharacterCount(int)}
          type="number"
          value={String(context.state.charactersCount)}
        />
      </FormGroup>

      <div className="[&>button+button]:ml-4">
        <Button type="reset">リセット</Button>
        <Button intent="primary" type="submit">
          実行
        </Button>
      </div>
    </form>
  )
}
