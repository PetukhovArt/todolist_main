import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
   startState = {
      error: null,
      status: "idle",
      isInitialized: false,
   }
})

test("correct error message should be set", () => {
   const endState = appReducer(setAppErrorAC("some error"), startState)
   expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
   const endState = appReducer(setAppStatusAC("loading"), startState)
   expect(endState.status).toBe("loading")
})
