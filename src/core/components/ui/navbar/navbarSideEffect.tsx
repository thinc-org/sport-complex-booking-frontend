import withSideEffect from "react-side-effect"
import { useState, useEffect } from "react"
import { EventEmitter } from "events"
import i18n from "../../../i18n/i18n"
interface navHeaderState {
  isOnStaffPage: boolean
  isOnStaffLoginPage: boolean
  header: string
}

type navHeaderProps = Partial<navHeaderState>

const defaultHeader: navHeaderState = {
  isOnStaffLoginPage: false,
  isOnStaffPage: false,
  header: i18n.t("cuHeader"),
}
const NavHeader: React.FC<navHeaderProps> = () => null

function reducePropsToState(propsList: navHeaderProps[]): navHeaderState {
  const state = { ...defaultHeader }
  propsList.forEach((val) => {
    Object.assign(state, val)
  })
  return state
}
let currentState: navHeaderState = {} as navHeaderState
const emitter = new EventEmitter()

function handleStateChangeOnClient(state: navHeaderState) {
  currentState = state
  emitter.emit("change", state)
}

const navHeaderSideEffect = withSideEffect(reducePropsToState, handleStateChangeOnClient)(NavHeader)

function useNavHeader(): navHeaderState | navHeaderProps {
  const [state, setState] = useState(currentState)
  useEffect(() => {
    setState(currentState)
    const listener = (newState: navHeaderState) => {
      setState(newState)
    }
    emitter.addListener("change", listener)
    return () => {
      emitter.removeListener("change", listener)
    }
  }, [])
  return state || navHeaderSideEffect.peek()
}

export { navHeaderSideEffect as NavHeader, useNavHeader }
