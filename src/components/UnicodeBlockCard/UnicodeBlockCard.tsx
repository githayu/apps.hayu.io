import * as React from 'react'
import { Card, Tooltip } from '@blueprintjs/core'
import { AppContext } from '../../containers/App/App'
import s from './UnicodeBlockCard.scss'

interface IProps {
  block: {
    name: string
    from: number
    to: number
  }
}

export const UnicodeBlockCard: React.SFC<IProps> = (props) => {
  const { block, ...others } = props
  const chars = []
  const interval = Math.floor((block.to - block.from) / 10)

  for (let i = block.from; i < block.to; i += interval) {
    chars.push(String.fromCodePoint(i))
  }

  const description = chars.slice(0, 10).join(' ')

  return (
    <AppContext.Consumer>
      {(context) =>
        context && (
          <Card
            interactive={true}
            className={s.card}
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
    </AppContext.Consumer>
  )
}

export default UnicodeBlockCard
