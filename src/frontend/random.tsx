import React from 'react'
import ReactDOM from 'react-dom'
import { RandomApp } from './components'
import { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'

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

ReactDOM.render(
  <>
    <GlobalStyle />
    <RandomApp />
  </>,
  document.getElementById('app')
)

module.hot?.accept()
