import { createStore, combineReducers } from "redux"

export const ConfigureStore = () => {
  const store = createStore(combineReducers({}))

  return store
}
