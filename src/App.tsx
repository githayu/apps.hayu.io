import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/App/App'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #eceff1;
}

.bp3-multi-select-popover {
  height: 300px;
  overflow: auto;
}
`

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  root
)
