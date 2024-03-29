import {
   setAppErrorAC,
   SetAppErrorActionType,
   setAppStatusAC,
   SetAppStatusActionType,
} from "@/app/app-reducer"
import { Dispatch } from "redux"

export const handleServerAppError = <D>(
   // @ts-ignore
   data: ResponseType<D>,
   dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>,
) => {
   if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC("Some error occurred"))
   }
   dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (
   error: { message: string },
   dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>,
) => {
   dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
   dispatch(setAppStatusAC("failed"))
}
