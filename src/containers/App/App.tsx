import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import {
  Navbar,
  TextArea as BPTextArea,
  Checkbox,
  Dialog,
  Classes,
  Button,
} from '@blueprintjs/core'
import classNames from 'classnames'
import { isEqual, has, take } from 'lodash'
import { Generator } from 'src/components/'
import {
  unicodeBlocks,
  IBlock,
  IRangeBlock,
  defaultBlocks,
} from './unicode-blocks'
import styled from 'styled-components'

interface IStore {
  blocks: IBlock[]
  defaultBlocks: IRangeBlock[]
  appendStrings: string
  charactersCount: number
  creationCount: number
  resultStrings: string
  isOpenUnicodeDialog: boolean
}

interface IActions {
  toggleBlock(block: IBlock | IRangeBlock): void
  updateAppendStrings(value: string): void
  updateCharacterCount(value: number): void
  updateCreationCount(value: number): void
  updateUnicodeDialog(value: boolean): void
  generate(): void
  reset(): void
}

interface IContext {
  store: IStore
  actions: IActions
}

const defaultProps = {
  unicodeBlocks,
}

const initialState = {}

const initialStore: IStore = {
  isOpenUnicodeDialog: false,
  blocks: new Array(),
  defaultBlocks: take(defaultBlocks, 3),
  appendStrings: '',
  charactersCount: 10,
  creationCount: 5,
  resultStrings: '',
}

interface IProps extends Readonly<typeof defaultProps> {}
interface IState extends Readonly<typeof initialState> {
  store: IStore
}

export const AppContext = React.createContext<IContext | null>(null)

const isIRangeBlock = (block: IBlock | IRangeBlock): block is IRangeBlock => {
  return has(block, 'ranges')
}

class App extends React.Component<IProps, IState> {
  public static readonly defaultProps = defaultProps
  public readonly state: IState = {
    ...initialState,
    store: initialStore,
  }

  public actions: IActions = {
    toggleBlock: (block) => {
      const { store } = this.state
      const isRangeBlock = has(block, 'ranges')
      const nextBlocks = [
        ...(isRangeBlock ? store.defaultBlocks : store.blocks),
      ]
      const findIndex = nextBlocks.findIndex((i) => isEqual(i, block))

      findIndex === -1
        ? nextBlocks.push(block)
        : nextBlocks.splice(findIndex, 1)

      this.setState({
        store: {
          ...store,
          [isRangeBlock ? 'defaultBlocks' : 'blocks']: nextBlocks,
        },
      })
    },

    updateAppendStrings: (appendStrings) =>
      this.setState({
        store: { ...this.state.store, appendStrings },
      }),

    updateCharacterCount: (charactersCount) =>
      this.setState({
        store: { ...this.state.store, charactersCount },
      }),

    updateCreationCount: (creationCount) =>
      this.setState({
        store: { ...this.state.store, creationCount },
      }),

    updateUnicodeDialog: (isOpenUnicodeDialog) =>
      this.setState({
        store: { ...this.state.store, isOpenUnicodeDialog },
      }),

    generate: () => {
      const { store } = this.state
      let result = ''

      let text = [...store.blocks, ...store.defaultBlocks].reduce<string[]>(
        (str, block) => {
          if (isIRangeBlock(block)) {
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

      Array.from(store.appendStrings).forEach((char) => {
        if (text.includes(char)) {
          return
        }

        text.push(char)
      })

      if (text.length) {
        for (let i = 0; i < store.creationCount; i++) {
          for (let ii = 0; ii < store.charactersCount; ii++) {
            result += text[Math.floor(Math.random() * text.length)]
          }

          if (i < store.creationCount - 1) {
            result += '\n'
          }
        }
      }

      this.setState({
        store: {
          ...store,
          resultStrings: result,
        },
      })
    },

    reset: () =>
      this.setState({
        store: initialStore,
      }),
  }

  public render() {
    const {
      state: { store },
      props: { unicodeBlocks },
    } = this

    return (
      <AppContext.Provider
        value={{
          store,
          actions: this.actions,
        }}
      >
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>ランダム文字列ジェネレーター</Navbar.Heading>
          </Navbar.Group>
        </Navbar>

        <Dialog
          isOpen={store.isOpenUnicodeDialog}
          title="Unicode Block 追加"
          onClose={() =>
            this.setState({ store: { ...store, isOpenUnicodeDialog: false } })
          }
        >
          <div className={classNames(Classes.DIALOG_BODY)}>
            {unicodeBlocks.map((block) => (
              <Checkbox key={`${block.from}-${block.to}`} label={block.name} />
            ))}
          </div>

          <footer className={classNames(Classes.DIALOG_FOOTER)}>
            <div className={classNames(Classes.DIALOG_FOOTER_ACTIONS)}>
              <Button
                onClick={() =>
                  this.setState({
                    store: { ...store, isOpenUnicodeDialog: false },
                  })
                }
              >
                閉じる
              </Button>
            </div>
          </footer>
        </Dialog>

        <Generator />

        <TextArea value={store.resultStrings} cols={20} rows={10} />
      </AppContext.Provider>
    )
  }
}

const TextArea = styled(BPTextArea)`
  margin: 0 32px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.4rem;
`

export default hot(App)
