import React from 'react'
import { AppActions, AppState } from './page'

type RandomContext = {
  actions: AppActions
  state: AppState
}

export const RandomContext = React.createContext<RandomContext | null>(null)
