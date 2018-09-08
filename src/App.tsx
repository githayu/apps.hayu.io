import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/App/App'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './App.css'

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)
