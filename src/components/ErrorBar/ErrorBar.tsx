import { setAppErrorAC } from "@/app/app-reducer"
import { AppRootStateType } from "@/app/store"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const ErrorBar = () => {
   // @ts-ignore
   const error = useSelector<AppRootStateType, string | null>((state) => state.app.error)
   const dispatch = useDispatch()

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
         return
      }
      dispatch(setAppErrorAC(null))
   }

   const isOpen = error !== null

   return (
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="error">
            {error}
         </Alert>
      </Snackbar>
   )
}
