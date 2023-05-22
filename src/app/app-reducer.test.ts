import {appReducer, InitialStateType, setErrorAC, setRequestStatusAC} from './app-reducer';


let startState: InitialStateType;
beforeEach(()=> {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error name should be set', ()=> {
    const endState = appReducer(startState, setErrorAC('some error'))
    expect(endState.error).toBe('some error')
})
test('correct status  should be set', ()=> {
    const endState = appReducer(startState, setRequestStatusAC('loading'))
    expect(endState.status).toBe('loading')
})


