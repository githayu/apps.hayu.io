import React from 'react'
import { Card as BPCard, Tooltip } from '@blueprintjs/core'
import { AppContext } from './Random'
import styled from 'styled-components'

interface IProps {
  block: {
    name: string
    from: number
    to: number
  }
}

export const UnicodeBlockCard: React.FC<IProps> = (props) => {
  const context = React.useContext(AppContext)

  if (!context) {
    return null
  }

  const { block, ...others } = props
  const chars = []
  const interval = Math.floor((block.to - block.from) / 10)

  for (let i = block.from; i < block.to; i += interval) {
    chars.push(String.fromCodePoint(i))
  }

  const description = chars.slice(0, 10).join(' ')

  return (
    <Card
      interactive={true}
      onClick={() => context.actions.toggleBlock(block)}
      {...others}
    >
      <h5>
        <Tooltip content={block.name}>{block.name}</Tooltip>
      </h5>

      <p>{description}</p>
    </Card>
  )
}

const Card = styled(BPCard)`
  width: 200px;
  height: 80px;
  padding: 16px;
  text-align: center;

  > * {
    word-break: break-all;
    font-feature-settings: 'palt';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h5 {
    font-size: 1rem;
    margin: 0 0 8px;
  }

  p {
    margin: 0;
    color: #c0c0c0;
  }
`
