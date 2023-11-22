import { TaskStatuses } from "@/api/todolists-api"
import { AppRootStateType } from "@/app/store"
import { AddItemForm } from "@/components/AddItemForm/AddItemForm"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { Grid, Paper } from "@mui/material"
import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from "./tasks-reducer"

import { Todolist } from "./Todolist/Todolist"
import {
   addTodolistTC,
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   FilterValuesType,
   removeTodolistTC,
   TodolistDomainType,
} from "./todolists-reducer"

type PropsType = {
   demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
   const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

   const dispatch = useAppDispatch()

   useEffect(() => {
      if (demo || !isLoggedIn) {
         return
      }
      dispatch(fetchTodolistsTC())
   }, [])

   const removeTask = useCallback((id: string, todolistId: string) => {
      dispatch(removeTaskTC(id, todolistId))
   }, [])

   const addTask = useCallback((title: string, todolistId: string) => {
      dispatch(addTaskTC(title, todolistId))
   }, [])

   const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(id, { status }, todolistId))
   }, [])

   const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
      const thunk = updateTaskTC(id, { title: newTitle }, todolistId)
      dispatch(thunk)
   }, [])

   const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, value))
   }, [])

   const removeTodolist = useCallback((id: string) => {
      dispatch(removeTodolistTC(id))
   }, [])

   const changeTodolistTitle = useCallback((id: string, title: string) => {
      dispatch(changeTodolistTitleTC(id, title))
   }, [])

   const addTodolist = useCallback(
      (title: string) => {
         dispatch(addTodolistTC(title))
      },
      [dispatch],
   )

   if (!isLoggedIn) {
      return <Navigate to={"/login"} />
   }

   return (
      <>
         <Grid container style={{ padding: "20px 0" }}>
            <AddItemForm addItem={addTodolist} />
         </Grid>
         <Grid container spacing={3}>
            {todolists.map((tl) => {
               const allTodolistTasks = tasks[tl.id]

               return (
                  <Grid item key={tl.id}>
                     <Paper style={{ padding: "10px", minWidth: "250px" }}>
                        <Todolist
                           todolist={tl}
                           tasks={allTodolistTasks}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeStatus}
                           removeTodolist={removeTodolist}
                           changeTaskTitle={changeTaskTitle}
                           changeTodolistTitle={changeTodolistTitle}
                           demo={demo}
                        />
                     </Paper>
                  </Grid>
               )
            })}
         </Grid>
      </>
   )
}
