import { createStore, combineReducers } from "redux"

export const configureStore = () => {
  const store = createStore(combineReducers({}))
  return store
}
