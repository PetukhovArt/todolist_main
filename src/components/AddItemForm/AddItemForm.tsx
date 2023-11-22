import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import AddBox from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"
import s from "./addItemForm.module.css"

type AddItemFormPropsType = {
   addItem: (title: string) => void
   disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled = false }: AddItemFormPropsType) => {
   const [title, setTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const addItemHandler = () => {
      if (title.trim() !== "") {
         addItem(title)
         setTitle("")
      } else {
         setError("Title is required")
      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null)
      }
      if (e.charCode === 13) {
         addItemHandler()
      }
   }

   return (
      <div className={s.wrapper}>
         <TextField
            size={"small"}
            variant="outlined"
            disabled={disabled}
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
         />
         <IconButton color="primary" onClick={addItemHandler} disabled={disabled} sx={{ paddingRight: "0" }}>
            <AddBox />
         </IconButton>
      </div>
   )
})
