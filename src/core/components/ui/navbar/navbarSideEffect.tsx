import withSideEffect from 'react-side-effect';
import { useState, useEffect } from 'react';
import { EventEmitter } from 'events';
interface navHeaderState {
    isOnStaffPage: Boolean,
    header: String,

}

type navHeaderProps = Partial<navHeaderState>


const defaultHeader: navHeaderState = {
    isOnStaffPage: false,
    header: 'CU Sports Center'
}
const NavHeader: React.FC<navHeaderProps> = () => null;

function reducePropsToState(propsList: navHeaderProps[]): navHeaderState {
    const state = { ...defaultHeader }
    propsList.forEach((val) => {
        Object.assign(state, val)
    })
    return state;
}
let currentState: navHeaderState = ({} as navHeaderState)
const emitter = new EventEmitter()

function handleStateChangeOnClient(state: navHeaderState) {
    currentState = state
    emitter.emit('change', state)
}

const navHeaderSideEffect = withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(NavHeader)

function useNavHeader(): navHeaderState | navHeaderProps {
    const [state, setState] = useState(currentState);
    useEffect(() => {
<<<<<<< HEAD
        setState(currentState)
=======
>>>>>>> 76cbfbb... sideEffect
        const listener = (newState: navHeaderState) => {
            console.log(JSON.stringify(newState))
            setState(newState);
        }
        emitter.addListener('change', listener)
        return () => { emitter.removeListener('change', listener); }
    }
<<<<<<< HEAD
    ,[])
=======
    )
>>>>>>> 76cbfbb... sideEffect
    return state || navHeaderSideEffect.peek();
}

export { navHeaderSideEffect as NavHeader, useNavHeader }
